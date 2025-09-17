// ?? tests/idc/reglas-identificacion/editar-regla.spec.ts
// ?? Test para editar reglas de identificaci車n

import { test, expect } from '@playwright/test'; // ?? Importar Playwright
import { SuiteLoginPage } from '../../../pages/suite/login.page'; // ?? Page Object login Suite
import { SuiteProductsPage } from '../../../pages/suite/products.page'; // ?? Page Object productos
import { IDCReglasIdentificacionPage } from '../../../pages/idc/reglas-identificacion.page'; // ?? Page Object reglas IDC
import { captureEvidence } from '../../../utils/helpers'; // ?? Utilidad para evidencias
import { generarDescripcionEditada } from '../../../data/idc'; // ?? Generador de descripciones

test.describe('[IDC] Reglas de Identificaci車n - Editar Reglas', () => {
  test('002_Editar_Regla - Editar regla aleatoria', async ({ page }, testInfo) => {
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

    let indiceAleatorio: number; // ?? 赤ndice de regla a editar
    let descripcionOriginal: string; // ?? Descripci車n original
    let nuevaDescripcion: string; // ?? Nueva descripci車n

    await test.step('?? Seleccionar regla aleatoria para editar', async () => {
      indiceAleatorio = await reglasPage.selectRandomGridRow(); // ?? Seleccionar regla aleatoria
      descripcionOriginal = await reglasPage.getGridCellText(indiceAleatorio, 1); // ?? Obtener descripci車n
      
      console.log(`?? Regla seleccionada: ${descripcionOriginal} (赤ndice ${indiceAleatorio})`); // ?? Log de selecci車n
    });

    await test.step('?? Editar descripci車n de la regla', async () => {
      nuevaDescripcion = generarDescripcionEditada(); // ?? Generar nueva descripci車n
      await reglasPage.editarRegla(indiceAleatorio, nuevaDescripcion); // ?? Editar regla
      await captureEvidence(page, testInfo, 'regla_editada'); // ?? Evidencia
    });

    await test.step('? Validar que la edici車n fue exitosa', async () => {
      await reglasPage.searchInGrid(nuevaDescripcion); // ?? Buscar nueva descripci車n
      const existe = await reglasPage.validarReglaExiste(nuevaDescripcion); // ? Validar existencia
      
      expect(existe).toBeTruthy(); // ? Asegurar que existe
      console.log(`? Edici車n validada: ${nuevaDescripcion}`); // ?? Log de validaci車n
    });

    await test.step('?? Validar que la descripci車n original ya no existe', async () => {
      await reglasPage.searchInGrid(descripcionOriginal); // ?? Buscar descripci車n original
      const noExiste = await reglasPage.validarReglaNoExiste(descripcionOriginal); // ? Validar que no existe
      
      expect(noExiste).toBeTruthy(); // ? Asegurar que no existe
      console.log(`? Validado que descripci車n original fue cambiada`); // ?? Log de validaci車n
    });

    console.log('? Test de edici車n de regla completado exitosamente'); // ?? Log final
    console.log(`?? Cambio: "${descripcionOriginal}" ↙ "${nuevaDescripcion}"`); // ?? Log de cambio
  });
});