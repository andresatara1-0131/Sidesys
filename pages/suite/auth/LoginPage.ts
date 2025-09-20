// Login de Suite — robusto con .env (base + path de login)

import type { Page } from '@playwright/test';                    // ← Tipo Page
import { BasePage } from '@pages/base/BasePage';                 // ← Base
import { suiteLoginUrl } from '@utils/url';                      // ← URL absoluta de login

export class SuiteLoginPage extends BasePage {                   // ← Page Object del login
  constructor(page: Page) { super(page); }                       // ← Inyección de Page

  async login(user: string, pass: string) {                      // ← Flujo reutilizable
    await this.page.goto(suiteLoginUrl(), {                      // ← Ir a la URL de login (absoluta)
      waitUntil: 'domcontentloaded',                             // ← Espera DOM listo
    });
    await this.page.waitForLoadState('networkidle');             // ← Red estable

    await this.page.getByRole('textbox', { name: 'mail@sample.com' }).click(); // ← Foco en email
    await this.page.getByRole('textbox', { name: 'mail@sample.com' }).fill(user); // ← Usuario (.env)

    await this.page.getByRole('button', { name: 'Siguiente' }).click();        // ← Botón Siguiente

    await this.page.getByRole('textbox', { name: '******' }).click();          // ← Foco contraseña
    await this.page.getByRole('textbox', { name: '******' }).fill(pass);       // ← Contraseña (.env)

    await this.page.getByRole('button', { name: 'Iniciar sesión' }).click();   // ← Enviar

    await this.page.getByRole('heading', { name: 'e-Flow® Suite' })            // ← Validación: heading visible
      .waitFor({ state: 'visible' });
  }
}