import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { posts, users, comments } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { formatDate, getReadingTime } from "@/lib/utils";
import { Comments } from "@/components/comments";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { generateSEO } from "@/lib/seo";
import { Calendar, Clock, Tag } from "lucide-react";
import type { Metadata } from "next";

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function getPost(slug: string) {
  const post = await db
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
    .where(and(eq(posts.slug, slug), eq(posts.status, "published")))
    .limit(1);

  return post[0] || null;
}

async function getPostComments(postId: string) {
  return await db
    .select()
    .from(comments)
    .where(eq(comments.postId, postId))
    .orderBy(comments.createdAt);
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return {};
  }

  return generateSEO({
    title: post.title,
    description: post.excerpt || `Read ${post.title} on BuzzNest`,
    image: post.coverImage || undefined,
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/posts/${post.slug}`,
    type: "article",
    publishedTime: post.publishedAt?.toISOString(),
    authors: [post.author.name || "Anonymous"],
  });
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const postComments = await getPostComments(post.id);
  const readingTime = getReadingTime(post.content);

  return (
    <article className="container max-w-4xl py-8 lg:py-12">
      {/* Post Header */}
      <header className="space-y-6 mb-8">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Tag className="h-3 w-3" />
            <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary capitalize">
              {post.category}
            </span>
          </div>
          <span>•</span>
          <div className="flex items-center space-x-1">
            <Calendar className="h-3 w-3" />
            <time dateTime={post.publishedAt?.toISOString()}>
              {post.publishedAt
                ? formatDate(post.publishedAt)
                : formatDate(post.createdAt)}
            </time>
          </div>
          <span>•</span>
          <div className="flex items-center space-x-1">
            <Clock className="h-3 w-3" />
            <span>{readingTime} min read</span>
          </div>
        </div>

        <h1 className="text-4xl font-bold leading-tight lg:text-5xl">
          {post.title}
        </h1>

        <div className="flex items-center space-x-4">
          <Avatar className="h-12 w-12">
            <AvatarImage
              src={post.author.image || ""}
              alt={post.author.name || ""}
            />
            <AvatarFallback>
              {post.author.name?.charAt(0).toUpperCase() || "A"}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{post.author.name}</p>
            <p className="text-sm text-muted-foreground">Author</p>
          </div>
        </div>
      </header>

      {/* Cover Image */}
      {post.coverImage && (
        <div className="mb-8 overflow-hidden rounded-xl">
          <Image
            src={post.coverImage || "/placeholder.svg?height=600&width=1200"}
            alt={post.title}
            width={1200}
            height={600}
            className="w-full object-cover"
            priority
          />
        </div>
      )}

      {/* Post Content */}
      <div
        className="prose prose-gray max-w-none dark:prose-invert prose-headings:font-bold prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Comments Section */}
      <div className="mt-16 border-t pt-12">
        <Comments postId={post.id} comments={postComments} />
      </div>
    </article>
  );
}
