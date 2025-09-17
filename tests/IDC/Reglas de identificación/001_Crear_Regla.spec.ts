// 📁 tests/idc/reglas-identificacion/crear-regla.spec.ts
// 🆕 Test para crear reglas de identificación

import { test, expect } from '@playwright/test'; // 🧩 Importar Playwright
import { SuiteLoginPage } from '../../../pages/suite/login.page'; // 📄 Page Object login Suite
import { SuiteProductsPage } from '../../../pages/suite/products.page'; // 📄 Page Object productos
import { IDCReglasIdentificacionPage } from '../../../pages/idc/reglas-identificacion.page'; // 📄 Page Object reglas IDC
import { captureEvidence } from '../../../utils/helpers'; // 📸 Utilidad para evidencias
import { generarDescripcionAleatoria } from '../../../data/idc'; // 🎲 Generador de descripciones

test.describe('[IDC] Reglas de Identificación - Crear Reglas', () => {
  test('001_Crear_Regla - Crear 10 reglas aleatorias', async ({ page }, testInfo) => {
    // 🏗️ Inicializar Page Objects
    const loginPage = new SuiteLoginPage(page);
    const productsPage = new SuiteProductsPage(page);
    const reglasPage = new IDCReglasIdentificacionPage(page);

    test.setTimeout(120000); // ⏱️ Timeout extendido para 10 reglas

    await test.step('🔐 Login y navegación a IDC', async () => {
      await loginPage.login('admincitas@sidesys.com', 'E%4oCK!Hl'); // 📧🔒 Login
      const idcUrl = await productsPage.openIDC(); // 🎯 Abrir IDC
      await productsPage.navigateToProductUrl(idcUrl); // 🌐 Navegar a URL
      await reglasPage.navigateToReglasIdentificacion(); // 📋 Navegar a reglas
    });

    const descripcionesCreadas: string[] = []; // 📋 Lista de reglas creadas

    await test.step('🔄 Crear 10 reglas aleatorias', async () => {
      for (let i = 0; i < 10; i++) {
        await test.step(`📝 Creando regla ${i + 1}/10`, async () => {
          const descripcion = generarDescripcionAleatoria(); // 🎲 Descripción aleatoria
          await reglasPage.crearNuevaRegla(descripcion); // 🆕 Crear regla
          descripcionesCreadas.push(descripcion); // 📋 Agregar a lista
          await page.waitForTimeout(1000); // ⏳ Esperar entre reglas
        });
      }
    });

    await test.step('✅ Validar que las reglas fueron creadas', async () => {
      for (const descripcion of descripcionesCreadas) {
        const existe = await reglasPage.validarReglaExiste(descripcion); // 🔍 Validar existencia
        expect(existe).toBeTruthy(); // ✅ Asegurar que existe
        
        console.log(`✅ Regla validada: ${descripcion}`); // 📝 Log de validación
      }
    });

    await test.step('📸 Capturar evidencia final', async () => {
      await captureEvidence(page, testInfo, '10_reglas_creadas'); // 📸 Evidencia final
    });

    console.log('✅ Test de creación de 10 reglas completado exitosamente'); // 📝 Log final
    console.log(`📋 Reglas creadas: ${descripcionesCreadas.join(', ')}`); // 📝 Lista de reglas
  });
});