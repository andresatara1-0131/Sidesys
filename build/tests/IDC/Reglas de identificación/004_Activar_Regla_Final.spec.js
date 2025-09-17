"use strict";
// 📁 tests/idc/reglas-identificacion/activar-regla.spec.ts
// 🔄 Test para activar/desactivar reglas
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test"); // 🧩 Importar Playwright
const login_page_1 = require("../../../pages/suite/login.page"); // 📄 Page Object login Suite
const products_page_1 = require("../../../pages/suite/products.page"); // 📄 Page Object productos
const reglas_identificacion_page_1 = require("../../../pages/idc/reglas-identificacion.page"); // 📄 Page Object reglas IDC
const helpers_1 = require("../../../utils/helpers"); // 📸 Utilidad para evidencias
test_1.test.describe('[IDC] Reglas de Identificación - Activar/Desactivar Reglas', () => {
    (0, test_1.test)('004_Activar_Regla - Activar y desactivar regla aleatoria', async ({ page }, testInfo) => {
        // 🏗️ Inicializar Page Objects
        const loginPage = new login_page_1.SuiteLoginPage(page);
        const productsPage = new products_page_1.SuiteProductsPage(page);
        const reglasPage = new reglas_identificacion_page_1.IDCReglasIdentificacionPage(page);
        await test_1.test.step('🔐 Login y navegación a IDC', async () => {
            await loginPage.login('admincitas@sidesys.com', 'E%4oCK!Hl'); // 📧🔒 Login
            const idcUrl = await productsPage.openIDC(); // 🎯 Abrir IDC
            await productsPage.navigateToProductUrl(idcUrl); // 🌐 Navegar a URL
            await reglasPage.navigateToReglasIdentificacion(); // 📋 Navegar a reglas
            await (0, helpers_1.captureEvidence)(page, testInfo, 'modulo_reglas_cargado'); // 📸 Evidencia
        });
        await test_1.test.step('📊 Obtener reglas existentes', async () => {
            const rowCount = await reglasPage.getGridRowCount(); // 🔢 Contar reglas
            (0, test_1.expect)(rowCount).toBeGreaterThan(0); // ✅ Validar que hay reglas
            console.log(`📋 ${rowCount} reglas encontradas`); // 📝 Log de conteo
        });
        let indiceAleatorio; // 📍 Índice de regla a activar/desactivar
        let descripcionRegla; // 📝 Descripción de la regla
        await test_1.test.step('🎯 Seleccionar regla aleatoria', async () => {
            indiceAleatorio = await reglasPage.selectRandomGridRow(); // 🎯 Seleccionar regla aleatoria
            descripcionRegla = await reglasPage.getGridCellText(indiceAleatorio, 1); // 📝 Obtener descripción
            console.log(`🎯 Regla seleccionada: ${descripcionRegla} (índice ${indiceAleatorio})`); // 📝 Log de selección
            await (0, helpers_1.captureEvidence)(page, testInfo, 'regla_seleccionada'); // 📸 Evidencia
        });
        await test_1.test.step('🔄 Activar la regla', async () => {
            await reglasPage.toggleRegla(indiceAleatorio); // 🔄 Activar regla
            await page.waitForTimeout(7000); // ⏳ Esperar 7 segundos (como en el original)
            await (0, helpers_1.captureEvidence)(page, testInfo, 'regla_activada'); // 📸 Evidencia
        });
        await test_1.test.step('🔄 Desactivar la regla', async () => {
            await reglasPage.toggleRegla(indiceAleatorio); // 🔄 Desactivar regla
            await page.waitForTimeout(7000); // ⏳ Esperar 7 segundos (como en el original)
            await (0, helpers_1.captureEvidence)(page, testInfo, 'regla_desactivada'); // 📸 Evidencia
        });
        await test_1.test.step('✅ Validar que los cambios se guardaron', async () => {
            // La validación ya se hace dentro de toggleRegla() con validateSuccessMessage()
            console.log('✅ Cambios de activación/desactivación validados'); // 📝 Log de validación
        });
        console.log('✅ Test de activación/desactivación de regla completado exitosamente'); // 📝 Log final
    });
});
//# sourceMappingURL=004_Activar_Regla_Final.spec.js.map