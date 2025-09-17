// tests/Citas/Administracion/Servicios/Grupos de servicios/Agrupacion_masiva.spec.ts
// ================================================================
// TEST CASE: Agrupación Masiva de Servicios
// Producto: Citas → Administración → Menú: Servicios/Grupos de servicios
// Simula asignación masiva.
// ================================================================

import { test } from '../../../../src/fixtures/authenticatedSuite';

test('TC-006: Debería poder realizar agrupación masiva de servicios', async ({ authenticatedPage }) => {
  const page = authenticatedPage;

  await page.click('text=Citas');                          // ← Ir a Citas
  await page.click('text=Administración');                 // ← Entrar a Administración
  await page.click('text=Servicios/Grupos de servicios');  // ← Seleccionar submenú

  await page.click('button:has-text("Agrupación Masiva")'); // ← Abrir modal
  await page.check('#servicio-1');                         // ← Seleccionar servicio 1
  await page.check('#servicio-2');                         // ← Seleccionar servicio 2
  await page.selectOption('#grupo-destino', 'Grupo Test Automático'); // ← Asignar a grupo

  await page.click('button:has-text("Aplicar")');          // ← Aplicar cambios
  await page.waitForSelector('text=Agrupación completada', { timeout: 5000 }); // ← Validar
});