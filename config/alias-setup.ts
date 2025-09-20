/** Global setup: registra aliases de TS antes de los tests */

import 'tsconfig-paths/register';       // ← Carga el resolver de @fixtures/@pages/@utils
export default async function globalSetup() { // ← Playwright exige export por defecto
  // no-op: solo necesitamos la línea superior
}