import { Page, TestInfo } from '@playwright/test';
/**
 * 📸 Capturar evidencia con timestamp
 * @param page - Página de Playwright
 * @param testInfo - Información del test
 * @param name - Nombre descriptivo de la evidencia
 */
export declare function captureEvidence(page: Page, testInfo: TestInfo, name: string): Promise<void>;
/**
 * 🎲 Obtener elemento aleatorio de un array
 * @param array - Array de elementos
 * @returns Elemento aleatorio
 */
export declare function getRandomItem<T>(array: T[]): T;
/**
 * ⏳ Esperar con timeout configurable
 * @param ms - Milisegundos a esperar
 */
export declare function wait(ms: number): Promise<void>;
/**
 * 🔍 Esperar que elemento esté visible y habilitado
 * @param page - Página de Playwright
 * @param selector - Selector del elemento
 * @param timeout - Timeout en milisegundos
 */
export declare function waitForEnabled(page: Page, selector: string, timeout?: number): Promise<void>;
//# sourceMappingURL=helpers.d.ts.map