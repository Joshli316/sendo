import { t, getLang } from '../i18n';

interface HeritageSection {
  era: string;
  years: string;
  title: { en: string; jp: string };
  body: { en: string; jp: string };
  quote?: { en: string; jp: string; attribution: string };
}

const SECTIONS: HeritageSection[] = [
  {
    era: '慶長',
    years: '1614',
    title: {
      en: 'The Ban',
      jp: '禁教令'
    },
    body: {
      en: 'On 27 January 1614, Tokugawa Ieyasu issued the nationwide ban on Christianity. By 1639, Japan was sealed: no foreigner could enter, no Christian could remain. Yet the faith did not die. Tens of thousands of believers went underground in the island villages of Nagasaki, Sotome, Ikitsuki, Amakusa, and the Gotō islands — beginning a 250-year secret transmission.',
      jp: '1614年1月27日、徳川家康は全国的な禁教令を発布しました。1639年までに日本は鎖国され、外国人は誰も入国できず、キリシタンは誰も残れませんでした。それでも信仰は死にませんでした。長崎、外海、生月、天草、五島列島の島嶼部の村々で、数万人の信者が地下に潜伏し、250年の秘密の継承が始まりました。'
    }
  },
  {
    era: '元和',
    years: '1622',
    title: {
      en: 'The Fumie',
      jp: '踏絵'
    },
    body: {
      en: 'Each year at New Year, villagers lined up before the magistrate. A bronze plaque showing Christ or the Virgin was laid on the ground. Step on it, and you were "clean." Refuse, and you would be bound and taken to Unzen\'s boiling sulphur springs. For the Kakure Kirishitan, stepping on the fumie was not apostasy — it was survival. In their hearts they asked forgiveness. Afterwards, in the privacy of their homes, they would weep, rinse the foot that had touched the image, and drink the water as a sacrament of sorrow.',
      jp: '毎年正月、村人たちは奉行の前に並びました。キリストや聖母の像が刻まれた銅板が地面に置かれます。踏めば「清い」、拒めば縛られて雲仙の硫黄泉に連れて行かれました。隠れキリシタンにとって、踏絵を踏むことは棄教ではなく、生き延びるための行為でした。心の中では赦しを乞いました。その後、家の密かな中で、像に触れた足を涙で洗い、その水を悲しみの聖餐として飲みました。'
    },
    quote: {
      en: 'We stepped on the image because our lives, our children, our whole village depended on it — but in our hearts we asked the Lord\'s forgiveness.',
      jp: '私たちは踏みました。命も、子どもも、村全体がそれにかかっていたから ー けれど心では主のお赦しを乞いました。',
      attribution: 'Oral tradition, Sotome region'
    }
  },
  {
    era: '寛永',
    years: '1637–1638',
    title: {
      en: 'Shimabara Rebellion',
      jp: '島原の乱'
    },
    body: {
      en: 'Famine, heavy taxation, and religious persecution drove 37,000 peasants and rōnin — most of them Christian — to rebel at Shimabara. They took Hara Castle and held it for three months. When it finally fell in April 1638, nearly all the defenders were killed, including the 16-year-old boy general Amakusa Shirō. The Shimabara Rebellion convinced the Shogunate that Christianity was an existential threat. Sakoku — the closure of Japan — followed within a year.',
      jp: '飢饉、重い年貢、宗教的迫害により、3万7千人の農民と浪人 ー そのほとんどがキリシタン ー が島原で蜂起しました。原城を奪い、3ヶ月間持ちこたえました。1638年4月に落城した時、16歳の少年総大将・天草四郎を含むほぼ全員の守備兵が殺されました。島原の乱は幕府にキリスト教が存在的脅威であると確信させました。その翌年、鎖国が完成しました。'
    }
  },
  {
    era: '寛永',
    years: '1640–1865',
    title: {
      en: 'The Long Silence',
      jp: '長い沈黙'
    },
    body: {
      en: 'For 225 years there was no priest, no mass, no sacrament administered by a cleric. The Kakure Kirishitan preserved their faith through oral catechism (the Keichō no Oratio), statues of Maria that looked like Kannon, secret baptisms by a village elder called the mizukata, and a calendar of feast days disguised as folk festivals. The words of the Latin prayers drifted into a language no one could translate but everyone knew by heart.',
      jp: '225年間、司祭も、ミサも、聖職者による秘跡もありませんでした。隠れキリシタンは、口伝の教理（慶長のオラショ）、観音のような姿のマリア像、「水方」と呼ばれる村の長老によるひそかな洗礼、民俗祭りに偽装された祝日暦によって信仰を守りました。ラテン語の祈りの言葉は、誰も翻訳できないが皆が心で知っている言語へと流れ込みました。'
    }
  },
  {
    era: '慶応',
    years: '1865',
    title: {
      en: 'The Discovery at Ōura',
      jp: '信徒発見'
    },
    body: {
      en: 'On 17 March 1865, Father Bernard Petitjean of the Paris Foreign Missions was praying alone in the newly built Ōura Church in Nagasaki. A group of fifteen peasants from Urakami entered. One woman approached him and whispered: "All of us here are of the same heart as you. Where is the statue of Santa Maria?" After 250 years of silence, the Hidden Christians had found a priest. Pope Pius IX called it "a miracle, a miracle — the rediscovery of the Church in the Far East." It is the only known instance in Church history of a Christian community surviving for centuries without clergy.',
      jp: '1865年3月17日、パリ外国宣教会のベルナール・プチジャン神父は、長崎に新築された大浦天主堂で一人祈っていました。浦上から15人の農民の一団が入ってきました。一人の女性が近づき、ささやきました。「ワレラノムネ、アナタノムネトオナジ。サンタ・マリアノゴゾウハドコ？」250年の沈黙の後、隠れキリシタンは司祭を見つけました。教皇ピウス9世はこれを「奇跡、奇跡 ー 極東における教会の再発見」と呼びました。聖職者なしに何世紀も生き延びたキリスト教共同体は、教会史上唯一の事例です。'
    },
    quote: {
      en: 'All of us here are of the same heart as you. Where is the statue of Santa Maria?',
      jp: 'ワレラノムネ、アナタノムネトオナジ。サンタ・マリアノゴゾウハドコ？',
      attribution: 'Urakami villager to Fr. Petitjean, 17 March 1865'
    }
  },
  {
    era: '平成',
    years: '2018',
    title: {
      en: 'UNESCO World Heritage',
      jp: 'UNESCO世界遺産登録'
    },
    body: {
      en: 'In June 2018, UNESCO inscribed "Hidden Christian Sites in the Nagasaki Region" as a World Heritage property — twelve components including Ōura Cathedral, Hara Castle Ruins, the villages of Sakitsu and Shitsu, and the churches of Nozaki Island. The inscription recognizes not magnificent architecture but the quiet stubbornness of faith transmitted from parent to child for 250 years in defiance of empire. Today, only about 300 households in Sotome and Ikitsuki still practice the old ways of the Kakure Kirishitan — not quite Catholic, not quite Buddhist, something wholly Japanese and wholly Christian.',
      jp: '2018年6月、UNESCOは「長崎と天草地方の潜伏キリシタン関連遺産」を世界遺産に登録しました ー 大浦天主堂、原城跡、崎津・出津の集落、野崎島の教会群を含む12の構成資産です。この登録が認めるのは壮麗な建築ではなく、250年にわたり親から子へと帝国に逆らって伝えられた信仰の静かな頑強さです。今日、外海と生月ではおよそ300世帯が隠れキリシタンの古い作法を守り続けています ー カトリックでもなく、仏教でもなく、完全に日本的で完全にキリスト教的な何か。'
    }
  }
];

