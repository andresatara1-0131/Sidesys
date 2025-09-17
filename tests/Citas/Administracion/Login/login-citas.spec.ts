// 📁 tests/citas/administracion/login/login-citas.spec.ts
// 🔐 Test de login y navegación a Citas

import { test, expect } from '@playwright/test'; // 🧩 Importar Playwright
import { SuiteLoginPage } from '../../../../pages/suite/login.page'; // 📄 Page Object login Suite
import { SuiteProductsPage } from '../../../../pages/suite/products.page'; // 📄 Page Object productos
import { CitasBasePage } from '../../../../pages/citas/citas-base.page'; // 📄 Page Object base Citas

test.describe('Citas - Acceso exitoso al producto', () => {
  test('Login y validación de carga en Citas', async ({ page }) => {
    // 🏗️ Inicializar Page Objects
    const loginPage = new SuiteLoginPage(page);
    const productsPage = new SuiteProductsPage(page);
    const citasBasePage = new CitasBasePage(page);

    await test.step('🔐 Login en Suite', async () => {
      await loginPage.login('admincitas@sidesys.com', 'E%4oCK!Hl'); // 📧🔒 Login
    });

    await test.step('📦 Abrir producto Citas', async () => {
      const citasUrl = await productsPage.openCitas(); // 🎯 Abrir Citas
      await productsPage.navigateToProductUrl(citasUrl); // 🌐 Navegar a URL
    });

    await test.step('⏳ Esperar carga completa de Citas', async () => {
      await citasBasePage.waitForCitasModuleLoad(); // ⏳ Esperar carga
    });

    await test.step('✅ Validar elementos clave en el módulo Citas', async () => {
      // 🔍 Validar elementos importantes
      await expect(page.getByText('event_available Citas')).toBeVisible({ timeout: 10000 }); // 🎯 Icono Citas
      await expect(page.getByRole('link', { name: /Inicio/i })).toBeVisible({ timeout: 10000 }); // 🏠 Enlace Inicio
    });

    console.log('✅ Test de acceso a Citas completado exitosamente'); // 📝 Log final
  });
});