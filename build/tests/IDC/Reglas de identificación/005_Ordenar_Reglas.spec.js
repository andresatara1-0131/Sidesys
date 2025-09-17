"use strict";
// ?? tests/idc/reglas-identificacion/ordenar-reglas.spec.ts
// ???? Test para ordenar reglas
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test"); // ?? Importar Playwright
const login_page_1 = require("../../../pages/suite/login.page"); // ?? Page Object login Suite
const products_page_1 = require("../../../pages/suite/products.page"); // ?? Page Object productos
const reglas_identificacion_page_1 = require("../../../pages/idc/reglas-identificacion.page"); // ?? Page Object reglas IDC
const helpers_1 = require("../../../utils/helpers"); // ?? Utilidad para evidencias
test_1.test.describe('[IDC] Reglas de Identificaci��n - Ordenar Reglas', () => {
    (0, test_1.test)('005_Ordenar_Reglas - Mover reglas aleatoriamente', async ({ page }, testInfo) => {
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
        await test_1.test.step('?? Validar que hay suficientes reglas', async () => {
            const rowCount = await reglasPage.getGridRowCount(); // ?? Contar reglas
            (0, test_1.expect)(rowCount).toBeGreaterThan(3); // ? Validar que hay al menos 4 reglas
            console.log(`?? ${rowCount} reglas encontradas - suficientes para ordenamiento`); // ?? Log de conteo
        });
        const indicesUsados = new Set(); // ?? ��ndices ya usados
        const movimientos = []; // ?? Registro de movimientos
        await test_1.test.step('?? Mover 3 reglas aleatoriamente', async () => {
            for (let i = 0; i < 3; i++) {
                await test_1.test.step(`?? Movimiento ${i + 1}/3`, async () => {
                    // ?? Seleccionar regla aleatoria no usada
                    let indice;
                    do {
                        indice = await reglasPage.selectRandomGridRow(); // ?? Seleccionar aleatorio
                    } while (indicesUsados.has(indice));
                    indicesUsados.add(indice);
                    const descripcion = await reglasPage.getGridCellText(indice, 1); // ?? Obtener descripci��n
                    console.log(`?? Regla ${i + 1}: "${descripcion}" (posici��n ${indice})`); // ?? Log de regla
                    // ?? Determinar direcci��n del movimiento
                    const esPrimera = indice === 0; // ?? Si es primera fila
                    const esUltima = indice === (await reglasPage.getGridRowCount()) - 1; // ?? Si es ��ltima fila
                    let direccion = Math.random() < 0.5 ? 'up' : 'down'; // ?? Direcci��n aleatoria
                    // ?? Ajustar direcci��n seg��n posici��n
                    if (esPrimera)
                        direccion = 'down'; // ?? Si es primera, solo puede bajar
                    if (esUltima)
                        direccion = 'up'; // ?? Si es ��ltima, solo puede subir
                    // ?? Mover la regla
                    await reglasPage.moverRegla(indice, direccion); // ???? Mover regla
                    movimientos.push(`Regla "${descripcion}" ${direccion === 'up' ? '??' : '??'}`); // ?? Registrar movimiento
                    await page.waitForTimeout(1000); // ? Esperar entre movimientos
                });
            }
        });
        await test_1.test.step('?? Capturar evidencia final del ordenamiento', async () => {
            await (0, helpers_1.captureEvidence)(page, testInfo, 'reglas_ordenadas'); // ?? Evidencia final
        });
        console.log('? Test de ordenamiento de reglas completado exitosamente'); // ?? Log final
        console.log(`?? Movimientos realizados: ${movimientos.join(', ')}`); // ?? Log de movimientos
    });
});
//# sourceMappingURL=005_Ordenar_Reglas.spec.js.map