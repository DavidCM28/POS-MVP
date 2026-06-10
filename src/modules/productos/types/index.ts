export type ProductCategory = {
  id: string;
  name: string;
};

export type Product = {
  id: string;
  name: string;
  sku: string;
  categoryId: string;
  price: number;
  stock: number;
  isActive: boolean;
};
