// 📁 pages/shared/popup-handler.page.ts
// 🪟 Manejador de ventanas emergentes (popups)

import { Page } from '@playwright/test'; // 🧩 Importar Playwright

export class PopupHandler {
  constructor(private page: Page) {} // 🏗️ Constructor con página

  /**
   * 👆 Hacer clic en elemento y esperar popup
   * @param element - Elemento a hacer clic
   * @returns Instancia de la página del popup
   */
  async clickAndWaitForPopup(element: any): Promise<Page> {
    const [popup] = await Promise.all([
      this.page.waitForEvent('popup'), // 🎯 Esperar evento de popup
      element.click() // 👆 Hacer clic en el elemento
    ]);
    
    console.log('✅ Popup detectado y capturado'); // 📝 Log de confirmación
    return popup; // 📤 Devolver página del popup
  }

  /**
   * 👆 Hacer clic y obtener URL del popup
   * @param element - Elemento a hacer clic
   * @returns URL del popup
   */
  async clickAndGetPopupUrl(element: any): Promise<string> {
    const popup = await this.clickAndWaitForPopup(element); // 🪟 Obtener popup
    const popupUrl = popup.url(); // 🔗 Obtener URL del popup
    
    await popup.close(); // ❌ Cerrar popup (lo manejamos en pestaña principal)
    
    console.log(`✅ URL de popup obtenida: ${popupUrl}`); // 📝 Log de confirmación
    return popupUrl; // 📤 Devolver URL
  }

  /**
   * 🔄 Cambiar a pestaña de popup
   * @param popup - Página del popup
   */
  async switchToPopup(popup: Page): Promise<void> {
    // 🎯 Esperar a que el popup esté completamente cargado
    await popup.waitForLoadState('domcontentloaded');
    
    console.log('✅ Cambiado a pestaña de popup'); // 📝 Log de confirmación
  }

  /**
   * 🔙 Cambiar de vuelta a pestaña principal
   */
  async switchToMainTab(): Promise<void> {
    // 📌 La pestaña principal es la primera en el contexto
    const pages = this.page.context().pages(); // 📋 Obtener todas las pestañas
    await pages[0].bringToFront(); // 🎯 Traer primera pestaña al frente
    
    console.log('✅ Cambiado a pestaña principal'); // 📝 Log de confirmación
  }

  /**
   * 🎯 Esperar y validar URL específica en popup
   * @param popup - Página del popup
   * @param urlPattern - Patrón de URL a validar
   * @param timeout - Timeout en milisegundos
   */
  async waitForPopupUrl(
    popup: Page, 
    urlPattern: string | RegExp, 
    timeout = 30000
  ): Promise<void> {
    await popup.waitForURL(urlPattern, { timeout }); // ⏳ Esperar URL específica
    
    console.log(`✅ Popup cargado con URL que coincide con: ${urlPattern}`); // 📝 Log de confirmación
  }

  /**
   * ❌ Cerrar popup específico
   * @param popup - Página del popup a cerrar
   */
  async closePopup(popup: Page): Promise<void> {
    await popup.close(); // ❌ Cerrar pestaña
    await this.switchToMainTab(); // 🔙 Volver a pestaña principal
    
    console.log('✅ Popup cerrado y vuelto a pestaña principal'); // 📝 Log de confirmación
  }

  /**
   * 🔢 Obtener cantidad de pestañas abiertas
   * @returns Número de pestañas
   */
  async getOpenTabsCount(): Promise<number> {
    const pages = this.page.context().pages(); // 📋 Obtener todas las pestañas
    return pages.length; // 🔢 Devolver cantidad
  }
}