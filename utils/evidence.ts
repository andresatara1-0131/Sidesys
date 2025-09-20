// utils/evidence.ts — 1) Captura final (una sola)  2) Copia un único video HD al folder del caso
import * as path from 'path';                                                        // ← Rutas
import * as fs from 'fs';                                                            // ← FS nativo
import type { Page, TestInfo } from '@playwright/test';                              // ← Tipos

// ← Normaliza nombres (Windows-safe)
const sanitize = (s: string) => (s || '').replace(/[\\/:*?"<>|]+/g, ' ').replace(/\s+/g, ' ').trim();

// ← Asegura carpeta recursivamente
function ensureDirSync(dir: string) { fs.mkdirSync(dir, { recursive: true }); }

// ← Carpeta de evidencias para el test actual (replica jerarquía de /tests)
export function evidenceDirFor(info: TestInfo) {
  const rel = path.relative(path.resolve(process.cwd(), 'tests'), info.file);        // ← Ruta del spec relativa a /tests
  const segments = rel.split(path.sep).slice(0, -1);                                 // ← Subcarpetas (sin el .spec.ts)
  const testCase = sanitize(info.title);                                             // ← Carpeta final = nombre del caso
  const root = process.env.EVIDENCE_ROOT ?? 'evidencias';                            // ← Raíz configurable
  const dir = path.join(root, ...segments, testCase);                                // ← Ruta destino
  ensureDirSync(dir);
  return dir;
}

// === 1) Captura FINAL (una sola) en la pestaña indicada ===
export async function finalShotOn(page: Page, info: TestInfo, name?: string, delayMs = 5000) {
  const dir = evidenceDirFor(info);                                                  // ← Carpeta del caso
  const file = sanitize(name || info.title) + '.png';                                // ← Nombre = nombre del caso (o el que pases)
  if (delayMs > 0) await page.waitForTimeout(delayMs);                               // ← Espera “humana” antes de capturar
  await page.screenshot({ path: path.join(dir, file), fullPage: true });             // ← ÚNICA captura final
}

// === 2) Copia un ÚNICO video del test (el más grande) y lo nombra como el caso ===

// ← Escanea recursivamente un directorio devolviendo TODOS los .webm/.mp4
function findVideos(root: string): string[] {
  const out: string[] = [];
  const stack: string[] = [];
  if (fs.existsSync(root)) stack.push(root);
  while (stack.length) {
    const cur = stack.pop() as string;
    let entries: fs.Dirent[] = [];
    try { entries = fs.readdirSync(cur, { withFileTypes: true }); } catch { continue; }
    for (const e of entries) {
      const full = path.join(cur, e.name);
      if (e.isDirectory()) stack.push(full);
      else if (e.isFile() && /\.(webm|mp4)$/i.test(e.name)) out.push(full);
    }
  }
  return out;
}

// ← Espera activa a que aparezcan videos en outputDir
async function waitForVideos(outputDir: string, timeoutMs = 25000, pollMs = 300): Promise<string[]> {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    const found = findVideos(outputDir);
    if (found.length > 0) return found;
    await new Promise(r => setTimeout(r, pollMs));
  }
  return [];
}

// ← Copia el video “principal” al folder del caso con el nombre del test
export async function saveSingleVideoForCase(info: TestInfo) {
  const dir = evidenceDirFor(info);                                                  // ← Carpeta del caso
  const caseName = sanitize(info.title);                                             // ← Nombre del caso
  const dest = path.join(dir, `${caseName}.webm`);                                   // ← Nombre final del video

  const videos = await waitForVideos(info.outputDir);                                // ← Espera a que Playwright los escriba
  if (videos.length === 0) return;                                                   // ← Sin video (nada que copiar)

  // ← Elige el más grande (aprox. mayor duración)
  const best = videos
    .map(p => ({ p, s: (() => { try { return fs.statSync(p).size; } catch { return 0; } })() }))
    .sort((a, b) => b.s - a.s)[0]?.p;
  if (!best) return;

  try { fs.copyFileSync(best, dest); } catch { /* ignorar copy errors */ }
}