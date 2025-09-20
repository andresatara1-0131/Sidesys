/** Citas Administración → abrir desde Suite, esperar carga y validar “Inicio”
 * - Login en Suite con credenciales de .env
 * - Hub: Productos → Card "Citas" → botón "Ver" (mismo tab si OPEN_PRODUCTS_IN_SAME_TAB=true)
 * - Esperar carga real del producto (URL /CitasBO + menú "Inicio")
 * - Validar breadcrumb "Inicio"
 * - Tomar ÚNICA captura final (espera 5s para “evidencia humana”)
 */
import { test } from '@fixtures/suite-fixture';                             // ← Fixture con app + evidence (step / finalOn)
import { CitasAdminHomePage } from '@pages/citas/administracion/HomePage';  // ← Page Object del home de Citas Admin

test('Citas Administración | Abrir desde Suite y validar Inicio', async ({ app, evidence }) => {
  await evidence.step('Login Suite', async () => {                          // ← Paso lógico: login
    await app.suite.login.login(                                            // ← Reutiliza el flujo de login
      process.env.SUITE_USER!,                                              // ← Usuario (.env)
      process.env.SUITE_PASS!                                               // ← Password (.env)
    );
  });

  let citasPage;                                                            // ← Guardará la pestaña del producto
  await evidence.step('Abrir Citas Administración', async () => {          // ← Paso: abrir producto desde Hub
    citasPage = await app.suite.hub.openCitasAdministracion();             // ← Clic “Ver” en la tarjeta "Citas"
  });

  await evidence.step('Esperar carga de Citas', async () => {              // ← Paso: esperar carga “real”
    const home = new CitasAdminHomePage(citasPage!);                        // ← Instancia del PO del producto
    await home.esperarCarga();                                              // ← ✅ URL /CitasBO + menú “Inicio” visible
    // Si además quieres SIEMPRE 5s fijos, descomenta:
    // await citasPage!.waitForTimeout(5000);                               // ← ⏱️ Espera humana opcional
  });

  await evidence.step('Validar Inicio', async () => {                      // ← Paso: validación funcional
    await new CitasAdminHomePage(citasPage!).validarInicio();              // ← Breadcrumb “Inicio” visible
  });

  await evidence.finalOn(                                                  // ← ÚNICA captura final (PNG)
    citasPage!,                                                            //    en la pestaña del producto
    'Validación Inicio - Citas Admin',                                     //    nombre del archivo PNG
    5000                                                                   // ← ⏱️ espera 5s antes de capturar
  );
});