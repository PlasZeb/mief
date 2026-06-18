import type { APIRoute } from 'astro';

// @ts-ignore
import { env as cfEnv } from 'cloudflare:workers';

export const GET: APIRoute = async ({ params, locals }) => {
  const { key } = params;

  if (!key) {
    return new Response('Not found', { status: 404 });
  }

  const runtimeEnv = (locals as any)?.runtime?.env;
  const directLocals = (locals as any)?.DOCUMENTS ? locals as any : null;
  const env = runtimeEnv || directLocals || cfEnv || (typeof globalThis !== 'undefined' ? globalThis : {});

  const kv = env.DOCUMENTS;

  if (!kv) {
    return new Response('Document storage not configured', { status: 500 });
  }

  try {
    const pdfBuffer = await kv.get(key, { type: 'arrayBuffer' });

    if (!pdfBuffer) {
      return new Response(`Document not found in KV: ${key}`, { status: 404 });
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
