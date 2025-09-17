// tests/IDC/Reglas de identificación/006_Buscar_Reglas.spec.ts
// ================================================================
// TEST CASE: Buscar Reglas de Identificación
// Producto: IDC → Reglas de identificación
// Simula búsqueda por nombre o tipo.
// ================================================================

import { test, expect } from '../../../src/fixtures/authenticatedSuite';

test('TC-017: Debería poder buscar reglas de identificación', async ({ authenticatedPage }) => {
  const page = authenticatedPage;

  await page.click('text=IDC');                                // ← Ir a IDC
  await page.click('text=Reglas de identificación');           // ← Entrar a Reglas

  await page.fill('#buscador', 'Regla Test');                  // ← Escribir en buscador
  await page.press('#buscador', 'Enter');                      // ← Presionar Enter

  await expect(page.locator('text=Regla Test')).toBeVisible(); // ← Validar resultado
});