import { Page } from '@playwright/test';
export declare class SuiteProductsPage {
    private page;
    private popupHandler;
    constructor(page: Page);
    /**
     * 📂 Abrir menú de productos
     */
    openProductsMenu(): Promise<void>;
    /**
     * 🔍 Buscar producto específico en la lista
     * @param productName - Nombre del producto a buscar
     */
    findProduct(productName: string | RegExp): Promise<void>;
    /**
     * 🚀 Abrir producto y manejar popup
     * @param productName - Nombre del producto a abrir
     * @returns URL del popup abierto
     */
    openProduct(productName: string | RegExp): Promise<string>;
    /**
     * 📋 Abrir producto Citas específicamente
     * @returns URL de Citas
     */
    openCitas(): Promise<string>;
    /**
     * 🆔 Abrir producto IDC específicamente
     * @returns URL de IDC
     */
    openIDC(): Promise<string>;
    /**
     * 📊 Verificar cantidad de productos visibles
     * @param expectedCount - Cantidad esperada de productos
     */
    verifyProductsCount(expectedCount: number): Promise<void>;
    /**
     * 🔄 Navegar a URL de producto en la misma pestaña
     * @param productUrl - URL del producto a navegar
     */
    navigateToProductUrl(productUrl: string): Promise<void>;
}
//# sourceMappingURL=products.page.d.ts.map