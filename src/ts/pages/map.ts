import { t, getLang } from '../i18n';
import { setCleanup } from '../main';
import { loadMapData as loadMapDataAsync } from '../data-loader';

interface MapPoint {
  name: string;
  type: string;
  denomination: string;
  lat: number;
  lng: number;
  founded: number;
  closed?: number;
}

const ERA_LABELS: { year: number; en: string; jp: string }[] = [
  { year: 1549, en: '1549: Xavier arrives at Kagoshima', jp: '1549：ザビエル鹿児島上陸' },
  { year: 1597, en: '1597: 26 Martyrs of Nagasaki', jp: '1597：日本二十六聖人殉教' },
  { year: 1614, en: '1614: Tokugawa ban on Christianity', jp: '1614：徳川禁教令' },
  { year: 1865, en: '1865: Discovery at Oura Church', jp: '1865：大浦天主堂での信徒発見' },
  { year: 1873, en: '1873: Meiji religious freedom', jp: '1873：明治信教自由' },
  { year: 1945, en: '1945: Nagasaki atomic bombing', jp: '1945：長崎原爆' },
  { year: 2018, en: '2018: UNESCO Hidden Christian sites', jp: '2018：UNESCO世界遺産登録' },
];

const TYPE_COLORS: Record<string, string> = {
  church: '#C8323C',
  school: '#60A5FA',
  hospital: '#4ADE80',
  other: '#9B9180',
};

let mapInstance: any = null;
let markers: { marker: any; point: MapPoint }[] = [];
let animationInterval: ReturnType<typeof setInterval> | null = null;

async function loadMapData(): Promise<MapPoint[]> {
  try {
    const data = await loadMapDataAsync();
    if (data && (data as MapPoint[]).length > 0) return data as MapPoint[];
  } catch (e) { console.warn('Map data load failed, using defaults:', e); }
  return getDefaultMapData();
}

function getDefaultMapData(): MapPoint[] {
  // Starter set of historic Japan mission stations.
  // Full map-data.json will be rebuilt from research reports.
  return [
    { name: 'Kagoshima: Xavier Landing', type: 'other', denomination: 'Jesuit', lat: 31.5966, lng: 130.5571, founded: 1549 },
    { name: 'Yamaguchi: Xavier\'s first congregation', type: 'church', denomination: 'Jesuit', lat: 34.1859, lng: 131.4706, founded: 1551 },
    { name: 'Funai (Oita): Otomo Sorin\'s capital', type: 'church', denomination: 'Jesuit', lat: 33.2382, lng: 131.6126, founded: 1553 },
    { name: 'Nagasaki: Church of All Saints', type: 'church', denomination: 'Jesuit', lat: 32.7503, lng: 129.8777, founded: 1569 },
    { name: 'Nishizaka Hill: 26 Martyrs', type: 'other', denomination: 'Franciscan/Jesuit', lat: 32.7500, lng: 129.8765, founded: 1597 },
    { name: 'Azuchi Seminario', type: 'school', denomination: 'Jesuit', lat: 35.1548, lng: 136.1390, founded: 1580, closed: 1614 },
    { name: 'Shimabara: Hara Castle', type: 'other', denomination: 'Catholic (lay)', lat: 32.6327, lng: 130.3733, founded: 1637, closed: 1638 },
    { name: 'Oura Church (Nagasaki)', type: 'church', denomination: 'Catholic', lat: 32.7343, lng: 129.8703, founded: 1864 },
    { name: 'Urakami Cathedral (Nagasaki)', type: 'church', denomination: 'Catholic', lat: 32.7770, lng: 129.8669, founded: 1925 },
    { name: 'Hakodate: Russian Orthodox Church', type: 'church', denomination: 'Orthodox', lat: 41.7641, lng: 140.7172, founded: 1861 },
    { name: 'Yokohama: Hepburn Mission', type: 'church', denomination: 'Presbyterian', lat: 35.4437, lng: 139.6380, founded: 1859 },
    { name: 'Meiji Gakuin (Tokyo)', type: 'school', denomination: 'Presbyterian', lat: 35.6444, lng: 139.7345, founded: 1863 },
    { name: 'Doshisha University (Kyoto)', type: 'school', denomination: 'Congregational', lat: 35.0306, lng: 135.7597, founded: 1875 },
    { name: 'Sapporo Agricultural College', type: 'school', denomination: 'Non-denominational', lat: 43.0708, lng: 141.3408, founded: 1876 },
    { name: 'Kumamoto Band site', type: 'church', denomination: 'Non-denominational', lat: 32.8032, lng: 130.7079, founded: 1876 },
    { name: 'St. Luke\'s Hospital (Tokyo)', type: 'hospital', denomination: 'Episcopal', lat: 35.6656, lng: 139.7728, founded: 1902 },
    { name: 'Hiroshima: Nagarekawa Church', type: 'church', denomination: 'Methodist', lat: 34.3897, lng: 132.4589, founded: 1887 },
    { name: 'Osaka: Salvation Army Japan HQ', type: 'other', denomination: 'Salvation Army', lat: 34.6937, lng: 135.5023, founded: 1895 },
    { name: 'Aoyama Gakuin (Tokyo)', type: 'school', denomination: 'Methodist', lat: 35.6606, lng: 139.7132, founded: 1874 },
    { name: 'Ikitsuki Island: Kakure Kirishitan', type: 'other', denomination: 'Hidden Christian', lat: 33.3729, lng: 129.4075, founded: 1620 },
    { name: 'Goto Islands: Hidden Christian villages', type: 'other', denomination: 'Hidden Christian', lat: 32.6961, lng: 128.8420, founded: 1620 },
    { name: 'Sotome: Ono Church (UNESCO)', type: 'church', denomination: 'Catholic', lat: 32.8628, lng: 129.7167, founded: 1893 },
    { name: 'Tokyo: Nikolai-do Cathedral', type: 'church', denomination: 'Orthodox', lat: 35.6993, lng: 139.7679, founded: 1891 },
    { name: 'Kyodan HQ (Tokyo)', type: 'other', denomination: 'UCCJ/Kyodan', lat: 35.6936, lng: 139.7515, founded: 1941 },
    { name: 'JCFN HQ (Takadanobaba, Tokyo)', type: 'other', denomination: 'JCFN', lat: 35.7123, lng: 139.7038, founded: 1990 },
  ];
}

