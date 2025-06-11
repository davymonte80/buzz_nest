import { db } from "@/lib/db";
import { posts, users } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { PostCard } from "@/components/post-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, TrendingUp, Users, BookOpen } from "lucide-react";

async function getFeaturedPosts() {
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
    .where(eq(posts.status, "published"))
    .orderBy(desc(posts.publishedAt))
    .limit(6);
}

export default async function HomePage() {
  const featuredPosts = await getFeaturedPosts();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container py-16 lg:py-24">
          <div className="mx-auto max-w-4xl text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
                Welcome to{" "}
                <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  BuzzNest
                </span>
              </h1>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl leading-relaxed">
                Your go-to source for the latest insights on technology,
                lifestyle, health, finance, and more. Discover stories that
                matter, written by experts in their fields.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/categories">
                <Button size="lg" className="w-full sm:w-auto">
                  Explore Categories
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/search">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  Search Posts
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-lg bg-primary/10">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <div className="text-2xl font-bold">1000+</div>
                <div className="text-sm text-muted-foreground">
                  Articles Published
                </div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-lg bg-primary/10">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div className="text-2xl font-bold">50K+</div>
                <div className="text-sm text-muted-foreground">
                  Monthly Readers
                </div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-lg bg-primary/10">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <div className="text-2xl font-bold">95%</div>
                <div className="text-sm text-muted-foreground">
                  Reader Satisfaction
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="container py-16 lg:py-24">
        <div className="flex items-center justify-between mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Latest Posts</h2>
            <p className="text-muted-foreground">
              Discover our most recent articles and insights
            </p>
          </div>
          <Link href="/posts">
            <Button variant="ghost" className="hidden sm:flex">
              View all posts
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        {featuredPosts.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featuredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 rounded-lg border bg-muted/30">
            <BookOpen className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              No posts available yet
            </h3>
            <p className="text-muted-foreground">
              Check back soon for amazing content!
            </p>
          </div>
        )}

        <div className="text-center mt-12 sm:hidden">
          <Link href="/posts">
            <Button variant="outline">
              View all posts
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-muted/30">
        <div className="container py-16 lg:py-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Browse by Category
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our diverse range of topics and find content that
              interests you most
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                name: "Technology",
                slug: "technology",
                description: "Latest tech trends and innovations",
                icon: "💻",
              },
              {
                name: "Lifestyle",
                slug: "lifestyle",
                description: "Tips for better living",
                icon: "🌟",
              },
              {
                name: "Health",
                slug: "health",
                description: "Wellness and health advice",
                icon: "🏥",
              },
              {
                name: "Finance",
                slug: "finance",
                description: "Money management tips",
                icon: "💰",
              },
              {
                name: "Food",
                slug: "food",
                description: "Recipes and food culture",
                icon: "🍳",
              },
              {
                name: "Gadgets",
                slug: "gadgets",
                description: "Latest gadget reviews",
                icon: "📱",
              },
              {
                name: "Parenting",
                slug: "parenting",
                description: "Parenting tips and advice",
                icon: "👶",
              },
            ].map((category) => (
              <Link
                key={category.slug}
                href={`/categories/${category.slug}`}
                className="group block p-6 rounded-xl border bg-card hover:shadow-lg transition-all hover:scale-105"
              >
                <div className="text-3xl mb-3">{category.icon}</div>
                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {category.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
