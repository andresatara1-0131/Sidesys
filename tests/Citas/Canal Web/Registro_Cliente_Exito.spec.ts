// tests/Citas/Canal Web/Registro_Cliente_Exito.spec.ts
// ================================================================
// TEST CASE: Registro de cliente NUEVO (datos únicos)
// Producto: Citas → Canal Web
// Simula registro completo con validaciones de campos.
// ================================================================

import { test } from '@playwright/test';
import { RegistroClientePage } from '../../pages/RegistroClientePage';
import { generateRandomName, generateRandomLastName, generateRandomDocument, generateRandomPhone, generateRandomEmail, generateRandomCellphone } from '../../utils/testData';

test('TC-REG-01: Debería poder registrarse con datos válidos y únicos', async ({ page }) => {
  const registroPage = new RegistroClientePage(page);

  // Paso 1: Ir a la página y aceptar popup inicial
  await page.goto('https://encuestas.sidesys.ar/CitasWeb/welcome');
  await registroPage.aceptarPopupInicial();

  // Paso 2: Ir a formulario de registro
  await registroPage.irARegistro();

  // Paso 3: Llenar formulario con validaciones
  const nombre = generateRandomName();
  const apellido = generateRandomLastName();
  const documento = generateRandomDocument();
  const telefono = generateRandomPhone();
  const email = generateRandomEmail();
  const celular = generateRandomCellphone();

  await registroPage.llenarNombre(nombre);
  await registroPage.llenarApellido(apellido);
  await registroPage.seleccionarTipoDocumento('DNI');
  await registroPage.llenarNumeroDocumento(documento);
  await registroPage.llenarTelefono(telefono);
  await registroPage.confirmarTelefono(telefono, telefono); // ← Coinciden
  await registroPage.llenarEmail(email);
  await registroPage.confirmarEmail(email, email); // ← Coinciden
  await registroPage.seleccionarPrefijo('Argentina (54)');
  await registroPage.llenarCelular(celular);
  await registroPage.llenarCustomField('prueba');

  // Paso 4: Aceptar políticas
  await registroPage.aceptarPoliticas();

  // Paso 5: Confirmar registro
  await registroPage.confirmarRegistro();

  // Paso 6: Validar éxito
  await page.waitForSelector('text=Te has registrado', { timeout: 10000 });
});