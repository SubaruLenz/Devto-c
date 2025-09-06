import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const tagsRouter = createTRPCRouter({
  // CREATE
  create: protectedProcedure
    .input(z.object({
      name: z.string().min(1),
      color: z.string().regex(/^#[0-9A-F]{6}$/i).optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.tag.create({
        data: {
          name: input.name,
          color: input.color ?? "#000000",
        },
      });
    }),

  // READ - Get all tags
  getAll: publicProcedure
    .query(async ({ ctx }) => {
      return ctx.db.tag.findMany({
        orderBy: { name: "asc" },
        include: {
          _count: {
            select: { Post_tag: true }
          }
        },
      });
    }),

  // READ - Get popular tags
  getPopular: publicProcedure
    .input(z.object({ limit: z.number().min(1).max(50).default(10) }))
    .query(async ({ ctx, input }) => {
      return ctx.db.tag.findMany({
        take: input.limit,
        orderBy: {
          Post_tag: { _count: "desc" }
        },
        include: {
          _count: {
            select: { Post_tag: true }
          }
        },
      });
    }),

  // READ - Get by ID
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.tag.findUnique({
        where: { id: input.id },
        include: {
          Post_tag: {
            include: {
              post_tag_post_fk: {
                include: {
                  user_post_fk: {
                    select: { username: true, name: true, profile_image: true }
                  }
                }
              }
            }
          }
        },
      });
    }),

  // UPDATE
  update: protectedProcedure
    .input(z.object({
      id: z.number(),
      name: z.string().min(1).optional(),
      color: z.string().regex(/^#[0-9A-F]{6}$/i).optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      return ctx.db.tag.update({
        where: { id },
        data,
      });
    }),

  // DELETE
  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.tag.delete({
        where: { id: input.id },
      });
    }),

  // Add tag to post
  addToPost: protectedProcedure
    .input(z.object({
      postId: z.number(),
      tagId: z.number(),
    }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.post_tag.create({
        data: {
          post_id: input.postId,
          tag_id: input.tagId,
        },
      });
    }),

  // Remove tag from post
  removeFromPost: protectedProcedure
    .input(z.object({
      postId: z.number(),
      tagId: z.number(),
    }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.post_tag.deleteMany({
        where: {
          post_id: input.postId,
          tag_id: input.tagId,
        },
      });
    }),
});