export function renderHeritage(): void {
  const app = document.getElementById('app')!;
  const lang = getLang();

  app.innerHTML = `
    <div class="heritage-page">
      <!-- Intro -->
      <section class="heritage-hero">
        <div class="heritage-vertical-label" aria-hidden="true">
          <span>隠</span><span>れ</span><span>キ</span><span>リ</span><span>シ</span><span>タ</span><span>ン</span>
        </div>
        <div class="heritage-hero-content">
          <span class="heritage-eyebrow">${lang === 'en' ? '1614 — 1865 — 2018' : '1614 — 1865 — 2018'}</span>
          <h1 class="heritage-title" data-i18n="heritage.title">${t('heritage.title')}</h1>
          <p class="heritage-sub" data-i18n="heritage.subtitle">${t('heritage.subtitle')}</p>
        </div>
      </section>

      <!-- Sections -->
      <div class="heritage-sections">
        ${SECTIONS.map((s, i) => `
          <section class="heritage-section ${i % 2 === 0 ? 'heritage-left' : 'heritage-right'}">
            <div class="heritage-marker">
              <div class="heritage-era">${s.era}</div>
              <div class="heritage-year">${s.years}</div>
              <div class="heritage-rail" aria-hidden="true"></div>
            </div>
            <div class="heritage-body">
              <h2>${s.title[lang]}</h2>
              <p>${s.body[lang]}</p>
              ${s.quote ? `
                <blockquote class="heritage-quote">
                  <p>"${s.quote[lang]}"</p>
                  <footer>— ${s.quote.attribution}</footer>
                </blockquote>
              ` : ''}
            </div>
          </section>
        `).join('')}
      </div>

      <!-- Footer note -->
      <section class="heritage-outro container" style="max-width: 720px; padding: 64px 24px;">
        <p style="font-family: var(--font-display); font-size: 1.25rem; line-height: 1.55; color: var(--text-primary); margin-bottom: 20px;">
          ${lang === 'en'
            ? 'The Hidden Christian heritage is not a museum piece. It is a living question: what does faith look like when stripped of every visible institution, and sustained only by love?'
            : '隠れキリシタンの遺産は博物館の遺物ではありません。すべての可視的制度を剥ぎ取られ、愛だけによって保たれた信仰はどのような姿を取るのか ー これは今も問われ続ける問いです。'}
        </p>
        <p style="font-size: 0.875rem; color: var(--text-tertiary);">
          ${lang === 'en' ? 'Explore more: the animated spread map, Endō Shūsaku\'s persona, and the missionary network graph.' : '続き: 動く伝播マップ、遠藤周作のペルソナ、宣教師ネットワーク・グラフ。'}
        </p>
      </section>
    </div>
  `;

  injectHeritageStyles();
}

