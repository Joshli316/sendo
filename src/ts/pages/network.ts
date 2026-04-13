import { t, getLang } from '../i18n';
import { setCleanup } from '../main';

interface NetworkNode {
  id: string;
  name: { en: string; jp: string };
  type: 'missionary' | 'japanese' | 'institution';
  era: string;
  denomination?: string;
  dates?: string;
  role?: { en: string; jp: string };
  connections: number;
}

interface NetworkEdge {
  source: string;
  target: string;
  relationship: string;
}

interface NetworkData {
  nodes: NetworkNode[];
  edges: NetworkEdge[];
}

let simulation: any = null;

// Network data loaded directly — no external JSON file, all inline

function getDefaultNetwork(): NetworkData {
  const nodes: NetworkNode[] = [
    // --- Kirishitan era (1549-1639) ---
    { id: 'xavier', name: { en: 'Francis Xavier', jp: 'フランシスコ・ザビエル' }, type: 'missionary', era: 'kirishitan', denomination: 'Jesuit', dates: '1506-1552', role: { en: 'Jesuit pioneer, arrived Kagoshima 1549', jp: 'イエズス会の先駆者、1549年鹿児島上陸' }, connections: 6 },
    { id: 'frois', name: { en: 'Luis Frois', jp: 'ルイス・フロイス' }, type: 'missionary', era: 'kirishitan', denomination: 'Jesuit', dates: '1532-1597', role: { en: 'Historia de Japam chronicler', jp: '『日本史』の著者' }, connections: 4 },
    { id: 'torres', name: { en: 'Cosme de Torres', jp: 'コスメ・デ・トルレス' }, type: 'missionary', era: 'kirishitan', denomination: 'Jesuit', dates: '1510-1570', role: { en: 'Xavier\'s successor in Japan', jp: 'ザビエルの日本での後継者' }, connections: 3 },
    { id: 'vilela', name: { en: 'Gaspar Vilela', jp: 'ガスパル・ヴィレラ' }, type: 'missionary', era: 'kirishitan', denomination: 'Jesuit', dates: '1525-1572', role: { en: 'First Jesuit in Kyoto', jp: '京都で活動した最初のイエズス会士' }, connections: 3 },
    { id: 'valignano', name: { en: 'Alessandro Valignano', jp: 'アレッサンドロ・ヴァリニャーノ' }, type: 'missionary', era: 'kirishitan', denomination: 'Jesuit', dates: '1539-1606', role: { en: 'Visitor; Tensho Embassy architect', jp: '巡察師、天正遣欧少年使節の立案者' }, connections: 5 },
    { id: 'anjiro', name: { en: 'Anjiro', jp: 'アンジロー（ヤジロウ）' }, type: 'japanese', era: 'kirishitan', dates: 'c.1511-c.1550', role: { en: 'First Japanese Christian; Xavier\'s guide', jp: '最初の日本人キリスト者、ザビエルの案内役' }, connections: 2 },
    { id: 'otomo_sorin', name: { en: 'Otomo Sorin', jp: '大友宗麟' }, type: 'japanese', era: 'kirishitan', dates: '1530-1587', role: { en: 'Christian daimyo of Bungo', jp: '豊後のキリシタン大名' }, connections: 3 },
    { id: 'takayama_ukon', name: { en: 'Takayama Ukon', jp: '高山右近' }, type: 'japanese', era: 'kirishitan', dates: '1552-1615', role: { en: 'Christian samurai, exiled to Manila, Blessed 2017', jp: 'キリシタン武将、マニラ追放、2017年列福' }, connections: 4 },
    { id: 'arima_harunobu', name: { en: 'Arima Harunobu', jp: '有馬晴信' }, type: 'japanese', era: 'kirishitan', dates: '1567-1612', role: { en: 'Christian daimyo of Shimabara', jp: '島原のキリシタン大名' }, connections: 2 },
    { id: 'amakusa_shiro', name: { en: 'Amakusa Shiro', jp: '天草四郎時貞' }, type: 'japanese', era: 'kirishitan', dates: '1621-1638', role: { en: 'Leader of the Shimabara Rebellion', jp: '島原の乱の指導者' }, connections: 2 },

    // --- Meiji era missionaries (1859-1912) ---
    { id: 'verbeck', name: { en: 'Guido Verbeck', jp: 'フルベッキ' }, type: 'missionary', era: 'meiji', denomination: 'Dutch Reformed', dates: '1830-1898', role: { en: 'Educator, advisor to Meiji government', jp: '教育者、明治政府の顧問' }, connections: 5 },
    { id: 'hepburn', name: { en: 'James C. Hepburn', jp: 'ジェームス・C・ヘボン' }, type: 'missionary', era: 'meiji', denomination: 'Presbyterian', dates: '1815-1911', role: { en: 'Doctor, Hepburn romanization, Bible translator', jp: '医師、ヘボン式ローマ字、聖書翻訳者' }, connections: 4 },
    { id: 'brown', name: { en: 'Samuel R. Brown', jp: 'サミュエル・R・ブラウン' }, type: 'missionary', era: 'meiji', denomination: 'Dutch Reformed', dates: '1810-1880', role: { en: 'Yokohama Band mentor', jp: '横浜バンドの指導者' }, connections: 4 },
    { id: 'clark', name: { en: 'William S. Clark', jp: 'ウィリアム・クラーク' }, type: 'missionary', era: 'meiji', denomination: 'Congregational', dates: '1826-1886', role: { en: '"Boys, be ambitious" — Sapporo Agricultural College', jp: '「少年よ大志を抱け」札幌農学校' }, connections: 3 },
    { id: 'janes', name: { en: 'L.L. Janes', jp: 'L・L・ジェーンズ' }, type: 'missionary', era: 'meiji', denomination: 'Non-denominational', dates: '1838-1909', role: { en: 'Kumamoto Band teacher', jp: '熊本バンドの教師' }, connections: 3 },

    // --- Meiji Japanese Christians ---
    { id: 'niijima_jo', name: { en: 'Niijima Jo (Joseph Neesima)', jp: '新島襄' }, type: 'japanese', era: 'meiji', dates: '1843-1890', role: { en: 'Founder of Doshisha University', jp: '同志社創立者' }, connections: 4 },
    { id: 'uchimura_kanzo', name: { en: 'Uchimura Kanzo', jp: '内村鑑三' }, type: 'japanese', era: 'meiji', dates: '1861-1930', role: { en: 'Founder of Mukyokai (Non-Church Movement)', jp: '無教会主義の創始者' }, connections: 5 },
    { id: 'nitobe_inazo', name: { en: 'Nitobe Inazo', jp: '新渡戸稲造' }, type: 'japanese', era: 'meiji', dates: '1862-1933', role: { en: 'Author of Bushido; League of Nations', jp: '『武士道』著者、国際連盟事務次長' }, connections: 3 },
    { id: 'uemura_masahisa', name: { en: 'Uemura Masahisa', jp: '植村正久' }, type: 'japanese', era: 'meiji', dates: '1858-1925', role: { en: 'Yokohama Band; Japanese Protestant theologian', jp: '横浜バンド、日本プロテスタント神学者' }, connections: 4 },
    { id: 'ebina_danjo', name: { en: 'Ebina Danjo', jp: '海老名弾正' }, type: 'japanese', era: 'meiji', dates: '1856-1937', role: { en: 'Kumamoto Band; Doshisha president', jp: '熊本バンド、同志社総長' }, connections: 3 },
    { id: 'yamamuro_gumpei', name: { en: 'Yamamuro Gumpei', jp: '山室軍平' }, type: 'japanese', era: 'meiji', dates: '1872-1940', role: { en: 'Founded Salvation Army Japan', jp: '救世軍日本軍国の創設者' }, connections: 3 },

    // --- Showa / modern ---
    { id: 'kagawa_toyohiko', name: { en: 'Kagawa Toyohiko', jp: '賀川豊彦' }, type: 'japanese', era: 'showa', dates: '1888-1960', role: { en: 'Social reformer, slum ministry, cooperatives', jp: '社会改革者、スラム伝道、協同組合運動' }, connections: 4 },
    { id: 'endo_shusaku', name: { en: 'Endo Shusaku', jp: '遠藤周作' }, type: 'japanese', era: 'showa', dates: '1923-1996', role: { en: 'Catholic novelist, author of Silence', jp: 'カトリック作家、『沈黙』著者' }, connections: 3 },
    { id: 'nagai_takashi', name: { en: 'Nagai Takashi', jp: '永井隆' }, type: 'japanese', era: 'showa', dates: '1908-1951', role: { en: 'Nagasaki hibakusha doctor; hansai theology', jp: '長崎被爆医師、『長崎の鐘』著者' }, connections: 2 },
    { id: 'kitamori_kazoh', name: { en: 'Kitamori Kazoh', jp: '北森嘉蔵' }, type: 'japanese', era: 'showa', dates: '1916-1998', role: { en: 'Theologian of the Pain of God', jp: '『神の痛みの神学』著者' }, connections: 3 },
    { id: 'koyama_kosuke', name: { en: 'Koyama Kosuke', jp: '小山晃佑' }, type: 'japanese', era: 'showa', dates: '1929-2009', role: { en: 'Waterbuffalo Theology; global voice', jp: '『水牛神学』、国際的神学者' }, connections: 2 },

    // --- Institutions ---
    { id: 'sj', name: { en: 'Society of Jesus (Japan)', jp: 'イエズス会（日本）' }, type: 'institution', era: 'kirishitan', dates: '1549-1614', role: { en: 'Primary Catholic mission order in early Japan', jp: '初期日本における主要カトリック修道会' }, connections: 6 },
    { id: 'doshisha', name: { en: 'Doshisha University', jp: '同志社大学' }, type: 'institution', era: 'meiji', dates: '1875-', role: { en: 'Kyoto Christian university', jp: '京都のキリスト教主義大学' }, connections: 4 },
    { id: 'meiji_gakuin', name: { en: 'Meiji Gakuin', jp: '明治学院' }, type: 'institution', era: 'meiji', dates: '1863-', role: { en: 'Tokyo Presbyterian school', jp: '東京の長老派学校' }, connections: 3 },
    { id: 'salvation_army', name: { en: 'Salvation Army Japan', jp: '救世軍日本軍国' }, type: 'institution', era: 'meiji', dates: '1895-', role: { en: 'Social service and evangelism', jp: '社会奉仕と福音伝道' }, connections: 2 },
    { id: 'mukyokai', name: { en: 'Mukyokai (Non-Church Movement)', jp: '無教会' }, type: 'institution', era: 'meiji', dates: '1901-', role: { en: 'Indigenous Japanese movement without clergy', jp: '聖職者を持たない日本独自の運動' }, connections: 3 },
    { id: 'kyodan', name: { en: 'United Church of Christ in Japan (Kyodan)', jp: '日本基督教団' }, type: 'institution', era: 'showa', dates: '1941-', role: { en: '33 merged Protestant denominations', jp: '33教派を合同したプロテスタント教団' }, connections: 4 },
    { id: 'jcfn', name: { en: 'JCFN (Japanese Christian Fellowship Network)', jp: 'JCFN（日本クリスチャン・フェローシップ・ネットワーク）' }, type: 'institution', era: 'heisei', dates: '1990-', role: { en: 'Returnee ministry and diaspora pipeline', jp: '帰国者ミニストリーとディアスポラ・パイプライン' }, connections: 3 },
  ];

  const edges: NetworkEdge[] = [
    // Kirishitan
    { source: 'xavier', target: 'anjiro', relationship: 'guided by' },
    { source: 'xavier', target: 'torres', relationship: 'successor' },
    { source: 'xavier', target: 'otomo_sorin', relationship: 'converted' },
    { source: 'xavier', target: 'sj', relationship: 'represented' },
    { source: 'frois', target: 'sj', relationship: 'member' },
    { source: 'frois', target: 'vilela', relationship: 'contemporary' },
    { source: 'torres', target: 'sj', relationship: 'member' },
    { source: 'vilela', target: 'sj', relationship: 'member' },
    { source: 'valignano', target: 'sj', relationship: 'led as Visitor' },
    { source: 'valignano', target: 'otomo_sorin', relationship: 'sent Tensho Embassy' },
    { source: 'takayama_ukon', target: 'sj', relationship: 'sheltered by' },
    { source: 'arima_harunobu', target: 'valignano', relationship: 'hosted seminary' },
    { source: 'amakusa_shiro', target: 'arima_harunobu', relationship: 'former domain connection' },

    // Meiji
    { source: 'verbeck', target: 'niijima_jo', relationship: 'influenced' },
    { source: 'verbeck', target: 'meiji_gakuin', relationship: 'helped found' },
    { source: 'hepburn', target: 'brown', relationship: 'Yokohama contemporary' },
    { source: 'hepburn', target: 'meiji_gakuin', relationship: 'co-founder' },
    { source: 'brown', target: 'uemura_masahisa', relationship: 'taught' },
    { source: 'brown', target: 'meiji_gakuin', relationship: 'co-founder' },
    { source: 'clark', target: 'uchimura_kanzo', relationship: 'indirectly influenced (Sapporo Band)' },
    { source: 'clark', target: 'nitobe_inazo', relationship: 'indirectly influenced (Sapporo Band)' },
    { source: 'janes', target: 'ebina_danjo', relationship: 'taught (Kumamoto Band)' },
    { source: 'niijima_jo', target: 'doshisha', relationship: 'founded' },
    { source: 'ebina_danjo', target: 'doshisha', relationship: 'led as president' },
    { source: 'uchimura_kanzo', target: 'mukyokai', relationship: 'founded' },
    { source: 'uchimura_kanzo', target: 'nitobe_inazo', relationship: 'Sapporo Band classmate' },
    { source: 'uemura_masahisa', target: 'uchimura_kanzo', relationship: 'contemporary theologian' },
    { source: 'yamamuro_gumpei', target: 'salvation_army', relationship: 'founded' },

    // Showa
    { source: 'kagawa_toyohiko', target: 'kyodan', relationship: 'leading figure' },
    { source: 'endo_shusaku', target: 'nagai_takashi', relationship: 'Nagasaki Catholic link' },
    { source: 'kitamori_kazoh', target: 'kyodan', relationship: 'theologian of' },
    { source: 'koyama_kosuke', target: 'doshisha', relationship: 'educated at' },
    { source: 'koyama_kosuke', target: 'kitamori_kazoh', relationship: 'theological successor' },

    // Modern
    { source: 'jcfn', target: 'kyodan', relationship: 'works alongside' },
  ];

  return { nodes, edges };
}

