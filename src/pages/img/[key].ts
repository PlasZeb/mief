import type { APIRoute } from 'astro';

// @ts-ignore
import { env as cfEnv } from 'cloudflare:workers';

export const GET: APIRoute = async ({ params, locals }) => {
  const { key } = params;
  
  if (!key) {
    return new Response('Not found', { status: 404 });
  }

  // Megpróbáljuk több helyről is megszerezni az EXPERT_IMAGES bindingot
  // 1. Astro standard Cloudflare runtime env
  // 2. Astro locals (közvetlen)
  // 3. cloudflare:workers import
  // 4. Globális változó (legacy Workers)
  
  const runtimeEnv = (locals as any)?.runtime?.env;
  const directLocals = (locals as any)?.EXPERT_IMAGES ? locals as any : null;
  const env = runtimeEnv || directLocals || cfEnv || (typeof globalThis !== 'undefined' ? globalThis : {});
  
  const kv = env.EXPERT_IMAGES;
  
  if (!kv) {
    const diagnostic = {
      hasLocals: !!locals,
      hasRuntime: !!(locals as any)?.runtime,
      hasRuntimeEnv: !!runtimeEnv,
      hasCfEnv: !!cfEnv,
      envKeys: Object.keys(env)
    };
    console.error("EXPERT_IMAGES KV binding not found", diagnostic);
    return new Response(`Storage configuration error. Available: ${diagnostic.envKeys.join(', ')}`, { status: 500 });
  }

  try {
    const imageBuffer = await kv.get(key, { type: 'arrayBuffer' });
    
    if (!imageBuffer) {
      return new Response(`Image not found in KV: ${key}`, { status: 404 });
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
