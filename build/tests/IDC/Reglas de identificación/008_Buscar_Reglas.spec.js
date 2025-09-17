"use strict";
// 📁 tests/idc/reglas-identificacion/buscar-reglas-avanzado.spec.ts
// 🔍 Test avanzado de búsqueda de reglas (para el 008)
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const login_page_1 = require("../../../pages/suite/login.page");
const products_page_1 = require("../../../pages/suite/products.page");
const reglas_identificacion_page_1 = require("../../../pages/idc/reglas-identificacion.page");
const helpers_1 = require("../../../utils/helpers");
test_1.test.describe('[IDC] Reglas de Identificación - Búsqueda Avanzada', () => {
    (0, test_1.test)('008_Buscar_Reglas_Avanzado - Búsqueda con múltiples criterios', async ({ page }, testInfo) => {
        // 🏗️ Inicializar Page Objects
        const loginPage = new login_page_1.SuiteLoginPage(page);
        const productsPage = new products_page_1.SuiteProductsPage(page);
        const reglasPage = new reglas_identificacion_page_1.IDCReglasIdentificacionPage(page);
        await test_1.test.step('🔐 Login y navegación a IDC', async () => {
            await loginPage.login('admincitas@sidesys.com', 'E%4oCK!Hl');
            const idcUrl = await productsPage.openIDC();
            await productsPage.navigateToProductUrl(idcUrl);
            await reglasPage.navigateToReglasIdentificacion();
        });
        await test_1.test.step('🔍 Búsqueda con diferentes criterios', async () => {
            const criteriosBusqueda = [
                'validación', // 🔍 Criterio 1
                'identidad', // 🔍 Criterio 2  
                'documento', // 🔍 Criterio 3
                '2024' // 🔍 Criterio 4 (año)
            ];
            for (const criterio of criteriosBusqueda) {
                await test_1.test.step(`🔎 Buscando: "${criterio}"`, async () => {
                    await reglasPage.searchInGrid(criterio);
                    await page.waitForTimeout(1000);
                    const count = await reglasPage.getGridRowCount();
                    console.log(`🔍 "${criterio}": ${count} resultados`);
                    // 📸 Evidencia por cada criterio
                    await (0, helpers_1.captureEvidence)(page, testInfo, `busqueda_${criterio}`);
                });
            }
        });
        console.log('✅ Test de búsqueda avanzada completado');
    });
});
//# sourceMappingURL=008_Buscar_Reglas.spec.js.map