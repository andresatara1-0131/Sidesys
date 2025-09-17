"use strict";
// 📁 pages/citas/canal-web/welcome.page.ts
// 🌐 Page Object para Welcome Page del Canal Web de Citas
Object.defineProperty(exports, "__esModule", { value: true });
exports.CitasWelcomePage = void 0;
const navigation_page_1 = require("../../shared/navigation.page"); // 🧭 Manejador de navegación
class CitasWelcomePage {
    constructor(page) {
        this.page = page;
        this.navigationHandler = new navigation_page_1.NavigationHandler(page); // 🏗️ Inicializar navegación
    }
    /**
     * 🌐 Navegar a página welcome de CitasWeb
     */
    async navigate() {
        await this.navigationHandler.navigateTo('https://encuestas.sidesys.ar/CitasWeb/welcome', 'domcontentloaded'); // 🌐 Navegar a welcome
        console.log('✅ Navegado a página welcome de CitasWeb'); // 📝 Log de confirmación
    }
    /**
     * ✅ Manejar popups iniciales (Aceptar, Continuar)
     */
    async handleInitialPopups() {
        // 🔍 Buscar botones de popups
        const btnAceptar = this.page.getByRole('button', { name: /Aceptar/i }); // ✅ Botón Aceptar
        const btnContinuar = this.page.getByRole('button', { name: /Continuar/i }); // 🔄 Botón Continuar
        // 👆 Hacer clic en botones si están visibles
        if (await btnAceptar.isVisible({ timeout: 3000 })) {
            await btnAceptar.click(); // ✅ Clic en Aceptar
            await this.page.waitForTimeout(300); // ⏳ Esperar breve
            console.log('✅ Popup Aceptar manejado'); // 📝 Log de confirmación
        }
        if (await btnContinuar.isVisible({ timeout: 3000 })) {
            await btnContinuar.click(); // 🔄 Clic en Continuar
            await this.page.waitForTimeout(400); // ⏳ Esperar breve
            console.log('✅ Popup Continuar manejado'); // 📝 Log de confirmación
        }
    }
    /**
     * 📝 Seleccionar tipo de documento
     * @param documentType - Tipo de documento (DNI, Pasaporte, etc.)
     */
    async selectDocumentType(documentType) {
        const tipoDoc = this.page.getByRole('combobox', { name: /Tipo de documento/i }); // 🔍 Combobox tipo doc
        await tipoDoc.waitFor({ state: 'visible', timeout: 15000 }); // 👀 Esperar visibilidad
        await tipoDoc.click(); // 👆 Hacer clic
        const option = this.page.getByText(documentType); // 🔍 Opción específica
        await option.click(); // 👆 Seleccionar opción
        console.log(`✅ Tipo de documento seleccionado: ${documentType}`); // 📝 Log de confirmación
    }
    /**
     * 🔢 Ingresar número de documento
     * @param documentNumber - Número de documento
     */
    async enterDocumentNumber(documentNumber) {
        const docField = this.page.getByRole('textbox', { name: /Numero de documento/i }); // 🔍 Campo número doc
        await docField.fill(documentNumber, { delay: 60 }); // 📝 Llenar con delay
        console.log(`✅ Número de documento ingresado: ${documentNumber}`); // 📝 Log de confirmación
    }
    /**
     * 🚪 Hacer clic en botón Ingresar
     */
    async clickIngresar() {
        const ingresarBtn = this.page.getByRole('button', { name: /Ingresar/i }); // 🔍 Botón Ingresar
        await ingresarBtn.click(); // 👆 Hacer clic
        await this.page.waitForLoadState('networkidle'); // 🌐 Esperar red
        console.log('✅ Clic en botón Ingresar'); // 📝 Log de confirmación
    }
    /**
     * 🔐 Login completo con DNI
     * @param documentNumber - Número de documento
     */
    async loginWithDNI(documentNumber) {
        await this.selectDocumentType('DNI'); // 📝 Seleccionar DNI
        await this.enterDocumentNumber(documentNumber); // 🔢 Ingresar número
        await this.clickIngresar(); // 🚪 Hacer clic en Ingresar
        console.log(`✅ Login con DNI completado: ${documentNumber}`); // 📝 Log de confirmación
    }
    /**
     * ➕ Hacer clic en botón Agregar Cita
     */
    async clickAgregarCita() {
        const agregarBtn = this.page.getByRole('button').filter({ hasText: 'add' }); // 🔍 Botón agregar
        await agregarBtn.click(); // 👆 Hacer clic
        await this.page.waitForTimeout(200); // ⏳ Esperar breve
        console.log('✅ Clic en botón Agregar Cita'); // 📝 Log de confirmación
    }
    /**
     * 👤 Seleccionar tipo de cita personal
     */
    async selectCitaPersonal() {
        const citaPersonal = this.page.getByRole('menuitem', { name: /Cita Personal/i }); // 🔍 Opción cita personal
        await citaPersonal.click(); // 👆 Hacer clic
        await this.page.waitForTimeout(300); // ⏳ Esperar breve
        console.log('✅ Cita Personal seleccionada'); // 📝 Log de confirmación
    }
    /**
     * 🌐 Flujo completo de inicio de creación de cita
     */
    async startCreateCitaFlow() {
        await this.clickAgregarCita(); // ➕ Clic en Agregar
        await this.selectCitaPersonal(); // 👤 Seleccionar cita personal
        console.log('✅ Flujo de creación de cita iniciado'); // 📝 Log de confirmación
    }
}
exports.CitasWelcomePage = CitasWelcomePage;
//# sourceMappingURL=welcome.page.js.map