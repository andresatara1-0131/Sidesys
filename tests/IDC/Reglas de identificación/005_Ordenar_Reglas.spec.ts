// ?? tests/idc/reglas-identificacion/ordenar-reglas.spec.ts
// ???? Test para ordenar reglas

import { test, expect } from '@playwright/test'; // ?? Importar Playwright
import { SuiteLoginPage } from '../../../pages/suite/login.page'; // ?? Page Object login Suite
import { SuiteProductsPage } from '../../../pages/suite/products.page'; // ?? Page Object productos
import { IDCReglasIdentificacionPage } from '../../../pages/idc/reglas-identificacion.page'; // ?? Page Object reglas IDC
import { captureEvidence } from '../../../utils/helpers'; // ?? Utilidad para evidencias

test.describe('[IDC] Reglas de Identificaci��n - Ordenar Reglas', () => {
  test('005_Ordenar_Reglas - Mover reglas aleatoriamente', async ({ page }, testInfo) => {
    // ??? Inicializar Page Objects
    const loginPage = new SuiteLoginPage(page);
    const productsPage = new SuiteProductsPage(page);
    const reglasPage = new IDCReglasIdentificacionPage(page);

    await test.step('?? Login y navegaci��n a IDC', async () => {
      await loginPage.login('admincitas@sidesys.com', 'E%4oCK!Hl'); // ???? Login
      const idcUrl = await productsPage.openIDC(); // ?? Abrir IDC
      await productsPage.navigateToProductUrl(idcUrl); // ?? Navegar a URL
      await reglasPage.navigateToReglasIdentificacion(); // ?? Navegar a reglas
      await captureEvidence(page, testInfo, 'modulo_reglas_cargado'); // ?? Evidencia
    });

    await test.step('?? Validar que hay suficientes reglas', async () => {
      const rowCount = await reglasPage.getGridRowCount(); // ?? Contar reglas
      expect(rowCount).toBeGreaterThan(3); // ? Validar que hay al menos 4 reglas
      console.log(`?? ${rowCount} reglas encontradas - suficientes para ordenamiento`); // ?? Log de conteo
    });

    const indicesUsados = new Set<number>(); // ?? ��ndices ya usados
    const movimientos: string[] = []; // ?? Registro de movimientos

    await test.step('?? Mover 3 reglas aleatoriamente', async () => {
      for (let i = 0; i < 3; i++) {
        await test.step(`?? Movimiento ${i + 1}/3`, async () => {
          // ?? Seleccionar regla aleatoria no usada
          let indice: number;
          do {
            indice = await reglasPage.selectRandomGridRow(); // ?? Seleccionar aleatorio
          } while (indicesUsados.has(indice));
          indicesUsados.add(indice);

          const descripcion = await reglasPage.getGridCellText(indice, 1); // ?? Obtener descripci��n
          console.log(`?? Regla ${i + 1}: "${descripcion}" (posici��n ${indice})`); // ?? Log de regla

          // ?? Determinar direcci��n del movimiento
          const esPrimera = indice === 0; // ?? Si es primera fila
          const esUltima = indice === (await reglasPage.getGridRowCount()) - 1; // ?? Si es ��ltima fila
          let direccion: 'up' | 'down' = Math.random() < 0.5 ? 'up' : 'down'; // ?? Direcci��n aleatoria

          // ?? Ajustar direcci��n seg��n posici��n
          if (esPrimera) direccion = 'down'; // ?? Si es primera, solo puede bajar
          if (esUltima) direccion = 'up'; // ?? Si es ��ltima, solo puede subir

          // ?? Mover la regla
          await reglasPage.moverRegla(indice, direccion); // ???? Mover regla
          movimientos.push(`Regla "${descripcion}" ${direccion === 'up' ? '??' : '??'}`); // ?? Registrar movimiento

          await page.waitForTimeout(1000); // ? Esperar entre movimientos
        });
      }
    });

    await test.step('?? Capturar evidencia final del ordenamiento', async () => {
      await captureEvidence(page, testInfo, 'reglas_ordenadas'); // ?? Evidencia final
    });

    console.log('? Test de ordenamiento de reglas completado exitosamente'); // ?? Log final
    console.log(`?? Movimientos realizados: ${movimientos.join(', ')}`); // ?? Log de movimientos
  });
});