// tests/Citas/Administracion/Servicios/Grupos de servicios/PopUp_AM.spec.ts
// ================================================================
// TEST CASE: PopUp de Agrupación Masiva
// Producto: Citas → Administración → Menú: Servicios/Grupos de servicios
// Valida comportamiento del popup.
// ================================================================

import { test, expect } from '../../../../src/fixtures/authenticatedSuite';

test('TC-007: Debería mostrar popup de agrupación masiva', async ({ authenticatedPage }) => {
  const page = authenticatedPage;

  await page.click('text=Citas');                          // ← Ir a Citas
  await page.click('text=Administración');                 // ← Entrar a Administración
  await page.click('text=Servicios/Grupos de servicios');  // ← Seleccionar submenú

  await page.click('button:has-text("Agrupación Masiva")'); // ← Abrir popup

  await expect(page.locator('h2:has-text("Agrupación Masiva")')).toBeVisible(); // ← Validar título
  await expect(page.locator('#lista-servicios')).toBeVisible(); // ← Validar lista visible
});