const NODE_COLORS: Record<string, string> = {
  missionary: '#C8323C',
  japanese: '#2DD4BF',
  institution: '#9B9180',
};

export function renderNetwork(): void {
  const app = document.getElementById('app')!;
  const lang = getLang();

  app.innerHTML = `
    <div class="network-container">
      <div class="network-controls">
        <input type="text" class="network-search" id="network-search" placeholder="${lang === 'en' ? 'Search a person or institution...' : '人物・機関を検索...'}">
        <div class="filter-tabs" style="margin-bottom: 0;">
          <button class="filter-tab active" data-filter="all">All</button>
          <button class="filter-tab" data-filter="missionary" style="border-left: 3px solid #C8323C;">${lang === 'en' ? 'Missionaries' : '宣教師'}</button>
          <button class="filter-tab" data-filter="japanese" style="border-left: 3px solid #2DD4BF;">${lang === 'en' ? 'Japanese' : '日本人'}</button>
          <button class="filter-tab" data-filter="institution" style="border-left: 3px solid #9B9180;">${lang === 'en' ? 'Institutions' : '機関'}</button>
        </div>
        <label class="layer-toggle">
          <input type="checkbox" id="degree-toggle"> ${lang === 'en' ? '2nd-degree connections' : '2次のつながり'}
        </label>
      </div>
      <div id="network-graph"></div>
      <div id="network-list" style="display:none; overflow-y:auto; padding:16px;"></div>
      <div class="bio-card" id="bio-card"></div>
    </div>
  `;

  const networkData = getDefaultNetwork();
  // Mobile: show list view instead of canvas graph
  if (window.innerWidth < 768) {
    renderMobileList(networkData, lang);
  } else {
    initForceGraph(networkData);
  }

  setCleanup(() => {
    if (simulation) {
      simulation.stop();
      simulation = null;
    }
  });
}

