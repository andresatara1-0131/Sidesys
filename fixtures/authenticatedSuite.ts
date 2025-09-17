// src/fixtures/authenticatedSuite.ts
// ================================================================
// FIXTURE: SESIÓN AUTENTICADA EN SUITE
// - Inicia sesión automáticamente antes de los tests que lo necesiten.
// - Reutiliza el contexto autenticado (como un humano que ya está logueado).
// - Ideal para pruebas en Citas Admin, IDC, etc.
// ================================================================

import { test as base } from '@playwright/test'; // ← Importa test base de Playwright
import { ENV } from '../config/env';            // ← Importa variables de entorno

// Extiende el test base para añadir un nuevo fixture: "authenticatedPage"
export const test = base.extend({
  authenticatedPage: async ({ page }, use) => {
    // Paso 1: Navegar a la página de login
    await page.goto(ENV.SUITE_URL + '/login');           // ← Ir a login (como humano)

    // Paso 2: Llenar campos de usuario y contraseña
    await page.fill('#username', ENV.USERNAME);          // ← Escribir usuario
    await page.fill('#password', ENV.PASSWORD);          // ← Escribir contraseña

    // Paso 3: Hacer clic en "Iniciar sesión"
    await page.click('button[type="submit"]');           // ← Clic en botón (como humano)

    // Paso 4: Esperar a que cargue el dashboard (no asumir, esperar)
    await page.waitForURL('**/dashboard', { timeout: 10000 }); // ← Esperar redirección (10s máximo)

    // Paso 5: Ceder la página autenticada al test
    await use(page); // ← ¡Reutiliza esta página en los tests!
  },
});

// Exporta expect para que los tests lo usen
export { expect } from '@playwright/test';