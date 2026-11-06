import type { Locale } from "@/data/company";

const STORAGE_KEY = "pls-locale";
const listeners = new Set<() => void>();
let current: Locale | null = null;

// ponytail: no IP geolocation service. Browser language is the country proxy:
// Indonesian browser → id, everything else → en. Swap in an IP lookup here later.
function read(): Locale {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored === "id" || stored === "en") return stored;
    } catch {}

    const languages = navigator.languages?.length ? navigator.languages : [navigator.language];
    return languages.some((language) => language.toLowerCase().startsWith("id")) ? "id" : "en";
}

export function getLocale(): Locale {
    current ??= read();
    return current;
}
export function subscribeLocale(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
}

export function storeLocale(locale: Locale) {
    current = locale;
    try {
        localStorage.setItem(STORAGE_KEY, locale);
    } catch {
        // Storage can be blocked; the in-memory choice still applies this visit.
    }
    for (const listener of listeners) listener();
}
