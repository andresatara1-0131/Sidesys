"use strict";
// 📁 tests/citas/canal-web/crear-cita.spec.ts
// 🧪 Test COMPLETO para crear una cita en Canal Web
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test"); // 🧩 Importar Playwright
const welcome_page_1 = require("../../../pages/citas/canal-web/welcome.page"); // 📄 Page Object welcome
const selection_page_1 = require("../../../pages/citas/canal-web/selection.page"); // 📄 Page Object selection
const calendar_page_1 = require("../../../pages/citas/canal-web/calendar.page"); // 📄 Page Object calendar
const confirmation_page_1 = require("../../../pages/citas/canal-web/confirmation.page"); // 📄 Page Object confirmation
const helpers_1 = require("../../../utils/helpers"); // 📸 Utilidad para evidencias
const citas_1 = require("../../../data/citas"); // 🎲 Datos aleatorios
const citas_hooks_1 = require("../../../tests/hooks/citas-hooks"); // 🎯 Hooks específicos
// 🎯 Configurar hooks y timeouts
citas_hooks_1.citasHooks.configureTimeouts(); // ⏱️ Configurar timeouts
test_1.test.describe('CitasWeb - Crear Cita', () => {
    // 🎯 Usar hook antes de cada test
    citas_hooks_1.citasHooks.beforeEachHook();
    (0, test_1.test)('Crear cita seleccionando fecha y hora disponible', async ({ page }, testInfo) => {
        // 🏗️ Inicializar Page Objects
        const welcomePage = new welcome_page_1.CitasWelcomePage(page);
        const selectionPage = new selection_page_1.CitasSelectionPage(page);
        const calendarPage = new calendar_page_1.CitasCalendarPage(page);
        const confirmationPage = new confirmation_page_1.CitasConfirmationPage(page);
        test_1.test.setTimeout(240000); // ⏱️ Timeout extendido para flujo completo
        await test_1.test.step('🌐 Navegar a CitasWeb y manejar popups', async () => {
            await welcomePage.navigate(); // 🌐 Navegar a welcome
            await welcomePage.handleInitialPopups(); // ✅ Manejar popups iniciales
            await (0, helpers_1.captureEvidence)(page, testInfo, 'pagina_welcome'); // 📸 Evidencia
        });
        await test_1.test.step('🔐 Login con DNI', async () => {
            await welcomePage.loginWithDNI('10026917'); // 🔐 Login con DNI
            await (0, helpers_1.captureEvidence)(page, testInfo, 'login_exitoso'); // 📸 Evidencia
        });
        await test_1.test.step('🚀 Iniciar flujo de creación de cita', async () => {
            await welcomePage.startCreateCitaFlow(); // 🚀 Iniciar creación
            await (0, helpers_1.captureEvidence)(page, testInfo, 'inicio_creacion'); // 📸 Evidencia
        });
        await test_1.test.step('🎯 Seleccionar servicio y sucursal aleatorios', async () => {
            const randomService = (0, citas_1.getRandomService)(); // 🎲 Servicio aleatorio
            const randomBranch = (0, citas_1.getRandomBranch)(); // 🎲 Sucursal aleatoria
            await selectionPage.completeSelectionFlow(randomService, randomBranch); // 🎯 Flujo completo
            await (0, helpers_1.captureEvidence)(page, testInfo, 'seleccion_completada'); // 📸 Evidencia
        });
        await test_1.test.step('📅 Seleccionar fecha y hora disponibles', async () => {
            await calendarPage.selectAvailableDateAndTime(); // 📅⏰ Seleccionar fecha/hora
            await (0, helpers_1.captureEvidence)(page, testInfo, 'fecha_hora_seleccionadas'); // 📸 Evidencia
        });
        await test_1.test.step('✅ Confirmar y finalizar la cita', async () => {
            await confirmationPage.completeConfirmationFlow(); // ✅ Flujo confirmación
            await (0, helpers_1.captureEvidence)(page, testInfo, 'cita_confirmada'); // 📸 Evidencia
        });
        await test_1.test.step('🎉 Validar que la cita fue creada exitosamente', async () => {
            await confirmationPage.validateSuccessMessage(); // 🎉 Validar éxito
            const detalles = await confirmationPage.getAppointmentDetails(); // 📋 Obtener detalles
            (0, test_1.expect)(detalles.fecha).not.toBe(''); // ✅ Validar fecha
            (0, test_1.expect)(detalles.hora).not.toBe(''); // ✅ Validar hora
            (0, test_1.expect)(detalles.servicio).not.toBe(''); // ✅ Validar servicio
            (0, test_1.expect)(detalles.sucursal).not.toBe(''); // ✅ Validar sucursal
        });
        console.log('✅ Test de creación de cita COMPLETADO exitosamente'); // 📝 Log final
    });
    // 🎯 Usar hook después de cada test
    citas_hooks_1.citasHooks.afterEachHook();
});
//# sourceMappingURL=TestCase_001_Crear_Cita.spec.js.map