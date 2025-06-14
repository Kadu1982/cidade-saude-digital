// src/components/agendamento/AgendarConsulta.tsx

// ANOTAÇÃO: CORREÇÃO APLICADA. A importação do 'Controller' foi removida, pois ele não é usado diretamente.
// O componente 'FormField' já faz o trabalho de controle.
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// ANOTAÇÃO: Importa os componentes de UI necessários.
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

// ANOTAÇÃO: Define o 'schema' de validação com Zod.
const consultaSchema = z.object({
  cartaoSus: z.string().min(1, "O número do Cartão SUS é obrigatório."),
  unidade: z.string().min(1, "A unidade de saúde é obrigatória."),
  especialidade: z.string().min(1, "A especialidade é obrigatória."),
  profissional: z.string().min(1, "O profissional é obrigatório."),
});

// ANOTAÇÃO: Define o componente do formulário de agendamento de consulta.
export const AgendarConsulta = () => {
  const { toast } = useToast();
  // ANOTAÇÃO: Inicializa o hook de formulário com o schema de validação.
  const form = useForm<z.infer<typeof consultaSchema>>({
    resolver: zodResolver(consultaSchema),
    defaultValues: {
      cartaoSus: "",
      unidade: "",
      especialidade: "",
      profissional: "",
    },
  });

  // ANOTAÇÃO: Função chamada no 'submit' do formulário.
  const onSubmit = (data: z.infer<typeof consultaSchema>) => {
    console.log("Dados da Consulta:", data);
    toast({
      title: "Agendamento de Consulta",
      description: "A consulta foi agendada com sucesso!",
    });
  };

  return (
      <Card>
        <CardHeader>
          <CardTitle>Preencher detalhes da Consulta</CardTitle>
        </CardHeader>
        <CardContent>
          {/* ANOTAÇÃO: O componente Form provê o contexto para o react-hook-form. */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                  control={form.control}
                  name="cartaoSus"
                  render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nº do Cartão SUS do Paciente</FormLabel>
                        <FormControl>
                          <Input placeholder="Digite o número do cartão" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                  )}
              />

              <FormField
                  control={form.control}
                  name="unidade"
                  render={({ field }) => (
                      <FormItem>
                        <FormLabel>Unidade de Saúde</FormLabel>
                        <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione a unidade" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="ubs_centro">UBS Centro</SelectItem>
                            <SelectItem value="ubs_bairro_novo">
                              UBS Bairro Novo
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                  )}
              />

              <FormField
                  control={form.control}
                  name="especialidade"
                  render={({ field }) => (
                      <FormItem>
                        <FormLabel>Especialidade</FormLabel>
                        <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione a especialidade" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="clinica_geral">
                              Clínica Geral
                            </SelectItem>
                            <SelectItem value="cardiologia">Cardiologia</SelectItem>
                            <SelectItem value="pediatria">Pediatria</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                  )}
              />

              <FormField
                  control={form.control}
                  name="profissional"
                  render={({ field }) => (
                      <FormItem>
                        <FormLabel>Profissional</FormLabel>
                        <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o profissional" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="dr_joao">Dr. João Silva</SelectItem>
                            <SelectItem value="dra_maria">Dra. Maria Souza</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                  )}
              />

              <Button type="submit" className="w-full">
                Confirmar Agendamento
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
  );
};