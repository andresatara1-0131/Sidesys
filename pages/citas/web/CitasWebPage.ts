// src/pages/citas/web/CitasWebPage.ts
// ================================================================
// PAGE OBJECT: CANAL WEB DE CITAS (NO REQUIERE LOGIN)
// - Acciones: buscar disponibilidad, agendar cita, confirmar.
// - Simula flujo de usuario externo.
// ================================================================

import { Page } from '@playwright/test';

export class CitasWebPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Busca disponibilidad por fecha y especialidad
   * @param fecha - Fecha en formato YYYY-MM-DD
   * @param especialidad - Nombre de la especialidad
   */
  async buscarDisponibilidad(fecha: string, especialidad: string) {
    await this.page.fill('#fecha', fecha);                      // ← Seleccionar fecha
    await this.page.selectOption('#especialidad', especialidad); // ← Seleccionar especialidad
    await this.page.click('button:has-text("Buscar")');         // ← Clic en Buscar
  }

  /**
   * Selecciona un horario disponible y confirma cita
   */
  async agendarCita() {
    await this.page.click('.horario-disponible');               // ← Seleccionar primer horario
    await this.page.click('button:has-text("Confirmar Cita")'); // ← Confirmar cita
    await this.page.waitForSelector('text=Cita agendada', { timeout: 5000 }); // ← Validar éxito
  }
}