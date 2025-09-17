// 📁 pages/citas/canal-web/confirmation.page.ts
// ✅ Page Object para confirmación y finalización de cita

import { Page } from '@playwright/test'; // 🧩 Importar Playwright
import { CitasBasePage } from '../citas-base.page'; // 🏗️ Base de Citas

export class CitasConfirmationPage extends CitasBasePage {
  constructor(page: Page) {
    super(page); // 🏗️ Constructor padre
  }

  /**
   * ✅ Hacer clic en botón Confirmar
   */
  async clickConfirmar(): Promise<void> {
    const confirmarBtn = this.page.getByRole('button', { name: /Confirmar/i }); // 🔍 Botón Confirmar
    
    await confirmarBtn.click(); // 👆 Hacer clic
    await this.page.waitForTimeout(1000); // ⏳ Esperar acción
    
    console.log('✅ Clic en botón Confirmar'); // 📝 Log de confirmación
  }

  /**
   * 🎉 Validar mensaje de éxito de creación de cita
   */
  async validateSuccessMessage(): Promise<void> {
    const successHeader = this.page.getByRole('heading', { name: /Cita creada exitosamente/i }); // 🔍 Encabezado de éxito
    
    await expect(successHeader).toBeVisible({ timeout: 15000 }); // 👀 Esperar visibilidad
    
    console.log('✅ Cita creada exitosamente - Mensaje validado'); // 📝 Log de confirmación
  }

  /**
   * 📋 Obtener detalles de la cita creada
   * @returns Objeto con detalles de la cita
   */
  async getAppointmentDetails(): Promise<{ fecha: string; hora: string; servicio: string; sucursal: string }> {
    // 🔍 Selectores para los detalles (ajustar según la UI real)
    const fechaElement = this.page.locator('text=/Fecha:|Date:/i').locator('xpath=..'); // 📅 Elemento fecha
    const horaElement = this.page.locator('text=/Hora:|Time:/i').locator('xpath=..'); // ⏰ Elemento hora
    const servicioElement = this.page.locator('text=/Servicio:|Service:/i').locator('xpath=..'); // 🛎️ Elemento servicio
    const sucursalElement = this.page.locator('text=/Sucursal:|Branch:/i').locator('xpath=..'); // 🏢 Elemento sucursal

    const detalles = {
      fecha: await fechaElement.textContent() || '', // 📅 Texto fecha
      hora: await horaElement.textContent() || '', // ⏰ Texto hora
      servicio: await servicioElement.textContent() || '', // 🛎️ Texto servicio
      sucursal: await sucursalElement.textContent() || '' // 🏢 Texto sucursal
    };

    console.log('✅ Detalles de cita obtenidos:', detalles); // 📝 Log de detalles
    return detalles; // 📤 Devolver detalles
  }

  /**
   * 🏠 Hacer clic en botón Volver al Inicio
   */
  async clickVolverInicio(): Promise<void> {
    const volverBtn = this.page.getByRole('button', { name: /Volver al Inicio|Inicio/i }); // 🔍 Botón volver
    
    await volverBtn.click(); // 👆 Hacer clic
    await this.page.waitForTimeout(2000); // ⏳ Esperar navegación
    
    console.log('✅ Clic en botón Volver al Inicio'); // 📝 Log de confirmación
  }

  /**
   * 📧 Obtener opción de envío por correo (si aplica)
   */
  async getEmailOption(): Promise<void> {
    const emailCheckbox = this.page.locator('input[type="checkbox"][name*="email"]'); // 🔍 Checkbox email
    
    if (await emailCheckbox.isVisible({ timeout: 3000 })) {
      await emailCheckbox.check(); // ✅ Marcar checkbox
      console.log('✅ Opción de envío por correo seleccionada'); // 📝 Log de confirmación
    }
  }

  /**
   * 📱 Obtener opción de envío por SMS (si aplica)
   */
  async getSmsOption(): Promise<void> {
    const smsCheckbox = this.page.locator('input[type="checkbox"][name*="sms"]'); // 🔍 Checkbox SMS
    
    if (await smsCheckbox.isVisible({ timeout: 3000 })) {
      await smsCheckbox.check(); // ✅ Marcar checkbox
      console.log('✅ Opción de envío por SMS seleccionada'); // 📝 Log de confirmación
    }
  }

  /**
   * ✅ Flujo completo de confirmación
   */
  async completeConfirmationFlow(): Promise<void> {
    await this.clickConfirmar(); // ✅ Clic en Confirmar
    await this.validateSuccessMessage(); // 🎉 Validar mensaje éxito
    await this.getAppointmentDetails(); // 📋 Obtener detalles
    await this.getEmailOption(); // 📧 Opción email
    await this.getSmsOption(); // 📱 Opción SMS
    await this.clickVolverInicio(); // 🏠 Volver al inicio
    
    console.log('✅ Flujo de confirmación completado exitosamente'); // 📝 Log de confirmación
  }
}