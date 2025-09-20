// pages/idc/HomePage.ts — Home de IDC
import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { BasePage } from '@pages/base/BasePage';

export class IdcHomePage extends BasePage {
  constructor(page: Page) { super(page); }

  async esperarCarga(): Promise<void> {                           // ← ✅ Espera carga del producto IDC
    await expect(this.page).toHaveURL(/\/IDC(\/|$)/, { timeout: 15_000 }); // ← URL debe incluir /IDC
    await this.page
      .getByRole('link', { name: 'domain Inicio' })               // ← “domain Inicio” en el menú lateral de IDC
      .waitFor({ state: 'visible', timeout: 15_000 });
  }

  async validarInicio(): Promise<void> {
    await this.page.locator('h4.breadcrum-active:has-text("Inicio")')
      .first()
      .waitFor({ state: 'visible' });
  }
}