function injectHeritageStyles(): void {
  if (document.getElementById('sendo-heritage-styles')) return;
  const style = document.createElement('style');
  style.id = 'sendo-heritage-styles';
  style.textContent = `
    .heritage-page { max-width: 1440px; margin: 0 auto; padding: 0 32px; }
    @media (max-width: 768px) { .heritage-page { padding: 0 20px; } }

    .heritage-hero {
      position: relative;
      padding: 96px 0 80px;
      display: grid;
      grid-template-columns: 64px 1fr;
      gap: 48px;
      align-items: center;
      border-bottom: 1px solid var(--border-subtle);
    }
    @media (max-width: 640px) {
      .heritage-hero { grid-template-columns: 1fr; gap: 24px; padding: 56px 0 48px; }
    }
    .heritage-vertical-label {
      display: flex;
      flex-direction: column;
      gap: 6px;
      font-family: var(--font-display);
      font-size: 22px;
      color: var(--text-tertiary);
      letter-spacing: 0.1em;
      writing-mode: vertical-rl;
      text-orientation: upright;
    }
    @media (max-width: 640px) {
      .heritage-vertical-label { flex-direction: row; writing-mode: horizontal-tb; font-size: 14px; color: var(--accent-vermillion); letter-spacing: 0.3em; }
    }
    .heritage-eyebrow {
      font-family: var(--font-mono);
      font-size: 11px;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      color: var(--accent-vermillion);
      margin-bottom: 24px;
      display: inline-block;
    }
    .heritage-title {
      font-family: var(--font-display);
      font-size: clamp(32px, 5vw, 60px);
      line-height: 1.1;
      letter-spacing: -0.02em;
      color: var(--text-primary);
      margin: 0 0 24px;
      max-width: 18ch;
    }
    .heritage-sub {
      font-size: 17px;
      line-height: 1.6;
      color: var(--text-secondary);
      margin: 0;
      max-width: 58ch;
    }

    .heritage-sections { padding: 64px 0; }
    .heritage-section {
      display: grid;
      grid-template-columns: 180px 1fr;
      gap: 48px;
      padding: 64px 0;
      border-bottom: 1px dashed var(--border-subtle);
    }
    .heritage-section:last-child { border-bottom: none; }
    .heritage-right { grid-template-columns: 1fr 180px; }
    .heritage-right .heritage-marker { order: 2; text-align: right; }
    .heritage-right .heritage-body { order: 1; text-align: left; }
    @media (max-width: 820px) {
      .heritage-section,
      .heritage-right { grid-template-columns: 1fr; gap: 24px; padding: 40px 0; }
      .heritage-right .heritage-marker { order: 0; text-align: left; }
      .heritage-right .heritage-body { order: 0; }
    }

    .heritage-marker { position: relative; padding-top: 6px; }
    .heritage-era {
      font-family: var(--font-display);
      font-size: 28px;
      color: var(--accent-vermillion);
      line-height: 1;
      margin-bottom: 8px;
    }
    .heritage-year {
      font-family: var(--font-mono);
      font-size: 13px;
      letter-spacing: 0.1em;
      color: var(--text-tertiary);
    }
    .heritage-rail {
      margin-top: 20px;
      width: 2px;
      height: 56px;
      background: var(--accent-vermillion);
      opacity: 0.6;
    }

    .heritage-body h2 {
      font-family: var(--font-display);
      font-size: clamp(24px, 3vw, 36px);
      color: var(--text-primary);
      margin: 0 0 20px;
      line-height: 1.2;
    }
    .heritage-body p {
      font-size: 17px;
      line-height: 1.75;
      color: var(--text-secondary);
      margin: 0 0 20px;
      max-width: 62ch;
    }

    .heritage-quote {
      margin: 32px 0 0;
      padding: 20px 0 20px 24px;
      border-left: 2px solid var(--accent-vermillion);
      font-family: var(--font-display);
      font-size: 20px;
      line-height: 1.5;
      color: var(--text-primary);
      max-width: 50ch;
    }
    .heritage-quote p { font-family: var(--font-display); font-size: 20px; color: var(--text-primary); margin: 0 0 12px; }
    .heritage-quote footer {
      font-family: var(--font-mono);
      font-size: 11px;
      letter-spacing: 0.1em;
      color: var(--text-tertiary);
      font-style: normal;
    }
  `;
  document.head.appendChild(style);
}
