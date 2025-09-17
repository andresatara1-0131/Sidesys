// 📁 pages/shared/navigation.page.ts
// 🧭 Manejador de navegación y rutas

import { Page } from '@playwright/test'; // 🧩 Importar Playwright

export class NavigationHandler {
  constructor(private page: Page) {} // 🏗️ Constructor con página

  /**
   * 🌐 Navegar a URL específica
   * @param url - URL a navegar
   * @param waitUntil - Estado de espera
   */
  async navigateTo(
    url: string, 
    waitUntil: 'load' | 'domcontentloaded' | 'networkidle' = 'networkidle'
  ): Promise<void> {
    await this.page.goto(url, { waitUntil }); // 🌐 Navegar a URL
    
    console.log(`✅ Navegado a: ${url}`); // 📝 Log de confirmación
  }

  /**
   * ⏳ Esperar a que URL coincida con patrón
   * @param urlPattern - Patrón de URL
   * @param timeout - Timeout en milisegundos
   */
  async waitForUrl(
    urlPattern: string | RegExp, 
    timeout = 30000
  ): Promise<void> {
    await this.page.waitForURL(urlPattern, { timeout }); // ⏳ Esperar URL
    
    console.log(`✅ URL actual coincide con: ${urlPattern}`); // 📝 Log de confirmación
  }

  /**
   * 🔙 Navegar hacia atrás en el historial
   */
  async goBack(): Promise<void> {
    await this.page.goBack(); // 🔙 Navegar hacia atrás
    await this.page.waitForLoadState('networkidle'); // ⏳ Esperar carga
    
    console.log('✅ Navegado hacia atrás'); // 📝 Log de confirmación
  }

  /**
   * 🔜 Navegar hacia adelante en el historial
   */
  async goForward(): Promise<void> {
    await this.page.goForward(); // 🔜 Navegar hacia adelante
    await this.page.waitForLoadState('networkidle'); // ⏳ Esperar carga
    
    console.log('✅ Navegado hacia adelante'); // 📝 Log de confirmación
  }

  /**
   * 🔄 Recargar página actual
   */
  async reload(): Promise<void> {
    await this.page.reload(); // 🔄 Recargar página
    await this.page.waitForLoadState('networkidle'); // ⏳ Esperar carga
    
    console.log('✅ Página recargada'); // 📝 Log de confirmación
  }

  /**
   * 📍 Obtener URL actual
   * @returns URL actual
   */
  async getCurrentUrl(): Promise<string> {
    const url = this.page.url(); // 🔗 Obtener URL
    console.log(`📍 URL actual: ${url}`); // 📝 Log de URL
    return url; // 📤 Devolver URL
  }

  /**
   * 🏠 Navegar a página home de la aplicación
   */
  async goToHome(): Promise<void> {
    await this.navigateTo('https://encuestas.sidesys.ar'); // 🌐 Navegar a home
    console.log('✅ Navegado a página home'); // 📝 Log de confirmación
  }

  /**
   * 📋 Verificar que la URL contiene texto específico
   * @param text - Texto a verificar en URL
   */
  async verifyUrlContains(text: string): Promise<void> {
    const currentUrl = await this.getCurrentUrl(); // 🔗 Obtener URL actual
    
    if (!currentUrl.includes(text)) {
      throw new Error(`❌ URL actual (${currentUrl}) no contiene: ${text}`); // 🚫 Error si no contiene
    }
    
    console.log(`✅ URL contiene: ${text}`); // 📝 Log de confirmación
  }
}