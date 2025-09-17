// 📁 tests/idc/reglas-identificacion/activar-regla.spec.ts
// 🔄 Test para activar/desactivar reglas

import { test, expect } from '@playwright/test'; // 🧩 Importar Playwright
import { SuiteLoginPage } from '../../../pages/suite/login.page'; // 📄 Page Object login Suite
import { SuiteProductsPage } from '../../../pages/suite/products.page'; // 📄 Page Object productos
import { IDCReglasIdentificacionPage } from '../../../pages/idc/reglas-identificacion.page'; // 📄 Page Object reglas IDC
import { captureEvidence } from '../../../utils/helpers'; // 📸 Utilidad para evidencias

test.describe('[IDC] Reglas de Identificación - Activar/Desactivar Reglas', () => {
  test('004_Activar_Regla - Activar y desactivar regla aleatoria', async ({ page }, testInfo) => {
    // 🏗️ Inicializar Page Objects
    const loginPage = new SuiteLoginPage(page);
    const productsPage = new SuiteProductsPage(page);
    const reglasPage = new IDCReglasIdentificacionPage(page);

    await test.step('🔐 Login y navegación a IDC', async () => {
      await loginPage.login('admincitas@sidesys.com', 'E%4oCK!Hl'); // 📧🔒 Login
      const idcUrl = await productsPage.openIDC(); // 🎯 Abrir IDC
      await productsPage.navigateToProductUrl(idcUrl); // 🌐 Navegar a URL
      await reglasPage.navigateToReglasIdentificacion(); // 📋 Navegar a reglas
      await captureEvidence(page, testInfo, 'modulo_reglas_cargado'); // 📸 Evidencia
    });

    await test.step('📊 Obtener reglas existentes', async () => {
      const rowCount = await reglasPage.getGridRowCount(); // 🔢 Contar reglas
      expect(rowCount).toBeGreaterThan(0); // ✅ Validar que hay reglas
      console.log(`📋 ${rowCount} reglas encontradas`); // 📝 Log de conteo
    });

    let indiceAleatorio: number; // 📍 Índice de regla a activar/desactivar
    let descripcionRegla: string; // 📝 Descripción de la regla

    await test.step('🎯 Seleccionar regla aleatoria', async () => {
      indiceAleatorio = await reglasPage.selectRandomGridRow(); // 🎯 Seleccionar regla aleatoria
      descripcionRegla = await reglasPage.getGridCellText(indiceAleatorio, 1); // 📝 Obtener descripción
      
      console.log(`🎯 Regla seleccionada: ${descripcionRegla} (índice ${indiceAleatorio})`); // 📝 Log de selección
      await captureEvidence(page, testInfo, 'regla_seleccionada'); // 📸 Evidencia
    });

    await test.step('🔄 Activar la regla', async () => {
      await reglasPage.toggleRegla(indiceAleatorio); // 🔄 Activar regla
      await page.waitForTimeout(7000); // ⏳ Esperar 7 segundos (como en el original)
      await captureEvidence(page, testInfo, 'regla_activada'); // 📸 Evidencia
    });

    await test.step('🔄 Desactivar la regla', async () => {
      await reglasPage.toggleRegla(indiceAleatorio); // 🔄 Desactivar regla
      await page.waitForTimeout(7000); // ⏳ Esperar 7 segundos (como en el original)
      await captureEvidence(page, testInfo, 'regla_desactivada'); // 📸 Evidencia
    });

    await test.step('✅ Validar que los cambios se guardaron', async () => {
      // La validación ya se hace dentro de toggleRegla() con validateSuccessMessage()
      console.log('✅ Cambios de activación/desactivación validados'); // 📝 Log de validación
    });

    console.log('✅ Test de activación/desactivación de regla completado exitosamente'); // 📝 Log final
  });
});