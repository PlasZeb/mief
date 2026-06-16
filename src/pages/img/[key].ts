import type { APIRoute } from 'astro';

// @ts-ignore
import { env as cfEnv } from 'cloudflare:workers';

export const GET: APIRoute = async ({ params }) => {
  const { key } = params;
  
  if (!key) {
    return new Response('Not found', { status: 404 });
  }

  const env = cfEnv as any;
  
  if (!env || !env.EXPERT_IMAGES) {
    return new Response('KV Storage not configured', { status: 500 });
  }

  try {
    const imageBuffer = await env.EXPERT_IMAGES.get(key, 'arrayBuffer');
    
    if (!imageBuffer) {
      return new Response('Image not found', { status: 404 });
    }

    // Determine content type based on extension
    let contentType = 'image/jpeg';
    if (key.endsWith('.png')) contentType = 'image/png';
    else if (key.endsWith('.webp')) contentType = 'image/webp';
    else if (key.endsWith('.gif')) contentType = 'image/gif';
    else if (key.endsWith('.svg')) contentType = 'image/svg+xml';

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
