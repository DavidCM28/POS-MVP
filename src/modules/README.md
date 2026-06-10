# Modules

Cada carpeta en `modules/` representa un vertical slice del POS. Otros dominios solo deben importar desde el `index.ts` publico del modulo.

Estructura esperada por modulo:

- `components/`: componentes visuales especificos del dominio.
- `hooks/`: hooks de TanStack Query o logica de dominio.
- `stores/`: Zustand local del modulo.
- `schemas/`: validaciones Zod para formularios y DTOs.
- `types/`: tipos e interfaces del dominio.
- `utils/`: funciones puras de negocio.

Reglas:

- `app/*` compone modulos, pero no contiene negocio.
- `modules/*` puede usar `shared/*` y otros modulos solo via barrel publico.
- `modules/*` no importa desde `app/*`.
