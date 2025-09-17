// src/utils/testData.ts
// ================================================================
// DATOS DE PRUEBA REUTILIZABLES
// - Datos ficticios para usar en tests.
// - Centralizados para fácil mantenimiento.
// ================================================================

export const testData = {
  // Datos para Grupos de Servicios
  grupoServicio: {
    nombre: 'Grupo Test Automático',
    descripcion: 'Creado por Playwright',
    estado: 'Activo',
  },

  // Datos para Sucursales
  sucursal: {
    nombre: 'Sucursal Test',
    direccion: 'Calle Ficticia 123',
    telefono: '555-1234',
  },

  // Datos para Reglas de Identificación
  reglaIDC: {
    nombre: 'Regla Test',
    tipo: 'Documento',
    prioridad: 'Alta',
  },

  // Datos para Citas Web
  citaWeb: {
    fecha: '2025-12-01',
    especialidad: 'Cardiología',
  },
};