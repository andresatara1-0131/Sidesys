import { Page } from '@playwright/test';
import { NavigationHandler } from '../shared/navigation.page';
import { IframeHandler } from '../shared/iframe-handler.page';
export declare class CitasBasePage {
    protected page: Page;
    protected navigationHandler: NavigationHandler;
    protected iframeHandler: IframeHandler;
    constructor(page: Page);
    /**
     * ⏳ Esperar carga completa de módulo de Citas
     */
    waitForCitasModuleLoad(): Promise<void>;
    /**
     * 📋 Navegar a sección específica dentro de Citas
     * @param sectionName - Nombre de la sección
     */
    navigateToSection(sectionName: string): Promise<void>;
    /**
     * 🔍 Buscar en tabla de resultados
     * @param searchText - Texto a buscar
     */
    searchInTable(searchText: string): Promise<void>;
    /**
     * 📊 Obtener número de resultados en tabla
     * @returns Número de filas en tabla
     */
    getTableRowCount(): Promise<number>;
    /**
     * 🎲 Seleccionar fila aleatoria de tabla
     * @returns Índice de fila seleccionada
     */
    selectRandomTableRow(): Promise<number>;
    /**
     * 📝 Obtener texto de celda específica
     * @param rowIndex - Índice de fila
     * @param columnIndex - Índice de columna
     * @returns Texto de la celda
     */
    getCellText(rowIndex: number, columnIndex: number): Promise<string>;
    /**
     * 💾 Hacer clic en botón de acción (Guardar, Cancelar, etc.)
     * @param buttonName - Nombre del botón
     */
    clickActionButton(buttonName: string): Promise<void>;
    /**
     * ✅ Validar mensaje de éxito
     * @param expectedMessage - Mensaje esperado
     */
    validateSuccessMessage(expectedMessage: string): Promise<void>;
}
//# sourceMappingURL=citas-base.page.d.ts.map