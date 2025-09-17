// tests/Citas/Canal Web/Registro_Cliente_Exito.spec.ts
// ================================================================
// TEST CASE: Registro de cliente NUEVO (datos únicos)
// Producto: Citas → Canal Web
// Simula registro completo con datos aleatorios.
// Toma evidencia en cada paso clave.
// ================================================================

import { test } from '@playwright/test';
import { RegistroClientePage } from '../../pages/RegistroClientePage';

test('TC-REG-01: Debería poder registrarse con datos únicos', async ({ page }) => {
  const registroPage = new RegistroClientePage(page);

  // Paso 1: Ir a la página y aceptar popup inicial
  await page.goto('https://encuestas.sidesys.ar/CitasWeb/welcome');
  await registroPage.aceptarPopupInicial();

  // Paso 2: Ir a formulario de registro
  await registroPage.irARegistro();

  // Paso 3: Llenar formulario con datos aleatorios
  await registroPage.llenarFormulario();

  // Paso 4: Aceptar políticas (con scroll)
  await registroPage.aceptarPoliticas();

  // Paso 5: Confirmar registro
  await registroPage.confirmarRegistro();

  // Paso 6: Validar mensaje de éxito
  await page.waitForSelector('text=Te has registrado', { timeout: 10000 });
});