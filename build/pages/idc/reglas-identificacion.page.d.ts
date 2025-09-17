import { Page } from '@playwright/test';
import { IDCBasePage } from './idc-base.page';
export declare class IDCReglasIdentificacionPage extends IDCBasePage {
    constructor(page: Page);
    /**
     * ➕ Hacer clic en botón Agregar
     */
    clickAgregarButton(): Promise<void>;
    /**
     * 📝 Llenar campo Descripción
     * @param descripcion - Descripción de la regla
     */
    fillDescripcion(descripcion: string): Promise<void>;
    /**
     * 🆕 Crear nueva regla
     * @param descripcion - Descripción de la regla
     */
    crearNuevaRegla(descripcion: string): Promise<void>;
    /**
     * ✏️ Editar regla existente
     * @param rowIndex - Índice de la fila a editar
     * @param nuevaDescripcion - Nueva descripción
     */
    editarRegla(rowIndex: number, nuevaDescripcion: string): Promise<void>;
    /**
     * 🗑️ Eliminar regla existente
     * @param rowIndex - Índice de la fila a eliminar
     */
    eliminarRegla(rowIndex: number): Promise<void>;
    /**
     * 🔄 Activar/Desactivar regla
     * @param rowIndex - Índice de la fila
     */
    toggleRegla(rowIndex: number): Promise<void>;
    /**
     * 🔼🔽 Mover regla hacia arriba o abajo
     * @param rowIndex - Índice de la fila
     * @param direction - Dirección del movimiento (up/down)
     */
    moverRegla(rowIndex: number, direction: 'up' | 'down'): Promise<void>;
    /**
     * 📄 Validar paginación
     */
    validarPaginacion(): Promise<void>;
    /**
     * 🔍 Validar que regla existe en grid
     * @param descripcion - Descripción de la regla
     */
    validarReglaExiste(descripcion: string): Promise<boolean>;
    /**
     * 🔍 Validar que regla no existe en grid
     * @param descripcion - Descripción de la regla
     */
    validarReglaNoExiste(descripcion: string): Promise<boolean>;
}
//# sourceMappingURL=reglas-identificacion.page.d.ts.map