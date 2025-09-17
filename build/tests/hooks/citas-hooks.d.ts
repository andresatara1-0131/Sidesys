import { SuiteLoginPage } from '../pages/suite/login.page';
import { SuiteProductsPage } from '../pages/suite/products.page';
import { CitasBasePage } from '../pages/citas/citas-base.page';
export declare const test: import("@playwright/test").TestType<import("@playwright/test").PlaywrightTestArgs & import("@playwright/test").PlaywrightTestOptions & {
    loginPage: SuiteLoginPage;
    productsPage: SuiteProductsPage;
    citasBasePage: CitasBasePage;
}, import("@playwright/test").PlaywrightWorkerArgs & import("@playwright/test").PlaywrightWorkerOptions>;
export declare function beforeEachHook(): void;
export declare function afterEachHook(): void;
export declare function configureTimeouts(): void;
export declare const citasHooks: {
    test: import("@playwright/test").TestType<import("@playwright/test").PlaywrightTestArgs & import("@playwright/test").PlaywrightTestOptions & {
        loginPage: SuiteLoginPage;
        productsPage: SuiteProductsPage;
        citasBasePage: CitasBasePage;
    }, import("@playwright/test").PlaywrightWorkerArgs & import("@playwright/test").PlaywrightWorkerOptions>;
    beforeEachHook: typeof beforeEachHook;
    afterEachHook: typeof afterEachHook;
    configureTimeouts: typeof configureTimeouts;
};
//# sourceMappingURL=citas-hooks.d.ts.map