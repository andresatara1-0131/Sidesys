// utils/testData.ts
// ================================================================
// UTILIDADES: GENERADORES DE DATOS ALEATORIOS PARA PRUEBAS
// - Nombres, documentos, teléfonos, emails únicos en cada ejecución.
// - Usar estos datos para evitar duplicados y hacer pruebas más robustas.
// ================================================================

/**
 * Genera un nombre aleatorio con formato único (solo letras)
 * @returns string - Ej: "Nombre_xyz"
 */
export function generateRandomName(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz';
  let name = 'Nombre_';
  for (let i = 0; i < 5; i++) {
    name += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return name;
}

/**
 * Genera un apellido aleatorio con formato único (solo letras)
 * @returns string - Ej: "Apellido_abc"
 */
export function generateRandomLastName(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz';
  let lastName = 'Apellido_';
  for (let i = 0; i < 5; i++) {
    lastName += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return lastName;
}

/**
 * Genera un número de documento aleatorio (solo números, 8 dígitos)
 * @returns string - Ej: "32165465"
 */
export function generateRandomDocument(): string {
  return Math.floor(10000000 + Math.random() * 90000000).toString();
}

/**
 * Genera un teléfono aleatorio (solo números, 9 dígitos)
 * @returns string - Ej: "564654654"
 */
export function generateRandomPhone(): string {
  return Math.floor(100000000 + Math.random() * 900000000).toString();
}

/**
 * Genera un email aleatorio con dominio seguro
 * @returns string - Ej: "test_abc123@test.com"
 */
export function generateRandomEmail(): string {
  return `test_${Math.random().toString(36).substring(2, 8)}@test.com`;
}

/**
 * Genera un celular aleatorio (solo números, 10 dígitos)
 * @returns string - Ej: "3193658745"
 */
export function generateRandomCellphone(): string {
  return Math.floor(1000000000 + Math.random() * 9000000000).toString();
}

/**
 * Lista de tipos de documento para selección aleatoria
 */
export const documentTypes = ['DNI', 'Pasaporte', 'Cédula'];

/**
 * Lista de prefijos para selección aleatoria
 */
export const prefixes = ['Argentina (54)', 'Colombia (57)', 'México (52)'];