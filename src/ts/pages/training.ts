import { t, getLang } from '../i18n';
import { getRouteParam, navigate } from '../main';

interface Module {
  id: string;
  title: { en: string; jp: string };
  description: { en: string; jp: string };
  sections: { title: { en: string; jp: string }; content: { en: string; jp: string } }[];
  quiz: { question: { en: string; jp: string }; options: { en: string; jp: string }[]; correct: number }[];
  reflection: { en: string; jp: string };
}

function getModules(): Module[] {
  return [
    {
      id: '1',
      title: { en: 'Why Japan Resists Christianity', jp: 'なぜ日本はキリスト教を受け入れないのか' },
      description: { en: 'Understanding the 1% ceiling: cultural, historical, and social factors', jp: '1％の壁を理解する：文化的・歴史的・社会的要因' },
      sections: [
        {
          title: { en: 'The 1% Question', jp: '1％の問い' },
          content: {
            en: 'Despite 475 years of missionary history and full religious freedom since 1873, Christians have never exceeded roughly 1-2% of Japan\'s population. This is not because the Gospel has never been heard — Japan has been one of the most thoroughly evangelized nations on earth. Understanding why requires looking beyond simple resistance to a complex interplay of cultural, social, and historical factors.',
            jp: '475年の宣教史と1873年以来の完全な信教の自由にもかかわらず、キリスト教徒は日本の人口の約1〜2％を超えたことがありません。これは福音が聞かれなかったからではありません。日本は地上で最も徹底的に伝道された国の一つです。その理由を理解するには、単純な抵抗を超えて、文化的・社会的・歴史的要因の複雑な相互作用を見る必要があります。'
          }
        },
        {
          title: { en: 'The Social Cost of Conversion', jp: '改宗の社会的代価' },
          content: {
            en: 'In Japan, religious identity is embedded in community obligations: temple funerals (仏式葬儀), Shinto shrine visits at New Year (初詣), Obon ancestor festivals. Converting to Christianity means opting out of these communal rituals — effectively declaring social independence in a culture built on interdependence. Guido Verbeck observed in 1872: "When the hour of conversion comes, the cost is social annihilation." This remains true today.',
            jp: '日本では、宗教的アイデンティティは共同体の義務に埋め込まれています。仏式葬儀、正月の初詣、お盆の先祖供養。キリスト教に改宗することは、これらの共同体の儀礼から離脱することを意味します。相互依存の文化において、事実上の社会的独立宣言です。フルベッキは1872年に「改宗の時が来ると、代価は社会的な抹殺だ」と観察しました。これは今日も変わりません。'
          }
        },
        {
          title: { en: 'The Historical Shadow', jp: '歴史の影' },
          content: {
            en: 'Japan\'s 250-year ban on Christianity (1614-1873) and the brutal persecution of the kirishitan era left a deep cultural scar. Christianity is still unconsciously associated with foreign intrusion, disloyalty to Japan, and dangerous fanaticism (the Shimabara Rebellion). Endō Shūsaku\'s metaphor of Japan as a "swamp" that distorts foreign religions captures the popular intuition. Overcoming this requires patience, not persuasion.',
            jp: '250年のキリスト教禁止令（1614-1873）とキリシタン時代の残酷な迫害は、深い文化的な傷を残しました。キリスト教は今でも無意識のうちに、外国の侵入、日本への不忠、危険な狂信（島原の乱）と結びつけられています。遠藤周作の日本を「泥沼」と表現した比喩は、一般的な直感を捉えています。これを乗り越えるには説得ではなく忍耐が必要です。'
          }
        },
      ],
      quiz: [
        {
          question: { en: 'What percentage of Japan\'s population is Christian?', jp: '日本の人口の何％がキリスト教徒ですか？' },
          options: [
            { en: 'About 5-8%', jp: '約5〜8％' },
            { en: 'About 1-2%', jp: '約1〜2％' },
            { en: 'About 10-15%', jp: '約10〜15％' },
          ],
          correct: 1,
        },
        {
          question: { en: 'What is the main social cost of conversion in Japan?', jp: '日本における改宗の主な社会的代価は何ですか？' },
          options: [
            { en: 'Government surveillance', jp: '政府の監視' },
            { en: 'Opting out of communal rituals (funerals, shrine visits, Obon)', jp: '共同体の儀礼（葬儀、初詣、お盆）からの離脱' },
            { en: 'Losing voting rights', jp: '投票権の喪失' },
          ],
          correct: 1,
        },
        {
          question: { en: 'How long was Christianity banned in Japan?', jp: 'キリスト教は日本でどのくらい禁止されていましたか？' },
          options: [
            { en: 'About 50 years', jp: '約50年' },
            { en: 'About 250 years', jp: '約250年' },
            { en: 'About 400 years', jp: '約400年' },
          ],
          correct: 1,
        },
      ],
      reflection: { en: 'What communal rituals or social expectations in your own life would you find hardest to leave behind?', jp: 'あなた自身の生活の中で、どの共同体の儀礼や社会的期待を手放すのが最も難しいですか？' },
    },
    {
      id: '2',
      title: { en: 'Cultural Intelligence for Japanese Students', jp: '日本人学生のための文化的知性' },
      description: { en: 'Values, communication patterns, and what not to do', jp: '価値観、コミュニケーションパターン、してはいけないこと' },
      sections: [
        {
          title: { en: 'Core Values', jp: '核心的な価値観' },
          content: {
            en: 'Japanese culture is shaped by several deep values that differ from Western Christian assumptions:\n\n• **和 (wa)** — harmony above individual expression\n• **恥 (haji)** — shame-awareness over guilt-consciousness\n• **内/外 (uchi/soto)** — sharp in-group/out-group boundaries\n• **空気を読む (kuuki wo yomu)** — "reading the air" (unspoken communication)\n• **遠慮 (enryo)** — restraint and deference to others\n\nWestern evangelism often assumes guilt-based theology, direct confrontation, and instant decision. None of these work in a Japanese shame-oriented, indirect, process-based culture.',
            jp: '日本文化はいくつかの深い価値観によって形作られており、西洋のキリスト教的前提とは異なります：\n\n• **和** — 個人の表現より調和\n• **恥** — 罪意識より恥の意識\n• **内/外** — 明確な内集団/外集団の境界\n• **空気を読む** — 言葉にしないコミュニケーション\n• **遠慮** — 抑制と他者への配慮\n\n西洋の伝道はしばしば罪に基づく神学、直接的対決、即座の決断を前提とします。日本の恥志向、間接的、プロセス重視の文化にはどれも通用しません。'
          }
        },
        {
          title: { en: 'What Not to Do', jp: 'してはいけないこと' },
          content: {
            en: '1. **Don\'t ask "Do you believe in God?" on first meeting.** Faith conversations develop over months of trust.\n2. **Don\'t push for public prayer.** Praying out loud is deeply uncomfortable for most Japanese.\n3. **Don\'t criticize Shinto/Buddhism.** Most Japanese don\'t take them "seriously" as doctrine — but criticizing them feels like criticizing Japan.\n4. **Don\'t rush to "close the deal."** Japanese conversion is typically a years-long journey.\n5. **Don\'t assume silence means agreement.** It usually means discomfort.',
            jp: '1. **初対面で「神を信じますか？」と聞かない。** 信仰の会話は数ヶ月の信頼構築の後に生まれます。\n2. **声に出して祈ることを強要しない。** ほとんどの日本人にとって非常に不快です。\n3. **神道や仏教を批判しない。** 教義として「本気で」受け止めていなくても、批判は日本批判と感じられます。\n4. **「決断を迫る」急がない。** 日本人の改宗は典型的に数年がかりの旅です。\n5. **沈黙を同意と解釈しない。** 通常は不快感を示しています。'
          }
        },
      ],
      quiz: [
        {
          question: { en: 'What does "kuuki wo yomu" (空気を読む) mean?', jp: '「空気を読む」とは何を意味しますか？' },
          options: [
            { en: 'Reading books in the air', jp: '空中で本を読むこと' },
            { en: 'Reading unspoken social cues', jp: '暗黙の社会的手がかりを読み取ること' },
            { en: 'A breathing technique', jp: '呼吸法' },
          ],
          correct: 1,
        },
        {
          question: { en: 'Japanese culture is primarily:', jp: '日本文化は主に：' },
          options: [
            { en: 'Guilt-based', jp: '罪に基づく' },
            { en: 'Shame-based', jp: '恥に基づく' },
            { en: 'Fear-based', jp: '恐れに基づく' },
          ],
          correct: 1,
        },
        {
          question: { en: 'When a Japanese student is silent during a faith conversation, it usually means:', jp: '信仰の会話中に日本人学生が沈黙している場合、通常それは：' },
          options: [
            { en: 'Agreement', jp: '同意' },
            { en: 'Boredom', jp: '退屈' },
            { en: 'Discomfort or processing', jp: '不快感や消化中' },
          ],
          correct: 2,
        },
      ],
      reflection: { en: 'Think of a time when you misread someone\'s silence. What might have been happening beneath the surface?', jp: '誰かの沈黙を誤解した経験を思い出してください。表面下で何が起こっていた可能性がありますか？' },
    },
    {
      id: '3',
      title: { en: 'The Hidden Christian Story', jp: '隠れキリシタンの物語' },
      description: { en: '250 years of underground faith, fumie, and the Ōura miracle', jp: '250年の地下の信仰、踏絵、そして大浦の奇跡' },
      sections: [
        {
          title: { en: 'The Ban', jp: '禁教令' },
          content: {
            en: 'In 1614, the Tokugawa shogunate banned Christianity. By 1639, Japan was sealed. Tens of thousands of believers went underground — especially in the Nagasaki region (Sotome, Ikitsuki, Amakusa, Gotō). They preserved their faith for 250 years without a single priest, through oral catechism, Maria Kannon statues, secret baptisms by village elders (mizukata), and prayer formulas (orasho) derived from Portuguese and Latin that gradually became unintelligible but were recited faithfully.',
            jp: '1614年、徳川幕府はキリスト教を禁止しました。1639年までに日本は鎖国されました。数万人の信者が地下に潜伏しました ― 特に長崎地方（外海、生月、天草、五島）。彼らは250年間、一人の司祭もなく信仰を守りました。口伝の教理、マリア観音像、村の長老（水方）によるひそかな洗礼、ポルトガル語・ラテン語に由来し次第に意味不明になりながらも忠実に唱えられ続けた祈り（オラショ）によって。'
          }
        },
        {
          title: { en: 'The Discovery at Ōura', jp: '大浦の信徒発見' },
          content: {
            en: 'On 17 March 1865, Father Bernard Petitjean was praying alone in the newly built Ōura Church in Nagasaki. Fifteen peasants from Urakami entered. One woman whispered: "All of us here are of the same heart as you. Where is the statue of Santa Maria?" After 250 years of silence, the Hidden Christians had found a priest. Pope Pius IX called it "a miracle." It is the only known instance in Church history of a community surviving for centuries without clergy.',
            jp: '1865年3月17日、ベルナール・プチジャン神父は長崎の大浦天主堂で一人祈っていました。浦上から15人の農民が入ってきました。一人の女性がささやきました。「ワレラノムネ、アナタノムネトオナジ。サンタ・マリアノゴゾウハドコ？」250年の沈黙の後、隠れキリシタンは司祭を見つけました。教皇ピウス9世はこれを「奇跡」と呼びました。聖職者なしに何世紀も生き延びたキリスト教共同体は教会史上唯一の事例です。'
          }
        },
      ],
      quiz: [
        {
          question: { en: 'How long was Christianity practiced underground in Japan?', jp: 'キリスト教は日本で何年間地下で信仰されていましたか？' },
          options: [
            { en: 'About 50 years', jp: '約50年' },
            { en: 'About 250 years', jp: '約250年' },
            { en: 'About 500 years', jp: '約500年' },
          ],
          correct: 1,
        },
        {
          question: { en: 'What was a fumie?', jp: '踏絵とは何ですか？' },
          options: [
            { en: 'A secret prayer book', jp: '秘密の祈祷書' },
            { en: 'A bronze image Christians were forced to step on to prove they were not believers', jp: 'キリシタンでないことを証明するために踏まされた銅板の聖像' },
            { en: 'A type of church building', jp: '教会建築の一種' },
          ],
          correct: 1,
        },
        {
          question: { en: 'What happened at Ōura Church in 1865?', jp: '1865年の大浦天主堂で何が起こりましたか？' },
          options: [
            { en: 'The church was destroyed by fire', jp: '教会が火災で破壊された' },
            { en: 'Hidden Christians revealed themselves to a French priest', jp: '隠れキリシタンがフランス人神父に自らを明かした' },
            { en: 'The first Bible was printed in Japanese', jp: '最初の日本語聖書が印刷された' },
          ],
          correct: 1,
        },
      ],
      reflection: { en: 'What would you be willing to pass down to your children in secret if your faith were banned? What would be lost within a generation?', jp: 'もし信仰が禁じられたら、何をひそかに子どもに伝えますか？一世代のうちに何が失われるでしょうか？' },
    },
    {
      id: '4',
      title: { en: 'Returnee Dynamics', jp: '帰国者のダイナミクス' },
      description: { en: 'The 80% attrition problem and what drives it', jp: '80％の離脱問題とその原動力' },
      sections: [
        {
          title: { en: 'The 80% Problem', jp: '80％の問題' },
          content: {
            en: 'JCFN research shows that approximately 80% of Japanese students who become Christians while studying abroad drift from active church participation within 2 years of returning to Japan. This mirrors the China pattern (ChinaSource data) but the causes are different. In Japan, there is no government persecution — the barriers are cultural reabsorption, social pressure, and the absence of a church community that matches the returnee\'s bilingual, international experience.',
            jp: 'JCFNの調査によると、留学中にクリスチャンになった日本人学生の約80％が、帰国後2年以内に積極的な教会参加から離れています。これは中国のパターン（ChinaSourceデータ）と同じですが、原因は異なります。日本では政府の迫害はありません ― 障壁は文化的再吸収、社会的圧力、そして帰国者のバイリンガルで国際的な経験に合う教会コミュニティの不在です。'
          }
        },
        {
          title: { en: 'The Critical Window', jp: '重要な窓' },
          content: {
            en: 'The first 90 days after return are decisive. If a returnee does not find a church community within 3 months, the probability of long-term disengagement rises sharply. Key factors that predict retention: (1) a pre-identified church connection before departure, (2) a Japanese-speaking mentor or discipler, (3) continued contact with the overseas faith community, (4) depth of discipleship before return, (5) family openness to Christianity.',
            jp: '帰国後の最初の90日間が決定的です。帰国者が3ヶ月以内に教会コミュニティを見つけられなければ、長期的な離脱の確率は急上昇します。継続を予測する主な要因：(1) 出発前に特定された教会のつながり、(2) 日本語を話すメンターまたは弟子訓練者、(3) 海外の信仰コミュニティとの継続的な連絡、(4) 帰国前の弟子訓練の深さ、(5) 家族のキリスト教への開放性。'
          }
        },
      ],
      quiz: [
        {
          question: { en: 'What percentage of Japanese student Christians drift from church after returning?', jp: '帰国後に教会から離れる日本人学生クリスチャンの割合は？' },
          options: [
            { en: 'About 30%', jp: '約30％' },
            { en: 'About 50%', jp: '約50％' },
            { en: 'About 80%', jp: '約80％' },
          ],
          correct: 2,
        },
        {
          question: { en: 'What is the critical window after return?', jp: '帰国後の重要な窓はいつまでですか？' },
          options: [
            { en: 'First 2 weeks', jp: '最初の2週間' },
            { en: 'First 90 days', jp: '最初の90日間' },
            { en: 'First year', jp: '最初の1年' },
          ],
          correct: 1,
        },
        {
          question: { en: 'The main cause of returnee attrition in Japan is:', jp: '日本における帰国者の離脱の主な原因は：' },
          options: [
            { en: 'Government persecution', jp: '政府の迫害' },
            { en: 'Cultural reabsorption and lack of matching church community', jp: '文化的再吸収と合う教会コミュニティの不在' },
            { en: 'Loss of Bible access', jp: '聖書へのアクセスの喪失' },
          ],
          correct: 1,
        },
      ],
      reflection: { en: 'If you were returning to Japan after 4 years abroad as a new Christian, what would you need most in those first 90 days?', jp: '新しいクリスチャンとして4年間の留学から日本に帰国するとしたら、最初の90日間で最も必要なものは何ですか？' },
    },
    {
      id: '5',
      title: { en: 'Working with JCFN', jp: 'JCFNと共に働く' },
      description: { en: 'The diaspora pipeline and how to partner', jp: 'ディアスポラのパイプラインと連携方法' },
      sections: [
        {
          title: { en: 'What Is JCFN?', jp: 'JCFNとは' },
          content: {
            en: 'The Japanese Christian Fellowship Network (JCFN) is the primary organization coordinating returnee support across Japan and the Japanese diaspora. Founded in 1991, JCFN connects Japanese students who come to faith abroad with church contacts in Japan before they return. They run the Equipper Conference annually and maintain a network of returnee-friendly churches across Japan.',
            jp: 'JCFN（日本人クリスチャン・フェローシップ・ネットワーク）は、日本全国と日本人ディアスポラにわたる帰国者支援を調整する主要な組織です。1991年に設立され、海外で信仰を持った日本人学生と帰国前の日本の教会連絡先をつなぎます。毎年イクイッパー会議を開催し、日本全国の帰国者に優しい教会のネットワークを維持しています。'
          }
        },
        {
          title: { en: 'How You Can Partner', jp: '連携の方法' },
          content: {
            en: '1. **Before departure**: Connect the student with JCFN staff. They will match them with a church in their home prefecture.\n2. **During transition**: The student fills out the Sendō Returnee Tool, which generates a 90-day plan and church recommendations.\n3. **After return**: JCFN partner pastors follow up. Your role shifts to ongoing prayer and occasional LINE contact.\n4. **Key rule**: Do NOT try to "hand off" a person like a package. Introduce them to JCFN *alongside* continued relationship.',
            jp: '1. **出発前**：学生をJCFNスタッフに紹介してください。出身都道府県の教会とマッチングしてもらえます。\n2. **移行期間中**：学生がSendō帰国準備ツールに記入し、90日計画と教会の推薦を受け取ります。\n3. **帰国後**：JCFNパートナー牧師がフォローアップします。あなたの役割は継続的な祈りと時折のLINE連絡に移ります。\n4. **重要なルール**：人を荷物のように「引き渡そう」としないでください。継続的な関係と*並行して*JCFNに紹介してください。'
          }
        },
      ],
      quiz: [
        {
          question: { en: 'When was JCFN founded?', jp: 'JCFNはいつ設立されましたか？' },
          options: [
            { en: '1975', jp: '1975年' },
            { en: '1991', jp: '1991年' },
            { en: '2005', jp: '2005年' },
          ],
          correct: 1,
        },
        {
          question: { en: 'What should you do before a Japanese student returns home?', jp: '日本人学生が帰国する前に何をすべきですか？' },
          options: [
            { en: 'Give them a Bible in English', jp: '英語の聖書を渡す' },
            { en: 'Connect them with JCFN staff for church matching', jp: 'JCFNスタッフに紹介して教会のマッチングを依頼する' },
            { en: 'Tell them to find a church on Google', jp: 'Googleで教会を探すよう伝える' },
          ],
          correct: 1,
        },
        {
          question: { en: 'After a student returns to Japan, your primary role becomes:', jp: '学生が帰国した後、あなたの主な役割は：' },
          options: [
            { en: 'Managing their spiritual life remotely', jp: '遠隔で霊的生活を管理する' },
            { en: 'Ongoing prayer and occasional LINE contact', jp: '継続的な祈りと時折のLINE連絡' },
            { en: 'Nothing — JCFN handles everything', jp: '何もなし ― JCFNがすべて対応する' },
          ],
          correct: 1,
        },
      ],
      reflection: { en: 'Think of a Japanese student you know or have met. What one practical step could you take this week to connect them with JCFN or a returnee-friendly church?', jp: 'あなたが知っている日本人学生を思い浮かべてください。今週、その学生をJCFNまたは帰国者に優しい教会につなぐために、一つの具体的なステップを踏めますか？' },
    },
    {
      id: '6',
      title: { en: 'Practical Conversation Guide', jp: '実践的な会話ガイド' },
      description: { en: 'How to talk about faith with Japanese friends — naturally', jp: '日本人の友人と信仰について自然に話す方法' },
      sections: [
        {
          title: { en: 'Start with Questions, Not Answers', jp: '答えではなく質問から始める' },
          content: {
            en: 'Japanese culture values the question more than the answer. Ask about their experience, not their beliefs:\n\n• "What gives you strength when things are hard?"\n• "Have you ever been to a shrine or temple? What was it like?"\n• "What do you miss most about Japan?"\n• "What surprised you most about American (or Western) culture?"\n\nListen more than you speak. In Japanese communication, the listener holds the relational power. Proving you can listen earns the right to eventually be heard.',
            jp: '日本文化は答えよりも問いを大切にします。信条ではなく経験について尋ねてください：\n\n• 「辛い時、何が力を与えてくれますか？」\n• 「神社やお寺に行ったことはありますか？どうでしたか？」\n• 「日本で一番恋しいものは何ですか？」\n• 「アメリカ（西洋）の文化で一番驚いたことは何ですか？」\n\n話すよりも聴いてください。日本のコミュニケーションでは、聴く人が関係の力を持ちます。聴く力を示すことが、やがて聴いてもらえる権利を得ることにつながります。'
          }
        },
        {
          title: { en: 'Sharing Your Story', jp: 'あなたの物語を分かち合う' },
          content: {
            en: 'When the time comes to share your faith, lead with vulnerability, not certainty. Japanese people are suspicious of people who are "too sure" — it feels arrogant in a culture that values modesty. Instead:\n\n• "I used to struggle with loneliness. My faith community helped me."\n• "I don\'t have all the answers, but this is what gives me hope."\n• "I was invited to church by a friend. I was skeptical at first too."\n\nThe word "invited" is powerful in Japanese relational culture. Being invited is honorable. Being confronted is shameful.',
            jp: '信仰を分かち合う時が来たら、確信ではなく弱さから始めてください。日本人は「確信しすぎている」人に警戒します ― 謙虚さを重んじる文化では傲慢に感じられます。代わりに：\n\n• 「昔、孤独に苦しんでいました。信仰のコミュニティが助けてくれました。」\n• 「すべての答えを持っているわけではありませんが、これが私に希望を与えてくれるものです。」\n• 「友人に教会に誘われました。最初は私も懐疑的でした。」\n\n「誘われた」という言葉は日本の関係文化で力を持ちます。誘われることは光栄なこと。対決されることは恥ずかしいことです。'
          }
        },
      ],
      quiz: [
        {
          question: { en: 'When sharing faith with a Japanese friend, you should lead with:', jp: '日本人の友人と信仰を分かち合う時、何から始めるべきですか？' },
          options: [
            { en: 'Theological arguments', jp: '神学的な議論' },
            { en: 'Your personal story and vulnerability', jp: 'あなた個人の物語と弱さ' },
            { en: 'Statistics about Christianity worldwide', jp: '世界のキリスト教の統計' },
          ],
          correct: 1,
        },
        {
          question: { en: 'In Japanese relational culture, being _____ is honorable, being _____ is shameful.', jp: '日本の関係文化では、_____されることは光栄で、_____されることは恥ずかしいことです。' },
          options: [
            { en: 'invited / confronted', jp: '誘われること / 対決されること' },
            { en: 'taught / ignored', jp: '教えられること / 無視されること' },
            { en: 'praised / challenged', jp: '称賛されること / 挑戦されること' },
          ],
          correct: 0,
        },
        {
          question: { en: 'The most important communication skill in Japanese culture is:', jp: '日本文化で最も重要なコミュニケーション能力は：' },
          options: [
            { en: 'Persuasive speaking', jp: '説得力のある話し方' },
            { en: 'Attentive listening', jp: '注意深く聴くこと' },
            { en: 'Debating skills', jp: 'ディベートの技術' },
          ],
          correct: 1,
        },
      ],
      reflection: { en: 'Write down 3 questions you could ask a Japanese friend this week that invite them to share their experience, not defend a belief.', jp: '今週、日本人の友人に「信条を弁護させる」のではなく「経験を分かち合ってもらう」ための質問を3つ書いてみてください。' },
    },
  ];
}

