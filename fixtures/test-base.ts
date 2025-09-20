// fixtures/test-base.ts — Pasos “limpios” (sin auto-foto) + 1 captura final + copia de 1 video HD
import { test as base, expect, type Page, type TestInfo } from '@playwright/test';  // ← Core Playwright
import { finalShotOn, saveSingleVideoForCase } from '@utils/evidence';               // ← Helpers de evidencias
import { addAutoLabels } from '@utils/annotations';                                  // ← Etiquetas (epic/feature/story)

type Evidence = {
  step: (name: string, body: () => Promise<void>) => Promise<void>;                  // ← Paso lógico (sin screenshot)
  finalOn: (pageToCapture: Page, name?: string, delayMs?: number) => Promise<void>;  // ← ÚNICA captura final (default 5s)
};

export const test = base.extend<{ evidence: Evidence }>({
  evidence: async ({}, use, info) => {
    addAutoLabels(info);                                                             // ← Anota etiquetas según ruta del spec

    const evidence: Evidence = {
      step: async (name, body) => {                                                  // ← Paso agrupador (sin foto)
        await base.step(name, body);
      },
      finalOn: async (pageToCapture, name, delayMs = 5000) => {                      // ← Captura FINAL (una sola)
        await finalShotOn(pageToCapture, info as TestInfo, name, delayMs);
      },
    };

    await use(evidence);                                                             // ← Expone API a los tests
  },
});

// ← Al terminar cada test: copiar 1 video al folder del caso (nombrado como el test)
test.afterEach(async ({}, testInfo) => {
  await saveSingleVideoForCase(testInfo as TestInfo);
});

export { expect };