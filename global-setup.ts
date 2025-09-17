// 📁 global-setup.ts
// 🔐 CORREGIDO: Error del parámetro 'delay'

import { chromium } from '@playwright/test';

async function globalSetup() {
  console.log('🚀 Iniciando global setup TypeScript...');
  
  const browser = await chromium.launch({ 
    headless: false,
    timeout: 120000
  });

  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });

  const page = await context.newPage();

  try {
    console.log('🌐 Navegando a página de login...');
    await page.goto('https://encuestas.sidesys.ar/Suite/login', {
      waitUntil: 'networkidle',
      timeout: 60000
    });

    await page.screenshot({ path: 'test-results/1-before-login.png' });

    // 🔍 Buscar campo email
    console.log('🔍 Buscando campo email...');
    
    const emailSelectors = [
      'input[placeholder="mail@sample.com"]',
      'input[type="email"]',
      'input[name*="email"]'
    ];

    let emailField = null;
    for (const selector of emailSelectors) {
      const element = page.locator(selector);
      if (await element.count() > 0) {
        emailField = element;
        console.log(`✅ Encontrado campo email: ${selector}`);
        break;
      }
    }

    if (!emailField) {
      throw new Error('❌ No se pudo encontrar el campo de email');
    }

    // ✅ CORREGIDO: Sin parámetro delay
    await emailField.click({ timeout: 15000 });
    await emailField.fill('admincitas@sidesys.com');
    console.log('✅ Email ingresado');

    // ... el resto del código se mantiene igual pero SIN 'delay'
    // 🔍 Buscar botón Siguiente
    const siguienteBtn = page.locator('button:has-text("Siguiente")');
    if (await siguienteBtn.count() === 0) {
      throw new Error('❌ No se pudo encontrar el botón Siguiente');
    }

    await siguienteBtn.click({ timeout: 15000 });
    console.log('✅ Clic en botón Siguiente');
    
    await page.waitForTimeout(3000);

    // 🔍 Buscar campo password
    const passwordField = page.locator('input[type="password"]');
    if (await passwordField.count() === 0) {
      throw new Error('❌ No se pudo encontrar el campo de password');
    }

    // ✅ CORREGIDO: Sin parámetro delay
    await passwordField.click({ timeout: 15000 });
    await passwordField.fill('E%4oCK!Hl');
    console.log('✅ Password ingresado');

    // 🔍 Buscar botón Iniciar Sesión
    const loginBtn = page.locator('button:has-text("Iniciar sesión")');
    if (await loginBtn.count() === 0) {
      throw new Error('❌ No se pudo encontrar el botón Iniciar sesión');
    }

    await loginBtn.click({ timeout: 15000 });
    console.log('✅ Clic en botón Login');

    await page.waitForURL(/.*\/suite\/home/i, { timeout: 30000 });
    console.log('💾 Guardando estado de autenticación...');
    
    await context.storageState({ path: 'auth/auth.json' });
    console.log('✅ Global setup completado!');

  } catch (error) {
    console.error('❌ Error:', error);
    await page.screenshot({ path: 'test-results/error.png', fullPage: true });
    throw error;
  } finally {
    await browser.close();
  }
}

export default globalSetup;