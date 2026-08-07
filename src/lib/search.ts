import { STATES, type StateScene } from '@/data/india';

export type SearchHit = {
  state: StateScene;
  score: number;
  matched: string[];
  reason: string;
};

const STOP = new Set(['show', 'me', 'a', 'an', 'the', 'for', 'my', 'i', 'want', 'some', 'any', 'with', 'of', 'to', 'and', 'or', 'in', 'on']);

function tokenize(q: string): string[] {
  return q
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w && !STOP.has(w));
}

function colorMentions(q: string): string[] {
  const map: Record<string, string[]> = {
    red: ['red', 'maroon', 'crimson', 'vermillion', 'temple red'],
    green: ['green', 'emerald', 'forest', 'peacock', 'mughal green'],
    blue: ['blue', 'indigo', 'peacock'],
    gold: ['gold', 'gilded', 'golden', 'zari'],
    white: ['white', 'ivory', 'kasavu', 'cream'],
    saffron: ['saffron', 'orange', 'amber', 'marigold']
  };
  const found: string[] = [];
  for (const k of Object.keys(map)) {
    if (map[k].some((m) => q.includes(m))) found.push(k);
  }
  return found;
}

const SCENE_HINTS: Record<string, string[]> = {
  wedding: ['wedding', 'bridal', 'bride', 'marriage', 'shaadi', 'engagement'],
  festival: ['festival', 'diwali', 'holi', 'eid', 'navratri', 'pongal', 'onam', 'rakhi', 'republic', 'independence'],
  temple: ['temple', 'puja', 'prayer', 'gopuram', 'ritual'],
  snow: ['snow', 'winter', 'cold', 'kashmir', 'ladakh', 'pashmina', 'snowfall'],
  backwaters: ['kerala', 'backwater', 'boat', 'coconut'],
  desert: ['desert', 'rajasthan', 'sand', 'camel'],
  mountains: ['mountain', 'himalaya', 'himachal', 'uttarakhand', 'sikkim', 'arunachal', 'nagaland', 'mizoram', 'meghalaya'],
  coast: ['beach', 'coast', 'sea', 'goa', 'mumbai', 'maharashtra'],
  river: ['river', 'bengal', 'assam', 'bihar', 'ganges'],
  forest: ['forest', 'tribal', 'gond', 'jharkhand', 'chhattisgarh', 'madhya pradesh']
};

export function aiSearch(rawQuery: string): SearchHit[] {
  const q = rawQuery.toLowerCase();
  const tokens = tokenize(rawQuery);
  const budgetMatch = q.match(/under\s+(?:rs|inr)?\s?(\d[\d,]*)/);
  const maxPrice = budgetMatch ? Number(budgetMatch[1].replace(/,/g, '')) : null;
  const mentions = colorMentions(q);
  const hits: SearchHit[] = [];

  for (const state of STATES) {
    const matched: string[] = [];
    let score = 0;

    for (const token of tokens) {
      const haystack = [
        state.name,
        state.signatureGarment,
        state.fabric,
        state.embroidery,
        state.occasion,
        state.music,
        state.weather,
        state.artisan,
        state.capital
      ].join(' ').toLowerCase();
      if (haystack.includes(token)) {
        score += 2;
        matched.push(token);
      }
    }

    if (mentions.length) {
      const palette = JSON.stringify(state.palette).toLowerCase();
      for (const m of mentions) {
        if (palette.includes(m)) {
          score += 3;
          matched.push('color:' + m);
        }
      }
    }

    for (const [scene, keys] of Object.entries(SCENE_HINTS)) {
      if (keys.some((k) => q.includes(k)) && state.scene === scene) {
        score += 4;
        matched.push('scene:' + scene);
      }
    }

    if (maxPrice !== null) {
      if (state.priceINR <= maxPrice) {
        score += 5;
        matched.push('budget');
      } else {
        score -= 3;
      }
    }

    if (q.includes(state.name.toLowerCase()) || state.name.toLowerCase().includes(q.trim())) {
      score += 6;
      matched.push('state-name');
    }

    const reasonParts: string[] = [];
    if (matched.indexOf('budget') !== -1) reasonParts.push('under your budget');
    if (matched.indexOf('wedding') !== -1) reasonParts.push('a wedding state');
    for (const m of mentions) reasonParts.push('featuring ' + m);

    if (score > 0) {
      hits.push({ state, score, matched, reason: reasonParts.join(', ') || 'matches your query' });
    }
  }

  return hits.sort((a, b) => b.score - a.score).slice(0, 6);
}
