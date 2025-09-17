//tests/Citas/hooks/loginCitas.ts
// Hook para login y navegación a módulo de Citas

import { Page } from '@playwright/test'; // 🧩 Importar Playwright
import { loginToSuite } from '../../../utils/helpers'; // 🧩 Importar función de login

export async function loginCitas(page: Page): Promise<void> {
  await loginToSuite(page); // 🔐 Login a Suite
  await page.getByRole('link', { name: /Productos/i }).click(); // 📂 Hacer clic en "Productos"
  const [popup] = await Promise.all([
    page.waitForEvent('popup'), // 🔍 Esperar popup
    page.getByRole('button', { name: /Ver/i }).click(), // 👁️ Hacer clic en "Ver"
  ]);
  const targetURL = popup.url(); // 🔗 Obtener URL del popup
  await popup.close(); // 🔒 Cerrar popup
  await page.goto(targetURL); // 🌐 Navegar a la URL del popup
  await page.waitForURL('**/CitasBO/pages', { timeout: 30000 }); // 🕒 Esperar carga de Citas
  await page.waitForLoadState('networkidle'); // 🕒 Esperar que la red esté ociosa
  await page.waitForTimeout(5000); // 🕒 Espera adicional
}