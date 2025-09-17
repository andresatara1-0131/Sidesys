"use strict";
// 📁 tests/hooks/citas-hooks.ts
// 🎯 Hooks específicos para tests de Citas
Object.defineProperty(exports, "__esModule", { value: true });
exports.citasHooks = exports.test = void 0;
exports.beforeEachHook = beforeEachHook;
exports.afterEachHook = afterEachHook;
exports.configureTimeouts = configureTimeouts;
const test_1 = require("@playwright/test"); // 🧩 Importar test base
const login_page_1 = require("../pages/suite/login.page"); // 📄 Page Object login
const products_page_1 = require("../pages/suite/products.page"); // 📄 Page Object productos
const citas_base_page_1 = require("../pages/citas/citas-base.page"); // 📄 Page Object base Citas
// 🎯 Fixture extendida para Citas
exports.test = test_1.test.extend({
    // 🏗️ Inicializar Page Objects automáticamente
    loginPage: async ({ page }, use) => {
        const loginPage = new login_page_1.SuiteLoginPage(page); // 🏗️ Crear instancia
        await use(loginPage); // 🎯 Usar en tests
    },
    productsPage: async ({ page }, use) => {
        const productsPage = new products_page_1.SuiteProductsPage(page); // 🏗️ Crear instancia
        await use(productsPage); // 🎯 Usar en tests
    },
    citasBasePage: async ({ page }, use) => {
        const citasBasePage = new citas_base_page_1.CitasBasePage(page); // 🏗️ Crear instancia
        await use(citasBasePage); // 🎯 Usar en tests
    },
});
// 🎯 Hook global antes de cada test de Citas
function beforeEachHook() {
    test_1.test.beforeEach(async ({ page }) => {
        // 🏠 Navegar a home antes de cada test
        await page.goto('https://encuestas.sidesys.ar', { waitUntil: 'networkidle' });
        console.log('✅ Navegado a página home antes del test'); // 📝 Log de confirmación
    });
}
// 🎯 Hook global después de cada test de Citas
function afterEachHook() {
    test_1.test.afterEach(async ({ page }, testInfo) => {
        // 📸 Capturar screenshot en caso de fallo
        if (testInfo.status === 'failed') {
            const screenshotPath = `test-results/screenshots/failed-${testInfo.title.replace(/[^a-zA-Z0-9]/g, '_')}-${Date.now()}.png`;
            await page.screenshot({ path: screenshotPath, fullPage: true }); // 📸 Screenshot
            console.log(`📸 Screenshot de fallo guardado: ${screenshotPath}`); // 📝 Log de screenshot
        }
    });
}
// 🎯 Configuración de timeout global para Citas
function configureTimeouts() {
    test_1.test.setTimeout(120000); // ⏱️ Timeout de 2 minutos
    test_1.test.slow(); // 🐌 Marcar tests como "slow" para más tiempo
}
// 📋 Exportar hooks para uso en tests
exports.citasHooks = {
    test: exports.test,
    beforeEachHook,
    afterEachHook,
    configureTimeouts
};
//# sourceMappingURL=citas-hooks.js.map