function initForceGraph(data: NetworkData): void {
  const container = document.getElementById('network-graph')!;
  const width = container.clientWidth;
  const height = container.clientHeight;
  const lang = getLang();

  // Canvas-based rendering for performance
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d')!;

  // Simple force simulation
  const nodes = data.nodes.map(n => ({
    ...n,
    x: width / 2 + (Math.random() - 0.5) * 300,
    y: height / 2 + (Math.random() - 0.5) * 300,
    vx: 0,
    vy: 0,
  }));

  const edges = data.edges.map(e => ({
    ...e,
    sourceNode: nodes.find(n => n.id === e.source)!,
    targetNode: nodes.find(n => n.id === e.target)!,
  })).filter(e => e.sourceNode && e.targetNode);

  let selectedNode: typeof nodes[0] | null = null;
  let hoveredNode: typeof nodes[0] | null = null;
  let showSecondDegree = false;

  // Wire up 2nd-degree toggle
  const degreeToggle = document.getElementById('degree-toggle') as HTMLInputElement;
  if (degreeToggle) {
    degreeToggle.addEventListener('change', () => {
      showSecondDegree = degreeToggle.checked;
      draw();
    });
  }

  function getConnectedIds(nodeId: string): Set<string> {
    const direct = new Set<string>();
    for (const e of edges) {
      if (e.source === nodeId) direct.add(e.target);
      if (e.target === nodeId) direct.add(e.source);
    }
    return direct;
  }

  function getSecondDegreeIds(nodeId: string): Set<string> {
    const first = getConnectedIds(nodeId);
    const second = new Set<string>(first);
    for (const id of first) {
      for (const id2 of getConnectedIds(id)) {
        second.add(id2);
      }
    }
    second.delete(nodeId);
    return second;
  }

  function tick(): void {
    // Simple force-directed layout
    const k = 0.01;
    const repulsion = 3000;

    // Repulsion between all nodes
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[j].x - nodes[i].x;
        const dy = nodes[j].y - nodes[i].y;
        const d = Math.sqrt(dx * dx + dy * dy) || 1;
        const f = repulsion / (d * d);
        nodes[i].vx -= dx / d * f;
        nodes[i].vy -= dy / d * f;
        nodes[j].vx += dx / d * f;
        nodes[j].vy += dy / d * f;
      }
    }

    // Attraction along edges
    for (const edge of edges) {
      const dx = edge.targetNode.x - edge.sourceNode.x;
      const dy = edge.targetNode.y - edge.sourceNode.y;
      const d = Math.sqrt(dx * dx + dy * dy) || 1;
      const f = (d - 100) * k;
      edge.sourceNode.vx += dx / d * f;
      edge.sourceNode.vy += dy / d * f;
      edge.targetNode.vx -= dx / d * f;
      edge.targetNode.vy -= dy / d * f;
    }

    // Center gravity
    for (const node of nodes) {
      node.vx += (width / 2 - node.x) * 0.001;
      node.vy += (height / 2 - node.y) * 0.001;
    }

    // Apply velocity with damping
    for (const node of nodes) {
      node.vx *= 0.9;
      node.vy *= 0.9;
      node.x += node.vx;
      node.y += node.vy;
      // Bounds
      node.x = Math.max(20, Math.min(width - 20, node.x));
      node.y = Math.max(20, Math.min(height - 20, node.y));
    }
  }

  function draw(): void {
    ctx.clearRect(0, 0, width, height);

    // Determine visible set based on selection + degree toggle
    const visibleIds = selectedNode
      ? (showSecondDegree ? getSecondDegreeIds(selectedNode.id) : getConnectedIds(selectedNode.id))
      : null;

    // Draw edges
    for (const edge of edges) {
      ctx.beginPath();
      ctx.moveTo(edge.sourceNode.x, edge.sourceNode.y);
      ctx.lineTo(edge.targetNode.x, edge.targetNode.y);
      const isDirectHighlight = selectedNode &&
        (edge.source === selectedNode.id || edge.target === selectedNode.id);
      const is2ndDegree = selectedNode && showSecondDegree && visibleIds &&
        (visibleIds.has(edge.source) && visibleIds.has(edge.target));
      ctx.strokeStyle = isDirectHighlight ? '#C8323C' : is2ndDegree ? '#C8323C55' : 'rgba(30, 42, 63, 0.5)';
      ctx.lineWidth = isDirectHighlight ? 2 : 1;
      ctx.stroke();
    }

    // Draw nodes
    for (const node of nodes) {
      const radius = Math.max(6, Math.min(16, node.connections * 2));
      const color = NODE_COLORS[node.type] || '#9B9180';
      const isSelected = selectedNode?.id === node.id;
      const isConnected = visibleIds?.has(node.id) ?? false;

      ctx.beginPath();
      ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = (selectedNode && !isSelected && !isConnected) ? color + '33' : color;
      ctx.fill();

      if (isSelected) {
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Label
      ctx.font = `${isSelected || hoveredNode?.id === node.id ? '12px' : '10px'} Inter, sans-serif`;
      ctx.fillStyle = (selectedNode && !isSelected && !isConnected) ? '#6B635833' : '#E8E0D4';
      ctx.textAlign = 'center';
      ctx.fillText(node.name[lang], node.x, node.y + radius + 14);
    }
  }

  // Animation loop — stops after stabilization to save CPU
  let running = true;
  let frame = 0;
  function animate(): void {
    if (!running) return;
    if (frame < 300) {
      tick();
      draw();
      frame++;
      requestAnimationFrame(animate);
    } else {
      draw(); // Final draw after stabilization
    }
  }
  // Expose redraw for interactions
  function requestRedraw(): void {
    draw();
  }
  animate();

  simulation = { stop: () => { running = false; } };

  // Click handler
  canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvas.width / rect.width);
    const y = (e.clientY - rect.top) * (canvas.height / rect.height);

    const clicked = nodes.find(n => {
      const r = Math.max(6, Math.min(16, n.connections * 2));
      return Math.sqrt((n.x - x) ** 2 + (n.y - y) ** 2) < r + 5;
    });

    selectedNode = clicked || null;
    if (clicked) showBioCard(clicked);
    else closeBioCard();
    requestRedraw();
  });

  // Hover
  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvas.width / rect.width);
    const y = (e.clientY - rect.top) * (canvas.height / rect.height);
    hoveredNode = nodes.find(n => {
      const r = Math.max(6, Math.min(16, n.connections * 2));
      return Math.sqrt((n.x - x) ** 2 + (n.y - y) ** 2) < r + 5;
    }) || null;
    canvas.style.cursor = hoveredNode ? 'pointer' : 'default';
  });

  // Search
  document.getElementById('network-search')?.addEventListener('input', (e) => {
    const query = (e.target as HTMLInputElement).value.toLowerCase();
    if (!query) { selectedNode = null; closeBioCard(); requestRedraw(); return; }
    const found = nodes.find(n =>
      n.name.en.toLowerCase().includes(query) || n.name.jp.includes(query)
    );
    if (found) {
      selectedNode = found;
      showBioCard(found);
      requestRedraw();
    }
  });

  // Filters
  document.querySelectorAll('.network-controls .filter-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.network-controls .filter-tab').forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
      requestRedraw();
    });
  });
}