function getProgress(): Record<string, boolean> {
  const raw = localStorage.getItem('sendo-training');
  return raw ? JSON.parse(raw) : {};
}

function saveProgress(moduleId: string, completed: boolean): void {
  const progress = getProgress();
  progress[moduleId] = completed;
  localStorage.setItem('sendo-training', JSON.stringify(progress));
}

export function renderTraining(): void {
  const app = document.getElementById('app')!;
  const lang = getLang();
  const modules = getModules();
  const progress = getProgress();
  const completedCount = Object.values(progress).filter(Boolean).length;

  app.innerHTML = `
    <div class="tool-page container">
      <div class="tool-header">
        <h1 data-i18n="training.title">${t('training.title')}</h1>
        <p data-i18n="training.subtitle">${t('training.subtitle')}</p>
      </div>
      <div style="margin-bottom: 32px;">
        <div style="display: flex; align-items: baseline; gap: 8px; margin-bottom: 8px;">
          <span style="font-family: var(--font-mono); color: var(--accent-gold); font-size: 1.5rem;">${completedCount}</span>
          <span style="color: var(--text-secondary); font-size: 0.875rem;">/ 6 ${t('training.progress')}</span>
        </div>
        <div style="height: 4px; background: var(--border); border-radius: 2px; overflow: hidden;">
          <div style="height: 100%; width: ${(completedCount / 6) * 100}%; background: var(--accent-gold); border-radius: 2px; transition: width 0.3s;"></div>
        </div>
      </div>
      <div class="module-grid">
        ${modules.map(m => `
          <a class="module-card" href="#/tools/training/${m.id}" style="text-decoration:none; color:inherit; display:block;">
            <div style="display: flex; justify-content: space-between;">
              <span class="number">${m.id.padStart(2, '0')}</span>
              ${progress[m.id] ? '<span class="check">✓</span>' : ''}
            </div>
            <h3>${m.title[lang]}</h3>
            <p style="font-size: 0.8125rem; color: var(--text-secondary);">${m.description[lang]}</p>
            <div class="progress">
              <div class="progress-fill" style="width: ${progress[m.id] ? '100' : '0'}%"></div>
            </div>
          </a>
        `).join('')}
      </div>
    </div>
  `;
}

