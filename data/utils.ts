// 📁 data/utils.ts
// 🎲 Utilidades de datos corregidas

export function getRandomCodigo(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function getRandomHora(minHora = 8, maxHora = 18): string {
  const hora = Math.floor(Math.random() * (maxHora - minHora + 1)) + minHora;
  return `${hora.toString().padStart(2, '0')}:00`;
}

export const paises = [
  { nombre: 'Colombia', alias: 'COL', lat: '4', long: '-74' },
  { nombre: 'Argentina', alias: 'ARG', lat: '-34', long: '-64' },
  { nombre: 'México', alias: 'MEX', lat: '23', long: '-102' }
];

// ✅ Exportar getRandomItem que falta
export function getRandomItem<T>(array: T[]): T {
  if (array.length === 0) throw new Error('Array vacío');
  return array[Math.floor(Math.random() * array.length)];
}