// tests/IDC/Reglas de identificacion/002_Editar_Regla.spec.ts
// ================================================================
// TEST CASE: Editar Regla de Identificacion
// Producto: IDC �� Reglas de identificacion
// Simula edicion de regla existente.
// ================================================================

import { test } from '../../../src/fixtures/authenticatedSuite';
import { ReglasIdentificacionPage } from '../../../src/pages/idc/ReglasIdentificacionPage';

test('TC-013: Deberia poder editar una regla de identificacion', async ({ authenticatedPage }) => {
  const page = authenticatedPage;

  await page.click('text=IDC');                                // �� Ir a IDC
  await page.click('text=Reglas de identificacion');           // �� Entrar a Reglas

  await page.click('text=Regla Test');                         // �� Seleccionar regla
  await page.click('button:has-text("Editar")');               // �� Clic en Editar

  const reglasPage = new ReglasIdentificacionPage(page);
  await reglasPage.llenarFormulario({                          // �� Cambiar datos
    nombre: 'Regla Editada',
    tipo: 'Huella',
    prioridad: 'Baja',
  });

  await reglasPage.guardarYValidar();                          // �� Guardar cambios
});