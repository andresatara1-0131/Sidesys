"use strict";
// ?? tests/idc/reglas-identificacion/eliminar-regla.spec.ts
// ??? Test para eliminar reglas de identificaci��n
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test"); // ?? Importar Playwright
const login_page_1 = require("../../../pages/suite/login.page"); // ?? Page Object login Suite
const products_page_1 = require("../../../pages/suite/products.page"); // ?? Page Object productos
const reglas_identificacion_page_1 = require("../../../pages/idc/reglas-identificacion.page"); // ?? Page Object reglas IDC
const helpers_1 = require("../../../utils/helpers"); // ?? Utilidad para evidencias
test_1.test.describe('[IDC] Reglas de Identificaci��n - Eliminar Reglas', () => {
    (0, test_1.test)('003_Eliminar_Regla - Eliminar regla aleatoria', async ({ page }, testInfo) => {
        // ??? Inicializar Page Objects
        const loginPage = new login_page_1.SuiteLoginPage(page);
        const productsPage = new products_page_1.SuiteProductsPage(page);
        const reglasPage = new reglas_identificacion_page_1.IDCReglasIdentificacionPage(page);
        await test_1.test.step('?? Login y navegaci��n a IDC', async () => {
            await loginPage.login('admincitas@sidesys.com', 'E%4oCK!Hl'); // ???? Login
            const idcUrl = await productsPage.openIDC(); // ?? Abrir IDC
            await productsPage.navigateToProductUrl(idcUrl); // ?? Navegar a URL
            await reglasPage.navigateToReglasIdentificacion(); // ?? Navegar a reglas
            await (0, helpers_1.captureEvidence)(page, testInfo, 'modulo_reglas_cargado'); // ?? Evidencia
        });
        await test_1.test.step('?? Obtener reglas existentes', async () => {
            const rowCount = await reglasPage.getGridRowCount(); // ?? Contar reglas
            (0, test_1.expect)(rowCount).toBeGreaterThan(0); // ? Validar que hay reglas
            console.log(`?? ${rowCount} reglas encontradas`); // ?? Log de conteo
        });
        let indiceAleatorio; // ?? ��ndice de regla a eliminar
        let nombreRegla; // ?? Nombre de la regla
        await test_1.test.step('?? Seleccionar regla aleatoria para eliminar', async () => {
            indiceAleatorio = await reglasPage.selectRandomGridRow(); // ?? Seleccionar regla aleatoria
            nombreRegla = await reglasPage.getGridCellText(indiceAleatorio, 1); // ?? Obtener nombre
            console.log(`?? Regla seleccionada para eliminar: ${nombreRegla} (��ndice ${indiceAleatorio})`); // ?? Log de selecci��n
            await (0, helpers_1.captureEvidence)(page, testInfo, 'regla_seleccionada'); // ?? Evidencia
        });
        await test_1.test.step('??? Eliminar la regla seleccionada', async () => {
            await reglasPage.eliminarRegla(indiceAleatorio); // ??? Eliminar regla
            await (0, helpers_1.captureEvidence)(page, testInfo, 'regla_eliminada'); // ?? Evidencia
        });
        await test_1.test.step('? Validar que la regla fue eliminada', async () => {
            await reglasPage.searchInGrid(nombreRegla); // ?? Buscar regla eliminada
            const noExiste = await reglasPage.validarReglaNoExiste(nombreRegla); // ? Validar que no existe
            (0, test_1.expect)(noExiste).toBeTruthy(); // ? Asegurar que fue eliminada
            console.log(`? Regla eliminada validada: ${nombreRegla}`); // ?? Log de validaci��n
        });
        console.log('? Test de eliminaci��n de regla completado exitosamente'); // ?? Log final
    });
});
//# sourceMappingURL=003_Eliminar_Regla.spec.js.map