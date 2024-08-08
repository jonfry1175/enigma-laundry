// import { createProxyMiddleware } from 'http-proxy-middleware';
// import dotenv from 'dotenv';

// dotenv.config();

// export async function handler(event, context) {
//   console.log('Proxy handler started at:', new Date().toISOString());

//   return new Promise((resolve, reject) => {
//     createProxyMiddleware({
//       target: process.env.LAUNDRY_API_URL,
//       changeOrigin: true,
//       pathRewrite: {
//         '^/.netlify/functions/proxy': '', // Remove base path
//       },
//       onProxyReq: (proxyReq, req, res) => {
//         console.log('Proxy Request:', req.method, req.url);
//       },
//       onProxyRes: (proxyRes, req, res) => {
//         console.log('Proxy Response Status Code:', proxyRes.statusCode);

//         let responseData = '';
//         proxyRes.on('data', (chunk) => {
//           responseData += chunk;
//         });

//         proxyRes.on('end', () => {
//           console.log('Proxy Response Ended at:', new Date().toISOString());
//           resolve({
//             statusCode: proxyRes.statusCode,
//             body: responseData,
//             headers: {
//               'Content-Type': 'application/json',
//               ...proxyRes.headers,
//             },
//           });
//         });
//       },
//     })(event, context, (err) => {
//       if (err) {
//         console.error('Proxy Error:', err);
//         resolve({
//           statusCode: 500,
//           body: JSON.stringify({ error: 'Internal Server Error' }),
//         });
//       }
//     });
//   });
// }
