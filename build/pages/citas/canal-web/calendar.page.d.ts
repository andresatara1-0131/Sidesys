import { Page } from '@playwright/test';
import { CitasBasePage } from '../citas-base.page';
export declare class CitasCalendarPage extends CitasBasePage {
    constructor(page: Page);
    /**
     * 📅 Esperar a que el calendario esté visible
     */
    waitForCalendar(): Promise<void>;
    /**
     * 🔍 Obtener botones de días habilitados
     * @returns Locator de días habilitados
     */
    getEnabledDayButtons(): import("playwright-core").Locator;
    /**
     * 🎯 Seleccionar día específico en el calendario
     * @param dayNumber - Número del día a seleccionar
     */
    selectDay(dayNumber: number): Promise<void>;
    /**
     * ⏰ Seleccionar hora específica
     * @param time - Hora a seleccionar (formato HH:MM)
     */
    selectTime(time: string): Promise<void>;
    /**
     * 🔄 Expandir todas las secciones de horarios
     * @param maxClicks - Máximo de clics a intentar
     */
    expandAllSections(maxClicks?: number): Promise<void>;
    /**
     * 🎯 Intentar seleccionar día y hora disponibles
     * @param dayNumber - Número del día a intentar
     * @param preferredTimes - Horarios preferidos en orden de prioridad
     * @returns boolean indicando si tuvo éxito
     */
    trySelectDayAndTime(dayNumber: number, preferredTimes: string[]): Promise<boolean>;
    /**
     * 📅 Seleccionar fecha y hora disponibles (hoy o futuro)
     * @param preferredTimes - Horarios preferidos
     */
    selectAvailableDateAndTime(preferredTimes?: string[]): Promise<void>;
}
//# sourceMappingURL=calendar.page.d.ts.map