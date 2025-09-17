"use strict";
// 📁 pages/suite/products.page.ts
// 📦 Page Object para la navegación de productos en Suite
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuiteProductsPage = void 0;
const test_1 = require("@playwright/test"); // 🧩 Importar Playwright
const popup_handler_page_1 = require("../shared/popup-handler.page"); // 🔗 Importar manejador de popups
class SuiteProductsPage {
    constructor(page) {
        this.page = page;
        this.popupHandler = new popup_handler_page_1.PopupHandler(page); // 🏗️ Inicializar manejador
    }
    /**
     * 📂 Abrir menú de productos
     */
    async openProductsMenu() {
        const productsLink = this.page.getByRole('link', { name: 'archive Productos' }); // 🔍 Localizar enlace
        await productsLink.click(); // 👆 Hacer clic
        await this.page.waitForTimeout(1000); // ⏳ Esperar animación
        console.log('✅ Menú de productos abierto'); // 📝 Log de confirmación
    }
    /**
     * 🔍 Buscar producto específico en la lista
     * @param productName - Nombre del producto a buscar
     */
    async findProduct(productName) {
        // 🔍 Localizar tabla de productos y buscar por texto
        const productTable = this.page.getByRole('table'); // 🎯 Tabla de productos
        const productRow = productTable.filter({ hasText: productName }); // 📋 Fila con el producto
        await (0, test_1.expect)(productRow).toBeVisible({ timeout: 10000 }); // ✅ Verificar visibilidad
        console.log(`✅ Producto encontrado: ${productName}`); // 📝 Log de confirmación
    }
    /**
     * 🚀 Abrir producto y manejar popup
     * @param productName - Nombre del producto a abrir
     * @returns URL del popup abierto
     */
    async openProduct(productName) {
        await this.openProductsMenu(); // 📂 Abrir menú de productos
        await this.findProduct(productName); // 🔍 Buscar producto
        // 🔍 Localizar botón "Ver" del producto específico
        const productTable = this.page.getByRole('table').filter({ hasText: productName }); // 🎯 Tabla del producto
        const viewButton = productTable.getByRole('button').nth(2); // 👁️ Botón "Ver" (tercer botón)
        // 🪟 Abrir popup y obtener URL
        const popupUrl = await this.popupHandler.clickAndGetPopupUrl(viewButton);
        console.log(`✅ Producto abierto: ${productName} - URL: ${popupUrl}`); // 📝 Log de confirmación
        return popupUrl; // 📤 Devolver URL del popup
    }
    /**
     * 📋 Abrir producto Citas específicamente
     * @returns URL de Citas
     */
    async openCitas() {
        const citasUrl = await this.openProduct(/Citas/i); // 🎯 Abrir Citas
        return citasUrl; // 📤 Devolver URL de Citas
    }
    /**
     * 🆔 Abrir producto IDC específicamente
     * @returns URL de IDC
     */
    async openIDC() {
        const idcUrl = await this.openProduct(/Identificacion de Cliente/i); // 🎯 Abrir IDC
        return idcUrl; // 📤 Devolver URL de IDC
    }
    /**
     * 📊 Verificar cantidad de productos visibles
     * @param expectedCount - Cantidad esperada de productos
     */
    async verifyProductsCount(expectedCount) {
        const productRows = this.page.locator('table tbody tr'); // 🔍 Filas de productos
        await (0, test_1.expect)(productRows).toHaveCount(expectedCount, { timeout: 5000 }); // ✅ Verificar conteo
        console.log(`✅ ${expectedCount} productos visibles en la lista`); // 📝 Log de confirmación
    }
    /**
     * 🔄 Navegar a URL de producto en la misma pestaña
     * @param productUrl - URL del producto a navegar
     */
    async navigateToProductUrl(productUrl) {
        await this.page.goto(productUrl, {
            waitUntil: 'networkidle' // ⏳ Esperar que la red esté inactiva
        });
        console.log(`✅ Navegado a URL de producto: ${productUrl}`); // 📝 Log de confirmación
    }
}
exports.SuiteProductsPage = SuiteProductsPage;
//# sourceMappingURL=products.page.js.map