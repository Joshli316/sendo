import { registerRoute, initApp } from './main';
import { renderHome } from './pages/home';
import { initSearch } from './search';

// Home renders eagerly so the landing page paints without an extra chunk fetch.
registerRoute('/', renderHome);

// Every other route lazy-loads its page module on first navigation. This keeps
// the main bundle small; each page becomes its own code-split chunk via Vite.
const lazy = <T extends Record<string, (...args: never[]) => void | Promise<void>>>(
  loader: () => Promise<T>,
  exportName: keyof T,
) => () => loader().then(m => m[exportName]());

// Research
registerRoute('/research',           lazy(() => import('./pages/research'),    'renderResearchList'));
registerRoute('/research/timeline',  lazy(() => import('./pages/timeline'),    'renderTimeline'));
registerRoute('/research/map',       lazy(() => import('./pages/map'),         'renderMap'));
registerRoute('/research/network',   lazy(() => import('./pages/network'),     'renderNetwork'));
registerRoute('/research/gaps',      lazy(() => import('./pages/gaps'),        'renderGaps'));
registerRoute('/research/comparator',lazy(() => import('./pages/comparator'),  'renderComparator'));
registerRoute('/research/ask',       lazy(() => import('./pages/ask-archive'), 'renderAskArchive'));
registerRoute('/research/:id',       lazy(() => import('./pages/research'),    'renderResearchDetail'));

// Tools
registerRoute('/tools',              lazy(() => import('./pages/tools-hub'),   'renderToolsHub'));
registerRoute('/tools/ask',          lazy(() => import('./pages/ask-archive'), 'renderAskArchive'));
registerRoute('/tools/returnee',     lazy(() => import('./pages/returnee'),    'renderReturnee'));
registerRoute('/tools/training',     lazy(() => import('./pages/training'),    'renderTraining'));
registerRoute('/tools/training/:id', lazy(() => import('./pages/training'),    'renderTrainingModule'));
registerRoute('/tools/retention',    lazy(() => import('./pages/retention'),   'renderRetention'));
registerRoute('/tools/map',          lazy(() => import('./pages/map'),         'renderMap'));
registerRoute('/tools/network',      lazy(() => import('./pages/network'),     'renderNetwork'));

// Heritage
registerRoute('/heritage',           lazy(() => import('./pages/heritage'),    'renderHeritage'));

// Personas
registerRoute('/personas',           lazy(() => import('./pages/personas'),    'renderPersonasHub'));
registerRoute('/personas/:id',       lazy(() => import('./pages/personas'),    'renderPersonaChat'));

// About
registerRoute('/about',              lazy(() => import('./pages/about'),       'renderAbout'));

initSearch();
initApp();
