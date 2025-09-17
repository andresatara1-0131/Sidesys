// tests/Citas/Administracion/Servicios/Grupos de servicios/Editar.spec.ts
// ================================================================
// TEST CASE: Editar Grupo de Servicios
// Producto: Citas → Administración → Menú: Servicios/Grupos de servicios
// Simula edición como lo haría un usuario humano.
// ================================================================

import { test } from '../../../../src/fixtures/authenticatedSuite';
import { ServiciosPage } from '../../../../src/pages/citas/admin/ServiciosPage';

test('TC-002: Debería poder editar un grupo de servicios', async ({ authenticatedPage }) => {
  const page = authenticatedPage;

  await page.click('text=Citas');                          // ← Ir a Citas
  await page.click('text=Administración');                 // ← Entrar a Administración
  await page.click('text=Servicios/Grupos de servicios');  // ← Seleccionar submenú

  await page.click('text=Grupo Test Automático');          // ← Seleccionar grupo existente
  await page.click('button:has-text("Editar")');           // ← Clic en botón Editar

  const serviciosPage = new ServiciosPage(page);
  await serviciosPage.crearGrupo({                         // ← Reutiliza método (cambia datos)
    nombre: 'Grupo Editado',
    descripcion: 'Editado por Playwright',
    estado: 'Inactivo',
  });

  await serviciosPage.guardar();                           // ← Guardar cambios
  await serviciosPage.validarExito();                      // ← Validar éxito
});