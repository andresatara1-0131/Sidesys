// pages/citas/web/CrearCitaPage.ts
// ================================================================
// PAGE OBJECT: CREAR CITA EN CANAL WEB
// - Simula comportamiento humano real.
// - Toma evidencia en cada paso clave.
// - Reutiliza métodos de IngresoClientePage si aplica.
// ================================================================

import { Page } from '@playwright/test';
import { IngresoClientePage } from './IngresoClientePage';

export class CrearCitaPage {
  private page: Page;
  private ingresoPage: IngresoClientePage;

  constructor(page: Page) {
    this.page = page;
    this.ingresoPage = new IngresoClientePage(page);
  }

  /**
   * Iniciar sesión con usuario existente (reutiliza IngresoClientePage)
   * @param tipoDocumento - Ej: "DNI"
   * @param numeroDocumento - Número de documento del usuario
   */
  async iniciarSesion(tipoDocumento: string, numeroDocumento: string) {
    await this.page.goto('https://encuestas.sidesys.ar/CitasWeb/welcome');
    await this.ingresoPage.aceptarPopupInicial();
    await this.ingresoPage.irAIngreso();
    await this.ingresoPage.seleccionarTipoDocumento(tipoDocumento);
    await this.ingresoPage.llenarNumeroDocumento(numeroDocumento);
    await this.ingresoPage.hacerClicEnIngresar();
    await this.ingresoPage.validarIngresoExitoso();
    await this.page.screenshot({ path: 'evidencias/cita-paso-01-sesion-iniciada.png' });
  }

  /**
   * Hacer clic en "add" para iniciar creación de cita
   */
  async iniciarCreacionCita() {
    await this.page.waitForSelector('button[aria-label="add"]', { timeout: 5000 });
    await this.page.getByRole('button').filter({ hasText: 'add' }).click();
    await this.page.screenshot({ path: 'evidencias/cita-paso-02-iniciar-creacion.png' });
  }

  /**
   * Seleccionar tipo de cita "Cita Personal"
   */
  async seleccionarTipoCita() {
    await this.page.waitForSelector('mat-menu-content', { timeout: 5000 });
    await this.page.getByRole('menuitem', { name: 'Cita Personal' }).click();
    await this.page.screenshot({ path: 'evidencias/cita-paso-03-tipo-cita.png' });
  }

  /**
   * Seleccionar servicios (múltiples)
   * @param servicios - Array de nombres de servicios
   */
  async seleccionarServicios(servicios: string[]) {
    for (const servicio of servicios) {
      await this.page.waitForSelector(`mat-card:has-text("${servicio}")`, { timeout: 5000 });
      await this.page.locator(`mat-card`).filter({ hasText: servicio }).click();
      await this.page.screenshot({ path: `evidencias/cita-servicio-${servicio}.png` });
    }
  }

  /**
   * Hacer clic en "Continuar" (después de seleccionar servicios)
   */
  async continuarDespuesServicios() {
    await this.page.getByRole('button', { name: 'Continuar' }).click();
    await this.page.screenshot({ path: 'evidencias/cita-paso-04-continuar-servicios.png' });
  }

  /**
   * Seleccionar "Mi ubicación"
   */
  async seleccionarMiUbicacion() {
    await this.page.waitForSelector('button:has-text("Mi ubicación")', { timeout: 5000 });
    await this.page.getByRole('button', { name: 'Mi ubicación' }).click();
    await this.page.screenshot({ path: 'evidencias/cita-paso-05-mi-ubicacion.png' });
  }

  /**
   * Seleccionar país y sucursal
   * @param pais - Nombre del país (ej: "Colombia Calle 95 # 14 - 15")
   */
  async seleccionarPaisYSucursal(pais: string) {
    await this.page.waitForSelector(`mat-card:has-text("${pais}")`, { timeout: 5000 });
    await this.page.locator(`mat-card`).filter({ hasText: pais }).click();
    await this.page.screenshot({ path: `evidencias/cita-paso-06-sucursal-${pais.replace(/\s+/g, '_')}.png` });
  }

  /**
   * Hacer clic en "Continuar" (después de seleccionar sucursal)
   */
  async continuarDespuesSucursal() {
    await this.page.getByRole('button', { name: 'Continuar' }).click();
    await this.page.screenshot({ path: 'evidencias/cita-paso-07-continuar-sucursal.png' });
  }

  /**
   * Seleccionar tipo de atención "Presencial"
   */
  async seleccionarAtencionPresencial() {
    await this.page.waitForSelector('label[aria-label="getText(\'attentionType.personal.label\')"]', { timeout: 5000 });
    await this.page.getByLabel('getText(\'attentionType.personal.label\')').locator('svg').click();
    await this.page.screenshot({ path: 'evidencias/cita-paso-08-atencion-presencial.png' });
  }

  /**
   * Hacer clic en "Continuar" (después de seleccionar tipo de atención)
   */
  async continuarDespuesAtencion() {
    await this.page.getByRole('button', { name: 'Continuar' }).click();
    await this.page.screenshot({ path: 'evidencias/cita-paso-09-continuar-atencion.png' });
  }

  /**
   * Seleccionar fecha
   * @param fecha - Texto de la fecha (ej: "25 de septiembre de")
   */
  async seleccionarFecha(fecha: string) {
    await this.page.waitForSelector(`button:has-text("${fecha}")`, { timeout: 5000 });
    await this.page.getByRole('button', { name: fecha }).click();
    await this.page.screenshot({ path: `evidencias/cita-paso-10-fecha-${fecha.replace(/\s+/g, '_')}.png` });
  }

  /**
   * Navegar entre meses (si es necesario)
   * @param direccion - 'next' o 'prev'
   */
  async navegarMes(direccion: 'next' | 'prev') {
    const texto = direccion === 'next' ? 'navigate_next' : 'chevron_left';
    await this.page.getByRole('button').filter({ hasText: texto }).click();
    await this.page.screenshot({ path: `evidencias/cita-paso-11-navegar-${direccion}.png` });
  }

  /**
   * Seleccionar hora
   * @param hora - Texto de la hora (ej: "07:00")
   */
  async seleccionarHora(hora: string) {
    await this.page.waitForSelector(`text=${hora}`, { timeout: 5000 });
    await this.page.getByText(hora, { exact: true }).click();
    await this.page.screenshot({ path: `evidencias/cita-paso-12-hora-${hora.replace(':', '-')}.png` });
  }

  /**
   * Hacer clic en "Continuar" (después de seleccionar hora)
   */
  async continuarDespuesHora() {
    await this.page.getByRole('button', { name: 'Continuar' }).click();
    await this.page.screenshot({ path: 'evidencias/cita-paso-13-continuar-hora.png' });
  }

  /**
   * Confirmar cita
   */
  async confirmarCita() {
    await this.page.waitForSelector('button:has-text("Confirmar")', { timeout: 5000 });
    await this.page.getByRole('button', { name: 'Confirmar' }).click();
    await this.page.screenshot({ path: 'evidencias/cita-paso-14-confirmar.png' });
  }

  /**
   * Validar mensaje de éxito "Se ha guardado correctamente"
   */
  async validarExito() {
    await this.page.waitForSelector('text=Se ha guardado correctamente', { timeout: 10000 });
    await this.page.screenshot({ path: 'evidencias/cita-exito.png' });
  }
}