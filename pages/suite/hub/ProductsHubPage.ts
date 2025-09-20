// pages/suite/hub/ProductsHubPage.ts
// -----------------------------------------------------------------------------
// Hub de Suite: abrir productos (Citas / IDC) validando la tarjeta y pulsando “Ver”
// de manera robusta. Antes de clickear, intenta extraer la URL real del producto
// desde href / data-* / onclick. Si existe, navega en la MISMA pestaña (video único).
// Si no, hace un solo click y resuelve popup|same-tab|fallback con tiempos cortos.
// -----------------------------------------------------------------------------

import type { Page, Locator } from '@playwright/test';     // ← Tipos Playwright (Page, Locator)
import { expect } from '@playwright/test';                 // ← Asserts visibles en el reporte
import { BasePage } from '@pages/base/BasePage';           // ← Base común

// ← Si TRUE (default), consolidamos todo en la MISMA pestaña (un solo video por test)
const SAME_TAB = (process.env.OPEN_PRODUCTS_IN_SAME_TAB ?? 'true').toLowerCase() !== 'false';

// ← ORIGIN limpio (https://host) desde BASE_URL_SUITE (ignora /Suite o variantes)
function suiteOrigin(): string {
  const raw = process.env.BASE_URL_SUITE || '';
  try { return new URL(raw).origin; } catch { return raw.replace(/(https?:\/\/[^\/]+).*/i, '$1'); }
}

// ← Primer segmento del entry: sirve como “hint” de URL (/CitasBO, /IDC)
function firstPathHint(entry: string): string {
  const path = entry.startsWith('http') ? new URL(entry).pathname : entry;
  const m = path.match(/^\/[^\/]+/);
  return m ? m[0] : path || '/';
}

// ← Card del producto por texto EXACTO (título “Citas”, “Identificacion de Cliente”, etc.)
function cardByProductName(page: Page, productName: string): Locator {
  return page.locator(
    `xpath=//*[self::div or self::section or self::article][.//*[normalize-space()="${productName}"]]`
  ).first();
}

// ← Dentro del card, busca un control “Ver” tolerante (a, button o [role="button"] con texto “Ver”)
async function verControlInCard(card: Locator, page: Page): Promise<Locator> {
  const wide = card.locator('a, button, [role="button"]').filter({ hasText: /\bVer\b/i }).first();
  if (await wide.count().catch(() => 0)) return wide;

  const contains = card.locator(
    'xpath=.//*[self::a or self::button or @role="button"][contains(normalize-space(),"Ver")]'
  ).first();
  if (await contains.count().catch(() => 0)) return contains;

  return card.locator('xpath=.//*[contains(normalize-space(),"Ver")]').first(); // ← Fallback extremo
}

