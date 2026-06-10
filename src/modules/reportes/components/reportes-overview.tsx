import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import {
  Banknote,
  Box,
  CalendarDays,
  ClipboardList,
  CreditCard,
  DollarSign,
  FileText,
  Landmark,
  MoreVertical,
  Package,
  Printer,
  ShoppingCart,
  Tags,
  UserPlus,
  Users,
} from "lucide-react";

const kpis = [
  {
    label: "Ventas de hoy",
    value: "$12,480",
    detail: "12.5% vs ayer",
    icon: DollarSign,
    color: "from-blue-500 to-blue-700",
    positive: true,
  },
  {
    label: "Tickets del dia",
    value: "86",
    detail: "8.1% vs ayer",
    icon: ClipboardList,
    color: "from-emerald-500 to-green-700",
    positive: true,
  },
  {
    label: "Productos bajos",
    value: "12",
    detail: "2 mas que ayer",
    icon: Package,
    color: "from-amber-400 to-orange-500",
    positive: false,
  },
  {
    label: "Clientes atendidos",
    value: "74",
    detail: "15.6% vs ayer",
    icon: Users,
    color: "from-indigo-400 to-violet-600",
    positive: true,
  },
];

const weeklySales = [
  { day: "Lun 13", value: 8450, height: "42%" },
  { day: "Mar 14", value: 9230, height: "48%" },
  { day: "Mie 15", value: 12480, height: "62%", current: true },
  { day: "Jue 16", value: 11320, height: "55%" },
  { day: "Vie 17", value: 14680, height: "72%" },
  { day: "Sab 18", value: 16240, height: "82%" },
  { day: "Dom 19", value: 0, height: "2%" },
];

const paymentMethods = [
  { label: "Efectivo", percent: "45%", amount: "$5,616", color: "bg-emerald-500" },
  { label: "Tarjeta", percent: "40%", amount: "$4,992", color: "bg-blue-500" },
  { label: "Transferencia", percent: "15%", amount: "$1,872", color: "bg-indigo-500" },
];

const quickActions = [
  { label: "Nueva venta", icon: ShoppingCart, primary: true },
  { label: "Abrir caja", icon: Printer },
  { label: "Agregar producto", icon: Tags },
  { label: "Ver inventario", icon: Box },
  { label: "Registrar cliente", icon: UserPlus },
  { label: "Corte de caja", icon: FileText },
];

const recentSales = [
  ["VNT-01087", "Cliente general", "Efectivo", "$250.00", "15/05/2024 10:33", "Completada"],
  ["VNT-01086", "Maria Lopez", "Tarjeta", "$485.50", "15/05/2024 10:22", "Completada"],
  ["VNT-01085", "Cliente general", "Transferencia", "$320.00", "15/05/2024 10:15", "Completada"],
  ["VNT-01084", "Jose Ramirez", "Tarjeta", "$165.00", "15/05/2024 10:08", "Completada"],
  ["VNT-01083", "Cliente general", "Efectivo", "$78.00", "15/05/2024 09:58", "Cancelada"],
];

const inventory = [
  { product: "Coca-Cola 600ml", available: 5, status: "Critico", tone: "danger" },
  { product: "Sabritas", available: 8, status: "Bajo", tone: "warning" },
  { product: "Cafe Americano", available: 10, status: "Bajo", tone: "warning" },
  { product: "Pan dulce", available: 22, status: "OK", tone: "success" },
];

function statusClasses(status: string) {
  if (status === "Cancelada") {
    return "bg-red-100 text-red-700";
  }

  return "bg-emerald-100 text-emerald-700";
}

function inventoryTone(tone: string) {
  if (tone === "danger") {
    return "bg-red-100 text-red-700";
  }

  if (tone === "warning") {
    return "bg-amber-100 text-orange-700";
  }

  return "bg-emerald-100 text-emerald-700";
}

function paymentIcon(method: string) {
  if (method === "Efectivo") {
    return Banknote;
  }

  if (method === "Tarjeta") {
    return CreditCard;
  }

  return Landmark;
}

