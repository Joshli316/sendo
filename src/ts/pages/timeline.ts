import { t, getLang } from '../i18n';
import { setCleanup } from '../main';
import { loadTimeline as loadTimelineData } from '../data-loader';

interface TimelineEvent {
  id?: string;
  year: number;
  date?: string;
  era?: string;
  title: { en: string; jp: string };
  description: { en: string; jp: string };
  category: string;
  location?: string;
  figure?: string;
}

const CATEGORY_COLORS: Record<string, string> = {
  mission: '#C8323C',       // vermillion
  persecution: '#8A3324',   // dried blood
  heritage: '#D4A44C',      // aged gold
  cultural: '#6B8FA8',      // indigo dust
  contemporary: '#7A9B6E',  // moss green
};

const ERAS = [
  { key: 'kirishitan', label: 'era.kirishitan', start: 1549, end: 1639 },
  { key: 'underground', label: 'era.underground', start: 1639, end: 1853 },
  { key: 'bakumatsu', label: 'era.bakumatsu', start: 1853, end: 1868 },
  { key: 'meiji', label: 'era.meiji', start: 1868, end: 1912 },
  { key: 'taisho-showa', label: 'era.taisho-showa', start: 1912, end: 1945 },
  { key: 'postwar', label: 'era.postwar', start: 1945, end: 1989 },
  { key: 'reiwa', label: 'era.reiwa', start: 1989, end: 2026 },
];

let autoPlayInterval: ReturnType<typeof setInterval> | null = null;
let timelineObserver: IntersectionObserver | null = null;

async function loadTimeline(): Promise<TimelineEvent[]> {
  const data = await loadTimelineData();
  // Handle both {events: [...]} and raw array formats
  if (Array.isArray(data)) return data as TimelineEvent[];
  return (data.events || []) as TimelineEvent[];
}

export function renderTimeline(): void {
  const app = document.getElementById('app')!;
  const lang = getLang();

  app.innerHTML = `
    <div class="timeline-container container">
      <div class="tool-header">
        <h1 data-i18n="timeline.title">${t('timeline.title')}</h1>
        <p data-i18n="timeline.subtitle">${t('timeline.subtitle')}</p>
      </div>
      <div class="timeline-controls">
        ${ERAS.map(era => `
          <button class="era-btn" data-era="${era.key}" data-start="${era.start}">${t(era.label)}</button>
        `).join('')}
        <button class="autoplay-btn" id="autoplay-btn">${t('timeline.autoplay')}</button>
      </div>
      <div class="filter-tabs" style="margin-bottom: 16px;">
        <button class="filter-tab active" data-cat="all">All</button>
        ${Object.keys(CATEGORY_COLORS).map(cat => `
          <button class="filter-tab" data-cat="${cat}" style="border-left: 3px solid ${CATEGORY_COLORS[cat]};">
            ${cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        `).join('')}
      </div>
      <div class="timeline-line" id="timeline-line">
        <div style="padding: 48px; text-align: center;"><span class="spinner"></span> <span style="color: var(--text-tertiary); margin-left: 8px;">${t('common.loading')}</span></div>
      </div>
    </div>
  `;

  loadTimeline().then(events => {
    renderEvents(events);

    // Filter by category
    document.querySelectorAll('.filter-tabs .filter-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-tabs .filter-tab').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = (btn as HTMLElement).dataset.cat || 'all';
        const filtered = cat === 'all' ? events : events.filter(e => e.category === cat);
        renderEvents(filtered);
      });
    });

    // Era quick-jump
    document.querySelectorAll('.era-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const start = parseInt((btn as HTMLElement).dataset.start || '0');
        const target = document.querySelector(`[data-year="${start}"]`) ||
          document.querySelector(`.timeline-event`);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
    });

    // Auto-play
    const autoBtn = document.getElementById('autoplay-btn')!;
    autoBtn.addEventListener('click', () => {
      if (autoPlayInterval) {
        stopAutoPlay();
      } else {
        startAutoPlay();
      }
    });
  });

  setCleanup(() => {
    if (timelineObserver) { timelineObserver.disconnect(); timelineObserver = null; }
    stopAutoPlay();
  });
}

function renderEvents(events: TimelineEvent[]): void {
  const lang = getLang();
  const line = document.getElementById('timeline-line');
  if (!line) return;

  let lastDecade = 0;
  let html = '';

  for (const event of events) {
    const decade = Math.floor(event.year / 100) * 100;
    if (decade !== lastDecade) {
      html += `<div class="decade-marker" data-year="${decade}">${decade}s</div>`;
      lastDecade = decade;
    }

    const color = CATEGORY_COLORS[event.category] || '#D4A44C';
    html += `
      <div class="timeline-event" data-year="${event.year}" data-category="${event.category}">
        <span class="timeline-year">${event.year}</span>
        <span class="timeline-year-mobile">${event.year}</span>
        <h3 style="color: ${color};">${event.title[lang]}</h3>
        <p>${event.description[lang]}</p>
        ${event.figure ? `<span class="tag" style="margin-top: 8px; display: inline-block;">${event.figure}</span>` : ''}
      </div>
    `;
  }

  line.innerHTML = html;

  // Disconnect old observer before creating new one
  if (timelineObserver) timelineObserver.disconnect();
  timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });
  line.querySelectorAll('.timeline-event').forEach(el => timelineObserver!.observe(el));
}

function startAutoPlay(): void {
  const btn = document.getElementById('autoplay-btn');
  if (btn) {
    btn.textContent = t('timeline.pause');
    btn.classList.add('playing');
  }

  const events = document.querySelectorAll('.timeline-event');
  let idx = 0;

  autoPlayInterval = setInterval(() => {
    if (idx >= events.length) {
      stopAutoPlay();
      return;
    }
    events[idx].classList.add('visible');
    events[idx].scrollIntoView({ behavior: 'smooth', block: 'center' });
    idx++;
  }, 750);
}

function stopAutoPlay(): void {
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval);
    autoPlayInterval = null;
  }
  const btn = document.getElementById('autoplay-btn');
  if (btn) {
    btn.textContent = t('timeline.autoplay');
    btn.classList.remove('playing');
  }
}
