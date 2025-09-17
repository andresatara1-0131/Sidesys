// 📁 types/global.d.ts
// 🎯 Definiciones de tipos TypeScript globales

declare namespace globalThis {
  // 📊 Tipo para datos de sucursal
  type SucursalData = {
    nombre: string; // 🏷️ Nombre de la sucursal
    alias: string; // 🔤 Alias de la sucursal
    lat: string; // 📍 Latitud
    long: string; // 📍 Longitud
    codigo: string; // 🔢 Código único
  };

  // 📊 Tipo para datos de regla de identificación
  type ReglaIdentificacionData = {
    descripcion: string; // 📝 Descripción de la regla
    tipo: string; // 🏷️ Tipo de regla
    activa: boolean; // 🔄 Estado activo/inactivo
  };

  // 📊 Tipo para datos de cita
  type CitaData = {
    servicio: string; // 🛎️ Servicio solicitado
    sucursal: string; // 🏢 Sucursal de atención
    fecha: string; // 📅 Fecha de la cita
    hora: string; // ⏰ Hora de la cita
  };
}

// 🎯 Extender expect de Playwright con matchers personalizados
declare namespace PlaywrightTest {
  interface Matchers<R> {
    toBeWithinRange(floor: number, ceiling: number): R; // 🔢 Validar rango numérico
    toHaveCountGreaterThan(minimum: number): R; // 🔢 Validar conteo mínimo
  }
}