// 📁 tests/idc/reglas-identificacion/buscar-reglas-avanzado.spec.ts
// 🔍 Test avanzado de búsqueda de reglas (para el 008)

import { test, expect } from '@playwright/test';
import { SuiteLoginPage } from '../../../pages/suite/login.page';
import { SuiteProductsPage } from '../../../pages/suite/products.page'; 
import { IDCReglasIdentificacionPage } from '../../../pages/idc/reglas-identificacion.page';
import { captureEvidence } from '../../../utils/helpers';

test.describe('[IDC] Reglas de Identificación - Búsqueda Avanzada', () => {
  test('008_Buscar_Reglas_Avanzado - Búsqueda con múltiples criterios', async ({ page }, testInfo) => {
    // 🏗️ Inicializar Page Objects
    const loginPage = new SuiteLoginPage(page);
    const productsPage = new SuiteProductsPage(page);
    const reglasPage = new IDCReglasIdentificacionPage(page);

    await test.step('🔐 Login y navegación a IDC', async () => {
      await loginPage.login('admincitas@sidesys.com', 'E%4oCK!Hl');
      const idcUrl = await productsPage.openIDC();
      await productsPage.navigateToProductUrl(idcUrl);
      await reglasPage.navigateToReglasIdentificacion();
    });

    await test.step('🔍 Búsqueda con diferentes criterios', async () => {
      const criteriosBusqueda = [
        'validación',      // 🔍 Criterio 1
        'identidad',       // 🔍 Criterio 2  
        'documento',       // 🔍 Criterio 3
        '2024'            // 🔍 Criterio 4 (año)
      ];

      for (const criterio of criteriosBusqueda) {
        await test.step(`🔎 Buscando: "${criterio}"`, async () => {
          await reglasPage.searchInGrid(criterio);
          await page.waitForTimeout(1000);
          
          const count = await reglasPage.getGridRowCount();
          console.log(`🔍 "${criterio}": ${count} resultados`);
          
          // 📸 Evidencia por cada criterio
          await captureEvidence(page, testInfo, `busqueda_${criterio}`);
        });
      }
    });

    console.log('✅ Test de búsqueda avanzada completado');
  });
});