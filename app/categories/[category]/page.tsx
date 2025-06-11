import { notFound } from "next/navigation"
import { db } from "@/lib/db"
import { posts, users } from "@/lib/db/schema"
import { eq, and, desc } from "drizzle-orm"
import { PostCard } from "@/components/post-card"
import { generateSEO } from "@/lib/seo"
import { BookOpen } from "lucide-react"
import type { Metadata } from "next"

const validCategories = ["technology", "lifestyle", "health", "finance", "food", "gadgets", "parenting"] as const

interface CategoryPageProps {
  params: Promise<{
    category: string
  }>
}

async function getCategoryPosts(category: string) {
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
    .where(and(eq(posts.category, category as any), eq(posts.status, "published")))
    .orderBy(desc(posts.publishedAt))
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params

  if (!validCategories.includes(category as any)) {
    return {}
  }

  const categoryName = category.charAt(0).toUpperCase() + category.slice(1)

  return generateSEO({
    title: `${categoryName} Posts - BuzzNest`,
    description: `Discover the latest ${categoryName.toLowerCase()} posts and insights on BuzzNest`,
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/categories/${category}`,
  })
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params

  if (!validCategories.includes(category as any)) {
    notFound()
  }

  const categoryPosts = await getCategoryPosts(category)
  const categoryName = category.charAt(0).toUpperCase() + category.slice(1)

  return (
    <div className="container py-8 lg:py-12">
      <div className="space-y-4 mb-12">
        <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">{categoryName}</h1>
        <p className="text-xl text-muted-foreground">
          Explore our latest {categoryName.toLowerCase()} posts and insights.
        </p>
      </div>

      {categoryPosts.length > 0 ? (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {categoryPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 rounded-lg border bg-muted/30">
          <BookOpen className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No {categoryName.toLowerCase()} posts available yet</h3>
          <p className="text-muted-foreground">Check back soon for amazing content!</p>
        </div>
      )}
    </div>
  )
}
