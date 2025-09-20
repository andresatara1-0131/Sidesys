/** IDC → abrir desde Suite, esperar carga y validar “Inicio”
 * - Login en Suite con credenciales de .env
 * - Hub: Productos → Card "Identificacion de Cliente" → botón "Ver"
 * - Esperar carga real del producto (URL /IDC + menú "Inicio")
 * - Validar breadcrumb "Inicio"
 * - Tomar ÚNICA captura final (espera 5s)
 */
import { test } from '@fixtures/suite-fixture';           // ← Fixture con app + evidence
import { IdcHomePage } from '@pages/idc/HomePage';        // ← Page Object del home de IDC

test('IDC | Abrir desde Suite y validar Inicio', async ({ app, evidence }) => {
  await evidence.step('Login Suite', async () => {         // ← Paso: login
    await app.suite.login.login(process.env.SUITE_USER!, process.env.SUITE_PASS!);
  });

  let idcPage;                                             // ← Pestaña del producto
  await evidence.step('Abrir IDC', async () => {           // ← Paso: abrir producto desde Hub
    idcPage = await app.suite.hub.openIDC();               // ← Clic “Ver” en tarjeta IDC
  });

  await evidence.step('Esperar carga de IDC', async () => {// ← Paso: esperar carga real
    const home = new IdcHomePage(idcPage!);                // ← PO del producto
    await home.esperarCarga();                              // ← ✅ URL /IDC + menú “Inicio” visible
    // (Opcional) espera fija:
    // await idcPage!.waitForTimeout(5000);
  });

  await evidence.step('Validar Inicio', async () => {      // ← Paso: validación funcional
    await new IdcHomePage(idcPage!).validarInicio();       // ← Breadcrumb “Inicio”
  });

  await evidence.finalOn(                                   // ← ÚNICA captura final (PNG)
    idcPage!,
    'Validación Inicio - IDC',
    5000
  );
});