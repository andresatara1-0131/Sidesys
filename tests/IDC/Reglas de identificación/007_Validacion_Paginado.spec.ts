// 📁 tests/idc/reglas-identificacion/validacion-paginado.spec.ts
// 📄 Test para validación de paginado

import { test, expect } from '@playwright/test'; // 🧩 Importar Playwright
import { SuiteLoginPage } from '../../../pages/suite/login.page'; // 📄 Page Object login Suite
import { SuiteProductsPage } from '../../../pages/suite/products.page'; // 📄 Page Object productos
import { IDCReglasIdentificacionPage } from '../../../pages/idc/reglas-identificacion.page'; // 📄 Page Object reglas IDC
import { captureEvidence } from '../../../utils/helpers'; // 📸 Utilidad para evidencias

test.describe('[IDC] Reglas de Identificación - Validación de Paginado', () => {
  test('007_Validacion_Paginado - Validar navegación entre páginas', async ({ page }, testInfo) => {
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

    await test.step('📊 Validar que existe texto de paginación', async () => {
      const paginacionText = page.locator('text=Mostrando'); // 🔍 Texto de paginación
      await expect(paginacionText).toBeVisible({ timeout: 5000 }); // ✅ Validar visibilidad
      console.log('✅ Texto de paginación visible'); // 📝 Log de validación
    });

    const textosVistos: string[] = []; // 📋 Textos de paginación vistos

    await test.step('➡️ Navegar hacia adelante hasta el final', async () => {
      console.log('➡️ Moviéndose hacia adelante'); // 📝 Log de dirección

      while (true) {
        const botonSiguiente = page.locator('#resultTable').getByText('keyboard_arrow_right'); // 🔼 Botón siguiente
        
        if (!(await botonSiguiente.isVisible({ timeout: 2000 }))) {
          console.log('✅ No hay botón siguiente visible - última página alcanzada'); // 📝 Log de fin
          break; // 🛑 Salir del loop
        }

        await botonSiguiente.click({ timeout: 3000 }); // 👆 Clic en siguiente
        await page.waitForTimeout(1000); // ⏳ Esperar carga
        
        const textoPaginacion = await page.locator('text=Mostrando').textContent() || ''; // 📝 Obtener texto
        textosVistos.push(textoPaginacion); // 📋 Agregar a lista
        console.log(`📄 Página: ${textoPaginacion}`); // 📝 Log de página
      }
    });

    await test.step('⬅️ Navegar hacia atrás hasta el inicio', async () => {
      console.log('⬅️ Moviéndose hacia atrás'); // 📝 Log de dirección

      while (textosVistos.length > 1) {
        const botonAnterior = page.locator('#resultTable').getByText('keyboard_arrow_left'); // 🔽 Botón anterior
        
        if (!(await botonAnterior.isVisible({ timeout: 2000 }))) {
          console.log('✅ No hay botón anterior visible - primera página alcanzada'); // 📝 Log de inicio
          break; // 🛑 Salir del loop
        }

        await botonAnterior.click({ timeout: 3000 }); // 👆 Clic en anterior
        await page.waitForTimeout(1000); // ⏳ Esperar carga
        
        const textoPaginacion = await page.locator('text=Mostrando').textContent() || ''; // 📝 Obtener texto
        console.log(`📄 Página: ${textoPaginacion}`); // 📝 Log de página
      }
    });

    await test.step('📸 Capturar evidencia de paginación intermedia', async () => {
      if (textosVistos.length >= 3) {
        await captureEvidence(page, testInfo, 'paginado_intermedio'); // 📸 Evidencia
        console.log('📸 Evidencia de paginación intermedia capturada'); // 📝 Log de evidencia
      }
    });

    console.log('✅ Test de validación de paginado completado exitosamente'); // 📝 Log final
    console.log(`📋 ${textosVistos.length} páginas navegadas`); // 📝 Log de páginas
  });
});