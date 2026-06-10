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
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  Box,
  Check,
  Copy,
  Download,
  Edit3,
  FileSpreadsheet,
  Filter,
  FolderPlus,
  ImagePlus,
  MoreVertical,
  Package,
  PlusCircle,
  Power,
  Search,
  Shapes,
  UploadCloud,
  X,
  XCircle,
} from "lucide-react";
import { useState } from "react";

const metrics = [
  {
    label: "Total de productos",
    value: "248",
    detail: "8.2% vs ayer",
    icon: Package,
    color: "from-blue-500 to-blue-700",
    tone: "text-emerald-600",
    marker: "^",
  },
  {
    label: "Categorias",
    value: "12",
    detail: "Sin cambios",
    icon: Shapes,
    color: "from-emerald-500 to-green-700",
    tone: "text-slate-500",
    marker: "-",
  },
  {
    label: "Bajo stock",
    value: "18",
    detail: "3 mas que ayer",
    icon: AlertTriangle,
    color: "from-amber-400 to-orange-500",
    tone: "text-red-600",
    marker: "^",
  },
  {
    label: "Sin stock",
    value: "4",
    detail: "1 menos que ayer",
    icon: XCircle,
    color: "from-red-400 to-red-600",
    tone: "text-emerald-600",
    marker: "v",
  },
];

const categories = ["Todos", "Bebidas", "Comida", "Limpieza", "Servicios", "Promociones"];
const productCategoryOptions = categories.filter((category) => category !== "Todos");

const products = [
  ["Coca-Cola 600ml", "CC600", "Bebidas", "$18.00", "52", "En stock", "15/05/2024 10:30"],
  ["Sabritas", "SAB001", "Comida", "$22.00", "8", "Bajo", "15/05/2024 10:22"],
  ["Cafe Americano", "CAF001", "Bebidas", "$28.00", "10", "Bajo", "15/05/2024 10:18"],
  ["Pan dulce", "PAN001", "Comida", "$15.00", "0", "Sin stock", "15/05/2024 09:58"],
  ["Agua natural", "AGUA01", "Bebidas", "$14.00", "120", "En stock", "15/05/2024 09:45"],
  ["Sandwich", "SAN001", "Comida", "$48.00", "15", "Bajo", "15/05/2024 09:32"],
  ["Galletas", "GAL001", "Comida", "$19.00", "6", "Critico", "15/05/2024 09:20"],
  ["Jugo naranja", "JUG001", "Bebidas", "$20.00", "22", "En stock", "15/05/2024 09:10"],
];

const featuredProduct = products[0];

const inventorySummary = [
  { label: "En stock", count: "160", percent: "64.5%", color: "bg-emerald-500", width: "66%" },
  { label: "Bajo", count: "18", percent: "7.3%", color: "bg-orange-400", width: "12%" },
  { label: "Critico", count: "18", percent: "7.3%", color: "bg-red-500", width: "12%" },
  { label: "Sin stock", count: "4", percent: "1.6%", color: "bg-red-600", width: "4%" },
];

const categoryTotals = [
  ["Bebidas", "86"],
  ["Comida", "94"],
  ["Limpieza", "28"],
  ["Servicios", "24"],
  ["Promociones", "16"],
];

const movements = [
  { type: "Entrada", product: "Agua natural", note: "Compra a Proveedor ABC", amount: "+50 unidades", date: "15/05/2024 10:15", color: "emerald" },
  { type: "Salida", product: "Coca-Cola 600ml", note: "Venta VNT-01088", amount: "-2 unidades", date: "15/05/2024 10:03", color: "red" },
  { type: "Ajuste", product: "Pan dulce", note: "Ajuste por merma", amount: "-5 unidades", date: "15/05/2024 09:45", color: "amber" },
];

const stockFilters = ["Todos", "En stock", "Bajo", "Critico", "Sin stock"];
const priceFilters = ["Todos", "$0 - $20", "$21 - $50", "$51 - $100", "$100+"];

function statusClass(status: string) {
  if (status === "En stock") {
    return "bg-emerald-100 text-emerald-700";
  }

  if (status === "Sin stock" || status === "Critico") {
    return "bg-red-100 text-red-700";
  }

  return "bg-amber-100 text-orange-700";
}

function productSwatch(index: number) {
  const swatches = [
    "bg-red-100 text-red-700",
    "bg-yellow-100 text-yellow-700",
    "bg-stone-100 text-stone-700",
    "bg-orange-100 text-orange-700",
    "bg-sky-100 text-sky-700",
    "bg-amber-100 text-amber-700",
    "bg-yellow-100 text-amber-800",
    "bg-orange-100 text-orange-700",
  ];

  return swatches[index % swatches.length];
}

const productPanelLabelClass = "grid min-w-0 gap-2 text-sm font-bold text-[#0b1533]";
const productPanelControlClass =
  "h-12 w-full min-w-0 max-w-full rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-blue-500";
const productPanelTextareaClass =
  "min-h-28 w-full min-w-0 max-w-full resize-none rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-blue-500";

type ProductPanelMode = "new" | "edit";

