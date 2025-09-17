// tests/Citas/Administracion/Servicios/Grupos de servicios/Habilitar_Deshabilitar.spec.ts
// ================================================================
// TEST CASE: Habilitar/Deshabilitar Grupo de Servicios
// Producto: Citas → Administración → Menú: Servicios/Grupos de servicios
// Simula cambio de estado.
// ================================================================

import { test } from '../../../../src/fixtures/authenticatedSuite';

test('TC-005: Debería poder habilitar/deshabilitar un grupo de servicios', async ({ authenticatedPage }) => {
  const page = authenticatedPage;

  await page.click('text=Citas');                          // ← Ir a Citas
  await page.click('text=Administración');                 // ← Entrar a Administración
  await page.click('text=Servicios/Grupos de servicios');  // ← Seleccionar submenú

  await page.click('text=Grupo Test Automático');          // ← Seleccionar grupo
  await page.click('button:has-text("Deshabilitar")');     // ← Clic en Deshabilitar

  await page.waitForSelector('text=Deshabilitado', { timeout: 5000 }); // ← Validar estado

  await page.click('button:has-text("Habilitar")');         // ← Clic en Habilitar
  await page.waitForSelector('text=Habilitado', { timeout: 5000 });   // ← Validar estado
});