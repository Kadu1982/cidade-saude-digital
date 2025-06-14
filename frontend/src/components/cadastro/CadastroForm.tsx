import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
// ANOTAÇÃO 1 (CORREÇÃO):
// A linha de importação abaixo foi corrigida.
// Adicionamos `SelectContent`, `SelectTrigger`, e `SelectValue`.
// Estes são componentes essenciais para construir um menu de seleção funcional
// com a biblioteca Radix UI (que é a base para os componentes de shadcn/ui).
// Sem eles, o TypeScript não reconhece esses componentes no código, gerando um erro.
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

// ANOTAÇÃO 2 (BOA PRÁTICA):
// O `formSchema` define a "forma" dos dados do nosso formulário usando Zod.
// É uma excelente prática para garantir que os dados sejam válidos
// antes mesmo de serem enviados para qualquer lógica de negócio.
const formSchema = z.object({
    nome: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
    dataNascimento: z.string().min(1, "Data de nascimento é obrigatória"),
    cpf: z.string().min(11, "CPF inválido").max(14, "CPF inválido"),
    cartaoSus: z.string().min(15, "Cartão SUS inválido"),
    sexo: z.enum(["masculino", "feminino", "outro"], {
        errorMap: () => ({ message: "Selecione o sexo." }),
    }),
    endereco: z.string().min(5, "Endereço deve ter pelo menos 5 caracteres"),
    telefone: z.string().min(10, "Telefone inválido"),
    email: z.string().email("Email inválido").optional().or(z.literal("")),
});

export const CadastroForm = () => {
    const { toast } = useToast();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nome: "",
            dataNascimento: "",
            cpf: "",
            cartaoSus: "",
            sexo: undefined,
            endereco: "",
            telefone: "",
            email: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        toast({
            title: "Cadastro realizado com sucesso",
            description: `O munícipe ${values.nome} foi cadastrado.`,
        });
        form.reset();
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="nome"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nome Completo</FormLabel>
                                <FormControl>
                                    <Input placeholder="Nome completo do munícipe" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="dataNascimento"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Data de Nascimento</FormLabel>
                                <FormControl>
                                    <Input type="date" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="cpf"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>CPF</FormLabel>
                                <FormControl>
                                    <Input placeholder="000.000.000-00" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="cartaoSus"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Cartão Nacional de Saúde (CNS)</FormLabel>
                                <FormControl>
                                    <Input placeholder="000 0000 0000 0000" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* ANOTAÇÃO 3 (DEMONSTRAÇÃO DE USO):
                        // Este é o campo que causava o erro. Note como usamos os componentes que importamos:
                        // - `Select` é o contêiner geral.
                        // - `SelectTrigger` é o botão que mostra o valor selecionado (`SelectValue`).
                        // - `SelectContent` é a lista que se abre.
                        // - `SelectItem` são as opções clicáveis.
                        // O `onValueChange` e `value` são controlados pelo `react-hook-form` através do `field`.
                    */}
                    <FormField
                        control={form.control}
                        name="sexo"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Sexo</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione o sexo" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="masculino">Masculino</SelectItem>
                                        <SelectItem value="feminino">Feminino</SelectItem>
                                        <SelectItem value="outro">Outro</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="telefone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Telefone</FormLabel>
                                <FormControl>
                                    <Input placeholder="(00) 00000-0000" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="endereco"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Endereço</FormLabel>
                            <FormControl>
                                <Input placeholder="Rua, número, bairro..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type="email" placeholder="exemplo@email.com" {...field} />
                            </FormControl>
                            <FormDescription>
                                O email é opcional, mas ajuda no envio de lembretes.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Cadastrar Munícipe</Button>
            </form>
        </Form>
    );
};