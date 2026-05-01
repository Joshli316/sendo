import { t, SISTER_PROJECTS } from '../i18n';
import '../../css/pages/home.css';

function renderFamilyBlock(): string {
  const main = SISTER_PROJECTS.find(p => p.isMain)!;
  const others = SISTER_PROJECTS.filter(p => !p.isMain && p.key !== 'sendo');
  return `
    <div class="footer-family">
      <div class="footer-family__title" data-i18n="footer.family_title">${t('footer.family_title')}</div>
      <div class="footer-family__row">
        <a class="footer-family__main" href="${main.url}" target="_blank" rel="noopener">
          <span aria-hidden="true">${main.emoji}</span>
          <span class="footer-family__main-tag">${main.tag}</span>
          <span>XuanYan</span>
          <span class="footer-family__main-badge" data-i18n="footer.family_main">${t('footer.family_main')}</span>
        </a>
        <span class="footer-family__current" aria-current="page">
          <span aria-hidden="true">🇯🇵</span>
          <span>宣道 Sendō</span>
        </span>
        ${others.map(p => `
          <a class="footer-family__sister" href="${p.url}" target="_blank" rel="noopener">
            <span aria-hidden="true">${p.emoji}</span>
            <span>${p.tag}</span>
          </a>
        `).join('')}
      </div>
    </div>
  `;
}

export function renderHome(): void {
  const app = document.getElementById('app')!;

  app.innerHTML = `
    <section class="sendo-hero">
      <div class="sendo-hero-grid">
        <div class="sendo-hero-left">
          <div class="sendo-era-rail" aria-hidden="true">
            <span class="sendo-era-mark">1549</span>
            <span class="sendo-era-mark">1639</span>
            <span class="sendo-era-mark">1865</span>
            <span class="sendo-era-mark">1945</span>
            <span class="sendo-era-mark">2026</span>
          </div>
          <div class="sendo-title-block">
            <div class="sendo-title-kanji" aria-hidden="true">宣道</div>
            <div class="sendo-title-romaji">SENDŌ</div>
            <div class="sendo-enso" aria-hidden="true">
              <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M60,12 C86,12 108,34 108,60 C108,86 86,108 60,108 C34,108 12,86 12,60 C12,40 26,22 46,15" stroke="#C8323C" stroke-width="4" stroke-linecap="round" fill="none" opacity="0.85"/>
              </svg>
            </div>
          </div>
        </div>

        <div class="sendo-hero-right">
          <div class="sendo-eyebrow" aria-hidden="true">
            <span class="sendo-torii"></span>
            <span class="eyebrow-text">Japan Missions Research · 日本宣教研究</span>
          </div>
          <h1 class="sendo-question" data-i18n="hero.question">${t('hero.question')}</h1>
          <p class="sendo-answer" data-i18n="hero.answer">${t('hero.answer')}</p>
          <p class="sendo-intro" data-i18n="hero.intro">${t('hero.intro')}</p>

          <div class="sendo-stat-bar">
            <div class="sendo-stat">
              <div class="sendo-stat-num">475</div>
              <div class="sendo-stat-label" data-i18n="hero.stat.years">${t('hero.stat.years')}</div>
            </div>
            <div class="sendo-stat">
              <div class="sendo-stat-num">12</div>
              <div class="sendo-stat-label" data-i18n="hero.stat.reports">${t('hero.stat.reports')}</div>
            </div>
            <div class="sendo-stat">
              <div class="sendo-stat-num">12</div>
              <div class="sendo-stat-label" data-i18n="hero.stat.personas">${t('hero.stat.personas')}</div>
            </div>
            <div class="sendo-stat sendo-stat-accent">
              <div class="sendo-stat-num">1.1%</div>
              <div class="sendo-stat-label" data-i18n="hero.stat.percent">${t('hero.stat.percent')}</div>
            </div>
          </div>

          <div class="sendo-hero-ctas">
            <a href="#/research" class="sendo-btn sendo-btn-solid" data-i18n="hero.cta.research">${t('hero.cta.research')}</a>
            <a href="#/tools/ask" class="sendo-btn sendo-btn-ghost" data-i18n="hero.cta.ask">${t('hero.cta.ask')}</a>
          </div>
        </div>
      </div>
    </section>

    <div class="sendo-sumi-divider" aria-hidden="true">
      <svg viewBox="0 0 1200 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,55 C180,20 360,72 520,48 C680,24 820,66 980,42 C1100,22 1160,48 1200,40" stroke="rgba(244,234,213,0.14)" stroke-width="2" fill="none" stroke-linecap="round"/>
        <path d="M0,62 C220,40 420,78 600,58 C780,38 940,70 1200,50" stroke="rgba(200,50,60,0.25)" stroke-width="1.4" fill="none" stroke-linecap="round"/>
      </svg>
    </div>

    <section class="sendo-features">
      <div class="sendo-features-head">
        <span class="sendo-eyebrow-sm" data-i18n="features.eyebrow">${t('features.eyebrow')}</span>
      </div>
      <div class="sendo-features-grid">
        ${renderFeature('research', '#/research', 'A', '01 ─ 12', false)}
        ${renderFeature('tools', '#/tools', 'B', 'Map · Returnee · Training', false)}
        ${renderFeature('heritage', '#/heritage', 'C', '1614 ─ 1865', true)}
        ${renderFeature('personas', '#/personas', 'D', 'Xavier · Uchimura · Endō', false)}
      </div>
    </section>

    <footer class="sendo-footer">
      ${renderFamilyBlock()}
      <div class="sendo-footer-inner">
        <div class="sendo-footer-brand">
          <span class="footer-kanji">宣道</span>
          <span class="footer-romaji">Sendō</span>
        </div>
        <nav class="sendo-footer-links" aria-label="Footer">
          <a href="#/research" data-i18n="nav.research">${t('nav.research')}</a>
          <a href="#/tools" data-i18n="nav.tools">${t('nav.tools')}</a>
          <a href="#/heritage" data-i18n="nav.heritage">${t('nav.heritage')}</a>
          <a href="#/personas" data-i18n="nav.personas">${t('nav.personas')}</a>
          <a href="#/about" data-i18n="nav.about">${t('nav.about')}</a>
          <a href="https://github.com/zhihuang-ai/sendo" target="_blank" rel="noopener" data-i18n="footer.github">${t('footer.github')}</a>
        </nav>
        <p class="sendo-footer-tagline" data-i18n="footer.tagline">${t('footer.tagline')}</p>
      </div>
    </footer>
  `;

}

function renderFeature(key: 'research' | 'tools' | 'heritage' | 'personas', href: string, letter: string, meta: string, featured: boolean): string {
  return `
    <a class="sendo-feature ${featured ? 'sendo-feature-featured' : ''}" href="${href}">
      <div class="sendo-feature-head">
        <span class="sendo-feature-letter">${letter}</span>
        <span class="sendo-feature-meta">${meta}</span>
      </div>
      <h3 class="sendo-feature-title" data-i18n="features.${key}.title">${t(`features.${key}.title`)}</h3>
      <p class="sendo-feature-desc" data-i18n="features.${key}.desc">${t(`features.${key}.desc`)}</p>
      <span class="sendo-feature-arrow" aria-hidden="true">→</span>
    </a>
  `;
}

