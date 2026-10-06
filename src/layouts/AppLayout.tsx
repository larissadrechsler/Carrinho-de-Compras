import type { ReactNode } from "react";
import {
  AppShell,
  Group,
  Title,
  Button,
  Container,
  Badge,
} from "@mantine/core";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  IconShoppingBag,
  IconUser,
  IconLogout,
  IconLock,
} from "@tabler/icons-react";
import { useAuth } from "../hooks/useAuth";

export function AppLayout(): ReactNode {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header
        style={{ borderBottom: "1px solid var(--mantine-color-gray-3)" }}
      >
        <Container size="lg" h="100%">
          <Group h="100%" justify="space-between">
            <Group gap="xs">
              <IconShoppingBag size={28} color="#228be6" />
              <Title order={3}>DummyStore</Title>
            </Group>

            <Group gap="md">
              <Button
                component={NavLink}
                to="/"
                variant="subtle"
                color="gray"
                style={{
                  fontWeight: location.pathname === "/" ? "bold" : "normal",
                }}
              >
                Catálogo
              </Button>

              {isAuthenticated && (
                <Button
                  component={NavLink}
                  to="/admin"
                  variant="subtle"
                  color="blue"
                  leftSection={<IconLock size={16} />}
                  style={{
                    fontWeight: location.pathname.startsWith("/admin")
                      ? "bold"
                      : "normal",
                  }}
                >
                  Painel Admin
                </Button>
              )}

              {isAuthenticated ? (
                <Group gap="xs">
                  <Badge variant="light" color="blue" size="lg">
                    {user?.firstName}
                  </Badge>
                  <Button
                    variant="outline"
                    color="red"
                    size="xs"
                    onClick={handleLogout}
                    leftSection={<IconLogout size={14} />}
                  >
                    Sair
                  </Button>
                </Group>
              ) : (
                <Button
                  component={NavLink}
                  to="/login"
                  variant="filled"
                  color="blue"
                  leftSection={<IconUser size={16} />}
                >
                  Entrar
                </Button>
              )}
            </Group>
          </Group>
        </Container>
      </AppShell.Header>

      <AppShell.Main>
        <Container size="lg" py="md">
          <Outlet />
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}
