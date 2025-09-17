// tests/Citas/Canal Web/TestCase_001_Crear_Cita.spec.ts
// ================================================================
// TEST CASE: Crear Cita desde Canal Web (usuario existente)
// Producto: Citas → Canal Web
// Simula flujo completo de creación de cita.
// Toma evidencia en cada paso clave.
// ================================================================

import { test } from '@playwright/test';
import { CrearCitaPage } from 'D:/EquipoCitas/playwright-demo/pages/citas/web/CrearCitaPage';

test('TC-CITA-01: Debería poder crear una cita desde el canal web', async ({ page }) => {
  const citaPage = new CrearCitaPage(page);

  // Paso 1: Iniciar sesión con usuario existente
  await citaPage.iniciarSesion('DNI', '10026917');

  // Paso 2: Iniciar creación de cita
  await citaPage.iniciarCreacionCita();

  // Paso 3: Seleccionar tipo de cita
  await citaPage.seleccionarTipoCita();

  // Paso 4: Seleccionar servicios
  await citaPage.seleccionarServicios([
    'Actualización de datos',
    'Adquisición productos',
    'Caja',
    'Información',
    'Asesoría'
  ]);

  // Paso 5: Continuar después de servicios
  await citaPage.continuarDespuesServicios();

  // Paso 6: Seleccionar "Mi ubicación"
  await citaPage.seleccionarMiUbicacion();

  // Paso 7: Seleccionar país y sucursal
  await citaPage.seleccionarPaisYSucursal('Colombia Calle 95 # 14 - 15');

  // Paso 8: Continuar después de sucursal
  await citaPage.continuarDespuesSucursal();

  // Paso 9: Seleccionar tipo de atención presencial
  await citaPage.seleccionarAtencionPresencial();

  // Paso 10: Continuar después de tipo de atención
  await citaPage.continuarDespuesAtencion();

  // Paso 11: Seleccionar fecha
  await citaPage.seleccionarFecha('25 de septiembre de');

  // Paso 12: Seleccionar hora
  await citaPage.seleccionarHora('07:00');

  // Paso 13: Continuar después de hora
  await citaPage.continuarDespuesHora();

  // Paso 14: Confirmar cita
  await citaPage.confirmarCita();

  // Paso 15: Validar éxito
  await citaPage.validarExito();
});