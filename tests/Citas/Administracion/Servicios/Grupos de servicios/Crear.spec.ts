// tests/Citas/Administracion/Servicios/Grupos de servicios/Crear.spec.ts
// ================================================================
// TEST CASE: Crear Grupo de Servicios
// Producto: Citas → Administración → Menú: Servicios/Grupos de servicios
// Simula paso a paso lo que haría un usuario humano.
// ================================================================

import { test } from '../../../../src/fixtures/authenticatedSuite';
import { ServiciosPage } from '../../../../src/pages/citas/admin/ServiciosPage';

test('TC-003: Debería poder crear un grupo de servicios', async ({ authenticatedPage }) => {
  const page = authenticatedPage;

  await page.click('text=Citas');                          // Paso 1: Ir a módulo Citas
  await page.click('text=Administración');                 // Paso 2: Entrar a Administración
  await page.click('text=Servicios/Grupos de servicios');  // Paso 3: Seleccionar submenú

  const serviciosPage = new ServiciosPage(page);
  await serviciosPage.crearGrupo({
    nombre: 'Consulta General',        // Nombre del grupo
    descripcion: 'Atención médica',    // Descripción breve
    estado: 'Activo',                  // Estado inicial
  });

  await page.click('button:has-text("Guardar")');          // Paso 4: Guardar
  await page.waitForSelector('text=Éxito', { timeout: 5000 }); // Validar mensaje (como humano)
});