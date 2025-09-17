// src/pages/idc/LoginIDCPage.ts
// ================================================================
// PAGE OBJECT: LOGIN EN IDC (SI ES DIFERENTE A SUITE)
// - Solo si IDC tiene login independiente.
// - Si usa el mismo login de Suite, no es necesario.
// ================================================================

import { Page } from '@playwright/test';
import { ENV } from '../../config/env';

export class LoginIDCPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Login específico para IDC (si aplica)
   */
  async login() {
    await this.page.goto(ENV.SUITE_URL + '/idc/login');         // ← URL de login de IDC
    await this.page.fill('#username', ENV.USERNAME);            // ← Usuario
    await this.page.fill('#password', ENV.PASSWORD);            // ← Contraseña
    await this.page.click('button[type="submit"]');             // ← Iniciar sesión
    await this.page.waitForURL('**/idc/dashboard', { timeout: 10000 }); // ← Esperar redirección
  }
}