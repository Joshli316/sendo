/**
 * Sendō API Health Check — Cloudflare Pages Function
 * GET /api/health → returns service status
 *
 * Used by uptime monitors and CI smoke tests to verify the function runtime
 * is deployed and the AI proxy is configured. Does not call Anthropic.
 */

interface Env {
  ANTHROPIC_API_KEY?: string;
  CF_PAGES_COMMIT_SHA?: string;
}

const CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export const onRequestOptions: PagesFunction<Env> = async () => {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
};

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { env } = context;
  const body = {
    ok: true,
    service: "sendo",
    ai_proxy_configured: Boolean(env.ANTHROPIC_API_KEY),
    commit: env.CF_PAGES_COMMIT_SHA?.slice(0, 7) ?? "local",
    ts: new Date().toISOString(),
  };
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { "Content-Type": "application/json", ...CORS_HEADERS },
  });
};
