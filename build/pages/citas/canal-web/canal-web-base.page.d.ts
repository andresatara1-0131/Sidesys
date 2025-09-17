import { Page } from '@playwright/test';
import { NavigationHandler } from '../../shared/navigation.page';
export declare class CanalWebBasePage {
    protected page: Page;
    protected navigationHandler: NavigationHandler;
    constructor(page: Page);
    /**
     * 🌐 Navegar directamente a Canal Web (sin login Suite)
     */
    navigateToCanalWeb(): Promise<void>;
    /**
     * ✅ Manejar popups iniciales de Canal Web
     */
    handleInitialPopups(): Promise<void>;
    /**
     * 🔐 Login directo en Canal Web (no Suite)
     */
    loginCanalWeb(documentNumber: string): Promise<void>;
}
//# sourceMappingURL=canal-web-base.page.d.ts.map