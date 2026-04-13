import { t, getLang } from '../i18n';

interface Gap {
  id: number;
  category: string;
  title: { en: string; jp: string };
  description: { en: string; jp: string };
  status: 'not_started' | 'in_progress' | 'claimed' | 'published';
  ai_feasibility: 'yes' | 'partial' | 'no';
  claimed_by?: string;
}

function getGaps(): Gap[] {
  return [
    { id: 1, category: 'Periods', title: { en: 'Taisho Era Christianity (1912-1926)', jp: '大正期キリスト教（1912-1926）' }, description: { en: 'Sandwiched between the well-studied Meiji opening and Showa militarism, Taisho-era Christianity is barely examined. This is when conversion shifted from family units to individuals seeking existential meaning in urban life — a sociological shift with direct parallels to today.', jp: '研究が進んでいる明治期と昭和軍国主義の間に挟まれ、大正期のキリスト教はほとんど検証されていません。回心が家族単位から都市生活の中で実存的意味を求める個人へ移行した時期であり、今日と直接重なる社会学的変化です。' }, status: 'not_started', ai_feasibility: 'partial' },
    { id: 2, category: 'Periods', title: { en: '"Lost Decades" of Decline (1970s-2000s)', jp: '衰退の「失われた数十年」（1970年代-2000年代）' }, description: { en: 'Scholarship narrates postwar growth and then jumps to the current crisis. The three decades when Japan\'s churches slowly hollowed out — losing young people to secularization, failing to adapt to suburban sprawl — lack systematic analysis. Why did 8,000 baptisms per year produce zero net growth?', jp: '学術研究は戦後の成長から現在の危機に飛んでいます。日本の教会が徐々に空洞化していったこの30年 — 若者を世俗化に奪われ、郊外化に適応できなかった時期 — の体系的分析が欠けています。年間8,000の洗礼が正味成長ゼロを生んだのはなぜか？' }, status: 'not_started', ai_feasibility: 'yes' },
    { id: 3, category: 'Periods', title: { en: 'Post-3/11 Era (2011-present)', jp: '3.11以後の時代（2011年-現在）' }, description: { en: 'The triple disaster catalyzed new church plants in Tohoku. CRASH Japan mobilized 2,700+ volunteers from 80+ nations. Rigorous longitudinal studies tracking whether post-disaster openness persisted are absent. The 2016 Kumamoto and 2024 Noto earthquake responses also lack scholarly documentation.', jp: '東日本大震災は東北地方での新しい教会開拓を促しました。CRASH Japanは80カ国以上から2,700人以上のボランティアを動員しました。被災後の宗教的な開放性が持続したかどうかを追跡する厳密な縦断研究は存在しません。2016年熊本地震と2024年能登半島地震の対応記録も学術的にはほぼ空白です。' }, status: 'in_progress', ai_feasibility: 'partial' },
    { id: 4, category: 'Periods', title: { en: 'Hidden Christian Transition (1865-1920)', jp: '潜伏キリシタンの移行期（1865-1920）' }, description: { en: 'The dramatic 1865 "discovery" at Oura Church is well documented. But the subsequent decades — when Hidden Christian communities had to choose between rejoining the Catholic Church, maintaining their syncretistic practice, or abandoning Christianity — remain poorly mapped outside Nagasaki-focused local histories.', jp: '1865年の大浦天主堂での劇的な「信徒発見」はよく記録されています。しかしその後の数十年 — 潜伏キリシタンの共同体がカトリック教会への復帰、独自の混淆的実践の維持、キリスト教の完全な放棄のいずれかを選ばねばならなかった時期 — は、長崎の地域史を除けばほとんど地図化されていません。' }, status: 'not_started', ai_feasibility: 'partial' },
    { id: 5, category: 'Regions', title: { en: 'Rural Japan Church Decline', jp: '日本の農村教会の衰退' }, description: { en: 'Today many rural churches are closing or merging with no one documenting what is being lost. The relationship between rapid urbanization, rural depopulation, and church decline has not been systematically studied. The UCCJ\'s 25-year rural evangelism plan (1947-1972) is nearly forgotten.', jp: '今日、多くの農村教会が閉鎖または合併し、何が失われているかを記録する者がいません。急速な都市化、農村の過疎化、教会の衰退の関係は体系的に研究されていません。日本基督教団の25カ年農村伝道計画（1947-1972）もほぼ忘れられています。' }, status: 'not_started', ai_feasibility: 'yes' },
    { id: 6, category: 'Regions', title: { en: 'Hokkaido: Orthodox, Settler, Ainu', jp: '北海道：正教、開拓者、アイヌ' }, description: { en: 'Russian Orthodox Christianity arrived in Hakodate in 1861 via St. Nicholas Kasatkin. OMF concentrated early postwar work in Hokkaido. Yet Hokkaido\'s distinct settler-colonial history, its Ainu indigenous population, and its frontier religious landscape remain largely unconnected in scholarship.', jp: 'ロシア正教は1861年にニコライ・カサートキンを通じて函館に伝来しました。OMFは戦後初期に北海道に集中しました。しかし北海道独特の開拓植民地史、アイヌ先住民、そのフロンティア的宗教景観は、日本キリスト教研究の中でほとんどつながりを持って扱われていません。' }, status: 'not_started', ai_feasibility: 'partial' },
    { id: 7, category: 'Regions', title: { en: 'Okinawa: Military, Ryukyuan, Trauma', jp: '沖縄：軍、琉球、トラウマ' }, description: { en: 'Bernard Bettelheim was the first Protestant missionary to Okinawa (1846). Post-1945 U.S. military occupation created a unique religious environment. But Okinawan Christianity — shaped by wartime trauma, American military presence, and indigenous Ryukyuan spirituality — is almost completely absent from mainstream Japan missions scholarship.', jp: 'バーナード・ベッテルハイムは沖縄で最初のプロテスタント宣教師でした（1846年）。1945年後の米軍占領は独特の宗教環境を作り出しました。しかし戦争のトラウマ、米軍の存在、土着の琉球霊性によって形成された沖縄のキリスト教は、主流の日本宣教研究からほぼ完全に欠落しています。' }, status: 'not_started', ai_feasibility: 'no' },
    { id: 8, category: 'Regions', title: { en: 'Tohoku: Pre- and Post-3/11 Receptivity', jp: '東北：3.11以前と以後の受容性' }, description: { en: 'Before 3/11, Tohoku was known as Japan\'s most resistant region to Christianity. Post-disaster church planting changed the landscape. But pre-disaster Tohoku Christianity (why was it so resistant?) and the full arc of post-disaster transformation lack comprehensive study.', jp: '3.11以前、東北は日本で最もキリスト教に抵抗的な地域として知られていました。被災後の教会開拓が景観を変えました。しかし被災以前の東北キリスト教（なぜそれほど抵抗的だったのか）と、被災後の変容の全体像は、包括的な研究がありません。' }, status: 'not_started', ai_feasibility: 'partial' },
    { id: 9, category: 'Denominations', title: { en: 'Pentecostal/Charismatic Movements in Japan', jp: '日本のペンテコステ・カリスマ運動' }, description: { en: 'One scholar wrote: "the history and current status of the Pentecostal movement in Japan is almost entirely without scholarly research." The movement arrived in three waves (1907-1909, 1910-1918, 1919-1941). Japan Assemblies of God (1949) became its primary form. The charismatic renewal\'s muted impact in Japan is unexamined.', jp: 'ある研究者は「日本におけるペンテコステ運動の歴史と現状は学術研究がほぼ皆無である」と書きました。この運動は3つの波で到来しました（1907-1909、1910-1918、1919-1941）。日本アッセンブリーズ・オブ・ゴッド（1949年）が主要形態となりました。日本におけるカリスマ刷新の限定的影響は未解明です。' }, status: 'not_started', ai_feasibility: 'yes' },
    { id: 10, category: 'Denominations', title: { en: 'Korean Churches in Japan (Zainichi)', jp: '日本の韓国・朝鮮系教会（在日）' }, description: { en: 'The Korean Christian Church in Japan (founded 1909, ~58 churches) sits at the intersection of ethnic identity, colonial trauma, and minority religion. English-language scholarship is nearly nonexistent. Research on Korean megachurch influence on Japanese Christianity is absent.', jp: '在日大韓基督教会（1909年設立、約58教会）は、民族的アイデンティティ、植民地のトラウマ、少数者の宗教の交差点に位置します。英語での学術研究はほぼ存在しません。韓国の大型教会が日本のキリスト教に与えた影響についての研究も欠けています。' }, status: 'not_started', ai_feasibility: 'partial' },
    { id: 11, category: 'Denominations', title: { en: 'Catholic Renewal Post-Vatican II', jp: 'カトリック第二バチカン公会議後の刷新' }, description: { en: 'McClelland (2025) notes that Protestant mission dominates Japanese Christianity historiography while Catholic mission is "brushed aside." Post-Vatican II renewal, charismatic Catholic movements, and the demographic shift toward Filipino and Vietnamese Catholic immigrants all lack dedicated study.', jp: 'マクレランド（2025）は、プロテスタント宣教が日本キリスト教史学を支配する一方でカトリック宣教は「脇に追いやられている」と指摘します。第二バチカン公会議後の刷新、カリスマ的カトリック運動、フィリピン・ベトナム系カトリック移民への人口動態の移行は、いずれも専門研究がありません。' }, status: 'not_started', ai_feasibility: 'partial' },
    { id: 12, category: 'Denominations', title: { en: 'Mukyokai After Uchimura', jp: '内村以後の無教会' }, description: { en: 'Uchimura Kanzo\'s founding of Mukyokai (1901) is well documented. The movement peaked at ~35,000 members (1979). Its trajectory since then — aging membership, intellectual character, relevance to "de-churched" global trends — lacks updated scholarship.', jp: '内村鑑三による無教会の創立（1901年）はよく記録されています。この運動は1979年頃に約35,000人でピークを迎えました。それ以降の軌跡 — 高齢化、知的性格、世界的な「脱教会」傾向との関連 — についての最新の学術研究が不足しています。' }, status: 'not_started', ai_feasibility: 'yes' },
    { id: 13, category: 'Perspectives', title: { en: 'Japanese Theological Voices Untranslated', jp: '翻訳されていない日本人神学者の声' }, description: { en: 'A 2003 survey found 53% of Japanese theological books were translations INTO Japanese (from English/German). The flow is one-directional. With few exceptions (Uchimura, Kagawa, Koyama), Japanese theologians are absent from international discourse — not for lack of ideas, but because their work remains untranslated.', jp: '2003年の調査では、日本の神学書の53%が（英語・ドイツ語からの）日本語への翻訳でした。流れは一方向です。数少ない例外（内村、賀川、小山）を除き、日本人神学者は国際的な議論から姿を消しています — アイディアが欠けているからではなく、作品が翻訳されていないためです。' }, status: 'not_started', ai_feasibility: 'yes' },
    { id: 14, category: 'Perspectives', title: { en: 'Women in Japanese Christianity', jp: '日本キリスト教における女性' }, description: { en: 'Women have been "proportionally major contributors" to Japanese church life since 1873. Uemura Tamaki was ordained in 1934. Yet as one source notes, "Japan\'s churches, generally led by men, have been held together by a majority of women." Systematic studies of women\'s agency, leadership, and theological contributions are sparse.', jp: '女性は1873年以来、日本の教会生活への「割合として主要な貢献者」でした。植村環は1934年に按手礼を受けました。ある資料は「男性が主導してきた日本の教会は、女性の多数によって支えられてきた」と述べています。女性の主体性、リーダーシップ、神学的貢献についての体系的研究は乏しいのが現状です。' }, status: 'in_progress', ai_feasibility: 'partial' },
    { id: 15, category: 'Perspectives', title: { en: 'Hidden Christian Women\'s Roles', jp: '潜伏キリシタン女性の役割' }, description: { en: 'During the 250-year persecution, women often held the memory, rituals, and child catechesis of Hidden Christian communities — yet their specific roles have barely been studied. The mizukata (water-person baptizers) included women; oral transmission was often matrilineal.', jp: '250年の迫害期間中、女性はしばしば潜伏キリシタン共同体の記憶、儀礼、子供への教理伝承を担いました — しかしその具体的役割はほとんど研究されていません。水方（ばぷちずもを授ける役）には女性も含まれ、口伝はしばしば母系的でした。' }, status: 'not_started', ai_feasibility: 'partial' },
    { id: 16, category: 'Topics', title: { en: 'Christianity and Japanese Aesthetics', jp: 'キリスト教と日本の美学' }, description: { en: 'Wabi-sabi, mono no aware, yugen — Japan\'s aesthetic traditions have deep spiritual resonance but formal inculturation theology engaging these concepts is almost nonexistent. How might a theology of impermanence and imperfection inform Japanese Christian worship, architecture, and spirituality?', jp: '侘び寂び、物の哀れ、幽玄 — 日本の美学伝統は深い霊的共鳴を持ちますが、これらの概念と真剣に向き合う文化内開花（インカルチュレーション）神学はほぼ存在しません。無常と不完全さの神学は、日本のキリスト教礼拝、建築、霊性にどう影響しうるか？' }, status: 'not_started', ai_feasibility: 'yes' },
    { id: 17, category: 'Topics', title: { en: 'Christian Schools\' Long-term Spiritual Impact', jp: 'キリスト教学校の長期的信仰への影響' }, description: { en: 'Japan has 148 Catholic and 102 Protestant school networks, plus 29 Catholic universities. These schools educate hundreds of thousands who never join a church. Whether alumni retain any Christian identity has never been longitudinally tracked.', jp: '日本には148のカトリック、102のプロテスタント学校ネットワーク、さらに29のカトリック大学があります。これらは教会に加わることのない数十万人を教育しています。卒業生が何らかのキリスト教的アイデンティティを保持するかどうかは、縦断的に追跡されたことがありません。' }, status: 'not_started', ai_feasibility: 'yes' },
    { id: 18, category: 'Topics', title: { en: 'Christianity in Manga, Anime, Pop Culture', jp: '漫画・アニメ・ポップカルチャーの中のキリスト教' }, description: { en: 'Christian imagery saturates Japanese pop culture (Neon Genesis Evangelion, Death Note, Trigun, Blue Exorcist). How pop-culture Christianity shapes — or distorts — Japanese perceptions of actual Christianity is underexplored. Endo\'s Silence reception is also contested.', jp: 'キリスト教的イメージは日本のポップカルチャーを満たしています（新世紀エヴァンゲリオン、デスノート、トライガン、青の祓魔師）。ポップカルチャーのキリスト教が日本人の現実のキリスト教観をどのように形成または歪めるかは未解明です。遠藤の『沈黙』の受容も議論が続いています。' }, status: 'not_started', ai_feasibility: 'yes' },
    { id: 19, category: 'Contemporary', title: { en: 'Japan\'s Demographic Crisis and the Church', jp: '日本の人口動態危機と教会' }, description: { en: 'Japan\'s population has declined since 2008. Churches average 35 weekly attendees. 47% of pastors were over 70 in 2017. An estimated 50% of churches will lack a pastor by 2030. Bible colleges produce ~120 graduates/year, meeting 2-3% of need. This crisis lacks rigorous social-scientific analysis.', jp: '日本の人口は2008年から減少しています。教会の平均週間出席者は35人。2017年には牧師の47%が70歳以上でした。2030年までに教会の50%が牧師を欠くと推定されています。神学校は年間約120人の卒業生しか輩出せず、必要の2-3%しか満たせません。この危機には厳密な社会科学的分析が欠けています。' }, status: 'not_started', ai_feasibility: 'yes' },
    { id: 20, category: 'Contemporary', title: { en: 'Digital Ministry via LINE and YouTube', jp: 'LINEとYouTubeによるデジタル事工' }, description: { en: 'COVID-19 forced Japanese churches online. The post-pandemic trajectory — did LINE prayer groups help aging, rural congregations survive? Did YouTube reach new demographics? — lacks follow-up study. Japan\'s tech-savvy but aging church population makes this urgent.', jp: 'COVID-19は日本の教会をオンラインに追いやりました。パンデミック後の軌跡 — LINE祈祷グループは高齢化する地方の会衆の生存を助けたか、YouTubeは新しい人口層に届いたか — についての追跡研究が不足しています。技術に長けながらも高齢化する日本の教会にとって喫緊の課題です。' }, status: 'in_progress', ai_feasibility: 'yes' },
    { id: 21, category: 'Quantitative', title: { en: 'Japanese Returnee Attrition Longitudinal Data', jp: '日本人帰国者離脱率の縦断データ' }, description: { en: 'No study has tracked a cohort of Japanese converts over 10-20 years to understand retention and disaffiliation. JCFN and Equipper have anecdotal estimates (~70-80% attrition) but no rigorous longitudinal measurement. The single biggest evidence gap in returnee ministry.', jp: '日本人回心者の継続と離脱を理解するために10-20年にわたって追跡した研究はありません。JCFNやEquipperには逸話的な推定（約70-80%の離脱率）がありますが、厳密な縦断測定はありません。帰国者事工における最大の証拠ギャップです。' }, status: 'not_started', ai_feasibility: 'yes' },
    { id: 22, category: 'Post-1945', title: { en: 'Occupation-Era Theology (1945-1952)', jp: '占領期の神学（1945-1952）' }, description: { en: 'MacArthur\'s call for "1,000 missionaries" and the brief window of American cultural hegemony reshaped Japanese Christianity profoundly, yet most scholarship treats this as background rather than its own era of theological contestation. How did Occupation-era Christianity shape (and distort) Japanese ecclesiology?', jp: 'マッカーサーの「1,000人の宣教師」要請と、アメリカ文化覇権の短い窓は日本のキリスト教を根本的に再形成しました。しかし大半の研究はこれを独自の神学的論争の時代ではなく背景として扱っています。占領期のキリスト教はどのように日本の教会論を形作った（そして歪めた）のか？' }, status: 'not_started', ai_feasibility: 'partial' },
    { id: 23, category: 'Post-1945', title: { en: 'Kyodan Forced Merger Archives (1941)', jp: '日本基督教団強制合同文書（1941）' }, description: { en: 'The 1941 forced unification of 33 Protestant denominations into the Kyodan under wartime pressure remains theologically contested. Internal Kyodan documents, dissenter narratives, and the post-1945 process of accountability and apology have not been fully excavated.', jp: '1941年の戦時圧力下での33のプロテスタント教派の日本基督教団への強制合同は、神学的に議論が続いています。日本基督教団内部文書、反対者の証言、戦後の責任と謝罪のプロセスは完全には発掘されていません。' }, status: 'not_started', ai_feasibility: 'partial' },
    { id: 24, category: 'Contemporary', title: { en: 'Nagasaki Atomic Bombing Theology', jp: '長崎原爆の神学' }, description: { en: 'Dr. Nagai Takashi\'s "hansai" (burnt offering) theology of the Urakami bombing, Endo Shusaku\'s silent God, and the Catholic community\'s post-1945 theological response — especially the reception gap between Japanese and Western theologians — deserves comparative study.', jp: '長崎浦上被爆についての永井隆の「燔祭」神学、遠藤周作の沈黙の神、そして1945年以降のカトリック共同体の神学的応答 — 特に日本人と西洋の神学者の間の受容の差 — は比較研究に値します。' }, status: 'not_started', ai_feasibility: 'yes' },
    { id: 25, category: 'Archival', title: { en: 'Jesuit Japan Letters (1549-1639)', jp: 'イエズス会日本書簡（1549-1639）' }, description: { en: 'The Jesuit letters from Japan are among the richest early-modern missionary archives, but much remains untranslated into English or modern Japanese. AI-assisted transcription and translation could finally open these texts to wider scholarship. Frois\' Historia is only partially available.', jp: '日本発のイエズス会書簡は近世宣教師文書の中でも最も豊かなもののひとつですが、多くが英語や現代日本語に翻訳されていません。AI支援の翻刻と翻訳がこれらのテキストを広く学術界に開く可能性があります。フロイスの『日本史』も部分的にしか利用できません。' }, status: 'not_started', ai_feasibility: 'yes' },
    { id: 26, category: 'Archival', title: { en: 'Hidden Christian Oral Tradition', jp: '潜伏キリシタン口伝伝承' }, description: { en: 'The oraisho prayers and transmitted liturgies of Kakure Kirishitan communities in Goto, Ikitsuki, and Sotome are a fading oral archive. The last "bearers" are dying. Audio recording, transcription, and theological analysis is urgent work that has only begun in isolated projects.', jp: '五島、生月、外海のかくれキリシタン共同体のオラショと伝承された典礼は、消えゆく口伝文書です。最後の「継承者」たちが亡くなっています。音声記録、翻刻、神学的分析は急務ですが、散発的なプロジェクトでしか始まっていません。' }, status: 'in_progress', ai_feasibility: 'partial' },
    { id: 27, category: 'Cross-disciplinary', title: { en: 'Japan-Korea Comparative Christianity', jp: '日韓比較キリスト教研究' }, description: { en: 'Both Confucian East Asian societies, yet Korea reached ~30% Christian while Japan stayed below 1%. The single most important unanswered question in East Asian Christianity. Controlled comparison of colonial history, print culture, Bible translation, and church-state relations could yield major insights.', jp: 'どちらも儒教的東アジア社会でありながら、韓国は約30%のキリスト教徒に達し、日本は1%未満にとどまりました。東アジアキリスト教における最も重要な未解答の問いです。植民地史、印刷文化、聖書翻訳、政教関係の制御された比較は大きな洞察をもたらしうるでしょう。' }, status: 'not_started', ai_feasibility: 'partial' },
    { id: 28, category: 'Cross-disciplinary', title: { en: 'Endo Shusaku Reception: Japan vs. West', jp: '遠藤周作の受容：日本と西洋' }, description: { en: 'Endo\'s Silence is treated as a masterpiece of Catholic theology in the West but remains more ambiguously received among Japanese Catholics themselves. Scorsese\'s 2016 film reignited the gap. A systematic reception history comparing Japanese and Western readings is missing.', jp: '遠藤の『沈黙』は西洋ではカトリック神学の傑作として扱われますが、日本のカトリック信徒の間ではより曖昧に受容されています。スコセッシの2016年の映画はこのギャップを再燃させました。日本と西洋の読解を比較する体系的な受容史はまだ存在しません。' }, status: 'not_started', ai_feasibility: 'yes' },
    { id: 29, category: 'Perspectives', title: { en: 'Ainu Christianity', jp: 'アイヌのキリスト教' }, description: { en: 'John Batchelor\'s 60-year mission to the Ainu (1877-1940) produced converts, dictionaries, and ethnographic work — but was also entangled with assimilation policy. Ainu Christian voices and the faith\'s relationship to indigenous revival movements are almost entirely unstudied.', jp: 'ジョン・バチェラーの60年にわたるアイヌ宣教（1877-1940）は改宗者、辞書、民族誌的研究を生みましたが、同化政策とも絡み合っていました。アイヌのキリスト者の声と、その信仰と先住民復興運動との関係はほぼ完全に研究されていません。' }, status: 'not_started', ai_feasibility: 'no' },
    { id: 30, category: 'Perspectives', title: { en: 'Buraku Christianity and Liberation', jp: '部落とキリスト教・解放' }, description: { en: 'Japanese Buraku (historically outcast) communities have a distinct but poorly documented Christian history. Liberation theology\'s reception among Buraku activists, and the church\'s ambivalent response to anti-discrimination movements, deserves dedicated research.', jp: '日本の部落（歴史的被差別）共同体には独特ですが記録の乏しいキリスト教史があります。部落解放運動家への解放の神学の受容、差別反対運動に対する教会の曖昧な応答は、専門的研究に値します。' }, status: 'not_started', ai_feasibility: 'partial' },
  ];
}

