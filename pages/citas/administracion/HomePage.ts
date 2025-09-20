// pages/citas/administracion/HomePage.ts
// -----------------------------------------------------------------------------
// Home de Citas Administración: helpers para esperar la carga y validar “Inicio”.
// Si la URL no cambia (entornos que redirigen a Suite), usa señales de UI propias
// del producto (logo "Citas" + breadcrumb “Inicio”) antes de fallar.
// -----------------------------------------------------------------------------

import type { Page } from '@playwright/test';            // ← Tipo Page
import { expect } from '@playwright/test';               // ← Asserts
import { BasePage } from '@pages/base/BasePage';         // ← Base común

export class CitasAdminHomePage extends BasePage {
  constructor(page: Page) { super(page); }

  async esperarCarga(): Promise<void> {
    // 1) Intento “rápido” por URL (/CitasBO)
    const urlOk = await this.page.waitForURL(/\/CitasBO(\/|$)/, { timeout: 8000 }).then(() => true).catch(() => false);

    // 2) Señales visuales del producto (sirven aunque la URL no cambie aún)
    //    - Logo/imagen con nombre accesible "Citas"
    //    - Breadcrumb “Inicio” del producto
    const logo = this.page.getByRole('img', { name: /Citas/i }).first();
    const bread = this.page.locator('h4.breadcrum-active:has-text("Inicio")').first();

    // Espera a que al menos UNA señal sea visible (máx 15s en total)
    const start = Date.now();
    while (Date.now() - start < 15000) {
      if (await logo.isVisible().catch(() => false)) break;
      if (await bread.isVisible().catch(() => false)) break;
      await this.page.waitForTimeout(300);
    }

    // Si no tenemos URL OK ni señales visuales, falla con diagnóstico
    const haveSignal =
      (await logo.isVisible().catch(() => false)) || (await bread.isVisible().catch(() => false));
    if (!urlOk && !haveSignal) {
      throw new Error(`Citas no cargó. URL actual: ${this.page.url()}`);
    }
  }

  async validarInicio(): Promise<void> {
    // Breadcrumb “Inicio” propio del producto (cuando existe, es indicativo de Home del módulo)
    await this.page.locator('h4.breadcrum-active:has-text("Inicio")').first().waitFor({ state: 'visible' });
  }
}