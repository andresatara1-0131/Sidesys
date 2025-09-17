"use strict";
// 📁 pages/shared/iframe-handler.page.ts
// 🖼️ Manejador de iframes para módulos administrativos
Object.defineProperty(exports, "__esModule", { value: true });
exports.IframeHandler = void 0;
class IframeHandler {
    constructor(page) {
        this.page = page;
    } // 🏗️ Constructor con página
    /**
     * 🔍 Obtener locator de iframe por selector
     * @param selector - Selector del iframe
     * @returns FrameLocator del iframe
     */
    getFrameLocator(selector = 'iframe') {
        const frameLocator = this.page.frameLocator(selector); // 🎯 Obtener locator del iframe
        console.log(`✅ Frame locator obtenido para selector: ${selector}`); // 📝 Log de confirmación
        return frameLocator; // 📤 Devolver frame locator
    }
    /**
     * 🔍 Obtener iframe por nombre o URL (CORREGIDO)
     * @param nameOrUrl - Nombre o URL del iframe
     * @returns FrameLocator del iframe
     */
    async getFrameByNameOrUrl(nameOrUrl) {
        // 🎯 Esperar a que el iframe esté disponible
        await this.page.waitForSelector('iframe', { timeout: 10000 }); // ⏳ Timeout de 10 segundos
        // 🔍 Buscar frame por nombre o URL - LÓGICA CORREGIDA
        const frame = this.page.frame({ name: nameOrUrl }) ||
            this.page.frame({ url: new RegExp(nameOrUrl) }); // 🔍 Buscar por nombre o URL
        if (!frame) {
            throw new Error(`❌ Iframe no encontrado: ${nameOrUrl}`); // 🚫 Error si no se encuentra
        }
        console.log(`✅ Iframe encontrado: ${nameOrUrl}`); // 📝 Log de confirmación
        return this.page.frameLocator(`iframe[name="${nameOrUrl}"], iframe[src*="${nameOrUrl}"]`); // 📤 Devolver frame locator
    }
    /**
     * ⏳ Esperar a que iframe esté completamente cargado
     * @param frameLocator - Locator del iframe
     * @param timeout - Timeout en milisegundos
     */
    async waitForFrameLoad(frameLocator, timeout = 15000) {
        // 🎯 Esperar a que el body del iframe esté visible
        await frameLocator.locator('body').waitFor({
            state: 'visible',
            timeout
        });
        console.log('✅ Iframe completamente cargado'); // 📝 Log de confirmación
    }
    /**
     * 🔄 Ejecutar acción dentro del iframe
     * @param frameLocator - Locator del iframe
     * @param action - Función acción a ejecutar
     */
    async executeInFrame(frameLocator, action) {
        await this.waitForFrameLoad(frameLocator); // ⏳ Esperar carga del iframe
        const result = await action(frameLocator); // 🎯 Ejecutar acción
        console.log('✅ Acción ejecutada dentro del iframe'); // 📝 Log de confirmación
        return result; // 📤 Devolver resultado
    }
    /**
     * 📝 Llenar campo dentro del iframe
     * @param frameLocator - Locator del iframe
     * @param selector - Selector del campo
     * @param value - Valor a ingresar
     */
    async fillInFrame(frameLocator, selector, value) {
        await this.executeInFrame(frameLocator, async (frame) => {
            const field = frame.locator(selector); // 🔍 Localizar campo
            await field.fill(value); // 📝 Llenar campo
        });
        console.log(`✅ Campo ${selector} llenado con: ${value}`); // 📝 Log de confirmación
    }
    /**
     * 👆 Hacer clic en elemento dentro del iframe
     * @param frameLocator - Locator del iframe
     * @param selector - Selector del elemento
     */
    async clickInFrame(frameLocator, selector) {
        await this.executeInFrame(frameLocator, async (frame) => {
            const element = frame.locator(selector); // 🔍 Localizar elemento
            await element.click(); // 👆 Hacer clic
        });
        console.log(`✅ Clic en elemento: ${selector}`); // 📝 Log de confirmación
    }
    /**
     * 👀 Esperar elemento visible dentro del iframe
     * @param frameLocator - Locator del iframe
     * @param selector - Selector del elemento
     * @param timeout - Timeout en milisegundos
     */
    async waitForElementInFrame(frameLocator, selector, timeout = 10000) {
        await this.executeInFrame(frameLocator, async (frame) => {
            const element = frame.locator(selector); // 🔍 Localizar elemento
            await element.waitFor({ state: 'visible', timeout }); // 👀 Esperar visibilidad
        });
        console.log(`✅ Elemento visible en iframe: ${selector}`); // 📝 Log de confirmación
    }
}
exports.IframeHandler = IframeHandler;
//# sourceMappingURL=iframe-handler.page.js.map