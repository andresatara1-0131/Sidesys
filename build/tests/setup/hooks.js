"use strict";
// 📁 tests/setup/hooks.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// 🎯 Importa la función base de Playwright para extenderla
const test_1 = require("@playwright/test");
// 📦 Módulo para manejar el sistema de archivos
const fs_1 = __importDefault(require("fs"));
// 🛤️ Módulo para construir rutas de archivos de forma segura
const path_1 = __importDefault(require("path"));
// 🔁 Hook que se ejecuta después de cada test
test_1.test.afterEach(async ({ page }, testInfo) => {
    // 🕒 Obtener la fecha y hora actual para generar un timestamp único
    const now = new Date();
    const timestamp = now.toISOString()
        .replace(/[:.]/g, '-') // Reemplaza caracteres no válidos para nombres de archivo
        .replace('T', '_')
        .split('Z')[0];
    // 🧪 Limpiar el nombre del test para usarlo como nombre de archivo
    const testName = testInfo.title.replace(/[^a-zA-Z0-9]/g, '_');
    // 📁 Crear carpeta 'evidencias' si no existe
    const evidenciasDir = path_1.default.join(process.cwd(), 'evidencias');
    if (!fs_1.default.existsSync(evidenciasDir)) {
        fs_1.default.mkdirSync(evidenciasDir);
    }
    // 📸 Captura de pantalla al final del test
    const screenshotPath = path_1.default.join(evidenciasDir, `${testName}_${timestamp}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: true });
    // 🎥 Guardar el video del test (si existe)
    if (testInfo.video) {
        const [videoPath] = testInfo.video;
        const videoDest = path_1.default.join(evidenciasDir, `${testName}_${timestamp}.webm`);
        fs_1.default.copyFileSync(videoPath, videoDest);
    }
});
//# sourceMappingURL=hooks.js.map