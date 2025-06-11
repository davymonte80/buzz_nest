import { type NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { comments } from "@/lib/db/schema";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { content, authorName, authorEmail, postId, parentId } = body;

    if (!content || !authorName || !authorEmail || !postId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const [newComment] = await db
      .insert(comments)
      .values({
        content,
        authorName,
        authorEmail,
        postId,
        parentId: parentId || null,
        approved: false,
      })
      .returning();

    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
