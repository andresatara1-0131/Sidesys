// tests/Citas/Administracion/Servicios/Grupos de servicios/Buscar.spec.ts
// ================================================================
// TEST CASE: Buscar Grupo de Servicios
// Producto: Citas → Administración → Menú: Servicios/Grupos de servicios
// Simula búsqueda por nombre.
// ================================================================

import { test, expect } from '../../../../src/fixtures/authenticatedSuite';

test('TC-004: Debería poder buscar un grupo de servicios', async ({ authenticatedPage }) => {
  const page = authenticatedPage;

  await page.click('text=Citas');                          // ← Ir a Citas
  await page.click('text=Administración');                 // ← Entrar a Administración
  await page.click('text=Servicios/Grupos de servicios');  // ← Seleccionar submenú

  await page.fill('#buscador', 'Grupo Test');              // ← Escribir en buscador
  await page.press('#buscador', 'Enter');                  // ← Presionar Enter (como humano)

  await expect(page.locator('text=Grupo Test Automático')).toBeVisible(); // ← Validar resultado
});