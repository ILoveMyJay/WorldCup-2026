/* Cloudflare Pages Function — /api/standings
   Proxies requests to football-data.org with server-side API key */

export async function onRequest(context) {
  const apiKey = context.env.FOOTBALL_API_KEY;

  if (!apiKey) {
    return Response.json(
      { error: 'FOOTBALL_API_KEY not configured' },
      { status: 500 }
    );
  }

  try {
    const resp = await fetch(
      'https://api.football-data.org/v4/competitions/WC/standings',
      { headers: { 'X-Auth-Token': apiKey } }
    );

    if (!resp.ok) {
      return Response.json(
        { error: `Upstream API error: ${resp.status}` },
        { status: resp.status }
      );
    }

    const data = await resp.json();

    return new Response(JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300',  // CDN cache 5 min
      },
    });
  } catch (e) {
    return Response.json(
      { error: 'Failed to fetch standings', detail: e.message },
      { status: 502 }
    );
  }
}