type ProductPanelProduct = {
  name: string;
  sku: string;
  category: string;
  price: string;
  stock: string;
};

function getPanelProduct(product: string[]): ProductPanelProduct {
  return {
    name: product[0],
    sku: product[1],
    category: product[2],
    price: product[3],
    stock: product[4],
  };
}

export function ProductosSummary() {
  const [isNewProductOpen, setIsNewProductOpen] = useState(false);
  const [isCategoryDrawerOpen, setIsCategoryDrawerOpen] = useState(false);
  const [isImportDrawerOpen, setIsImportDrawerOpen] = useState(false);
  const [productPanelMode, setProductPanelMode] =
    useState<ProductPanelMode>("new");
  const [activeProduct, setActiveProduct] =
    useState<ProductPanelProduct | null>(null);
  const [panelCategories, setPanelCategories] = useState(productCategoryOptions);
  const [selectedPanelCategory, setSelectedPanelCategory] = useState("Bebidas");
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [categoryDraft, setCategoryDraft] = useState("");
  const [inactiveCategories, setInactiveCategories] = useState<string[]>([]);
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [editingCategoryDraft, setEditingCategoryDraft] = useState("");
  const [drawerCategoryDraft, setDrawerCategoryDraft] = useState("");
  const [isSearchFiltersOpen, setIsSearchFiltersOpen] = useState(false);
  const [searchCategoryFilter, setSearchCategoryFilter] = useState("Todos");
  const [searchStockFilter, setSearchStockFilter] = useState("Todos");
  const [searchPriceFilter, setSearchPriceFilter] = useState("Todos");

  const isEditingProduct = productPanelMode === "edit";
  const isOverlayVisible =
    isNewProductOpen || isCategoryDrawerOpen || isImportDrawerOpen;
  const activeSearchFilters = [
    ...(searchCategoryFilter !== "Todos"
      ? [`Categoria: ${searchCategoryFilter}`]
      : []),
    ...(searchStockFilter !== "Todos" ? [`Stock: ${searchStockFilter}`] : []),
    ...(searchPriceFilter !== "Todos" ? [`Precio: ${searchPriceFilter}`] : []),
  ];

  function openNewProductPanel() {
    setIsCategoryDrawerOpen(false);
    setIsImportDrawerOpen(false);
    setProductPanelMode("new");
    setActiveProduct(null);
    setSelectedPanelCategory("Bebidas");
    setIsAddingCategory(false);
    setCategoryDraft("");
    setIsNewProductOpen(true);
  }

  function openEditProductPanel(product: string[]) {
    const panelProduct = getPanelProduct(product);

    setIsCategoryDrawerOpen(false);
    setIsImportDrawerOpen(false);
    setProductPanelMode("edit");
    setActiveProduct(panelProduct);
    setSelectedPanelCategory(panelProduct.category);
    setIsAddingCategory(false);
    setCategoryDraft("");
    setIsNewProductOpen(true);
  }

  function addCategory(nextCategory: string) {
    const normalizedCategory = nextCategory.trim();

    if (!normalizedCategory) {
      return;
    }

    setPanelCategories((currentCategories) =>
      currentCategories.some(
        (category) => category.toLowerCase() === normalizedCategory.toLowerCase(),
      )
        ? currentCategories
        : [...currentCategories, normalizedCategory],
    );
    setSelectedPanelCategory(normalizedCategory);
  }

  function addPanelCategory() {
    addCategory(categoryDraft);
    setCategoryDraft("");
    setIsAddingCategory(false);
  }

  function addDrawerCategory() {
    addCategory(drawerCategoryDraft);
    setDrawerCategoryDraft("");
  }

  function startEditingCategory(category: string) {
    setEditingCategory(category);
    setEditingCategoryDraft(category);
  }

  function saveCategoryName() {
    if (!editingCategory) {
      return;
    }

    const nextName = editingCategoryDraft.trim();

    if (!nextName) {
      return;
    }

    if (
      panelCategories.some(
        (category) =>
          category !== editingCategory &&
          category.toLowerCase() === nextName.toLowerCase(),
      )
    ) {
      return;
    }

    setPanelCategories((currentCategories) =>
      currentCategories.map((category) =>
        category === editingCategory ? nextName : category,
      ),
    );
    setInactiveCategories((currentCategories) =>
      currentCategories.map((category) =>
        category === editingCategory ? nextName : category,
      ),
    );
    setSelectedPanelCategory((currentCategory) =>
      currentCategory === editingCategory ? nextName : currentCategory,
    );
    setEditingCategory(null);
    setEditingCategoryDraft("");
  }

  function toggleCategoryStatus(category: string) {
    setInactiveCategories((currentCategories) =>
      currentCategories.includes(category)
        ? currentCategories.filter((currentCategory) => currentCategory !== category)
        : [...currentCategories, category],
    );
    setSelectedPanelCategory((currentCategory) => {
      if (currentCategory !== category || inactiveCategories.includes(category)) {
        return currentCategory;
      }

      return (
        panelCategories.find(
          (panelCategory) =>
            panelCategory !== category &&
            !inactiveCategories.includes(panelCategory),
        ) ?? currentCategory
      );
    });
  }

  function openCategoryDrawer() {
    setIsNewProductOpen(false);
    setIsImportDrawerOpen(false);
    setEditingCategory(null);
    setEditingCategoryDraft("");
    setDrawerCategoryDraft("");
    setIsCategoryDrawerOpen(true);
  }

  function openImportDrawer() {
    setIsNewProductOpen(false);
    setIsCategoryDrawerOpen(false);
    setIsImportDrawerOpen(true);
  }

  return (
    <section className="grid gap-5">
      <div
        className={cn(
          "fixed inset-0 z-40 bg-slate-950/35 opacity-0 backdrop-blur-[1px] transition-opacity",
          isNewProductOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none",
          isOverlayVisible && "pointer-events-auto opacity-100",
        )}
        aria-hidden
      />

      <aside
        className={cn(
          "fixed inset-y-0 right-0 z-50 flex w-[min(100vw,392px)] flex-col border-l border-slate-200 bg-white shadow-2xl shadow-slate-900/20 transition-transform duration-200 sm:w-[430px]",
          isNewProductOpen ? "translate-x-0" : "translate-x-full",
        )}
        aria-label={isEditingProduct ? "Editar producto" : "Nuevo producto"}
        aria-modal={isNewProductOpen}
        role="dialog"
      >
        <div className="flex h-[96px] items-center border-b border-slate-100 px-6">
          <div className="flex flex-1 items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="text-2xl font-extrabold tracking-tight text-[#0b1533]">
                {isEditingProduct ? "Editar producto" : "Nuevo producto"}
              </p>
              <p className="mt-1 text-sm font-medium text-slate-500">
                {isEditingProduct
                  ? activeProduct?.sku ?? "Actualiza la informacion"
                  : "Alta rapida de catalogo"}
              </p>
            </div>
            <button
              className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-[#0b1533] hover:bg-slate-50"
              type="button"
              aria-label={
                isEditingProduct ? "Cerrar editar producto" : "Cerrar nuevo producto"
              }
              onClick={() => setIsNewProductOpen(false)}
            >
              <X className="size-5" aria-hidden />
            </button>
          </div>
        </div>

        <div className="min-w-0 flex-1 overflow-y-auto px-6 py-6">
          <form
            className="grid min-w-0 gap-5"
            id="product-panel-form"
            key={`${productPanelMode}-${activeProduct?.sku ?? "new"}`}
          >
            <label className={productPanelLabelClass}>
              Nombre del producto
              <input
                className={productPanelControlClass}
                defaultValue={activeProduct?.name ?? ""}
                placeholder="Ej. Coca-Cola 600ml"
              />
            </label>

            <div className="grid min-w-0 gap-4 sm:grid-cols-2">
              <label className={productPanelLabelClass}>
                SKU
                <input
                  className={productPanelControlClass}
                  defaultValue={activeProduct?.sku ?? ""}
                  placeholder="CC600"
                />
              </label>
              <label className={productPanelLabelClass}>
                <span className="flex min-w-0 items-center justify-between gap-3">
                  <span className="min-w-0">Categoria</span>
                  <button
                    className="inline-flex shrink-0 items-center gap-1 rounded-md px-2 py-1 text-xs font-bold text-blue-600 hover:bg-blue-50"
                    type="button"
                    aria-label="Crear nueva categoria"
                    onClick={() => setIsAddingCategory(true)}
                  >
                    <FolderPlus className="size-4" aria-hidden />
                    Nueva
                  </button>
                </span>
                <select
                  className={productPanelControlClass}
                  value={selectedPanelCategory}
                  onChange={(event) => setSelectedPanelCategory(event.target.value)}
                >
                  {panelCategories
                    .filter((category) => !inactiveCategories.includes(category))
                    .map((category) => (
                      <option key={category}>{category}</option>
                    ))}
                </select>
                {isAddingCategory && (
                  <span className="grid min-w-0 gap-2 rounded-lg border border-blue-100 bg-blue-50/60 p-3">
                    <input
                      className="h-10 w-full min-w-0 rounded-lg border border-blue-200 bg-white px-3 text-sm font-semibold text-slate-700 outline-none placeholder:text-slate-400 focus:border-blue-500"
                      placeholder="Nombre de la categoria"
                      value={categoryDraft}
                      onChange={(event) => setCategoryDraft(event.target.value)}
                    />
                    <span className="grid min-w-0 gap-2 sm:grid-cols-2">
                      <button
                        className="inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-blue-600 px-3 text-xs font-bold text-white hover:bg-blue-700"
                        type="button"
                        onClick={addPanelCategory}
                      >
                        <Check className="size-4" aria-hidden />
                        Agregar
                      </button>
                      <button
                        className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-xs font-bold text-[#0b1533] hover:bg-slate-50"
                        type="button"
                        onClick={() => {
                          setIsAddingCategory(false);
                          setCategoryDraft("");
                        }}
                      >
                        <X className="size-4" aria-hidden />
                        Cancelar
                      </button>
                    </span>
                  </span>
                )}
              </label>
            </div>

            <label className={productPanelLabelClass}>
              Imagen del producto
              <span className="flex min-w-0 items-center gap-3 rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 py-4 text-slate-500 transition-colors hover:border-blue-300 hover:bg-blue-50/50">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm">
                  <ImagePlus className="size-5" aria-hidden />
                </span>
                <span className="grid min-w-0 gap-1">
                  <span className="truncate text-sm font-bold text-[#0b1533]">
                    Subir imagen opcional
                  </span>
                  <span className="truncate text-xs font-medium text-slate-500">
                    PNG, JPG o WEBP
                  </span>
                </span>
                <input
                  className="sr-only"
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                />
              </span>
            </label>

            <div className="grid min-w-0 gap-4 sm:grid-cols-2">
              <label className={productPanelLabelClass}>
                Precio
                <input
                  className={productPanelControlClass}
                  defaultValue={activeProduct?.price ?? ""}
                  placeholder="$0.00"
                />
              </label>
              <label className={productPanelLabelClass}>
                Stock inicial
                <input
                  className={productPanelControlClass}
                  defaultValue={activeProduct?.stock ?? ""}
                  placeholder="0"
                />
              </label>
            </div>

            <label className={productPanelLabelClass}>
              Descripcion
              <textarea
                className={productPanelTextareaClass}
                defaultValue={
                  isEditingProduct && activeProduct
                    ? `${activeProduct.name} - ${activeProduct.category}`
                    : ""
                }
                placeholder="Detalles internos del producto"
              />
            </label>
          </form>
        </div>

        <div className="grid gap-3 border-t border-slate-100 px-6 py-5 sm:grid-cols-2">
          <Button
            className="h-12 rounded-lg font-bold"
            form="product-panel-form"
            type="reset"
            variant="outline"
          >
            {isEditingProduct ? "Restablecer" : "Limpiar"}
          </Button>
          <Button className="h-12 rounded-lg font-bold" type="button">
            {isEditingProduct ? "Guardar cambios" : "Guardar producto"}
          </Button>
        </div>
      </aside>

      <aside
        className={cn(
          "fixed inset-y-0 right-0 z-50 flex w-[min(100vw,392px)] flex-col border-l border-slate-200 bg-white shadow-2xl shadow-slate-900/20 transition-transform duration-200 sm:w-[430px]",
          isCategoryDrawerOpen ? "translate-x-0" : "translate-x-full",
        )}
        aria-label="Categorias"
        aria-modal={isCategoryDrawerOpen}
        role="dialog"
      >
        <div className="flex h-[96px] items-center border-b border-slate-100 px-6">
          <div className="flex flex-1 items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="text-2xl font-extrabold tracking-tight text-[#0b1533]">
                Categorias
              </p>
              <p className="mt-1 text-sm font-medium text-slate-500">
                Gestion de catalogo
              </p>
            </div>
            <button
              className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-[#0b1533] hover:bg-slate-50"
              type="button"
              aria-label="Cerrar categorias"
              onClick={() => setIsCategoryDrawerOpen(false)}
            >
              <X className="size-5" aria-hidden />
            </button>
          </div>
        </div>

        <div className="grid min-w-0 gap-5 overflow-y-auto px-6 py-6">
          <div className="grid min-w-0 gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-bold text-[#0b1533]">Nueva categoria</p>
            <div className="grid min-w-0 gap-2 sm:grid-cols-[minmax(0,1fr)_auto]">
              <input
                className="h-11 w-full min-w-0 rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 outline-none placeholder:text-slate-400 focus:border-blue-500"
                placeholder="Ej. Snacks"
                value={drawerCategoryDraft}
                onChange={(event) => setDrawerCategoryDraft(event.target.value)}
              />
              <button
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-bold text-white hover:bg-blue-700"
                type="button"
                onClick={addDrawerCategory}
              >
                <PlusCircle className="size-4" aria-hidden />
                Agregar
              </button>
            </div>
          </div>

          <div className="grid min-w-0 gap-3">
            {panelCategories.map((category) => {
              const isInactive = inactiveCategories.includes(category);
              const isEditing = editingCategory === category;

              return (
                <div
                  key={category}
                  className={cn(
                    "grid min-w-0 gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm",
                    isInactive && "bg-slate-50 opacity-75",
                  )}
                >
                  <div className="grid min-w-0 gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
                    {isEditing ? (
                      <input
                        className="h-10 w-full min-w-0 rounded-lg border border-blue-200 bg-white px-3 text-sm font-semibold text-slate-700 outline-none focus:border-blue-500"
                        value={editingCategoryDraft}
                        onChange={(event) =>
                          setEditingCategoryDraft(event.target.value)
                        }
                      />
                    ) : (
                      <div className="min-w-0">
                        <p className="truncate text-sm font-extrabold text-[#0b1533]">
                          {category}
                        </p>
                        <p
                          className={cn(
                            "mt-1 text-xs font-bold",
                            isInactive ? "text-red-500" : "text-emerald-600",
                          )}
                        >
                          {isInactive ? "Desactivada" : "Activa"}
                        </p>
                      </div>
                    )}

                    <div className="flex items-center gap-2">
                      {isEditing ? (
                        <>
                          <button
                            className="flex size-9 items-center justify-center rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                            type="button"
                            aria-label={`Guardar ${category}`}
                            onClick={saveCategoryName}
                          >
                            <Check className="size-4" aria-hidden />
                          </button>
                          <button
                            className="flex size-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-[#0b1533] hover:bg-slate-50"
                            type="button"
                            aria-label={`Cancelar edicion de ${category}`}
                            onClick={() => {
                              setEditingCategory(null);
                              setEditingCategoryDraft("");
                            }}
                          >
                            <X className="size-4" aria-hidden />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="flex size-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-[#0b1533] hover:bg-slate-50"
                            type="button"
                            aria-label={`Editar ${category}`}
                            onClick={() => startEditingCategory(category)}
                          >
                            <Edit3 className="size-4" aria-hidden />
                          </button>
                          <button
                            className={cn(
                              "flex size-9 items-center justify-center rounded-lg border bg-white hover:bg-slate-50",
                              isInactive
                                ? "border-emerald-200 text-emerald-600"
                                : "border-red-200 text-red-600",
                            )}
                            type="button"
                            aria-label={
                              isInactive
                                ? `Activar ${category}`
                                : `Desactivar ${category}`
                            }
                            onClick={() => toggleCategoryStatus(category)}
                          >
                            <Power className="size-4" aria-hidden />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </aside>

      <aside
        className={cn(
          "fixed inset-y-0 right-0 z-50 flex w-[min(100vw,392px)] flex-col border-l border-slate-200 bg-white shadow-2xl shadow-slate-900/20 transition-transform duration-200 sm:w-[430px]",
          isImportDrawerOpen ? "translate-x-0" : "translate-x-full",
        )}
        aria-label="Importar productos"
        aria-modal={isImportDrawerOpen}
        role="dialog"
      >
        <div className="flex h-[96px] items-center border-b border-slate-100 px-6">
          <div className="flex flex-1 items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="text-2xl font-extrabold tracking-tight text-[#0b1533]">
                Importar productos
              </p>
              <p className="mt-1 text-sm font-medium text-slate-500">
                Carga masiva desde archivo
              </p>
            </div>
            <button
              className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-[#0b1533] hover:bg-slate-50"
              type="button"
              aria-label="Cerrar importar productos"
              onClick={() => setIsImportDrawerOpen(false)}
            >
              <X className="size-5" aria-hidden />
            </button>
          </div>
        </div>

        <div className="grid min-w-0 flex-1 gap-5 overflow-y-auto px-6 py-6">
          <label className="grid min-w-0 gap-3 text-sm font-bold text-[#0b1533]">
            Archivo de productos
            <span className="grid min-w-0 place-items-center gap-3 rounded-lg border border-dashed border-slate-300 bg-slate-50 px-5 py-8 text-center transition-colors hover:border-blue-300 hover:bg-blue-50/50">
              <span className="flex size-14 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-sm">
                <UploadCloud className="size-7" aria-hidden />
              </span>
              <span className="grid min-w-0 gap-1">
                <span className="text-sm font-extrabold text-[#0b1533]">
                  Seleccionar archivo
                </span>
                <span className="text-xs font-semibold text-slate-500">
                  Excel o CSV: .xlsx, .xls, .csv
                </span>
              </span>
              <input
                className="sr-only"
                type="file"
                accept=".xlsx,.xls,.csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,text/csv"
              />
            </span>
          </label>

          <div className="grid min-w-0 gap-3 rounded-lg border border-slate-200 bg-white p-4">
            <div className="flex items-center gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                <FileSpreadsheet className="size-5" aria-hidden />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-extrabold text-[#0b1533]">
                  Plantilla sugerida
                </p>
                <p className="truncate text-xs font-semibold text-slate-500">
                  Nombre, SKU, categoria, precio, stock
                </p>
              </div>
            </div>
            <Button className="h-10 rounded-lg font-bold" type="button" variant="outline">
              <Download className="size-4" aria-hidden />
              Descargar plantilla
            </Button>
          </div>

          <div className="grid min-w-0 gap-3">
            <p className="text-sm font-extrabold text-[#0b1533]">
              Vista previa
            </p>
            <div className="overflow-hidden rounded-lg border border-slate-200">
              <div className="grid grid-cols-[1.2fr_0.8fr_1fr_0.8fr] bg-slate-50 text-xs font-bold text-slate-500">
                <span className="px-3 py-2">Producto</span>
                <span className="px-3 py-2">SKU</span>
                <span className="px-3 py-2">Categoria</span>
                <span className="px-3 py-2 text-right">Stock</span>
              </div>
              {[
                ["Agua mineral", "AGM001", "Bebidas", "24"],
                ["Barra granola", "BAR012", "Comida", "36"],
                ["Cafe molido", "CAF220", "Bebidas", "12"],
              ].map(([name, sku, category, stock]) => (
                <div
                  key={sku}
                  className="grid grid-cols-[1.2fr_0.8fr_1fr_0.8fr] border-t border-slate-100 text-xs font-semibold text-[#0b1533]"
                >
                  <span className="truncate px-3 py-2">{name}</span>
                  <span className="truncate px-3 py-2 text-slate-600">{sku}</span>
                  <span className="truncate px-3 py-2 text-slate-600">
                    {category}
                  </span>
                  <span className="px-3 py-2 text-right">{stock}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid min-w-0 gap-3 rounded-lg bg-blue-50 p-4 text-sm font-semibold text-blue-900">
            <p>Opciones de importacion</p>
            <label className="flex min-w-0 items-center gap-3">
              <input className="size-4 shrink-0" type="checkbox" defaultChecked />
              Actualizar productos si el SKU ya existe
            </label>
            <label className="flex min-w-0 items-center gap-3">
              <input className="size-4 shrink-0" type="checkbox" defaultChecked />
              Crear categorias faltantes automaticamente
            </label>
          </div>
        </div>

        <div className="grid gap-3 border-t border-slate-100 px-6 py-5 sm:grid-cols-2">
          <Button className="h-12 rounded-lg font-bold" type="button" variant="outline">
            Validar archivo
          </Button>
          <Button className="h-12 rounded-lg font-bold" type="button">
            Importar productos
          </Button>
        </div>
      </aside>

      <div className="grid gap-4 sm:grid-cols-2 2xl:grid-cols-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;

          return (
            <Card key={metric.label} className="min-h-[138px]">
              <CardContent className="flex h-full items-center gap-5 p-5">
                <div
                  className={cn(
                    "flex size-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg",
                    metric.color,
                  )}
                >
                  <Icon className="size-8" strokeWidth={2.1} aria-hidden />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-500">
                    {metric.label}
                  </p>
                  <p className="mt-1 text-3xl font-extrabold tracking-tight text-[#0b1533]">
                    {metric.value}
                  </p>
                  <p className={cn("mt-3 text-sm font-semibold", metric.tone)}>
                    {metric.marker} {metric.detail}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="min-w-0 overflow-visible">
        <CardContent className="grid gap-4 p-5 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-center">
          <div className="grid min-w-0 gap-4">
            <div className="relative max-w-[900px]">
              <div className="flex h-12 min-w-0 items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 text-slate-400 shadow-sm">
                <Search className="size-5 shrink-0" aria-hidden />
                <input
                  className="w-full min-w-0 bg-transparent text-sm font-semibold text-slate-700 outline-none placeholder:text-slate-400"
                  placeholder="Buscar producto, codigo o categoria..."
                />
                <button
                  className={cn(
                    "flex size-9 shrink-0 items-center justify-center rounded-lg text-[#0b1533] hover:bg-slate-100",
                    isSearchFiltersOpen && "bg-blue-50 text-blue-600",
                  )}
                  type="button"
                  aria-label="Abrir filtros de productos"
                  aria-expanded={isSearchFiltersOpen}
                  onClick={() => setIsSearchFiltersOpen((isOpen) => !isOpen)}
                >
                  <Filter className="size-5" aria-hidden />
                </button>
              </div>

              {isSearchFiltersOpen && (
                <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-20 grid min-w-0 gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-xl shadow-slate-900/10">
                  <div className="grid min-w-0 gap-3 sm:grid-cols-3">
                    <label className="grid min-w-0 gap-2 text-xs font-bold text-[#0b1533]">
                      Categoria
                      <select
                        className="h-10 w-full min-w-0 rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 outline-none focus:border-blue-500"
                        value={searchCategoryFilter}
                        onChange={(event) =>
                          setSearchCategoryFilter(event.target.value)
                        }
                      >
                        <option>Todos</option>
                        {panelCategories
                          .filter((category) => !inactiveCategories.includes(category))
                          .map((category) => (
                            <option key={category}>{category}</option>
                          ))}
                      </select>
                    </label>

                    <label className="grid min-w-0 gap-2 text-xs font-bold text-[#0b1533]">
                      Stock
                      <select
                        className="h-10 w-full min-w-0 rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 outline-none focus:border-blue-500"
                        value={searchStockFilter}
                        onChange={(event) =>
                          setSearchStockFilter(event.target.value)
                        }
                      >
                        {stockFilters.map((filter) => (
                          <option key={filter}>{filter}</option>
                        ))}
                      </select>
                    </label>

                    <label className="grid min-w-0 gap-2 text-xs font-bold text-[#0b1533]">
                      Precio
                      <select
                        className="h-10 w-full min-w-0 rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 outline-none focus:border-blue-500"
                        value={searchPriceFilter}
                        onChange={(event) =>
                          setSearchPriceFilter(event.target.value)
                        }
                      >
                        {priceFilters.map((filter) => (
                          <option key={filter}>{filter}</option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex min-w-0 flex-wrap gap-2">
                      {activeSearchFilters.length > 0 ? (
                        activeSearchFilters.map((filter) => (
                          <span
                            key={filter}
                            className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700"
                          >
                            {filter}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs font-semibold text-slate-500">
                          Sin filtros activos
                        </span>
                      )}
                    </div>

                    <button
                      className="h-9 rounded-lg border border-slate-200 px-4 text-xs font-bold text-[#0b1533] hover:bg-slate-50"
                      type="button"
                      onClick={() => {
                        setSearchCategoryFilter("Todos");
                        setSearchStockFilter("Todos");
                        setSearchPriceFilter("Todos");
                      }}
                    >
                      Limpiar filtros
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="flex gap-3 overflow-x-auto pb-1">
              {categories.map((category, index) => (
                <button
                  key={category}
                  className={cn(
                    "h-10 shrink-0 rounded-full border px-7 text-sm font-bold",
                    index === 0
                      ? "border-blue-600 bg-blue-600 text-white"
                      : "border-slate-200 bg-white text-[#0b1533] hover:bg-slate-50",
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="grid min-w-0 gap-3 sm:grid-cols-2 xl:w-[470px]">
            <Button
              className="h-12 rounded-lg font-bold"
              type="button"
              onClick={openNewProductPanel}
            >
              <PlusCircle className="size-5" aria-hidden />
              Nuevo producto
            </Button>
            <Button
              className="h-12 rounded-lg font-bold"
              type="button"
              variant="outline"
              onClick={openImportDrawer}
            >
              <Download className="size-5" aria-hidden />
              Importar
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.55fr)_minmax(340px,0.9fr)] min-[1800px]:grid-cols-[minmax(0,1.55fr)_minmax(360px,0.98fr)]">
        <div className="grid min-w-0 gap-5">
          <Card className="min-w-0 overflow-hidden">
            <CardHeader>
              <CardTitle>Lista de productos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto rounded-lg border border-slate-200">
                <table className="w-full min-w-[940px] text-left text-sm">
                  <thead className="bg-slate-50 text-xs font-bold text-slate-500">
                    <tr>
                      <th className="px-4 py-3">Producto</th>
                      <th className="px-4 py-3">SKU</th>
                      <th className="px-4 py-3">Categoria</th>
                      <th className="px-4 py-3">Precio</th>
                      <th className="px-4 py-3">Stock</th>
                      <th className="px-4 py-3">Estado</th>
                      <th className="px-4 py-3">Ultima actualizacion</th>
                      <th className="px-4 py-3 text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 font-medium text-[#0b1533]">
                    {products.map((product, index) => (
                      <tr key={product[1]} className="hover:bg-slate-50/70">
                        <td className="px-4 py-3">
                          <span className="flex items-center gap-3">
                            <span
                              className={cn(
                                "flex size-8 items-center justify-center rounded-md text-xs font-extrabold",
                                productSwatch(index),
                              )}
                            >
                              {product[0].slice(0, 2).toUpperCase()}
                            </span>
                            {product[0]}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-slate-600">{product[1]}</td>
                        <td className="px-4 py-3 text-slate-600">{product[2]}</td>
                        <td className="px-4 py-3">{product[3]}</td>
                        <td className="px-4 py-3">{product[4]}</td>
                        <td className="px-4 py-3">
                          <span
                            className={cn(
                              "rounded-full px-4 py-2 text-xs font-bold",
                              statusClass(product[5]),
                            )}
                          >
                            {product[5]}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-slate-600">{product[6]}</td>
                        <td className="px-4 py-3">
                          <div className="flex justify-end gap-2 text-[#0b1533]">
                            <button
                              className="rounded-md p-1 hover:bg-slate-100"
                              type="button"
                              aria-label={`Editar ${product[0]}`}
                              onClick={() => openEditProductPanel(product)}
                            >
                              <Edit3 className="size-4" aria-hidden />
                            </button>
                            <button
                              className="rounded-md p-1 hover:bg-slate-100"
                              type="button"
                              aria-label={`Copiar ${product[0]}`}
                            >
                              <Copy className="size-4" aria-hidden />
                            </button>
                            <button
                              className="rounded-md p-1 hover:bg-slate-100"
                              type="button"
                              aria-label={`Mas acciones para ${product[0]}`}
                            >
                              <MoreVertical className="size-4" aria-hidden />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-5 flex flex-col gap-4 text-sm font-medium text-slate-500 lg:flex-row lg:items-center lg:justify-between">
                <p>Mostrando 1-8 de 248 productos</p>
                <div className="flex flex-wrap items-center gap-3">
                  <button className="size-9 rounded-lg border border-slate-200 text-[#0b1533]">
                    ‹
                  </button>
                  {[1, 2, 3].map((page) => (
                    <button
                      key={page}
                      className={cn(
                        "size-9 rounded-lg border text-sm font-bold",
                        page === 1
                          ? "border-blue-600 text-blue-600"
                          : "border-slate-200 text-[#0b1533]",
                      )}
                    >
                      {page}
                    </button>
                  ))}
                  <span className="px-2 text-[#0b1533]">...</span>
                  <button className="size-9 rounded-lg border border-slate-200 text-[#0b1533]">
                    31
                  </button>
                  <button className="size-9 rounded-lg border border-slate-200 text-[#0b1533]">
                    ›
                  </button>
                  <button className="h-10 rounded-lg border border-slate-200 px-5 text-[#0b1533]">
                    8 por pagina
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="min-w-0 overflow-hidden">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle>Movimientos recientes</CardTitle>
              <a href="/productos" className="text-sm font-bold text-blue-600">
                Ver todas los movimientos
              </a>
            </CardHeader>
            <CardContent className="grid gap-3">
              {movements.map((movement) => (
                <div
                  key={`${movement.type}-${movement.date}`}
                  className="grid gap-3 rounded-lg border border-slate-100 px-2 py-2 text-sm font-medium text-[#0b1533] sm:grid-cols-[120px_150px_minmax(0,1fr)_130px_150px] sm:items-center"
                >
                  <span className="flex items-center gap-3">
                    <span
                      className={cn(
                        "flex size-7 items-center justify-center rounded-full",
                        movement.color === "emerald" && "bg-emerald-100 text-emerald-700",
                        movement.color === "red" && "bg-red-100 text-red-700",
                        movement.color === "amber" && "bg-amber-100 text-amber-700",
                      )}
                    >
                      {movement.color === "emerald" ? (
                        <ArrowUp className="size-4" aria-hidden />
                      ) : movement.color === "red" ? (
                        <ArrowDown className="size-4" aria-hidden />
                      ) : (
                        <AlertTriangle className="size-4" aria-hidden />
                      )}
                    </span>
                    {movement.type}
                  </span>
                  <span>{movement.product}</span>
                  <span className="text-slate-600">{movement.note}</span>
                  <span
                    className={cn(
                      "w-fit rounded-full px-4 py-1 text-xs font-bold",
                      movement.color === "emerald"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-red-100 text-red-700",
                    )}
                  >
                    {movement.amount}
                  </span>
                  <span className="text-slate-600">{movement.date}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="grid min-w-0 gap-5 md:grid-cols-2">
          <Card className="min-w-0 overflow-hidden md:col-span-2">
            <CardHeader>
              <CardTitle>Resumen de inventario</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-5">
              {inventorySummary.map((item) => (
                <div
                  key={item.label}
                  className="grid grid-cols-[96px_minmax(0,1fr)_86px] items-center gap-4 text-sm"
                >
                  <span className="flex items-center gap-3 font-medium text-slate-600">
                    <span className={cn("size-3 rounded-full", item.color)} />
                    {item.label}
                  </span>
                  <span className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <span
                      className={cn("block h-full rounded-full", item.color)}
                      style={{ width: item.width }}
                    />
                  </span>
                  <span className="text-right font-bold text-[#0b1533]">
                    {item.count}
                    <span className="ml-1 font-medium text-slate-500">
                      ({item.percent})
                    </span>
                  </span>
                </div>
              ))}
              <div className="flex justify-between border-t border-slate-200 pt-5 text-sm font-bold text-[#0b1533]">
                <span>Total de productos</span>
                <span>248</span>
              </div>
            </CardContent>
          </Card>

          <Card className="min-w-0 overflow-hidden">
            <CardHeader>
              <CardTitle>Categorias</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-5">
              {categoryTotals.map(([category, total]) => (
                <div
                  key={category}
                  className="flex items-center justify-between text-sm font-medium text-[#0b1533]"
                >
                  <span>{category}</span>
                  <span className="rounded-full bg-slate-100 px-3 py-1 font-bold text-slate-600">
                    {total}
                  </span>
                </div>
              ))}
              <button
                className="pt-8 text-center text-sm font-bold text-blue-600"
                type="button"
                onClick={openCategoryDrawer}
              >
                Ver todas las categorias
              </button>
            </CardContent>
          </Card>

          <Card className="min-w-0 overflow-hidden">
            <CardHeader>
              <CardTitle>Producto destacado</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-5">
              <div className="grid gap-5 min-[1700px]:grid-cols-[112px_minmax(0,1fr)]">
                <div className="flex h-[150px] items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-400 min-[1700px]:h-[180px]">
                  <Box className="size-16" strokeWidth={1.8} aria-hidden />
                </div>
                <div className="min-w-0">
                  <h3 className="text-lg font-extrabold text-[#0b1533]">
                    Coca-Cola 600ml
                  </h3>
                  <Badge className="mt-3 rounded-full px-4" tone="success">
                    En stock
                  </Badge>
                  <div className="mt-5 grid gap-4 text-sm">
                    <div className="flex justify-between gap-4">
                      <span className="text-slate-500">Precio</span>
                      <span className="font-bold text-[#0b1533]">$18.00</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="text-slate-500">Categoria</span>
                      <span className="font-bold text-[#0b1533]">Bebidas</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="text-slate-500">Stock disponible</span>
                      <span className="font-bold text-[#0b1533]">52 unidades</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Ultima actualizacion</span>
                      <p className="font-bold text-[#0b1533]">15/05/2024 10:30</p>
                    </div>
                  </div>
                </div>
              </div>

              <Button
                className="h-11 rounded-lg font-bold"
                type="button"
                variant="outline"
                onClick={() => openEditProductPanel(featuredProduct)}
              >
                <Edit3 className="size-5" aria-hidden />
                Editar
              </Button>
              <Button className="h-11 rounded-lg border-red-200 text-red-600 hover:bg-red-50" variant="outline">
                <Power className="size-5" aria-hidden />
                Desactivar
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
