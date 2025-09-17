// tests/IDC/Reglas de identificación/004_Activar_Regla_Final.spec.ts
// ================================================================
// TEST CASE: Activar Regla Final
// Producto: IDC → Reglas de identificación
// Simula activación de regla como paso final.
// ================================================================

import { test } from '../../../src/fixtures/authenticatedSuite';

test('TC-015: Debería poder activar una regla como regla final', async ({ authenticatedPage }) => {
  const page = authenticatedPage;

  await page.click('text=IDC');                                // ← Ir a IDC
  await page.click('text=Reglas de identificación');           // ← Entrar a Reglas

  await page.click('text=Nueva Regla Test');                   // ← Seleccionar regla
  await page.click('button:has-text("Activar como Final")');   // ← Activar como final

  await page.waitForSelector('text=Regla activada como final', { timeout: 5000 }); // ← Validar
});