"use strict";
// 📁 tests/idc/reglas-identificacion/crear-regla.spec.ts
// 🆕 Test para crear reglas de identificación
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test"); // 🧩 Importar Playwright
const login_page_1 = require("../../../pages/suite/login.page"); // 📄 Page Object login Suite
const products_page_1 = require("../../../pages/suite/products.page"); // 📄 Page Object productos
const reglas_identificacion_page_1 = require("../../../pages/idc/reglas-identificacion.page"); // 📄 Page Object reglas IDC
const helpers_1 = require("../../../utils/helpers"); // 📸 Utilidad para evidencias
const idc_1 = require("../../../data/idc"); // 🎲 Generador de descripciones
test_1.test.describe('[IDC] Reglas de Identificación - Crear Reglas', () => {
    (0, test_1.test)('001_Crear_Regla - Crear 10 reglas aleatorias', async ({ page }, testInfo) => {
        // 🏗️ Inicializar Page Objects
        const loginPage = new login_page_1.SuiteLoginPage(page);
        const productsPage = new products_page_1.SuiteProductsPage(page);
        const reglasPage = new reglas_identificacion_page_1.IDCReglasIdentificacionPage(page);
        test_1.test.setTimeout(120000); // ⏱️ Timeout extendido para 10 reglas
        await test_1.test.step('🔐 Login y navegación a IDC', async () => {
            await loginPage.login('admincitas@sidesys.com', 'E%4oCK!Hl'); // 📧🔒 Login
            const idcUrl = await productsPage.openIDC(); // 🎯 Abrir IDC
            await productsPage.navigateToProductUrl(idcUrl); // 🌐 Navegar a URL
            await reglasPage.navigateToReglasIdentificacion(); // 📋 Navegar a reglas
        });
        const descripcionesCreadas = []; // 📋 Lista de reglas creadas
        await test_1.test.step('🔄 Crear 10 reglas aleatorias', async () => {
            for (let i = 0; i < 10; i++) {
                await test_1.test.step(`📝 Creando regla ${i + 1}/10`, async () => {
                    const descripcion = (0, idc_1.generarDescripcionAleatoria)(); // 🎲 Descripción aleatoria
                    await reglasPage.crearNuevaRegla(descripcion); // 🆕 Crear regla
                    descripcionesCreadas.push(descripcion); // 📋 Agregar a lista
                    await page.waitForTimeout(1000); // ⏳ Esperar entre reglas
                });
            }
        });
        await test_1.test.step('✅ Validar que las reglas fueron creadas', async () => {
            for (const descripcion of descripcionesCreadas) {
                const existe = await reglasPage.validarReglaExiste(descripcion); // 🔍 Validar existencia
                (0, test_1.expect)(existe).toBeTruthy(); // ✅ Asegurar que existe
                console.log(`✅ Regla validada: ${descripcion}`); // 📝 Log de validación
            }
        });
        await test_1.test.step('📸 Capturar evidencia final', async () => {
            await (0, helpers_1.captureEvidence)(page, testInfo, '10_reglas_creadas'); // 📸 Evidencia final
        });
        console.log('✅ Test de creación de 10 reglas completado exitosamente'); // 📝 Log final
        console.log(`📋 Reglas creadas: ${descripcionesCreadas.join(', ')}`); // 📝 Lista de reglas
    });
});
//# sourceMappingURL=001_Crear_Regla.spec.js.map