// tests/Citas/Canal Web/Ingreso_Exitoso.spec.ts
// ================================================================
// TEST CASE: Ingreso exitoso con usuario ya registrado
// Producto: Citas → Canal Web
// Simula ingreso con tipo y número de documento de un usuario existente.
// Toma evidencia en cada paso clave.
// ================================================================

import { test } from '@playwright/test';
import { IngresoClientePage } from '../../pages/citas/web/IngresoClientePage'; // ← Ruta correcta

test('TC-ING-01: Debería poder ingresar con un usuario ya registrado', async ({ page }) => {
  const ingresoPage = new IngresoClientePage(page);

  // Paso 1: Ir a la página de bienvenida
  await page.goto('https://encuestas.sidesys.ar/CitasWeb/welcome');

  // Paso 2: Aceptar popup inicial
  await ingresoPage.aceptarPopupInicial();

  // Paso 3: Ir a la sección de ingreso
  await ingresoPage.irAIngreso();

  // Paso 4: Seleccionar tipo de documento
  await ingresoPage.seleccionarTipoDocumento('DNI');

  // Paso 5: Llenar número de documento (de un usuario ya creado)
  await ingresoPage.llenarNumeroDocumento('10026917'); // ← Usuario existente

  // Paso 6: Hacer clic en "Ingresar"
  await ingresoPage.hacerClicEnIngresar();

  // Paso 7: Validar mensaje de éxito
  await ingresoPage.validarIngresoExitoso();
});