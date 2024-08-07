import { createProxyMiddleware } from 'http-proxy-middleware';

export const handler = createProxyMiddleware({
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
});
