"use strict";
// 📁 tests/idc/login/login-idc.spec.ts
// 🔐 Test de login y navegación a IDC
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test"); // 🧩 Importar Playwright
const login_page_1 = require("../../../pages/suite/login.page"); // 📄 Page Object login Suite
const products_page_1 = require("../../../pages/suite/products.page"); // 📄 Page Object productos
const idc_base_page_1 = require("../../../pages/idc/idc-base.page"); // 📄 Page Object base IDC
const helpers_1 = require("../../../utils/helpers"); // 📸 Utilidad para evidencias
test_1.test.describe('IDC - Login y Navegación', () => {
    (0, test_1.test)('001_Login_Identificacion de Cliente', async ({ page }, testInfo) => {
        // 🏗️ Inicializar Page Objects
        const loginPage = new login_page_1.SuiteLoginPage(page);
        const productsPage = new products_page_1.SuiteProductsPage(page);
        const idcBasePage = new idc_base_page_1.IDCBasePage(page);
        await test_1.test.step('🔐 Login en Suite con credenciales válidas', async () => {
            await loginPage.login('admincitas@sidesys.com', 'E%4oCK!Hl'); // 📧🔒 Login
            await (0, helpers_1.captureEvidence)(page, testInfo, 'login_suite_exitoso'); // 📸 Evidencia
        });
        await test_1.test.step('📦 Abrir producto IDC desde Suite', async () => {
            const idcUrl = await productsPage.openIDC(); // 🎯 Abrir IDC
            await productsPage.navigateToProductUrl(idcUrl); // 🌐 Navegar a URL
            await (0, helpers_1.captureEvidence)(page, testInfo, 'producto_idc_abierto'); // 📸 Evidencia
        });
        await test_1.test.step('✅ Validar carga correcta de IDC', async () => {
            // 🔍 Validar que la página de IDC cargó correctamente
            await (0, test_1.expect)(page).toHaveURL(/.*\/IDC\/pages\/home/i, { timeout: 15000 }); // 🌐 Validar URL
            await (0, test_1.expect)(page.getByRole('link', { name: /fiber_manual_record/i })).toBeVisible({ timeout: 10000 }); // 📋 Validar menú
            console.log('✅ IDC cargado correctamente'); // 📝 Log de confirmación
        });
        await test_1.test.step('📋 Navegar a módulo de Reglas de Identificación', async () => {
            await idcBasePage.navigateToReglasIdentificacion(); // 📋 Navegar a reglas
            await (0, helpers_1.captureEvidence)(page, testInfo, 'modulo_reglas_accedido'); // 📸 Evidencia
            // ✅ Validar que estamos en el módulo correcto
            await (0, test_1.expect)(page.getByRole('link', { name: /fiber_manual_record Reglas de identificación/i }))
                .toBeVisible({ timeout: 10000 }); // 📋 Validar enlace de reglas
        });
        console.log('✅ Test de login y navegación a IDC completado exitosamente'); // 📝 Log final
    });
});
//# sourceMappingURL=001_Login.spec.js.map