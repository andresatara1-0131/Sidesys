// 📁 types/playwright.d.ts
// 🎯 Extensiones de tipos para Playwright

import { Page, TestInfo } from '@playwright/test';

// ✅ Extender Page con métodos personalizados
declare module '@playwright/test' {
  interface Page {
    // Métodos de ayuda para selección robusta
    findVisibleElement(selectors: string[]): Promise<Locator | null>;
  }

  // ✅ Extender TestInfo con propiedad video
  interface TestInfo {
    video?: {
      path: () => string;
    };
  }
}

// ✅ Tipo para datos de sucursal
interface SucursalData {
  nombre: string;
  alias: string; 
  lat: string;
  long: string;
  codigo: string;
}