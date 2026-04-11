import { t, getLang } from '../i18n';

interface ReturneeData {
  city: string;
  faithYears: number;
  baptized: boolean;
  discipleship: boolean;
  concerns: string[];
}

const CITIES = [
  'Tokyo', 'Osaka', 'Kyoto', 'Kanagawa',
  'Hokkaido', 'Fukuoka', 'Aichi', 'Nagasaki', 'Other'
];

const CITIES_JP: Record<string, string> = {
  'Tokyo': '東京', 'Osaka': '大阪', 'Kyoto': '京都', 'Kanagawa': '神奈川',
  'Hokkaido': '北海道', 'Fukuoka': '福岡', 'Aichi': '愛知', 'Nagasaki': '長崎',
  'Other': 'その他'
};

const CONCERNS = ['church', 'family', 'workplace', 'loneliness', 'language', 'faith'];

let currentStep = 1;
let formData: ReturneeData = { city: '', faithYears: 3, baptized: false, discipleship: false, concerns: [] };

export function renderReturnee(): void {
  currentStep = 1;
  formData = { city: '', faithYears: 3, baptized: false, discipleship: false, concerns: [] };
  const app = document.getElementById('app')!;
  app.innerHTML = `
    <div class="tool-page container">
      <div class="tool-header">
        <h1>${t('returnee.title')}</h1>
        <p>${t('returnee.subtitle')}</p>
      </div>
      <div class="step-indicator" id="step-indicator">
        <div class="step-dot active"></div>
        <div class="step-dot"></div>
        <div class="step-dot"></div>
        <div class="step-dot"></div>
      </div>
      <div class="step-content" id="step-content"></div>
    </div>
  `;
  renderStep();
}

function renderStep(): void {
  // Update step indicators
  document.querySelectorAll('.step-dot').forEach((dot, i) => {
    dot.classList.remove('active', 'completed');
    if (i + 1 === currentStep) dot.classList.add('active');
    if (i + 1 < currentStep) dot.classList.add('completed');
  });

  const content = document.getElementById('step-content')!;
  switch (currentStep) {
    case 1: renderCityStep(content); break;
    case 2: renderFaithStep(content); break;
    case 3: renderConcernsStep(content); break;
    case 4: renderReturnKit(content); break;
  }
}

// --- Step 1: Prefecture Selection ---
function renderCityStep(content: HTMLElement): void {
  const lang = getLang();
  content.innerHTML = `
    <h2>${t('returnee.step1')}</h2>
    <div class="form-group">
      <select class="form-select" id="city-select">
        <option value="">${lang === 'en' ? '— Select prefecture —' : '— 都道府県を選択 —'}</option>
        ${CITIES.map(c => `<option value="${c}" ${formData.city === c ? 'selected' : ''}>${lang === 'jp' ? CITIES_JP[c] : c}</option>`).join('')}
      </select>
    </div>
    <button class="btn btn-primary" id="next-btn" ${!formData.city ? 'disabled style="opacity:0.5"' : ''}>${lang === 'en' ? 'Next' : '次へ'}</button>
  `;
  document.getElementById('city-select')?.addEventListener('change', (e) => {
    formData.city = (e.target as HTMLSelectElement).value;
    const btn = document.getElementById('next-btn') as HTMLButtonElement;
    btn.disabled = !formData.city;
    btn.style.opacity = formData.city ? '1' : '0.5';
  });
  document.getElementById('next-btn')?.addEventListener('click', () => {
    if (formData.city) { currentStep = 2; renderStep(); }
  });
}