export function renderMap(): void {
  const app = document.getElementById('app')!;
  const lang = getLang();

  app.innerHTML = `
    <div class="map-container">
      <div class="map-controls">
        <div class="map-slider-container">
          <button class="autoplay-btn" id="map-play">▶</button>
          <input type="range" class="map-slider" id="map-slider" min="1549" max="2026" value="2026" step="1">
          <span class="map-year-display" id="map-year">2026</span>
        </div>
        <div class="map-speed">
          <button data-speed="1" class="active">1x</button>
          <button data-speed="2">2x</button>
          <button data-speed="4">4x</button>
        </div>
        <div class="layer-toggles">
          <label class="layer-toggle"><input type="checkbox" data-type="church" checked> ${lang === 'en' ? 'Churches' : '教会'}</label>
          <label class="layer-toggle"><input type="checkbox" data-type="school" checked> ${lang === 'en' ? 'Schools' : '学校'}</label>
          <label class="layer-toggle"><input type="checkbox" data-type="hospital" checked> ${lang === 'en' ? 'Hospitals' : '病院'}</label>
        </div>
      </div>
      <div id="map" style="position: relative;">
        <div class="era-label" id="era-label"></div>
      </div>
    </div>
  `;

  // Load Leaflet dynamically
  loadLeaflet().then(async () => {
    const data = await loadMapData();
    if (!data || data.length === 0) {
      showEmptyState(lang);
      return;
    }
    initMap(data);
  });

  setCleanup(() => {
    if (animationInterval) clearInterval(animationInterval);
    mapInstance = null;
    markers = [];
  });
}

function showEmptyState(lang: string): void {
  const mapEl = document.getElementById('map');
  if (!mapEl) return;
  mapEl.innerHTML = `
    <div style="display:flex; align-items:center; justify-content:center; height:100%; padding:48px; text-align:center;">
      <div>
        <h3 style="color: var(--accent-gold); margin-bottom: 12px;">${lang === 'en' ? 'Map data coming soon' : '地図データは準備中'}</h3>
        <p style="color: var(--text-secondary); font-size: 0.9375rem; max-width: 420px;">
          ${lang === 'en'
            ? 'A full spatial-temporal database of churches, missions, and institutions across Japan (1549-present) is being prepared from research reports.'
            : '日本全国の教会、宣教所、機関の時空間データベース（1549年-現在）を、調査報告書から準備中です。'}
        </p>
      </div>
    </div>
  `;
}

