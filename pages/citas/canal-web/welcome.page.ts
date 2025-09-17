// 📁 pages/citas/canal-web/welcome.page.ts
// 🌐 Page Object para Welcome Page - CORREGIDO

import { Page } from '@playwright/test'; // 🧩 Importar Playwright
import { NavigationHandler } from '../../shared/navigation.page'; // 🧭 Manejador de navegación

export class CitasWelcomePage {
  private navigationHandler: NavigationHandler;

  constructor(private page: Page) {
    this.navigationHandler = new NavigationHandler(page);
  }

  /**
   * 🌐 Navegar a página welcome de CitasWeb
   */
  async navigate(): Promise<void> {
    await this.navigationHandler.navigateTo(
      'https://encuestas.sidesys.ar/CitasWeb/welcome',
      'domcontentloaded'
	  
    );
    await page.waitForTimeout(5000);
    console.log('✅ Navegado a página welcome de CitasWeb');
  }

  /**
   * ✅ Manejar popups iniciales (Aceptar, Continuar)
   */
  async handleInitialPopups(): Promise<void> {
    // 🔍 Buscar botones de popups con timeout corto
	await page.waitForTimeout(5000);
    const btnAceptar = this.page.getByRole('button', { name: /Aceptar/i });
    const btnContinuar = this.page.getByRole('button', { name: /Continuar/i });

    // 👆 Hacer clic en botones si están visibles
    if (await btnAceptar.isVisible({ timeout: 3000 }).catch(() => false)) {
      await btnAceptar.click();
      await this.page.waitForTimeout(300);
      console.log('✅ Popup Aceptar manejado');
    }

    if (await btnContinuar.isVisible({ timeout: 3000 }).catch(() => false)) {
      await btnContinuar.click();
      await this.page.waitForTimeout(400);
      console.log('✅ Popup Continuar manejado');
    }
  }

  /**
   * 📝 Seleccionar tipo de documento
   * @param documentType - Tipo de documento (DNI, Pasaporte, etc.)
   */
  async selectDocumentType(documentType: string): Promise<void> {
    const tipoDoc = this.page.getByRole('combobox', { name: /Tipo de documento/i });
    
    await tipoDoc.waitFor({ state: 'visible', timeout: 15000 });
    await tipoDoc.click();
    
    const option = this.page.getByText(documentType);
    await option.click();
    
    console.log(`✅ Tipo de documento seleccionado: ${documentType}`);
  }

  /**
   * 🔢 Ingresar número de documento - CORREGIDO: sin delay
   * @param documentNumber - Número de documento
   */
  async enterDocumentNumber(documentNumber: string): Promise<void> {
    const docField = this.page.getByRole('textbox', { name: /Numero de documento/i });
    
    // ✅ CORREGIDO: Sin parámetro delay que causaba error
    await docField.fill(documentNumber);
    
    console.log(`✅ Número de documento ingresado: ${documentNumber}`);
  }

  /**
   * 🚪 Hacer clic en botón Ingresar
   */
  async clickIngresar(): Promise<void> {
    const ingresarBtn = this.page.getByRole('button', { name: /Ingresar/i });
    
    await ingresarBtn.click();
    await this.page.waitForLoadState('networkidle');
    
    console.log('✅ Clic en botón Ingresar');
  }

  /**
   * 🔐 Login completo con DNI
   * @param documentNumber - Número de documento
   */
  async loginWithDNI(documentNumber: string): Promise<void> {
    await this.selectDocumentType('DNI');
    await this.enterDocumentNumber(documentNumber);
    await this.clickIngresar();
    
    console.log(`✅ Login con DNI completado: ${documentNumber}`);
  }

  /**
   * ➕ Hacer clic en botón Agregar Cita
   */
  async clickAgregarCita(): Promise<void> {
    const agregarBtn = this.page.getByRole('button').filter({ hasText: 'add' });
    
    await agregarBtn.click();
    await this.page.waitForTimeout(200);
    
    console.log('✅ Clic en botón Agregar Cita');
  }

  /**
   * 👤 Seleccionar tipo de cita personal
   */
  async selectCitaPersonal(): Promise<void> {
    const citaPersonal = this.page.getByRole('menuitem', { name: /Cita Personal/i });
    
    await citaPersonal.click();
    await this.page.waitForTimeout(300);
    
    console.log('✅ Cita Personal seleccionada');
  }

  /**
   * 🌐 Flujo completo de inicio de creación de cita
   */
  async startCreateCitaFlow(): Promise<void> {
    await this.clickAgregarCita();
    await this.selectCitaPersonal();
    
    console.log('✅ Flujo de creación de cita iniciado');
  }
}