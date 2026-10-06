import type { ReactNode } from "react";
import { useState, useEffect } from "react";
import {
  Table,
  Group,
  Text,
  ActionIcon,
  Title,
  Button,
  TextInput,
  Modal,
  NumberInput,
  Select,
  Textarea,
  Paper,
  Stack,
  Badge,
  LoadingOverlay,
  Box,
  Image,
  Alert,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import {
  IconPlus,
  IconEdit,
  IconTrash,
  IconSearch,
  IconCheck,
} from "@tabler/icons-react";
import { api } from "../services/api";
import type { Product, ProductsResponse } from "../types/product";
import { productSchema } from "../schemas/productSchema";
import type { ProductFormData } from "../schemas/productSchema";

export function Admin(): ReactNode {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [modalOpened, setModalOpened] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const form = useForm<ProductFormData>({
    initialValues: {
      title: "",
      price: 0,
      category: "",
      description: "",
      stock: 0,
    },
    validate: zodResolver(productSchema),
  });

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await api.get<ProductsResponse>("/products?limit=20");
      setProducts(response.data.products);
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    api
      .get<string[]>("/products/category-list")
      .then((res) => setCategories(res.data))
      .catch(() => setCategories([]));
  }, []);

  const handleOpenModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      form.setValues({
        title: product.title,
        price: product.price,
        category: product.category,
        description: product.description,
        stock: product.stock,
      });
    } else {
      setEditingProduct(null);
      form.reset();
    }
    setModalOpened(true);
  };

  const handleSubmit = async (values: ProductFormData) => {
    try {
      if (editingProduct) {
        try {
          await api.put(`/products/${editingProduct.id}`, values);
        } catch {
          console.warn(
            "API não pôde atualizar o produto remoto. Atualizando localmente...",
          );
        }

        setProducts((prev) =>
          prev.map((p) =>
            p.id === editingProduct.id ? { ...p, ...values } : p,
          ),
        );
        showFeedback("Produto atualizado com sucesso!");
      } else {
        try {
          const response = await api.post<Product>("/products/add", values);
          const newProduct: Product = {
            ...response.data,
            id: response.data.id || Date.now(),
            thumbnail:
              "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg",
            images: [],
            discountPercentage: 0,
            rating: 5,
            brand: "Própria",
          };
          setProducts((prev) => [newProduct, ...prev]);
        } catch {
          const newProduct: Product = {
            id: Date.now(),
            title: values.title,
            price: values.price,
            category: values.category,
            description: values.description,
            stock: values.stock,
            thumbnail:
              "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg",
            images: [],
            discountPercentage: 0,
            rating: 5,
            brand: "Própria",
          };
          setProducts((prev) => [newProduct, ...prev]);
        }
        showFeedback("Novo produto cadastrado com sucesso!");
      }
      setModalOpened(false);
    } catch {
      alert("Erro inesperado ao processar o produto.");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Deseja realmente excluir este produto?")) return;
    try {
      await api.delete(`/products/${id}`);
    } catch {
      console.warn(
        "API não pôde remover o produto remoto. Removendo localmente...",
      );
    } finally {
      setProducts((prev) => prev.filter((p) => p.id !== id));
      showFeedback("Produto removido com sucesso!");
    }
  };

  const showFeedback = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Box style={{ position: "relative" }}>
      <LoadingOverlay visible={loading} />

      <Stack gap="md" mb="xl">
        <Group justify="space-between" align="center">
          <div>
            <Title order={2}>Painel de Gestão de Produtos</Title>
            <Text c="dimmed" size="sm">
              Área restrita para inclusão, edição e exclusão de itens
            </Text>
          </div>
          <Button
            leftSection={<IconPlus size={16} />}
            onClick={() => handleOpenModal()}
          >
            Novo Produto
          </Button>
        </Group>

        {notification && (
          <Alert icon={<IconCheck size={16} />} title="Sucesso" color="green">
            {notification}
          </Alert>
        )}

        <TextInput
          placeholder="Filtrar por nome do produto..."
          leftSection={<IconSearch size={16} />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Stack>

      <Paper withBorder radius="md" style={{ overflowX: "auto" }}>
        <Table verticalSpacing="sm" highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Produto</Table.Th>
              <Table.Th>Categoria</Table.Th>
              <Table.Th>Preço</Table.Th>
              <Table.Th>Estoque</Table.Th>
              <Table.Th style={{ textAlign: "right" }}>Ações</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {filteredProducts.length === 0 ? (
              <Table.Tr>
                <Table.Td colSpan={5} style={{ textAlign: "center" }}>
                  <Text c="dimmed">Nenhum produto encontrado.</Text>
                </Table.Td>
              </Table.Tr>
            ) : (
              filteredProducts.map((p) => (
                <Table.Tr key={p.id}>
                  <Table.Td>
                    <Group gap="sm" wrap="nowrap">
                      <Image
                        src={p.thumbnail}
                        w={40}
                        h={40}
                        radius="sm"
                        fit="cover"
                      />
                      <div>
                        <Text size="sm" fw={500}>
                          {p.title}
                        </Text>
                        <Text size="xs" c="dimmed" lineClamp={1}>
                          {p.description}
                        </Text>
                      </div>
                    </Group>
                  </Table.Td>
                  <Table.Td>
                    <Badge color="blue" variant="light">
                      {p.category}
                    </Badge>
                  </Table.Td>
                  <Table.Td>
                    <Text size="sm" fw={600}>
                      ${p.price.toFixed(2)}
                    </Text>
                  </Table.Td>
                  <Table.Td>
                    <Text size="sm">{p.stock} un.</Text>
                  </Table.Td>
                  <Table.Td>
                    <Group gap={4} justify="flex-end">
                      <ActionIcon
                        variant="subtle"
                        color="blue"
                        onClick={() => handleOpenModal(p)}
                      >
                        <IconEdit size={16} />
                      </ActionIcon>
                      <ActionIcon
                        variant="subtle"
                        color="red"
                        onClick={() => handleDelete(p.id)}
                      >
                        <IconTrash size={16} />
                      </ActionIcon>
                    </Group>
                  </Table.Td>
                </Table.Tr>
              ))
            )}
          </Table.Tbody>
        </Table>
      </Paper>

      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title={editingProduct ? "Editar Produto" : "Cadastrar Novo Produto"}
        centered
        size="md"
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack gap="sm">
            <TextInput
              label="Título do Produto"
              placeholder="ex: iPhone 15 Pro"
              required
              {...form.getInputProps("title")}
            />

            <Group grow>
              <NumberInput
                label="Preço ($)"
                placeholder="0.00"
                decimalScale={2}
                min={0.01}
                required
                {...form.getInputProps("price")}
              />
              <NumberInput
                label="Estoque (unidades)"
                placeholder="0"
                min={0}
                required
                {...form.getInputProps("stock")}
              />
            </Group>

            <Select
              label="Categoria"
              placeholder="Selecione..."
              data={categories.map((c) => ({
                value: c,
                label: c.replace("-", " "),
              }))}
              required
              {...form.getInputProps("category")}
            />

            <Textarea
              label="Descrição"
              placeholder="Descreva as principais características..."
              rows={3}
              required
              {...form.getInputProps("description")}
            />

            <Group justify="flex-end" mt="md">
              <Button variant="default" onClick={() => setModalOpened(false)}>
                Cancelar
              </Button>
              <Button type="submit" color="blue">
                {editingProduct ? "Salvar Alterações" : "Cadastrar"}
              </Button>
            </Group>
          </Stack>
        </form>
      </Modal>
    </Box>
  );
}
