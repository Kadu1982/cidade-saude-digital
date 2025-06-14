// src/components/atendimento/AtendimentoForm.tsx

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// ANOTAÇÃO: Define a estrutura e as regras de validação para os dados do formulário de atendimento.
const atendimentoSchema = z.object({
    pacienteId: z.string().min(1, "O campo Paciente é obrigatório."),
    anamnese: z.string().min(10, "A anamnese deve ter pelo menos 10 caracteres."),
    diagnostico: z.string().min(5, "O diagnóstico deve ter pelo menos 5 caracteres."),
    prescricao: z.string().optional(),
    solicitacaoExames: z.string().optional(),
});

// ANOTAÇÃO: Define o tipo de dados que o formulário manipula, inferido diretamente do schema.
export type AtendimentoFormData = z.infer<typeof atendimentoSchema>;

// ANOTAÇÃO: Define as propriedades que o componente 'AtendimentoForm' espera receber.
interface AtendimentoFormProps {
    onSave: (data: AtendimentoFormData) => void; // Uma função para ser chamada quando o formulário for salvo.
    isLoading?: boolean; // Um booleano para controlar o estado de carregamento (ex: desabilitar o botão).
    title: string;
    description: string;
}

export const AtendimentoForm = ({ onSave, isLoading, title, description }: AtendimentoFormProps) => {
    // ANOTAÇÃO: Inicializa o react-hook-form com nosso schema de validação (Zod).
    const form = useForm<AtendimentoFormData>({
        resolver: zodResolver(atendimentoSchema),
        defaultValues: {
            pacienteId: "",
            anamnese: "",
            diagnostico: "",
            prescricao: "",
            solicitacaoExames: "",
        },
    });

    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                {/* ANOTAÇÃO: O provedor de formulário que conecta nossa UI com a lógica do react-hook-form. */}
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSave)} className="space-y-4">
                        {/* ANOTAÇÃO: Cada campo do formulário agora é um 'FormField' controlado, garantindo integração e validação. */}
                        <FormField
                            control={form.control}
                            name="pacienteId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Paciente (Nº Cartão SUS)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Identificação do paciente" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="anamnese"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Anamnese</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Descreva os sintomas e histórico do paciente..." {...field} rows={5} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="diagnostico"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Hipótese Diagnóstica / CID</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Ex: A09 - Diarreia e gastroenterite..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="prescricao"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Prescrição</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Medicamentos, dosagens, etc." {...field} rows={3}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="solicitacaoExames"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Solicitação de Exames</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Ex: Hemograma completo, Raio-X do tórax, etc." {...field} rows={3}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? 'Salvando...' : 'Salvar Atendimento'}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};