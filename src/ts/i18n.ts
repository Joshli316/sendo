type Lang = 'en' | 'jp';

interface Translations {
  [key: string]: { en: string; jp: string };
}

export interface SisterProject {
  key: 'xuanyan' | 'sendo' | 'truyendao' | 'seonmun';
  url: string;
  emoji: string;
  tag: string;
  regionKey: string;
  isMain: boolean;
}

export const SISTER_PROJECTS: SisterProject[] = [
  { key: 'xuanyan',   url: 'https://xuanyan-cjf.pages.dev', emoji: '🇨🇳', tag: '宣研',       regionKey: 'sisters.china',   isMain: true  },
  { key: 'sendo',     url: 'https://sendo.pages.dev',       emoji: '🇯🇵', tag: '宣道',       regionKey: 'sisters.japan',   isMain: false },
  { key: 'truyendao', url: 'https://truyendao.pages.dev',   emoji: '🇻🇳', tag: '傳道',       regionKey: 'sisters.vietnam', isMain: false },
  { key: 'seonmun',   url: 'https://seonmun.pages.dev',     emoji: '🇰🇵', tag: '선문 (宣門)', regionKey: 'sisters.nk',      isMain: false },
];

const strings: Translations = {
  // Nav
  'nav.research': { en: 'Research', jp: '研究' },
  'nav.tools': { en: 'Tools', jp: 'ツール' },
  'nav.heritage': { en: 'Heritage', jp: '遺産' },
  'nav.personas': { en: 'Personas', jp: '人物' },
  'nav.sisters_link': { en: '← XuanYan family', jp: '← XuanYan ファミリー' },

  // Sister projects
  'sisters.china': { en: 'China', jp: '中国' },
  'sisters.japan': { en: 'Japan', jp: '日本' },
  'sisters.vietnam': { en: 'Vietnam', jp: 'ベトナム' },
  'sisters.nk': { en: 'North Korea', jp: '北朝鮮' },
  'sisters.main_label': { en: 'Main project', jp: 'メインプロジェクト' },
  'sisters.heading': { en: 'The Asia Quartet', jp: 'アジア四部作' },
  'footer.family_title': { en: 'Part of the XuanYan 宣研 family', jp: 'XuanYan 宣研 ファミリーの一員' },
  'footer.family_main': { en: 'Main', jp: 'メイン' },
  'nav.about': { en: 'About', jp: 'ラボについて' },
  'nav.search': { en: 'Search', jp: '検索' },

  // Hero — asymmetric split layout
  'hero.question': {
    en: 'Why has Christianity never reached 2% in Japan?',
    jp: 'なぜ日本のキリスト教は2％に届かないのか？'
  },
  'hero.answer': {
    en: '475 years. 12 reports. 15 historical voices. One bilingual platform.',
    jp: '475年。12の研究報告。15の歴史的な声。一つのバイリンガル・プラットフォーム。'
  },
  'hero.intro': {
    en: 'A research archive connecting Francis Xavier\'s 1549 landing at Kagoshima to today\'s returnee ministry — 12 reports, interactive tools, bilingual throughout.',
    jp: '1549年のザビエル鹿児島上陸から今日の帰国者事工までを結ぶ研究アーカイブ。12の報告、インタラクティブなツール、完全バイリンガル。'
  },
  'hero.cta.research': { en: 'Read the Reports', jp: '研究報告を読む' },
  'hero.cta.ask': { en: 'Ask the Archive', jp: 'アーカイブに質問する' },
  'hero.stat.years': { en: 'years of history', jp: '年の歴史' },
  'hero.stat.reports': { en: 'research reports', jp: '研究報告' },
  'hero.stat.personas': { en: 'historical voices', jp: '歴史的人物' },
  'hero.stat.percent': { en: 'still Christian today', jp: 'が今日のキリスト教徒' },

  // Feature blocks (four)
  'features.eyebrow': { en: 'The Platform', jp: 'プラットフォーム' },
  'features.research.title': { en: 'Research Observatory', jp: '研究観測所' },
  'features.research.desc': {
    en: '12 in-depth reports spanning the Christian Century, Sakoku underground, Meiji freedom, and today\'s 1% church — fully bilingual, cited, searchable.',
    jp: 'キリシタン世紀、鎖国の地下潜伏、明治の信教の自由、そして今日の1％の教会まで。12の深層研究報告。バイリンガル、出典付き、検索可能。'
  },
  'features.tools.title': { en: 'Ministry Tools', jp: '事工ツール' },
  'features.tools.desc': {
    en: 'Animated map, returnee preparation kit, training modules, retention calculator. Practical tools built on the research.',
    jp: '動くマップ、帰国準備キット、トレーニング・モジュール、信仰継続の予測計算機。研究に基づく実用ツール。'
  },
  'features.heritage.title': { en: 'Hidden Christian Heritage', jp: '潜伏キリシタンの遺産' },
  'features.heritage.desc': {
    en: 'An immersive experience on the 250 years of Kakure Kirishitan underground transmission, Ōura\'s 1865 discovery, and the UNESCO sites.',
    jp: '250年に及ぶ隠れキリシタンの地下継承、1865年の大浦での発見、UNESCO世界遺産登録の12構成資産まで、没入型の体験。'
  },
  'features.personas.title': { en: 'Historical Conversations', jp: '歴史との対話' },
  'features.personas.desc': {
    en: 'Converse with Xavier, Uchimura, Kagawa, Endō, and a dozen more — AI-mediated, source-grounded, cited.',
    jp: 'ザビエル、内村鑑三、賀川豊彦、遠藤周作ほか。AIを介した、出典に基づく、引用付きの対話。'
  },

  // Research page
  'research.title': { en: 'Research Reports', jp: '研究報告' },
  'research.subtitle': {
    en: '12 bilingual reports on Christianity in Japan — from the 1549 arrival to contemporary scholarship and AI-enabled research.',
    jp: '日本におけるキリスト教に関する12のバイリンガル研究報告。1549年の到来から現代の学術研究とAI支援研究まで。'
  },
  'research.filter.all': { en: 'All', jp: 'すべて' },
  'research.filter.history': { en: 'History', jp: '歴史' },
  'research.filter.scholarship': { en: 'Scholarship', jp: '学術研究' },
  'research.filter.gaps': { en: 'Gaps', jp: '研究の欠落' },
  'research.filter.ai': { en: 'AI', jp: 'AI' },
  'research.filter.archives': { en: 'Archives', jp: 'アーカイブ' },
  'research.filter.diaspora': { en: 'Diaspora', jp: 'ディアスポラ' },
  'research.filter.culture': { en: 'Culture', jp: '文化' },
  'research.filter.contemporary': { en: 'Contemporary', jp: '現代' },
  'research.readingtime': { en: 'min read', jp: '分で読める' },
  'research.search.placeholder': { en: 'Search all reports...', jp: 'すべての報告を検索...' },

  // Timeline
  'timeline.title': { en: '475 Years of Christianity in Japan', jp: '日本のキリスト教 475年' },
  'timeline.subtitle': {
    en: 'From Francis Xavier\'s 1549 arrival at Kagoshima to today — scroll through the moments that shaped the Japanese church.',
    jp: '1549年のザビエル鹿児島上陸から現代まで。日本のキリスト教を形作った瞬間を辿ります。'
  },
  'timeline.autoplay': { en: 'Auto-Play', jp: '自動再生' },
  'timeline.pause': { en: 'Pause', jp: '一時停止' },
  'timeline.filter.all': { en: 'All', jp: 'すべて' },
  'timeline.filter.mission': { en: 'Mission', jp: '宣教' },
  'timeline.filter.persecution': { en: 'Persecution', jp: '迫害' },
  'timeline.filter.heritage': { en: 'Heritage', jp: '遺産' },
  'timeline.filter.cultural': { en: 'Cultural', jp: '文化' },
  'timeline.filter.contemporary': { en: 'Contemporary', jp: '現代' },

  // Timeline eras
  'era.kirishitan': { en: 'Christian Century', jp: 'キリシタン世紀' },
  'era.underground': { en: 'Sakoku / Underground', jp: '鎖国・潜伏' },
  'era.bakumatsu': { en: 'Bakumatsu', jp: '幕末' },
  'era.meiji': { en: 'Meiji', jp: '明治' },
  'era.taisho-showa': { en: 'Taishō–Shōwa', jp: '大正・昭和' },
  'era.postwar': { en: 'Postwar', jp: '戦後' },
  'era.reiwa': { en: 'Heisei–Reiwa', jp: '平成・令和' },

  // Ask the Archive
  'ask.title': { en: 'Ask the Archive', jp: 'アーカイブに質問' },
  'ask.subtitle': {
    en: 'Ask anything about Christianity in Japan. Every answer cites its sources from our 12 research reports.',
    jp: '日本のキリスト教について自由に質問してください。すべての回答は12の研究報告から出典を引用します。'
  },
  'ask.placeholder': { en: 'Ask anything about Christianity in Japan...', jp: '日本のキリスト教について自由に質問してください...' },
  'ask.send': { en: 'Send', jp: '送信' },
  'ask.thinking': { en: 'Searching the archive...', jp: 'アーカイブを検索中...' },
  'ask.starter.1': { en: 'What happened to the Hidden Christians?', jp: '隠れキリシタンに何が起こったのか？' },
  'ask.starter.2': { en: 'Why is Japan only 1% Christian?', jp: 'なぜ日本のキリスト教徒は1％なのか？' },
  'ask.starter.3': { en: 'Who were the 26 Martyrs of Nagasaki?', jp: '日本二十六聖人とは誰か？' },
  'ask.starter.4': { en: 'How did Meiji religious freedom change Japan?', jp: '明治の信教の自由はどう日本を変えたか？' },
  'ask.error': {
    en: 'Something went wrong. Please try again.',
    jp: 'エラーが発生しました。もう一度お試しください。'
  },
  'ask.sources': { en: 'Sources', jp: '出典' },

  // Search
  'search.placeholder': { en: 'Search reports, tools, timeline...', jp: '報告、ツール、年表を検索...' },
  'search.hint': { en: 'Press Cmd+K to search', jp: 'Cmd+Kで検索' },
  'search.no_results': { en: 'No results found', jp: '該当する結果がありません' },

  // Report TOC
  'toc.title': { en: 'Contents', jp: '目次' },
  'toc.sources': { en: 'Sources', jp: '参考文献' },
  'toc.back': { en: '← Back to Reports', jp: '← 報告一覧へ戻る' },
  'toc.cite': { en: 'Cite this', jp: '引用する' },
  'toc.prev': { en: 'Previous', jp: '前へ' },
  'toc.next': { en: 'Next', jp: '次へ' },

  // Tools hub
  'tools.title': { en: 'Tools', jp: 'ツール' },
  'tools.subtitle': {
    en: 'Practical tools built on the research — for missionaries, pastors, returnees, and volunteers.',
    jp: '研究に基づく実用ツール。宣教師、牧師、帰国者、ボランティアのために。'
  },
  'tools.map': { en: 'Animated Spread Map', jp: '動く伝播マップ' },
  'tools.map.desc': { en: 'Watch the Japanese church stall despite full religious freedom.', jp: '信教の自由の下でも伸び悩む日本の教会を、地図で辿る。' },
  'tools.network': { en: 'Missionary Network', jp: '宣教師ネットワーク' },
  'tools.network.desc': { en: 'Explore the relationships between missionaries, Japanese converts, and mission boards.', jp: '宣教師、日本人信者、宣教団体のつながりを探索する。' },
  'tools.returnee': { en: 'Returnee Preparation', jp: '帰国準備ツール' },
  'tools.returnee.desc': { en: 'Personalized 90-day return kit for Japanese students coming home.', jp: '帰国する日本人留学生のための90日間の個別帰国キット。' },
  'tools.training': { en: 'Volunteer Training', jp: 'ボランティア研修' },
  'tools.training.desc': { en: '6 modules for anyone serving Japanese students and returnees.', jp: '日本人学生と帰国者に仕えるすべての人のための6モジュール。' },
  'tools.retention': { en: 'Faith Retention', jp: '信仰継続予測' },
  'tools.retention.desc': { en: 'Predict return-to-home attrition and model interventions.', jp: '帰国後の離脱を予測し、介入策をシミュレーションする。' },
  'tools.personas': { en: 'Historical Conversations', jp: '歴史との対話' },
  'tools.personas.desc': { en: 'Converse with 12 figures from Japanese Christian history.', jp: '日本キリスト教史の12人と対話する。' },

  // Returnee tool
  'returnee.title': { en: 'Returnee Preparation Tool', jp: '帰国準備ツール' },
  'returnee.subtitle': {
    en: 'Get a personalized 90-day Return Kit based on your prefecture, faith stage, and needs.',
    jp: '都道府県、信仰の段階、必要に応じた90日間の個別帰国キットを作成します。'
  },
  'returnee.step1': { en: 'Which prefecture are you returning to?', jp: 'どの都道府県に帰りますか？' },
  'returnee.step2': { en: 'Your Faith Profile', jp: '信仰の段階' },
  'returnee.step3': { en: 'What concerns you most?', jp: '最も心配なことは？' },
  'returnee.generate': { en: 'Generate My Return Kit', jp: '帰国キットを作成' },
  'returnee.download': { en: 'Download PDF', jp: 'PDFをダウンロード' },
  'returnee.years': { en: 'How long have you been a Christian?', jp: 'クリスチャンになってどれくらいですか？' },
  'returnee.baptized': { en: 'Have you been baptized?', jp: '洗礼を受けましたか？' },
  'returnee.discipleship': { en: 'Have you completed a discipleship course?', jp: '弟子訓練を受けましたか？' },
  'returnee.yes': { en: 'Yes', jp: 'はい' },
  'returnee.no': { en: 'No', jp: 'いいえ' },
  'returnee.concern.church': { en: 'Finding a church', jp: '教会を見つけること' },
  'returnee.concern.family': { en: 'Family pressure', jp: '家族からの圧力' },
  'returnee.concern.workplace': { en: 'Workplace identity', jp: '職場での信仰表明' },
  'returnee.concern.loneliness': { en: 'Loneliness', jp: '孤独感' },
  'returnee.concern.language': { en: 'Worshiping in Japanese', jp: '日本語での礼拝' },
  'returnee.concern.faith': { en: 'Losing faith', jp: '信仰を失うこと' },
  'returnee.connect': { en: 'Connect Me', jp: 'つないでください' },
  'returnee.connect.desc': {
    en: 'Request a warm introduction to a JCFN partner or church contact in your prefecture.',
    jp: 'お住まいの地域のJCFNパートナーまたは教会への紹介を依頼します。'
  },

  // Training
  'training.title': { en: 'Volunteer Training', jp: 'ボランティア研修' },
  'training.subtitle': {
    en: '6 modules to prepare you for effective ministry with Japanese students and returnees.',
    jp: '日本人学生と帰国者への有効な奉仕のための6モジュール。'
  },
  'training.progress': { en: 'modules completed', jp: 'モジュール完了' },
  'training.start': { en: 'Start Module', jp: 'モジュール開始' },
  'training.continue': { en: 'Continue', jp: '続ける' },
  'training.completed': { en: 'Completed', jp: '完了' },
  'training.quiz': { en: 'Knowledge Check', jp: '理解度チェック' },
  'training.reflection': { en: 'Reflection', jp: '振り返り' },
  'training.next': { en: 'Next Section', jp: '次のセクションへ' },

  // Personas
  'personas.title': { en: 'Historical Conversations', jp: '歴史との対話' },
  'personas.subtitle': {
    en: 'Converse with 12 figures from Japanese Christian history — AI-mediated, grounded in their actual writings.',
    jp: '日本キリスト教史の12人と対話する。実際の著作に基づき、AIが仲介します。'
  },
  'personas.chat.placeholder': { en: 'Ask a question...', jp: '質問してください...' },

  // Retention Calculator
  'retention.title': { en: 'Faith Retention Calculator', jp: '信仰継続予測ツール' },
  'retention.subtitle': {
    en: 'Estimate the likelihood that a returnee will maintain active faith in Japan — and model what interventions matter.',
    jp: '帰国者が日本で積極的な信仰を保つ可能性を予測し、どの介入が有効かをモデル化します。'
  },
  'retention.calculate': { en: 'Calculate', jp: '計算する' },
  'retention.whatif': { en: 'What If Mode', jp: '仮想シナリオ' },
  'retention.result': { en: 'Estimated Retention', jp: '継続予測' },
  'retention.discipleship': { en: 'Discipleship Depth', jp: '弟子訓練の深さ' },
  'retention.preparation': { en: 'Pre-Return Preparation', jp: '帰国前の準備' },
  'retention.relational': { en: 'Relational Factors', jp: '関係性要因' },
  'retention.duration': { en: 'Duration of Faith', jp: '信仰の期間' },
  'retention.connections': { en: 'Japan-Side Connections', jp: '日本側のつながり' },

  // Gaps
  'gaps.title': { en: 'Research Gap Tracker', jp: '研究ギャップ・トラッカー' },
  'gaps.subtitle': {
    en: 'Track the biggest unanswered questions in Japan missions scholarship. Claim a gap and contribute.',
    jp: '日本宣教学における最大の未解明問題を追跡します。ギャップを引き受けて貢献してください。'
  },
  'gaps.filter.category': { en: 'Category', jp: 'カテゴリ' },
  'gaps.filter.status': { en: 'Status', jp: 'ステータス' },
  'gaps.filter.ai': { en: 'AI Feasibility', jp: 'AI適用度' },
  'gaps.claim': { en: "I'm working on this", jp: 'これに取り組んでいます' },

  // Comparator
  'comparator.title': { en: 'Bilingual Comparator', jp: 'バイリンガル比較' },
  'comparator.subtitle': {
    en: 'Compare how the same events are described in English-language and Japanese-language sources.',
    jp: '同じ出来事が英語と日本語の資料でどう描かれているかを比較します。'
  },
  'comparator.select': { en: 'Select an event', jp: '出来事を選択' },
  'comparator.translate': { en: 'Translate', jp: '翻訳' },
  'comparator.why': { en: 'Why These Differ', jp: 'なぜ異なるか' },

  // Heritage
  'heritage.title': { en: 'Hidden Christian Heritage', jp: '潜伏キリシタンの遺産' },
  'heritage.subtitle': {
    en: '250 years of underground faith, the 1865 discovery at Ōura, and the UNESCO World Heritage sites.',
    jp: '250年の地下の信仰、1865年の大浦での発見、そしてUNESCO世界遺産。'
  },

  // About
  'about.title': { en: 'About Sendō', jp: '宣道について' },
  'about.p1': {
    en: 'Sendō (宣道) applies AI to international student ministry and the Japanese diaspora pipeline — connecting 475 years of missions history to practical tools for today.',
    jp: '宣道はAIを留学生事工と日本人ディアスポラの支援に適用し、475年の宣教史を今日の実用ツールにつなぎます。'
  },
  'about.p2': {
    en: 'The platform connects 475 years of Christian missions in Japan to practical ministry tools. Every feature is bilingual, AI-powered, and grounded in peer-reviewed research. It is the sister to XuanYan 宣研 (China) — shared architecture, different stories.',
    jp: '本プラットフォームは、日本における475年のキリスト教宣教史を実用的な事工ツールと結びつけます。すべての機能はバイリンガルで、AIを活用し、査読済みの研究に基づきます。中国版「宣研」の姉妹プロジェクトであり、同じアーキテクチャ、異なる物語です。'
  },
  'about.p3': {
    en: 'We partner with JCFN (Japanese Christian Fellowship Network) for returnee support. Sendō is proof that AI can serve the Great Commission — not replace human connection, but extend it.',
    jp: 'JCFN（日本人クリスチャン・フェローシップ・ネットワーク）と連携して帰国者を支援しています。宣道は、AIが世界宣教に仕えうることの証です。人のつながりを置き換えるのではなく、広げるために。'
  },

  // Footer
  'footer.mission': {
    en: 'AI can serve the Great Commission — not replace human connection, but extend it.',
    jp: 'AIは人のつながりを置き換えるのではなく、広げるために。'
  },
  'footer.tagline': { en: 'Powered by AI. Grounded in 475 years of history.', jp: 'AIで駆動。475年の歴史に根ざして。' },
  'footer.fc': { en: 'About', jp: 'ラボについて' },
  'footer.privacy': { en: 'Privacy', jp: 'プライバシー' },
  'footer.github': { en: 'GitHub', jp: 'GitHub' },

  // Common
  'common.loading': { en: 'Loading...', jp: '読み込み中...' },
  'common.error': { en: 'Something went wrong. Please try again.', jp: 'エラーが発生しました。もう一度お試しください。' },
  'common.back': { en: 'Back', jp: '戻る' },
  'common.readmore': { en: 'Read more', jp: '続きを読む' },
  'common.ai_translated': { en: 'AI-translated — review pending', jp: 'AI翻訳 — レビュー待ち' },
};

let currentLang: Lang = (localStorage.getItem('sendo-lang') as Lang) || detectBrowserLang();

function detectBrowserLang(): Lang {
  const nav = typeof navigator !== 'undefined' ? (navigator.language || '').toLowerCase() : '';
  return nav.startsWith('ja') ? 'jp' : 'en';
}

export function t(key: string): string {
  const entry = strings[key];
  if (!entry) {
    console.warn(`Missing i18n key: ${key}`);
    return key;
  }
  return entry[currentLang];
}

export function getLang(): Lang {
  return currentLang;
}

export function setLang(lang: Lang): void {
  currentLang = lang;
  localStorage.setItem('sendo-lang', lang);
  document.documentElement.lang = lang === 'jp' ? 'ja' : 'en';
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n')!;
    el.textContent = t(key);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder')!;
    (el as HTMLInputElement).placeholder = t(key);
  });
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html')!;
    el.innerHTML = t(key);
  });
  window.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
}

export function toggleLang(): void {
  setLang(currentLang === 'en' ? 'jp' : 'en');
}

export { type Lang, type Translations };
