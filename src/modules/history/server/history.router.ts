import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '~/server/trpc/trpc.server';
import { prismaDb } from '~/server/prisma/prismaDb';

const addMessageSchema = z.object({
  conversationId: z.string().optional(),
  sessionId: z.string().optional(),
  role: z.string(),
  content: z.string(),
});

const getConversationSchema = z.object({
  conversationId: z.string(),
});

export const historyRouter = createTRPCRouter({
  addMessage: publicProcedure
    .input(addMessageSchema)
    .output(z.object({ conversationId: z.string() }))
    .mutation(async ({ input }) => {
      const { conversationId, sessionId, role, content } = input;

      let convId = conversationId;
      if (!convId) {
        const conversation = await prismaDb.conversation.create({
          data: {
            sessionId,
          },
        });
        convId = conversation.id;
      }

      await prismaDb.message.create({
        data: { conversationId: convId, role, content },
      });

      return { conversationId: convId };
    }),

  getConversation: publicProcedure
    .input(getConversationSchema)
    .output(z.object({ messages: z.array(z.object({ role: z.string(), content: z.string(), createdAt: z.date() })) }))
    .query(async ({ input }) => {
      const { conversationId } = input;
      const messages = await prismaDb.message.findMany({
        where: { conversationId },
        orderBy: { createdAt: 'asc' },
        select: { role: true, content: true, createdAt: true },
      });
      return { messages };
    }),

  listConversations: publicProcedure
    .input(z.object({ sessionId: z.string().optional() }))
    .output(z.object({ conversations: z.array(z.object({ id: z.string(), createdAt: z.date() })) }))
    .query(async ({ input }) => {
      const conversations = await prismaDb.conversation.findMany({
        where: { sessionId: input.sessionId ?? undefined },
        orderBy: { createdAt: 'desc' },
        select: { id: true, createdAt: true },
      });
      return { conversations };
    }),
});
