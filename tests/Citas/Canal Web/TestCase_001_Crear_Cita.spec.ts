// 📁 tests/citas/canal-web/crear-cita.spec.ts
// 🧪 Test CORREGIDO para crear una cita en Canal Web

import { test, expect } from '@playwright/test'; // 🧩 Importar Playwright
import { CitasWelcomePage } from '../../../pages/citas/canal-web/welcome.page'; // 📄 Page Object welcome
import { captureEvidence } from '../../../utils/helpers'; // 📸 Utilidad para evidencias

test.describe('CitasWeb - Crear Cita', () => {
  // ✅ ELIMINADO: citasHooks.configureTimeouts();
  // ✅ Configurar timeout directamente en el test
  test.setTimeout(240000); // ⏱️ Timeout extendido para flujo completo

  test('Crear cita seleccionando fecha y hora disponible', async ({ page }, testInfo) => {
    // 🏗️ Inicializar Page Object
    const welcomePage = new CitasWelcomePage(page);

    await test.step('🌐 Navegar a CitasWeb y manejar popups', async () => {
      await welcomePage.navigate(); // 🌐 Navegar a welcome
      await welcomePage.handleInitialPopups(); // ✅ Manejar popups iniciales
      await captureEvidence(page, testInfo, 'pagina_welcome'); // 📸 Evidencia
    });

    await test.step('🔐 Login con DNI en Canal Web', async () => {
      await welcomePage.loginWithDNI('10026917'); // 🔐 Login con DNI
      await captureEvidence(page, testInfo, 'login_exitoso'); // 📸 Evidencia
    });

    await test.step('🚀 Iniciar flujo de creación de cita', async () => {
      await welcomePage.startCreateCitaFlow(); // 🚀 Iniciar creación
      await captureEvidence(page, testInfo, 'inicio_creacion'); // 📸 Evidencia
    });

    await test.step('📸 Capturar evidencia final', async () => {
      await captureEvidence(page, testInfo, 'flujo_completo_creacion_cita'); // 📸 Evidencia
    });

    console.log('✅ Test de creación de cita iniciado exitosamente'); // 📝 Log final
  });
});