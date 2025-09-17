// pages/RegistroClientePage.ts
// ================================================================
// PAGE OBJECT: REGISTRO DE CLIENTE EN CANAL WEB
// - Encapsula toda la lógica de registro, políticas, reintentos.
// - Simula comportamiento humano real: espera, scroll, clicks.
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
    // Esperar a que el botón "Aceptar" esté visible
    await this.page.waitForSelector('button:has-text("Aceptar")', { timeout: 5000 });
    await this.page.getByRole('button', { name: 'Aceptar' }).click(); // ← Clic en Aceptar
    await this.page.screenshot({ path: 'evidencias/paso-01-popup-inicial.png' }); // ← Evidencia
  }

  /**
   * Ir a formulario de registro
   */
  async irARegistro() {
    // Esperar a que el botón "Continuar" esté visible
    await this.page.waitForSelector('button:has-text("Continuar")', { timeout: 5000 });
    await this.page.getByRole('button', { name: 'Continuar' }).click(); // ← Clic en Continuar
    await this.page.screenshot({ path: 'evidencias/paso-02-continuar.png' }); // ← Evidencia

    // Esperar a que el botón "Registrarme" esté visible
    await this.page.waitForSelector('button:has-text("Registrarme")', { timeout: 5000 });
    await this.page.getByRole('button', { name: 'Registrarme' }).click(); // ← Clic en Registrarme
    await this.page.screenshot({ path: 'evidencias/paso-03-formulario.png' }); // ← Evidencia
  }

  /**
   * Llenar formulario con datos aleatorios
   * @param data - Objeto con datos (si no se pasa, genera aleatorios)
   */
  async llenarFormulario(data?: {
    nombre?: string;
    apellido?: string;
    tipoDocumento?: string;
    numeroDocumento?: string;
    telefono?: string;
    email?: string;
    prefijo?: string;
    celular?: string;
    customField?: string;
  }) {
    const nombre = data?.nombre || generateRandomName();
    const apellido = data?.apellido || generateRandomLastName();
    const tipoDocumento = data?.tipoDocumento || this.getRandomItem(documentTypes);
    const numeroDocumento = data?.numeroDocumento || generateRandomDocument();
    const telefono = data?.telefono || generateRandomPhone();
    const email = data?.email || generateRandomEmail();
    const prefijo = data?.prefijo || this.getRandomItem(prefixes);
    const celular = data?.celular || generateRandomCellphone();
    const customField = data?.customField || 'prueba';

    // Llenar campo Nombre
    await this.page.waitForSelector('input[name="Nombre"]', { timeout: 5000 });
    await this.page.getByRole('textbox', { name: 'Nombre' }).fill(nombre);

    // Llenar campo Apellido
    await this.page.waitForSelector('input[name="Apellido"]', { timeout: 5000 });
    await this.page.getByRole('textbox', { name: 'Apellido' }).fill(apellido);

    // Seleccionar Tipo de Documento
    await this.page.waitForSelector('mat-select[placeholder="Tipo de documento"]', { timeout: 5000 });
    await this.page.getByRole('combobox', { name: 'Tipo de documento' }).locator('span').click(); // ← Abrir dropdown
    await this.page.getByText(tipoDocumento).click(); // ← Seleccionar opción

    // Llenar Número de Documento
    await this.page.waitForSelector('input[name="Numero de documento"]', { timeout: 5000 });
    await this.page.getByRole('textbox', { name: 'Numero de documento' }).fill(numeroDocumento);

    // Llenar Teléfono
    await this.page.waitForSelector('input[name="Telefono"]', { timeout: 5000 });
    await this.page.getByRole('textbox', { name: 'Telefono', exact: true }).fill(telefono);

    // Llenar Confirmar Teléfono
    await this.page.waitForSelector('input[name="Confirmar telefono"]', { timeout: 5000 });
    await this.page.getByRole('textbox', { name: 'Confirmar telefono *' }).fill(telefono);

    // Llenar Correo Electrónico
    await this.page.waitForSelector('input[name="Correo electrónico"]', { timeout: 5000 });
    await this.page.getByRole('textbox', { name: 'Correo electrónico', exact: true }).fill(email);

    // Llenar Confirmar Correo Electrónico
    await this.page.waitForSelector('input[name="Confirmar correo electrónico"]', { timeout: 5000 });
    await this.page.getByRole('textbox', { name: 'Confirmar correo electrónico *' }).fill(email);

    // Seleccionar Prefijo
    await this.page.waitForSelector('mat-select[placeholder="Prefijo"]', { timeout: 5000 });
    await this.page.getByRole('combobox', { name: 'Prefijo' }).locator('span').click(); // ← Abrir dropdown
    await this.page.getByText(prefijo).click(); // ← Seleccionar opción

    // Llenar Celular
    await this.page.waitForSelector('input[name="Celular"]', { timeout: 5000 });
    await this.page.getByRole('textbox', { name: 'Celular' }).fill(celular);

    // Llenar CustomField1
    await this.page.waitForSelector('input[name="CustomField1"]', { timeout: 5000 });
    await this.page.getByRole('textbox', { name: 'CustomField1' }).fill(customField);

    await this.page.screenshot({ path: 'evidencias/paso-04-formulario-llenado.png' }); // ← Evidencia
  }

  /**
   * Aceptar políticas (hace scroll hasta el final del popup para habilitar botón)
   */
  async aceptarPoliticas() {
    // Esperar a que el popup de políticas esté visible
    await this.page.waitForSelector('.politicas-container', { timeout: 5000 });

    // Hacer scroll hasta el final del popup (para activar el botón "Aceptar")
    const politicas = this.page.locator('.politicas-container');
    await politicas.scrollIntoViewIfNeeded();
    await politicas.evaluate((el) => {
      el.scrollTop = el.scrollHeight; // ← Scroll hasta el final
    });

    // Marcar checkbox de aceptación
    await this.page.locator('.mat-checkbox-inner-container').click();

    // Clic en "Aceptar"
    await this.page.getByRole('button', { name: 'Aceptar' }).click();
    await this.page.screenshot({ path: 'evidencias/paso-05-politicas-aceptadas.png' }); // ← Evidencia
  }

  /**
   * Confirmar registro
   */
  async confirmarRegistro() {
    await this.page.waitForSelector('button:has-text("Confirmar")', { timeout: 5000 });
    await this.page.getByRole('button', { name: 'Confirmar' }).click(); // ← Clic en Confirmar
    await this.page.screenshot({ path: 'evidencias/paso-06-confirmar.png' }); // ← Evidencia
  }

  /**
   * Verificar si aparece mensaje de "Ya existe un usuario"
   */
  async existeMensajeUsuarioExistente(): Promise<boolean> {
    const existe = await this.page.getByText('Ya existe un usuario').isVisible();
    if (existe) {
      await this.page.screenshot({ path: 'evidencias/error-usuario-existente.png' }); // ← Evidencia de error
    }
    return existe;
  }

  /**
   * Verificar si aparece mensaje de éxito "Te has registrado"
   */
  async existeMensajeExito(): Promise<boolean> {
    const exito = await this.page.getByText('Te has registrado').isVisible();
    if (exito) {
      await this.page.screenshot({ path: 'evidencias/exito-registro.png' }); // ← Evidencia de éxito
    }
    return exito;
  }

  /**
   * Obtiene un ítem aleatorio de un array
   */
  private getRandomItem(array: string[]): string {
    return array[Math.floor(Math.random() * array.length)];
  }
}