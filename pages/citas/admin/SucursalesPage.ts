// src/pages/citas/admin/SucursalesPage.ts
// ================================================================
// PAGE OBJECT: MÓDULO DE SUCURSALES (CITAS ADMIN)
// - Acciones: crear sucursal, llenar formulario, guardar.
// - Comportamiento humano: clics, esperas, validaciones.
// ================================================================

import { Page } from '@playwright/test';

export class SucursalesPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Abre formulario para crear nueva sucursal
   */
  async abrirFormulario() {
    await this.page.click('button:has-text("Nueva Sucursal")'); // ← Clic para abrir formulario
  }

  /**
   * Llena el formulario de sucursal
   * @param data - Objeto con nombre, dirección, teléfono
   */
  async llenarFormulario(data: { nombre: string; direccion: string; telefono: string }) {
    await this.page.fill('#nombre', data.nombre);               // ← Campo Nombre
    await this.page.fill('#direccion', data.direccion);         // ← Campo Dirección
    await this.page.fill('#telefono', data.telefono);           // ← Campo Teléfono
  }

  /**
   * Guarda la sucursal y valida mensaje de éxito
   */
  async guardarYValidar() {
    await this.page.click('button:has-text("Guardar")');        // ← Clic en Guardar
    await this.page.waitForSelector('text=Sucursal creada', { timeout: 5000 }); // ← Validar éxito
  }
}