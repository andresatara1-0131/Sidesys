import { Page } from '@playwright/test';
export declare class NavigationHandler {
    private page;
    constructor(page: Page);
    /**
     * 🌐 Navegar a URL específica
     * @param url - URL a navegar
     * @param waitUntil - Estado de espera
     */
    navigateTo(url: string, waitUntil?: 'load' | 'domcontentloaded' | 'networkidle'): Promise<void>;
    /**
     * ⏳ Esperar a que URL coincida con patrón
     * @param urlPattern - Patrón de URL
     * @param timeout - Timeout en milisegundos
     */
    waitForUrl(urlPattern: string | RegExp, timeout?: number): Promise<void>;
    /**
     * 🔙 Navegar hacia atrás en el historial
     */
    goBack(): Promise<void>;
    /**
     * 🔜 Navegar hacia adelante en el historial
     */
    goForward(): Promise<void>;
    /**
     * 🔄 Recargar página actual
     */
    reload(): Promise<void>;
    /**
     * 📍 Obtener URL actual
     * @returns URL actual
     */
    getCurrentUrl(): Promise<string>;
    /**
     * 🏠 Navegar a página home de la aplicación
     */
    goToHome(): Promise<void>;
    /**
     * 📋 Verificar que la URL contiene texto específico
     * @param text - Texto a verificar en URL
     */
    verifyUrlContains(text: string): Promise<void>;
}
//# sourceMappingURL=navigation.page.d.ts.map