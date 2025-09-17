"use strict";
// 📁 tests/citas/administracion/login/login-citas.spec.ts
// 🔐 Test de login y navegación a Citas
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test"); // 🧩 Importar Playwright
const login_page_1 = require("../../../../pages/suite/login.page"); // 📄 Page Object login Suite
const products_page_1 = require("../../../../pages/suite/products.page"); // 📄 Page Object productos
const citas_base_page_1 = require("../../../../pages/citas/citas-base.page"); // 📄 Page Object base Citas
test_1.test.describe('Citas - Acceso exitoso al producto', () => {
    (0, test_1.test)('Login y validación de carga en Citas', async ({ page }) => {
        // 🏗️ Inicializar Page Objects
        const loginPage = new login_page_1.SuiteLoginPage(page);
        const productsPage = new products_page_1.SuiteProductsPage(page);
        const citasBasePage = new citas_base_page_1.CitasBasePage(page);
        await test_1.test.step('🔐 Login en Suite', async () => {
            await loginPage.login('admincitas@sidesys.com', 'E%4oCK!Hl'); // 📧🔒 Login
        });
        await test_1.test.step('📦 Abrir producto Citas', async () => {
            const citasUrl = await productsPage.openCitas(); // 🎯 Abrir Citas
            await productsPage.navigateToProductUrl(citasUrl); // 🌐 Navegar a URL
        });
        await test_1.test.step('⏳ Esperar carga completa de Citas', async () => {
            await citasBasePage.waitForCitasModuleLoad(); // ⏳ Esperar carga
        });
        await test_1.test.step('✅ Validar elementos clave en el módulo Citas', async () => {
            // 🔍 Validar elementos importantes
            await (0, test_1.expect)(page.getByText('event_available Citas')).toBeVisible({ timeout: 10000 }); // 🎯 Icono Citas
            await (0, test_1.expect)(page.getByRole('link', { name: /Inicio/i })).toBeVisible({ timeout: 10000 }); // 🏠 Enlace Inicio
        });
        console.log('✅ Test de acceso a Citas completado exitosamente'); // 📝 Log final
    });
});
//# sourceMappingURL=login-citas.spec.js.map