// --- Step 2: Faith Profile ---
function renderFaithStep(content: HTMLElement): void {
  const lang = getLang();
  content.innerHTML = `
    <h2>${t('returnee.step2')}</h2>
    <div class="slider-group">
      <div class="slider-label">
        <span>${t('returnee.years')}</span>
        <span class="slider-value" id="years-val">${formData.faithYears} ${lang === 'en' ? 'years' : '年'}</span>
      </div>
      <input type="range" class="calc-slider" id="years-slider" min="0" max="20" value="${formData.faithYears}">
    </div>
    <div class="form-group">
      <label class="form-label">${t('returnee.baptized')}</label>
      <div style="display: flex; gap: 12px;">
        <button class="btn ${formData.baptized ? 'btn-primary' : 'btn-ghost'}" data-val="true">${t('returnee.yes')}</button>
        <button class="btn ${!formData.baptized ? 'btn-primary' : 'btn-ghost'}" data-val="false">${t('returnee.no')}</button>
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">${t('returnee.discipleship')}</label>
      <div style="display: flex; gap: 12px;">
        <button class="btn ${formData.discipleship ? 'btn-primary' : 'btn-ghost'}" data-disc="true">${t('returnee.yes')}</button>
        <button class="btn ${!formData.discipleship ? 'btn-primary' : 'btn-ghost'}" data-disc="false">${t('returnee.no')}</button>
      </div>
    </div>
    <div style="display: flex; gap: 12px; margin-top: 24px;">
      <button class="btn btn-ghost" id="back-btn">${t('common.back')}</button>
      <button class="btn btn-primary" id="next-btn">${lang === 'en' ? 'Next' : '次へ'}</button>
    </div>
  `;
  document.getElementById('years-slider')?.addEventListener('input', (e) => {
    formData.faithYears = parseInt((e.target as HTMLInputElement).value);
    document.getElementById('years-val')!.textContent = `${formData.faithYears} ${lang === 'en' ? 'years' : '年'}`;
  });
  document.querySelectorAll('[data-val]').forEach(btn => {
    btn.addEventListener('click', () => { formData.baptized = (btn as HTMLElement).dataset.val === 'true'; renderStep(); });
  });
  document.querySelectorAll('[data-disc]').forEach(btn => {
    btn.addEventListener('click', () => { formData.discipleship = (btn as HTMLElement).dataset.disc === 'true'; renderStep(); });
  });
  document.getElementById('back-btn')?.addEventListener('click', () => { currentStep = 1; renderStep(); });
  document.getElementById('next-btn')?.addEventListener('click', () => { currentStep = 3; renderStep(); });
}

// --- Step 3: Concerns ---
function renderConcernsStep(content: HTMLElement): void {
  content.innerHTML = `
    <h2>${t('returnee.step3')}</h2>
    <div class="checkbox-group">
      ${CONCERNS.map(c => `
        <label class="checkbox-item ${formData.concerns.includes(c) ? 'selected' : ''}">
          <input type="checkbox" value="${c}" ${formData.concerns.includes(c) ? 'checked' : ''}>
          ${t(`returnee.concern.${c}`)}
        </label>
      `).join('')}
    </div>
    <div style="display: flex; gap: 12px; margin-top: 24px;">
      <button class="btn btn-ghost" id="back-btn">${t('common.back')}</button>
      <button class="btn btn-primary" id="generate-btn">${t('returnee.generate')}</button>
    </div>
  `;
  document.querySelectorAll('.checkbox-item input').forEach(cb => {
    cb.addEventListener('change', (e) => {
      const val = (e.target as HTMLInputElement).value;
      const checked = (e.target as HTMLInputElement).checked;
      if (checked) formData.concerns.push(val);
      else formData.concerns = formData.concerns.filter(c => c !== val);
      (cb as HTMLElement).closest('.checkbox-item')?.classList.toggle('selected', checked);
    });
  });
  document.getElementById('back-btn')?.addEventListener('click', () => { currentStep = 2; renderStep(); });
  document.getElementById('generate-btn')?.addEventListener('click', () => { currentStep = 4; renderStep(); });
}

