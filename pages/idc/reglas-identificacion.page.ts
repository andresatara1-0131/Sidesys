// 📁 pages/idc/reglas-identificacion.page.ts
// 📋 Page Object para módulo de Reglas de Identificación de IDC

import { Page } from '@playwright/test'; // 🧩 Importar Playwright
import { IDCBasePage } from './idc-base.page'; // 🏗️ Base de IDC

export class IDCReglasIdentificacionPage extends IDCBasePage {
  constructor(page: Page) {
    super(page); // 🏗️ Constructor padre
  }

  /**
   * ➕ Hacer clic en botón Agregar
   */
  async clickAgregarButton(): Promise<void> {
    const agregarButton = this.page.getByRole('button', { name: /Agregar/i }); // 🔍 Botón Agregar
    
    await agregarButton.click(); // 👆 Hacer clic
    await this.page.waitForTimeout(2000); // ⏳ Esperar acción
    
    console.log('✅ Clic en botón Agregar'); // 📝 Log de confirmación
  }

  /**
   * 📝 Llenar campo Descripción
   * @param descripcion - Descripción de la regla
   */
  async fillDescripcion(descripcion: string): Promise<void> {
    const descripcionField = this.page.getByRole('textbox', { name: /Descripción/i }); // 🔍 Campo descripción
    
    await descripcionField.fill(descripcion); // 📝 Llenar campo
    await this.page.waitForTimeout(500); // ⏳ Esperar breve
    
    console.log(`✅ Descripción llenada: ${descripcion}`); // 📝 Log de confirmación
  }

  /**
   * 🆕 Crear nueva regla
   * @param descripcion - Descripción de la regla
   */
  async crearNuevaRegla(descripcion: string): Promise<void> {
    await this.clickAgregarButton(); // ➕ Clic en Agregar
    await this.fillDescripcion(descripcion); // 📝 Llenar descripción
    await this.clickGuardarButton(); // 💾 Clic en Guardar
    
    console.log(`✅ Nueva regla creada: ${descripcion}`); // 📝 Log de confirmación
  }

  /**
   * ✏️ Editar regla existente
   * @param rowIndex - Índice de la fila a editar
   * @param nuevaDescripcion - Nueva descripción
   */
  async editarRegla(rowIndex: number, nuevaDescripcion: string): Promise<void> {
    await this.clickEditButton(rowIndex); // ✏️ Clic en Editar
    await this.fillDescripcion(nuevaDescripcion); // 📝 Llenar nueva descripción
    await this.clickGuardarButton(); // 💾 Clic en Guardar
    
    console.log(`✅ Regla editada: ${nuevaDescripcion}`); // 📝 Log de confirmación
  }

  /**
   * 🗑️ Eliminar regla existente
   * @param rowIndex - Índice de la fila a eliminar
   */
  async eliminarRegla(rowIndex: number): Promise<void> {
    await this.clickDeleteButton(rowIndex); // 🗑️ Clic en Eliminar
    await this.clickConfirmarButton(); // ✔️ Clic en Confirmar
    
    console.log(`✅ Regla eliminada: fila ${rowIndex}`); // 📝 Log de confirmación
  }

  /**
   * 🔄 Activar/Desactivar regla
   * @param rowIndex - Índice de la fila
   */
  async toggleRegla(rowIndex: number): Promise<void> {
    await this.clickToggleButton(rowIndex); // 🔄 Clic en Toggle
    await this.validateSuccessMessage('Los cambios se guardaron correctamente'); // ✅ Validar mensaje
    
    console.log(`✅ Regla toggleada: fila ${rowIndex}`); // 📝 Log de confirmación
  }

  /**
   * 🔼🔽 Mover regla hacia arriba o abajo
   * @param rowIndex - Índice de la fila
   * @param direction - Dirección del movimiento (up/down)
   */
  async moverRegla(rowIndex: number, direction: 'up' | 'down'): Promise<void> {
    const row = this.page.locator(`#resultTable tbody tr:nth-child(${rowIndex + 1})`); // 🔍 Fila específica
    const buttonName = direction === 'up' ? 'keyboard_arrow_up' : 'keyboard_arrow_down'; // 🔼🔽 Nombre botón
    const moveButton = row.getByRole('button', { name: buttonName }); // 🔍 Botón mover
    
    await moveButton.click(); // 👆 Hacer clic
    await this.page.waitForTimeout(1000); // ⏳ Esperar acción
    await this.validateSuccessMessage('Los cambios se guardaron correctamente'); // ✅ Validar mensaje
    
    console.log(`✅ Regla movida ${direction}: fila ${rowIndex}`); // 📝 Log de confirmación
  }

  /**
   * 📄 Validar paginación
   */
  async validarPaginacion(): Promise<void> {
    const paginacionText = this.page.locator('text=Mostrando'); // 🔍 Texto de paginación
    const botonSiguiente = this.page.locator('#resultTable').getByText('keyboard_arrow_right'); // 🔼 Botón siguiente
    const botonAnterior = this.page.locator('#resultTable').getByText('keyboard_arrow_left'); // 🔽 Botón anterior

    // ✅ Validar que existe texto de paginación
    await expect(paginacionText).toBeVisible({ timeout: 5000 }); // 👀 Esperar visibilidad
    
    // 🔄 Navegar entre páginas si es posible
    if (await botonSiguiente.isVisible({ timeout: 2000 })) {
      await botonSiguiente.click(); // 👆 Clic en siguiente
      await this.page.waitForTimeout(1000); // ⏳ Esperar
      console.log('✅ Navegación a página siguiente'); // 📝 Log de confirmación
    }

    if (await botonAnterior.isVisible({ timeout: 2000 })) {
      await botonAnterior.click(); // 👆 Clic en anterior
      await this.page.waitForTimeout(1000); // ⏳ Esperar
      console.log('✅ Navegación a página anterior'); // 📝 Log de confirmación
    }

    console.log('✅ Validación de paginación completada'); // 📝 Log de confirmación
  }

  /**
   * 🔍 Validar que regla existe en grid
   * @param descripcion - Descripción de la regla
   */
  async validarReglaExiste(descripcion: string): Promise<boolean> {
    await this.searchInGrid(descripcion); // 🔍 Buscar regla
    const rowCount = await this.getGridRowCount(); // 🔢 Obtener conteo
    
    const existe = rowCount > 0; // ✅ Verificar existencia
    console.log(`✅ Regla "${descripcion}" ${existe ? 'existe' : 'no existe'}`); // 📝 Log de resultado
    
    return existe; // 📤 Devolver resultado
  }

  /**
   * 🔍 Validar que regla no existe en grid
   * @param descripcion - Descripción de la regla
   */
  async validarReglaNoExiste(descripcion: string): Promise<boolean> {
    await this.searchInGrid(descripcion); // 🔍 Buscar regla
    
    // ✅ Verificar mensaje de "no hay resultados"
    const noResults = this.page.getByText(/No hay reglas de identificación/i); // 🔍 Mensaje sin resultados
    const noExiste = await noResults.isVisible({ timeout: 3000 }); // 👀 Verificar visibilidad
    
    console.log(`✅ Regla "${descripcion}" ${noExiste ? 'no existe' : 'existe'}`); // 📝 Log de resultado
    return noExiste; // 📤 Devolver resultado
  }
}