// ← Intenta extraer la URL real del producto desde href / data-* / onclick dentro del CARD
async function extractProductUrlFromCard(card: Locator): Promise<string> {
  return card.evaluate((root) => {
    // Helper: normaliza a absoluta con el origin actual
    const toAbs = (u: string) => {
      try { return new URL(u, window.location.origin).href; } catch { return ''; }
    };

    const candidates: string[] = [];

    // 1) href/data-* del propio card
    const attrs = ['data-url', 'data-href', 'href'];
    for (const a of attrs) {
      const v = (root as HTMLElement).getAttribute?.(a);
      if (v) candidates.push(v);
    }

    // 2) href/data-* de elementos clicables dentro del card
    const clickables = root.querySelectorAll<HTMLElement>('a, button, [role="button"]');
    clickables.forEach(el => {
      const aHref = (el as HTMLAnchorElement).href || el.getAttribute('href') || '';
      if (aHref) candidates.push(aHref);
      const ds = (el as HTMLElement).dataset || {};
      if (ds.url) candidates.push(ds.url);
      if (ds.href) candidates.push(ds.href);
      const oc = el.getAttribute('onclick') || '';
      // Parse de window.open('...'), location.href='...', etc.
      const m = oc.match(/['"](https?:\/\/[^'"]+|\/[^'"]+)['"]/);
      if (m && m[1]) candidates.push(m[1]);
    });

    // 3) También revisa onclick del contenedor
    const oc = (root as HTMLElement).getAttribute?.('onclick') || '';
    const m = oc.match(/['"](https?:\/\/[^'"]+|\/[^'"]+)['"]/);
    if (m && m[1]) candidates.push(m[1]);

    // Normaliza, quita vacíos y duplicados
    const abs = Array.from(new Set(
      candidates
        .map(s => (s || '').trim())
        .filter(Boolean)
        .map(toAbs)
        .filter(Boolean)
    ));

    // Heurística: prioriza URLs que apunten a Citas/IDC/BO
    const prefer = abs.find(u => /Citas|CitasBO|IDC/i.test(u));
    return prefer || abs[0] || ''; // ← primera válida si no hay match “bonito”
  });
}

// ← Navega en la MISMA pestaña a una URL absoluta o path relativo
async function gotoSameTab(page: Page, urlOrPath: string) {
  const absolute = urlOrPath.startsWith('http') ? urlOrPath : `${suiteOrigin()}${urlOrPath}`;
  await page.goto(absolute, { waitUntil: 'domcontentloaded' }); // ← Carga DOM
  await page.waitForLoadState('networkidle');                   // ← Red estable
}

// ← Abre un producto por nombre con estrategia “URL primero”, luego click (popup/same-tab), luego fallback
async function openProductByName(
  page: Page,
  sectionTitle: string,        // ej.: "Citas", "Identificacion de Cliente"
  productName: string,         // ej.: "Citas"
  fallbackEntry: string        // ej.: "/CitasBO/pages"
): Promise<Page> {

  // 1) Abre menú “Productos” y la sección del hub
  await page.getByRole('link',   { name: 'archive Productos' }).click();
  await page.getByRole('heading',{ name: sectionTitle }).click();

  // 2) Valida que la tarjeta existe/visible
  const card = cardByProductName(page, productName);
  await expect(card, `No se encontró la tarjeta del producto "${productName}"`).toBeVisible({ timeout: 6000 });

  // 3) EXTRAER URL REAL del producto (mejor camino para evitar redirecciones a Suite)
  const extractedUrl = await extractProductUrlFromCard(card);
  const hint = firstPathHint(fallbackEntry);
  const hintRegex = new RegExp(hint.replace(/\//g, '\\/'));

  if (extractedUrl) {                                   // ← ✅ Tenemos URL del producto
    await gotoSameTab(page, extractedUrl);              // ← MISMA pestaña (video único)
    // Verificación ligera (no rompe si no coincide)
    try { await page.waitForURL(hintRegex, { timeout: 6000 }); } catch {}
    return page;
  }

  // 4) Si no pudimos extraer URL: localizar “Ver” tolerante y hacer UN solo click
  const ver = await verControlInCard(card, page);
  await ver.scrollIntoViewIfNeeded().catch(() => {});
  await ver.waitFor({ state: 'attached', timeout: 4000 }).catch(() => {});

  // Prepara escucha de popup (corta) y haz un sólo click
  const popupPromise = page.waitForEvent('popup', { timeout: 3000 }).catch(() => null);
  const [popup] = await Promise.all([ popupPromise, ver.click({ timeout: 3000 }) ]);

  if (popup) {
    await popup.waitForLoadState('domcontentloaded').catch(() => {});
    await popup.waitForLoadState('networkidle').catch(() => {});
    const target = popup.url();

    if (SAME_TAB && target && target !== 'about:blank') {
      await gotoSameTab(page, target);                 // ← Consolida en MISMA pestaña
      await popup.close().catch(() => {});
      try { await page.waitForURL(hintRegex, { timeout: 6000 }); } catch {}
      return page;
    }
    return popup;                                      // ← Trabaja en popup si no consolidamos
  }

  // 5) Nada navegó: prueba si la URL cambió a algo que contenga el hint
  try {
    await page.waitForURL(hintRegex, { timeout: 4000 });
    return page;
  } catch {
    // 6) Último recurso: fallback por .env (puede redirigir a Suite si el entorno lo requiere)
    await gotoSameTab(page, fallbackEntry);
    return page;
  }
}

export class ProductsHubPage extends BasePage {
  constructor(page: Page) { super(page); }

  // — Citas Administración —
  async openCitasAdministracion(): Promise<Page> {
    return openProductByName(
      this.page,
      'Citas',                                                  // ← Sección del hub
      'Citas',                                                  // ← Texto exacto del card
      process.env.CITAS_ADMIN_ENTRY || '/CitasBO/pages'         // ← Fallback por entorno
    );
  }

  // — Identificación de Cliente (IDC) —
  async openIDC(): Promise<Page> {
    return openProductByName(
      this.page,
      'Identificacion de Cliente',
      'Identificacion de Cliente',
      process.env.IDC_ENTRY || '/IDC/pages/home'
    );
  }
}