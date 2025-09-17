import { Page } from '@playwright/test';
export declare class CitasWelcomePage {
    private page;
    private navigationHandler;
    constructor(page: Page);
    /**
     * 🌐 Navegar a página welcome de CitasWeb
     */
    navigate(): Promise<void>;
    /**
     * ✅ Manejar popups iniciales (Aceptar, Continuar)
     */
    handleInitialPopups(): Promise<void>;
    /**
     * 📝 Seleccionar tipo de documento
     * @param documentType - Tipo de documento (DNI, Pasaporte, etc.)
     */
    selectDocumentType(documentType: string): Promise<void>;
    /**
     * 🔢 Ingresar número de documento
     * @param documentNumber - Número de documento
     */
    enterDocumentNumber(documentNumber: string): Promise<void>;
    /**
     * 🚪 Hacer clic en botón Ingresar
     */
    clickIngresar(): Promise<void>;
    /**
     * 🔐 Login completo con DNI
     * @param documentNumber - Número de documento
     */
    loginWithDNI(documentNumber: string): Promise<void>;
    /**
     * ➕ Hacer clic en botón Agregar Cita
     */
    clickAgregarCita(): Promise<void>;
    /**
     * 👤 Seleccionar tipo de cita personal
     */
    selectCitaPersonal(): Promise<void>;
    /**
     * 🌐 Flujo completo de inicio de creación de cita
     */
    startCreateCitaFlow(): Promise<void>;
}
//# sourceMappingURL=welcome.page.d.ts.map