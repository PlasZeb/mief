import type { APIRoute } from 'astro';

// @ts-ignore
import { env as cfEnv } from 'cloudflare:workers';

export const GET: APIRoute = async ({ params, locals }) => {
  const { key } = params;
  
  if (!key) {
    return new Response('Not found', { status: 404 });
  }

  // Megpróbáljuk megszerezni az env-et a locals-ból (Astro standard Cloudflare adapter esetén)
  const env = (locals as any).runtime?.env || cfEnv;
  
  if (!env || !env.EXPERT_IMAGES) {
    console.error("EXPERT_IMAGES KV binding missing from env", { hasEnv: !!env, hasKV: !!env?.EXPERT_IMAGES });
    return new Response('KV Storage not configured', { status: 500 });
  }

  try {
    const imageBuffer = await env.EXPERT_IMAGES.get(key, 'arrayBuffer');
    
    if (!imageBuffer) {
      console.warn(`Image not found in KV: ${key}`);
      return new Response('Image not found', { status: 404 });
    }

    // Determine content type based on extension (case-insensitive)
    const lowerKey = key.toLowerCase();
    let contentType = 'image/jpeg';
    if (lowerKey.endsWith('.png')) contentType = 'image/png';
    else if (lowerKey.endsWith('.webp')) contentType = 'image/webp';
    else if (lowerKey.endsWith('.gif')) contentType = 'image/gif';
    else if (lowerKey.endsWith('.svg')) contentType = 'image/svg+xml';
    else if (lowerKey.endsWith('.avif')) contentType = 'image/avif';

    return new Response(imageBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000', // Cache for 1 year
      }
    });
  } catch (error) {
    console.error("Error fetching image:", error);
    return new Response('Internal Server Error', { status: 500 });
  }
};
