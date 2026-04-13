import { t, getLang } from '../i18n';

interface SourcePair {
  id: string;
  event_name: { en: string; jp: string };
  year: number;
  en_source: { text: string; attribution: string; context: string };
  jp_source: { text: string; attribution: string; context: string };
  editorial_note: { en: string; jp: string };
}

function getSourcePairs(): SourcePair[] {
  return [
    {
      id: 'oura_discovery',
      event_name: { en: 'Discovery at Oura Church (1865)', jp: '大浦天主堂での信徒発見（1865）' },
      year: 1865,
      en_source: {
        text: 'On March 17, 1865, a group of villagers from Urakami approached Father Bernard Petitjean at the newly constructed Oura Church in Nagasaki. After 250 years of isolation, persecution, and the complete absence of clergy, they whispered: "The heart of all of us here does not differ from yours." It was one of the most astonishing moments in the history of world Christianity — an entire community that had preserved the faith across seven generations without priests, Bibles, or visible churches. Petitjean fell to his knees and wept.',
        attribution: 'Catholic missionary accounts and Petitjean\'s letters, 1865',
        context: 'Written from the perspective of European Catholic missionaries, framing the discovery as a miracle of Providence and a vindication of the 16th-century martyrs\' witness.',
      },
      jp_source: {
        text: '1865年3月17日、建てられたばかりの大浦天主堂を浦上の村人たちが訪れ、プティジャン神父に「ワレラノムネ、アナタトオナジ」と打ち明けました。250年の禁教と迫害の間、司祭も聖書も可視の教会もない中で、七世代にわたり信仰を口伝と洗礼の秘跡だけで守り続けた潜伏キリシタンたちの存在が明らかになった瞬間でした。しかし喜びは長くは続かず、この発見の後、約3,400人の浦上信徒が明治政府によって「浦上四番崩れ」で全国に流配されました。信仰の発見と迫害は不可分でした。',
        attribution: '片岡弥吉『浦上四番崩れ』、日本人カトリック史研究',
        context: '日本人の視点から書かれ、発見の喜びと直後の「浦上四番崩れ」流配を一体のものとして提示する。殉教だけでなく継続する国家圧力を強調。',
      },
      editorial_note: {
        en: 'Western Catholic accounts tend to frame the Discovery as a triumphant miracle — a resurrection story. Japanese Catholic scholarship, shaped by the immediate aftermath, holds discovery and persecution together as one inseparable event. The "Fourth Urakami Incident" (1867-1873) scattered believers across 20 provinces. Three-quarters of the Japanese story happens in the chapters Western writers often skip.',
        jp: '西洋カトリックの記述は信徒発見を凱旋的な奇跡 — 復活の物語 — として枠付けがちです。日本のカトリック研究は、直後の結果によって形成され、発見と迫害を一体の出来事として保持しています。「浦上四番崩れ」（1867-1873）は信徒を20の県に流配しました。日本側の物語の4分の3は、西洋の書き手がしばしば飛ばす章で起きています。',
      },
    },
    {
      id: 'shimabara',
      event_name: { en: 'Shimabara Rebellion (1637-1638)', jp: '島原の乱（1637-1638）' },
      year: 1637,
      en_source: {
        text: 'The Shimabara Rebellion of 1637-1638 was the last major armed uprising in Tokugawa Japan. Led by the charismatic 16-year-old Amakusa Shiro, an army of 37,000 peasants — most of them Christian — held Hara Castle for three months against a shogunal force of 125,000. When the castle finally fell in April 1638, virtually all defenders were killed. The rebellion sealed the Tokugawa decision to close Japan to Christianity and enforce the sakoku (closed country) policy. Western scholarship has long treated Shimabara as primarily a religious event — Christian martyrdom under a pagan tyranny.',
        attribution: 'C.R. Boxer, The Christian Century in Japan (1951)',
        context: 'Written by a British scholar working in the mid-20th century, framing the rebellion through a Catholic missionary lens that emphasizes religious persecution.',
      },
      jp_source: {
        text: '島原の乱（1637-1638）は、松倉氏の過酷な年貢取立てと飢饉による農民一揆として始まり、旧キリシタン領主有馬氏の配下だった農民と浪人が多く参加したことから、宗教的色彩を帯びました。天草四郎時貞を頭首とした37,000人の農民は原城に籠城しましたが、幕府軍12万5千に攻め落とされ、ほぼ全員が殺されました。日本史学の主流は、これを純粋な宗教一揆ではなく、年貢・飢饉・領主の苛政に対する経済的・政治的一揆として理解しています。信仰は動員の要素ではありましたが、唯一の原因ではありませんでした。',
        attribution: '神田千里『島原の乱』（中公新書、2005）',
        context: '日本の歴史学の主流視点から書かれ、純粋な宗教迫害の物語を避け、経済的・政治的要因を強調。',
      },
      editorial_note: {
        en: 'The Western narrative frames Shimabara as Christian martyrdom. The mainstream Japanese historiography frames it as a peasant uprising with Christian characteristics. Both are partially right. The rebels did include Christians (and ex-Christians forced to trample fumi-e); they also included non-Christian peasants starving under Matsukura\'s taxation. The rebellion\'s aftermath, however, was unambiguously religious: it ended tolerance and sealed 250 years of persecution.',
        jp: '西洋の語りは島原を殉教として描きます。日本歴史学の主流は、キリスト教的特徴を持つ農民一揆として描きます。両方とも部分的に正しいです。反乱者たちにはキリシタン（そして踏絵を踏むことを強いられた元キリシタン）が含まれていました。同時に松倉氏の苛政下で餓えていた非キリスト教農民も含まれていました。しかし反乱の結果は明白に宗教的でした：寛容を終わらせ、250年の迫害を封印したのです。',
      },
    },
    {
      id: 'meiji_freedom',
      event_name: { en: 'Meiji Religious Freedom (1873)', jp: '明治の信教自由（1873）' },
      year: 1873,
      en_source: {
        text: 'In February 1873, as the Iwakura Mission returned from its tour of the Western powers, Meiji Japan quietly removed the anti-Christian notice boards that had stood at every village crossroads for 260 years. It was not a declaration of freedom; it was the removal of a prohibition. Western observers celebrated it as Japan joining the family of "civilized" nations. American and British missionaries poured into the country. Within a decade, Yokohama, Tokyo, Kobe, and Osaka had thriving Protestant communities, and the foundations of Doshisha, Meiji Gakuin, and Aoyama Gakuin were laid.',
        attribution: 'Otis Cary, A History of Christianity in Japan (1909)',
        context: 'Written by an American Congregationalist missionary, presenting the 1873 act as Japan\'s long-delayed embrace of modernity and religious liberty under Western influence.',
      },
      jp_source: {
        text: '1873年2月、岩倉使節団が欧米諸国から帰国するにあたり、明治政府は260年間各村の辻に立っていたキリシタン禁制の高札を密かに撤去しました。これは信教の自由の宣言ではなく、禁制の撤去にすぎませんでした。政府の動機は宗教的というより外交的 — 不平等条約改正交渉のため、欧米から「文明国」と見られる必要がありました。1889年の明治憲法第28条は「安寧秩序ヲ妨ケス及臣民タルノ義務ニ背カサル限ニ於テ」という留保付きで信教の自由を認めましたが、これは神道国家の優位と両立するものでした。真の信教自由は1945年を待たねばなりませんでした。',
        attribution: '土肥昭夫『日本プロテスタント・キリスト教史』（新教出版社）',
        context: '日本人プロテスタント史家の視点。1873年を真の自由化ではなく、外交的必要に迫られた限定的措置として分析。',
      },
      editorial_note: {
        en: 'American missionary accounts celebrate 1873 as the "opening" of Japan to Christianity. Japanese Protestant historians emphasize that it was a bureaucratic removal, not a theological embrace — and that the Meiji Constitution\'s 1889 religious liberty clause was hedged by "state Shinto" obligations. Missionaries arrived; but they arrived into a nation that never legally separated religion and state until 1947. The gap between rhetoric and reality defined Meiji Christianity.',
        jp: 'アメリカ人宣教師の記述は1873年を日本のキリスト教への「開国」として祝います。日本人プロテスタント史家は、これが神学的受容ではなく官僚的撤去にすぎず、1889年明治憲法の信教自由条項も「国家神道」的義務によって制限されていたことを強調します。宣教師は到着しましたが、到着した先は1947年まで政教を法的に分離しなかった国でした。言説と現実の隔たりが明治キリスト教を定義しました。',
      },
    },
    {
      id: 'kyodan_1941',
      event_name: { en: 'Kyodan Forced Merger (1941)', jp: '日本基督教団の合同（1941）' },
      year: 1941,
      en_source: {
        text: 'In 1941, under pressure from the Religious Organizations Law, 33 Protestant denominations were forcibly merged into the United Church of Christ in Japan (Nihon Kirisuto Kyodan). Western scholarship has generally treated this as a tragedy of compliance — Japanese Protestants surrendering their distinctives to avoid persecution, singing the Kimigayo before worship, bowing toward the imperial palace, and contributing to the war effort. Some Western writers have been sharply critical of Kyodan leaders who later rationalized wartime collaboration; others have emphasized the impossible position of a church under a totalitarian state.',
        attribution: 'Mark Mullins, Christianity Made in Japan (1998)',
        context: 'Written by a leading Western scholar of Japanese Christianity, balancing criticism of wartime collaboration with awareness of state coercion.',
      },
      jp_source: {
        text: '1941年の宗教団体法下での日本基督教団の成立は、単なる国家的強制ではなく、日本プロテスタントの長年の「合同志向」とも絡み合っていました。戦時中の宮城遥拝、神社参拝、戦時協力は否定できない事実です。1967年、日本基督教団は鈴木正久議長のもとで「第二次大戦下における日本基督教団の責任についての告白」（戦責告白）を発表し、戦争への加担を正式に認めました。しかしこの告白は教団内部で論争を呼び、「教団紛争」の一因ともなりました。戦争責任の問いは、日本の教会にとって今も開かれた傷です。',
        attribution: '日本基督教団「戦責告白」（1967）および雨宮栄一の研究',
        context: '日本基督教団内部の視点から書かれ、1967年の戦責告白と、その受容をめぐる教団内部の論争を中心に据える。',
      },
      editorial_note: {
        en: 'Western accounts often stop at 1945 — the war ended, the collaboration was tragic, move on. Japanese Kyodan accounts center on what came next: the 1967 Confession of War Responsibility, the internal disputes it triggered, and the unresolved theological questions about church-state collaboration. For Japanese Protestants, the Kyodan merger is not a closed chapter of history but an ongoing wound. Any serious study must include the postwar reckoning, not just the wartime compromise.',
        jp: '西洋の記述はしばしば1945年で止まります — 戦争は終わった、協力は悲劇だった、先に進もう、と。日本基督教団の記述は、その後に起きたことを中心に据えます：1967年の戦責告白、それが引き起こした内部論争、教会と国家の協力についての未解決の神学的問題。日本のプロテスタントにとって、教団合同は閉じられた歴史の章ではなく、今も続く傷です。真摯な研究は戦時中の妥協だけでなく戦後の清算も含まねばなりません。',
      },
    },
    {
      id: 'nagasaki_bomb',
      event_name: { en: 'Nagasaki Atomic Bombing (1945)', jp: '長崎原爆（1945）' },
      year: 1945,
      en_source: {
        text: 'At 11:02 on August 9, 1945, the atomic bomb detonated over the Urakami district of Nagasaki — the heart of Japanese Catholicism, where descendants of the Hidden Christians had rebuilt their community after 1873. Urakami Cathedral, completed in 1925 and then the largest Catholic church in East Asia, was destroyed. Approximately 8,500 of Nagasaki\'s ~12,000 Catholics were killed. Western theological responses have tended to frame this as a tragedy and a warning — the irony of the most Christian city in Japan being chosen (partly by cloud cover) as ground zero.',
        attribution: 'Susan Southard, Nagasaki: Life After Nuclear War (2015)',
        context: 'Written by an American journalist, presenting the destruction of Urakami as tragic irony and using hibakusha testimony to critique the bombing.',
      },
      jp_source: {
        text: '1945年8月9日11時2分、原子爆弾は長崎浦上地区の上空で炸裂しました — 日本カトリックの心臓部、禁教が解かれた後に潜伏キリシタンの子孫たちが共同体を再建した場所です。浦上天主堂は全壊し、約12,000人の長崎カトリック信徒のうち約8,500人が亡くなりました。永井隆博士は『長崎の鐘』の中で、これを「燔祭（はんさい）」 — 世界戦争の終結のために神に捧げられた清い生贄 — として神学的に解釈しました。この解釈は長崎のカトリック共同体の深い悲しみに慰めを与えましたが、後の世代の神学者からは批判も受けました：被爆者を「生贄」と呼ぶことは、実行者の責任を曖昧にし、被害者の苦しみを美化するのではないか？長崎カトリックの原爆神学は今も内部で議論が続いています。',
        attribution: '永井隆『長崎の鐘』（1949）および高橋眞司『長崎にあって哲学する』',
        context: '日本のカトリック視点から書かれ、永井の「燔祭論」とその後の批判的再評価の両方を含める。',
      },
      editorial_note: {
        en: 'Western writing on Nagasaki Catholicism focuses on tragic irony — the most Christian city destroyed, the Urakami cathedral cross melted. Japanese Catholic theology wrestles with something harder: Dr. Nagai\'s "hansai" (burnt offering) interpretation, which comforted survivors but has been critiqued for sanctifying the atrocity and absolving American responsibility. Nagasaki is not just a tragedy to be lamented; it is a theological question still being asked inside Urakami Cathedral.',
        jp: '長崎カトリックについての西洋の著作は悲劇的皮肉に焦点を当てます — 最もキリスト教的な都市が破壊され、浦上天主堂の十字架が溶けた、と。日本カトリック神学はより困難な問いと格闘しています：永井博士の「燔祭」解釈は生存者を慰めましたが、後に、残虐行為を神聖化し、アメリカの責任を免除するものだと批判されました。長崎は単に嘆くべき悲劇ではありません。それは浦上天主堂の内部で今も問われ続けている神学的問いです。',
      },
    },
    {
      id: '26_martyrs',
      event_name: { en: '26 Martyrs of Nagasaki (1597)', jp: '日本二十六聖人殉教（1597）' },
      year: 1597,
      en_source: {
        text: 'On February 5, 1597, twenty-six Christians — six European Franciscans, three Japanese Jesuits, and seventeen Japanese lay Catholics including three boys aged 12-15 — were crucified on Nishizaka hill in Nagasaki on the orders of Toyotomi Hideyoshi. They had been marched from Kyoto, a journey of about a month. Western hagiographic tradition canonized them in 1862 as the first Japanese saints and presents them as heroic witnesses to faith. The 26 Martyrs monument by Funakoshi Yasutake (1962) and the Twenty-Six Martyrs Museum remain important pilgrimage sites for Catholics worldwide.',
        attribution: 'Catholic hagiographic tradition, canonization records 1862',
        context: 'Written from the official Roman Catholic perspective, framing the martyrs as exemplary witnesses whose death strengthened the universal church.',
      },
      jp_source: {
        text: '1597年2月5日、26人のキリシタン — フランシスコ会士6名、イエズス会の日本人3名、12歳から15歳の3人の少年を含む17人の日本人信徒 — が長崎西坂で磔にされました。この処刑の直接のきっかけは、スペインのサン・フェリペ号事件での航海長の発言 — 「スペインは宣教師を先遣し、その後に軍隊を送って領土を征服する」 — が秀吉に伝わったことでした。つまり殉教は純粋な信仰迫害ではなく、スペイン・ポルトガルの帝国主義的拡張への恐れという政治的背景を持っていました。日本人の歴史家は、殉教者の勇気を否定することなく、秀吉の決定が国防上の論理を持っていたことを示す傾向があります。これは信仰と国家の問いが最初に衝突した瞬間でした。',
        attribution: '五野井隆史『日本キリスト教史』（吉川弘文館）',
        context: '日本の歴史学的視点から書かれ、殉教を尊重しつつも秀吉の決定を国防・外交の文脈に置く。',
      },
      editorial_note: {
        en: 'Catholic hagiography presents 1597 as pure persecution — tyrannical ruler, innocent martyrs, heroic faith. Japanese historical scholarship adds context: the San Felipe incident and the fear that Iberian missions were the advance guard of colonial conquest (a fear that proved not entirely unfounded — the Philippines had been colonized this way). Both are true. The martyrs did die for faith; Hideyoshi also had reason to fear foreign expansion. Understanding Japanese resistance to Christianity requires holding both.',
        jp: 'カトリック聖人伝は1597年を純粋な迫害として提示します — 暴君的支配者、無垢な殉教者、英雄的信仰。日本の歴史学研究は文脈を加えます：サン・フェリペ号事件と、イベリア半島の宣教が植民地征服の先遣隊であるという恐れ（フィリピンはこの方法で植民地化されており、完全に根拠のない恐れではありませんでした）。どちらも真実です。殉教者は確かに信仰のために死にました。秀吉には外国の膨張を恐れる理由もありました。日本のキリスト教への抵抗を理解するには両方を保持する必要があります。',
      },
    },
    {
      id: 'endo_silence',
      event_name: { en: 'Endo Shusaku\'s Silence (1966)', jp: '遠藤周作『沈黙』（1966）' },
      year: 1966,
      en_source: {
        text: 'Endo Shusaku\'s 1966 novel Silence is, in much Western Catholic reception, a masterpiece of theological fiction — a profound meditation on the silence of God in the face of suffering, the problem of cultural translation, and the possibility that Christ would tell a persecuted priest to apostatize by stepping on the fumi-e. Graham Greene called it "one of the finest novels of our time." Martin Scorsese\'s 2016 film cemented this reading for English-speaking audiences. Western theologians, including Pope Francis in his preface to the film edition, have treated Silence as a permanent contribution to Catholic theology of suffering.',
        attribution: 'Graham Greene, New York Times; Pope Francis preface (2016)',
        context: 'Western Catholic reception emphasizes theological depth and universal resonance; the novel is treated as a gift from Japanese Catholicism to the global church.',
      },
      jp_source: {
        text: '日本のカトリック共同体における『沈黙』の受容は、西洋よりもはるかに複雑で議論的です。遠藤自身は一生カトリック信仰を保持していましたが、浦上の潜伏キリシタンの子孫を含む長崎のカトリック信徒の多くは、棄教を容認するかのように読める小説に違和感を持ち続けました。「あの本は祖父母の殉教を無意味なものにする」と感じる者もいます。批評家の加藤宗哉や亀井勝一郎は、『沈黙』は日本人キリスト者のアイデンティティより、西洋カトリック神学への回答として書かれた作品だと論じました。小説はノーベル文学賞候補の名作ですが、長崎のカトリック共同体では今なお「よそ者の文学」として距離を置かれることがあります。',
        attribution: '加藤宗哉、亀井勝一郎の批評および長崎カトリック共同体の口述',
        context: '日本のカトリック共同体、特に長崎の視点から書かれ、西洋受容とは異なる複雑な反応を示す。',
      },
      editorial_note: {
        en: 'Silence is the most internationally celebrated work of Japanese Christian literature. Outside Japan, it is a beloved theological masterpiece. Inside Nagasaki — the actual community whose ancestors are described — reception is more ambivalent. Some feel the novel treats apostasy with a tenderness that dishonors the unbroken witness of real martyrs. The same text reads differently depending on whether your family\'s story ends in the Urakami crypts or in an American seminary.',
        jp: '『沈黙』は日本のキリスト教文学で最も国際的に称賛されている作品です。日本国外では、愛される神学的傑作です。長崎 — 祖先たちが描写されている実際の共同体 — の内部では、受容はより曖昧です。小説が棄教を優しく扱い、実在の殉教者たちの途切れない証しを軽んじていると感じる人もいます。同じテキストが、家族の物語が浦上の地下聖堂で終わるのか、アメリカの神学校で終わるのかによって違って読まれるのです。',
      },
    },
    {
      id: 'tohoku_311',
      event_name: { en: '3/11 and the Tohoku Church Response (2011)', jp: '3.11と東北の教会の応答（2011）' },
      year: 2011,
      en_source: {
        text: 'The March 11, 2011 earthquake, tsunami, and Fukushima nuclear disaster became an unexpected turning point for Christianity in Japan\'s most resistant region. Before 3/11, Tohoku was known as the area of Japan most closed to the gospel. Within weeks, CRASH Japan mobilized over 2,700 volunteers from more than 80 nations. Christianity Today reported that communities which had previously rejected missionaries began welcoming them because they showed up with chainsaws, blankets, and no agenda. New church plants emerged in Ishinomaki, Kesennuma, and elsewhere. Western mission agencies celebrated 3/11 as a "breakthrough" — a demonstration that practical service could open hearts.',
        attribution: 'Christianity Today, Aftershocks (2021); CRASH Japan reports',
        context: 'Written by Western mission journalism, framing 3/11 as a strategic opening for Christianity.',
      },
      jp_source: {
        text: '2011年3月11日の東日本大震災は、日本のキリスト教にとって複雑な意味を持ちました。確かに被災地での教会と宣教団体の奉仕は地域社会から感謝されました。しかし10年後の2021年に日本の牧師たちを取材したキリスト新聞によれば、震災後に芽生えた関心の多くは長続きせず、新しい教会開拓の継続は予想以上に困難でした。日本人牧師たちは「支援の窓」と「信仰の窓」が同じではないと証言します。津波が破壊したのは建物だけではなく、被災者のコミュニティ全体でした。多くの若者は仕事を求めて仙台や東京に移り、残された高齢者だけが通い続ける教会も少なくありません。3.11は「福音の突破」ではなく、日本の教会の人口動態的限界を再確認させる出来事でもありました。',
        attribution: 'キリスト新聞2021年特集、東北地方宣教師会議報告',
        context: '日本人クリスチャン・ジャーナリズムの視点から書かれ、3.11後の長期的現実と人口動態的限界を強調。',
      },
      editorial_note: {
        en: 'Western missions journalism celebrated 3/11 as the breakthrough Tohoku had waited for. Japanese Christian journalism, a decade later, is more sober: the window of receptivity closed, the young people moved to Sendai and Tokyo for work, and the aging survivors in coastal towns remain. Both are true. The 3/11 church response was real, generous, and welcomed. It also ran into the same demographic wall as the rest of Japanese Christianity. The question is not whether 3/11 mattered — it did — but what long-term ministry looks like when the emergency is over.',
        jp: '西洋の宣教ジャーナリズムは、3.11を東北が待ち望んでいた突破口として祝いました。10年後の日本のクリスチャン・ジャーナリズムはより冷静です：受容性の窓は閉じ、若者は仕事を求めて仙台や東京に移り、沿岸の町には高齢の生存者だけが残りました。両方とも真実です。3.11後の教会の応答は本物で、寛大で、歓迎されました。同時に、日本のキリスト教全体と同じ人口動態の壁にぶつかりました。問いは3.11が重要だったかどうか — それは重要でした — ではなく、緊急事態が過ぎた後の長期的事工はどうあるべきか、です。',
      },
    },
  ];
}

