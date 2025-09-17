// src/config/env.ts
// ================================================================
// CONFIGURACIÓN DE VARIABLES DE ENTORNO
// - Carga el archivo .env
// - Exporta un objeto ENV con todas las variables necesarias
// - Evita leer process.env directamente en los tests
// ================================================================

import { config } from 'dotenv'; // ← Librería para cargar .env

config(); // ← Ejecuta la carga del archivo .env

// Exporta un objeto con todas las variables que usarás en el proyecto
export const ENV = {
  SUITE_URL: process.env.SUITE_URL || 'https://suite.tusistema.com',   // ← URL de Suite (con valor por defecto)
  CITAS_WEB_URL: process.env.CITAS_WEB_URL || 'https://encuestas.sidesys.ar/CitasWeb', // ← URL de Citas Web
  USERNAME: process.env.USERNAME || '',                                // ← Usuario (obligatorio, sin defecto)
  PASSWORD: process.env.PASSWORD || '',                                // ← Contraseña (obligatorio, sin defecto)
};