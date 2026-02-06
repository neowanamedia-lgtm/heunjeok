"use client";

export type Locale = "ko" | "en";

export type Trace = {
  id: string;
  createdAt: string; // ISO
  author: string;
  intervention: number; // 0-100
  choice: string;
  // language-specific versions (original-first)
  titleKo?: string;
  bodyKo?: string;
  titleEn?: string;
  bodyEn?: string;
  // which locale was used as original at creation time
  originalLocale: Locale;
};

export type Reading = {
  id: string;
  postId: string;
  createdAt: string;
  locale: Locale;
  text: string;
};

const TRACES_KEY = "heunjeok_traces_v1";
const READINGS_KEY = "heunjeok_readings_v1";

function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function seedIfEmpty(seed: Trace[]) {
  if (typeof window === "undefined") return;
  const existing = safeParse<Trace[]>(localStorage.getItem(TRACES_KEY), []);
  if (existing.length > 0) return;
  localStorage.setItem(TRACES_KEY, JSON.stringify(seed));
}

export function getTraces(): Trace[] {
  if (typeof window === "undefined") return [];
  return safeParse<Trace[]>(localStorage.getItem(TRACES_KEY), []).sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export function getTrace(id: string): Trace | null {
  return getTraces().find((t) => t.id === id) ?? null;
}

export function addTrace(trace: Trace): Trace {
  const list = getTraces();
  const next = [trace, ...list];
  localStorage.setItem(TRACES_KEY, JSON.stringify(next));
  return trace;
}

export function getReadings(postId: string): Reading[] {
  if (typeof window === "undefined") return [];
  const all = safeParse<Reading[]>(localStorage.getItem(READINGS_KEY), []);
  return all
    .filter((r) => r.postId === postId)
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export function addReading(reading: Reading): Reading {
  const all = safeParse<Reading[]>(localStorage.getItem(READINGS_KEY), []);
  const next = [reading, ...all];
  localStorage.setItem(READINGS_KEY, JSON.stringify(next));
  return reading;
}

export function pickTitle(trace: Trace, locale: Locale): { title: string; missing: boolean } {
  if (locale === "ko") {
    if (trace.titleKo?.trim()) return { title: trace.titleKo, missing: false };
  } else {
    if (trace.titleEn?.trim()) return { title: trace.titleEn, missing: false };
  }
  // fallback to original
  if (trace.originalLocale === "ko") return { title: trace.titleKo ?? "(untitled)", missing: true };
  return { title: trace.titleEn ?? "(untitled)", missing: true };
}

export function pickBody(trace: Trace, locale: Locale): { body: string; missing: boolean } {
  if (locale === "ko") {
    if (trace.bodyKo?.trim()) return { body: trace.bodyKo, missing: false };
  } else {
    if (trace.bodyEn?.trim()) return { body: trace.bodyEn, missing: false };
  }
  if (trace.originalLocale === "ko") return { body: trace.bodyKo ?? "", missing: true };
  return { body: trace.bodyEn ?? "", missing: true };
}
