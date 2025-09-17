// tests/IDC/Reglas de identificación/007_Validacion_Paginado.spec.ts
// ================================================================
// TEST CASE: Validar Paginado de Reglas
// Producto: IDC → Reglas de identificación
// Simula navegación entre páginas.
// ================================================================

import { test, expect } from '../../../src/fixtures/authenticatedSuite';

test('TC-018: Debería poder navegar entre páginas de reglas', async ({ authenticatedPage }) => {
  const page = authenticatedPage;

  await page.click('text=IDC');                                // ← Ir a IDC
  await page.click('text=Reglas de identificación');           // ← Entrar a Reglas

  await page.click('button:has-text("Siguiente")');            // ← Ir a página 2
  await expect(page.locator('text=Página 2')).toBeVisible();   // ← Validar página

  await page.click('button:has-text("Anterior")');             // ← Volver a página 1
  await expect(page.locator('text=Página 1')).toBeVisible();   // ← Validar página
});