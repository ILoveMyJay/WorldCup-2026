/* Cloudflare Pages Function — /api/player-bio
   Proxies and resolves Wikipedia player biographies.
   Returns JSON response, cached on CDN for 7 days. */

export async function onRequest(context) {
  const urlObj = new URL(context.request.url);
  const name = urlObj.searchParams.get('name');
  const langParam = urlObj.searchParams.get('lang') || 'zh';
  
  // Map standard languages to Wikipedia subdomains
  const wikiLang = langParam.startsWith('zh') ? 'zh' : 'en';

  if (!name) {
    return new Response(JSON.stringify({ error: 'Missing name parameter' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const wikiUrl = `https://${wikiLang}.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(name)}&prop=extracts&exintro=1&explaintext=1&redirects=1&format=json&origin=*`;
    
    const resp = await fetch(wikiUrl, {
      headers: {
        'User-Agent': 'WorldCup2026Portal/1.0 (ilovejayandjolin@gmail.com; contact@stillfantasy.us.ci)'
      }
    });

    if (!resp.ok) {
      return new Response(JSON.stringify({ error: 'Wikipedia API error' }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const data = await resp.json();
    const pages = data?.query?.pages;

    if (!pages) {
      return new Response(JSON.stringify({ bio: '' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const pageId = Object.keys(pages)[0];
    const extract = pages[pageId]?.extract || '';

    // Cache the biography for 7 days on CDN, and 1 day in browser
    return new Response(JSON.stringify({ bio: extract }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'public, max-age=86400, s-maxage=604800',
        'Access-Control-Allow-Origin': '*'
      }
    });

  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
