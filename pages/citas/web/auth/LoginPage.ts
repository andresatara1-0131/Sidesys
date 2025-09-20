/**
 * Login del producto CITAS (canal WEB).
 * - Especializa BaseLoginPage con la ruta y textos reales del canal web.
 * - El baseURL del proyecto 'chromium' ya apunta a BASE_URL_WEB.
 */
import type { Page } from '@playwright/test';
import { BaseLoginPage } from '../../../common/auth/BaseLoginPage';

export class CitasWebLoginPage extends BaseLoginPage {
  constructor(page: Page) {
    super(page, {
      path: '/login',               // 👉 ajusta si tu ruta web difiere
      submitName: 'Ingresar',       // 👉 texto del botón
      successText: /Bienvenido/i,   // 👉 texto posterior al login
    });
  }
}