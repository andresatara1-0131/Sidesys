"use strict";
// 📁 tests/citas/administracion/sucursales/crear-sucursal.spec.ts
// 🏢 Test para creación de sucursal aleatoria
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test"); // 🧩 Importar Playwright
const login_page_1 = require("../../../../pages/suite/login.page"); // 📄 Page Object login Suite
const products_page_1 = require("../../../../pages/suite/products.page"); // 📄 Page Object productos
const sucursales_page_1 = require("../../../../pages/citas/administracion/sucursales.page"); // 📄 Page Object sucursales
const utils_1 = require("../../../../data/utils"); // 🎲 Utilidades de datos
test_1.test.describe('Sucursales - Crear sucursal aleatoria', () => {
    (0, test_1.test)('Alta dinámica de sucursal', async ({ page }) => {
        // 🏗️ Inicializar Page Objects
        const loginPage = new login_page_1.SuiteLoginPage(page);
        const productsPage = new products_page_1.SuiteProductsPage(page);
        const sucursalesPage = new sucursales_page_1.CitasSucursalesPage(page);
        await test_1.test.step('🔐 Login en Suite', async () => {
            await loginPage.login('admincitas@sidesys.com', 'E%4oCK!Hl'); // 📧🔒 Login
        });
        await test_1.test.step('📦 Navegar a módulo de Sucursales', async () => {
            const citasUrl = await productsPage.openCitas(); // 🎯 Abrir Citas
            await productsPage.navigateToProductUrl(citasUrl); // 🌐 Navegar a URL
            await sucursalesPage.navigateToMantenimiento(); // 🏢 Navegar a mantenimiento
        });
        let creado = false;
        let intentos = 0;
        const maxIntentos = 3; // 🔁 Máximo de intentos
        await test_1.test.step('🔄 Intentar crear sucursal (máximo 3 intentos)', async () => {
            while (!creado && intentos < maxIntentos) {
                try {
                    // 🎲 Generar datos aleatorios
                    const { nombre, alias, lat, long } = (0, utils_1.getRandomItem)(utils_1.paises); // 🌍 País aleatorio
                    const codigo = (0, utils_1.getRandomCodigo)(); // 🔢 Código aleatorio
                    const horaApertura = (0, utils_1.getRandomHora)(); // 🕐 Hora apertura
                    const horaCierre = (0, utils_1.getRandomHora)(Number(horaApertura) + 1, 22); // 🕘 Hora cierre
                    const sucursalData = { nombre, alias, lat, long, codigo }; // 📊 Datos de sucursal
                    await test_1.test.step(`🏢 Intentando crear sucursal: ${nombre} (Intento ${intentos + 1})`, async () => {
                        // 🏗️ Crear sucursal
                        creado = await sucursalesPage.crearSucursalCompleta(sucursalData, horaApertura, horaCierre);
                        if (creado) {
                            console.log(`✅ Sucursal creada con éxito: ${nombre}`); // 📝 Log éxito
                        }
                        else {
                            console.warn(`⚠️ Intento ${intentos + 1} fallido, reintentando...`); // ⚠️ Log fallo
                            intentos++;
                            await page.waitForTimeout(1000); // ⏳ Esperar entre intentos
                        }
                    });
                }
                catch (error) {
                    console.error(`❌ Error en intento ${intentos + 1}: ${error}`); // ❌ Log error
                    intentos++;
                    await page.waitForTimeout(1000); // ⏳ Esperar entre intentos
                }
            }
        });
        await test_1.test.step('✅ Validar que se creó la sucursal', async () => {
            (0, test_1.expect)(creado).toBeTruthy(); // ✅ Validar creación exitosa
            console.log('✅ Validación de creación de sucursal exitosa'); // 📝 Log validación
        });
        console.log('✅ Test de creación de sucursal completado exitosamente'); // 📝 Log final
    });
});
//# sourceMappingURL=crear-sucursal.spec.js.map