import type { Page, Locator } from '@playwright/test';               // ← Tipos Playwright

export class BasePage {                                              // ← Clase base para POs
  protected readonly page: Page;                                     // ← Referencia a Page

  constructor(page: Page) { this.page = page; }                      // ← Inyección de Page

  async goto(pathname: string) {                                     // ← Navega a ruta relativa (si la usas)
    await this.page.goto(pathname, { waitUntil: 'domcontentloaded' });// ← Espera DOM listo
    await this.page.waitForLoadState('networkidle');                 // ← Red estable
  }

  byRole(role: string, name?: string) {                              // ← Helper accesible por rol
    return this.page.getByRole(role as any, name ? { name } : undefined);
  }

  async click(l: Locator) {                                          // ← Clic seguro
    await l.waitFor({ state: 'visible' });
    await l.click();
  }

  async type(l: Locator, text: string, delay = 50) {                 // ← Escritura “humana”
    await l.waitFor({ state: 'visible' });
    await l.fill('');
    await l.type(text, { delay });
  }
}