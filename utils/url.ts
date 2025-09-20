/** Helpers de URL — construye URLs absolutas a partir de .env (sin heurísticas) */

function trimEndSlash(s: string) {                           // ← Quita slashes del final
  return (s || '').replace(/\/+$/, '');
}

function ensureLeadingSlash(s: string) {                     // ← Asegura slash al inicio
  const v = s || '';
  return v.startsWith('/') ? v : `/${v}`;
}

function joinUrl(base: string, path: string) {               // ← Une base + path sin dobles slashes
  const b = trimEndSlash(base);
  const p = ensureLeadingSlash(path);
  return `${b}${p}`;
}

function mustEnv(name: string): string {                     // ← Obtiene variable obligatoria o lanza error claro
  const v = process.env[name];
  if (!v) throw new Error(`[ENV] Falta variable requerida: ${name}`);
  return v;
}

export function suiteUrl(pathname: string) {                 // ← URL absoluta para cualquier ruta de Suite
  const base = mustEnv('BASE_URL_SUITE');                    // ← Base exacta (puede traer /Suite o /suite123)
  return joinUrl(base, pathname);                            // ← Une con la ruta indicada
}

export function suiteLoginUrl() {                            // ← URL absoluta de login de Suite
  const loginPath = process.env.SUITE_LOGIN_PATH || '/login';// ← Path configurable (default /login)
  return suiteUrl(loginPath);                                // ← Une base + login path
}