// 📁 pages/idc/idc-base.page.ts
// 🏗️ Page Object base para todos los módulos de IDC

import { Page } from '@playwright/test'; // 🧩 Importar Playwright
import { NavigationHandler } from '../shared/navigation.page'; // 🧭 Manejador de navegación

export class IDCBasePage {
  protected navigationHandler: NavigationHandler; // 🧭 Manejador de navegación

  constructor(protected page: Page) {
    this.navigationHandler = new NavigationHandler(page); // 🏗️ Inicializar navegación
  }

  /**
   * 🌐 Navegar a página principal de IDC
   */
  async navigateToIDC(): Promise<void> {
    await this.navigationHandler.navigateTo(
      'https://encuestas.sidesys.ar/IDC',
      'networkidle'
    ); // 🌐 Navegar a IDC
    
    console.log('✅ Navegado a página principal de IDC'); // 📝 Log de confirmación
  }

  /**
   * 📋 Navegar a módulo de Reglas de Identificación
   */
  async navigateToReglasIdentificacion(): Promise<void> {
    const reglasLink = this.page.getByRole('link', { name: /fiber_manual_record Reglas de identificación/i }); // 🔍 Enlace a reglas
    
    await reglasLink.click(); // 👆 Hacer clic
    await this.page.waitForTimeout(2000); // ⏳ Esperar carga
    
    console.log('✅ Navegado a módulo de Reglas de Identificación'); // 📝 Log de confirmación
  }

  /**
   * 🔍 Buscar en grid de resultados
   * @param searchText - Texto a buscar
   */
  async searchInGrid(searchText: string): Promise<void> {
    const searchBox = this.page.getByRole('searchbox', { name: /Buscar/i }); // 🔍 Campo de búsqueda
    
    await searchBox.fill(''); // 🧹 Limpiar campo
    await searchBox.fill(searchText); // 📝 Llenar con texto
    await this.page.waitForTimeout(1500); // ⏳ Esperar resultados
    
    console.log(`✅ Búsqueda realizada: ${searchText}`); // 📝 Log de confirmación
  }

  /**
   * 📊 Obtener número de filas en grid
   * @returns Número de filas
   */
  async getGridRowCount(): Promise<number> {
    const rows = this.page.locator('#resultTable tbody tr'); // 📋 Filas del grid
    const count = await rows.count(); // 🔢 Contar filas
    
    console.log(`✅ ${count} filas encontradas en grid`); // 📝 Log de confirmación
    return count; // 📤 Devolver conteo
  }

  /**
   * 🎲 Seleccionar fila aleatoria del grid
   * @returns Índice de fila seleccionada
   */
  async selectRandomGridRow(): Promise<number> {
    const rowCount = await this.getGridRowCount(); // 🔢 Obtener conteo
    
    if (rowCount === 0) {
      throw new Error('❌ No hay filas en el grid para seleccionar'); // 🚫 Error si no hay filas
    }
    
    const randomIndex = Math.floor(Math.random() * rowCount); // 🎲 Índice aleatorio
    console.log(`✅ Fila aleatoria seleccionada: índice ${randomIndex}`); // 📝 Log de confirmación
    return randomIndex; // 📤 Devolver índice
  }

  /**
   * 📝 Obtener texto de celda específica en grid
   * @param rowIndex - Índice de fila
   * @param columnIndex - Índice de columna
   * @returns Texto de la celda
   */
  async getGridCellText(rowIndex: number, columnIndex: number): Promise<string> {
    const cell = this.page.locator(`#resultTable tbody tr:nth-child(${rowIndex + 1}) td:nth-child(${columnIndex + 1})`); // 🔍 Celda específica
    const text = await cell.textContent(); // 📝 Obtener texto
    
    console.log(`✅ Texto de celda [${rowIndex},${columnIndex}]: ${text}`); // 📝 Log de confirmación
    return text || ''; // 📤 Devolver texto
  }

