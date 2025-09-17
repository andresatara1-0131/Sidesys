import { Page } from '@playwright/test';
export declare class SuiteLoginPage {
    private page;
    constructor(page: Page);
    /**
     * 🌐 Navegar a la página de login de Suite
     */
    navigate(): Promise<void>;
    /**
     * 📧 Ingresar email en el campo correspondiente
     * @param email - Email a ingresar
     */
    enterEmail(email: string): Promise<void>;
    /**
     * 🔒 Ingresar contraseña en el campo correspondiente
     * @param password - Contraseña a ingresar
     */
    enterPassword(password: string): Promise<void>;
    /**
     * 👉 Hacer clic en botón "Siguiente"
     */
    clickSiguiente(): Promise<void>;
    /**
     * 🚪 Hacer clic en botón "Iniciar sesión"
     */
    clickIniciarSesion(): Promise<void>;
    /**
     * ✅ Validar que el login fue exitoso
     */
    validateLoginSuccess(): Promise<void>;
    /**
     * 🔐 Flujo completo de login
     * @param email - Email para login
     * @param password - Contraseña para login
     */
    login(email: string, password: string): Promise<void>;
    /**
     * ❌ Validar que se muestra mensaje de error
     */
    validateLoginError(): Promise<void>;
}
//# sourceMappingURL=login.page.d.ts.map