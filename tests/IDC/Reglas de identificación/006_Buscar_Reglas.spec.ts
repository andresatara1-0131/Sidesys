// 📁 tests/idc/reglas-identificacion/buscar-reglas.spec.ts
// 🔍 Test para buscar reglas

import { test, expect } from '@playwright/test'; // 🧩 Importar Playwright
import { SuiteLoginPage } from '../../../pages/suite/login.page'; // 📄 Page Object login Suite
import { SuiteProductsPage } from '../../../pages/suite/products.page'; // 📄 Page Object productos
import { IDCReglasIdentificacionPage } from '../../../pages/idc/reglas-identificacion.page'; // 📄 Page Object reglas IDC
import { captureEvidence } from '../../../utils/helpers'; // 📸 Utilidad para evidencias

test.describe('[IDC] Reglas de Identificación - Buscar Reglas', () => {
  test('006_Buscar_Reglas - Buscar regla existente e inexistente', async ({ page }, testInfo) => {
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

    await test.step('📊 Obtener primera regla para buscar', async () => {
      const rowCount = await reglasPage.getGridRowCount(); // 🔢 Contar reglas
      expect(rowCount).toBeGreaterThan(0); // ✅ Validar que hay reglas
      
      const primeraDescripcion = await reglasPage.getGridCellText(0, 1); // 📝 Obtener primera regla
      console.log(`🔍 Primera regla obtenida para búsqueda: "${primeraDescripcion}"`); // 📝 Log de regla
    });

    await test.step('🔍 Buscar texto que sí existe (prueba)', async () => {
      await reglasPage.searchInGrid('prueba'); // 🔍 Buscar "prueba"
      const count = await reglasPage.getGridRowCount(); // 🔢 Contar resultados
      
      expect(count).toBeGreaterThan(0); // ✅ Validar que hay resultados
      console.log(`✅ Búsqueda exitosa: ${count} resultados para "prueba"`); // 📝 Log de resultados
      await captureEvidence(page, testInfo, 'busqueda_con_resultados'); // 📸 Evidencia
    });

    await test.step('🔍 Buscar texto que no existe', async () => {
      await reglasPage.searchInGrid('algo que no existe'); // 🔍 Buscar texto inexistente
      const noResults = await reglasPage.validarReglaNoExiste('algo que no existe'); // ✅ Validar que no existe
      
      expect(noResults).toBeTruthy(); // ✅ Asegurar que no hay resultados
      console.log('✅ Validado que no hay resultados para búsqueda inexistente'); // 📝 Log de validación
      await captureEvidence(page, testInfo, 'busqueda_sin_resultados'); // 📸 Evidencia
    });

    await test.step('🧹 Limpiar búsqueda', async () => {
      const searchBox = page.getByRole('searchbox', { name: /Buscar/i }); // 🔍 Campo de búsqueda
      await searchBox.fill(''); // 🧹 Limpiar búsqueda
      await page.waitForTimeout(500); // ⏳ Esperar resultados
      
      const rowCount = await reglasPage.getGridRowCount(); // 🔢 Contar todas las reglas
      console.log(`🧹 Búsqueda limpiada - ${rowCount} reglas visibles`); // 📝 Log de limpieza
    });

    console.log('✅ Test de búsqueda de reglas completado exitosamente'); // 📝 Log final
  });
});