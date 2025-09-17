import { Page } from '@playwright/test';
export declare class PopupHandler {
    private page;
    constructor(page: Page);
    /**
     * 👆 Hacer clic en elemento y esperar popup
     * @param element - Elemento a hacer clic
     * @returns Instancia de la página del popup
     */
    clickAndWaitForPopup(element: any): Promise<Page>;
    /**
     * 👆 Hacer clic y obtener URL del popup
     * @param element - Elemento a hacer clic
     * @returns URL del popup
     */
    clickAndGetPopupUrl(element: any): Promise<string>;
    /**
     * 🔄 Cambiar a pestaña de popup
     * @param popup - Página del popup
     */
    switchToPopup(popup: Page): Promise<void>;
    /**
     * 🔙 Cambiar de vuelta a pestaña principal
     */
    switchToMainTab(): Promise<void>;
    /**
     * 🎯 Esperar y validar URL específica en popup
     * @param popup - Página del popup
     * @param urlPattern - Patrón de URL a validar
     * @param timeout - Timeout en milisegundos
     */
    waitForPopupUrl(popup: Page, urlPattern: string | RegExp, timeout?: number): Promise<void>;
    /**
     * ❌ Cerrar popup específico
     * @param popup - Página del popup a cerrar
     */
    closePopup(popup: Page): Promise<void>;
    /**
     * 🔢 Obtener cantidad de pestañas abiertas
     * @returns Número de pestañas
     */
    getOpenTabsCount(): Promise<number>;
}
//# sourceMappingURL=popup-handler.page.d.ts.map