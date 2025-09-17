// playwright.config.ts
// ================================================================
// CONFIGURACIÓN PRINCIPAL DE PLAYWRIGHT
// - Define timeouts, reportes, dispositivos, variables de entorno.
// - Configura evidencias: screenshots, videos, trace.
// - Fuerza Chrome, español, 1920x1080, permisos de ubicación.
// - Evidencias por cada paso clave (no solo al final).
// ================================================================

import { defineConfig } from '@playwright/test';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig(); // ← Carga variables de entorno desde .env

export default defineConfig({
  testDir: './tests',                    // ← Carpeta donde están tus tests
  timeout: 180000,                        // ← Tiempo máximo por test (180s)
  expect: {
    timeout: 10000,                      // ← Tiempo máximo para expect (10s)
  },
  fullyParallel: false,                  // ← false = tests en orden (mejor para login)
  workers: 1,                            // ← 1 worker = evita conflictos de sesión
  reporter: [
    ['html', { outputFolder: 'test-report', open: 'never' }], // ← Reporte HTML (no se abre automático)
    ['list'],                            // ← Reporte en consola (rápido y claro)
  ],
  use: {
    // ← Configuración del navegador
    channel: 'chrome',                   // ← Forzar Chrome (no Chromium)
    locale: 'es-ES',                     // ← Español
    viewport: { width: 1920, height: 1080 }, // ← Resolución HD 1920x1080
    permissions: ['geolocation'],        // ← Permiso de ubicación
    ignoreHTTPSErrors: true,             // ← Ignorar errores HTTPS (si aplica)

    // ← Evidencias automáticas
    screenshot: 'on',                    // ← Captura screenshot en TODOS los tests (exitosos o fallidos)
    video: 'on',                         // ← Graba video en TODOS los tests (HD, para revisión completa)
    trace: 'on-first-retry',             // ← Graba trace si se reintentan

    // ← Contexto persistente
    baseURL: process.env.SUITE_URL,      // ← URL base desde .env
  },

  // ← Proyectos (solo Chrome por ahora)
  projects: [
    {
      name: 'chrome',
      use: {
        channel: 'chrome',               // ← Fuerza Chrome real
        locale: 'es-ES',                 // ← Español
        viewport: { width: 1920, height: 1080 }, // ← Resolución HD
        permissions: ['geolocation'],    // ← Permiso de ubicación
      },
    },
  ],
});