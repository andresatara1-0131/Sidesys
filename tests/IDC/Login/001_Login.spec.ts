// 📁 tests/idc/login/login-idc.spec.ts
// 🔐 Test de login y navegación a IDC

import { test, expect } from '@playwright/test'; // 🧩 Importar Playwright
import { SuiteLoginPage } from '../../../pages/suite/login.page'; // 📄 Page Object login Suite
import { SuiteProductsPage } from '../../../pages/suite/products.page'; // 📄 Page Object productos
import { IDCBasePage } from '../../../pages/idc/idc-base.page'; // 📄 Page Object base IDC
import { captureEvidence } from '../../../utils/helpers'; // 📸 Utilidad para evidencias

test.describe('IDC - Login y Navegación', () => {
  test('001_Login_Identificacion de Cliente', async ({ page }, testInfo) => {
    // 🏗️ Inicializar Page Objects
    const loginPage = new SuiteLoginPage(page);
    const productsPage = new SuiteProductsPage(page);
    const idcBasePage = new IDCBasePage(page);

    await test.step('🔐 Login en Suite con credenciales válidas', async () => {
      await loginPage.login('admincitas@sidesys.com', 'E%4oCK!Hl'); // 📧🔒 Login
      await captureEvidence(page, testInfo, 'login_suite_exitoso'); // 📸 Evidencia
    });

    await test.step('📦 Abrir producto IDC desde Suite', async () => {
      const idcUrl = await productsPage.openIDC(); // 🎯 Abrir IDC
      await productsPage.navigateToProductUrl(idcUrl); // 🌐 Navegar a URL
      await captureEvidence(page, testInfo, 'producto_idc_abierto'); // 📸 Evidencia
    });

    await test.step('✅ Validar carga correcta de IDC', async () => {
      // 🔍 Validar que la página de IDC cargó correctamente
      await expect(page).toHaveURL(/.*\/IDC\/pages\/home/i, { timeout: 15000 }); // 🌐 Validar URL
      await expect(page.getByRole('link', { name: /fiber_manual_record/i })).toBeVisible({ timeout: 10000 }); // 📋 Validar menú
      
      console.log('✅ IDC cargado correctamente'); // 📝 Log de confirmación
    });

    await test.step('📋 Navegar a módulo de Reglas de Identificación', async () => {
      await idcBasePage.navigateToReglasIdentificacion(); // 📋 Navegar a reglas
      await captureEvidence(page, testInfo, 'modulo_reglas_accedido'); // 📸 Evidencia
      
      // ✅ Validar que estamos en el módulo correcto
      await expect(page.getByRole('link', { name: /fiber_manual_record Reglas de identificación/i }))
        .toBeVisible({ timeout: 10000 }); // 📋 Validar enlace de reglas
    });

    console.log('✅ Test de login y navegación a IDC completado exitosamente'); // 📝 Log final
  });
});