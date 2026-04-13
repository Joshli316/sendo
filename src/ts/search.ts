import { getLang } from './i18n';
import { loadAllReports, type Report } from './data-loader';

interface SearchResult {
  id: string;
  title: string;
  excerpt: string;
  type: 'report' | 'tool' | 'page';
  href: string;
}

let searchIndex: Report[] = [];

async function loadIndex(): Promise<void> {
  if (searchIndex.length > 0) return;
  searchIndex = await loadAllReports();
}

function search(query: string): SearchResult[] {
  const lang = getLang();
  const q = query.toLowerCase().trim();
  if (!q) return [];

  const results: SearchResult[] = [];

  // Search reports
  for (const report of searchIndex) {
    const title = report.title[lang].toLowerCase();
    const summary = report.summary[lang].toLowerCase();
    const content = report.content[lang].toLowerCase();

    if (title.includes(q) || summary.includes(q) || content.includes(q)) {
      // Find excerpt around the match
      let excerpt = report.summary[lang];
      const idx = content.indexOf(q);
      if (idx >= 0) {
        const start = Math.max(0, idx - 60);
        const end = Math.min(content.length, idx + q.length + 60);
        excerpt = (start > 0 ? '...' : '') + report.content[lang].slice(start, end) + (end < content.length ? '...' : '');
      }

      results.push({
        id: report.id,
        title: report.title[lang],
        excerpt,
        type: 'report',
        href: `#/research/${report.id}`,
      });
    }
  }

  // Static pages/tools
  const staticPages: { title: string; href: string; keywords: string[] }[] = [
    { title: 'Timeline', href: '#/research/timeline', keywords: ['timeline', 'history', 'chronology', '年表', '歴史'] },
    { title: 'Ask the Archive', href: '#/tools/ask', keywords: ['ask', 'archive', 'ai', 'search', 'question', '質問', 'アーカイブ'] },
    { title: 'Returnee Tool', href: '#/tools/returnee', keywords: ['returnee', 'return', 'japan', 'kit', '帰国', '準備'] },
    { title: 'Training', href: '#/tools/training', keywords: ['training', 'volunteer', 'module', '研修', 'ボランティア'] },
    { title: 'Conversations', href: '#/personas', keywords: ['conversation', 'persona', 'historical', 'chat', '対話', '歴史人物'] },
    { title: 'Retention Calculator', href: '#/tools/retention', keywords: ['retention', 'calculator', 'faith', '信仰継続', '計算'] },
    { title: 'Gap Tracker', href: '#/research/gaps', keywords: ['gap', 'research', 'tracker', 'ギャップ', '研究'] },
    { title: 'Comparator', href: '#/research/comparator', keywords: ['comparator', 'bilingual', 'compare', '比較', 'バイリンガル'] },
    { title: 'Map', href: '#/research/map', keywords: ['map', 'spread', 'geography', '地図', '伝播'] },
    { title: 'Network', href: '#/research/network', keywords: ['network', 'graph', 'connections', 'ネットワーク', '関係'] },
  ];

  for (const page of staticPages) {
    if (page.title.toLowerCase().includes(q) || page.keywords.some(k => k.includes(q))) {
      results.push({
        id: page.href,
        title: page.title,
        excerpt: page.keywords.join(', '),
        type: 'tool',
        href: page.href,
      });
    }
  }

  return results.slice(0, 10);
}

function highlightMatch(text: string, query: string): string {
  if (!query) return text;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return text.replace(new RegExp(`(${escaped})`, 'gi'), '<mark>$1</mark>');
}

export function initSearch(): void {
  const input = document.querySelector('.search-input') as HTMLInputElement;
  const resultsContainer = document.getElementById('search-results');
  const searchTrigger = document.getElementById('search-trigger');
  const modal = document.getElementById('search-modal');

  if (!input || !resultsContainer || !modal) return;

  searchTrigger?.addEventListener('click', () => {
    modal.classList.add('open');
    input.focus();
    void loadIndex();
  });

  let debounceTimer: ReturnType<typeof setTimeout>;
  input.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => void performSearch(), 150);
  });

  function navigateToResult(href: string): void {
    location.hash = href.replace('#', '');
    modal.classList.remove('open');
    input.value = '';
    resultsContainer!.innerHTML = '';
  }

  // Keyboard navigation for search results
  input.addEventListener('keydown', (e) => {
    if (!resultsContainer) return;
    const items = resultsContainer.querySelectorAll('.search-result');
    if (items.length === 0) return;

    const active = resultsContainer.querySelector('.search-result--active');
    let idx = active ? Array.from(items).indexOf(active) : -1;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      active?.classList.remove('search-result--active');
      idx = idx < items.length - 1 ? idx + 1 : 0;
      items[idx].classList.add('search-result--active');
      items[idx].scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      active?.classList.remove('search-result--active');
      idx = idx > 0 ? idx - 1 : items.length - 1;
      items[idx].classList.add('search-result--active');
      items[idx].scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'Enter' && active) {
      e.preventDefault();
      const href = (active as HTMLElement).dataset.href;
      if (href) navigateToResult(href);
    }
  });

  async function performSearch(): Promise<void> {
    if (!resultsContainer) return;
    const query = input.value.trim();
    if (query.length < 2) {
      resultsContainer.innerHTML = '';
      return;
    }
    await loadIndex();
    const results = search(query);
    if (results.length === 0) {
      resultsContainer.innerHTML = `<div class="search-hint">No results found</div>`;
      return;
    }
    resultsContainer.innerHTML = results.map(r => `
      <div class="search-result" data-href="${r.href}">
        <h4>${highlightMatch(r.title, query)}</h4>
        <p>${highlightMatch(r.excerpt.replace(/[#*_]/g, '').slice(0, 120), query)}</p>
      </div>
    `).join('');
  }

  resultsContainer.addEventListener('click', (e) => {
    const result = (e.target as HTMLElement).closest('.search-result') as HTMLElement;
    const href = result?.dataset.href;
    if (href) navigateToResult(href);
  });
}
