import { Page, FrameLocator } from '@playwright/test';
export declare class IframeHandler {
    private page;
    constructor(page: Page);
    /**
     * 🔍 Obtener locator de iframe por selector
     * @param selector - Selector del iframe
     * @returns FrameLocator del iframe
     */
    getFrameLocator(selector?: string): FrameLocator;
    /**
     * 🔍 Obtener iframe por nombre o URL (CORREGIDO)
     * @param nameOrUrl - Nombre o URL del iframe
     * @returns FrameLocator del iframe
     */
    getFrameByNameOrUrl(nameOrUrl: string): Promise<FrameLocator>;
    /**
     * ⏳ Esperar a que iframe esté completamente cargado
     * @param frameLocator - Locator del iframe
     * @param timeout - Timeout en milisegundos
     */
    waitForFrameLoad(frameLocator: FrameLocator, timeout?: number): Promise<void>;
    /**
     * 🔄 Ejecutar acción dentro del iframe
     * @param frameLocator - Locator del iframe
     * @param action - Función acción a ejecutar
     */
    executeInFrame<T>(frameLocator: FrameLocator, action: (frame: FrameLocator) => Promise<T>): Promise<T>;
    /**
     * 📝 Llenar campo dentro del iframe
     * @param frameLocator - Locator del iframe
     * @param selector - Selector del campo
     * @param value - Valor a ingresar
     */
    fillInFrame(frameLocator: FrameLocator, selector: string, value: string): Promise<void>;
    /**
     * 👆 Hacer clic en elemento dentro del iframe
     * @param frameLocator - Locator del iframe
     * @param selector - Selector del elemento
     */
    clickInFrame(frameLocator: FrameLocator, selector: string): Promise<void>;
    /**
     * 👀 Esperar elemento visible dentro del iframe
     * @param frameLocator - Locator del iframe
     * @param selector - Selector del elemento
     * @param timeout - Timeout en milisegundos
     */
    waitForElementInFrame(frameLocator: FrameLocator, selector: string, timeout?: number): Promise<void>;
}
//# sourceMappingURL=iframe-handler.page.d.ts.map