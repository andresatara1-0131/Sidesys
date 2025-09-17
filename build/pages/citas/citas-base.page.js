"use strict";
// 📁 pages/citas/citas-base.page.ts
// 🏗️ Page Object base para todos los módulos de Citas
Object.defineProperty(exports, "__esModule", { value: true });
exports.CitasBasePage = void 0;
const navigation_page_1 = require("../shared/navigation.page"); // 🧭 Manejador de navegación
const iframe_handler_page_1 = require("../shared/iframe-handler.page"); // 🖼️ Manejador de iframes
class CitasBasePage {
    constructor(page) {
        this.page = page;
        this.navigationHandler = new navigation_page_1.NavigationHandler(page); // 🏗️ Inicializar navegación
        this.iframeHandler = new iframe_handler_page_1.IframeHandler(page); // 🏗️ Inicializar iframes
    }
    /**
     * ⏳ Esperar carga completa de módulo de Citas
     */
    async waitForCitasModuleLoad() {
        await this.page.waitForURL('**/CitasBO/pages', { timeout: 30000 }); // ⏳ Esperar URL de Citas
        await this.page.waitForLoadState('networkidle'); // 🌐 Esperar red inactiva
        await this.page.waitForTimeout(2000); // ⏱️ Espera adicional
        console.log('✅ Módulo de Citas cargado completamente'); // 📝 Log de confirmación
    }
    /**
     * 📋 Navegar a sección específica dentro de Citas
     * @param sectionName - Nombre de la sección
     */
    async navigateToSection(sectionName) {
        const sectionLink = this.page.getByRole('link', { name: sectionName }); // 🔍 Enlace de sección
        await sectionLink.click(); // 👆 Hacer clic
        await this.page.waitForTimeout(1000); // ⏳ Esperar navegación
        console.log(`✅ Navegado a sección: ${sectionName}`); // 📝 Log de confirmación
    }
    /**
     * 🔍 Buscar en tabla de resultados
     * @param searchText - Texto a buscar
     */
    async searchInTable(searchText) {
        const searchBox = this.page.getByRole('searchbox', { name: /Buscar/i }); // 🔍 Campo de búsqueda
        await searchBox.fill(''); // 🧹 Limpiar campo
        await searchBox.fill(searchText); // 📝 Llenar con texto
        await this.page.waitForTimeout(1500); // ⏳ Esperar resultados
        console.log(`✅ Búsqueda realizada: ${searchText}`); // 📝 Log de confirmación
    }
    /**
     * 📊 Obtener número de resultados en tabla
     * @returns Número de filas en tabla
     */
    async getTableRowCount() {
        const rows = this.page.locator('table tbody tr'); // 📋 Filas de tabla
        const count = await rows.count(); // 🔢 Contar filas
        console.log(`✅ ${count} filas encontradas en tabla`); // 📝 Log de confirmación
        return count; // 📤 Devolver conteo
    }
    /**
     * 🎲 Seleccionar fila aleatoria de tabla
     * @returns Índice de fila seleccionada
     */
    async selectRandomTableRow() {
        const rowCount = await this.getTableRowCount(); // 🔢 Obtener conteo
        if (rowCount === 0) {
            throw new Error('❌ No hay filas en la tabla para seleccionar'); // 🚫 Error si no hay filas
        }
        const randomIndex = Math.floor(Math.random() * rowCount); // 🎲 Índice aleatorio
        console.log(`✅ Fila aleatoria seleccionada: índice ${randomIndex}`); // 📝 Log de confirmación
        return randomIndex; // 📤 Devolver índice
    }
    /**
     * 📝 Obtener texto de celda específica
     * @param rowIndex - Índice de fila
     * @param columnIndex - Índice de columna
     * @returns Texto de la celda
     */
    async getCellText(rowIndex, columnIndex) {
        const cell = this.page.locator(`table tbody tr:nth-child(${rowIndex + 1}) td:nth-child(${columnIndex + 1})`); // 🔍 Celda específica
        const text = await cell.textContent(); // 📝 Obtener texto
        console.log(`✅ Texto de celda [${rowIndex},${columnIndex}]: ${text}`); // 📝 Log de confirmación
        return text || ''; // 📤 Devolver texto
    }
    /**
     * 💾 Hacer clic en botón de acción (Guardar, Cancelar, etc.)
     * @param buttonName - Nombre del botón
     */
    async clickActionButton(buttonName) {
        const button = this.page.getByRole('button', { name: buttonName }); // 🔍 Botón de acción
        await button.click(); // 👆 Hacer clic
        await this.page.waitForTimeout(1000); // ⏳ Esperar acción
        console.log(`✅ Clic en botón: ${buttonName}`); // 📝 Log de confirmación
    }
    /**
     * ✅ Validar mensaje de éxito
     * @param expectedMessage - Mensaje esperado
     */
    async validateSuccessMessage(expectedMessage) {
        const messageElement = this.page.locator('text=/éxito|correctamente|guardado/i'); // 🔍 Elemento de mensaje
        await messageElement.waitFor({ state: 'visible', timeout: 10000 }); // 👀 Esperar visibilidad
        const actualMessage = await messageElement.textContent(); // 📝 Obtener texto
        if (actualMessage && !actualMessage.includes(expectedMessage)) {
            throw new Error(`❌ Mensaje de éxito no coincide. Esperado: ${expectedMessage}, Actual: ${actualMessage}`); // 🚫 Error si no coincide
        }
        console.log(`✅ Mensaje de éxito validado: ${expectedMessage}`); // 📝 Log de confirmación
    }
}
exports.CitasBasePage = CitasBasePage;
//# sourceMappingURL=citas-base.page.js.map