// --- Step 4: Return Kit ---
function renderReturnKit(content: HTMLElement): void {
  const lang = getLang();

  content.innerHTML = `
    <div id="return-kit">
      <h2>${lang === 'en' ? `Your Return Kit — ${formData.city}` : `あなたの帰国キット — ${CITIES_JP[formData.city] || formData.city}`}</h2>

      <div class="card" style="margin-bottom: 24px;">
        <h3 style="color: var(--accent-gold);">${lang === 'en' ? '90-Day Spiritual Survival Plan' : '90日間の信仰サバイバル計画'}</h3>
        ${generatePlan(formData, lang)}
      </div>

      <div class="card" style="margin-bottom: 24px;">
        <h3 style="color: var(--accent-gold);">${lang === 'en' ? 'Prefecture-Specific Guidance' : '都道府県別ガイダンス'}</h3>
        ${generateCityGuide(formData, lang)}
      </div>

      ${formData.concerns.includes('family') ? `
      <div class="card" style="margin-bottom: 24px;">
        <h3 style="color: var(--accent-gold);">${lang === 'en' ? 'Family Conversation Scripts' : '家族との会話ガイド'}</h3>
        ${generateFamilyScripts(lang)}
      </div>
      ` : ''}

      <div class="card" style="margin-bottom: 24px;">
        <h3 style="color: var(--accent-gold);">${lang === 'en' ? 'Resources' : 'リソース'}</h3>
        ${generateResources(formData, lang)}
      </div>

      <div class="card" style="margin-bottom: 24px; border-color: var(--accent-gold);">
        <h3 style="color: var(--accent-gold);">${t('returnee.connect')}</h3>
        <p style="color: var(--text-secondary); font-size: 0.875rem; margin-bottom: 16px;">${t('returnee.connect.desc')}</p>
        <div class="form-group">
          <input class="form-input" type="text" placeholder="${lang === 'en' ? 'Your name' : 'お名前'}">
        </div>
        <div class="form-group">
          <input class="form-input" type="email" placeholder="${lang === 'en' ? 'Your email or LINE ID' : 'メールアドレスまたはLINE ID'}">
        </div>
        <button class="btn btn-primary" id="connect-btn">${lang === 'en' ? 'Connect me to JCFN' : 'JCFNにつないでほしい'}</button>
      </div>

      <div style="display: flex; gap: 12px;">
        <button class="btn btn-primary" onclick="window.print()">${t('returnee.download')}</button>
        <button class="btn btn-ghost" id="save-offline-btn">${lang === 'en' ? 'Save Offline' : 'オフライン保存'}</button>
        <button class="btn btn-ghost" id="restart-btn">${lang === 'en' ? 'Start Over' : '最初からやり直す'}</button>
      </div>
    </div>
  `;

  wireReturnKitButtons(lang);
}

function wireReturnKitButtons(lang: string): void {
  document.getElementById('save-offline-btn')?.addEventListener('click', () => {
    const kitHtml = document.getElementById('return-kit')?.innerHTML || '';
    localStorage.setItem('sendo-return-kit', kitHtml);
    localStorage.setItem('sendo-return-kit-city', formData.city);
    const btn = document.getElementById('save-offline-btn')!;
    btn.textContent = lang === 'en' ? 'Saved!' : '保存しました！';
    btn.style.borderColor = 'var(--success)';
    btn.style.color = 'var(--success)';
    setTimeout(() => { btn.textContent = lang === 'en' ? 'Save Offline' : 'オフライン保存'; btn.style.borderColor = ''; btn.style.color = ''; }, 2000);
  });

  document.getElementById('connect-btn')?.addEventListener('click', () => {
    const btn = document.getElementById('connect-btn')!;
    btn.textContent = lang === 'en' ? 'Request Sent!' : '送信しました！';
    btn.style.background = 'var(--success)';
    btn.style.borderColor = 'var(--success)';
    (btn as HTMLButtonElement).disabled = true;
  });

  document.getElementById('restart-btn')?.addEventListener('click', () => {
    currentStep = 1;
    formData = { city: '', faithYears: 3, baptized: false, discipleship: false, concerns: [] };
    renderStep();
  });
}

// --- Kit Content Generators ---

function planCard(title: string, body: string): string {
  return `<div style="padding: 16px; background: var(--bg-tertiary); border-radius: 2px;">
    <h4 style="font-family: var(--font-mono); color: var(--accent-gold);">${title}</h4>
    <p style="font-size: 0.875rem; color: var(--text-secondary);">${body}</p>
  </div>`;
}

