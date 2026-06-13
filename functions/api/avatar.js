/* Cloudflare Pages Function — /api/avatar
   Resolves and proxies Wikipedia player thumbnails directly.
   Prevents hotlinking/referer blocks by fetching on server-side
   and returning the image bytes. Cached on CDN for 7 days. */

export async function onRequest(context) {
  const urlObj = new URL(context.request.url);
  const name = urlObj.searchParams.get('name');

  if (!name) {
    return new Response('Missing name parameter', { status: 400 });
  }

  const userAgent = 'WorldCup2026Portal/1.0 (ilovejayandjolin@gmail.com; contact@stillfantasy.us.ci)';

  // Normalize ambiguous names to their specific Wikipedia titles
  let lookupName = name.trim();
  const nameMap = {
    'Rodri': 'Rodrigo Hernández Cascante',
    'Matt Turner': 'Matt Turner (soccer)',
    'Luis Chávez': 'Luis Chávez (footballer)',
    'Luis Chavez': 'Luis Chávez (footballer)',
    'Neymar': 'Neymar',
    'Neymar Jr': 'Neymar',
    'Cristiano Ronaldo': 'Cristiano Ronaldo',
    'Ladislav Krejčí': 'Ladislav Krejčí (footballer, born 1999)',
    'In-beom Hwang': 'Hwang In-beom',
    'Hyun-Gyu Oh': 'Oh Hyeon-gyu',
    'Mauricio': 'Maurício (footballer)'
  };

  if (nameMap[lookupName]) {
    lookupName = nameMap[lookupName];
  }

  try {
    // 1. Query Wikipedia pageimages (adding redirects=1 to resolve diacritics/accent-mark variations)
    const wikiUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(lookupName)}&prop=pageimages&format=json&pithumbsize=150&redirects=1&origin=*`;
    const resp = await fetch(wikiUrl, {
      headers: { 'User-Agent': userAgent }
    });
    
    if (!resp.ok) {
      return new Response('Wikipedia API error', { status: 502 });
    }

    const data = await resp.json();
    const pages = data?.query?.pages;
    
    if (!pages) {
      return new Response('Player not found', { status: 404 });
    }

    const pageId = Object.keys(pages)[0];
    const thumbnail = pages[pageId]?.thumbnail;
    const imageUrl = thumbnail?.source;

    if (imageUrl) {
      // 2. Fetch the actual image from Wikipedia Commons to proxy it
      const imgResp = await fetch(imageUrl, {
        headers: { 'User-Agent': userAgent }
      });

      if (!imgResp.ok) {
        return new Response('Error fetching image from source', { status: 502 });
      }

      // 3. Return image bytes with caching and CORS headers
      const headers = new Headers();
      headers.set('Content-Type', imgResp.headers.get('Content-Type') || 'image/jpeg');
      headers.set('Cache-Control', 'public, max-age=604800, s-maxage=604800'); // Cache for 7 days on edge/browser
      headers.set('Access-Control-Allow-Origin', '*');

      return new Response(imgResp.body, {
        status: 200,
        headers
      });
    }

    return new Response('No image available', { status: 404 });

  } catch (e) {
    return new Response(`Error: ${e.message}`, { status: 500 });
  }
}
