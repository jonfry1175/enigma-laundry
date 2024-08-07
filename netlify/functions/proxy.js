const { createProxyMiddleware } = require('http-proxy-middleware');

exports.handler = async (event, context) => {
  const isPlainObj = (await import('is-plain-obj')).default;

  // Buat middleware proxy
  const proxyMiddleware = createProxyMiddleware({
    target: process.env.LAUNDRY_API_URL,
    changeOrigin: true,
    pathRewrite: {
      '^/.netlify/functions/proxy': '', // Hapus path dasar
    },
    onProxyReq: (proxyReq, req, res) => {
      console.log('Proxy Request:', req.method, req.url);
    },
    onProxyRes: (proxyRes, req, res) => {
      console.log('Proxy Response:', proxyRes.statusCode, req.url);
    },
  });

  return new Promise((resolve, reject) => {
    const response = {
      statusCode: 200,
      body: '',
    };
    proxyMiddleware(event, context, (result) => {
      if (result instanceof Error) {
        reject(result);
      } else {
        resolve(response);
      }
    });
  });
};
