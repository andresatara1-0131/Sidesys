"use strict";
// 📁 data/citas.ts
// 📊 Datos de prueba específicos para Citas
Object.defineProperty(exports, "__esModule", { value: true });
exports.horariosPreferidos = exports.tiposAtencion = exports.sucursalesCitas = exports.serviciosCitas = void 0;
exports.getRandomService = getRandomService;
exports.getRandomBranch = getRandomBranch;
exports.getRandomAttentionType = getRandomAttentionType;
exports.getRandomTime = getRandomTime;
/**
 * 🛎️ Servicios disponibles para citas
 */
exports.serviciosCitas = [
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
exports.sucursalesCitas = [
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
exports.tiposAtencion = [
    'Personal', // 👥 Atención personal
    'Virtual', // 💻 Atención virtual
    'Telefónica', // 📞 Atención telefónica
    'Domiciliaria' // 🏠 Atención domiciliaria
];
/**
 * ⏰ Horarios preferidos para citas
 */
exports.horariosPreferidos = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', // 🕗 Mañana
    '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', // 🕛 Mediodía
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30' // 🕑 Tarde
];
/**
 * 🎲 Obtener servicio aleatorio
 */
function getRandomService() {
    return exports.serviciosCitas[Math.floor(Math.random() * exports.serviciosCitas.length)]; // 🎲 Servicio aleatorio
}
/**
 * 🎲 Obtener sucursal aleatoria
 */
function getRandomBranch() {
    return exports.sucursalesCitas[Math.floor(Math.random() * exports.sucursalesCitas.length)]; // 🎲 Sucursal aleatoria
}
/**
 * 🎲 Obtener tipo de atención aleatorio
 */
function getRandomAttentionType() {
    return exports.tiposAtencion[Math.floor(Math.random() * exports.tiposAtencion.length)]; // 🎲 Tipo aleatorio
}
/**
 * 🎲 Obtener horario aleatorio
 */
function getRandomTime() {
    return exports.horariosPreferidos[Math.floor(Math.random() * exports.horariosPreferidos.length)]; // 🎲 Horario aleatorio
}
//# sourceMappingURL=citas.js.map