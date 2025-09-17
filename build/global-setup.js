"use strict";
// 📁 global-setup.ts
// 🔐 Setup global para autenticación en Suite - TYPESCRIPT
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
async function globalSetup() {
    console.log('🚀 Iniciando global setup TypeScript...');
    const browser = await test_1.chromium.launch({
        headless: false, // 👀 Ver en browser
        timeout: 120000
    });
    const context = await browser.newContext({
        viewport: { width: 1920, height: 1080 },
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    });
    const page = await context.newPage();
    try {
        console.log('🌐 Navegando a página de login...');
        await page.goto('https://encuestas.sidesys.ar/Suite/login', {
            waitUntil: 'networkidle',
            timeout: 60000
        });
        // ✅ Tomar screenshot inicial
        await page.screenshot({ path: 'test-results/1-before-login.png' });
        console.log('📸 Screenshot inicial tomada');
        // 🔍 Buscar campo email con múltiples selectores
        console.log('🔍 Buscando campo email...');
        const emailSelectors = [
            'input[placeholder="mail@sample.com"]',
            'input[type="email"]',
            'input[name*="email"]',
            'input[id*="email"]',
            'input[data-testid*="email"]'
        ];
        let emailField = null;
        for (const selector of emailSelectors) {
            const element = page.locator(selector);
            if (await element.count() > 0) {
                emailField = element;
                console.log(`✅ Encontrado campo email con selector: ${selector}`);
                break;
            }
        }
        if (!emailField) {
            await page.screenshot({ path: 'test-results/2-email-not-found.png', fullPage: true });
            throw new Error('❌ No se pudo encontrar el campo de email');
        }
        // 📝 Escribir email
        await emailField.click({ timeout: 15000 });
        await emailField.fill('admincitas@sidesys.com', { delay: 50 });
        console.log('✅ Email ingresado');
        await page.screenshot({ path: 'test-results/3-email-filled.png' });
        // 🔍 Buscar botón Siguiente
        console.log('🔍 Buscando botón Siguiente...');
        const siguienteSelectors = [
            'button:has-text("Siguiente")',
            'button:has-text("Next")',
            'button[type="submit"]',
            'button:has-text("Continuar")',
            'button[data-testid*="next"]'
        ];
        let siguienteBtn = null;
        for (const selector of siguienteSelectors) {
            const element = page.locator(selector);
            if (await element.count() > 0) {
                siguienteBtn = element;
                console.log(`✅ Encontrado botón con selector: ${selector}`);
                break;
            }
        }
        if (!siguienteBtn) {
            await page.screenshot({ path: 'test-results/4-button-not-found.png', fullPage: true });
            throw new Error('❌ No se pudo encontrar el botón Siguiente');
        }
        // 👆 Hacer clic en Siguiente
        await siguienteBtn.click({ timeout: 15000 });
        console.log('✅ Clic en botón Siguiente');
        // ⏳ Esperar navegación
        await page.waitForTimeout(5000);
        await page.waitForLoadState('networkidle');
        await page.screenshot({ path: 'test-results/5-after-next-click.png' });
        console.log('🔐 Buscando campo password...');
        // 🔍 Buscar campo password
        const passwordSelectors = [
            'input[type="password"]',
            'input[placeholder*="****"]',
            'input[name*="password"]',
            'input[id*="password"]',
            'input[data-testid*="password"]'
        ];
        let passwordField = null;
        for (const selector of passwordSelectors) {
            const element = page.locator(selector);
            if (await element.count() > 0) {
                passwordField = element;
                console.log(`✅ Encontrado campo password con selector: ${selector}`);
                break;
            }
        }
        if (!passwordField) {
            await page.screenshot({ path: 'test-results/6-password-not-found.png', fullPage: true });
            throw new Error('❌ No se pudo encontrar el campo de password');
        }
        // 🔒 Escribir password
        await passwordField.click({ timeout: 15000 });
        await passwordField.fill('E%4oCK!Hl');
        console.log('✅ Password ingresado');
        await page.screenshot({ path: 'test-results/7-password-filled.png' });
        // 🔍 Buscar botón Iniciar Sesión
        console.log('🔍 Buscando botón Iniciar Sesión...');
        const loginSelectors = [
            'button:has-text("Iniciar sesión")',
            'button:has-text("Login")',
            'button:has-text("Sign in")',
            'button[type="submit"]',
            'button[data-testid*="login"]'
        ];
        let loginBtn = null;
        for (const selector of loginSelectors) {
            const element = page.locator(selector);
            if (await element.count() > 0) {
                loginBtn = element;
                console.log(`✅ Encontrado botón login con selector: ${selector}`);
                break;
            }
        }
        if (!loginBtn) {
            await page.screenshot({ path: 'test-results/8-login-button-not-found.png', fullPage: true });
            throw new Error('❌ No se pudo encontrar el botón Iniciar sesión');
        }
        // 🚀 Hacer clic en Login
        await loginBtn.click({ timeout: 15000 });
        console.log('✅ Clic en botón Login');
        // ⏳ Esperar redirección
        await page.waitForURL(/.*\/suite\/home/i, { timeout: 30000 });
        await page.waitForLoadState('networkidle');
        await page.screenshot({ path: 'test-results/9-login-success.png' });
        console.log('💾 Guardando estado de autenticación...');
        await context.storageState({ path: 'auth/auth.json' });
        console.log('✅ Global setup completado exitosamente!');
        console.log('✅ Archivo auth.json creado en: auth/auth.json');
    }
    catch (error) {
        console.error('❌ Error en global setup:', error);
        await page.screenshot({ path: 'test-results/10-global-setup-error.png', fullPage: true });
        throw error;
    }
    finally {
        await browser.close();
    }
}
exports.default = globalSetup;
//# sourceMappingURL=global-setup.js.map