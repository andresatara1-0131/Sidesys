// src/pages/citas/admin/ServiciosPage.ts
// ================================================================
// PAGE OBJECT: MÓDULO DE SERVICIOS / GRUPOS DE SERVICIOS (CITAS ADMIN)
// - Encapsula acciones comunes: crear, editar, eliminar grupos.
// - Cada método simula lo que haría un humano.
// - Reutilizable en múltiples tests.
// ================================================================

import { Page } from '@playwright/test';     // ← Importa tipo Page

export class ServiciosPage {
  private page: Page;                       // ← Almacena la página actual

  constructor(page: Page) {
    this.page = page;                       // ← Inyecta la página
  }

  /**
   * Crea un nuevo grupo de servicios
   * @param data - Objeto con nombre, descripción y estado
   */
  async crearGrupo(data: { nombre: string; descripcion: string; estado: string }) {
    await this.page.click('button:has-text("Nuevo Grupo")');   // ← Abrir formulario (clic humano)
    await this.page.fill('#nombre', data.nombre);              // ← Llenar campo "Nombre"
    await this.page.fill('#descripcion', data.descripcion);    // ← Llenar campo "Descripción"
    await this.page.selectOption('#estado', data.estado);      // ← Seleccionar "Estado"
  }

  /**
   * Guarda el formulario actual (simula clic en botón "Guardar")
   */
  async guardar() {
    await this.page.click('button:has-text("Guardar")');       // ← Clic en "Guardar" (como humano)
  }

  /**
   * Valida que aparezca mensaje de éxito (espera explícita)
   */
  async validarExito() {
    await this.page.waitForSelector('text=Éxito', { timeout: 5000 }); // ← Esperar mensaje (5s)
  }
}