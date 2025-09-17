/**
 * 🔢 Generar código aleatorio
 * @returns Código alfanumérico de 6 caracteres
 */
export declare function getRandomCodigo(): string;
/**
 * ⏰ Generar hora aleatoria
 * @param minHora - Hora mínima (0-23)
 * @param maxHora - Hora máxima (0-23)
 * @returns Hora formateada (HH:00)
 */
export declare function getRandomHora(minHora?: number, maxHora?: number): string;
/**
 * 🌍 Lista de países con datos para pruebas
 */
export declare const paises: {
    nombre: string;
    alias: string;
    lat: string;
    long: string;
}[];
/**
 * 🛎️ Lista de servicios para citas
 */
export declare const servicios: string[];
/**
 * 🏢 Lista de sucursales para pruebas
 */
export declare const sucursales: string[];
//# sourceMappingURL=utils.d.ts.map