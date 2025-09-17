import { Page } from '@playwright/test';
import { CitasBasePage } from '../citas-base.page';
export declare class CitasConfirmationPage extends CitasBasePage {
    constructor(page: Page);
    /**
     * ✅ Hacer clic en botón Confirmar
     */
    clickConfirmar(): Promise<void>;
    /**
     * 🎉 Validar mensaje de éxito de creación de cita
     */
    validateSuccessMessage(): Promise<void>;
    /**
     * 📋 Obtener detalles de la cita creada
     * @returns Objeto con detalles de la cita
     */
    getAppointmentDetails(): Promise<{
        fecha: string;
        hora: string;
        servicio: string;
        sucursal: string;
    }>;
    /**
     * 🏠 Hacer clic en botón Volver al Inicio
     */
    clickVolverInicio(): Promise<void>;
    /**
     * 📧 Obtener opción de envío por correo (si aplica)
     */
    getEmailOption(): Promise<void>;
    /**
     * 📱 Obtener opción de envío por SMS (si aplica)
     */
    getSmsOption(): Promise<void>;
    /**
     * ✅ Flujo completo de confirmación
     */
    completeConfirmationFlow(): Promise<void>;
}
//# sourceMappingURL=confirmation.page.d.ts.map