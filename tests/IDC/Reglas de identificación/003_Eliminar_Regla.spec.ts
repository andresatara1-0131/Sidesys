// tests/IDC/Reglas de identificacion/003_Eliminar_Regla.spec.ts
// ================================================================
// TEST CASE: Eliminar Regla de Identificacion
// Producto: IDC ¡÷ Reglas de identificacion
// Simula eliminacion con confirmacion.
// ================================================================

import { test } from '../../../src/fixtures/authenticatedSuite';

test('TC-014: Deberia poder eliminar una regla de identificacion', async ({ authenticatedPage }) => {
  const page = authenticatedPage;

  await page.click('text=IDC');                                // ¡ö Ir a IDC
  await page.click('text=Reglas de identificacion');           // ¡ö Entrar a Reglas

  await page.click('text=Regla Editada');                      // ¡ö Seleccionar regla
  await page.click('button:has-text("Eliminar")');             // ¡ö Clic en Eliminar

  await page.click('button:has-text("Confirmar")');            // ¡ö Confirmar en popup
  await page.waitForSelector('text=Regla eliminada', { timeout: 5000 }); // ¡ö Validar exito
});