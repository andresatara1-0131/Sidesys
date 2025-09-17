// tests/IDC/Reglas de identificacion/005_Ordenar_Reglas.spec.ts
// ================================================================
// TEST CASE: Ordenar Reglas de Identificacion
// Producto: IDC ¡÷ Reglas de identificacion
// Simula arrastrar y soltar para reordenar.
// ================================================================

import { test } from '../../../src/fixtures/authenticatedSuite';

test('TC-016: Deberia poder ordenar reglas de identificacion', async ({ authenticatedPage }) => {
  const page = authenticatedPage;

  await page.click('text=IDC');                                // ¡ö Ir a IDC
  await page.click('text=Reglas de identificacion');           // ¡ö Entrar a Reglas

  // Simular arrastrar regla 1 y soltarla en posicion 2
  await page.dragAndDrop('#regla-1', '#regla-2');              // ¡ö Arrastrar y soltar

  // Validar que el orden cambio (por ejemplo, texto de posicion)
  await page.waitForSelector('text=Posicion: 2', { timeout: 5000 }); // ¡ö Validar nuevo orden
});