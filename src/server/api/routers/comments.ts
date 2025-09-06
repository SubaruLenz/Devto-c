import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const commentsRouter = createTRPCRouter({
  // CREATE
  create: protectedProcedure
    .input(z.object({
      postId: z.number(),
      content: z.string().min(1),
      parentComment: z.number().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.comment.create({
        data: {
          post_id: input.postId,
          content: input.content,
          parent_comment: input.parentComment,
          user_id: ctx.session.user.id,
        },
        include: {
          user_comment_fk: {
            select: { username: true, name: true, profile_image: true }
          }
        },
      });
    }),

  // READ - Get comments for a post
  getByPost: publicProcedure
    .input(z.object({ postId: z.number() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.comment.findMany({
        where: { 
          post_id: input.postId,
          parent_comment: null, // Only top-level comments
        },
        orderBy: { created_at: "desc" },
        include: {
          user_comment_fk: {
            select: { username: true, name: true, profile_image: true }
          },
          comment_children: {
            include: {
              user_comment_fk: {
                select: { username: true, name: true, profile_image: true }
              }
            },
            orderBy: { created_at: "asc" }
          },
          _count: {
            select: { Comment_like: true }
          }
        },
      });
    }),

  // UPDATE
  update: protectedProcedure
    .input(z.object({
      id: z.number(),
      content: z.string().min(1),
    }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.comment.update({
        where: { 
          id: input.id,
          user_id: ctx.session.user.id, // Only update own comments
        },
        data: { content: input.content },
      });
    }),

  // DELETE
  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.comment.delete({
        where: { 
          id: input.id,
          user_id: ctx.session.user.id, // Only delete own comments
        },
      });
    }),

  // LIKE/UNLIKE comment
  toggleLike: protectedProcedure
    .input(z.object({ commentId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const existingLike = await ctx.db.comment_like.findFirst({
        where: {
          comment_id: input.commentId,
          user_id: ctx.session.user.id,
        },
      });

      if (existingLike) {
        await ctx.db.comment_like.delete({ where: { id: existingLike.id } });
        return { liked: false };
      } else {
        await ctx.db.comment_like.create({
          data: {
            comment_id: input.commentId,
            user_id: ctx.session.user.id,
          },
        });
        return { liked: true };
      }
    }),
});