export function ReportesOverview() {
  return (
    <section className="grid gap-6">
      <div className="grid gap-4 sm:grid-cols-2 2xl:grid-cols-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;

          return (
            <Card key={kpi.label} className="min-h-[132px]">
              <CardContent className="flex h-full items-center gap-4 p-5 min-[1800px]:gap-6 min-[1800px]:p-6">
                <div
                  className={`flex size-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${kpi.color} text-white shadow-lg min-[1800px]:size-[68px]`}
                >
                  <Icon className="size-7 min-[1800px]:size-8" strokeWidth={2.1} aria-hidden />
                </div>
                <div className="min-w-0">
                  <p className="text-[15px] font-medium text-slate-500">
                    {kpi.label}
                  </p>
                  <p className="mt-1 text-2xl font-extrabold tracking-tight text-[#0b1533] min-[1800px]:text-3xl">
                    {kpi.value}
                  </p>
                  <p
                    className={`mt-4 text-sm font-semibold ${
                      kpi.positive ? "text-emerald-600" : "text-red-600"
                    }`}
                  >
                    {kpi.positive ? "^" : "^"} {kpi.detail}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.45fr)_minmax(300px,0.9fr)_300px] min-[1800px]:grid-cols-[minmax(0,1.6fr)_minmax(380px,1fr)_400px]">
        <Card className="min-h-[360px] min-w-0 overflow-hidden">
          <CardHeader className="flex-row flex-wrap items-center justify-between gap-3 space-y-0">
            <CardTitle>Ventas de la semana</CardTitle>
            <button className="flex h-9 items-center gap-2 rounded-lg border border-slate-200 px-4 text-sm font-semibold text-slate-700">
              Esta semana
              <CalendarDays className="size-4" aria-hidden />
            </button>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="overflow-x-auto overflow-y-hidden pb-2">
              <div className="relative h-[250px] min-w-[640px] border-b border-l border-slate-200 pl-6">
                <div className="absolute inset-x-0 top-0 h-px bg-slate-200" />
                <div className="absolute inset-x-0 top-1/4 h-px bg-slate-200" />
                <div className="absolute inset-x-0 top-1/2 h-px bg-slate-200" />
                <div className="absolute inset-x-0 top-3/4 h-px bg-slate-200" />
                <div className="absolute -left-1 top-0 -translate-x-full text-sm font-medium text-slate-500">
                  $20k
                </div>
                <div className="absolute -left-1 top-1/4 -translate-x-full text-sm font-medium text-slate-500">
                  $15k
                </div>
                <div className="absolute -left-1 top-1/2 -translate-x-full text-sm font-medium text-slate-500">
                  $10k
                </div>
                <div className="absolute -left-1 top-3/4 -translate-x-full text-sm font-medium text-slate-500">
                  $5k
                </div>
                <div className="absolute -bottom-1 -left-1 -translate-x-full text-sm font-medium text-slate-500">
                  $0
                </div>
                <div className="flex h-full items-end justify-around gap-4 px-5">
                  {weeklySales.map((sale) => (
                    <div key={sale.day} className="flex h-full flex-1 flex-col items-center justify-end gap-3">
                      <p className="text-sm font-bold text-[#0b1533]">
                        ${sale.value.toLocaleString("en-US")}
                      </p>
                      <div
                        className={`w-10 rounded-t-md ${
                          sale.current
                            ? "bg-blue-200"
                            : "bg-gradient-to-t from-blue-700 to-blue-500"
                        } shadow-[0_8px_14px_rgba(37,99,235,0.25)]`}
                        style={{ height: sale.height }}
                      />
                      <p className="text-sm font-medium text-slate-500">
                        {sale.day}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="min-h-[360px] min-w-0 overflow-hidden">
          <CardHeader>
            <CardTitle>Metodos de pago</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 pt-5">
            <div className="flex justify-center">
              <div className="relative size-[150px] rounded-full bg-[conic-gradient(#16a34a_0_45%,#3b82f6_45%_85%,#6366f1_85%_100%)] min-[1800px]:size-[180px]">
                <div className="absolute inset-[28px] flex flex-col items-center justify-center rounded-full bg-white">
                  <span className="text-sm text-slate-500">Total</span>
                  <span className="text-xl font-extrabold text-[#0b1533]">
                    $12,480
                  </span>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              {paymentMethods.map((method) => (
                <div
                  key={method.label}
                  className="rounded-xl border border-slate-200 bg-slate-50/80 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-3 font-semibold text-[#0b1533]">
                        <span className={`size-3 shrink-0 rounded-full ${method.color}`} />
                        <span className="break-words">{method.label}</span>
                      </div>
                      <p className="mt-3 text-xl font-extrabold text-[#0b1533]">
                        {method.amount}
                      </p>
                    </div>
                    <span className="shrink-0 rounded-full bg-white px-3 py-1 text-sm font-bold text-slate-600">
                      {method.percent}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-end justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-4">
              <div>
                <span className="text-sm text-slate-500">Total</span>
                <p className="mt-1 text-lg font-extrabold text-[#0b1533]">
                  $12,480
                </p>
              </div>
              <span className="shrink-0 rounded-full bg-slate-100 px-3 py-1 text-sm font-bold text-[#0b1533]">
                100%
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="min-h-[360px] min-w-0 overflow-hidden">
          <CardHeader>
            <CardTitle>Acciones rapidas</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3">
            {quickActions.map((action) => {
              const Icon = action.icon;

              return (
                <button
                  key={action.label}
                  className={`flex h-[84px] flex-col items-center justify-center gap-3 rounded-lg border px-2 text-center text-sm font-bold ${
                    action.primary
                      ? "border-blue-600 bg-blue-600 text-white shadow-lg shadow-blue-200"
                      : "border-slate-200 bg-white text-[#0b1533] hover:bg-slate-50"
                  }`}
                >
                  <Icon className="size-6" aria-hidden />
                  {action.label}
                </button>
              );
            })}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.5fr)_minmax(320px,1fr)_300px] min-[1800px]:grid-cols-[minmax(0,1.7fr)_minmax(380px,1fr)_400px]">
        <Card className="min-w-0 overflow-hidden">
          <CardHeader>
            <CardTitle>Ventas recientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto rounded-lg border border-slate-200">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead className="bg-slate-50 text-xs font-bold text-slate-500">
                  <tr>
                    <th className="px-4 py-3">Folio</th>
                    <th className="px-4 py-3">Cliente</th>
                    <th className="px-4 py-3">Metodo</th>
                    <th className="px-4 py-3">Total</th>
                    <th className="px-4 py-3">Hora</th>
                    <th className="px-4 py-3">Estado</th>
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 font-medium text-[#0b1533]">
                  {recentSales.map((sale) => {
                    const PaymentIcon = paymentIcon(sale[2]);

                    return (
                      <tr key={sale[0]}>
                        <td className="px-4 py-3">{sale[0]}</td>
                        <td className="px-4 py-3">{sale[1]}</td>
                        <td className="px-4 py-3">
                          <span className="flex items-center gap-2">
                            <PaymentIcon className="size-4 text-blue-600" aria-hidden />
                            {sale[2]}
                          </span>
                        </td>
                        <td className="px-4 py-3">{sale[3]}</td>
                        <td className="px-4 py-3">{sale[4]}</td>
                        <td className="px-4 py-3">
                          <span className={`rounded-full px-3 py-1 text-xs font-bold ${statusClasses(sale[5])}`}>
                            {sale[5]}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <MoreVertical className="size-5 text-slate-500" aria-hidden />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="pt-5 text-center">
              <a href="/ventas" className="text-sm font-bold text-blue-600">
                Ver todas las ventas
              </a>
            </div>
          </CardContent>
        </Card>

        <Card className="min-w-0 overflow-hidden">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>Inventario bajo</CardTitle>
            <a href="/productos" className="text-sm font-bold text-blue-600">
              Ver todos
            </a>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto rounded-lg border border-slate-200">
              <table className="w-full min-w-[440px] text-left text-sm">
                <thead className="bg-slate-50 text-xs font-bold text-slate-500">
                  <tr>
                    <th className="px-4 py-3">Producto</th>
                    <th className="px-4 py-3 text-center">Disponible</th>
                    <th className="px-4 py-3 text-center">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 font-medium text-[#0b1533]">
                  {inventory.map((item) => (
                    <tr key={item.product}>
                      <td className="px-4 py-4">
                        <span className="flex items-center gap-3">
                          <span className="flex size-9 items-center justify-center rounded-md bg-slate-100">
                            <Package className="size-5 text-slate-600" aria-hidden />
                          </span>
                          {item.product}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-center font-bold text-orange-600">
                        {item.available}
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className={`rounded-full px-4 py-2 text-xs font-bold ${inventoryTone(item.tone)}`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card className="min-w-0 overflow-hidden">
          <CardHeader>
            <CardTitle>Estado de caja</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500">Caja actual</span>
              <span className="font-extrabold text-[#0b1533]">Caja 1</span>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Fondo inicial</span>
                <span className="font-bold text-[#0b1533]">$2,000.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Ventas en efectivo</span>
                <span className="font-bold text-[#0b1533]">$5,616.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Entradas</span>
                <span className="font-bold text-emerald-600">$300.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Salidas</span>
                <span className="font-bold text-red-600">-$150.00</span>
              </div>
            </div>
            <div className="border-t border-slate-200 pt-5">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <span className="font-bold text-[#0b1533]">Efectivo en caja</span>
                <span className="text-2xl font-extrabold text-emerald-600">
                  $7,766.00
                </span>
              </div>
            </div>
            <button className="h-12 w-full rounded-lg border border-blue-200 bg-white text-sm font-bold text-blue-600 hover:bg-blue-50">
              Ir a corte de caja
            </button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
