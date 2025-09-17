// src/utils/helpers.ts
// ================================================================
// UTILIDADES GENERALES
// - Funciones reutilizables: esperas, generación de datos, etc.
// - Simulan comportamiento humano donde sea necesario.
// ================================================================

import { Page } from '@playwright/test';

/**
 * Espera explícita (solo usar si es estrictamente necesario)
 * @param page - Página actual
 * @param seconds - Segundos a esperar
 */
export async function waitForHuman(page: Page, seconds: number) {
  await page.waitForTimeout(seconds * 1000); // ← Espera "humana" (evitar si se puede)
}

/**
 * Genera un nombre aleatorio para pruebas
 * @returns string - Nombre aleatorio
 */
export function generateRandomName(): string {
  return `Test_${Math.random().toString(36).substring(2, 8)}`; // ← Ej: "Test_a1b2c3"
}