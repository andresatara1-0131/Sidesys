// 📁 pages/citas/administracion/sucursales.page.ts
// 🏢 Page Object para módulo de Sucursales de Citas

import { Page, FrameLocator } from '@playwright/test'; // 🧩 Importar Playwright
import { CitasBasePage } from '../citas-base.page'; // 🏗️ Base de Citas

// 📊 Tipo de datos para sucursal (definido localmente para evitar dependencias)
type SucursalData = {
  nombre: string; // 🏷️ Nombre de la sucursal
  alias: string; // 🔤 Alias de la sucursal
  lat: string; // 📍 Latitud
  long: string; // 📍 Longitud
  codigo: string; // 🔢 Código único
};

export class CitasSucursalesPage extends CitasBasePage {
  private frameLocator: FrameLocator; // 🖼️ Locator del iframe

  constructor(page: Page) {
    super(page); // 🏗️ Constructor padre
    this.frameLocator = this.iframeHandler.getFrameLocator(); // 🎯 Obtener frame locator
  }

  /**
   * 📋 Navegar a mantenimiento de sucursales
   */
  async navigateToMantenimiento(): Promise<void> {
    await this.navigateToSection('apartment Sucursales'); // 📂 Navegar a sucursales
    
    const mantenimientoLink = this.page.getByRole('link', { name: 'fiber_manual_record Mantenimiento' }).first(); // 🔍 Enlace mantenimiento
    await mantenimientoLink.click(); // 👆 Hacer clic
    await this.page.waitForTimeout(3000); // ⏳ Esperar carga
    
    console.log('✅ Navegado a mantenimiento de sucursales'); // 📝 Log de confirmación
  }

  /**
   * ➕ Hacer clic en botón Alta
   */
  async clickAltaButton(): Promise<void> {
    const altaButton = this.frameLocator.getByRole('button', { name: 'Alta' }); // 🔍 Botón Alta
    
    await altaButton.click(); // 👆 Hacer clic
    await this.page.waitForTimeout(1000); // ⏳ Esperar acción
    
    console.log('✅ Clic en botón Alta'); // 📝 Log de confirmación
  }

  /**
   * 📝 Llenar formulario de sucursal
   * @param sucursalData - Datos de la sucursal
   */
  async fillSucursalForm(sucursalData: SucursalData): Promise<void> {
    // 🔍 Campos del formulario
    const codigoField = this.frameLocator.locator('#txtCentroDePagoCod'); // 🔢 Campo código
    const nombreField = this.frameLocator.locator('#txtCentroDePagoDes'); // 🏷️ Campo nombre
    const aliasField = this.frameLocator.locator('#txtCentroDePagoAlias'); // 🔤 Campo alias
    const ubicacionField = this.frameLocator.locator('#txtLocation'); // 📍 Campo ubicación

    // 📝 Llenar campos
    await codigoField.fill(sucursalData.codigo); // 🔢 Llenar código
    await nombreField.fill(sucursalData.nombre); // 🏷️ Llenar nombre
    await aliasField.fill(sucursalData.alias); // 🔤 Llenar alias
    await ubicacionField.fill(`Calle ${sucursalData.nombre} ${sucursalData.codigo}`); // 📍 Llenar ubicación

    console.log(`✅ Formulario llenado para sucursal: ${sucursalData.nombre}`); // 📝 Log de confirmación
  }

  /**
   * 📍 Llenar coordenadas de ubicación
   * @param lat - Latitud
   * @param long - Longitud
   */
  async fillCoordenadas(lat: string, long: string): Promise<void> {
    // 🔍 Campos de coordenadas
    const latEntera = this.frameLocator.locator('#txtLatitudParteEntera'); // 📍 Latitud entera
    const latDecimal = this.frameLocator.locator('#txtLatitudParteDecimal'); // 📍 Latitud decimal
    const longEntera = this.frameLocator.locator('#txtLongitudParteEntera'); // 📍 Longitud entera
    const longDecimal = this.frameLocator.locator('#txtLongitudParteDecimal'); // 📍 Longitud decimal
    const signoLat = this.frameLocator.locator('#cmbSignoLatitud'); // ➕➖ Signo latitud

    // 📝 Llenar coordenadas
    await signoLat.selectOption('+'); // ➕ Signo positivo
    await latEntera.fill(lat); // 📍 Llenar latitud entera
    await latDecimal.fill('321'); // 📍 Llenar latitud decimal (fijo)
    await longEntera.fill(long); // 📍 Llenar longitud entera
    await longDecimal.fill('654'); // 📍 Llenar longitud decimal (fijo)

    console.log(`✅ Coordenadas llenadas: Lat ${lat}, Long ${long}`); // 📝 Log de confirmación
  }

  /**
   * ⏰ Configurar horario de atención
   * @param horaApertura - Hora de apertura
   * @param horaCierre - Hora de cierre
   */
  async configurarHorario(horaApertura: string, horaCierre: string): Promise<void> {
    // 🔍 Campos de horario
    const aperturaSelect = this.frameLocator.locator('#cmbHoraApertura'); // 🕐 Select apertura
    const cierreSelect = this.frameLocator.locator('#cmbHoraCierre'); // 🕘 Select cierre
    const minutoCierreSelect = this.frameLocator.locator('#cmbMinutoCierre'); // ⏰ Select minutos

    // ⏰ Configurar horarios
    await aperturaSelect.selectOption(horaApertura); // 🕐 Seleccionar apertura
    await cierreSelect.selectOption(horaCierre); // 🕘 Seleccionar cierre
    await minutoCierreSelect.selectOption('0'); // ⏰ Minutos en 0

    console.log(`✅ Horario configurado: Apertura ${horaApertura}, Cierre ${horaCierre}`); // 📝 Log de confirmación
  }

  /**
   * 📋 Obtener mensaje de resultado
   * @returns Texto del mensaje
   */
  async getResultMessage(): Promise<string> {
    const messageElement = this.frameLocator.locator('#lblMessage'); // 🔍 Elemento de mensaje
    
    await messageElement.waitFor({ state: 'visible', timeout: 10000 }); // 👀 Esperar visibilidad
    
    const message = await messageElement.textContent(); // 📝 Obtener texto
    console.log(`✅ Mensaje obtenido: ${message}`); // 📝 Log de confirmación
    return message || ''; // 📤 Devolver mensaje
  }

  /**
   * 🏢 Crear sucursal completa
   * @param sucursalData - Datos de la sucursal
   * @param horaApertura - Hora de apertura
   * @param horaCierre - Hora de cierre
   */
  async crearSucursalCompleta(
    sucursalData: SucursalData,
    horaApertura: string,
    horaCierre: string
  ): Promise<boolean> {
    await this.clickAltaButton(); // ➕ Clic en Alta
    await this.fillSucursalForm(sucursalData); // 📝 Llenar formulario
    await this.fillCoordenadas(sucursalData.lat, sucursalData.long); // 📍 Llenar coordenadas
    await this.configurarHorario(horaApertura, horaCierre); // ⏰ Configurar horario
    await this.clickAltaButton(); // 💾 Clic en Alta para guardar

    const message = await this.getResultMessage(); // 📋 Obtener mensaje
    const success = message.includes('agregada exitosamente'); // ✅ Verificar éxito

    console.log(`✅ Creación de sucursal ${success ? 'exitosa' : 'fallida'}`); // 📝 Log de resultado
    return success; // 📤 Devolver resultado
  }
}