function generatePlan(data: ReturneeData, lang: string): string {
  const isNewBeliever = data.faithYears < 2;
  if (lang === 'en') {
    return `<div style="display: grid; gap: 16px;">
      ${planCard('Daily', isNewBeliever
        ? 'Read one chapter of the Gospel of John. Use a Japanese-English parallel Bible app (YouVersion has 新改訳2017 and 新共同訳).'
        : 'Continue your Bible reading plan. Journal one observation per day. Pray for one specific person at your workplace or in your neighborhood.')}
      ${planCard('Weekly', 'Attend a local church — even if the service is small or in Japanese only. If no church is nearby, join a JCFN online fellowship or LINE prayer group. Write a brief reflection: what challenged your faith this week?')}
      ${planCard('Monthly', 'Check in with your overseas mentor or sending church. Evaluate: Am I growing, maintaining, or drifting? Be honest. Statistics suggest most Japanese returnees drift within two years — do not assume you are the exception.')}
    </div>`;
  }
  return `<div style="display: grid; gap: 16px;">
    ${planCard('毎日', isNewBeliever
      ? 'ヨハネの福音書を1章読む。日英対訳の聖書アプリを使用（YouVersionには新改訳2017と新共同訳があります）。'
      : '読書計画を続ける。1日1つ気づいたことを書き留める。職場か近所の一人のために祈る。')}
    ${planCard('毎週', '地元の教会に出席する — 人数が少なくても、日本語のみでも。近くに教会がなければ、JCFNのオンライン・フェローシップかLINE祈祷グループに参加する。今週信仰について挑戦されたことを短く書き留める。')}
    ${planCard('毎月', '海外のメンターまたは送り出し教会に連絡する。自己評価する：私は成長しているか、維持しているか、離れつつあるか？正直に。統計によれば大半の日本人帰国者は2年以内に離れていく — 自分は例外だと思い込まないこと。')}
  </div>`;
}

