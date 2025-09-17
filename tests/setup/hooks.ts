// 📁 tests/setup/hooks.ts

// 🎯 Importa la función base de Playwright para extenderla
import { test as base } from '@playwright/test';

// 📦 Módulo para manejar el sistema de archivos
import fs from 'fs';

// 🛤️ Módulo para construir rutas de archivos de forma segura
import path from 'path';

// 🔁 Hook que se ejecuta después de cada test
base.afterEach(async ({ page }, testInfo) => {
  // 🕒 Obtener la fecha y hora actual para generar un timestamp único
  const now = new Date();
  const timestamp = now.toISOString()
    .replace(/[:.]/g, '-') // Reemplaza caracteres no válidos para nombres de archivo
    .replace('T', '_')
    .split('Z')[0];

  // 🧪 Limpiar el nombre del test para usarlo como nombre de archivo
  const testName = testInfo.title.replace(/[^a-zA-Z0-9]/g, '_');

  // 📁 Crear carpeta 'evidencias' si no existe
  const evidenciasDir = path.join(process.cwd(), 'evidencias');
  if (!fs.existsSync(evidenciasDir)) {
    fs.mkdirSync(evidenciasDir);
  }

  // 📸 Captura de pantalla al final del test
  const screenshotPath = path.join(evidenciasDir, `${testName}_${timestamp}.png`);
  await page.screenshot({ path: screenshotPath, fullPage: true });

  // 🎥 Guardar el video del test (si existe)
  if (testInfo.video) {
    const [videoPath] = testInfo.video;
    const videoDest = path.join(evidenciasDir, `${testName}_${timestamp}.webm`);
    fs.copyFileSync(videoPath, videoDest);
  }
});