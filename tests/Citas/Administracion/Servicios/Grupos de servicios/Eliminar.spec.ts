// tests/Citas/Administracion/Servicios/Grupos de servicios/Eliminar.spec.ts
// ================================================================
// TEST CASE: Eliminar Grupo de Servicios
// Producto: Citas → Administración → Menú: Servicios/Grupos de servicios
// Simula eliminación con confirmación.
// ================================================================

import { test } from '../../../../src/fixtures/authenticatedSuite';

test('TC-003: Debería poder eliminar un grupo de servicios', async ({ authenticatedPage }) => {
  const page = authenticatedPage;

  await page.click('text=Citas');                          // ← Ir a Citas
  await page.click('text=Administración');                 // ← Entrar a Administración
  await page.click('text=Servicios/Grupos de servicios');  // ← Seleccionar submenú

  await page.click('text=Grupo Editado');                  // ← Seleccionar grupo
  await page.click('button:has-text("Eliminar")');         // ← Clic en Eliminar

  await page.click('button:has-text("Confirmar")');        // ← Confirmar eliminación (popup)
  await page.waitForSelector('text=Eliminado con éxito', { timeout: 5000 }); // ← Validar
});