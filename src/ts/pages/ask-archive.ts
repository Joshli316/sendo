import { t, getLang } from '../i18n';
import { loadAllReports, type Report } from '../data-loader';
import { formatResponse, renderChatShell, wireChat, addUserMessage, showLoading, hideLoading, addAssistantMessage } from '../chat-ui';

interface ArchiveChunk {
  reportId: string;
  reportTitle: { en: string; jp: string };
  section: string;
  text: string;
  tags: string[];
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  citations?: { reportId: string; section: string; title: string }[];
}

let archiveIndex: ArchiveChunk[] = [];
const chatHistory: ChatMessage[] = [];

const STARTER_QUESTIONS: Record<'en' | 'jp', string[]> = {
  en: [
    'What happened to the Hidden Christians?',
    'Why is Japan only 1% Christian?',
    'Who were the 26 Martyrs of Nagasaki?',
    'How did Meiji religious freedom change Japan?',
  ],
  jp: [
    '隠れキリシタンに何が起こったのか？',
    'なぜ日本のキリスト教徒は1％なのか？',
    '日本二十六聖人とは誰か？',
    '明治の信教の自由はどう日本を変えたか？',
  ],
};

async function loadArchiveIndex(): Promise<void> {
  if (archiveIndex.length > 0) return;
  const reports = await loadAllReports();
  for (const report of reports) {
    const chunks = chunkContent(report);
    archiveIndex.push(...chunks);
  }
}

function chunkContent(report: Report): ArchiveChunk[] {
  const chunks: ArchiveChunk[] = [];
  const content = report.content.en || '';
  const sections = content.split(/^## /gm).filter(Boolean);

  for (const section of sections) {
    const lines = section.split('\n');
    const sectionTitle = lines[0]?.trim() || '';
    const text = lines.slice(1).join('\n').trim();

    const words = text.split(/\s+/);
    for (let i = 0; i < words.length; i += 200) {
      const chunk = words.slice(i, i + 200).join(' ');
      if (chunk.trim()) {
        chunks.push({
          reportId: report.id,
          reportTitle: report.title,
          section: sectionTitle,
          text: chunk,
          tags: report.tags,
        });
      }
    }
  }
  return chunks;
}

function searchArchive(query: string, topK: number = 5): ArchiveChunk[] {
  const q = query.toLowerCase();
  const terms = q.split(/\s+/).filter(t => t.length > 2);

  const scored = archiveIndex.map(chunk => {
    let score = 0;
    const text = chunk.text.toLowerCase();
    const title = chunk.section.toLowerCase();

    for (const term of terms) {
      const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const textMatches = (text.match(new RegExp(escaped, 'g')) || []).length;
      const titleMatches = (title.match(new RegExp(escaped, 'g')) || []).length;
      score += textMatches + titleMatches * 3;
    }

    if (text.includes(q)) score += 10;

    return { chunk, score };
  });

  return scored
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .map(s => s.chunk);
}

async function queryArchive(question: string): Promise<ChatMessage> {
  await loadArchiveIndex();
  const lang = getLang();

  const relevantChunks = searchArchive(question);

  if (relevantChunks.length === 0) {
    return {
      role: 'assistant',
      content: lang === 'en'
        ? 'I couldn\'t find relevant information in the archive for this question. Try rephrasing or asking about a specific topic in Japan missions history — Xavier, the Hidden Christians, Meiji Christianity, Kagawa Toyohiko, Endō Shūsaku, or today\'s 1% church.'
        : 'このご質問に関連する情報がアーカイブ内に見つかりませんでした。表現を変えるか、日本宣教史の具体的なトピック（ザビエル、隠れキリシタン、明治キリスト教、賀川豊彦、遠藤周作、現代の1％教会など）についてお尋ねください。',
    };
  }

  const context = relevantChunks.map((c, i) =>
    `[Source ${i + 1}: Report ${c.reportId} - ${c.section}]\n${c.text}`
  ).join('\n\n');

  const systemPrompt = `You are a scholarly research assistant for Sendō (宣道), a Japan missions research platform covering 475 years of Christianity in Japan. Answer questions based ONLY on the provided source material from our research reports. Always cite your sources using [Report XX - Section Name] format. If the sources don't contain enough information to fully answer, say so honestly. Respond in ${lang === 'jp' ? 'Japanese (日本語)' : 'English'}.`;

  const userPrompt = `Context from research archive:\n\n${context}\n\nQuestion: ${question}`;

  try {
    const response = await callClaudeAPI(systemPrompt, userPrompt);
    const citations = relevantChunks.map(c => ({
      reportId: c.reportId,
      section: c.section,
      title: c.reportTitle[lang],
    }));

    return { role: 'assistant', content: response, citations };
  } catch {
    const fallback = generateFallbackAnswer(relevantChunks, lang);
    return {
      role: 'assistant',
      content: fallback,
      citations: relevantChunks.map(c => ({
        reportId: c.reportId,
        section: c.section,
        title: c.reportTitle[lang],
      })),
    };
  }
}

async function callClaudeAPI(system: string, user: string): Promise<string> {
  const response = await fetch('/api/ask', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ system, user }),
  });

  if (!response.ok) throw new Error('API call failed');
  const data = await response.json();
  return data.response || data.content?.[0]?.text || '';
}

function generateFallbackAnswer(chunks: ArchiveChunk[], lang: string): string {
  const prefix = lang === 'en'
    ? 'Based on the Sendō archive, here is what I found:\n\n'
    : 'Sendōアーカイブから、以下の情報が見つかりました：\n\n';

  const body = chunks.map(c =>
    `**[Report ${c.reportId} — ${c.section}]**\n${c.text.slice(0, 300)}${c.text.length > 300 ? '...' : ''}`
  ).join('\n\n');

  const suffix = lang === 'en'
    ? '\n\n*Note: AI-generated synthesis is unavailable. Showing relevant archive excerpts. Click citations to read the full reports.*'
    : '\n\n*注: AIによる統合分析は利用できません。関連する抜粋を表示しています。出典をクリックして全文をお読みください。*';

  return prefix + body + suffix;
}

export function renderAskArchive(): void {
  const app = document.getElementById('app')!;
  const lang = getLang();

  chatHistory.length = 0;

  app.innerHTML = renderChatShell({
    title: t('ask.title'),
    subtitle: t('ask.subtitle'),
    placeholder: t('ask.placeholder'),
    sendLabel: t('ask.send'),
    starterChips: STARTER_QUESTIONS[lang as 'en' | 'jp'] || STARTER_QUESTIONS.en,
  });

  const sendBtn = document.getElementById('chat-send') as HTMLButtonElement;

  wireChat(async (text) => {
    addUserMessage(text);
    chatHistory.push({ role: 'user', content: text });
    showLoading(t('ask.thinking'));
    sendBtn.disabled = true;

    const response = await queryArchive(text);
    chatHistory.push(response);

    hideLoading();
    const citationsHtml = response.citations?.map(c =>
      `<a class="citation" href="#/research/${c.reportId}">[Report ${c.reportId}]</a>`
    ).join(' ') || '';

    const responseHtml = formatResponse(response.content, true) +
      (citationsHtml ? `<div style="margin-top: 12px; padding-top: 8px; border-top: 1px solid var(--border);">${citationsHtml}</div>` : '');
    addAssistantMessage(responseHtml);

    sendBtn.disabled = false;
    (document.getElementById('chat-input') as HTMLTextAreaElement)?.focus();
  });

  loadArchiveIndex();
}
