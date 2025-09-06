import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const usersRouter = createTRPCRouter({
  // READ - Get current user profile
  getProfile: protectedProcedure
    .query(async ({ ctx }) => {
      return ctx.db.user.findUnique({
        where: { id: ctx.session.user.id },
        include: {
          _count: {
            select: { 
              posts: true,
              followers: true,
              following: true,
            }
          }
        },
      });
    }),

  // READ - Get user by username
  getByUsername: publicProcedure
    .input(z.object({ username: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.user.findUnique({
        where: { username: input.username },
        select: {
          id: true,
          username: true,
          name: true,
          bio: true,
          profile_image: true,
          website_url: true,
          location: true,
          join_time: true,
          _count: {
            select: { 
              posts: true,
              followers: true,
              following: true,
            }
          }
        },
      });
    }),

  // UPDATE - Update profile
  updateProfile: protectedProcedure
    .input(z.object({
      name: z.string().min(1).optional(),
      bio: z.string().optional(),
      website_url: z.string().url().optional(),
      location: z.string().optional(),
      available_for: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.user.update({
        where: { id: ctx.session.user.id },
        data: input,
      });
    }),

  // FOLLOW/UNFOLLOW
  toggleFollow: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      if (input.userId === ctx.session.user.id) {
        throw new Error("Cannot follow yourself");
      }

      const existingFollow = await ctx.db.follow.findFirst({
        where: {
          follower_id: ctx.session.user.id,
          following_id: input.userId,
        },
      });

      if (existingFollow) {
        await ctx.db.follow.delete({ where: { id: existingFollow.id } });
        return { following: false };
      } else {
        await ctx.db.follow.create({
          data: {
            follower_id: ctx.session.user.id,
            following_id: input.userId,
          },
        });
        return { following: true };
      }
    }),

  // READ - Get followers
  getFollowers: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.follow.findMany({
        where: { following_id: input.userId },
        include: {
          follow_follower_fk: {
            select: {
              id: true,
              username: true,
              name: true,
              profile_image: true,
              bio: true,
            }
          }
        },
        orderBy: { created_at: "desc" },
      });
    }),

  // READ - Get following
  getFollowing: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.follow.findMany({
        where: { follower_id: input.userId },
        include: {
          follow_following_fk: {
            select: {
              id: true,
              username: true,
              name: true,
              profile_image: true,
              bio: true,
            }
          }
        },
        orderBy: { created_at: "desc" },
      });
    }),

  // BOOKMARK
  toggleBookmark: protectedProcedure
    .input(z.object({ postId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const existingBookmark = await ctx.db.bookmark.findFirst({
        where: {
          user_id: ctx.session.user.id,
          post_id: input.postId,
        },
      });

      if (existingBookmark) {
        await ctx.db.bookmark.delete({ where: { id: existingBookmark.id } });
        return { bookmarked: false };
      } else {
        await ctx.db.bookmark.create({
          data: {
            user_id: ctx.session.user.id,
            post_id: input.postId,
          },
        });
        return { bookmarked: true };
      }
    }),

  // READ - Get bookmarks
  getBookmarks: protectedProcedure
    .query(async ({ ctx }) => {
      return ctx.db.bookmark.findMany({
        where: { user_id: ctx.session.user.id },
        include: {
          bookmark_post_fk: {
            include: {
              user_post_fk: {
                select: { username: true, name: true, profile_image: true }
              },
              Post_tag: {
                include: { post_tag_tag_fk: true }
              }
            }
          }
        },
        orderBy: { created_at: "desc" },
      });
    }),
});