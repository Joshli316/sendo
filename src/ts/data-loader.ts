// Report metadata — loaded lazily via Vite's import.meta.glob so missing
// files don't break the build.

export interface Report {
  id: string;
  title: { en: string; jp: string };
  summary: { en: string; jp: string };
  content: { en: string; jp: string };
  sources: string[];
  tags: string[];
}

// Vite statically analyzes these glob patterns at build time.
const reportModules = import.meta.glob<{ default: Report }>('../data/reports/*.json');
const personaModules = import.meta.glob<{ default: PersonaData }>('../data/personas/*.json');

const reportCache: Record<string, Report> = {};
let allReportsCache: Report[] | null = null;

function reportPathFor(id: string): string {
  return `../data/reports/${id}.json`;
}

export async function loadReport(id: string): Promise<Report | null> {
  if (reportCache[id]) return reportCache[id];
  const loader = reportModules[reportPathFor(id)];
  if (!loader) return null;
  try {
    const mod = await loader();
    const data = ((mod as any).default || mod) as Report;
    reportCache[id] = data;
    return data;
  } catch {
    return null;
  }
}

export async function loadAllReports(): Promise<Report[]> {
  if (allReportsCache) return allReportsCache;
  const ids = Object.keys(reportModules)
    .map(path => path.match(/([^/]+)\.json$/)?.[1])
    .filter((id): id is string => !!id)
    .sort();
  const loaded = await Promise.all(ids.map(id => loadReport(id)));
  allReportsCache = loaded
    .filter((r): r is Report => r !== null)
    .sort((a, b) => a.id.localeCompare(b.id));
  return allReportsCache;
}

// Legacy synchronous placeholder — kept so any old imports still type-check.
export const reports: Report[] = [];

// Timeline and map data — lazy imports
export async function loadTimeline(): Promise<any> {
  try {
    const mod = await import('../data/timeline.json');
    return (mod as any).default || mod;
  } catch {
    return { events: [] };
  }
}

export async function loadMapData(): Promise<any> {
  try {
    const mod = await import('../data/map-data.json' as any);
    return (mod as any).default || mod;
  } catch {
    return [];
  }
}

export interface PersonaExcerpt {
  text: { en: string; jp: string } | string;
  source?: string;
  source_title?: string;
  year?: number;
  source_year?: number;
  source_page?: string;
}

export interface PersonaData {
  id: string;
  name: { en: string; jp: string };
  dates: string;
  role?: { en: string; jp: string };
  bio?: { en: string; jp: string };
  excerpts: PersonaExcerpt[];
  system_prompt?: { en: string; jp: string };
}

const personaCache: Record<string, PersonaData> = {};

export async function loadPersona(id: string): Promise<PersonaData | null> {
  if (personaCache[id]) return personaCache[id];
  const loader = personaModules[`../data/personas/${id}.json`];
  if (!loader) return null;
  try {
    const mod = await loader();
    const data = ((mod as any).default || mod) as PersonaData;
    personaCache[id] = data;
    return data;
  } catch {
    return null;
  }
}
