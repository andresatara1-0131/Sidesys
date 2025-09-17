"use strict";
// 📁 tests/idc/reglas-identificacion/buscar-reglas.spec.ts
// 🔍 Test para buscar reglas
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test"); // 🧩 Importar Playwright
const login_page_1 = require("../../../pages/suite/login.page"); // 📄 Page Object login Suite
const products_page_1 = require("../../../pages/suite/products.page"); // 📄 Page Object productos
const reglas_identificacion_page_1 = require("../../../pages/idc/reglas-identificacion.page"); // 📄 Page Object reglas IDC
const helpers_1 = require("../../../utils/helpers"); // 📸 Utilidad para evidencias
test_1.test.describe('[IDC] Reglas de Identificación - Buscar Reglas', () => {
    (0, test_1.test)('006_Buscar_Reglas - Buscar regla existente e inexistente', async ({ page }, testInfo) => {
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
        await test_1.test.step('📊 Obtener primera regla para buscar', async () => {
            const rowCount = await reglasPage.getGridRowCount(); // 🔢 Contar reglas
            (0, test_1.expect)(rowCount).toBeGreaterThan(0); // ✅ Validar que hay reglas
            const primeraDescripcion = await reglasPage.getGridCellText(0, 1); // 📝 Obtener primera regla
            console.log(`🔍 Primera regla obtenida para búsqueda: "${primeraDescripcion}"`); // 📝 Log de regla
        });
        await test_1.test.step('🔍 Buscar texto que sí existe (prueba)', async () => {
            await reglasPage.searchInGrid('prueba'); // 🔍 Buscar "prueba"
            const count = await reglasPage.getGridRowCount(); // 🔢 Contar resultados
            (0, test_1.expect)(count).toBeGreaterThan(0); // ✅ Validar que hay resultados
            console.log(`✅ Búsqueda exitosa: ${count} resultados para "prueba"`); // 📝 Log de resultados
            await (0, helpers_1.captureEvidence)(page, testInfo, 'busqueda_con_resultados'); // 📸 Evidencia
        });
        await test_1.test.step('🔍 Buscar texto que no existe', async () => {
            await reglasPage.searchInGrid('algo que no existe'); // 🔍 Buscar texto inexistente
            const noResults = await reglasPage.validarReglaNoExiste('algo que no existe'); // ✅ Validar que no existe
            (0, test_1.expect)(noResults).toBeTruthy(); // ✅ Asegurar que no hay resultados
            console.log('✅ Validado que no hay resultados para búsqueda inexistente'); // 📝 Log de validación
            await (0, helpers_1.captureEvidence)(page, testInfo, 'busqueda_sin_resultados'); // 📸 Evidencia
        });
        await test_1.test.step('🧹 Limpiar búsqueda', async () => {
            const searchBox = page.getByRole('searchbox', { name: /Buscar/i }); // 🔍 Campo de búsqueda
            await searchBox.fill(''); // 🧹 Limpiar búsqueda
            await page.waitForTimeout(500); // ⏳ Esperar resultados
            const rowCount = await reglasPage.getGridRowCount(); // 🔢 Contar todas las reglas
            console.log(`🧹 Búsqueda limpiada - ${rowCount} reglas visibles`); // 📝 Log de limpieza
        });
        console.log('✅ Test de búsqueda de reglas completado exitosamente'); // 📝 Log final
    });
});
//# sourceMappingURL=006_Buscar_Reglas.spec.js.map