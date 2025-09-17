// src/pages/suite/SuiteLoginPage.ts
// ================================================================
// PAGE OBJECT: PÁGINA DE LOGIN DE SUITE
// - Encapsula toda la lógica de login.
// - Simula lo que haría un humano: escribir, hacer clic, esperar.
// - Reutilizable en cualquier test que necesite login.
// ================================================================

import { Page } from '@playwright/test';     // ← Importa tipo Page
import { ENV } from '../../config/env';     // ← Importa variables de entorno

export class SuiteLoginPage {
  private page: Page;                       // ← Almacena la página actual

  constructor(page: Page) {
    this.page = page;                       // ← Inyecta la página en el constructor
  }

  /**
   * Realiza login en Suite con las credenciales del .env
   * Simula comportamiento humano: espera, escribe, hace clic.
   */
  async login() {
    await this.page.goto(ENV.SUITE_URL + '/login');           // ← Navegar a login (como humano)
    await this.page.fill('#username', ENV.USERNAME);          // ← Escribir usuario
    await this.page.fill('#password', ENV.PASSWORD);          // ← Escribir contraseña
    await this.page.click('button[type="submit"]');           // ← Hacer clic en "Iniciar sesión"
    await this.page.waitForURL('**/dashboard', { timeout: 10000 }); // ← Esperar redirección (10s)
  }
}