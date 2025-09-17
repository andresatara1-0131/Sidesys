// 📁 pages/suite/login.page.ts
// 🔐 Page Object para el login de Suite - CORREGIDO

import { Page, expect } from '@playwright/test';

export class SuiteLoginPage {
  constructor(private page: Page) {}

  /**
   * 🌐 Navegar a la página de login de Suite
   */
  async navigate(): Promise<void> {
    await this.page.goto('https://encuestas.sidesys.ar/Suite/login', {
      waitUntil: 'networkidle', // ✅ Cambiado a networkidle
      timeout: 60000 // ✅ Timeout aumentado
    });
    
    console.log('✅ Navegado a página de login de Suite');
  }

  /**
   * 📧 Ingresar email - CORREGIDO con selectores robustos
   */
  async enterEmail(email: string): Promise<void> {
    // ✅ Múltiples selectores para mayor robustez
    const emailSelectors = [
      this.page.getByPlaceholder('mail@sample.com'),
      this.page.getByRole('textbox', { name: /correo|email|mail/i }),
      this.page.locator('input[type="email"]'),
      this.page.locator('input[name*="email"]'),
      this.page.locator('input[id*="email"]')
    ];

    let emailField = null;
    for (const selector of emailSelectors) {
      if (await selector.isVisible().catch(() => false)) {
        emailField = selector;
        break;
      }
    }

    if (!emailField) {
      throw new Error('❌ No se pudo encontrar el campo de email');
    }

    await emailField.click({ timeout: 10000 });
    await emailField.fill(email, { delay: 50 }); // ✅ Delay para simular typing real
    
    console.log(`✅ Email ingresado: ${email}`);
  }

  /**
   * 👉 Hacer clic en botón "Siguiente" - CORREGIDO
   */
  async clickSiguiente(): Promise<void> {
    // ✅ Múltiples estrategias para encontrar el botón
    const siguienteSelectors = [
      this.page.getByRole('button', { name: /siguiente|next/i }),
      this.page.locator('button:has-text("Siguiente")'),
      this.page.locator('button:has-text("Next")'),
      this.page.locator('button').filter({ hasText: 'Siguiente' }),
      this.page.locator('button').filter({ hasText: 'Next' })
    ];

    let siguienteBtn = null;
    for (const selector of siguienteSelectors) {
      if (await selector.isVisible({ timeout: 5000 }).catch(() => false)) {
        siguienteBtn = selector;
        break;
      }
    }

    if (!siguienteBtn) {
      throw new Error('❌ No se pudo encontrar el botón Siguiente');
    }

    // ✅ Esperar que esté realmente habilitado
    await siguienteBtn.waitFor({ state: 'visible', timeout: 15000 });
    await expect(siguienteBtn).toBeEnabled({ timeout: 15000 });

    // ✅ Verificar que no está disabled
    const isDisabled = await siguienteBtn.getAttribute('disabled');
    if (isDisabled !== null) {
      throw new Error('❌ Botón Siguiente está deshabilitado');
    }

    await siguienteBtn.click({ timeout: 15000 });
    await this.page.waitForTimeout(2000); // ✅ Esperar después del click
    
    console.log('✅ Clic en botón Siguiente exitoso');
  }

  /**
   * 🔒 Ingresar contraseña - CORREGIDO
   */
  async enterPassword(password: string): Promise<void> {
    // ✅ Múltiples selectores para contraseña
    const passwordSelectors = [
      this.page.getByPlaceholder('******'),
      this.page.getByRole('textbox', { name: /contraseña|password/i }),
      this.page.locator('input[type="password"]'),
      this.page.locator('input[name*="password"]'),
      this.page.locator('input[id*="password"]')
    ];

    let passwordField = null;
    for (const selector of passwordSelectors) {
      if (await selector.isVisible({ timeout: 10000 }).catch(() => false)) {
        passwordField = selector;
        break;
      }
    }

    if (!passwordField) {
      throw new Error('❌ No se pudo encontrar el campo de contraseña');
    }

    await passwordField.click({ timeout: 10000 });
    await passwordField.fill(password);
    
    console.log('✅ Contraseña ingresada');
  }

  /**
   * 🚪 Hacer clic en botón "Iniciar sesión" - CORREGIDO
   */
  async clickIniciarSesion(): Promise<void> {
    // ✅ Múltiples estrategias para encontrar el botón
    const iniciarSelectors = [
      this.page.getByRole('button', { name: /iniciar sesión|login|sign in/i }),
      this.page.locator('button:has-text("Iniciar sesión")'),
      this.page.locator('button:has-text("Login")'),
      this.page.locator('button').filter({ hasText: 'Iniciar sesión' }),
      this.page.locator('button').filter({ hasText: 'Login' })
    ];

    let iniciarBtn = null;
    for (const selector of iniciarSelectors) {
      if (await selector.isVisible({ timeout: 10000 }).catch(() => false)) {
        iniciarBtn = selector;
        break;
      }
    }

    if (!iniciarBtn) {
      throw new Error('❌ No se pudo encontrar el botón Iniciar sesión');
    }

    await iniciarBtn.waitFor({ state: 'visible', timeout: 15000 });
    await expect(iniciarBtn).toBeEnabled({ timeout: 15000 });

    await iniciarBtn.click({ timeout: 15000 });
    
    // ✅ Esperar que la navegación ocurra
    await this.page.waitForURL(/.*\/suite\/home/i, { timeout: 30000 });
    
    console.log('✅ Login exitoso');
  }

  /**
   * 🔐 Flujo completo de login - MEJORADO
   */
  async login(email: string, password: string): Promise<void> {
    try {
      await this.enterEmail(email);
      await this.clickSiguiente();
      await this.enterPassword(password);
      await this.clickIniciarSesion();
      
      console.log('✅ Flujo de login completado exitosamente');
    } catch (error) {
      console.error('❌ Error en el flujo de login:', error);
      // 📸 Capturar screenshot en caso de error
      await this.page.screenshot({ path: 'test-results/login-error.png', fullPage: true });
      throw error;
    }
  }
}