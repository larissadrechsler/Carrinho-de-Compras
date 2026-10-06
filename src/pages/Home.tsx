import type { ReactNode } from "react";
import { useState, useEffect } from "react";
import {
  SimpleGrid,
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  TextInput,
  Select,
  Pagination,
  LoadingOverlay,
  Box,
  Title,
  Rating,
  Stack,
} from "@mantine/core";
import { IconSearch, IconShoppingCart } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import type { Product, ProductsResponse } from "../types/product";
import { useCart } from "../hooks/useCart";

export function Home(): ReactNode {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { addToCart } = useCart();
  const PAGE_SIZE = 9;

  useEffect(() => {
    api
      .get<string[]>("/products/category-list")
      .then((res) => setCategories(res.data))
      .catch(() => setCategories([]));
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const skip = (page - 1) * PAGE_SIZE;
        let url = `/products?limit=${PAGE_SIZE}&skip=${skip}`;

        if (search.trim()) {
          url = `/products/search?q=${encodeURIComponent(search)}&limit=${PAGE_SIZE}&skip=${skip}`;
        } else if (selectedCategory) {
          url = `/products/category/${selectedCategory}?limit=${PAGE_SIZE}&skip=${skip}`;
        }

        const response = await api.get<ProductsResponse>(url);
        setProducts(response.data.products);
        setTotalPages(Math.ceil(response.data.total / PAGE_SIZE));
      } catch {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchProducts, 300);
    return () => clearTimeout(timer);
  }, [search, selectedCategory, page]);

  return (
    <Box style={{ position: "relative", minHeight: "600px" }}>
      <LoadingOverlay
        visible={loading}
        zIndex={10}
        overlayProps={{ blur: 1 }}
      />

      <Stack gap="md" mb="xl">
        <Title order={2}>Catálogo de Produtos</Title>
        <Group grow align="flex-end">
          <TextInput
            placeholder="Buscar por nome do produto..."
            leftSection={<IconSearch size={16} />}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
          <Select
            placeholder="Filtrar por Categoria"
            clearable
            data={categories.map((c) => ({
              value: c,
              label: c.replace("-", " "),
            }))}
            value={selectedCategory}
            onChange={(val) => {
              setSelectedCategory(val);
              setSearch("");
              setPage(1);
            }}
          />
        </Group>
      </Stack>

      {products.length === 0 && !loading ? (
        <Text ta="center" c="dimmed" my="xl">
          Nenhum produto encontrado.
        </Text>
      ) : (
        <>
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
            {products.map((product) => (
              <Card
                key={product.id}
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
                style={{ display: "flex", flexDirection: "column" }}
              >
                <Card.Section
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/produtos/${product.id}`)}
                >
                  <Image
                    src={product.thumbnail}
                    height={160}
                    alt={product.title}
                    fit="cover"
                  />
                </Card.Section>

                <Group justify="space-between" mt="md" mb="xs">
                  <Text
                    fw={600}
                    truncate="end"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(`/produtos/${product.id}`)}
                  >
                    {product.title}
                  </Text>
                  <Badge color="blue">{product.category}</Badge>
                </Group>

                <Group gap="xs" mb="sm">
                  <Rating
                    value={product.rating}
                    fractions={2}
                    readOnly
                    size="xs"
                  />
                  <Text size="xs" c="dimmed">
                    ({product.rating.toFixed(1)})
                  </Text>
                </Group>

                <Text
                  size="sm"
                  c="dimmed"
                  lineClamp={2}
                  style={{ flex: 1 }}
                  mb="md"
                >
                  {product.description}
                </Text>

                <Group justify="space-between" align="center" mt="auto">
                  <Text size="xl" fw={700} c="blue">
                    ${product.price.toFixed(2)}
                  </Text>
                  <Button
                    leftSection={<IconShoppingCart size={16} />}
                    size="xs"
                    onClick={() => addToCart(product)}
                  >
                    Adicionar
                  </Button>
                </Group>
              </Card>
            ))}
          </SimpleGrid>

          <Group justify="center" mt="xl">
            <Pagination total={totalPages} value={page} onChange={setPage} />
          </Group>
        </>
      )}
    </Box>
  );
}
