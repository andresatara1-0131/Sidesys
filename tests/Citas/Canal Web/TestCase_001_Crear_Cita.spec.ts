// tests/Citas/Canal Web/TestCase_001_Crear_Cita.spec.ts
// ================================================================
// TEST CASE: Crear Cita desde Canal Web (SIN LOGIN)
// Producto: Citas → Canal Web
// Simula flujo de usuario externo: busca, selecciona, confirma.
// ================================================================

import { test, expect } from '@playwright/test'; // ← No usa fixture (no requiere login)
import { CitasWebPage } from '../../../pages/citas/web/CitasWebPage';
import { testData } from '../../../utils/testData';

test('TC-010: Debería poder crear cita desde canal web', async ({ page }) => {
  // Ir directamente a la URL de Citas Web
  await page.goto(process.env.CITAS_WEB_URL || ''); // ← URL desde .env

  // Instanciar Page Object
  const citasWebPage = new CitasWebPage(page);

  // Buscar disponibilidad
  await citasWebPage.buscarDisponibilidad(
    testData.citaWeb.fecha,        // ← Fecha de prueba
    testData.citaWeb.especialidad  // ← Especialidad de prueba
  );

  // Agendar cita
  await citasWebPage.agendarCita(); // ← Selecciona horario y confirma

  // Validar que la cita fue agendada (mensaje de éxito)
  await expect(page.locator('text=Cita agendada')).toBeVisible(); // ← Validación final
});