export function renderComparator(): void {
  const app = document.getElementById('app')!;
  const lang = getLang();
  const pairs = getSourcePairs();

  app.innerHTML = `
    <div class="tool-page container">
      <div class="tool-header">
        <h1>${t('comparator.title')}</h1>
        <p>${t('comparator.subtitle')}</p>
      </div>
      <div class="form-group" style="max-width: 400px;">
        <select class="form-select" id="event-select" aria-label="${t('comparator.select')}">
          <option value="">${t('comparator.select')}</option>
          ${pairs.map(p => `<option value="${p.id}">${p.event_name[lang as 'en' | 'jp']}</option>`).join('')}
        </select>
      </div>
      <div id="comparator-content"></div>
    </div>
  `;

  // Default to first event
  const select = document.getElementById('event-select') as HTMLSelectElement;
  select.addEventListener('change', () => {
    const pair = pairs.find(p => p.id === select.value);
    if (pair) renderPair(pair);
  });

  // Show first pair by default
  if (pairs.length > 0) {
    select.value = pairs[0].id;
    renderPair(pairs[0]);
  }
}

function renderPair(pair: SourcePair): void {
  const lang = getLang();
  const content = document.getElementById('comparator-content')!;

  content.innerHTML = `
    <h2 style="margin-bottom: 24px;">${pair.event_name[lang as 'en' | 'jp']} <span style="font-family: var(--font-mono); color: var(--accent-vermillion); font-size: 1rem;">${pair.year}</span></h2>

    <div class="comparator-split">
      <div class="comparator-panel">
        <h3>${lang === 'en' ? 'English Source' : '英語資料'}</h3>
        <p class="source-text">${pair.en_source.text}</p>
        <p class="attribution">— ${pair.en_source.attribution}</p>
        <p style="font-size: 0.75rem; color: var(--text-tertiary); margin-top: 12px; font-style: italic;">${pair.en_source.context}</p>
        <button class="btn btn-ghost" style="margin-top: 12px; font-size: 0.8125rem; padding: 10px 16px; min-height: 44px;" data-translate="en">
          ${lang === 'en' ? '日本語に翻訳' : 'Translate to English'}
        </button>
        <div class="translation" id="en-translation" style="display: none;"></div>
      </div>
      <div class="comparator-panel">
        <h3>${lang === 'en' ? 'Japanese Source' : '日本語資料'}</h3>
        <p class="source-text">${pair.jp_source.text}</p>
        <p class="attribution">— ${pair.jp_source.attribution}</p>
        <p style="font-size: 0.75rem; color: var(--text-tertiary); margin-top: 12px; font-style: italic;">${pair.jp_source.context}</p>
        <button class="btn btn-ghost" style="margin-top: 12px; font-size: 0.8125rem; padding: 10px 16px; min-height: 44px;" data-translate="jp">
          ${lang === 'en' ? 'Translate to English' : '英語に翻訳'}
        </button>
        <div class="translation" id="jp-translation" style="display: none;"></div>
      </div>
    </div>

    <div style="margin-top: 32px;">
      <details>
        <summary style="cursor: pointer; color: var(--accent-vermillion); font-weight: 500; padding: 12px 0;">
          ${t('comparator.why')}
        </summary>
        <div style="padding: 16px 0; color: var(--text-secondary); line-height: 1.8;">
          ${pair.editorial_note[lang as 'en' | 'jp']}
        </div>
      </details>
    </div>
  `;

  // Translation buttons
  content.querySelectorAll('[data-translate]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const which = (btn as HTMLElement).dataset.translate;
      const translationDiv = document.getElementById(`${which}-translation`)!;

      if (translationDiv.style.display === 'none') {
        translationDiv.style.display = 'block';
        translationDiv.innerHTML = `<span class="spinner"></span> ${lang === 'en' ? 'Translating...' : '翻訳中...'}`;

        const sourceText = which === 'en' ? pair.en_source.text : pair.jp_source.text;
        const targetLang = which === 'en' ? (lang === 'en' ? 'Japanese' : 'English') : (lang === 'en' ? 'English' : 'Japanese');

        try {
          const response = await fetch('/api/ask', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              system: `You are a professional translator. Translate the following text to ${targetLang}. Maintain the scholarly tone and accuracy. Return only the translation.`,
              user: sourceText,
            }),
          });

          if (response.ok) {
            const data = await response.json();
            translationDiv.innerHTML = data.response || data.content?.[0]?.text || 'Translation unavailable';
          } else {
            translationDiv.innerHTML = lang === 'en' ? 'Translation requires AI service. Connect the Claude API proxy to enable this feature.' : '翻訳にはAIサービスが必要です。Claude APIプロキシを接続してください。';
          }
        } catch {
          translationDiv.innerHTML = lang === 'en' ? 'Translation requires AI service. Connect the Claude API proxy to enable this feature.' : '翻訳にはAIサービスが必要です。Claude APIプロキシを接続してください。';
        }
      } else {
        translationDiv.style.display = 'none';
      }
    });
  });
}
