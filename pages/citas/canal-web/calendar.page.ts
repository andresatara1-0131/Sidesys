// 📁 pages/citas/canal-web/calendar.page.ts
// 📅 Page Object para selección de fecha y hora

import { Page } from '@playwright/test'; // 🧩 Importar Playwright
import { CitasBasePage } from '../citas-base.page'; // 🏗️ Base de Citas

export class CitasCalendarPage extends CitasBasePage {
  constructor(page: Page) {
    super(page); // 🏗️ Constructor padre
  }

  /**
   * 📅 Esperar a que el calendario esté visible
   */
  async waitForCalendar(): Promise<void> {
    const calendarBody = this.page.locator('.mat-calendar-body'); // 🔍 Cuerpo del calendario
    
    await calendarBody.first().waitFor({ state: 'visible', timeout: 15000 }); // 👀 Esperar visibilidad
    
    console.log('✅ Calendario cargado y visible'); // 📝 Log de confirmación
  }

  /**
   * 🔍 Obtener botones de días habilitados
   * @returns Locator de días habilitados
   */
  getEnabledDayButtons() {
    return this.page.locator([
      'td.mat-calendar-body-cell:not(.mat-calendar-body-disabled) .mat-calendar-body-cell-content',
      'td[role="gridcell"]:not(.mat-calendar-body-disabled) .mat-calendar-body-cell-content', 
      'button.mat-calendar-body-cell-content:not([aria-disabled="true"])'
    ].join(', ')); // 🎯 Selectores de días habilitados
  }

  /**
   * 🎯 Seleccionar día específico en el calendario
   * @param dayNumber - Número del día a seleccionar
   */
  async selectDay(dayNumber: number): Promise<void> {
    await this.waitForCalendar(); // ⏳ Esperar calendario
    
    const dayButtons = this.getEnabledDayButtons(); // 🔍 Días habilitados
    const dayElement = dayButtons.filter({ hasText: dayNumber.toString() }).first(); // 🎯 Día específico
    
    await dayElement.scrollIntoViewIfNeeded(); // 📜 Scroll si es necesario
    await expect(dayElement).toBeVisible({ timeout: 5000 }); // 👀 Esperar visibilidad
    await expect(dayElement).toBeEnabled({ timeout: 5000 }); // ✅ Esperar habilitado
    
    await dayElement.click({ timeout: 10000 }); // 👆 Hacer clic
    await this.page.waitForTimeout(5000); // ⏳ Esperar carga de horarios
    
    console.log(`✅ Día seleccionado: ${dayNumber}`); // 📝 Log de confirmación
  }

  /**
   * ⏰ Seleccionar hora específica
   * @param time - Hora a seleccionar (formato HH:MM)
   */
  async selectTime(time: string): Promise<void> {
    const timeButton = this.page.getByText(time); // 🔍 Botón de hora
    
    await timeButton.click(); // 👆 Hacer clic
    await this.page.waitForTimeout(200); // ⏳ Esperar breve
    
    console.log(`✅ Hora seleccionada: ${time}`); // 📝 Log de confirmación
  }

  /**
   * 🔄 Expandir todas las secciones de horarios
   * @param maxClicks - Máximo de clics a intentar
   */
  async expandAllSections(maxClicks: number = 5): Promise<void> {
    for (let i = 0; i < maxClicks; i++) {
      const expandMore = this.page.getByRole('button').filter({ hasText: 'expand_more' }).first(); // 🔍 Botón expandir
      
      if (await expandMore.isVisible().catch(() => false)) {
        await expandMore.click().catch(() => {}); // 👆 Hacer clic silencioso
        await this.page.waitForTimeout(200); // ⏳ Esperar breve
      } else {
        break; // 🛑 Salir si no hay más botones
      }
    }
    
    console.log('✅ Secciones de horarios expandidas'); // 📝 Log de confirmación
  }

  /**
   * 🎯 Intentar seleccionar día y hora disponibles
   * @param dayNumber - Número del día a intentar
   * @param preferredTimes - Horarios preferidos en orden de prioridad
   * @returns boolean indicando si tuvo éxito
   */
  async trySelectDayAndTime(dayNumber: number, preferredTimes: string[]): Promise<boolean> {
    try {
      await this.selectDay(dayNumber); // 📅 Seleccionar día
      await this.expandAllSections(); // 🔄 Expandir secciones

      // 🔍 Buscar horarios preferidos en orden
      for (const time of preferredTimes) {
        const timeButton = this.page.getByText(time); // 🔍 Botón de hora
        
        if (await timeButton.isVisible().catch(() => false)) {
          await this.selectTime(time); // ⏰ Seleccionar hora
          await this.clickContinuar(); // 🔄 Clic en Continuar
          return true; // ✅ Éxito
        }
      }
      
      return false; // ❌ No se encontraron horarios
    } catch (error) {
      console.log(`❌ Error seleccionando día ${dayNumber}: ${error}`); // ❌ Log error
      return false; // ❌ Falló
    }
  }

  /**
   * 📅 Seleccionar fecha y hora disponibles (hoy o futuro)
   * @param preferredTimes - Horarios preferidos
   */
  async selectAvailableDateAndTime(preferredTimes: string[] = ['12:30', '12:45', '13:15', '13:30', '13:45', '14:00']): Promise<void> {
    await this.waitForCalendar(); // ⏳ Esperar calendario
    
    const todayNumber = new Date().getDate(); // 📅 Obtener día actual
    const dayButtons = this.getEnabledDayButtons(); // 🔍 Días habilitados
    
    // 📊 Obtener números de días habilitados
    const dayNumbers: { index: number; day: number }[] = await dayButtons.evaluateAll((nodes) =>
      nodes
        .map((n, i) => {
          const text = (n.textContent || '').replace(/\D/g, ''); // 🔢 Extraer número
          const num = parseInt(text, 10); // 🔢 Convertir a número
          return Number.isFinite(num) ? { index: i, day: num } : null; // 🎯 Mapear índice y día
        })
        .filter(Boolean) as { index: number; day: number }[] // 🧹 Filtrar nulos
    );

    // 📈 Ordenar días y filtrar hoy/futuro
    dayNumbers.sort((a, b) => a.day - b.day); // 🔼 Ordenar ascendente
    const candidates = dayNumbers.filter(d => d.day >= todayNumber); // 🎯 Días hoy/futuro

    // 🔄 Intentar cada día candidato
    for (const candidate of candidates) {
      const success = await this.trySelectDayAndTime(candidate.day, preferredTimes); // 🎯 Intentar selección
      if (success) {
        console.log(`✅ Fecha y hora seleccionadas exitosamente`); // 📝 Log éxito
        return; // 🏁 Salir si tuvo éxito
      }
    }

    throw new Error('❌ No se encontraron horarios disponibles en HOY ni días futuros'); // 🚫 Error si ningún día funcionó
  }
}