const CATEGORIES = ['Periods', 'Regions', 'Perspectives', 'Denominations', 'Topics', 'Quantitative', 'Post-1945', 'Contemporary', 'Archival', 'Cross-disciplinary'];
const STATUS_LABELS: Record<string, { en: string; jp: string }> = {
  not_started: { en: 'Not Started', jp: '未着手' },
  in_progress: { en: 'In Progress', jp: '進行中' },
  claimed: { en: 'Claimed', jp: '担当決定' },
  published: { en: 'Published', jp: '公開済み' },
};
const AI_LABELS: Record<string, { en: string; jp: string }> = {
  yes: { en: 'AI Feasible', jp: 'AI可能' },
  partial: { en: 'Partially Feasible', jp: '部分的に可能' },
  no: { en: 'Not AI Feasible', jp: 'AI不可' },
};

export function renderGaps(): void {
  const app = document.getElementById('app')!;
  const lang = getLang();
  const gaps = getGaps();

  app.innerHTML = `
    <div class="tool-page container">
      <div class="tool-header">
        <h1>${t('gaps.title')}</h1>
        <p>${t('gaps.subtitle')}</p>
      </div>
      <div style="display: flex; gap: 12px; margin-bottom: 24px; flex-wrap: wrap;" id="gap-filters">
        <select class="form-select" style="width: auto; min-width: 150px;" id="cat-filter">
          <option value="all">${t('gaps.filter.category')}: All</option>
          ${CATEGORIES.map(c => `<option value="${c}">${c}</option>`).join('')}
        </select>
        <select class="form-select" style="width: auto; min-width: 150px;" id="status-filter">
          <option value="all">${t('gaps.filter.status')}: All</option>
          <option value="not_started">${STATUS_LABELS.not_started[lang as 'en' | 'jp']}</option>
          <option value="in_progress">${STATUS_LABELS.in_progress[lang as 'en' | 'jp']}</option>
        </select>
        <select class="form-select" style="width: auto; min-width: 150px;" id="ai-filter">
          <option value="all">${t('gaps.filter.ai')}: All</option>
          <option value="yes">${AI_LABELS.yes[lang as 'en' | 'jp']}</option>
          <option value="partial">${AI_LABELS.partial[lang as 'en' | 'jp']}</option>
          <option value="no">${AI_LABELS.no[lang as 'en' | 'jp']}</option>
        </select>
      </div>
      <div class="gap-grid" id="gap-grid"></div>
      <div id="gap-detail" style="margin-top: 32px;"></div>
    </div>
  `;

  renderGapGrid(gaps);

  document.querySelectorAll('#gap-filters select').forEach(sel => {
    sel.addEventListener('change', () => {
      const catFilter = (document.getElementById('cat-filter') as HTMLSelectElement).value;
      const statusFilter = (document.getElementById('status-filter') as HTMLSelectElement).value;
      const aiFilter = (document.getElementById('ai-filter') as HTMLSelectElement).value;

      let filtered = gaps;
      if (catFilter !== 'all') filtered = filtered.filter(g => g.category === catFilter);
      if (statusFilter !== 'all') filtered = filtered.filter(g => g.status === statusFilter);
      if (aiFilter !== 'all') filtered = filtered.filter(g => g.ai_feasibility === aiFilter);
      renderGapGrid(filtered);
    });
  });
}

