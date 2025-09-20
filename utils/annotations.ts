import path from 'path';                                  // ← Rutas
import type { TestInfo } from '@playwright/test';         // ← Tipo Playwright

export function addAutoLabels(info: TestInfo) {           // ← Deriva etiquetas por jerarquía
  const parts = path
    .relative(path.resolve(process.cwd(), 'tests'), info.file) // ← Relativo a /tests
    .split(path.sep);                                    // ← Divide en segmentos

  const epic = parts[0] ?? 'producto';                   // ← Primer nivel (p.ej., 'citas' | 'idc')
  const feature = parts[1] ?? 'modulo';                  // ← Segundo nivel (p.ej., 'administracion')
  const story = parts.slice(2, -1).join(' / ') || 'general'; // ← Resto de niveles

  info.annotations.push({ type: 'epic', description: epic });      // ← Añade epic
  info.annotations.push({ type: 'feature', description: feature }); // ← Añade feature
  info.annotations.push({ type: 'story', description: story });     // ← Añade story
}