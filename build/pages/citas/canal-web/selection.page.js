"use strict";
// 📁 pages/citas/canal-web/selection.page.ts
// 🎯 Page Object para selección de servicio, sucursal y tipo de atención
Object.defineProperty(exports, "__esModule", { value: true });
exports.CitasSelectionPage = void 0;
const citas_base_page_1 = require("../citas-base.page"); // 🏗️ Base de Citas
class CitasSelectionPage extends citas_base_page_1.CitasBasePage {
    constructor(page) {
        super(page); // 🏗️ Constructor padre
    }
    /**
     * 🛎️ Seleccionar servicio específico
     * @param serviceName - Nombre del servicio
     */
    async selectService(serviceName) {
        const serviceCard = this.page.locator('mat-card', { hasText: serviceName }).first(); // 🔍 Card de servicio
        await serviceCard.click(); // 👆 Hacer clic
        await this.page.waitForTimeout(200); // ⏳ Esperar breve
        console.log(`✅ Servicio seleccionado: ${serviceName}`); // 📝 Log de confirmación
    }
    /**
     * 🏢 Seleccionar sucursal específica
     * @param branchName - Nombre de la sucursal
     */
    async selectBranch(branchName) {
        const branchCard = this.page.locator('mat-card', { hasText: branchName }).first(); // 🔍 Card de sucursal
        await branchCard.click(); // 👆 Hacer clic
        await this.page.waitForTimeout(200); // ⏳ Esperar breve
        console.log(`✅ Sucursal seleccionada: ${branchName}`); // 📝 Log de confirmación
    }
    /**
     * 👤 Seleccionar tipo de atención
     * @param attentionType - Tipo de atención (Personal, Virtual, etc.)
     */
    async selectAttentionType(attentionType) {
        const attentionRadio = this.page.getByRole('radio', { name: attentionType }).or(this.page.getByRole('button', { name: attentionType }) // 🔍 Radio o botón
        ).first(); // 🎯 Primer elemento encontrado
        await attentionRadio.click(); // 👆 Hacer clic
        await this.page.waitForTimeout(200); // ⏳ Esperar breve
        console.log(`✅ Tipo de atención seleccionado: ${attentionType}`); // 📝 Log de confirmación
    }
    /**
     * 🔄 Hacer clic en botón Continuar
     */
    async clickContinuar() {
        const continuarBtn = this.page.getByRole('button', { name: /Continuar/i }); // 🔍 Botón Continuar
        await continuarBtn.click(); // 👆 Hacer clic
        await this.page.waitForTimeout(300); // ⏳ Esperar acción
        console.log('✅ Clic en botón Continuar'); // 📝 Log de confirmación
    }
    /**
     * 📍 Seleccionar ubicación automática o manual
     * @param useMyLocation - Usar mi ubicación (true) o seleccionar manual (false)
     */
    async selectLocation(useMyLocation = true) {
        if (useMyLocation) {
            const myLocationBtn = this.page.getByRole('button', { name: /Mi ubicación/i }); // 🔍 Botón mi ubicación
            if (await myLocationBtn.isVisible({ timeout: 3000 })) {
                await myLocationBtn.click(); // 👆 Hacer clic
                console.log('✅ Ubicación automática seleccionada'); // 📝 Log de confirmación
            }
        }
        // Si no usa ubicación automática, se selecciona manualmente con selectBranch()
    }
    /**
     * 🎯 Flujo completo de selección de servicio y sucursal
     * @param service - Nombre del servicio
     * @param branch - Nombre de la sucursal
     * @param attentionType - Tipo de atención
     */
    async completeSelectionFlow(service, branch, attentionType = 'Personal') {
        await this.selectService(service); // 🛎️ Seleccionar servicio
        await this.clickContinuar(); // 🔄 Clic en Continuar
        await this.selectBranch(branch); // 🏢 Seleccionar sucursal
        await this.clickContinuar(); // 🔄 Clic en Continuar
        await this.selectAttentionType(attentionType); // 👤 Seleccionar tipo atención
        await this.clickContinuar(); // 🔄 Clic en Continuar
        await this.clickContinuar(); // 🔄 Clic adicional en Continuar
        console.log('✅ Flujo de selección completado exitosamente'); // 📝 Log de confirmación
    }
}
exports.CitasSelectionPage = CitasSelectionPage;
//# sourceMappingURL=selection.page.js.map