function renderGapGrid(gaps: Gap[]): void {
  const lang = getLang();
  const grid = document.getElementById('gap-grid')!;

  grid.innerHTML = gaps.map(g => `
    <div class="gap-card" data-id="${g.id}">
      <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 8px;">
        <span class="tag">${g.category}</span>
        <span class="gap-status ${g.status}">${STATUS_LABELS[g.status][lang as 'en' | 'jp']}</span>
      </div>
      <h3 style="font-size: 1rem; margin-bottom: 8px;">${g.title[lang as 'en' | 'jp']}</h3>
      <p style="font-size: 0.8125rem; color: var(--text-secondary); line-height: 1.5;">${g.description[lang as 'en' | 'jp'].slice(0, 120)}...</p>
      <div style="margin-top: 12px;">
        <span class="tag" style="background: ${g.ai_feasibility === 'yes' ? 'rgba(74,222,128,0.1)' : g.ai_feasibility === 'partial' ? 'rgba(251,191,36,0.1)' : 'rgba(248,113,113,0.1)'}; color: ${g.ai_feasibility === 'yes' ? 'var(--success)' : g.ai_feasibility === 'partial' ? 'var(--warning)' : 'var(--error)'};">
          ${AI_LABELS[g.ai_feasibility][lang as 'en' | 'jp']}
        </span>
      </div>
    </div>
  `).join('');

  grid.querySelectorAll('.gap-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = parseInt((card as HTMLElement).dataset.id || '0');
      const gap = getGaps().find(g => g.id === id);
      if (gap) showGapDetail(gap);
    });
  });
}

