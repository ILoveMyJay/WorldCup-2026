/* Cloudflare Pages Function — /api/news
   Proxies requests to GNews.io in English and translates dynamically if lang=zh */

async function translateText(text, env, targetLang = 'zh-CN') {
  if (!text) return '';

  // 1. Try Cloudflare Workers AI (Built-in, GPU accelerated, 100% stable inside Cloudflare)
  if (env && env.AI) {
    try {
      const response = await env.AI.run('@cf/meta/m2m100-1.2b', {
        text: text,
        source_lang: 'english',
        target_lang: 'chinese'
      });
      if (response && response.translated_text) {
        return response.translated_text;
      }
    } catch (aiError) {
      console.warn('Cloudflare Workers AI translation failed. Trying Google Translate fallback...', aiError);
    }
  }

  // 2. Fallback to Google Translate API
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
    const resp = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    if (resp.ok) {
      const data = await resp.json();
      if (data && data[0]) {
        return data[0].map(x => x[0]).join('');
      }
    }
  } catch (e) {
    console.warn('Google Translation fallback failed:', e);
  }

  return text;
}

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

  // We always fetch English news from GNews as it has the richest and freshest dataset
  const query = encodeURIComponent('"World Cup 2026" OR "FIFA World Cup"');
  let lastError = null;

  for (const apiKey of apiKeys) {
    try {
      const url = `https://gnews.io/api/v4/search?q=${query}&lang=en&max=10&apikey=${apiKey}`;
      const resp = await fetch(url);

      if (resp.ok) {
        const data = await resp.json();
        const rawArticles = (data.articles || []);

        let articles = rawArticles.map(art => ({
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

        // Dynamically translate to Chinese if requested
        if (isZh) {
          articles = await Promise.all(
            articles.map(async (art) => {
              const [tTitle, tDesc] = await Promise.all([
                translateText(art.title, context.env, 'zh-CN'),
                translateText(art.description, context.env, 'zh-CN')
              ]);
              return {
                ...art,
                title: tTitle,
                description: tDesc,
                source: {
                  name: `小红书体育 · 编译`,
                  url: art.source.url
                }
              };
            })
          );
        }

        return new Response(JSON.stringify({ articles }), {
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'public, max-age=600',  // CDN cache 10 min
          },
        });
      }

      const errText = await resp.text();
      lastError = `API response status ${resp.status}: ${errText}`;
      console.warn(`GNews API Key [${apiKey.slice(0, 5)}...] failed. Error: ${lastError}`);

    } catch (e) {
      lastError = e.message;
      console.warn(`Fetch failed with API Key [${apiKey.slice(0, 5)}...]. Error: ${lastError}`);
    }
  }

  return Response.json(
    { error: 'All configured GNews API keys exhausted or failed', detail: lastError },
    { status: 502 }
  );
}
