// tests/IDC/Reglas de identificacion/003_Eliminar_Regla.spec.ts
// ================================================================
// TEST CASE: Eliminar Regla de Identificacion
// Producto: IDC �� Reglas de identificacion
// Simula eliminacion con confirmacion.
// ================================================================

import { test } from '../../../src/fixtures/authenticatedSuite';

test('TC-014: Deberia poder eliminar una regla de identificacion', async ({ authenticatedPage }) => {
  const page = authenticatedPage;

  await page.click('text=IDC');                                // �� Ir a IDC
  await page.click('text=Reglas de identificacion');           // �� Entrar a Reglas

  await page.click('text=Regla Editada');                      // �� Seleccionar regla
  await page.click('button:has-text("Eliminar")');             // �� Clic en Eliminar

  await page.click('button:has-text("Confirmar")');            // �� Confirmar en popup
  await page.waitForSelector('text=Regla eliminada', { timeout: 5000 }); // �� Validar exito
});