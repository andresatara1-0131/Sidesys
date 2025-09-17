"use strict";
// 📁 tests/idc/reglas-identificacion/validacion-paginado.spec.ts
// 📄 Test para validación de paginado
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test"); // 🧩 Importar Playwright
const login_page_1 = require("../../../pages/suite/login.page"); // 📄 Page Object login Suite
const products_page_1 = require("../../../pages/suite/products.page"); // 📄 Page Object productos
const reglas_identificacion_page_1 = require("../../../pages/idc/reglas-identificacion.page"); // 📄 Page Object reglas IDC
const helpers_1 = require("../../../utils/helpers"); // 📸 Utilidad para evidencias
test_1.test.describe('[IDC] Reglas de Identificación - Validación de Paginado', () => {
    (0, test_1.test)('007_Validacion_Paginado - Validar navegación entre páginas', async ({ page }, testInfo) => {
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
        await test_1.test.step('📊 Validar que existe texto de paginación', async () => {
            const paginacionText = page.locator('text=Mostrando'); // 🔍 Texto de paginación
            await (0, test_1.expect)(paginacionText).toBeVisible({ timeout: 5000 }); // ✅ Validar visibilidad
            console.log('✅ Texto de paginación visible'); // 📝 Log de validación
        });
        const textosVistos = []; // 📋 Textos de paginación vistos
        await test_1.test.step('➡️ Navegar hacia adelante hasta el final', async () => {
            console.log('➡️ Moviéndose hacia adelante'); // 📝 Log de dirección
            while (true) {
                const botonSiguiente = page.locator('#resultTable').getByText('keyboard_arrow_right'); // 🔼 Botón siguiente
                if (!(await botonSiguiente.isVisible({ timeout: 2000 }))) {
                    console.log('✅ No hay botón siguiente visible - última página alcanzada'); // 📝 Log de fin
                    break; // 🛑 Salir del loop
                }
                await botonSiguiente.click({ timeout: 3000 }); // 👆 Clic en siguiente
                await page.waitForTimeout(1000); // ⏳ Esperar carga
                const textoPaginacion = await page.locator('text=Mostrando').textContent() || ''; // 📝 Obtener texto
                textosVistos.push(textoPaginacion); // 📋 Agregar a lista
                console.log(`📄 Página: ${textoPaginacion}`); // 📝 Log de página
            }
        });
        await test_1.test.step('⬅️ Navegar hacia atrás hasta el inicio', async () => {
            console.log('⬅️ Moviéndose hacia atrás'); // 📝 Log de dirección
            while (textosVistos.length > 1) {
                const botonAnterior = page.locator('#resultTable').getByText('keyboard_arrow_left'); // 🔽 Botón anterior
                if (!(await botonAnterior.isVisible({ timeout: 2000 }))) {
                    console.log('✅ No hay botón anterior visible - primera página alcanzada'); // 📝 Log de inicio
                    break; // 🛑 Salir del loop
                }
                await botonAnterior.click({ timeout: 3000 }); // 👆 Clic en anterior
                await page.waitForTimeout(1000); // ⏳ Esperar carga
                const textoPaginacion = await page.locator('text=Mostrando').textContent() || ''; // 📝 Obtener texto
                console.log(`📄 Página: ${textoPaginacion}`); // 📝 Log de página
            }
        });
        await test_1.test.step('📸 Capturar evidencia de paginación intermedia', async () => {
            if (textosVistos.length >= 3) {
                await (0, helpers_1.captureEvidence)(page, testInfo, 'paginado_intermedio'); // 📸 Evidencia
                console.log('📸 Evidencia de paginación intermedia capturada'); // 📝 Log de evidencia
            }
        });
        console.log('✅ Test de validación de paginado completado exitosamente'); // 📝 Log final
        console.log(`📋 ${textosVistos.length} páginas navegadas`); // 📝 Log de páginas
    });
});
//# sourceMappingURL=007_Validacion_Paginado.spec.js.map