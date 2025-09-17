// tests/Suite/Login/login.spec.ts
// ================================================================
// TEST CASE: Login en Suite
// Producto: Suite → Login
// Valida que se pueda iniciar sesión correctamente.
// ================================================================

import { test, expect } from '../../../src/fixtures/authenticatedSuite';
// ← Este test es redundante si usas el fixture, pero lo dejamos como prueba aislada.

test('TC-020: Debería poder iniciar sesión en Suite', async ({ authenticatedPage }) => {
  const page = authenticatedPage;

  // Validar que estamos en el dashboard (el fixture ya hizo login)
  await expect(page).toHaveURL(/dashboard/);                   // ← Validar URL
  await expect(page.locator('h1:has-text("Bienvenido")')).toBeVisible(); // ← Validar contenido
});