async function loadLeaflet(): Promise<void> {
  if ((window as any).L) return;

  // Load CSS
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
  link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
  link.crossOrigin = '';
  document.head.appendChild(link);

  // Load JS with SRI
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
    script.crossOrigin = '';
    script.onload = () => resolve();
    document.head.appendChild(script);
  });
}

function initMap(data: MapPoint[]): void {
  const L = (window as any).L;
  if (!L) return;

  mapInstance = L.map('map', {
    center: [36, 138],
    zoom: 5,
    zoomControl: true,
    attributionControl: false,
  });

  // Dark tile layer
  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    maxZoom: 18,
  }).addTo(mapInstance);

  // Pre-create all markers once, toggle visibility on filter/slider change
  const slider = document.getElementById('map-slider') as HTMLInputElement;
  const yearDisplay = document.getElementById('map-year')!;

  for (const point of data) {
    const color = TYPE_COLORS[point.type] || TYPE_COLORS.other;
    const marker = L.circleMarker([point.lat, point.lng], {
      radius: 5,
      fillColor: color,
      color: color,
      fillOpacity: 0.7,
      weight: 1,
      opacity: 0.9,
    });

    marker.bindPopup(`
      <div style="font-family: Inter, sans-serif; font-size: 13px; min-width: 150px;">
        <strong>${point.name}</strong><br>
        <span style="opacity: 0.7;">${point.type} · ${point.denomination}</span><br>
        <span style="font-family: monospace;">Founded: ${point.founded}</span>
        ${point.closed ? `<br><span style="font-family: monospace;">Closed: ${point.closed}</span>` : ''}
      </div>
    `);
    markers.push({ marker, point });
  }

  function updateMarkers(): void {
    const year = parseInt(slider.value);
    yearDisplay.textContent = String(year);

    const activeTypes = new Set<string>();
    document.querySelectorAll('.layer-toggle input:checked').forEach(cb => {
      activeTypes.add((cb as HTMLInputElement).dataset.type || '');
    });

    // Toggle visibility instead of destroy/recreate
    for (const { marker, point } of markers) {
      const visible = point.founded <= year &&
        (!point.closed || point.closed >= year) &&
        (activeTypes.has(point.type) || point.type === 'other');

      if (visible && !mapInstance.hasLayer(marker)) {
        marker.addTo(mapInstance);
      } else if (!visible && mapInstance.hasLayer(marker)) {
        marker.remove();
      }
    }

    updateEraLabel(year);
  }

  slider.addEventListener('input', updateMarkers);

  // Layer toggles
  document.querySelectorAll('.layer-toggle input').forEach(cb => {
    cb.addEventListener('change', updateMarkers);
  });

  // Play/pause
  let speed = 1;
  const playBtn = document.getElementById('map-play')!;
  playBtn.addEventListener('click', () => {
    if (animationInterval) {
      clearInterval(animationInterval);
      animationInterval = null;
      playBtn.textContent = '▶';
      playBtn.classList.remove('playing');
    } else {
      slider.value = '1549';
      playBtn.textContent = '⏸';
      playBtn.classList.add('playing');
      animationInterval = setInterval(() => {
        const val = parseInt(slider.value);
        if (val >= 2026) {
          clearInterval(animationInterval!);
          animationInterval = null;
          playBtn.textContent = '▶';
          playBtn.classList.remove('playing');
          return;
        }
        slider.value = String(val + speed);
        updateMarkers();
      }, 50);
    }
  });

  // Speed buttons
  document.querySelectorAll('.map-speed button').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.map-speed button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      speed = parseInt((btn as HTMLElement).dataset.speed || '1');
    });
  });

  updateMarkers();
}

function updateEraLabel(year: number): void {
  const label = document.getElementById('era-label');
  if (!label) return;
  const lang = getLang();

  const era = ERA_LABELS.find((e, i) => {
    const next = ERA_LABELS[i + 1];
    return year >= e.year && (!next || year < next.year);
  });

  if (era && Math.abs(year - era.year) < 5) {
    label.textContent = lang === 'jp' ? era.jp : era.en;
    label.classList.add('visible');
  } else {
    label.classList.remove('visible');
  }
}
