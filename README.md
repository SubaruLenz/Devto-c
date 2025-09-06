# Dev.to Clone

A full-stack dev.to clone built with the T3 Stack (Next.js, tRPC, Prisma, NextAuth).

## Tech Stack

- [Next.js](https://nextjs.org) - React framework
- [tRPC](https://trpc.io) - End-to-end typesafe APIs
- [Prisma](https://prisma.io) - Database ORM
- [NextAuth.js](https://next-auth.js.org) - Authentication
- [Tailwind CSS](https://tailwindcss.com) - Styling
- PostgreSQL - Database

## API Endpoints

### Posts (`api.posts.*`)

**Queries (Read)**
- `getAll({ limit?, cursor? })` - Get paginated posts
- `getById({ id })` - Get single post with comments
- `getMyPosts()` - Get current user's posts (auth required)

**Mutations (Write)**
- `create({ title, content, slug, published? })` - Create post (auth required)
- `update({ id, title?, content?, slug?, published? })` - Update own post (auth required)
- `delete({ id })` - Delete own post (auth required)
- `toggleLike({ postId })` - Like/unlike post (auth required)

### Comments (`api.comments.*`)

**Queries**
- `getByPost({ postId })` - Get comments for a post (includes replies)

**Mutations**
- `create({ postId, content, parentComment? })` - Add comment/reply (auth required)
- `update({ id, content })` - Edit own comment (auth required)
- `delete({ id })` - Delete own comment (auth required)
- `toggleLike({ commentId })` - Like/unlike comment (auth required)

### Tags (`api.tags.*`)

**Queries**
- `getAll()` - Get all tags with post counts
- `getPopular({ limit? })` - Get popular tags
- `getById({ id })` - Get tag with associated posts

**Mutations**
- `create({ name, color? })` - Create tag (auth required)
- `update({ id, name?, color? })` - Update tag (auth required)
- `delete({ id })` - Delete tag (auth required)
- `addToPost({ postId, tagId })` - Tag a post (auth required)
- `removeFromPost({ postId, tagId })` - Remove tag from post (auth required)

### Users (`api.users.*`)

**Queries**
- `getProfile()` - Get current user profile (auth required)
- `getByUsername({ username })` - Get user by username
- `getFollowers({ userId })` - Get user's followers
- `getFollowing({ userId })` - Get who user follows
- `getBookmarks()` - Get current user's bookmarks (auth required)

**Mutations**
- `updateProfile({ name?, bio?, website_url?, location?, available_for? })` - Update profile (auth required)
- `toggleFollow({ userId })` - Follow/unfollow user (auth required)
- `toggleBookmark({ postId })` - Bookmark/unbookmark post (auth required)

## Usage Examples

```typescript
// In React components
const { data: posts } = api.posts.getAll.useQuery({ limit: 10 });
const createPost = api.posts.create.useMutation();

// Create a post
await createPost.mutateAsync({
  title: "My First Post",
  content: "Hello world!",
  slug: "my-first-post",
  published: true
});

// Like a post
const toggleLike = api.posts.toggleLike.useMutation();
await toggleLike.mutateAsync({ postId: 1 });
```

## Development

```bash
npm run dev          # Start development server
npm run db:push      # Push schema changes to database
npm run db:studio    # Open Prisma Studio
```

## Database Schema

See `prisma/schema.prisma` for the complete database schema including:
- Users with profiles and social features
- Posts with content, tags, and engagement
- Comments with nested replies
- Likes, follows, and bookmarks
- Tags and post categorization
