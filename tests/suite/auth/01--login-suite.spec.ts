/** Suite → Login exitoso (con evidencias por paso) */

import { test, expect } from '@fixtures/suite-fixture';          // ← Fixture suite (app + evidence)

test('Suite | Login exitoso', async ({ app, evidence }) => {     // ← Nombre del caso
  await evidence.step('Autenticarse en Suite', async () => {     // ← Paso 1
    await app.suite.login.login(process.env.SUITE_USER!, process.env.SUITE_PASS!); // ← Login
  });

  await evidence.step('Validar encabezado visible', async () => { // ← Paso 2
    await expect(
      app.suite.login['page'].getByRole('heading', { name: 'e-Flow® Suite' })
    ).toBeVisible();                                             // ← Debe verse
  });
});