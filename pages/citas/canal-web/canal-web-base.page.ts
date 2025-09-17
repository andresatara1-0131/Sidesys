// 📁 pages/citas/canal-web/canal-web-base.page.ts
// 🏗️ Base para Canal Web que NO requiere login de Suite

import { Page } from '@playwright/test';
import { NavigationHandler } from '../../shared/navigation.page';

export class CanalWebBasePage {
  protected navigationHandler: NavigationHandler;

  constructor(protected page: Page) {
    this.navigationHandler = new NavigationHandler(page);
  }

  /**
   * 🌐 Navegar directamente a Canal Web (sin login Suite)
   */
  async navigateToCanalWeb(): Promise<void> {
    await this.navigationHandler.navigateTo(
      'https://encuestas.sidesys.ar/CitasWeb/welcome',
      'networkidle'
    );
    
    console.log('✅ Navegado directamente a Canal Web');
  }

  /**
   * ✅ Manejar popups iniciales de Canal Web
   */
  async handleInitialPopups(): Promise<void> {
    const popupSelectors = [
      this.page.getByRole('button', { name: /aceptar|accept/i }),
      this.page.getByRole('button', { name: /continuar|continue/i }),
      this.page.locator('button:has-text("Aceptar")'),
      this.page.locator('button:has-text("Continuar")')
    ];

    for (const selector of popupSelectors) {
      if (await selector.isVisible({ timeout: 5000 }).catch(() => false)) {
        await selector.click({ timeout: 10000 });
        await this.page.waitForTimeout(1000);
        console.log('✅ Popup manejado');
      }
    }
  }

  /**
   * 🔐 Login directo en Canal Web (no Suite)
   */
  async loginCanalWeb(documentNumber: string): Promise<void> {
    // ✅ Selectores robustos para Canal Web
    const tipoDocSelectors = [
      this.page.getByRole('combobox', { name: /tipo de documento/i }),
      this.page.locator('select[name*="document"]'),
      this.page.locator('select[id*="document"]')
    ];

    let tipoDoc = null;
    for (const selector of tipoDocSelectors) {
      if (await selector.isVisible({ timeout: 10000 }).catch(() => false)) {
        tipoDoc = selector;
        break;
      }
    }

    if (tipoDoc) {
      await tipoDoc.selectOption('DNI');
      console.log('✅ Tipo de documento seleccionado: DNI');
    }

    // ✅ Campo número de documento
    const docNumberSelectors = [
      this.page.getByRole('textbox', { name: /numero de documento/i }),
      this.page.locator('input[name*="document"]'),
      this.page.locator('input[id*="document"]')
    ];

    let docNumberField = null;
    for (const selector of docNumberSelectors) {
      if (await selector.isVisible({ timeout: 10000 }).catch(() => false)) {
        docNumberField = selector;
        break;
      }
    }

    if (docNumberField) {
      await docNumberField.fill(documentNumber, { delay: 50 });
      console.log(`✅ Número de documento ingresado: ${documentNumber}`);
    }

    // ✅ Botón ingresar
    const ingresarSelectors = [
      this.page.getByRole('button', { name: /ingresar|enter|login/i }),
      this.page.locator('button:has-text("Ingresar")')
    ];

    let ingresarBtn = null;
    for (const selector of ingresarSelectors) {
      if (await selector.isVisible({ timeout: 10000 }).catch(() => false)) {
        ingresarBtn = selector;
        break;
      }
    }

    if (ingresarBtn) {
      await ingresarBtn.click({ timeout: 15000 });
      await this.page.waitForLoadState('networkidle');
      console.log('✅ Login en Canal Web exitoso');
    }
  }
}