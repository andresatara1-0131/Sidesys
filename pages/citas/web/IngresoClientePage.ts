// pages/citas/web/IngresoClientePage.ts
// ================================================================
// PAGE OBJECT: INGRESO DE CLIENTE EN CANAL WEB
// - Simula comportamiento humano real.
// - Toma evidencia en cada paso clave.
// - Valida campos numéricos.
// - Reutiliza métodos de RegistroClientePage si aplica.
// ================================================================

import { Page } from '@playwright/test';
import { RegistroClientePage } from './RegistroClientePage'; // ← Importa desde la misma carpeta

export class IngresoClientePage {
  private page: Page;
  private registroPage: RegistroClientePage; // ← Para reutilizar métodos como aceptarPopupInicial

  constructor(page: Page) {
    this.page = page;
    this.registroPage = new RegistroClientePage(page); // ← Compartimos la misma página
  }

  /**
   * Aceptar popup inicial (cookies o términos) - Reutilizado
   */
  async aceptarPopupInicial() {
    await this.registroPage.aceptarPopupInicial(); // ← Reutiliza el método existente
  }

  /**
   * Ir a la sección de ingreso (clic en "Continuar")
   */
  async irAIngreso() {
    // Esperar a que el botón "Continuar" esté visible
    await this.page.waitForSelector('button:has-text("Continuar")', { timeout: 5000 });
    await this.page.getByRole('button', { name: 'Continuar' }).click(); // ← Clic en Continuar
    await this.page.screenshot({ path: 'evidencias/ingreso-paso-01-continuar.png' }); // ← Evidencia
  }

  /**
   * Seleccionar Tipo de Documento
   * @param tipoDocumento - Ej: "DNI", "Pasaporte"
   */
  async seleccionarTipoDocumento(tipoDocumento: string) {
    // Esperar a que el dropdown esté visible
    await this.page.waitForSelector('mat-select[placeholder="Tipo de documento"]', { timeout: 5000 });
    await this.page.getByRole('combobox', { name: 'Tipo de documento' }).locator('span').click(); // ← Abrir dropdown
    await this.page.getByText(tipoDocumento).click(); // ← Seleccionar opción
    await this.page.screenshot({ path: 'evidencias/ingreso-paso-02-tipo-documento.png' }); // ← Evidencia
  }

  /**
   * Llenar Número de Documento (solo números)
   * @param numeroDocumento - String con solo dígitos
   */
  async llenarNumeroDocumento(numeroDocumento: string) {
    // Validar que solo contenga números
    if (/\D/.test(numeroDocumento)) {
      throw new Error(`[VALIDACIÓN FALLIDA] El número de documento "${numeroDocumento}" contiene caracteres no numéricos.`);
    }
    // Llenar campo
    await this.page.getByRole('textbox', { name: 'Numero de documento' }).fill(numeroDocumento);
    await this.page.screenshot({ path: 'evidencias/ingreso-paso-03-numero-documento.png' }); // ← Evidencia
  }

  /**
   * Hacer clic en "Ingresar"
   */
  async hacerClicEnIngresar() {
    // Esperar a que el botón esté visible
    await this.page.waitForSelector('button:has-text("Ingresar")', { timeout: 5000 });
    await this.page.getByRole('button', { name: 'Ingresar' }).click(); // ← Clic en Ingresar
    await this.page.screenshot({ path: 'evidencias/ingreso-paso-04-ingresar.png' }); // ← Evidencia
  }

  /**
   * Validar mensaje de éxito "Has iniciado sesión correctamente"
   */
  async validarIngresoExitoso() {
    // Esperar mensaje de éxito
    await this.page.waitForSelector('text=Has iniciado sesión correctamente', { timeout: 10000 });
    await this.page.screenshot({ path: 'evidencias/ingreso-exito.png' }); // ← Evidencia de éxito
  }
}