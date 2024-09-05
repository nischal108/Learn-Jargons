import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

// Initialize Prisma
const prisma = new PrismaClient().$extends(withAccelerate());

// Cloudflare Workers event listener
addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request: Request) {
  if (request.method === 'POST') {
    const { level, message, meta } = await request.json();

    // Create log in the database
    try {
      const log = await createLog(level, message, meta);
      return new Response(JSON.stringify({ message: 'Log created', log }), {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      return new Response('Error creating log', { status: 500 });
    }
  } else if (request.method === 'GET') {
    // Return the logs
    try {
      const logs = await prisma.log.findMany({
        where: {
          message: {
            contains: 'This is a test log message',
          },
        },
      });
      return new Response(JSON.stringify(logs), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      return new Response('Error fetching logs', { status: 500 });
    }
  } else {
    return new Response('Invalid request method', { status: 405 });
  }
}

async function createLog(level: string, message: string, meta: object) {
  try {
    const log = await prisma.log.create({
      data: {
        level,
        message,
        meta,
      },
    });
    return log;
  } catch (error) {
    console.error('Error creating log:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