const CITY_GUIDES: Record<string, { en: string; jp: string }> = {
  'Tokyo': {
    en: 'Tokyo has the densest concentration of churches in Japan — roughly 700+ Protestant and Catholic congregations, plus JCFN headquarters in Takadanobaba. Look for English-Japanese bilingual churches like Tokyo Union Church or Tokyo Baptist Church. The city also hosts most returnee retreats and young-adult fellowships.',
    jp: '東京は日本で最も教会密度が高い地域で、プロテスタントとカトリックあわせて約700以上の教会があり、高田馬場にはJCFN本部もあります。東京ユニオン教会や東京バプテスト教会など日英バイリンガルの教会を探してみてください。帰国者リトリートや若手フェローシップの多くも東京で開催されています。'
  },
  'Osaka': {
    en: 'Osaka-Kobe-Kyoto forms Japan\'s second-largest Christian corridor. Kansai has historic mission roots (Verbeck, Hepburn in neighboring prefectures) and several international churches. OMF, Asian Access, and JEMA all have Kansai teams. Returnees often find the Kansai culture warmer and more direct than Tokyo.',
    jp: '大阪・神戸・京都は日本第二のキリスト教圏を形成しています。関西には歴史的な宣教のルーツ（フルベッキやヘボンは隣接県で活動）があり、国際教会もいくつかあります。OMF、アジアンアクセス、JEMAはいずれも関西チームを持っています。帰国者は東京より関西の文化が温かく率直だと感じることが多いです。'
  },
  'Kyoto': {
    en: 'Kyoto is Japan\'s historic center of Buddhist and Shinto spirituality — Christianity has a small but intellectually rich presence here, anchored by Doshisha University (founded 1875 by Niijima Jo). Expect philosophically engaged congregations and a slower relational pace. Perfect for returnees who want depth over size.',
    jp: '京都は日本の仏教と神道の歴史的中心地で、キリスト教の存在は小さいながらも知的に豊かで、同志社大学（1875年新島襄創立）がその拠点となっています。哲学的に深い会衆と、ゆっくりとした関係形成のペースが特徴です。規模より深さを求める帰国者に最適です。'
  },
  'Kanagawa': {
    en: 'Yokohama was Japan\'s first Protestant mission base (Hepburn, Brown, Verbeck landed here in 1859). Today Kanagawa has strong international churches, JCFN-connected fellowships, and commuter proximity to Tokyo. Many returnees settle here for work-life balance while staying plugged into the Tokyo ministry network.',
    jp: '横浜は日本初のプロテスタント宣教拠点でした（1859年ヘボン、ブラウン、フルベッキが上陸）。現在神奈川には強力な国際教会、JCFNとつながるフェローシップがあり、東京へのアクセスも良好です。多くの帰国者は、ワークライフバランスを求めつつ東京の事工ネットワークにつながるためにこの地域に住みます。'
  },
  'Hokkaido': {
    en: 'Hokkaido has a unique Christian history — Russian Orthodox Hakodate (St. Nicholas, 1861), Sapporo Band (W.S. Clark, 1876), and OMF postwar concentration. Churches are fewer and more spread out. Winters are long. Connect with Sapporo-area churches early; isolation is the biggest retention risk in rural Hokkaido.',
    jp: '北海道には独特のキリスト教史があります — ロシア正教の函館（1861年聖ニコライ）、札幌バンド（1876年クラーク博士）、戦後のOMFの集中。教会の数は少なく、広範囲に散在しています。冬は長い。早めに札幌地域の教会とつながってください — 道内の地方では孤立が最大の信仰離脱リスクです。'
  },
  'Fukuoka': {
    en: 'Fukuoka is Kyushu\'s largest city and the gateway to Japan\'s oldest Christian region. Nagasaki is two hours away. Korean church presence is significant due to proximity. Expect smaller, tight-knit Japanese congregations and growing Korean, Chinese, and Southeast Asian immigrant churches.',
    jp: '福岡は九州最大の都市で、日本最古のキリスト教地域への玄関口です。長崎まで2時間。韓国が近いため韓国教会の存在感が大きい。規模は小さいものの結束の固い日本人会衆と、成長中の韓国・中国・東南アジアの移民教会があります。'
  },
  'Aichi': {
    en: 'Nagoya and Aichi represent industrial Japan — Toyota, manufacturing, Brazilian Nikkei communities (Hamamatsu and Toyohashi have the largest Brazilian Pentecostal presence). Churches are practical, working-class, and often multilingual. Good networks through Chubu Evangelical Fellowship.',
    jp: '名古屋と愛知県は工業日本を代表します — トヨタ、製造業、ブラジル日系人コミュニティ（浜松と豊橋にはブラジル系ペンテコステ派の最大拠点）。教会は実践的、労働者階級的で、多言語のものも多い。中部福音ネットワークを通じた良いつながりがあります。'
  },
  'Nagasaki': {
    en: 'Nagasaki is the birthplace of Japanese Christianity — Xavier (1549), the 26 Martyrs (1597), the 250-year Hidden Christian era, the Discovery at Oura Church (1865), and the 1945 atomic bombing of Urakami Cathedral. Approximately 4% of the prefecture is Catholic — Japan\'s highest percentage. UNESCO-listed Hidden Christian sites. A returnee here joins 475 years of witness.',
    jp: '長崎は日本キリスト教発祥の地 — ザビエル（1549年）、二十六聖人（1597年）、250年の潜伏キリシタン時代、大浦天主堂での信徒発見（1865年）、1945年の浦上天主堂原爆被害。県民の約4%がカトリックで、これは日本で最も高い割合です。UNESCO世界遺産の潜伏キリシタン関連遺産もあります。ここに帰る帰国者は475年の証しの流れに加わります。'
  },
};

function generateCityGuide(data: ReturneeData, lang: string): string {
  const info = CITY_GUIDES[data.city] || {
    en: `Research the Christian landscape in ${data.city} before arriving. JCFN (Japanese Christian Fellowship Network) can connect you with local contacts anywhere in Japan. Every prefecture is different — a rural church in Tohoku is nothing like a Tokyo bilingual congregation.`,
    jp: `到着前に${CITIES_JP[data.city] || data.city}のキリスト教状況を調べてください。JCFN（日本クリスチャン・フェローシップ・ネットワーク）は日本全国どこでも地元の人につないでくれます。都道府県ごとに大きく異なります — 東北の田舎の教会は東京のバイリンガル教会とはまったく違います。`
  };
  return `<p style="font-size: 0.9375rem; line-height: 1.7; color: var(--text-secondary);">${info[lang as 'en' | 'jp']}</p>`;
}

