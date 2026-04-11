import { registerRoute, initApp } from './main';
import { renderHome } from './pages/home';
import { renderResearchList, renderResearchDetail } from './pages/research';
import { renderTimeline } from './pages/timeline';
import { renderAskArchive } from './pages/ask-archive';
import { renderToolsHub } from './pages/tools-hub';
import { renderReturnee } from './pages/returnee';
import { renderTraining, renderTrainingModule } from './pages/training';
import { renderPersonasHub, renderPersonaChat } from './pages/personas';
import { renderRetention } from './pages/retention';
import { renderGaps } from './pages/gaps';
import { renderComparator } from './pages/comparator';
import { renderMap } from './pages/map';
import { renderNetwork } from './pages/network';
import { renderAbout } from './pages/about';
import { renderHeritage } from './pages/heritage';
import { initSearch } from './search';

// Register all routes
registerRoute('/', renderHome);

// Research
registerRoute('/research', renderResearchList);
registerRoute('/research/timeline', renderTimeline);
registerRoute('/research/map', renderMap);
registerRoute('/research/network', renderNetwork);
registerRoute('/research/gaps', renderGaps);
registerRoute('/research/comparator', renderComparator);
registerRoute('/research/ask', renderAskArchive);
registerRoute('/research/:id', renderResearchDetail);

// Tools
registerRoute('/tools', renderToolsHub);
registerRoute('/tools/ask', renderAskArchive);
registerRoute('/tools/returnee', renderReturnee);
registerRoute('/tools/training', renderTraining);
registerRoute('/tools/training/:id', renderTrainingModule);
registerRoute('/tools/retention', renderRetention);
registerRoute('/tools/map', renderMap);
registerRoute('/tools/network', renderNetwork);

// Heritage (net-new for Sendō)
registerRoute('/heritage', renderHeritage);

// Personas — top-level for Sendō (XuanYan nested them under tools)
registerRoute('/personas', renderPersonasHub);
registerRoute('/personas/:id', renderPersonaChat);

// About
registerRoute('/about', renderAbout);

// Init search and app
initSearch();
initApp();
