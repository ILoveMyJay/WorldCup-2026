/* Cloudflare Pages Function — /api/news
   Proxies requests to GNews.io with server-side API key */

export async function onRequest(context) {
  // Support both single key (GNEWS_API_KEY) and multiple comma-separated keys (GNEWS_API_KEYS)
  const keysString = context.env.GNEWS_API_KEYS || context.env.GNEWS_API_KEY;

  if (!keysString) {
    return Response.json(
      { error: 'GNEWS_API_KEY not configured' },
      { status: 500 }
    );
  }

  const apiKeys = keysString.split(',').map(k => k.trim()).filter(Boolean);
  
  const urlObj = new URL(context.request.url);
  const langParam = urlObj.searchParams.get('lang') || 'en';
  const isZh = langParam.startsWith('zh');
  const lang = isZh ? 'zh' : 'en';

  const queryText = isZh
    ? '"2026年世界杯" OR "2026世界杯" OR "美加墨世界杯" OR "FIFA世界杯"'
    : '"World Cup 2026" OR "FIFA World Cup"';

  const query = encodeURIComponent(queryText);
  let lastError = null;

  // Try each API key in sequence until one succeeds
  for (const apiKey of apiKeys) {
    try {
      const url = `https://gnews.io/api/v4/search?q=${query}&lang=${lang}&max=10&apikey=${apiKey}`;
      const resp = await fetch(url);

      if (resp.ok) {
        const data = await resp.json();
        
        // Normalize article structure for frontend consistency
        const articles = (data.articles || []).map(art => ({
          title: art.title,
          description: art.description,
          content: art.content,
          url: art.url,
          image: art.image || 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=600&auto=format&fit=crop',
          publishedAt: art.publishedAt,
          source: {
            name: art.source.name,
            url: art.source.url
          }
        }));

        return new Response(JSON.stringify({ articles }), {
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'public, max-age=600',  // CDN cache 10 min
          },
        });
      }

      // If we got a non-200 response (like 403 quota exceeded or 429 rate limit), log and try next key
      const errText = await resp.text();
      lastError = `API response status ${resp.status}: ${errText}`;
      console.warn(`GNews API Key [${apiKey.slice(0, 5)}...] failed. Error: ${lastError}`);

    } catch (e) {
      lastError = e.message;
      console.warn(`Fetch failed with API Key [${apiKey.slice(0, 5)}...]. Error: ${lastError}`);
    }
  }

  // If all keys fail, return the last error details
  return Response.json(
    { error: 'All configured GNews API keys exhausted or failed', detail: lastError },
    { status: 502 }
  );
}
