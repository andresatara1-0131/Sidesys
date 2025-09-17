import { Page } from '@playwright/test';
export declare class SuiteLoginPage {
    private page;
    constructor(page: Page);
    /**
     * 🌐 Navegar a la página de login de Suite
     */
    navigate(): Promise<void>;
    /**
     * 📧 Ingresar email - CORREGIDO con selectores robustos
     */
    enterEmail(email: string): Promise<void>;
    /**
     * 👉 Hacer clic en botón "Siguiente" - CORREGIDO
     */
    clickSiguiente(): Promise<void>;
    /**
     * 🔒 Ingresar contraseña - CORREGIDO
     */
    enterPassword(password: string): Promise<void>;
    /**
     * 🚪 Hacer clic en botón "Iniciar sesión" - CORREGIDO
     */
    clickIniciarSesion(): Promise<void>;
    /**
     * 🔐 Flujo completo de login - MEJORADO
     */
    login(email: string, password: string): Promise<void>;
}
//# sourceMappingURL=login-success.spec.d.ts.map