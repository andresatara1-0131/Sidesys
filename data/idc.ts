// 📁 data/idc.ts
// 📊 Datos para IDC

export function generarDescripcionAleatoria(): string {
  const bases = [
    'Validación de documento',
    'Verificación de identidad', 
    'Regla de autenticación',
    'Chequeo de duplicados'
  ];
  const sufijo = Math.floor(Math.random() * 10000);
  return `${bases[Math.floor(Math.random() * bases.length)]} ${sufijo}`;
}

export function generarDescripcionEditada(): string {
  const letras = 'abcdefghijklmnopqrstuvwxyz';
  let sufijo = '';
  for (let i = 0; i < 5; i++) {
    sufijo += letras.charAt(Math.floor(Math.random() * letras.length));
  }
  return `reglaeditada${sufijo}`;
}