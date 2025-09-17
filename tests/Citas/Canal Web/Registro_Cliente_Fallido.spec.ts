// tests/Citas/Canal Web/Registro_Cliente_Fallido.spec.ts
// ================================================================
// TEST CASE: Registro fallido (documento duplicado) + reintento
// Producto: Citas → Canal Web
// Simula intento con documento existente, luego cambia y lo corrige.
// ================================================================

import { test } from '@playwright/test';
import { RegistroClientePage } from '../../pages/citas/web/RegistroClientePage';

test('TC-REG-02: Debería reintentar registro si el documento ya existe', async ({ page }) => {
  const registroPage = new RegistroClientePage(page);

  // Paso 1: Ir a la página y aceptar popup inicial
  await page.goto('https://encuestas.sidesys.ar/CitasWeb/welcome');
  await registroPage.aceptarPopupInicial();
  await registroPage.irARegistro();

  // Paso 2: Llenar con datos fijos (para forzar error)
  await registroPage.llenarNombre('Prueba');
  await registroPage.llenarApellido('Duplicado');
  await registroPage.seleccionarTipoDocumento('DNI');
  await registroPage.llenarNumeroDocumento('12345678'); // ← Fijo
  await registroPage.llenarTelefono('111111111');
  await registroPage.confirmarTelefono('111111111', '111111111');
  await registroPage.llenarEmail('duplicado@test.com');
  await registroPage.confirmarEmail('duplicado@test.com', 'duplicado@test.com');
  await registroPage.seleccionarPrefijo('Argentina (54)');
  await registroPage.llenarCelular('1122334455');
  await registroPage.llenarCustomField('prueba');

  // Paso 3: Aceptar políticas
  await registroPage.aceptarPoliticas();

  // Paso 4: Confirmar (debería fallar)
  await registroPage.confirmarRegistro();

  // Paso 5: Validar error
  await page.waitForSelector('text=Ya existe un usuario', { timeout: 5000 });

  // Paso 6: Cambiar documento y reintentar
  await registroPage.llenarNumeroDocumento('87654321'); // ← Nuevo
  await registroPage.llenarTelefono('222222222');
  await registroPage.confirmarTelefono('222222222', '222222222');
  await registroPage.llenarEmail('nuevo@test.com');
  await registroPage.confirmarEmail('nuevo@test.com', 'nuevo@test.com');
  await registroPage.llenarCelular('2233445566');

  // Paso 7: Volver a aceptar políticas
  await registroPage.aceptarPoliticas();

  // Paso 8: Confirmar de nuevo
  await registroPage.confirmarRegistro();

  // Paso 9: Validar éxito
  await page.waitForSelector('text=Te has registrado', { timeout: 10000 });
});