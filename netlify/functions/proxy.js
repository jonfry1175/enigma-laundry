import { createProxyMiddleware } from 'http-proxy-middleware';

export async function handler(event, context) {
  return new Promise((resolve, reject) => {
    createProxyMiddleware({
      target: process.env.LAUNDRY_API_URL,
      changeOrigin: true,
      pathRewrite: {
        '^/.netlify/functions/proxy': '', // Remove base path
      },
      onProxyReq: (proxyReq, req, res) => {
        console.log('Proxy Request:', req.method, req.url);
      },
      onProxyRes: (proxyRes, req, res) => {
        console.log('Proxy Response:', proxyRes.statusCode, req.url);
      },
    })(event, context, (err) => {
      if (err) {
        console.error('Proxy Error:', err);
        resolve({
          statusCode: 500,
          body: JSON.stringify({ error: 'Internal Server Error' }),
        });
      } else {
        resolve({
          statusCode: 200,
          body: JSON.stringify({ success: true }),
        });
      }
    });
  });
}