  /**
   * ✏️ Hacer clic en botón Editar de fila específica
   * @param rowIndex - Índice de fila
   */
  async clickEditButton(rowIndex: number): Promise<void> {
    const row = this.page.locator(`#resultTable tbody tr:nth-child(${rowIndex + 1})`); // 🔍 Fila específica
    const editButton = row.getByRole('button').nth(4); // ✏️ Botón Editar (quinto botón)
    
    await editButton.click(); // 👆 Hacer clic
    await this.page.waitForTimeout(1500); // ⏳ Esperar acción
    
    console.log(`✅ Clic en botón Editar de fila ${rowIndex}`); // 📝 Log de confirmación
  }

  /**
   * 🗑️ Hacer clic en botón Eliminar de fila específica
   * @param rowIndex - Índice de fila
   */
  async clickDeleteButton(rowIndex: number): Promise<void> {
    const row = this.page.locator(`#resultTable tbody tr:nth-child(${rowIndex + 1})`); // 🔍 Fila específica
    const deleteButton = row.getByRole('button').nth(2); // 🗑️ Botón Eliminar (tercer botón)
    
    await deleteButton.click(); // 👆 Hacer clic
    await this.page.waitForTimeout(1500); // ⏳ Esperar acción
    
    console.log(`✅ Clic en botón Eliminar de fila ${rowIndex}`); // 📝 Log de confirmación
  }

  /**
   * 🔄 Hacer clic en botón de toggle (Activar/Desactivar)
   * @param rowIndex - Índice de fila
   */
  async clickToggleButton(rowIndex: number): Promise<void> {
    const row = this.page.locator(`#resultTable tbody tr:nth-child(${rowIndex + 1})`); // 🔍 Fila específica
    const toggleButton = row.locator('.s-toggle-switch__content__slider'); // 🔄 Botón Toggle
    
    await toggleButton.click(); // 👆 Hacer clic
    await this.page.waitForTimeout(1000); // ⏳ Esperar acción
    
    console.log(`✅ Clic en botón Toggle de fila ${rowIndex}`); // 📝 Log de confirmación
  }

  /**
   * ✅ Validar mensaje de éxito
   * @param expectedMessage - Mensaje esperado
   */
  async validateSuccessMessage(expectedMessage: string): Promise<void> {
    const messageElement = this.page.getByText('Los cambios se guardaron correctamente'); // 🔍 Elemento de mensaje
    
    await messageElement.waitFor({ state: 'visible', timeout: 10000 }); // 👀 Esperar visibilidad
    
    const actualMessage = await messageElement.textContent(); // 📝 Obtener texto
    if (actualMessage && !actualMessage.includes(expectedMessage)) {
      throw new Error(`❌ Mensaje de éxito no coincide. Esperado: ${expectedMessage}, Actual: ${actualMessage}`); // 🚫 Error si no coincide
    }
    
    console.log(`✅ Mensaje de éxito validado: ${expectedMessage}`); // 📝 Log de confirmación
  }

  /**
   * 💾 Hacer clic en botón Guardar
   */
  async clickGuardarButton(): Promise<void> {
    const guardarButton = this.page.getByRole('button', { name: /Guardar/i }); // 🔍 Botón Guardar
    
    await guardarButton.click(); // 👆 Hacer clic
    await this.page.waitForTimeout(2000); // ⏳ Esperar acción
    
    console.log('✅ Clic en botón Guardar'); // 📝 Log de confirmación
  }

  /**
   * ✔️ Hacer clic en botón Confirmar
   */
  async clickConfirmarButton(): Promise<void> {
    const confirmarButton = this.page.getByRole('button', { name: /Confirmar/i }); // 🔍 Botón Confirmar
    
    await confirmarButton.click(); // 👆 Hacer clic
    await this.page.waitForTimeout(2000); // ⏳ Esperar acción
    
    console.log('✅ Clic en botón Confirmar'); // 📝 Log de confirmación
  }
}