// 📁 pages/suite/login.page.ts
// 🔐 Page Object para el login de Suite

import { Page, expect } from '@playwright/test'; // 🧩 Importar Playwright

export class SuiteLoginPage {
  constructor(private page: Page) {} // 🏗️ Constructor con página

  /**
   * 🌐 Navegar a la página de login de Suite
   */
  async navigate(): Promise<void> {
    await this.page.goto('https://encuestas.sidesys.ar/Suite/login', {
      waitUntil: 'domcontentloaded' // ⏳ Esperar carga del DOM
    });
    
    console.log('✅ Navegado a página de login de Suite'); // 📝 Log de confirmación
  }

  /**
   * 📧 Ingresar email en el campo correspondiente
   * @param email - Email a ingresar
   */
  async enterEmail(email: string): Promise<void> {
    const emailField = this.page.getByRole('textbox', { name: 'mail@sample.com' }); // 🔍 Localizar campo email
    
    await emailField.click(); // 👆 Hacer clic en el campo
    await emailField.fill(email); // 📧 Llenar con email
    
    console.log(`✅ Email ingresado: ${email}`); // 📝 Log de confirmación
  }

  /**
   * 🔒 Ingresar contraseña en el campo correspondiente  
   * @param password - Contraseña a ingresar
   */
  async enterPassword(password: string): Promise<void> {
    const passwordField = this.page.getByRole('textbox', { name: '******' }); // 🔍 Localizar campo contraseña
    
    await passwordField.click(); // 👆 Hacer clic en el campo
    await passwordField.fill(password); // 🔒 Llenar con contraseña
    
    console.log('✅ Contraseña ingresada'); // 📝 Log de confirmación
  }

  /**
   * 👉 Hacer clic en botón "Siguiente"
   */
  async clickSiguiente(): Promise<void> {
    const siguienteBtn = this.page.getByRole('button', { name: 'Siguiente' }); // 🔍 Localizar botón
    
    await siguienteBtn.click(); // 👆 Hacer clic
    await this.page.waitForTimeout(1000); // ⏳ Esperar breve momento
    
    console.log('✅ Clic en botón Siguiente'); // 📝 Log de confirmación
  }

  /**
   * 🚪 Hacer clic en botón "Iniciar sesión"
   */
  async clickIniciarSesion(): Promise<void> {
    const iniciarBtn = this.page.getByRole('button', { name: 'Iniciar sesión' }); // 🔍 Localizar botón
    
    await iniciarBtn.click(); // 👆 Hacer clic
    await this.page.waitForTimeout(2000); // ⏳ Esperar proceso de login
    
    console.log('✅ Clic en botón Iniciar sesión'); // 📝 Log de confirmación
  }

  /**
   * ✅ Validar que el login fue exitoso
   */
  async validateLoginSuccess(): Promise<void> {
    // 🔍 Verificar que el menú de productos está visible
    await expect(this.page.getByRole('link', { name: 'archive Productos' }))
      .toBeVisible({ timeout: 15000 }); // ⏳ Timeout de 15 segundos
    
    console.log('✅ Login exitoso - Menú de productos visible'); // 📝 Log de confirmación
  }

  /**
   * 🔐 Flujo completo de login
   * @param email - Email para login
   * @param password - Contraseña para login
   */
  async login(email: string, password: string): Promise<void> {
    await this.enterEmail(email); // 📧 Ingresar email
    await this.clickSiguiente(); // 👉 Clic en Siguiente
    await this.enterPassword(password); // 🔒 Ingresar contraseña
    await this.clickIniciarSesion(); // 🚪 Clic en Iniciar sesión
    await this.validateLoginSuccess(); // ✅ Validar login exitoso
    
    console.log('✅ Flujo de login completado exitosamente'); // 📝 Log de confirmación
  }

  /**
   * ❌ Validar que se muestra mensaje de error
   */
  async validateLoginError(): Promise<void> {
    // 🔍 Verificar que se muestra mensaje de error
    const errorMessage = this.page.locator('text=/error|incorrecto|inválido/i'); // 🎯 Buscar texto de error
    
    await expect(errorMessage).toBeVisible({ timeout: 5000 }); // ⏳ Timeout de 5 segundos
    
    console.log('✅ Mensaje de error de login visible'); // 📝 Log de confirmación
  }
}