function showGapDetail(gap: Gap): void {
  const lang = getLang();
  const detail = document.getElementById('gap-detail')!;

  detail.innerHTML = `
    <div class="card" style="border-color: var(--accent-vermillion);">
      <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 16px;">
        <h2 style="font-size: 1.25rem;">${gap.title[lang as 'en' | 'jp']}</h2>
        <span class="gap-status ${gap.status}">${STATUS_LABELS[gap.status][lang as 'en' | 'jp']}</span>
      </div>
      <p style="color: var(--text-secondary); line-height: 1.7; margin-bottom: 16px;">${gap.description[lang as 'en' | 'jp']}</p>
      <div style="display: flex; gap: 8px; margin-bottom: 24px;">
        <span class="tag">${gap.category}</span>
        <span class="tag" style="background: ${gap.ai_feasibility === 'yes' ? 'rgba(74,222,128,0.1)' : gap.ai_feasibility === 'partial' ? 'rgba(251,191,36,0.1)' : 'rgba(248,113,113,0.1)'}; color: ${gap.ai_feasibility === 'yes' ? 'var(--success)' : gap.ai_feasibility === 'partial' ? 'var(--warning)' : 'var(--error)'};">
          ${AI_LABELS[gap.ai_feasibility][lang as 'en' | 'jp']}
        </span>
      </div>
      <div style="padding: 16px; background: var(--bg-tertiary); border-radius: 2px;">
        <h4 style="font-size: 0.875rem; margin-bottom: 12px;">${t('gaps.claim')}</h4>
        <div class="form-group">
          <input class="form-input" placeholder="${lang === 'en' ? 'Your name' : 'お名前'}">
        </div>
        <div class="form-group">
          <input class="form-input" placeholder="${lang === 'en' ? 'Institution' : '所属機関'}">
        </div>
        <div class="form-group">
          <input class="form-input" type="email" placeholder="${lang === 'en' ? 'Email' : 'メールアドレス'}">
        </div>
        <div class="form-group">
          <textarea class="chat-input" rows="2" placeholder="${lang === 'en' ? 'Brief description of your work' : 'ご研究の概要'}"></textarea>
        </div>
        <button class="btn btn-primary" id="gap-claim-btn">${lang === 'en' ? 'Submit' : '送信'}</button>
      </div>
    </div>
  `;

  detail.scrollIntoView({ behavior: 'smooth' });

  document.getElementById('gap-claim-btn')?.addEventListener('click', () => {
    const btn = document.getElementById('gap-claim-btn')!;
    btn.textContent = lang === 'en' ? 'Submitted!' : '送信しました！';
    btn.style.background = 'var(--success)';
    btn.style.borderColor = 'var(--success)';
    (btn as HTMLButtonElement).disabled = true;
  });
}
