import type { ReactNode } from "react";
import { useState } from "react";
import {
  AppShell,
  Group,
  Title,
  Button,
  Container,
  Badge,
  ActionIcon,
  Indicator,
} from "@mantine/core";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  IconShoppingBag,
  IconUser,
  IconLogout,
  IconLock,
  IconShoppingCart,
} from "@tabler/icons-react";
import { useAuth } from "../hooks/useAuth";
import { useCart } from "../hooks/useCart";
import { CartDrawer } from "../components/CartDrawer";

export function AppLayout(): ReactNode {
  const { user, isAuthenticated, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [cartOpened, setCartOpened] = useState(false);

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
            <Group
              gap="xs"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/")}
            >
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

              <Indicator
                label={totalItems}
                size={16}
                color="blue"
                disabled={totalItems === 0}
              >
                <ActionIcon
                  variant="light"
                  size="lg"
                  color="blue"
                  onClick={() => setCartOpened(true)}
                >
                  <IconShoppingCart size={20} />
                </ActionIcon>
              </Indicator>

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

      <CartDrawer opened={cartOpened} onClose={() => setCartOpened(false)} />
    </AppShell>
  );
}
