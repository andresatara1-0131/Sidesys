import { Page } from '@playwright/test';
import { CitasBasePage } from '../citas-base.page';
export declare class CitasSelectionPage extends CitasBasePage {
    constructor(page: Page);
    /**
     * 🛎️ Seleccionar servicio específico
     * @param serviceName - Nombre del servicio
     */
    selectService(serviceName: string): Promise<void>;
    /**
     * 🏢 Seleccionar sucursal específica
     * @param branchName - Nombre de la sucursal
     */
    selectBranch(branchName: string): Promise<void>;
    /**
     * 👤 Seleccionar tipo de atención
     * @param attentionType - Tipo de atención (Personal, Virtual, etc.)
     */
    selectAttentionType(attentionType: string): Promise<void>;
    /**
     * 🔄 Hacer clic en botón Continuar
     */
    clickContinuar(): Promise<void>;
    /**
     * 📍 Seleccionar ubicación automática o manual
     * @param useMyLocation - Usar mi ubicación (true) o seleccionar manual (false)
     */
    selectLocation(useMyLocation?: boolean): Promise<void>;
    /**
     * 🎯 Flujo completo de selección de servicio y sucursal
     * @param service - Nombre del servicio
     * @param branch - Nombre de la sucursal
     * @param attentionType - Tipo de atención
     */
    completeSelectionFlow(service: string, branch: string, attentionType?: string): Promise<void>;
}
//# sourceMappingURL=selection.page.d.ts.map