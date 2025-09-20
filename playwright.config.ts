/** Playwright config (pro) — español, geo, 1920×1080, aliases, screenshots y videos HD */

import 'tsconfig-paths/register';                         // ← Habilita @fixtures/@pages/@utils
import { defineConfig, devices } from '@playwright/test'; // ← Núcleo PW
import * as path from 'path';                             // ← Rutas
import * as fs from 'fs';                                 // ← FS
import dotenv from 'dotenv';                              // ← .env

dotenv.config({ path: path.resolve(process.cwd(), '.env') }); // ← Carga variables

const HEADLESS     = (process.env.HEADLESS ?? 'true') !== 'false'; // ← Headless por defecto
const SLOW_MO_MS   = Number(process.env.SLOW_MO_MS ?? '0');        // ← Delay “humano”
const LOCALE       = process.env.LOCALE ?? 'es-ES';                // ← Idioma
const TIMEZONE     = process.env.TIMEZONE ?? 'America/Bogota';     // ← Zona
const BROWSER_LANG = process.env.BROWSER_LANG ?? 'es-ES,es;q=0.9'; // ← Accept-Language
const GEO_LAT      = Number(process.env.GEO_LAT ?? '4.7110');      // ← Lat
const GEO_LON      = Number(process.env.GEO_LON ?? '-74.0721');    // ← Lon
const EVIDENCE_ROOT= process.env.EVIDENCE_ROOT ?? 'evidencias';    // ← Carpeta evidencias

fs.mkdirSync(EVIDENCE_ROOT, { recursive: true });                  // ← Asegura carpeta

export default defineConfig({
  testDir: 'tests',                                 // ← Carpeta de tests
  fullyParallel: true,                              // ← Paralelismo por archivo
  forbidOnly: !!process.env.CI,                     // ← Evita .only en CI
  retries: process.env.CI ? 1 : 0,                  // ← Reintento en CI
  timeout: 60_000,                                  // ← Timeout por test
  expect: { timeout: 10_000 },                      // ← Timeout expect

  reporter: [
    ['list'],                                       // ← Consola
    ['html', { outputFolder: 'test-report', open: 'never' }], // ← Reporte HTML
  ],

  outputDir: 'artifacts/tmp',                       // ← Artefactos temporales
  globalSetup: './config/alias-setup.ts',           // ← Precarga de aliases

  use: {
    baseURL: process.env.BASE_URL_SUITE,            // ← Base (Suite)
    viewport: { width: 1920, height: 1080 },        // ← Resolución (casará con el video)
    timezoneId: TIMEZONE,                           // ← Zona
    locale: LOCALE,                                 // ← Idioma navegador
    geolocation: { latitude: GEO_LAT, longitude: GEO_LON }, // ← Geo
    permissions: ['geolocation'],                   // ← Permisos
    extraHTTPHeaders: { 'Accept-Language': BROWSER_LANG },   // ← Idioma HTTP

    screenshot: 'only-on-failure',                  // ← Screenshots automáticos solo si falla (además de los nuestros)
    video: 'on',                                    // ← ✅ Graba video SIEMPRE
    recordVideo: { size: { width: 1280, height: 720 } }, // ← ✅ Fuerza HD

    trace: 'retain-on-failure',                     // ← Traza en fallos (útil)
    launchOptions: { headless: HEADLESS, slowMo: SLOW_MO_MS }, // ← Lanzamiento
  },

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'],  channel: 'chrome', baseURL: process.env.BASE_URL_SUITE } },
    { name: 'firefox',  use: { ...devices['Desktop Firefox'],                     baseURL: process.env.BASE_URL_SUITE } },
    { name: 'webkit',   use: { ...devices['Desktop Safari'],                      baseURL: process.env.BASE_URL_SUITE } }
  ],
});