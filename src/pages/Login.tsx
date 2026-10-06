import type { ReactNode } from "react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  TextInput,
  PasswordInput,
  Button,
  Paper,
  Title,
  Container,
  Alert,
  Text,
  Code,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { IconAlertCircle } from "@tabler/icons-react";
import { useAuth } from "../hooks/useAuth";
import { loginSchema } from "../schemas/authSchema";
import type { LoginFormData } from "../schemas/authSchema";

export function Login(): ReactNode {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const from =
    (location.state as { from?: { pathname: string } })?.from?.pathname ||
    "/admin";

  const form = useForm<LoginFormData>({
    initialValues: {
      username: "",
      password: "",
    },
    validate: zodResolver(loginSchema),
  });

  const handleSubmit = async (values: LoginFormData) => {
    try {
      setLoading(true);
      setErrorMessage(null);
      await login(values);
      navigate(from, { replace: true });
    } catch (err: unknown) {
      if (err && typeof err === "object" && "response" in err) {
        const axiosError = err as {
          response?: { data?: { message?: string } };
        };
        setErrorMessage(
          axiosError.response?.data?.message ||
            "Credenciais inválidas. Tente novamente.",
        );
      } else {
        setErrorMessage("Erro de rede ao tentar fazer login.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size={420} my={40}>
      <Title ta="center" order={2}>
        Acesso Administrativo
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Use as credenciais de teste da DummyJSON
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        {errorMessage && (
          <Alert
            icon={<IconAlertCircle size={16} />}
            title="Erro de Autenticação"
            color="red"
            mb="md"
          >
            {errorMessage}
          </Alert>
        )}

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="Usuário"
            placeholder="ex: emilys"
            required
            {...form.getInputProps("username")}
          />
          <PasswordInput
            label="Senha"
            placeholder="Sua senha"
            required
            mt="md"
            {...form.getInputProps("password")}
          />

          <Button type="submit" fullWidth mt="xl" loading={loading}>
            Entrar
          </Button>
        </form>

        <Paper bg="gray.0" p="xs" mt="md" radius="sm">
          <Text size="xs" c="dimmed">
            💡 <b>Dica de teste DummyJSON:</b>
            <br />
            Usuário: <Code>emilys</Code> | Senha: <Code>emilyspass</Code>
          </Text>
        </Paper>
      </Paper>
    </Container>
  );
}
