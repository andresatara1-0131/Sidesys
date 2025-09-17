"use strict";
// 📁 utils/helpers.ts
// 🛠️ Funciones de utilidad reutilizables para tests
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.captureEvidence = captureEvidence;
exports.getRandomItem = getRandomItem;
exports.wait = wait;
exports.waitForEnabled = waitForEnabled;
const fs_1 = __importDefault(require("fs")); // 📁 Manipulación de archivos
const path_1 = __importDefault(require("path")); // 📁 Manipulación de rutas
/**
 * 📸 Capturar evidencia con timestamp
 * @param page - Página de Playwright
 * @param testInfo - Información del test
 * @param name - Nombre descriptivo de la evidencia
 */
async function captureEvidence(page, testInfo, name) {
    const timestamp = new Date().toISOString()
        .replace(/[:.]/g, '-')
        .replace('T', '_')
        .split('Z')[0]; // ⏰ Timestamp formateado
    const testName = testInfo.title.replace(/[^a-zA-Z0-9]/g, '_'); // 🏷️ Nombre del test sanitizado
    // 📂 Crear carpeta de evidencias si no existe
    const evidenceDir = path_1.default.join('test-results', 'evidence');
    if (!fs_1.default.existsSync(evidenceDir)) {
        fs_1.default.mkdirSync(evidenceDir, { recursive: true });
    }
    // 📄 Ruta del screenshot
    const screenshotPath = path_1.default.join(evidenceDir, `${testName}_${name}_${timestamp}.png`);
    // 📸 Tomar screenshot de página completa
    await page.screenshot({
        path: screenshotPath,
        fullPage: true,
        animations: 'disabled' // 🚫 Deshabilitar animaciones para screenshots consistentes
    });
    // 📎 Adjuntar evidencia al reporte
    await testInfo.attach(name, {
        body: await page.screenshot({ fullPage: true }),
        contentType: 'image/png'
    });
    console.log(`📸 Evidencia guardada: ${screenshotPath}`); // 📝 Log de confirmación
}
/**
 * 🎲 Obtener elemento aleatorio de un array
 * @param array - Array de elementos
 * @returns Elemento aleatorio
 */
function getRandomItem(array) {
    if (array.length === 0) {
        throw new Error('❌ El array está vacío'); // 🚫 Validación de array vacío
    }
    return array[Math.floor(Math.random() * array.length)]; // 🎲 Selección aleatoria
}
/**
 * ⏳ Esperar con timeout configurable
 * @param ms - Milisegundos a esperar
 */
function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms)); // ⏰ Promise con timeout
}
/**
 * 🔍 Esperar que elemento esté visible y habilitado
 * @param page - Página de Playwright
 * @param selector - Selector del elemento
 * @param timeout - Timeout en milisegundos
 */
async function waitForEnabled(page, selector, timeout = 10000) {
    const element = page.locator(selector); // 🔍 Localizar elemento
    await element.waitFor({
        state: 'visible',
        timeout
    }); // 👀 Esperar visibilidad
    await expect(element).toBeEnabled({
        timeout
    }); // ✅ Esperar que esté habilitado
}
//# sourceMappingURL=helpers.js.map