// 📁 data/citas.ts
// 📊 Datos de prueba específicos para Citas

/**
 * 🛎️ Servicios disponibles para citas
 */
export const serviciosCitas = [
  'Asesoría Personalizada', // 👥 Asesoría personal
  'Consulta Técnica', // 🔧 Consulta técnica
  'Soporte Especializado', // 🛟 Soporte especializado
  'Evaluación Inicial', // 📋 Evaluación inicial
  'Seguimiento Programado', // 📅 Seguimiento programado
  'Prueba Grupo' // 👥 Prueba de grupo
];

/**
 * 🏢 Sucursales disponibles para citas
 */
export const sucursalesCitas = [
  'Colombia Calle 95 # 14 - 15', // 🇨🇴 Sucursal Colombia
  'Argentina Av. Principal 123', // 🇦🇷 Sucursal Argentina
  'México Blvd. Central 456', // 🇲🇽 Sucursal México
  'Chile Plaza Central 789', // 🇨🇱 Sucursal Chile
  'Perú Centro Comercial 101', // 🇵🇪 Sucursal Perú
  'España Centro Ciudad 202' // 🇪🇸 Sucursal España
];

/**
 * 👤 Tipos de atención disponibles
 */
export const tiposAtencion = [
  'Personal', // 👥 Atención personal
  'Virtual', // 💻 Atención virtual
  'Telefónica', // 📞 Atención telefónica
  'Domiciliaria' // 🏠 Atención domiciliaria
];

/**
 * ⏰ Horarios preferidos para citas
 */
export const horariosPreferidos = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', // 🕗 Mañana
  '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', // 🕛 Mediodía
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'  // 🕑 Tarde
];

/**
 * 🎲 Obtener servicio aleatorio
 */
export function getRandomService(): string {
  return serviciosCitas[Math.floor(Math.random() * serviciosCitas.length)]; // 🎲 Servicio aleatorio
}

/**
 * 🎲 Obtener sucursal aleatoria
 */
export function getRandomBranch(): string {
  return sucursalesCitas[Math.floor(Math.random() * sucursalesCitas.length)]; // 🎲 Sucursal aleatoria
}

/**
 * 🎲 Obtener tipo de atención aleatorio
 */
export function getRandomAttentionType(): string {
  return tiposAtencion[Math.floor(Math.random() * tiposAtencion.length)]; // 🎲 Tipo aleatorio
}

/**
 * 🎲 Obtener horario aleatorio
 */
export function getRandomTime(): string {
  return horariosPreferidos[Math.floor(Math.random() * horariosPreferidos.length)]; // 🎲 Horario aleatorio
}