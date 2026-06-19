import type { APIRoute } from 'astro';

// @ts-ignore
import { env as cfEnv } from 'cloudflare:workers';

export const GET: APIRoute = async ({ params, locals }) => {
  const { key } = params;

  if (!key) {
    return new Response('Not found', { status: 404 });
  }

  const runtimeEnv = (locals as any)?.runtime?.env;
  const directLocals = locals as any;
  const env = runtimeEnv || directLocals || cfEnv || (typeof globalThis !== 'undefined' ? globalThis : {});

  const bucket = env?.DOCUMENTS_BUCKET;
  const kv = env?.DOCUMENTS;

  if (!bucket && !kv) {
    return new Response(`Document storage not configured. Available: ${Object.keys(env || {}).join(', ')}`, { status: 500 });
  }

  try {
    if (bucket) {
      const object = await bucket.get(key);
      if (object) {
        return new Response(object.body, {
          headers: {
            'Content-Type': object.httpMetadata?.contentType || 'application/pdf',
            'Cache-Control': 'public, max-age=31536000',
            'Content-Disposition': 'inline'
          }
        });
      }
    }

    if (kv) {
      const pdfBuffer = await kv.get(key, { type: 'arrayBuffer' });
      if (pdfBuffer) {
        return new Response(pdfBuffer, {
          headers: {
            'Content-Type': 'application/pdf',
            'Cache-Control': 'public, max-age=31536000', // Cache for 1 year
            'Content-Disposition': 'inline'
          }
        });
      }
    }

    return new Response(`Document not found in storage: ${key}`, { status: 404 });
  } catch (error) {
    console.error("Error fetching document:", error);
    return new Response('Internal Server Error', { status: 500 });
  }
};
