// src/components/farmacia/AtendimentoFarmacia.tsx

import { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { buscarPrescricoesPendentes, dispensarPrescricao, criarDispensacaoAvulsa } from '@/services/farmaciaService';
import { Prescricao } from '@/types/Prescricao';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Search, Loader2, PlusCircle, Trash2, Pill, FilePlus2, XCircle } from 'lucide-react';
import { Textarea } from '../ui/textarea';
import { format } from "date-fns";

const dispensacaoSchema = z.object({
  medicamentos: z.array(
      z.object({
        nome: z.string().min(1, "Nome é obrigatório."),
        dosagem: z.string().min(1, "Dosagem é obrigatória."),
        instrucoes: z.string().min(1, "Instruções são obrigatórias."),
      })
  ).min(1, "A dispensação deve ter pelo menos um item."),
});

type DispensacaoFormData = z.infer<typeof dispensacaoSchema>;

export function AtendimentoFarmacia() {
  const { toast } = useToast();
  const [pacienteId, setPacienteId] = useState('');
  const [pacienteIdBusca, setPacienteIdBusca] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [prescricaoAtiva, setPrescricaoAtiva] = useState<Prescricao | null>(null);
  const [isModoAvulso, setIsModoAvulso] = useState(false);

  const form = useForm<DispensacaoFormData>({
    resolver: zodResolver(dispensacaoSchema),
    defaultValues: { medicamentos: [] }
  });

  const { fields, append, remove, replace } = useFieldArray({
    control: form.control,
    name: "medicamentos"
  });

  useEffect(() => {
    if (prescricaoAtiva) {
      replace(prescricaoAtiva.medicamentos);
      setIsModoAvulso(false); // Garante que não está em modo avulso se uma prescrição for carregada
    }
  }, [prescricaoAtiva, replace]);

  const resetState = (keepBusca: boolean = false) => {
    setPrescricaoAtiva(null);
    setIsModoAvulso(false);
    if (!keepBusca) {
      setPacienteIdBusca('');
      setPacienteId(''); // Limpa o campo de input do ID do paciente
    }
    form.reset({ medicamentos: [] }); // Reseta o formulário de medicamentos
  };

  const handleBuscarPrescricoes = async () => {
    if (!pacienteId) {
      toast({ variant: 'destructive', title: 'Atenção', description: 'Por favor, informe o ID do paciente.' });
      return;
    }

    const idParaBusca = pacienteId; // ✅ Captura o ID antes que o estado do input seja limpo

    setIsLoading(true);
    // Reseta o estado, mas mantém o ID do paciente que acabou de ser buscado para exibição
    // e limpa o campo de input para uma nova busca, se necessário.
    setPrescricaoAtiva(null);
    setIsModoAvulso(false);
    form.reset({ medicamentos: [] });
    setPacienteIdBusca(idParaBusca); // Define o ID que foi efetivamente buscado
    setPacienteId(''); // Limpa o campo de input para futuras buscas, se desejado

    try {
      const prescricoes = await buscarPrescricoesPendentes(idParaBusca);
      if (prescricoes.length > 0) {
        setPrescricaoAtiva(prescricoes[0]); // Considera apenas a primeira prescrição pendente por simplicidade
        toast({ title: 'Prescrição Encontrada', description: `Prescrição pendente carregada para ${idParaBusca}.` });
      } else {
        toast({ title: 'Nenhuma Prescrição Pendente', description: `Nenhuma prescrição pendente para ${idParaBusca}. Você pode iniciar uma dispensação avulsa.` });
      }
    } catch (error) {
      console.error("Erro ao buscar prescrições:", error);
      toast({ variant: 'destructive', title: 'Erro na Busca', description: 'Não foi possível buscar as prescrições.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleIniciarAvulsa = () => {
    // Não limpa pacienteIdBusca, pois a dispensação avulsa é para o paciente já buscado
    setPrescricaoAtiva(null);
    setIsModoAvulso(true);
    // Inicia com um item de medicamento vazio
    replace([{ nome: '', dosagem: '', instrucoes: '' }]);
    form.reset({ medicamentos: [{ nome: '', dosagem: '', instrucoes: '' }] }); // Garante que o form comece com um item
  };

  const handleCancelar = () => {
    resetState(); // Limpa tudo, incluindo pacienteIdBusca e o input pacienteId
    toast({ title: 'Ação Cancelada' });
  };

  const onDispensar = async (data: DispensacaoFormData) => {
    setIsLoading(true); // Adiciona estado de carregamento para a dispensação
    try {
      if (isModoAvulso) {
        if (!pacienteIdBusca) {
          toast({ variant: 'destructive', title: 'Erro', description: 'ID do paciente para dispensação avulsa não encontrado.' });
          setIsLoading(false);
          return;
        }
        await criarDispensacaoAvulsa({ pacienteId: pacienteIdBusca, medicamentos: data.medicamentos });
        toast({ title: 'Dispensação Avulsa Registrada', description: 'A baixa de itens foi registrada com sucesso.' });
      } else if (prescricaoAtiva) {
        await dispensarPrescricao(prescricaoAtiva.id, data.medicamentos);
        toast({ title: 'Prescrição Dispensada', description: 'A baixa da prescrição foi registrada com sucesso.' });
      }
      resetState(); // Limpa tudo após sucesso
    } catch (error) {
      console.error("Erro ao dispensar:", error);
      toast({ variant: 'destructive', title: 'Erro na Dispensação', description: 'Não foi possível registrar a operação.' });
    } finally {
      setIsLoading(false);
    }
  };

  const modoDispensacaoAtivo = !!prescricaoAtiva || isModoAvulso;

  return (
      <div className="space-y-6 p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle>Atendimento da Farmácia</CardTitle>
            <CardDescription>Busque o paciente para ver prescrições ou iniciar uma dispensação avulsa.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex w-full max-w-md items-center space-x-2">
              <Input
                  type="text"
                  placeholder="ID do Paciente"
                  value={pacienteId}
                  onChange={(e) => setPacienteId(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !isLoading && !modoDispensacaoAtivo && handleBuscarPrescricoes()}
                  disabled={isLoading || modoDispensacaoAtivo}
              />
              <Button type="button" onClick={handleBuscarPrescricoes} disabled={isLoading || modoDispensacaoAtivo || !pacienteId.trim()}>
                {isLoading && !prescricaoAtiva && !isModoAvulso ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Search className="mr-2 h-4 w-4" />}
                Buscar
              </Button>
            </div>
          </CardContent>
        </Card>

        {!modoDispensacaoAtivo && pacienteIdBusca && !isLoading && (
            <Card>
              <CardHeader>
                <CardTitle>Paciente: {pacienteIdBusca}</CardTitle>
                <CardDescription>Nenhuma prescrição pendente encontrada para este paciente.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col sm:flex-row gap-4">
                <Button onClick={handleIniciarAvulsa}><FilePlus2 className="mr-2 h-4 w-4" /> Iniciar Dispensação Avulsa</Button>
                <Button variant="outline" onClick={() => resetState()}><Search className="mr-2 h-4 w-4" /> Buscar Outro Paciente</Button>
              </CardContent>
            </Card>
        )}

        {modoDispensacaoAtivo && (
            <Card>
              <CardHeader>
                <CardTitle>{isModoAvulso ? 'Dispensação Avulsa' : `Dispensar Prescrição #${prescricaoAtiva?.id.substring(0,8)}...`}</CardTitle>
                <CardDescription>
                  {isModoAvulso
                      ? `Para o paciente: ${pacienteIdBusca}. Adicione os medicamentos/insumos.`
                      : `Prescrição de ${prescricaoAtiva?.nomeMedico} em ${format(new Date(prescricaoAtiva!.data), "dd/MM/yyyy 'às' HH:mm")}. Verifique os itens.`
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onDispensar)} className="space-y-6">
                    {fields.map((field, index) => (
                        <div key={field.id} className="rounded-lg border p-4 space-y-4 relative bg-slate-50 dark:bg-slate-800">
                          {fields.length > 1 && ( // Só mostra o botão de remover se houver mais de um item
                              <Button type="button" variant="ghost" size="icon" className="absolute top-1 right-1 h-7 w-7" onClick={() => remove(index)}>
                                <Trash2 className="h-4 w-4 text-red-500 hover:text-red-700" />
                              </Button>
                          )}
                          <FormField control={form.control} name={`medicamentos.${index}.nome`} render={({ field }) => (<FormItem><FormLabel>Medicamento/Insumo</FormLabel><FormControl><Input placeholder="Ex: Amoxicilina 500mg" {...field} /></FormControl><FormMessage /></FormItem>)} />
                          <FormField control={form.control} name={`medicamentos.${index}.dosagem`} render={({ field }) => (<FormItem><FormLabel>Dosagem/Quantidade</FormLabel><FormControl><Input placeholder="Ex: 1 comprimido / 10 unidades" {...field} /></FormControl><FormMessage /></FormItem>)} />
                          <FormField control={form.control} name={`medicamentos.${index}.instrucoes`} render={({ field }) => (<FormItem><FormLabel>Instruções/Observações</FormLabel><FormControl><Textarea placeholder="Ex: Tomar 1 a cada 8 horas por 7 dias" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        </div>
                    ))}
                    {form.formState.errors.medicamentos && !form.formState.errors.medicamentos.root && (
                        <FormMessage>
                          {form.formState.errors.medicamentos.message ||
                              (Array.isArray(form.formState.errors.medicamentos) &&
                                  form.formState.errors.medicamentos.find(err => err?.root)?.root?.message)
                          }
                        </FormMessage>
                    )}
                    {form.formState.errors.medicamentos?.root?.message && (
                        <p className="text-sm font-medium text-destructive">{form.formState.errors.medicamentos.root.message}</p>
                    )}

                    <div className="flex justify-between items-center pt-4 flex-wrap gap-4">
                      <Button type="button" variant="outline" size="sm" onClick={() => append({ nome: "", dosagem: "", instrucoes: "" })} disabled={isLoading}><PlusCircle className="mr-2 h-4 w-4" /> Adicionar Item</Button>
                      <div className="flex gap-2 sm:gap-4">
                        <Button type="button" variant="ghost" onClick={handleCancelar} disabled={isLoading}><XCircle className="mr-2 h-4 w-4"/>Cancelar</Button>
                        <Button type="submit" disabled={isLoading || !form.formState.isDirty || !form.formState.isValid}>
                          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Pill className="mr-2 h-4 w-4" />}
                          Confirmar Dispensação
                        </Button>
                      </div>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
        )}

        {!pacienteIdBusca && !isLoading && !modoDispensacaoAtivo && (
            <Alert className="mt-6"><Pill className="h-4 w-4" /><AlertTitle>Aguardando Paciente</AlertTitle><AlertDescription>Informe o código do paciente no campo acima e clique em "Buscar" para carregar prescrições ou iniciar uma dispensação avulsa.</AlertDescription></Alert>
        )}
      </div>
  );
}