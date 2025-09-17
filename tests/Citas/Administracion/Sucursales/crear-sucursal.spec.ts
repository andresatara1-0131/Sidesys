// 📁 tests/citas/administracion/sucursales/crear-sucursal.spec.ts
// 🏢 Test para creación de sucursal aleatoria

import { test, expect } from '@playwright/test'; // 🧩 Importar Playwright
import { SuiteLoginPage } from '../../../../pages/suite/login.page'; // 📄 Page Object login Suite
import { SuiteProductsPage } from '../../../../pages/suite/products.page'; // 📄 Page Object productos
import { CitasSucursalesPage } from '../../../../pages/citas/administracion/sucursales.page'; // 📄 Page Object sucursales
import { getRandomItem, getRandomCodigo, getRandomHora, paises } from '../../../../data/utils'; // 🎲 Utilidades de datos

test.describe('Sucursales - Crear sucursal aleatoria', () => {
  test('Alta dinámica de sucursal', async ({ page }) => {
    // 🏗️ Inicializar Page Objects
    const loginPage = new SuiteLoginPage(page);
    const productsPage = new SuiteProductsPage(page);
    const sucursalesPage = new CitasSucursalesPage(page);

    await test.step('🔐 Login en Suite', async () => {
      await loginPage.login('admincitas@sidesys.com', 'E%4oCK!Hl'); // 📧🔒 Login
    });

    await test.step('📦 Navegar a módulo de Sucursales', async () => {
      const citasUrl = await productsPage.openCitas(); // 🎯 Abrir Citas
      await productsPage.navigateToProductUrl(citasUrl); // 🌐 Navegar a URL
      await sucursalesPage.navigateToMantenimiento(); // 🏢 Navegar a mantenimiento
    });

    let creado = false;
    let intentos = 0;
    const maxIntentos = 3; // 🔁 Máximo de intentos

    await test.step('🔄 Intentar crear sucursal (máximo 3 intentos)', async () => {
      while (!creado && intentos < maxIntentos) {
        try {
          // 🎲 Generar datos aleatorios
          const { nombre, alias, lat, long } = getRandomItem(paises); // 🌍 País aleatorio
          const codigo = getRandomCodigo(); // 🔢 Código aleatorio
          const horaApertura = getRandomHora(); // 🕐 Hora apertura
          const horaCierre = getRandomHora(Number(horaApertura) + 1, 22); // 🕘 Hora cierre

          const sucursalData = { nombre, alias, lat, long, codigo }; // 📊 Datos de sucursal

          await test.step(`🏢 Intentando crear sucursal: ${nombre} (Intento ${intentos + 1})`, async () => {
            // 🏗️ Crear sucursal
            creado = await sucursalesPage.crearSucursalCompleta(sucursalData, horaApertura, horaCierre);
            
            if (creado) {
              console.log(`✅ Sucursal creada con éxito: ${nombre}`); // 📝 Log éxito
            } else {
              console.warn(`⚠️ Intento ${intentos + 1} fallido, reintentando...`); // ⚠️ Log fallo
              intentos++;
              await page.waitForTimeout(1000); // ⏳ Esperar entre intentos
            }
          });
        } catch (error) {
          console.error(`❌ Error en intento ${intentos + 1}: ${error}`); // ❌ Log error
          intentos++;
          await page.waitForTimeout(1000); // ⏳ Esperar entre intentos
        }
      }
    });

    await test.step('✅ Validar que se creó la sucursal', async () => {
      expect(creado).toBeTruthy(); // ✅ Validar creación exitosa
      console.log('✅ Validación de creación de sucursal exitosa'); // 📝 Log validación
    });

    console.log('✅ Test de creación de sucursal completado exitosamente'); // 📝 Log final
  });
});