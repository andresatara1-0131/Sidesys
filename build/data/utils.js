"use strict";
// 📁 data/utils.ts
// 🎲 Generadores de datos aleatorios para pruebas
Object.defineProperty(exports, "__esModule", { value: true });
exports.sucursales = exports.servicios = exports.paises = void 0;
exports.getRandomCodigo = getRandomCodigo;
exports.getRandomHora = getRandomHora;
/**
 * 🔢 Generar código aleatorio
 * @returns Código alfanumérico de 6 caracteres
 */
function getRandomCodigo() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'; // 🔤 Caracteres permitidos
    let result = '';
    for (let i = 0; i < 6; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length)); // 🎲 Carácter aleatorio
    }
    return result; // 📤 Devolver código generado
}
/**
 * ⏰ Generar hora aleatoria
 * @param minHora - Hora mínima (0-23)
 * @param maxHora - Hora máxima (0-23)
 * @returns Hora formateada (HH:00)
 */
function getRandomHora(minHora = 8, maxHora = 18) {
    const hora = Math.floor(Math.random() * (maxHora - minHora + 1)) + minHora; // 🎲 Hora aleatoria
    return `${hora.toString().padStart(2, '0')}:00`; // ⏰ Formatear a HH:00
}
/**
 * 🌍 Lista de países con datos para pruebas
 */
exports.paises = [
    { nombre: 'Colombia', alias: 'COL', lat: '4', long: '-74' }, // 🇨🇴 Colombia
    { nombre: 'Argentina', alias: 'ARG', lat: '-34', long: '-64' }, // 🇦🇷 Argentina
    { nombre: 'México', alias: 'MEX', lat: '23', long: '-102' }, // 🇲🇽 México
    { nombre: 'Chile', alias: 'CHL', lat: '-30', long: '-71' }, // 🇨🇱 Chile
    { nombre: 'Perú', alias: 'PER', lat: '-9', long: '-75' }, // 🇵🇪 Perú
    { nombre: 'España', alias: 'ESP', lat: '40', long: '-4' } // 🇪🇸 España
];
/**
 * 🛎️ Lista de servicios para citas
 */
exports.servicios = [
    'Asesoría Personalizada', // 👥 Asesoría
    'Consulta Técnica', // 🔧 Consulta técnica
    'Soporte Especializado', // 🛟 Soporte
    'Evaluación Inicial', // 📋 Evaluación
    'Seguimiento Programado' // 📅 Seguimiento
];
/**
 * 🏢 Lista de sucursales para pruebas
 */
exports.sucursales = [
    'Colombia Calle 95 # 14 - 15', // 🇨🇴 Sucursal Colombia
    'Argentina Av. Principal 123', // 🇦🇷 Sucursal Argentina
    'México Blvd. Central 456', // 🇲🇽 Sucursal México
    'Chile Plaza Central 789', // 🇨🇱 Sucursal Chile
    'Perú Centro Comercial 101' // 🇵🇪 Sucursal Perú
];
//# sourceMappingURL=utils.js.map