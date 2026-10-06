import type { ReactNode } from "react";
import {
  Drawer,
  Stack,
  Group,
  Image,
  Text,
  ActionIcon,
  Button,
  Title,
  Divider,
  Badge,
} from "@mantine/core";
import {
  IconTrash,
  IconPlus,
  IconMinus,
  IconShoppingCart,
} from "@tabler/icons-react";
import { useCart } from "../hooks/useCart";

interface CartDrawerProps {
  opened: boolean;
  onClose: () => void;
}

export function CartDrawer({ opened, onClose }: CartDrawerProps): ReactNode {
  const { items, updateQuantity, removeFromCart, clearCart, totalAmount } =
    useCart();

  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      title="Seu Carrinho de Compras"
      padding="md"
      position="right"
      size="md"
    >
      {items.length === 0 ? (
        <Stack align="center" justify="center" h={300}>
          <IconShoppingCart size={48} color="gray" />
          <Text c="dimmed">Seu carrinho está vazio.</Text>
        </Stack>
      ) : (
        <Stack justify="space-between" h="100%">
          <Stack
            gap="md"
            style={{ overflowY: "auto", maxHeight: "calc(100vh - 220px)" }}
          >
            {items.map(({ product, quantity }) => (
              <Group
                key={product.id}
                justify="space-between"
                align="center"
                wrap="nowrap"
              >
                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  w={60}
                  h={60}
                  radius="md"
                  fit="cover"
                />
                <Stack gap={2} style={{ flex: 1 }}>
                  <Text size="sm" fw={500} truncate="end">
                    {product.title}
                  </Text>
                  <Text size="xs" c="dimmed">
                    ${product.price.toFixed(2)} un.
                  </Text>
                  <Group gap={6} mt={4}>
                    <ActionIcon
                      size="xs"
                      variant="default"
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                    >
                      <IconMinus size={12} />
                    </ActionIcon>
                    <Badge size="sm" variant="light">
                      {quantity}
                    </Badge>
                    <ActionIcon
                      size="xs"
                      variant="default"
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                    >
                      <IconPlus size={12} />
                    </ActionIcon>
                  </Group>
                </Stack>
                <Stack align="flex-end" gap={2}>
                  <Text fw={600} size="sm">
                    ${(product.price * quantity).toFixed(2)}
                  </Text>
                  <ActionIcon
                    color="red"
                    variant="subtle"
                    size="sm"
                    onClick={() => removeFromCart(product.id)}
                  >
                    <IconTrash size={16} />
                  </ActionIcon>
                </Stack>
              </Group>
            ))}
          </Stack>

          <Stack gap="xs" mt="md">
            <Divider />
            <Group justify="space-between">
              <Title order={4}>Total:</Title>
              <Title order={3} c="blue">
                ${totalAmount.toFixed(2)}
              </Title>
            </Group>
            <Button
              fullWidth
              color="blue"
              size="md"
              onClick={() =>
                alert("Simulação de compra finalizada com sucesso!")
              }
            >
              Finalizar Pedido
            </Button>
            <Button variant="subtle" color="gray" size="xs" onClick={clearCart}>
              Esvaziar Carrinho
            </Button>
          </Stack>
        </Stack>
      )}
    </Drawer>
  );
}
