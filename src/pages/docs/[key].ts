import type { APIRoute } from 'astro';

// @ts-ignore
import { env as cfEnv } from 'cloudflare:workers';

export const GET: APIRoute = async ({ params }) => {
  const { key } = params;
  
  if (!key) {
    return new Response('Not found', { status: 404 });
  }

  const env = cfEnv as any;
  
  if (!env || !env.DOCUMENTS) {
    return new Response('KV Storage not configured', { status: 500 });
  }

  try {
    const pdfBuffer = await env.DOCUMENTS.get(key, 'arrayBuffer');
    
    if (!pdfBuffer) {
      return new Response('Document not found', { status: 404 });
    }

    return new Response(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Cache-Control': 'public, max-age=31536000', // Cache for 1 year
        'Content-Disposition': 'inline'
      }
    });
  } catch (error) {
    console.error("Error fetching document:", error);
    return new Response('Internal Server Error', { status: 500 });
  }
};
