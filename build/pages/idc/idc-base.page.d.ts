import { Page } from '@playwright/test';
import { NavigationHandler } from '../shared/navigation.page';
export declare class IDCBasePage {
    protected page: Page;
    protected navigationHandler: NavigationHandler;
    constructor(page: Page);
    /**
     * 🌐 Navegar a página principal de IDC
     */
    navigateToIDC(): Promise<void>;
    /**
     * 📋 Navegar a módulo de Reglas de Identificación
     */
    navigateToReglasIdentificacion(): Promise<void>;
    /**
     * 🔍 Buscar en grid de resultados
     * @param searchText - Texto a buscar
     */
    searchInGrid(searchText: string): Promise<void>;
    /**
     * 📊 Obtener número de filas en grid
     * @returns Número de filas
     */
    getGridRowCount(): Promise<number>;
    /**
     * 🎲 Seleccionar fila aleatoria del grid
     * @returns Índice de fila seleccionada
     */
    selectRandomGridRow(): Promise<number>;
    /**
     * 📝 Obtener texto de celda específica en grid
     * @param rowIndex - Índice de fila
     * @param columnIndex - Índice de columna
     * @returns Texto de la celda
     */
    getGridCellText(rowIndex: number, columnIndex: number): Promise<string>;
    /**
     * ✏️ Hacer clic en botón Editar de fila específica
     * @param rowIndex - Índice de fila
     */
    clickEditButton(rowIndex: number): Promise<void>;
    /**
     * 🗑️ Hacer clic en botón Eliminar de fila específica
     * @param rowIndex - Índice de fila
     */
    clickDeleteButton(rowIndex: number): Promise<void>;
    /**
     * 🔄 Hacer clic en botón de toggle (Activar/Desactivar)
     * @param rowIndex - Índice de fila
     */
    clickToggleButton(rowIndex: number): Promise<void>;
    /**
     * ✅ Validar mensaje de éxito
     * @param expectedMessage - Mensaje esperado
     */
    validateSuccessMessage(expectedMessage: string): Promise<void>;
    /**
     * 💾 Hacer clic en botón Guardar
     */
    clickGuardarButton(): Promise<void>;
    /**
     * ✔️ Hacer clic en botón Confirmar
     */
    clickConfirmarButton(): Promise<void>;
}
//# sourceMappingURL=idc-base.page.d.ts.map