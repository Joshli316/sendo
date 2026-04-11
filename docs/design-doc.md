# Sendō 宣道 — Design Document

## Problem Statement
The Japan missions web landscape is fragmented into ~12-15 silos: practitioner magazines (JEMA), academic journals (JJRS/Nanzan), diaspora ministry sites (JCFN), heritage sites (UNESCO), Japanese-language Christian news (Christian Shimbun), and donor-facing advocacy (Joshua Project, Operation Japan). None integrate the field. None use AI. None are truly bilingual. None bridge historical depth with contemporary practice. Frontier Commons Innovation Lab can be the first to connect 475 years of Japanese Christian history to today's international student ministry through bilingual, AI-powered tools.

## The 1% Puzzle and the 80% Crisis

Japan is the inverse of China:
- **China:** Persecution + rapid Christian growth.
- **Japan:** Full religious freedom + persistent stagnation at ~1.5% Christian.

But the diaspora returnee attrition is identical: **80% of Japanese students who become Christians abroad drift from church within 2 years of returning home** (JCFN data). Same pattern as China. Different cause (cultural drift, not state pressure). Same opportunity for intervention.

Frontier Commons sits at the hinge — it can serve the diaspora pipeline directly with the right tools.

## Target Users

| User | Need | Primary Path |
|------|------|-------------|
| Missionaries in Japan | Cultural intelligence, history's lessons, returnee handoff | /research → reports, map, returnee tool |
| Japanese pastors | Heritage, theology in Japanese, returnee resources | /research, /tools → returnee, conversations |
| Japanese international students abroad | Returnee preparation, church-finder for Japan | /tools → returnee tool |
| Returnees in Japan | Church support, ongoing discipleship resources | /tools → returnee, training |
| Scholars | Bilingual bibliography, primary source search, gap tracker | /research → ask archive, gaps |
| Volunteers (campus, JCFN, Iowa church) | Training modules, cultural guides | /tools → training |
| Non-Christians | The Hidden Christian story, cultural impact | /heritage, /research → timeline |
| JEMA / OMF / TEAM staff | Shared infrastructure they don't have to build | /research, /tools |
| Funders / partners | FC's innovation capability on display | /about, all tools |

## User Journeys

**Returnee in Osaka:**
A friend at her American campus church shares the Sendō link on LINE. She fills out the Returnee Tool questionnaire in Japanese the week before her flight. Downloads her 90-day plan and church-finder PDF for offline access. Three months after return, she's attending a small church in Suita-shi that the tool recommended. The "Connect Me" form she submitted reached a JCFN partner pastor before she even landed.

**Pastor in Sapporo:**
She finds Sendō via Google searching "日本キリスト教史 デジタル." Toggles to Japanese — every page is fully native, no machine-translation feel. Searches "潜伏キリシタンの神学" in Ask the Archive. Gets a sourced answer pulling from Reports 01 and 07 plus quoted Endō Shūsaku. Clicks through to read the full historical-overview report. Discovers the AI conversation feature, asks Uchimura Kanzō a question about Mukyōkai theology, and saves the response to share with her elders.

**Volunteer in Iowa:**
Gets a link from a campus minister who works with international students. Goes to /tools/training. Completes Module 1 ("Why Japan resists Christianity") on her phone during lunch. The next week, a Japanese exchange student is about to graduate and return to Tokyo. The volunteer sends them to the Returnee Tool. The student gets a personalized Return Kit with church contacts in Setagaya.

**Scholar in Kyoto:**
Doctoral candidate in religious studies finds Sendō through the Research Gap Tracker (which surfaced via a Twitter share). Sees that "Pentecostal/Charismatic movements in 1990s Japan" is listed as understudied. Claims it via the "I'm working on this" form. Three months later, the gap entry shows her in-progress dissertation. Bookmarks the Bilingual Comparator for cross-checking sources.

## What This Product IS
- A research platform with interactive tools
- Bilingual by default (EN/JP toggle on every page)
- AI-powered (search, conversations, translation, retention modeling)
- Connected to FC's real ministry network and JCFN partnership opportunities
- An Innovation Lab showcase — proof that AI can serve missions
- The sister to XuanYan 宣研 (China), sharing architecture but not aesthetic

## What This Product IS NOT
- A donation funnel (no payment, no paywall)
- A blog or news site (Japan Harvest and Christian Shimbun do that)
- A social network or forum
- A replacement for JEMA, Nanzan, or JCFN — it's complementary, integrative
- A marketing site for Frontier Commons (it's a tool, not a brochure)
- A clone of XuanYan — Japan needs different stories, different aesthetic, different partnerships

## Key Design Rationale

**Dark mode default (sumi charcoal):** Signals technical sophistication and editorial weight. Differentiates from JEMA, JCFN, and most Japanese Christian sites (all light/white). Better for long reading sessions on the longform reports. The sumi (ink) base also evokes traditional Japanese ink painting and the Hidden Christian crypt-church atmosphere.

**Vermillion (朱 *shu*) accent:** Vermillion is the color of torii gates, Buddhist temple seals, and traditional lacquerware — unmistakably Japanese without being kitsch. Warmer and more dramatic than China's gold. References the historical Christian persecution (the color of blood and martyrdom) but also the persistent spark of faith.

**Sumi-e (墨絵) ink-wash backgrounds:** Subtle brushwork textures as section dividers, never decoration. Echoes the Japanese aesthetic of wabi-sabi (imperfection, transience). Sets Sendō visually apart from XuanYan's Chinese ink-wash (which uses different brushwork conventions).

**Noto Serif JP for headings:** Chinese serif fonts have different stroke characteristics than Japanese. Using Noto Serif JP signals respect for Japanese typographic tradition and reads correctly at display sizes.

**Three fonts max:** Noto Serif JP (display/JP), Inter (body), JetBrains Mono (data). No more. Consistency over variety.

**Sharp containers, soft interactions:** Cards and panels have sharp corners (editorial, like a book page). Buttons and toggles have slight 4px radius (approachable). Visual contrast between "content to read" and "things to interact with."

**Torii gate motif as visual punctuation:** A vertical vermillion line + horizontal cap appears as section markers, list bullets, and loading states. Distinctive, culturally grounded, instantly recognizable.

**Hand-painted enso (円相) circles** as bullet points and loading indicators — references Zen calligraphy tradition, adds organic warmth to a digital interface.

**Vertical Japanese text where appropriate:** Era markers, persona names, and select titles use vertical Japanese typography (writing-mode: vertical-rl). Most page content stays horizontal for readability.

## Differentiation from XuanYan 宣研

| Dimension | XuanYan (China) | Sendō (Japan) |
|-----------|-----------------|----------------|
| Color base | Dark navy (#0B1222) | Sumi charcoal (#0A0908) |
| Accent | Gold (#D4A44C) | Vermillion (#C8323C) |
| Texture | Chinese ink-wash (水墨) | Japanese sumi-e (墨絵) |
| Heading font | Noto Serif SC | Noto Serif JP |
| Visual motif | None specific | Torii gate, enso circle |
| Tone | Scholarly observatory | Editorial contemplative |
| Hidden Christian feature | N/A | Central — dedicated /heritage section |
| Diaspora partner | FC's existing networks | JCFN (Japanese Christian Fellowship Network) |
| Persecution framing | Active, contemporary | Historical (1597-1873), cultural memory |
| Map narrative | Watch Christianity spread despite hostility | Watch Christianity stall despite openness |
