// src/pages/idc/ReglasIdentificacionPage.ts
// ================================================================
// PAGE OBJECT: MÓDULO DE REGLAS DE IDENTIFICACIÓN (IDC)
// - Crear, editar, eliminar, buscar reglas.
// - Cada acción simulada como humano real.
// ================================================================

import { Page } from '@playwright/test';

export class ReglasIdentificacionPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Abre formulario para crear nueva regla
   */
  async abrirFormularioCrear() {
    await this.page.click('button:has-text("Nueva Regla")');    // ← Clic en "Nueva Regla"
  }

  /**
   * Llena formulario de regla
   * @param data - Objeto con nombre, tipo, prioridad
   */
  async llenarFormulario(data: { nombre: string; tipo: string; prioridad: string }) {
    await this.page.fill('#nombre', data.nombre);               // ← Campo Nombre
    await this.page.selectOption('#tipo', data.tipo);           // ← Selector Tipo
    await this.page.fill('#prioridad', data.prioridad);         // ← Campo Prioridad
  }

  /**
   * Guarda y valida éxito
   */
  async guardarYValidar() {
    await this.page.click('button:has-text("Guardar")');        // ← Clic en Guardar
    await this.page.waitForSelector('text=Regla creada', { timeout: 5000 }); // ← Validar
  }
}