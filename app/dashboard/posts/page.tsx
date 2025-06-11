import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { posts, users } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PostCard } from "@/components/post-card";
import { PlusCircle, BarChart3, Users, FileText } from "lucide-react";

async function getUserPosts(userId: string) {
  return await db
    .select({
      id: posts.id,
      title: posts.title,
      slug: posts.slug,
      content: posts.content,
      excerpt: posts.excerpt,
      coverImage: posts.coverImage,
      status: posts.status,
      category: posts.category,
      authorId: posts.authorId,
      publishedAt: posts.publishedAt,
      createdAt: posts.createdAt,
      updatedAt: posts.updatedAt,
      author: {
        id: users.id,
        name: users.name,
        email: users.email,
        image: users.image,
      },
    })
    .from(posts)
    .innerJoin(users, eq(posts.authorId, users.id))
    .where(eq(posts.authorId, userId))
    .orderBy(desc(posts.updatedAt));
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (
    !session ||
    (session.user.role !== "author" && session.user.role !== "admin")
  ) {
    redirect("/auth/signin");
  }

  const userPosts = await getUserPosts(session.user.id);
  const publishedPosts = userPosts.filter(
    (post) => post.status === "published"
  );
  const draftPosts = userPosts.filter((post) => post.status === "draft");

  return (
    <div className="container py-8 lg:py-12">
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {session.user.name}! Manage your blog posts and
            content.
          </p>
        </div>
        <Link href="/dashboard/posts/new">
          <Button size="lg">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Post
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-3 mb-12">
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Total Posts</h3>
          </div>
          <p className="text-3xl font-bold mt-2">{userPosts.length}</p>
          <p className="text-sm text-muted-foreground">All your posts</p>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5 text-green-600" />
            <h3 className="font-semibold">Published</h3>
          </div>
          <p className="text-3xl font-bold mt-2">{publishedPosts.length}</p>
          <p className="text-sm text-muted-foreground">Live posts</p>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-yellow-600" />
            <h3 className="font-semibold">Drafts</h3>
          </div>
          <p className="text-3xl font-bold mt-2">{draftPosts.length}</p>
          <p className="text-sm text-muted-foreground">Work in progress</p>
        </div>
      </div>

      {/* Posts Section */}
      <div>
        <h2 className="text-2xl font-semibold mb-8">Your Posts</h2>

        {userPosts.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {userPosts.map((post) => (
              <div key={post.id} className="relative">
                <PostCard post={post} />
                <div className="absolute top-4 right-4 flex gap-2">
                  <Link href={`/dashboard/posts/${post.id}/edit`}>
                    <Button size="sm" variant="secondary">
                      Edit
                    </Button>
                  </Link>
                  <span
                    className={`px-2 py-1 text-xs rounded-full font-medium ${
                      post.status === "published"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                    }`}
                  >
                    {post.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 rounded-lg border bg-muted/30">
            <FileText className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No posts yet</h3>
            <p className="text-muted-foreground mb-6">
              You haven&apos;t created any posts yet. Start writing your first
              post!
            </p>
            <Link href="/dashboard/posts/new">
              <Button>Create Your First Post</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
// This code defines a dashboard page for authors to manage their blog posts.
// It includes statistics about total posts, published posts, and drafts.
// The page fetches the user's posts from the database and displays them in a grid.
// It also provides a button to create a new post and links to edit existing posts.
// The dashboard is accessible only to users with the "author" or "admin" role.
// The code uses Next.js features like server-side rendering and session management with NextAuth.
// The dashboard also includes a welcome message and a brief description of the user's role.