export function renderTrainingModule(): void {
  const id = getRouteParam('id');
  if (!id) { navigate('/tools/training'); return; }

  const modules = getModules();
  const module = modules.find(m => m.id === id);
  if (!module) { navigate('/tools/training'); return; }

  const app = document.getElementById('app')!;
  const lang = getLang();

  app.innerHTML = `
    <div class="tool-page container" style="max-width: 800px; margin: 0 auto;">
      <p><a href="#/tools/training" style="font-size: 0.8125rem; color: var(--text-tertiary);">← ${t('common.back')}</a></p>
      <h1 style="margin-bottom: 8px;">${module.title[lang]}</h1>
      <p style="color: var(--text-secondary); margin-bottom: 48px;">${module.description[lang]}</p>

      ${module.sections.map((s, i) => `
        <div style="margin-bottom: 32px;">
          <h2 style="font-size: 1.25rem; cursor: pointer; display: flex; align-items: center; gap: 8px;" onclick="this.nextElementSibling.classList.toggle('hidden')">
            <span style="color: var(--accent-gold); font-family: var(--font-mono);">${i + 1}.</span>
            ${s.title[lang]}
            <span style="color: var(--text-tertiary); font-size: 0.875rem;">▼</span>
          </h2>
          <div style="padding: 16px 0 16px 24px; border-left: 2px solid var(--border);">
            <p style="font-size: 0.9375rem; line-height: 1.8; color: var(--text-secondary); white-space: pre-line;">${s.content[lang]}</p>
          </div>
        </div>
      `).join('')}

      <div style="margin-top: 48px; padding-top: 32px; border-top: 1px solid var(--border);">
        <h2 style="font-size: 1.25rem; margin-bottom: 24px;">${t('training.quiz')}</h2>
        <div id="quiz-container">
          ${module.quiz.map((q, qi) => `
            <div class="form-group" data-quiz="${qi}">
              <p style="font-weight: 500; margin-bottom: 12px;">${qi + 1}. ${q.question[lang]}</p>
              ${q.options.map((opt, oi) => `
                <label class="checkbox-item" style="margin-bottom: 8px;">
                  <input type="radio" name="q${qi}" value="${oi}">
                  ${opt[lang]}
                </label>
              `).join('')}
            </div>
          `).join('')}
          <button class="btn btn-primary" id="check-quiz">${lang === 'en' ? 'Check Answers' : '答え合わせ'}</button>
          <div id="quiz-result" style="margin-top: 16px;"></div>
        </div>
      </div>

      <div style="margin-top: 48px; padding-top: 32px; border-top: 1px solid var(--border);">
        <h2 style="font-size: 1.25rem; margin-bottom: 16px;">${t('training.reflection')}</h2>
        <p style="font-size: 0.9375rem; color: var(--text-secondary); margin-bottom: 16px;">${module.reflection[lang]}</p>
        <textarea class="chat-input" rows="4" placeholder="${lang === 'en' ? 'Write your reflection...' : '振り返りを書いてください...'}" id="reflection-text">${localStorage.getItem(`sendo-reflection-${id}`) || ''}</textarea>
        <button class="btn btn-ghost" style="margin-top: 8px;" id="save-reflection">${lang === 'en' ? 'Save' : '保存'}</button>
      </div>
    </div>
  `;

  // Quiz checking
  document.getElementById('check-quiz')?.addEventListener('click', () => {
    let correct = 0;
    module.quiz.forEach((q, qi) => {
      const selected = document.querySelector(`input[name="q${qi}"]:checked`) as HTMLInputElement;
      if (selected && parseInt(selected.value) === q.correct) correct++;
    });
    const passed = correct >= 2;
    const resultDiv = document.getElementById('quiz-result')!;
    resultDiv.innerHTML = `
      <p style="color: ${passed ? 'var(--success)' : 'var(--error)'}; font-weight: 600;">
        ${correct}/${module.quiz.length} ${lang === 'en' ? 'correct' : '正解'}
        ${passed ? (lang === 'en' ? ' — Module complete!' : ' — モジュール完了！') : (lang === 'en' ? ' — Try again (need 2/3)' : ' — もう一度（2/3必要）')}
      </p>
    `;
    if (passed) saveProgress(id!, true);
  });

  // Reflection saving
  document.getElementById('save-reflection')?.addEventListener('click', () => {
    const text = (document.getElementById('reflection-text') as HTMLTextAreaElement).value;
    localStorage.setItem(`sendo-reflection-${id}`, text);
  });
}
