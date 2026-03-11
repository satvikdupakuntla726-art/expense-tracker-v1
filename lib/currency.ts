// lib/currency.ts

const API_URL = 'https://api.frankfurter.app/latest';
const CURRENCY_CACHE_KEY = 'currency_rates_cache';
const CACHE_DURATION = 12 * 60 * 60 * 1000; // 12 hours

function getCache(base: string): { rates: Record<string, number>, timestamp: number } | null {
  if (typeof window === 'undefined') return null;
  try {
    const cacheRaw = localStorage.getItem(CURRENCY_CACHE_KEY);
    if (!cacheRaw) return null;
    const cache = JSON.parse(cacheRaw);
    if (cache[base] && Date.now() - cache[base].timestamp < CACHE_DURATION) {
      return cache[base];
    }
    return null;
  } catch {
    return null;
  }
}

function setCache(base: string, rates: Record<string, number>) {
  if (typeof window === 'undefined') return;
  try {
    const cacheRaw = localStorage.getItem(CURRENCY_CACHE_KEY);
    const cache = cacheRaw ? JSON.parse(cacheRaw) : {};
    cache[base] = { rates, timestamp: Date.now() };
    localStorage.setItem(CURRENCY_CACHE_KEY, JSON.stringify(cache));
  } catch {}
}

export async function fetchRates(base: string = 'USD'): Promise<Record<string, number>> {
  // Try cache first
  const cached = getCache(base);
  if (cached) return cached.rates;
  // Fetch from API
  const res = await fetch(`${API_URL}?base=${base}`);
  if (!res.ok) throw new Error('Failed to fetch currency rates');
  const data = await res.json();
  setCache(base, data.rates);
  return data.rates;
}

export async function convertCurrency(
  amount: number,
  from: string,
  to: string = 'USD'
): Promise<number> {
  if (from === to) return amount;
  // Try cache first
  const cached = getCache(from);
  if (cached && cached.rates[to]) {
    return amount * cached.rates[to];
  }
  // Fallback to API
  const res = await fetch(`${API_URL}?amount=${amount}&from=${from}&to=${to}`);
  if (!res.ok) throw new Error('Currency conversion failed');
  const data = await res.json();
  // Optionally update cache for 'from' currency
  if (data.rates) setCache(from, data.rates);
  return data.rates[to];
}

export async function getSupportedCurrencies(): Promise<string[]> {
  const res = await fetch('https://api.frankfurter.app/currencies');
  if (!res.ok) throw new Error('Failed to fetch currencies');
  const data = await res.json();
  return Object.keys(data);
}