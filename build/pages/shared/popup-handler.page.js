"use strict";
// 📁 pages/shared/popup-handler.page.ts
// 🪟 Manejador de ventanas emergentes (popups)
Object.defineProperty(exports, "__esModule", { value: true });
exports.PopupHandler = void 0;
class PopupHandler {
    constructor(page) {
        this.page = page;
    } // 🏗️ Constructor con página
    /**
     * 👆 Hacer clic en elemento y esperar popup
     * @param element - Elemento a hacer clic
     * @returns Instancia de la página del popup
     */
    async clickAndWaitForPopup(element) {
        const [popup] = await Promise.all([
            this.page.waitForEvent('popup'), // 🎯 Esperar evento de popup
            element.click() // 👆 Hacer clic en el elemento
        ]);
        console.log('✅ Popup detectado y capturado'); // 📝 Log de confirmación
        return popup; // 📤 Devolver página del popup
    }
    /**
     * 👆 Hacer clic y obtener URL del popup
     * @param element - Elemento a hacer clic
     * @returns URL del popup
     */
    async clickAndGetPopupUrl(element) {
        const popup = await this.clickAndWaitForPopup(element); // 🪟 Obtener popup
        const popupUrl = popup.url(); // 🔗 Obtener URL del popup
        await popup.close(); // ❌ Cerrar popup (lo manejamos en pestaña principal)
        console.log(`✅ URL de popup obtenida: ${popupUrl}`); // 📝 Log de confirmación
        return popupUrl; // 📤 Devolver URL
    }
    /**
     * 🔄 Cambiar a pestaña de popup
     * @param popup - Página del popup
     */
    async switchToPopup(popup) {
        // 🎯 Esperar a que el popup esté completamente cargado
        await popup.waitForLoadState('domcontentloaded');
        console.log('✅ Cambiado a pestaña de popup'); // 📝 Log de confirmación
    }
    /**
     * 🔙 Cambiar de vuelta a pestaña principal
     */
    async switchToMainTab() {
        // 📌 La pestaña principal es la primera en el contexto
        const pages = this.page.context().pages(); // 📋 Obtener todas las pestañas
        await pages[0].bringToFront(); // 🎯 Traer primera pestaña al frente
        console.log('✅ Cambiado a pestaña principal'); // 📝 Log de confirmación
    }
    /**
     * 🎯 Esperar y validar URL específica en popup
     * @param popup - Página del popup
     * @param urlPattern - Patrón de URL a validar
     * @param timeout - Timeout en milisegundos
     */
    async waitForPopupUrl(popup, urlPattern, timeout = 30000) {
        await popup.waitForURL(urlPattern, { timeout }); // ⏳ Esperar URL específica
        console.log(`✅ Popup cargado con URL que coincide con: ${urlPattern}`); // 📝 Log de confirmación
    }
    /**
     * ❌ Cerrar popup específico
     * @param popup - Página del popup a cerrar
     */
    async closePopup(popup) {
        await popup.close(); // ❌ Cerrar pestaña
        await this.switchToMainTab(); // 🔙 Volver a pestaña principal
        console.log('✅ Popup cerrado y vuelto a pestaña principal'); // 📝 Log de confirmación
    }
    /**
     * 🔢 Obtener cantidad de pestañas abiertas
     * @returns Número de pestañas
     */
    async getOpenTabsCount() {
        const pages = this.page.context().pages(); // 📋 Obtener todas las pestañas
        return pages.length; // 🔢 Devolver cantidad
    }
}
exports.PopupHandler = PopupHandler;
//# sourceMappingURL=popup-handler.page.js.map