/**
 * Navbar (componente común):
 * - Ejemplo de Page Object de componente reutilizable.
 * - Ajusta roles/nombres/selectores según tu UI real.
 */
import type { Page } from '@playwright/test';
import { BasePage } from '../base/BasePage';

export class Navbar extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get perfilMenu() {
    return this.byRole('button', 'Perfil');
  }
  get logoutLink() {
    return this.byRole('menuitem', 'Cerrar sesión');
  }

  async logout() {
    await this.click(this.perfilMenu);
    await this.click(this.logoutLink);
    await this.waitForText('Has cerrado sesión'); // Ajustar texto real
  }
}