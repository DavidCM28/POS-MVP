export type SaleLine = {
  productId: string;
  name: string;
  quantity: number;
  unitPrice: number;
};

export type Sale = {
  id: string;
  createdAt: string;
  lines: SaleLine[];
  paymentMethod: "cash" | "card" | "transfer";
};
