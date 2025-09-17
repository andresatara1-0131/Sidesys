import { Page } from '@playwright/test';
import { CitasBasePage } from '../citas-base.page';
type SucursalData = {
    nombre: string;
    alias: string;
    lat: string;
    long: string;
    codigo: string;
};
export declare class CitasSucursalesPage extends CitasBasePage {
    private frameLocator;
    constructor(page: Page);
    /**
     * 📋 Navegar a mantenimiento de sucursales
     */
    navigateToMantenimiento(): Promise<void>;
    /**
     * ➕ Hacer clic en botón Alta
     */
    clickAltaButton(): Promise<void>;
    /**
     * 📝 Llenar formulario de sucursal
     * @param sucursalData - Datos de la sucursal
     */
    fillSucursalForm(sucursalData: SucursalData): Promise<void>;
    /**
     * 📍 Llenar coordenadas de ubicación
     * @param lat - Latitud
     * @param long - Longitud
     */
    fillCoordenadas(lat: string, long: string): Promise<void>;
    /**
     * ⏰ Configurar horario de atención
     * @param horaApertura - Hora de apertura
     * @param horaCierre - Hora de cierre
     */
    configurarHorario(horaApertura: string, horaCierre: string): Promise<void>;
    /**
     * 📋 Obtener mensaje de resultado
     * @returns Texto del mensaje
     */
    getResultMessage(): Promise<string>;
    /**
     * 🏢 Crear sucursal completa
     * @param sucursalData - Datos de la sucursal
     * @param horaApertura - Hora de apertura
     * @param horaCierre - Hora de cierre
     */
    crearSucursalCompleta(sucursalData: SucursalData, horaApertura: string, horaCierre: string): Promise<boolean>;
}
export {};
//# sourceMappingURL=sucursales.page.d.ts.map