function showBioCard(node: NetworkNode): void {
  const card = document.getElementById('bio-card');
  const lang = getLang();
  if (!card) return;

  card.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: start;">
      <h3 style="font-size: 1.125rem; margin: 0;">${node.name[lang]}</h3>
      <button onclick="document.getElementById('bio-card').classList.remove('open')" style="background: none; border: none; color: var(--text-tertiary); cursor: pointer; font-size: 1.25rem;">×</button>
    </div>
    ${node.name.en !== node.name.jp ? `<p style="font-size: 0.8125rem; color: var(--text-tertiary); margin: 4px 0;">${lang === 'en' ? node.name.jp : node.name.en}</p>` : ''}
    ${node.dates ? `<p style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--accent-vermillion); margin: 4px 0;">${node.dates}</p>` : ''}
    ${node.role ? `<p style="font-size: 0.875rem; color: var(--text-secondary); margin: 8px 0;">${node.role[lang]}</p>` : ''}
    ${node.denomination ? `<span class="tag">${node.denomination}</span>` : ''}
    <span class="tag">${node.era}</span>
    <span class="tag">${node.type}</span>
  `;
  card.classList.add('open');
}

function closeBioCard(): void {
  document.getElementById('bio-card')?.classList.remove('open');
}

function renderMobileList(data: NetworkData, lang: string): void {
  const graphEl = document.getElementById('network-graph')!;
  const listEl = document.getElementById('network-list')!;
  graphEl.style.display = 'none';
  listEl.style.display = 'block';

  const sorted = [...data.nodes].sort((a, b) => b.connections - a.connections);

  function renderList(nodes: NetworkNode[]): void {
    listEl.innerHTML = nodes.map(node => {
      const color = NODE_COLORS[node.type] || '#9B9180';
      const connections = data.edges.filter(e => e.source === node.id || e.target === node.id);
      const connNames = connections.map(e => {
        const otherId = e.source === node.id ? e.target : e.source;
        const other = data.nodes.find(n => n.id === otherId);
        return other ? other.name[lang as 'en' | 'jp'] : '';
      }).filter(Boolean);

      return `
        <div style="padding: 16px; background: var(--bg-secondary); border: 1px solid var(--border); border-left: 3px solid ${color}; border-radius: 2px; margin-bottom: 8px;">
          <div style="display: flex; justify-content: space-between; align-items: start;">
            <div>
              <h3 style="font-size: 1rem; margin: 0 0 4px;">${node.name[lang as 'en' | 'jp']}</h3>
              ${node.name.en !== node.name.jp ? `<p style="font-size: 0.75rem; color: var(--text-tertiary); margin: 0;">${lang === 'en' ? node.name.jp : node.name.en}</p>` : ''}
            </div>
            <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--accent-vermillion);">${node.dates || ''}</span>
          </div>
          ${node.role ? `<p style="font-size: 0.8125rem; color: var(--text-secondary); margin: 8px 0 4px;">${node.role[lang as 'en' | 'jp']}</p>` : ''}
          <div style="display: flex; gap: 6px; flex-wrap: wrap; margin-top: 8px;">
            <span class="tag" style="border-left: 2px solid ${color};">${node.type}</span>
            ${node.denomination ? `<span class="tag">${node.denomination}</span>` : ''}
            <span class="tag">${node.era}</span>
          </div>
          ${connNames.length > 0 ? `
            <div style="margin-top: 12px; padding-top: 8px; border-top: 1px solid var(--border);">
              <p style="font-size: 0.6875rem; color: var(--text-tertiary); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;">${lang === 'en' ? 'Connected to' : 'つながり'}</p>
              <p style="font-size: 0.8125rem; color: var(--text-secondary);">${connNames.join(', ')}</p>
            </div>
          ` : ''}
        </div>
      `;
    }).join('');
  }

  renderList(sorted);

  // Wire up search for mobile
  document.getElementById('network-search')?.addEventListener('input', (e) => {
    const query = (e.target as HTMLInputElement).value.toLowerCase();
    if (!query) { renderList(sorted); return; }
    const filtered = sorted.filter(n =>
      n.name.en.toLowerCase().includes(query) || n.name.jp.includes(query)
    );
    renderList(filtered);
  });

  // Wire up filter tabs for mobile
  document.querySelectorAll('.network-controls .filter-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.network-controls .filter-tab').forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
      const filter = (btn as HTMLElement).dataset.filter || 'all';
      const filtered = filter === 'all' ? sorted : sorted.filter(n => n.type === filter);
      renderList(filtered);
    });
  });
}
