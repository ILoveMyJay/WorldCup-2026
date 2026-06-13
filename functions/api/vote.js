/* Cloudflare Pages Function — /api/vote
   Handles global voting storage and retrieval.
   Gracefully falls back to simulated database if Cloudflare KV is not bound. */

const DEFAULT_VOTES = {
  champion: {
    'Argentina': 420,
    'Brazil': 380,
    'France': 310,
    'England': 290,
    'Germany': 240,
    'Spain': 260,
    'Portugal': 210,
    'Netherlands': 140,
    'United States': 180,
    'Mexico': 110,
    'Canada': 95,
  },
  matches: {}
};

export async function onRequest(context) {
  const kv = context.env.VOTE_KV;
  const method = context.request.method;

  // Set CORS and JSON headers
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  };

  if (method === 'OPTIONS') {
    return new Response(null, { headers });
  }

  try {
    // 1. Get current vote counts from KV or default mock
    let votes = DEFAULT_VOTES;
    if (kv) {
      const stored = await kv.get('worldcup_votes');
      if (stored) {
        votes = JSON.parse(stored);
      } else {
        await kv.put('worldcup_votes', JSON.stringify(DEFAULT_VOTES));
      }
    }

    // 2. Handle GET request
    if (method === 'GET') {
      return new Response(JSON.stringify(votes), { headers });
    }

    // 3. Handle POST request (Submit a vote)
    if (method === 'POST') {
      const body = await context.request.json();
      const { type, id, option } = body; // type = 'champion' or 'match'

      if (type === 'champion') {
        if (!votes.champion[id]) {
          votes.champion[id] = 0;
        }
        votes.champion[id] += 1;
      } else if (type === 'match') {
        if (!votes.matches[id]) {
          votes.matches[id] = { home: 12, draw: 8, away: 5 }; // Base mock counts
        }
        if (option === 'home' || option === 'draw' || option === 'away') {
          votes.matches[id][option] += 1;
        }
      }

      // Save updated votes to KV if available
      if (kv) {
        await kv.put('worldcup_votes', JSON.stringify(votes));
      }

      return new Response(JSON.stringify({ success: true, votes }), { headers });
    }

    return new Response('Method Not Allowed', { status: 450, headers });

  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500, headers });
  }
}