function scriptCard(prompt: string, response: string): string {
  return `<div style="padding: 16px; background: var(--bg-tertiary); border-radius: 2px;">
    <p style="font-size: 0.875rem; font-weight: 600; margin-bottom: 4px;">${prompt}</p>
    <p style="font-size: 0.875rem; color: var(--text-secondary);">${response}</p>
  </div>`;
}

function generateFamilyScripts(lang: string): string {
  if (lang === 'en') {
    return `<div style="display: grid; gap: 12px;">
      ${scriptCard('If asked: "Did you join a cult overseas?"', '"I found a faith community that has been part of Japanese history since Xavier arrived in Kagoshima in 1549. It is not a new or foreign cult — there are 475 years of Japanese Christians, including the 26 Martyrs of Nagasaki and the Hidden Christians of Goto."')}
      ${scriptCard('If pressured: "Christianity is a Western religion"', '"Christianity has been in Japan for almost 500 years. Uchimura Kanzo, Nitobe Inazo, and Niijima Jo were all Japanese Christians who shaped modern Japan. Doshisha University, St. Luke\'s Hospital, and many schools were founded by Japanese Christians — this is part of Japanese history, not foreign import."')}
      ${scriptCard('If they worry about the ancestors', '"I still honor our ancestors. Following Jesus does not mean abandoning family — it means I want to bring peace and love into our home in a new way. Let me show you, not just explain."')}
    </div>`;
  }
  return `<div style="display: grid; gap: 12px;">
    ${scriptCard('「海外で変な宗教に入ったの？」と聞かれたら', '「1549年にザビエルが鹿児島に来て以来、日本の歴史の一部である信仰に出会いました。新しい外国のカルトではありません — 長崎二十六聖人や五島の潜伏キリシタンを含め、475年にわたる日本人キリスト者がいます。」')}
    ${scriptCard('「キリスト教は西洋の宗教だ」と言われたら', '「キリスト教は日本に500年近くあります。内村鑑三、新渡戸稲造、新島襄はみな日本人クリスチャンで近代日本を形成しました。同志社大学、聖路加病院、多くの学校は日本人クリスチャンによって設立されました — これは日本の歴史の一部で、外国からの輸入ではありません。」')}
    ${scriptCard('ご先祖様のことを心配されたら', '「私は今もご先祖様を敬っています。イエスに従うことは家族を捨てることではありません — 新しいかたちで平安と愛を家庭にもたらしたいのです。説明するより、行動で見てもらいます。」')}
  </div>`;
}

function generateResources(data: ReturneeData, lang: string): string {
  const items = lang === 'en'
    ? [
        '→ JCFN (Japanese Christian Fellowship Network) — jcfn.org',
        '→ YouVersion Bible App (新改訳2017, 新共同訳, offline capable)',
        '→ LINE prayer groups — the preferred Japanese messaging platform for small groups',
        '→ Download sermons/podcasts from your sending church before you leave',
        '→ Equipper Conference — JCFN\'s annual returnee gathering (usually late December)',
      ]
    : [
        '→ JCFN（日本クリスチャン・フェローシップ・ネットワーク）— jcfn.org',
        '→ YouVersion 聖書アプリ（新改訳2017、新共同訳、オフライン対応）',
        '→ LINE 祈祷グループ — 日本の小グループで最もよく使われるメッセージアプリ',
        '→ 出発前に送り出し教会から説教やポッドキャストをダウンロードしておく',
        '→ Equipper Conference — JCFN主催の年次帰国者集会（通常12月末）',
      ];

  const warning = !data.discipleship
    ? `<li style="padding: 8px 0; color: var(--warning); font-size: 0.875rem;">${lang === 'en'
        ? '⚠ Consider completing a discipleship program before returning — Japanese returnee retention is estimated at under 30% without one.'
        : '⚠ 帰国前に弟子訓練プログラムの修了を検討してください — 弟子訓練なしの日本人帰国者の信仰継続率は30%未満と推定されています。'}</li>`
    : '';

  return `<ul style="list-style: none; padding: 0;">
    ${items.map(item => `<li style="padding: 8px 0; color: var(--text-secondary); font-size: 0.875rem;">${item}</li>`).join('')}
    ${warning}
  </ul>`;
}
