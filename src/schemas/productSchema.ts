import { z } from "zod";

export const productSchema = z.object({
  title: z.string().min(3, "O título deve ter pelo menos 3 caracteres"),
  price: z.number().gt(0, "O preço deve ser maior que zero"),
  category: z.string().min(1, "Selecione uma categoria"),
  description: z
    .string()
    .min(5, "A descrição deve ter pelo menos 5 caracteres"),
  stock: z
    .number()
    .int()
    .nonnegative("O estoque deve ser um número inteiro maior ou igual a 0"),
});

export type ProductFormData = z.infer<typeof productSchema>;
