import { Title, Text, Alert } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import { useAuth } from "../hooks/useAuth";

export function Admin() {
  const { user } = useAuth();

  return (
    <div>
      <Title order={2}>Painel Administrativo</Title>
      <Alert
        icon={<IconCheck size={16} />}
        title="Acesso Concedido"
        color="green"
        mt="md"
      >
        Bem-vindo(a) área protegida,{" "}
        <b>
          {user?.firstName} {user?.lastName}
        </b>
        !
      </Alert>
      <Text mt="md">
        A gestão e cadastro de novos produtos serão montados na Etapa 5.
      </Text>
    </div>
  );
}
