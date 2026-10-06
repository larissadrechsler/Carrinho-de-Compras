import type { ReactNode } from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  Image,
  Title,
  Text,
  Badge,
  Group,
  Button,
  Rating,
  NumberInput,
  LoadingOverlay,
  Box,
  Paper,
  Stack,
  Divider,
} from "@mantine/core";
import { IconShoppingCart, IconArrowLeft } from "@tabler/icons-react";
import { api } from "../services/api";
import type { Product } from "../types/product";
import { useCart } from "../hooks/useCart";

export function ProductDetails(): ReactNode {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api
      .get<Product>(`/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setSelectedImage(res.data.thumbnail || res.data.images[0]);
      })
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <Box style={{ height: "400px", position: "relative" }}>
        <LoadingOverlay visible={true} />
      </Box>
    );
  }

  if (!product) {
    return (
      <Container size="md" py="xl">
        <Text c="red">Produto não encontrado.</Text>
        <Button mt="md" onClick={() => navigate("/")}>
          Voltar ao Catálogo
        </Button>
      </Container>
    );
  }

  return (
    <Container size="lg" py="md">
      <Button
        variant="subtle"
        leftSection={<IconArrowLeft size={16} />}
        onClick={() => navigate("/")}
        mb="md"
      >
        Voltar para os produtos
      </Button>

      <Paper p="lg" radius="md" withBorder shadow="sm">
        <Grid overflow="hidden">
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Stack gap="md">
              <Image
                src={selectedImage}
                alt={product.title}
                radius="md"
                h={350}
                fit="contain"
                bg="gray.0"
              />
              <Group gap="xs">
                {product.images?.map((img, index) => (
                  <Image
                    key={index}
                    src={img}
                    w={60}
                    h={60}
                    radius="sm"
                    fit="cover"
                    style={{
                      cursor: "pointer",
                      border:
                        selectedImage === img
                          ? "2px solid #228be6"
                          : "1px solid #dee2e6",
                    }}
                    onClick={() => setSelectedImage(img)}
                  />
                ))}
              </Group>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 6 }}>
            <Stack gap="sm">
              <Group justify="space-between">
                <Badge size="lg" color="blue">
                  {product.category}
                </Badge>
                <Text size="sm" c="dimmed">
                  Marca: <b>{product.brand || "N/A"}</b>
                </Text>
              </Group>

              <Title order={2}>{product.title}</Title>

              <Group gap="xs">
                <Rating value={product.rating} fractions={2} readOnly />
                <Text size="sm" c="dimmed">
                  ({product.rating.toFixed(1)})
                </Text>
              </Group>

              <Text size="xl" fw={700} c="blue" mt="xs">
                ${product.price.toFixed(2)}
              </Text>

              <Text c="dimmed" size="sm" mt="sm">
                {product.description}
              </Text>

              <Divider my="md" />

              <Group align="flex-end" gap="md">
                <NumberInput
                  label="Quantidade"
                  value={quantity}
                  onChange={(val) => setQuantity(Number(val) || 1)}
                  min={1}
                  max={product.stock}
                  w={120}
                />
                <Button
                  size="md"
                  leftSection={<IconShoppingCart size={18} />}
                  onClick={() => addToCart(product, quantity)}
                >
                  Adicionar ao Carrinho
                </Button>
              </Group>
            </Stack>
          </Grid.Col>
        </Grid>
      </Paper>
    </Container>
  );
}
