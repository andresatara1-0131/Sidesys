// tests/Citas/Administracion/Servicios/Grupos de servicios/PopUp_GS.spec.ts
// ================================================================
// TEST CASE: PopUp de Gestión de Servicios
// Producto: Citas → Administración → Menú: Servicios/Grupos de servicios
// Valida popup al gestionar servicios.
// ================================================================

import { test, expect } from '../../../../src/fixtures/authenticatedSuite';

test('TC-008: Debería mostrar popup de gestión de servicios', async ({ authenticatedPage }) => {
  const page = authenticatedPage;

  await page.click('text=Citas');                          // ← Ir a Citas
  await page.click('text=Administración');                 // ← Entrar a Administración
  await page.click('text=Servicios/Grupos de servicios');  // ← Seleccionar submenú

  await page.click('button:has-text("Gestionar Servicios")'); // ← Abrir popup

  await expect(page.locator('h2:has-text("Gestionar Servicios")')).toBeVisible(); // ← Validar título
  await expect(page.locator('#tabla-servicios')).toBeVisible(); // ← Validar tabla
});