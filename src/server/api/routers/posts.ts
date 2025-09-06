import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const postsRouter = createTRPCRouter({
  // CREATE
  create: protectedProcedure
    .input(z.object({
      title: z.string().min(1),
      content: z.string().min(1),
      slug: z.string().min(1),
      published: z.boolean().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.post.create({
        data: {
          ...input,
          user_id: ctx.session.user.id,
        },
      });
    }),

  // READ - Get all posts
  getAll: publicProcedure
    .input(z.object({
      limit: z.number().min(1).max(100).default(10),
      cursor: z.number().optional(),
    }))
    .query(async ({ ctx, input }) => {
      return ctx.db.post.findMany({
        take: input.limit + 1,
        cursor: input.cursor ? { id: input.cursor } : undefined,
        orderBy: { created_at: "desc" },
        include: {
          user_post_fk: {
            select: { username: true, name: true, profile_image: true }
          },
          Post_tag: {
            include: { post_tag_tag_fk: true }
          },
          _count: {
            select: { Comment: true, like_post: true }
          }
        },
        where: { published: true },
      });
    }),

  // READ - Get by ID
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.post.findUnique({
        where: { id: input.id },
        include: {
          user_post_fk: {
            select: { username: true, name: true, profile_image: true }
          },
          Post_tag: {
            include: { post_tag_tag_fk: true }
          },
          Comment: {
            include: {
              user_comment_fk: {
                select: { username: true, name: true, profile_image: true }
              }
            }
          }
        },
      });
    }),

  // READ - Get user's posts
  getMyPosts: protectedProcedure
    .query(async ({ ctx }) => {
      return ctx.db.post.findMany({
        where: { user_id: ctx.session.user.id },
        orderBy: { created_at: "desc" },
        include: {
          Post_tag: {
            include: { post_tag_tag_fk: true }
          },
          _count: {
            select: { Comment: true, like_post: true }
          }
        },
      });
    }),

  // UPDATE
  update: protectedProcedure
    .input(z.object({
      id: z.number(),
      title: z.string().min(1).optional(),
      content: z.string().min(1).optional(),
      slug: z.string().min(1).optional(),
      published: z.boolean().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      return ctx.db.post.update({
        where: { 
          id,
          user_id: ctx.session.user.id, // Only update own posts
        },
        data: {
          ...data,
          updated_at: new Date(),
        },
      });
    }),

  // DELETE
  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.post.delete({
        where: { 
          id: input.id,
          user_id: ctx.session.user.id, // Only delete own posts
        },
      });
    }),

  // LIKE/UNLIKE
  toggleLike: protectedProcedure
    .input(z.object({ postId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const existingLike = await ctx.db.like.findFirst({
        where: {
          post_id: input.postId,
          user_id: ctx.session.user.id,
        },
      });

      if (existingLike) {
        await ctx.db.like.delete({ where: { id: existingLike.id } });
        return { liked: false };
      } else {
        await ctx.db.like.create({
          data: {
            post_id: input.postId,
            user_id: ctx.session.user.id,
          },
        });
        return { liked: true };
      }
    }),
});