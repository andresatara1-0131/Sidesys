// pages/RegistroClientePage.ts
// ================================================================
// PAGE OBJECT: REGISTRO DE CLIENTE EN CANAL WEB
// - Encapsula toda la lógica de registro, políticas, reintentos.
// - Simula comportamiento humano real: espera, scroll, clicks.
// - Valida campos: texto vs números, coincidencia de confirmaciones.
// - Toma evidencia (screenshot) después de cada paso clave.
// ================================================================

import { Page } from '@playwright/test';
import {
  generateRandomName,
  generateRandomLastName,
  generateRandomDocument,
  generateRandomPhone,
  generateRandomEmail,
  generateRandomCellphone,
  documentTypes,
  prefixes,
} from '../utils/testData';

export class RegistroClientePage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Aceptar popup inicial (cookies o términos)
   */
  async aceptarPopupInicial() {
    await this.page.waitForSelector('button:has-text("Aceptar")', { timeout: 5000 });
    await this.page.getByRole('button', { name: 'Aceptar' }).click();
    await this.page.screenshot({ path: 'evidencias/paso-01-popup-inicial.png' });
  }

  /**
   * Ir a formulario de registro
   */
  async irARegistro() {
    await this.page.waitForSelector('button:has-text("Continuar")', { timeout: 5000 });
    await this.page.getByRole('button', { name: 'Continuar' }).click();
    await this.page.screenshot({ path: 'evidencias/paso-02-continuar.png' });

    await this.page.waitForSelector('button:has-text("Registrarme")', { timeout: 5000 });
    await this.page.getByRole('button', { name: 'Registrarme' }).click();
    await this.page.screenshot({ path: 'evidencias/paso-03-formulario.png' });
  }

  /**
   * Llenar campo Nombre (solo texto, sin números)
   * @param nombre - String con solo letras y espacios
   */
  async llenarNombre(nombre: string) {
    if (/\d/.test(nombre)) {
      throw new Error(`[VALIDACIÓN FALLIDA] El nombre "${nombre}" contiene números. Solo se permiten letras.`);
    }
    await this.page.getByRole('textbox', { name: 'Nombre' }).fill(nombre);
    await this.page.screenshot({ path: 'evidencias/nombre-validado.png' });
  }

  /**
   * Llenar campo Apellido (solo texto, sin números)
   * @param apellido - String con solo letras y espacios
   */
  async llenarApellido(apellido: string) {
    if (/\d/.test(apellido)) {
      throw new Error(`[VALIDACIÓN FALLIDA] El apellido "${apellido}" contiene números. Solo se permiten letras.`);
    }
    await this.page.getByRole('textbox', { name: 'Apellido' }).fill(apellido);
    await this.page.screenshot({ path: 'evidencias/apellido-validado.png' });
  }

  /**
   * Seleccionar Tipo de Documento
   * @param tipoDocumento - Ej: "DNI", "Pasaporte"
   */
  async seleccionarTipoDocumento(tipoDocumento: string) {
    await this.page.getByRole('combobox', { name: 'Tipo de documento' }).locator('span').click();
    await this.page.getByText(tipoDocumento).click();
    await this.page.screenshot({ path: 'evidencias/tipo-documento-seleccionado.png' });
  }

  /**
   * Llenar Número de Documento (solo números)
   * @param numeroDocumento - String con solo dígitos
   */
  async llenarNumeroDocumento(numeroDocumento: string) {
    if (/\D/.test(numeroDocumento)) {
      throw new Error(`[VALIDACIÓN FALLIDA] El número de documento "${numeroDocumento}" contiene caracteres no numéricos.`);
    }
    await this.page.getByRole('textbox', { name: 'Numero de documento' }).fill(numeroDocumento);
    await this.page.screenshot({ path: 'evidencias/documento-validado.png' });
  }

  /**
   * Llenar Teléfono (solo números)
   * @param telefono - String con solo dígitos
   */
  async llenarTelefono(telefono: string) {
    if (/\D/.test(telefono)) {
      throw new Error(`[VALIDACIÓN FALLIDA] El teléfono "${telefono}" contiene caracteres no numéricos.`);
    }
    await this.page.getByRole('textbox', { name: 'Telefono', exact: true }).fill(telefono);
    await this.page.screenshot({ path: 'evidencias/telefono-llenado.png' });
  }

  /**
   * Confirmar Teléfono (debe coincidir con el teléfono anterior)
   * @param telefono - Teléfono original
   * @param confirmarTelefono - Debe ser igual a telefono
   */
  async confirmarTelefono(telefono: string, confirmarTelefono: string) {
    if (telefono !== confirmarTelefono) {
      throw new Error(`[VALIDACIÓN FALLIDA] El teléfono "${telefono}" y su confirmación "${confirmarTelefono}" no coinciden.`);
    }
    await this.page.getByRole('textbox', { name: 'Confirmar telefono *' }).fill(confirmarTelefono);
    await this.page.screenshot({ path: 'evidencias/telefono-confirmado.png' });
  }

  /**
   * Llenar Correo Electrónico
   * @param email - String con formato de email
   */
  async llenarEmail(email: string) {
    await this.page.getByRole('textbox', { name: 'Correo electrónico', exact: true }).fill(email);
    await this.page.screenshot({ path: 'evidencias/email-llenado.png' });
  }

  /**
   * Confirmar Correo Electrónico (debe coincidir con el anterior)
   * @param email - Email original
   * @param confirmarEmail - Debe ser igual a email
   */
  async confirmarEmail(email: string, confirmarEmail: string) {
    if (email !== confirmarEmail) {
      throw new Error(`[VALIDACIÓN FALLIDA] El email "${email}" y su confirmación "${confirmarEmail}" no coinciden.`);
    }
    await this.page.getByRole('textbox', { name: 'Confirmar correo electrónico *' }).fill(confirmarEmail);
    await this.page.screenshot({ path: 'evidencias/email-confirmado.png' });
  }

  /**
   * Seleccionar Prefijo
   * @param prefijo - Ej: "Argentina (54)"
   */
  async seleccionarPrefijo(prefijo: string) {
    await this.page.getByRole('combobox', { name: 'Prefijo' }).locator('span').click();
    await this.page.getByText(prefijo).click();
    await this.page.screenshot({ path: 'evidencias/prefijo-seleccionado.png' });
  }

  /**
   * Llenar Celular (solo números)
   * @param celular - String con solo dígitos
   */
  async llenarCelular(celular: string) {
    if (/\D/.test(celular)) {
      throw new Error(`[VALIDACIÓN FALLIDA] El celular "${celular}" contiene caracteres no numéricos.`);
    }
    await this.page.getByRole('textbox', { name: 'Celular' }).fill(celular);
    await this.page.screenshot({ path: 'evidencias/celular-llenado.png' });
  }

  /**
   * Llenar CustomField1
   * @param customField - String
   */
  async llenarCustomField(customField: string) {
    await this.page.getByRole('textbox', { name: 'CustomField1' }).fill(customField);
    await this.page.screenshot({ path: 'evidencias/customfield-llenado.png' });
  }

  /**
   * Aceptar políticas (hace scroll hasta el final del popup)
   */
  async aceptarPoliticas() {
    await this.page.waitForSelector('.politicas-container', { timeout: 5000 });
    const politicas = this.page.locator('.politicas-container');
    await politicas.scrollIntoViewIfNeeded();
    await politicas.evaluate((el) => { el.scrollTop = el.scrollHeight; });
    await this.page.locator('.mat-checkbox-inner-container').click();
    await this.page.getByRole('button', { name: 'Aceptar' }).click();
    await this.page.screenshot({ path: 'evidencias/politicas-aceptadas.png' });
  }

  /**
   * Confirmar registro
   */
  async confirmarRegistro() {
    await this.page.getByRole('button', { name: 'Confirmar' }).click();
    await this.page.screenshot({ path: 'evidencias/registro-confirmado.png' });
  }

  /**
   * Verificar mensaje de error "Ya existe un usuario"
   */
  async existeMensajeUsuarioExistente(): Promise<boolean> {
    const existe = await this.page.getByText('Ya existe un usuario').isVisible();
    if (existe) {
      await this.page.screenshot({ path: 'evidencias/error-usuario-existente.png' });
    }
    return existe;
  }

  /**
   * Verificar mensaje de éxito "Te has registrado"
   */
  async existeMensajeExito(): Promise<boolean> {
    const exito = await this.page.getByText('Te has registrado').isVisible();
    if (exito) {
      await this.page.screenshot({ path: 'evidencias/exito-registro.png' });
    }
    return exito;
  }
}