// tests/IDC/Reglas de identificación/001_Crear_Regla.spec.ts
// ================================================================
// TEST CASE: Crear Regla de Identificación
// Producto: IDC → Reglas de identificación
// Simula creación de regla paso a paso.
// ================================================================

import { test } from '../../../src/fixtures/authenticatedSuite';
import { ReglasIdentificacionPage } from '../../../src/pages/idc/ReglasIdentificacionPage';
import { testData } from '../../../src/utils/testData';

test('TC-012: Debería poder crear una regla de identificación', async ({ authenticatedPage }) => {
  const page = authenticatedPage;

  await page.click('text=IDC');                                // ← Ir a IDC
  await page.click('text=Reglas de identificación');           // ← Entrar a Reglas

  const reglasPage = new ReglasIdentificacionPage(page);
  await reglasPage.abrirFormularioCrear();                     // ← Abrir formulario
  await reglasPage.llenarFormulario(testData.reglaIDC);        // ← Llenar datos
  await reglasPage.guardarYValidar();                          // ← Guardar y validar
});