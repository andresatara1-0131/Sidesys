// tests/IDC/Login/001_Login.spec.ts
// ================================================================
// TEST CASE: Login en IDC
// Producto: IDC → Login
// Valida que se pueda iniciar sesión en IDC (si es distinto de Suite).
// ================================================================

import { test, expect } from '../../../src/fixtures/authenticatedSuite';
// ← Si IDC usa el mismo login que Suite, este test es redundante.
// ← Si no, crea un fixture específico o usa login manual.

test('TC-011: Debería poder iniciar sesión en IDC', async ({ authenticatedPage }) => {
  const page = authenticatedPage;

  // Navegar a IDC (desde Suite o directamente)
  await page.click('text=IDC');                    // ← Menú principal
  await page.waitForURL('**/idc/dashboard');       // ← Esperar carga de IDC

  // Validar que estamos en el dashboard de IDC
  await expect(page.locator('h1:has-text("IDC Dashboard")')).toBeVisible(); // ← Validar título
});