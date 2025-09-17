// ?? tests/idc/reglas-identificacion/eliminar-regla.spec.ts
// ??? Test para eliminar reglas de identificaci車n

import { test, expect } from '@playwright/test'; // ?? Importar Playwright
import { SuiteLoginPage } from '../../../pages/suite/login.page'; // ?? Page Object login Suite
import { SuiteProductsPage } from '../../../pages/suite/products.page'; // ?? Page Object productos
import { IDCReglasIdentificacionPage } from '../../../pages/idc/reglas-identificacion.page'; // ?? Page Object reglas IDC
import { captureEvidence } from '../../../utils/helpers'; // ?? Utilidad para evidencias

test.describe('[IDC] Reglas de Identificaci車n - Eliminar Reglas', () => {
  test('003_Eliminar_Regla - Eliminar regla aleatoria', async ({ page }, testInfo) => {
    // ??? Inicializar Page Objects
    const loginPage = new SuiteLoginPage(page);
    const productsPage = new SuiteProductsPage(page);
    const reglasPage = new IDCReglasIdentificacionPage(page);

    await test.step('?? Login y navegaci車n a IDC', async () => {
      await loginPage.login('admincitas@sidesys.com', 'E%4oCK!Hl'); // ???? Login
      const idcUrl = await productsPage.openIDC(); // ?? Abrir IDC
      await productsPage.navigateToProductUrl(idcUrl); // ?? Navegar a URL
      await reglasPage.navigateToReglasIdentificacion(); // ?? Navegar a reglas
      await captureEvidence(page, testInfo, 'modulo_reglas_cargado'); // ?? Evidencia
    });

    await test.step('?? Obtener reglas existentes', async () => {
      const rowCount = await reglasPage.getGridRowCount(); // ?? Contar reglas
      expect(rowCount).toBeGreaterThan(0); // ? Validar que hay reglas
      console.log(`?? ${rowCount} reglas encontradas`); // ?? Log de conteo
    });

    let indiceAleatorio: number; // ?? 赤ndice de regla a eliminar
    let nombreRegla: string; // ?? Nombre de la regla

    await test.step('?? Seleccionar regla aleatoria para eliminar', async () => {
      indiceAleatorio = await reglasPage.selectRandomGridRow(); // ?? Seleccionar regla aleatoria
      nombreRegla = await reglasPage.getGridCellText(indiceAleatorio, 1); // ?? Obtener nombre
      
      console.log(`?? Regla seleccionada para eliminar: ${nombreRegla} (赤ndice ${indiceAleatorio})`); // ?? Log de selecci車n
      await captureEvidence(page, testInfo, 'regla_seleccionada'); // ?? Evidencia
    });

    await test.step('??? Eliminar la regla seleccionada', async () => {
      await reglasPage.eliminarRegla(indiceAleatorio); // ??? Eliminar regla
      await captureEvidence(page, testInfo, 'regla_eliminada'); // ?? Evidencia
    });

    await test.step('? Validar que la regla fue eliminada', async () => {
      await reglasPage.searchInGrid(nombreRegla); // ?? Buscar regla eliminada
      const noExiste = await reglasPage.validarReglaNoExiste(nombreRegla); // ? Validar que no existe
      
      expect(noExiste).toBeTruthy(); // ? Asegurar que fue eliminada
      console.log(`? Regla eliminada validada: ${nombreRegla}`); // ?? Log de validaci車n
    });

    console.log('? Test de eliminaci車n de regla completado exitosamente'); // ?? Log final
  });
});