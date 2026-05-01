import { t, SISTER_PROJECTS } from '../i18n';

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

  injectHomeStyles();
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

function injectHomeStyles(): void {
  if (document.getElementById('sendo-home-styles')) return;
  const style = document.createElement('style');
  style.id = 'sendo-home-styles';
  style.textContent = `
    /* ============================================================
       Sendō Home — asymmetric split hero + broken grid features
       ============================================================ */

    .sendo-hero {
      position: relative;
      padding: 96px 32px 48px;
      max-width: 1440px;
      margin: 0 auto;
    }
    @media (max-width: 768px) { .sendo-hero { padding: 56px 24px 32px; } }
    @media (max-width: 420px) { .sendo-hero { padding: 40px 20px 24px; } }

    .sendo-hero-grid {
      display: grid;
      grid-template-columns: minmax(220px, 0.38fr) minmax(0, 1fr);
      gap: 64px;
      align-items: start;
    }
    @media (max-width: 900px) {
      .sendo-hero-grid { grid-template-columns: 1fr; gap: 32px; }
    }

    .sendo-hero-left {
      position: relative;
      display: flex;
      align-items: flex-start;
      gap: 16px;
    }

    .sendo-era-rail {
      display: flex;
      flex-direction: column;
      gap: 18px;
      writing-mode: vertical-rl;
      text-orientation: mixed;
      font-family: var(--font-mono);
      font-size: 11px;
      letter-spacing: 0.18em;
      color: var(--text-tertiary);
      padding: 8px 0;
      border-left: 1px solid var(--border-default);
      padding-left: 10px;
      height: 340px;
    }
    .sendo-era-mark { opacity: 0.7; }
    @media (max-width: 900px) { .sendo-era-rail { display: none; } }

    .sendo-title-block {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding-left: 8px;
    }
    .sendo-title-kanji {
      font-family: var(--font-display);
      font-weight: 700;
      font-size: clamp(96px, 16vw, 220px);
      line-height: 0.86;
      color: var(--text-primary);
      writing-mode: vertical-rl;
      text-orientation: upright;
      letter-spacing: -0.05em;
      margin-left: -8px;
    }
    @media (max-width: 900px) {
      .sendo-title-kanji { writing-mode: horizontal-tb; font-size: clamp(88px, 22vw, 180px); }
    }
    .sendo-title-romaji {
      font-family: var(--font-mono);
      font-size: 11px;
      letter-spacing: 0.45em;
      color: var(--accent-vermillion);
      margin-top: 16px;
      padding-left: 4px;
    }
    .sendo-enso {
      position: absolute;
      top: -14px;
      right: -14px;
      width: 64px;
      height: 64px;
      opacity: 0.8;
    }
    @media (max-width: 900px) { .sendo-enso { top: -10px; right: 0; width: 54px; height: 54px; } }

    .sendo-hero-right {
      padding-top: 8px;
      max-width: 760px;
    }

    .sendo-eyebrow {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 28px;
      font-family: var(--font-mono);
      font-size: 11px;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      color: var(--text-tertiary);
    }
    .sendo-torii {
      display: inline-block;
      width: 32px;
      height: 14px;
      position: relative;
    }
    .sendo-torii::before {
      content: '';
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: 0;
      width: 2px;
      height: 14px;
      background: var(--accent-vermillion);
    }
    .sendo-torii::after {
      content: '';
      position: absolute;
      left: 0;
      top: 2px;
      width: 32px;
      height: 2px;
      background: var(--accent-vermillion);
    }

    .sendo-question {
      font-family: var(--font-display);
      font-weight: 500;
      font-size: clamp(28px, 4.4vw, 60px);
      line-height: 1.1;
      letter-spacing: -0.02em;
      color: var(--text-primary);
      margin: 0 0 24px;
      max-width: 18ch;
    }
    .sendo-answer {
      font-family: var(--font-body);
      font-size: clamp(16px, 1.3vw, 19px);
      line-height: 1.55;
      color: var(--text-secondary);
      margin: 0 0 20px;
      max-width: 60ch;
    }
    .sendo-intro {
      font-family: var(--font-body);
      font-size: 15px;
      line-height: 1.7;
      color: var(--text-tertiary);
      margin: 0 0 40px;
      max-width: 58ch;
      padding-left: 16px;
      border-left: 2px solid var(--accent-vermillion);
    }

    .sendo-stat-bar {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 0;
      border-top: 1px solid var(--border-default);
      border-bottom: 1px solid var(--border-default);
      margin-bottom: 32px;
    }
    @media (max-width: 640px) {
      .sendo-stat-bar { grid-template-columns: repeat(2, 1fr); }
    }
    .sendo-stat {
      padding: 20px 16px 20px 0;
      border-right: 1px solid var(--border-default);
    }
    .sendo-stat:last-child { border-right: none; }
    @media (max-width: 640px) {
      .sendo-stat:nth-child(2) { border-right: none; }
      .sendo-stat:nth-child(-n+2) { border-bottom: 1px solid var(--border-default); }
    }
    .sendo-stat-num {
      font-family: var(--font-mono);
      font-size: clamp(22px, 2.6vw, 32px);
      font-weight: 500;
      color: var(--text-primary);
      line-height: 1;
      margin-bottom: 6px;
    }
    .sendo-stat-accent .sendo-stat-num { color: var(--accent-vermillion); }
    .sendo-stat-label {
      font-size: 11px;
      letter-spacing: 0.05em;
      color: var(--text-tertiary);
      text-transform: uppercase;
      font-family: var(--font-mono);
    }

    .sendo-hero-ctas {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }
    .sendo-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 14px 24px;
      min-height: 48px;
      font-family: var(--font-body);
      font-size: 14px;
      font-weight: 500;
      letter-spacing: 0.02em;
      border-radius: 4px;
      text-decoration: none;
      transition: all var(--transition);
      border: 1px solid transparent;
    }
    .sendo-btn-solid {
      background: var(--accent-vermillion);
      color: #F4EAD5;
    }
    .sendo-btn-solid:hover { background: var(--accent-vermillion-hover); color: #F4EAD5; }
    .sendo-btn-ghost {
      background: transparent;
      color: var(--text-primary);
      border: 1px solid var(--border-strong);
    }
    .sendo-btn-ghost:hover {
      border-color: var(--accent-vermillion);
      color: var(--accent-vermillion);
    }
    .sendo-btn-sm { padding: 10px 18px; min-height: 40px; font-size: 13px; }

    /* SUMI-E DIVIDER */
    .sendo-sumi-divider {
      max-width: 1440px;
      margin: 40px auto 0;
      padding: 0 32px;
      height: 80px;
    }
    .sendo-sumi-divider svg { width: 100%; height: 100%; display: block; }

    /* FOUR FEATURE BLOCKS — broken grid */
    .sendo-features {
      max-width: 1440px;
      margin: 0 auto;
      padding: 48px 32px 80px;
    }
    @media (max-width: 768px) { .sendo-features { padding: 32px 24px 48px; } }

    .sendo-features-head { margin-bottom: 28px; }
    .sendo-eyebrow-sm {
      font-family: var(--font-mono);
      font-size: 11px;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      color: var(--text-tertiary);
    }

    .sendo-features-grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1.2fr;
      grid-template-rows: auto auto;
      gap: 0;
      border-top: 1px solid var(--border-default);
      border-left: 1px solid var(--border-default);
    }
    @media (max-width: 900px) {
      .sendo-features-grid { grid-template-columns: 1fr 1fr; }
    }
    @media (max-width: 560px) {
      .sendo-features-grid { grid-template-columns: 1fr; }
    }

    .sendo-feature {
      position: relative;
      display: flex;
      flex-direction: column;
      padding: 32px 28px 56px;
      border-right: 1px solid var(--border-default);
      border-bottom: 1px solid var(--border-default);
      text-decoration: none;
      color: inherit;
      transition: background var(--transition), transform var(--transition);
      background: transparent;
      min-height: 260px;
    }
    .sendo-feature:hover { background: var(--bg-elevated); }
    .sendo-feature:hover .sendo-feature-arrow { transform: translateX(6px); color: var(--accent-vermillion); }
    .sendo-feature-featured {
      grid-row: span 2;
      background: linear-gradient(180deg, rgba(200,50,60,0.05), transparent 70%);
    }
    @media (max-width: 900px) {
      .sendo-feature-featured { grid-row: span 1; }
    }

    .sendo-feature-head {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      margin-bottom: 24px;
      font-family: var(--font-mono);
      font-size: 11px;
      letter-spacing: 0.14em;
      color: var(--text-tertiary);
      text-transform: uppercase;
    }
    .sendo-feature-letter {
      color: var(--accent-vermillion);
      font-size: 14px;
      font-weight: 500;
    }

    .sendo-feature-title {
      font-family: var(--font-display);
      font-size: 24px;
      font-weight: 600;
      color: var(--text-primary);
      margin: 0 0 12px;
      line-height: 1.2;
    }
    .sendo-feature-featured .sendo-feature-title { font-size: 32px; }

    .sendo-feature-desc {
      font-size: 14px;
      line-height: 1.6;
      color: var(--text-secondary);
      margin: 0;
      max-width: 46ch;
    }
    .sendo-feature-featured .sendo-feature-desc { font-size: 15px; }

    .sendo-feature-arrow {
      position: absolute;
      left: 28px;
      bottom: 24px;
      font-family: var(--font-mono);
      font-size: 20px;
      color: var(--text-tertiary);
      transition: transform var(--transition), color var(--transition);
    }

    /* FOOTER */
    .sendo-footer {
      max-width: 1440px;
      margin: 0 auto;
      padding: 48px 32px 64px;
      border-top: 1px solid var(--border-subtle);
    }
    .sendo-footer-inner {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    .sendo-footer-brand {
      display: flex;
      align-items: baseline;
      gap: 12px;
    }
    .footer-kanji {
      font-family: var(--font-display);
      font-size: 22px;
      color: var(--text-primary);
    }
    .footer-romaji {
      font-family: var(--font-mono);
      font-size: 11px;
      letter-spacing: 0.3em;
      color: var(--accent-vermillion);
      text-transform: uppercase;
    }
    .sendo-footer-links {
      display: flex;
      flex-wrap: wrap;
      gap: 24px;
    }
    .sendo-footer-links a {
      font-size: 13px;
      color: var(--text-secondary);
      text-decoration: none;
      font-family: var(--font-body);
    }
    .sendo-footer-links a:hover { color: var(--accent-vermillion); }
    .sendo-footer-tagline {
      font-family: var(--font-mono);
      font-size: 11px;
      letter-spacing: 0.1em;
      color: var(--text-tertiary);
      margin: 0;
    }
  `;
  document.head.appendChild(style);
}
