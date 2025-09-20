/** Fixture Suite: expone app.suite.login y app.suite.hub a los tests */

import { test as base } from '@fixtures/test-base';                // ← Base con evidencias
import type { Page } from '@playwright/test';                      // ← Tipo Page
import { SuiteLoginPage } from '@pages/suite/auth/LoginPage';      // ← PO Login Suite
import { ProductsHubPage } from '@pages/suite/hub/ProductsHubPage';// ← PO Hub Suite

export type SuiteApp = {                                           // ← Tipo de app.suite
  login: SuiteLoginPage;                                           // ← Login
  hub: ProductsHubPage;                                            // ← Hub de productos
};

export const test = base.extend<{ app: { suite: SuiteApp } }>({    // ← Extiende test con app.suite
  app: async ({ page }, use) => {                                  // ← Implementación de fixture
    const suite: SuiteApp = {                                      // ← Instancia de POs con Page actual
      login: new SuiteLoginPage(page as Page),
      hub:   new ProductsHubPage(page as Page),
    };
    await use({ suite });                                          // ← Expone en el test
  },
});

export { expect } from '@fixtures/test-base';                       // ← Reexporta expect