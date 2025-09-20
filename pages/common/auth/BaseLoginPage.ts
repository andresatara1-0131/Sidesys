/**
 * BaseLoginPage:
 * - Reutilizable para Web/Admin de cualquier producto.
 * - Configurable por opciones (ruta de login, textos/labels, botón y texto de éxito).
 * - Extiende de BasePage para heredar helpers "human-like".
 */
import type { Page, Locator } from '@playwright/test';
import { BasePage } from '../../base/BasePage';

export type LoginOptions = {
  path: string;                       // Ruta relativa del login (ej. '/login' ó '/admin/login')
  userLabel?: RegExp | string;        // Label o placeholder del usuario
  passLabel?: RegExp | string;        // Label o placeholder de la contraseña
  submitRole?: 'button' | 'link';     // Rol accesible del botón de envío
  submitName?: string;                // Nombre visible del botón (ej. 'Ingresar')
  successText?: string;               // Texto que confirma el login
};

export class BaseLoginPage extends BasePage {
  private opts: LoginOptions;

  constructor(page: Page, opts: LoginOptions) {
    super(page);
    this.opts = {
      userLabel: /usuario/i,
      passLabel: /contraseña|password/i,
      submitRole: 'button',
      submitName: 'Ingresar',
      successText: /bienvenido/i,
      ...opts,
    };
  }

  /** Locators derivados de las opciones */
  private get userInput(): Locator {
    return this.page.getByLabel(this.opts.userLabel!);
  }
  private get passInput(): Locator {
    return this.page.getByLabel(this.opts.passLabel!);
  }
  private get submitBtn(): Locator {
    return this.byRole(this.opts.submitRole!, this.opts.submitName!);
  }

  /** Flujo de login reutilizable */
  async login(user: string, pass: string) {
    await this.goto(this.opts.path);          // /login ó /admin/login
    await this.type(this.userInput, user);
    await this.type(this.passInput, pass);
    await this.click(this.submitBtn);
    await this.waitForLoaderGone();           // si no hay loader, no afecta
    if (this.opts.successText) {
      await this.waitForText(
        typeof this.opts.successText === 'string'
          ? this.opts.successText
          : this.opts.successText.source
      );
    }
  }
}