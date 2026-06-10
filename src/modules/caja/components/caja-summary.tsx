"use client";

import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { cn } from "@/shared/utils/cn";
import {
  Banknote,
  Barcode,
  BarChart3,
  Check,
  Clock3,
  CreditCard,
  DollarSign,
  Landmark,
  Minus,
  Package,
  Pause,
  Play,
  Plus,
  Search,
  ShoppingCart,
  TicketPercent,
  Trash2,
  Trophy,
  UserRound,
  UserPlus,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";

const categories = [
  "Todos",
  "Bebidas",
  "Comida",
  "Limpieza",
  "Servicios",
  "Promociones",
];

const products = [
  {
    id: "coca-cola-600",
    name: "Coca-Cola 600ml",
    category: "Bebidas",
    price: 18,
    badge: "En stock",
    initials: "CC",
    tone: "bg-red-100 text-red-700",
  },
  {
    id: "sabritas",
    name: "Sabritas",
    category: "Comida",
    price: 22,
    badge: "En stock",
    initials: "SA",
    tone: "bg-yellow-100 text-yellow-700",
  },
  {
    id: "cafe-americano",
    name: "Cafe Americano",
    category: "Bebidas",
    price: 28,
    badge: "En stock",
    initials: "CA",
    tone: "bg-stone-100 text-stone-700",
  },
  {
    id: "pan-dulce",
    name: "Pan dulce",
    category: "Comida",
    price: 15,
    badge: "En stock",
    initials: "PD",
    tone: "bg-orange-100 text-orange-700",
  },
  {
    id: "agua-natural",
    name: "Agua natural",
    category: "Bebidas",
    price: 14,
    badge: "En stock",
    initials: "AG",
    tone: "bg-sky-100 text-sky-700",
  },
  {
    id: "sandwich",
    name: "Sandwich",
    category: "Comida",
    price: 48,
    badge: "En stock",
    initials: "SW",
    tone: "bg-amber-100 text-amber-700",
  },
  {
    id: "galletas",
    name: "Galletas",
    category: "Comida",
    price: 19,
    badge: "En stock",
    initials: "GA",
    tone: "bg-yellow-100 text-amber-800",
  },
  {
    id: "jugo-naranja",
    name: "Jugo naranja",
    category: "Bebidas",
    price: 20,
    badge: "En stock",
    initials: "JN",
    tone: "bg-orange-100 text-orange-700",
  },
  {
    id: "detergente",
    name: "Detergente liquido",
    category: "Limpieza",
    price: 42,
    badge: "En stock",
    initials: "DL",
    tone: "bg-cyan-100 text-cyan-700",
  },
  {
    id: "recarga",
    name: "Recarga telefonica",
    category: "Servicios",
    price: 100,
    badge: "Disponible",
    initials: "RT",
    tone: "bg-indigo-100 text-indigo-700",
  },
  {
    id: "combo-cafe-pan",
    name: "Combo cafe + pan",
    category: "Promociones",
    price: 38,
    badge: "Promo",
    initials: "CP",
    tone: "bg-emerald-100 text-emerald-700",
  },
];

const initialCartItems = [
  { productId: "coca-cola-600", quantity: 2 },
  { productId: "sabritas", quantity: 1 },
  { productId: "cafe-americano", quantity: 1 },
  { productId: "pan-dulce", quantity: 2 },
];

const frequentProducts = products.slice(2, 6);

const pausedSales = [
  { folio: "VNT-01086", products: "3 productos", total: "$67.00" },
  { folio: "VNT-01085", products: "5 productos", total: "$125.50" },
];

const daySummary = [
  {
    label: "Ventas hoy",
    value: "$12,480",
    detail: "12.5% vs ayer",
    icon: DollarSign,
    color: "bg-blue-600",
  },
  {
    label: "Tickets",
    value: "86",
    detail: "8.1% vs ayer",
    icon: Trophy,
    color: "bg-emerald-600",
  },
  {
    label: "Promedio por ticket",
    value: "$145",
    detail: "5.3% vs ayer",
    icon: BarChart3,
    color: "bg-amber-500",
  },
];

const paymentMethods = [
  {
    id: "cash",
    label: "Efectivo",
    icon: Banknote,
    className: "border-emerald-400 bg-emerald-50/50 text-emerald-700",
  },
  {
    id: "card",
    label: "Tarjeta",
    icon: CreditCard,
    className: "border-slate-200 bg-white text-blue-700",
  },
  {
    id: "transfer",
    label: "Transferencia",
    icon: Landmark,
    className: "border-slate-200 bg-white text-violet-700",
  },
  {
    id: "split",
    label: "Partes",
    icon: DollarSign,
    className: "border-slate-200 bg-white text-[#0b1533]",
  },
];

function formatCurrency(value: number) {
  return `$${value.toFixed(2)}`;
}

export function CajaSummary() {
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [productSearch, setProductSearch] = useState("");
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("cash");
  const [splitPayments, setSplitPayments] = useState({
    cash: "",
    card: "",
    transfer: "",
  });

  const categoryProducts =
    activeCategory === "Todos"
      ? products
      : products.filter((product) => product.category === activeCategory);
  const normalizedProductSearch = productSearch.trim().toLowerCase();
  const filteredProducts = normalizedProductSearch
    ? categoryProducts.filter((product) =>
        [
          product.name,
          product.category,
          product.initials,
          product.badge,
          formatCurrency(product.price),
        ].some((value) => value.toLowerCase().includes(normalizedProductSearch)),
      )
    : categoryProducts;

  const cartProducts = cartItems
    .map((item) => {
      const product = products.find(
        (currentProduct) => currentProduct.id === item.productId,
      );

      if (!product) {
        return null;
      }

      return {
        ...item,
        product,
        subtotal: product.price * item.quantity,
      };
    })
    .filter((item) => item !== null);

  const subtotal = cartProducts.reduce((total, item) => total + item.subtotal, 0);
  const discount = cartProducts.length > 0 ? 10 : 0;
  const tax = subtotal * 0.16;
  const total = subtotal + tax - discount;
  const isSplitPayment = selectedPaymentMethod === "split";
  const splitPaid = Object.values(splitPayments).reduce(
    (sum, value) => sum + (Number(value) || 0),
    0,
  );
  const splitRemaining = Math.max(total - splitPaid, 0);

  function addProduct(productId: string) {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.productId === productId);

      if (existingItem) {
        return currentItems.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...currentItems, { productId, quantity: 1 }];
    });
  }

  function updateQuantity(productId: string, nextQuantity: number) {
    if (nextQuantity <= 0) {
      setCartItems((currentItems) =>
        currentItems.filter((item) => item.productId !== productId),
      );
      return;
    }

    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.productId === productId ? { ...item, quantity: nextQuantity } : item,
      ),
    );
  }

  function removeProduct(productId: string) {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.productId !== productId),
    );
  }

  function updateSplitPayment(method: keyof typeof splitPayments, value: string) {
    setSplitPayments((currentPayments) => ({
      ...currentPayments,
      [method]: value,
    }));
  }

  return (
    <section className="grid min-w-0 gap-5">
      {isPaymentModalOpen && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-slate-950/35 px-4 backdrop-blur-[1px]"
          role="dialog"
          aria-modal="true"
          aria-label="Seleccionar metodo de pago"
        >
          <div className="max-h-[calc(100vh-32px)] w-full max-w-4xl overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/20">
            <div className="flex items-center justify-between gap-4 border-b border-slate-100 p-5">
              <div className="min-w-0">
                <h2 className="text-xl font-extrabold text-[#0b1533]">
                  Cobrar venta
                </h2>
                <p className="mt-1 text-sm font-medium text-slate-500">
                  Elige como se liquidara el ticket antes de finalizar la venta.
                </p>
              </div>
              <button
                className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-[#0b1533] hover:bg-slate-50"
                type="button"
                aria-label="Cerrar cobro"
                onClick={() => setIsPaymentModalOpen(false)}
              >
                <X className="size-5" aria-hidden />
              </button>
            </div>

            <div className="grid gap-5 p-5">
              <div className="flex items-center justify-between gap-4 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
                <span className="text-sm font-bold text-slate-600">
                  Total a cobrar
                </span>
                <span className="text-2xl font-extrabold text-emerald-600">
                  {formatCurrency(total)}
                </span>
              </div>

              <div className="grid min-w-0 gap-4 md:grid-cols-2 xl:grid-cols-4">
                {paymentMethods.map((method) => {
                  const Icon = method.icon;
                  const isSelected = selectedPaymentMethod === method.id;
                  const descriptions: Record<string, string> = {
                    cash: "Registra el cobro completo en efectivo. Ideal para ventas rapidas de mostrador.",
                    card: "Usa terminal bancaria o lector. La venta queda marcada como pago con tarjeta.",
                    transfer:
                      "Registra pagos por SPEI o transferencia validada antes de cerrar el ticket.",
                    split:
                      "Divide el total entre varios metodos cuando el cliente paga por partes.",
                  };

                  return (
                    <button
                      key={method.id}
                      className={cn(
                        "grid min-h-44 content-between rounded-lg border border-slate-200 bg-white p-4 text-left transition-colors hover:border-blue-300 hover:bg-blue-50/30",
                        isSelected &&
                          "border-blue-600 bg-blue-50/50 ring-1 ring-blue-600/20",
                      )}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => setSelectedPaymentMethod(method.id)}
                    >
                      <span className="grid gap-3">
                        <span
                          className={cn(
                            "flex size-11 items-center justify-center rounded-lg",
                            method.className,
                            isSelected && "border-blue-600",
                          )}
                        >
                          <Icon className="size-5" aria-hidden />
                        </span>
                        <span>
                          <span className="block text-base font-extrabold text-[#0b1533]">
                            {method.label}
                          </span>
                          <span className="mt-2 block text-sm font-medium text-slate-600">
                            {descriptions[method.id]}
                          </span>
                        </span>
                      </span>
                      {isSelected && (
                        <span className="mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-blue-600 px-3 py-1 text-xs font-bold text-white">
                          <Check className="size-3.5" aria-hidden />
                          Seleccionado
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {isSplitPayment && (
                <div className="grid gap-3 rounded-lg border border-blue-100 bg-blue-50/50 p-4">
                  <div className="grid gap-3 sm:grid-cols-3">
                    <label className="grid min-w-0 gap-1 text-xs font-bold text-[#0b1533]">
                      Efectivo
                      <input
                        className="h-11 w-full min-w-0 rounded-lg border border-blue-100 bg-white px-3 text-sm font-semibold outline-none focus:border-blue-500"
                        inputMode="decimal"
                        placeholder="$0.00"
                        value={splitPayments.cash}
                        onChange={(event) =>
                          updateSplitPayment("cash", event.target.value)
                        }
                      />
                    </label>
                    <label className="grid min-w-0 gap-1 text-xs font-bold text-[#0b1533]">
                      Tarjeta
                      <input
                        className="h-11 w-full min-w-0 rounded-lg border border-blue-100 bg-white px-3 text-sm font-semibold outline-none focus:border-blue-500"
                        inputMode="decimal"
                        placeholder="$0.00"
                        value={splitPayments.card}
                        onChange={(event) =>
                          updateSplitPayment("card", event.target.value)
                        }
                      />
                    </label>
                    <label className="grid min-w-0 gap-1 text-xs font-bold text-[#0b1533]">
                      Transferencia
                      <input
                        className="h-11 w-full min-w-0 rounded-lg border border-blue-100 bg-white px-3 text-sm font-semibold outline-none focus:border-blue-500"
                        inputMode="decimal"
                        placeholder="$0.00"
                        value={splitPayments.transfer}
                        onChange={(event) =>
                          updateSplitPayment("transfer", event.target.value)
                        }
                      />
                    </label>
                  </div>
                  <div className="flex justify-between gap-4 text-sm font-bold">
                    <span className="text-slate-600">Restante por cubrir</span>
                    <span
                      className={cn(
                        splitRemaining === 0 ? "text-emerald-700" : "text-blue-700",
                      )}
                    >
                      {formatCurrency(splitRemaining)}
                    </span>
                  </div>
                </div>
              )}

              <div className="grid gap-3 border-t border-slate-100 pt-5 sm:grid-cols-2">
                <Button
                  className="h-12 rounded-lg font-bold"
                  type="button"
                  variant="outline"
                  onClick={() => setIsPaymentModalOpen(false)}
                >
                  Cancelar
                </Button>
                <Button
                  className="h-12 rounded-lg font-bold"
                  type="button"
                  onClick={() => setIsPaymentModalOpen(false)}
                >
                  Confirmar cobro
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isCustomerModalOpen && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-slate-950/35 px-4 backdrop-blur-[1px]"
          role="dialog"
          aria-modal="true"
          aria-label="Seleccionar cliente"
        >
          <div className="max-h-[calc(100vh-32px)] w-full max-w-3xl overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/20">
            <div className="flex items-center justify-between gap-4 border-b border-slate-100 p-5">
              <div className="min-w-0">
                <h2 className="text-xl font-extrabold text-[#0b1533]">
                  Seleccionar cliente
                </h2>
                <p className="mt-1 text-sm font-medium text-slate-500">
                  Puedes continuar sin relacionar cliente o guardar sus datos para futuras funciones.
                </p>
              </div>
              <button
                className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-[#0b1533] hover:bg-slate-50"
                type="button"
                aria-label="Cerrar seleccion de cliente"
                onClick={() => setIsCustomerModalOpen(false)}
              >
                <X className="size-5" aria-hidden />
              </button>
            </div>

            <div className="grid min-w-0 gap-4 p-5 lg:grid-cols-3">
              <button
                className="grid min-h-52 content-between rounded-lg border border-blue-200 bg-blue-50/60 p-4 text-left"
                type="button"
                onClick={() => setIsCustomerModalOpen(false)}
              >
                <span className="grid gap-3">
                  <span className="flex size-11 items-center justify-center rounded-lg bg-blue-600 text-white">
                    <UserRound className="size-5" aria-hidden />
                  </span>
                  <span>
                    <span className="block text-base font-extrabold text-[#0b1533]">
                      Cliente general
                    </span>
                    <span className="mt-2 block text-sm font-medium text-slate-600">
                      No se registra relacion entre venta y cliente.
                    </span>
                  </span>
                </span>
                <span className="text-sm font-bold text-blue-700">
                  Usar cliente general
                </span>
              </button>

              <div className="grid min-h-52 min-w-0 gap-3 overflow-hidden rounded-lg border border-slate-200 p-4">
                <span className="flex size-11 items-center justify-center rounded-lg bg-slate-100 text-[#0b1533]">
                  <Users className="size-5" aria-hidden />
                </span>
                <div>
                  <h3 className="text-base font-extrabold text-[#0b1533]">
                    Cliente existente
                  </h3>
                  <p className="mt-2 text-sm font-medium text-slate-600">
                    Relaciona la venta con un cliente ya registrado.
                  </p>
                </div>
                <label className="flex h-11 w-full min-w-0 items-center gap-3 rounded-lg border border-slate-200 px-3 text-slate-400">
                  <Search className="size-4 shrink-0" aria-hidden />
                  <input
                    className="w-full min-w-0 flex-1 bg-transparent text-sm font-semibold text-slate-700 outline-none placeholder:text-slate-400"
                    placeholder="Buscar cliente"
                  />
                </label>
                <Button
                  className="h-10 rounded-lg font-bold"
                  type="button"
                  onClick={() => setIsCustomerModalOpen(false)}
                >
                  Seleccionar
                </Button>
              </div>

              <div className="grid min-h-52 min-w-0 gap-3 overflow-hidden rounded-lg border border-slate-200 p-4">
                <span className="flex size-11 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                  <UserPlus className="size-5" aria-hidden />
                </span>
                <div>
                  <h3 className="text-base font-extrabold text-[#0b1533]">
                    Cliente nuevo
                  </h3>
                  <p className="mt-2 text-sm font-medium text-slate-600">
                    Da de alta nombre y telefono opcional.
                  </p>
                </div>
                <div className="grid min-w-0 gap-3">
                  <input
                    className="h-11 w-full min-w-0 rounded-lg border border-slate-200 px-3 text-sm font-semibold text-slate-700 outline-none placeholder:text-slate-400 focus:border-blue-500"
                    placeholder="Nombre del cliente"
                  />
                  <input
                    className="h-11 w-full min-w-0 rounded-lg border border-slate-200 px-3 text-sm font-semibold text-slate-700 outline-none placeholder:text-slate-400 focus:border-blue-500"
                    placeholder="Telefono opcional"
                  />
                </div>
                <Button
                  className="h-10 rounded-lg font-bold"
                  type="button"
                  onClick={() => setIsCustomerModalOpen(false)}
                >
                  Guardar y seleccionar
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid min-w-0 gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(540px,0.85fr)] min-[1700px]:grid-cols-[minmax(0,1.25fr)_minmax(600px,0.9fr)]">
        <div className="grid min-w-0 gap-5">
          <Card className="min-w-0 overflow-hidden">
            <CardContent className="grid gap-4 p-4 sm:p-5">
              <label className="flex h-12 min-w-0 items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 text-slate-400 shadow-sm">
                <Search className="size-5 shrink-0" aria-hidden />
                <input
                  className="min-w-0 flex-1 bg-transparent text-sm font-semibold text-slate-700 outline-none placeholder:text-slate-400"
                  placeholder="Buscar producto, codigo o escanear..."
                  value={productSearch}
                  onChange={(event) => setProductSearch(event.target.value)}
                />
                <Barcode className="size-5 shrink-0 text-[#0b1533]" aria-hidden />
              </label>

              <div className="flex gap-3 overflow-x-auto pb-1">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={cn(
                      "h-10 shrink-0 rounded-full border px-6 text-sm font-bold transition-colors",
                      activeCategory === category
                        ? "border-blue-600 bg-blue-600 text-white"
                        : "border-slate-200 bg-white text-[#0b1533] hover:bg-slate-50",
                    )}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>

              <div className="grid min-w-0 gap-4 sm:grid-cols-2 lg:grid-cols-3 min-[1500px]:grid-cols-4">
                {filteredProducts.map((product) => {
                  const isSelected = cartItems.some(
                    (item) => item.productId === product.id,
                  );

                  return (
                  <button
                    key={product.id}
                    className={cn(
                      "relative grid min-h-[188px] min-w-0 content-between rounded-lg border border-slate-200 bg-white p-4 text-left shadow-sm transition-colors hover:border-blue-300 hover:bg-blue-50/30",
                      isSelected && "border-blue-600 bg-blue-50/30",
                    )}
                    type="button"
                    onClick={() => addProduct(product.id)}
                  >
                    {isSelected && (
                      <span className="absolute right-3 top-3 flex size-7 items-center justify-center rounded-full bg-blue-600 text-white">
                        <Check className="size-4" aria-hidden />
                      </span>
                    )}
                    <span className="flex min-h-20 items-center justify-center">
                      <span
                        className={cn(
                          "flex size-16 items-center justify-center rounded-xl text-base font-extrabold",
                          product.tone,
                        )}
                      >
                        {product.initials}
                      </span>
                    </span>
                    <span className="grid gap-2">
                      <span className="line-clamp-2 text-base font-extrabold text-[#0b1533]">
                        {product.name}
                      </span>
                      <span className="text-base font-extrabold text-[#0b1533]">
                        {formatCurrency(product.price)}
                      </span>
                      <Badge className="w-fit rounded-full px-3" tone="success">
                        {product.badge}
                      </Badge>
                    </span>
                  </button>
                  );
                })}
                {filteredProducts.length === 0 && (
                  <div className="grid min-h-[188px] place-items-center rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 text-center text-sm font-semibold text-slate-500 sm:col-span-2 lg:col-span-3 min-[1500px]:col-span-4">
                    No hay productos que coincidan con la busqueda actual.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="grid min-w-0 gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] min-[1500px]:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_minmax(260px,0.75fr)]">
            <Card className="min-w-0 overflow-hidden">
              <CardHeader>
                <CardTitle>Productos frecuentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid min-w-0 grid-cols-2 gap-3 sm:grid-cols-4">
                  {frequentProducts.map((product) => (
                    <button
                      key={product.id}
                      className="grid min-h-[136px] min-w-0 content-between rounded-lg border border-slate-200 bg-white p-3 text-left shadow-sm hover:bg-slate-50"
                      type="button"
                      onClick={() => addProduct(product.id)}
                    >
                      <span
                        className={cn(
                          "mx-auto flex size-12 items-center justify-center rounded-lg text-sm font-extrabold",
                          product.tone,
                        )}
                      >
                        {product.initials}
                      </span>
                      <span className="grid gap-1">
                        <span className="truncate text-sm font-extrabold text-[#0b1533]">
                          {product.name}
                        </span>
                        <span className="text-xs font-bold text-slate-600">
                          {formatCurrency(product.price)}
                        </span>
                      </span>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="min-w-0 overflow-hidden">
              <CardHeader>
                <CardTitle>Ventas pausadas</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3">
                {pausedSales.map((sale) => (
                  <div
                    key={sale.folio}
                    className="grid min-w-0 gap-3 rounded-lg border border-slate-200 p-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center"
                  >
                    <div className="flex min-w-0 gap-3">
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[#0b1533]">
                        <Clock3 className="size-4" aria-hidden />
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-extrabold text-[#0b1533]">
                          {sale.folio}
                        </p>
                        <p className="mt-1 text-xs font-semibold text-slate-500">
                          {sale.products}
                        </p>
                        <p className="mt-1 text-sm font-extrabold text-[#0b1533]">
                          {sale.total}
                        </p>
                      </div>
                    </div>
                    <Button className="h-9 rounded-lg text-xs font-bold" variant="outline">
                      <Play className="size-4" aria-hidden />
                      Recuperar
                    </Button>
                  </div>
                ))}
                <a
                  className="text-center text-sm font-bold text-blue-600"
                  href="/ventas"
                >
                  Ver todas las ventas pausadas
                </a>
              </CardContent>
            </Card>

            <Card className="min-w-0 overflow-hidden lg:col-span-2 min-[1500px]:col-span-1">
              <CardHeader>
                <CardTitle>Resumen del dia</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                {daySummary.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div key={item.label} className="flex min-w-0 items-center gap-4">
                      <span
                        className={cn(
                          "flex size-10 shrink-0 items-center justify-center rounded-full text-white",
                          item.color,
                        )}
                      >
                        <Icon className="size-5" aria-hidden />
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-500">{item.label}</p>
                        <p className="text-xl font-extrabold text-[#0b1533]">
                          {item.value}
                        </p>
                        <p className="text-xs font-bold text-emerald-600">
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        </div>

        <Card className="min-w-0 overflow-hidden xl:sticky xl:top-[132px] xl:flex xl:max-h-[calc(100vh-146px)] xl:flex-col xl:self-start">
          <CardHeader className="shrink-0 pb-2">
            <CardTitle className="text-lg">Venta actual</CardTitle>
          </CardHeader>
          <CardContent className="grid min-h-0 gap-2 p-4 pt-0 sm:p-5 sm:pt-0 xl:flex xl:flex-1 xl:flex-col xl:overflow-hidden">
            <div className="grid min-h-0 flex-1 gap-2 overflow-y-auto pr-1">
              <div className="grid shrink-0 min-w-0 gap-2 sm:grid-cols-[minmax(0,1fr)_auto]">
                <div className="rounded-lg border border-slate-200 px-3 py-2">
                  <p className="text-[11px] font-bold text-slate-500">Folio</p>
                  <p className="mt-1 text-sm font-extrabold text-[#0b1533]">
                    VNT-01088
                  </p>
                </div>
                <Button
                  className="h-full min-h-12 rounded-lg text-sm font-bold"
                  variant="outline"
                  type="button"
                  onClick={() => setIsCustomerModalOpen(true)}
                >
                  <UserRound className="size-4" aria-hidden />
                  Cliente general
                </Button>
              </div>

              <div className="min-h-[120px] overflow-auto rounded-lg border border-slate-200 xl:max-h-[210px]">
                <table className="w-full min-w-[500px] text-left text-sm">
                  <thead className="bg-slate-50 text-xs font-bold text-slate-500">
                    <tr>
                      <th className="px-3 py-2.5">Producto</th>
                      <th className="px-3 py-2.5 text-right">Unitario</th>
                      <th className="px-3 py-2.5 text-center">Cant.</th>
                      <th className="px-3 py-2.5 text-right">Subtotal</th>
                      <th className="px-3 py-2.5 text-right"> </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 font-semibold text-[#0b1533]">
                    {cartProducts.map((item) => (
                      <tr key={item.product.id}>
                        <td className="px-3 py-2.5">
                          <span className="block truncate">{item.product.name}</span>
                        </td>
                        <td className="px-3 py-2.5 text-right">
                          {formatCurrency(item.product.price)}
                        </td>
                        <td className="px-3 py-2.5">
                          <span className="mx-auto grid h-8 w-24 grid-cols-3 overflow-hidden rounded-lg border border-slate-200">
                            <button
                              className="grid place-items-center"
                              type="button"
                              aria-label={`Restar ${item.product.name}`}
                              onClick={() =>
                                updateQuantity(item.product.id, item.quantity - 1)
                              }
                            >
                              <Minus className="size-4" aria-hidden />
                            </button>
                            <span className="grid place-items-center border-x border-slate-200">
                              {item.quantity}
                            </span>
                            <button
                              className="grid place-items-center"
                              type="button"
                              aria-label={`Sumar ${item.product.name}`}
                              onClick={() =>
                                updateQuantity(item.product.id, item.quantity + 1)
                              }
                            >
                              <Plus className="size-4" aria-hidden />
                            </button>
                          </span>
                        </td>
                        <td className="px-3 py-2.5 text-right">
                          {formatCurrency(item.subtotal)}
                        </td>
                        <td className="px-3 py-2.5 text-right">
                          <button
                            className="rounded-md p-1 text-red-500 hover:bg-red-50"
                            type="button"
                            aria-label={`Quitar ${item.product.name}`}
                            onClick={() => removeProduct(item.product.id)}
                          >
                            <Trash2 className="size-5" aria-hidden />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {cartProducts.length === 0 && (
                      <tr>
                        <td
                          className="px-3 py-8 text-center text-sm font-semibold text-slate-500"
                          colSpan={5}
                        >
                          Selecciona productos para iniciar la venta.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="grid shrink-0 min-w-0 gap-2 sm:grid-cols-[minmax(0,1fr)_auto]">
                <label className="flex h-10 min-w-0 items-center gap-3 rounded-lg border border-slate-200 px-3 text-slate-400">
                  <TicketPercent className="size-4 shrink-0" aria-hidden />
                  <input
                    className="min-w-0 flex-1 bg-transparent text-sm font-semibold text-slate-700 outline-none placeholder:text-slate-400"
                    placeholder="Codigo de descuento"
                  />
                </label>
                <Button className="h-10 rounded-lg text-sm font-bold" variant="outline">
                  Aplicar
                </Button>
              </div>

              <div className="grid shrink-0 gap-1.5 border-b border-slate-200 pb-2 text-xs font-semibold text-[#0b1533]">
                <div className="flex justify-between gap-4">
                  <span className="text-slate-600">Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-slate-600">IVA (16%)</span>
                  <span>{formatCurrency(tax)}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-slate-600">Descuento</span>
                  <span className="text-red-600">-{formatCurrency(discount)}</span>
                </div>
              </div>

              <div className="flex shrink-0 items-center justify-between gap-4">
                <span className="text-base font-extrabold text-[#0b1533] sm:text-lg">
                  Total
                </span>
                <span className="text-xl font-extrabold text-emerald-600 sm:text-2xl">
                  {formatCurrency(total)}
                </span>
              </div>

            </div>

            <div className="grid shrink-0 grid-cols-2 gap-2 border-t border-slate-100 pt-2">
              <Button
                className="h-10 rounded-lg text-sm font-bold"
                type="button"
                onClick={() => setIsPaymentModalOpen(true)}
              >
                <ShoppingCart className="size-5" aria-hidden />
                Cobrar venta
              </Button>
              <Button className="h-9 rounded-lg text-sm font-bold" variant="outline">
                <Pause className="size-5" aria-hidden />
                Pausar venta
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid min-w-0 gap-5 md:grid-cols-3">
        <Card className="min-w-0 overflow-hidden">
          <CardContent className="flex items-center justify-between gap-4 p-5">
            <div>
              <p className="text-sm font-bold text-slate-500">Turno actual</p>
              <p className="mt-1 text-2xl font-extrabold text-[#0b1533]">
                Caja 1
              </p>
            </div>
            <Badge className="rounded-full px-4" tone="success">
              Abierta
            </Badge>
          </CardContent>
        </Card>

        <Card className="min-w-0 overflow-hidden">
          <CardContent className="flex items-center gap-4 p-5">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
              <Package className="size-6" aria-hidden />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-bold text-slate-500">Articulos vendidos</p>
              <p className="mt-1 text-2xl font-extrabold text-[#0b1533]">164</p>
            </div>
          </CardContent>
        </Card>

        <Card className="min-w-0 overflow-hidden">
          <CardContent className="flex items-center gap-4 p-5">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
              <ShoppingCart className="size-6" aria-hidden />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-bold text-slate-500">Ventas completadas</p>
              <p className="mt-1 text-2xl font-extrabold text-[#0b1533]">86</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
