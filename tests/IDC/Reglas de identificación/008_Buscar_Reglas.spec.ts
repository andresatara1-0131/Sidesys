// tests/IDC/Reglas de identificación/008_Buscar_Reglas.spec.ts
// ================================================================
// TEST CASE: Búsqueda Avanzada de Reglas
// Producto: IDC → Reglas de identificación
// Simula búsqueda por filtros avanzados (tipo, estado, fecha).
// ================================================================

import { test, expect } from '../../../src/fixtures/authenticatedSuite';

test('TC-019: Debería poder buscar reglas con filtros avanzados', async ({ authenticatedPage }) => {
  const page = authenticatedPage;

  await page.click('text=IDC');                                // ← Ir a IDC
  await page.click('text=Reglas de identificación');           // ← Entrar a Reglas

  await page.selectOption('#filtro-tipo', 'Documento');        // ← Filtrar por tipo
  await page.selectOption('#filtro-estado', 'Activo');         // ← Filtrar por estado
  await page.fill('#filtro-fecha', '2025-01-01');              // ← Filtrar por fecha

  await page.click('button:has-text("Aplicar Filtros")');      // ← Aplicar filtros
  await expect(page.locator('text=Regla Test')).toBeVisible(); // ← Validar resultados
});