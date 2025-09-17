// tests/Citas/Administracion/Sucursales/crear-sucursal.spec.ts
// ================================================================
// TEST CASE: Crear Sucursal
// Producto: Citas → Administración → Menú: Sucursales
// Simula creación de sucursal paso a paso.
// ================================================================

import { test } from '../../../../src/fixtures/authenticatedSuite';
import { SucursalesPage } from '../../../../src/pages/citas/admin/SucursalesPage';
import { testData } from '../../../../src/utils/testData';

test('TC-009: Debería poder crear una sucursal', async ({ authenticatedPage }) => {
  const page = authenticatedPage;

  await page.click('text=Citas');                  // ← Ir a Citas
  await page.click('text=Administración');         // ← Entrar a Administración
  await page.click('text=Sucursales');             // ← Seleccionar Sucursales

  const sucursalesPage = new SucursalesPage(page);
  await sucursalesPage.abrirFormulario();          // ← Abrir formulario
  await sucursalesPage.llenarFormulario(testData.sucursal); // ← Llenar datos
  await sucursalesPage.guardarYValidar();          // ← Guardar y validar
});