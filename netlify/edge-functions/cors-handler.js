import { Config, Context } from '@netlify/edge-functions';

export default async (request, context) => {
  const response = await context.next();
  console.log('Response status:', response.status); // Log response status
  return new Response(response.body, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
};

export const config = {
  path: '/*',
};
