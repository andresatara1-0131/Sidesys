"use strict";
// ?? tests/idc/reglas-identificacion/editar-regla.spec.ts
// ?? Test para editar reglas de identificaci��n
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test"); // ?? Importar Playwright
const login_page_1 = require("../../../pages/suite/login.page"); // ?? Page Object login Suite
const products_page_1 = require("../../../pages/suite/products.page"); // ?? Page Object productos
const reglas_identificacion_page_1 = require("../../../pages/idc/reglas-identificacion.page"); // ?? Page Object reglas IDC
const helpers_1 = require("../../../utils/helpers"); // ?? Utilidad para evidencias
const idc_1 = require("../../../data/idc"); // ?? Generador de descripciones
test_1.test.describe('[IDC] Reglas de Identificaci��n - Editar Reglas', () => {
    (0, test_1.test)('002_Editar_Regla - Editar regla aleatoria', async ({ page }, testInfo) => {
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
        let indiceAleatorio; // ?? ��ndice de regla a editar
        let descripcionOriginal; // ?? Descripci��n original
        let nuevaDescripcion; // ?? Nueva descripci��n
        await test_1.test.step('?? Seleccionar regla aleatoria para editar', async () => {
            indiceAleatorio = await reglasPage.selectRandomGridRow(); // ?? Seleccionar regla aleatoria
            descripcionOriginal = await reglasPage.getGridCellText(indiceAleatorio, 1); // ?? Obtener descripci��n
            console.log(`?? Regla seleccionada: ${descripcionOriginal} (��ndice ${indiceAleatorio})`); // ?? Log de selecci��n
        });
        await test_1.test.step('?? Editar descripci��n de la regla', async () => {
            nuevaDescripcion = (0, idc_1.generarDescripcionEditada)(); // ?? Generar nueva descripci��n
            await reglasPage.editarRegla(indiceAleatorio, nuevaDescripcion); // ?? Editar regla
            await (0, helpers_1.captureEvidence)(page, testInfo, 'regla_editada'); // ?? Evidencia
        });
        await test_1.test.step('? Validar que la edici��n fue exitosa', async () => {
            await reglasPage.searchInGrid(nuevaDescripcion); // ?? Buscar nueva descripci��n
            const existe = await reglasPage.validarReglaExiste(nuevaDescripcion); // ? Validar existencia
            (0, test_1.expect)(existe).toBeTruthy(); // ? Asegurar que existe
            console.log(`? Edici��n validada: ${nuevaDescripcion}`); // ?? Log de validaci��n
        });
        await test_1.test.step('?? Validar que la descripci��n original ya no existe', async () => {
            await reglasPage.searchInGrid(descripcionOriginal); // ?? Buscar descripci��n original
            const noExiste = await reglasPage.validarReglaNoExiste(descripcionOriginal); // ? Validar que no existe
            (0, test_1.expect)(noExiste).toBeTruthy(); // ? Asegurar que no existe
            console.log(`? Validado que descripci��n original fue cambiada`); // ?? Log de validaci��n
        });
        console.log('? Test de edici��n de regla completado exitosamente'); // ?? Log final
        console.log(`?? Cambio: "${descripcionOriginal}" �� "${nuevaDescripcion}"`); // ?? Log de cambio
    });
});
//# sourceMappingURL=002_Editar_Regla.spec.js.map