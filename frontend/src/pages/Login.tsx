// src/pages/Login.tsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useOperador } from '@/contexts/OperadorContext';
import apiService from '@/lib/api';

export default function Login() {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useOperador();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await apiService.post('/operadores/login', {
        login: usuario,
        senha: senha,
      });

      const { token, operador } = response.data;
      login(token, operador);

      if (operador.perfis.includes('ADMIN')) {
        navigate('/dashboard');
      } else if (operador.perfis.includes('RECEPCAO')) {
        navigate('/recepcao');
      } else {
        navigate('/dashboard');
      }

    } catch (err) {
      setError('Usuário ou senha inválidos');
      console.error('Erro no login:', err);
    }
  };

  return (
      <Card className="w-full max-w-md mx-auto mt-32 shadow-xl border rounded-2xl bg-white">
        <CardHeader>
          <CardTitle>Login do Operador</CardTitle>
          <CardDescription>Acesso restrito aos profissionais do sistema.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="mb-4 text-left">
              <Label htmlFor="usuario">Login</Label>
              <Input
                  id="usuario"
                  placeholder="ex: nome.sobrenome"
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                  required
              />
            </div>
            <div className="mb-4 text-left">
              <Label htmlFor="senha">Senha</Label>
              <Input
                  id="senha"
                  type="password"
                  placeholder="••••••••"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full mt-2">
              Entrar
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center text-xs text-muted-foreground">
          Município Inteligente © {new Date().getFullYear()}
        </CardFooter>
      </Card>
  );
}
