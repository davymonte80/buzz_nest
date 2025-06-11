import { type NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { posts, users } from "@/lib/db/schema";
import { eq, and, or, ilike } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");

    if (!query) {
      return NextResponse.json({ posts: [] });
    }

    const searchResults = await db
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
      .where(
        and(
          eq(posts.status, "published"),
          or(
            ilike(posts.title, `%${query}%`),
            ilike(posts.content, `%${query}%`),
            ilike(posts.excerpt, `%${query}%`)
          )
        )
      )
      .limit(20);

    return NextResponse.json({ posts: searchResults });
  } catch (error) {
    console.error("Error searching posts:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
