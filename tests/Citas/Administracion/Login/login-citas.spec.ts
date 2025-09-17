// tests/Citas/Administracion/Login/login-citas.spec.ts
// ================================================================
// TEST CASE: Login en Citas (si es distinto de Suite)
// Producto: Citas → Administración → Login
// Solo si Citas tiene login independiente.
// ================================================================

import { test, expect } from '../../../../src/fixtures/authenticatedSuite';
// ← Si usa el mismo login que Suite, este test no es necesario.

test('TC-021: Debería poder iniciar sesión en Citas Admin', async ({ authenticatedPage }) => {
  const page = authenticatedPage;

  await page.click('text=Citas');                              // ← Ir a Citas
  await page.waitForURL('**/citas/admin');                     // ← Esperar carga

  await expect(page.locator('h1:has-text("Citas Admin")')).toBeVisible(); // ← Validar
});