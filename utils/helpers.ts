// 📁 utils/helpers.ts
// 🛠️ Utilidades corregidas

import { Page, TestInfo, expect } from '@playwright/test'; // ✅ Importar expect

export async function captureEvidence(page: Page, testInfo: TestInfo, name: string): Promise<void> {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const screenshotPath = `test-results/${name}_${timestamp}.png`;
  
  await page.screenshot({ path: screenshotPath, fullPage: true });
  console.log(`📸 Evidencia: ${screenshotPath}`);
}

export function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

// ✅ Función corregida con expect importado
export async function waitForEnabled(page: Page, selector: string, timeout = 10000): Promise<void> {
  const element = page.locator(selector);
  await element.waitFor({ state: 'visible', timeout });
  await expect(element).toBeEnabled({ timeout }); // ✅ Ahora funciona
}