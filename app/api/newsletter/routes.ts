import { type NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { newsletter } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const existingSubscription = await db
      .select()
      .from(newsletter)
      .where(eq(newsletter.email, email))
      .limit(1);

    if (existingSubscription.length > 0) {
      return NextResponse.json(
        { error: "Email already subscribed" },
        { status: 400 }
      );
    }

    const [newSubscription] = await db
      .insert(newsletter)
      .values({
        email,
        subscribed: true,
      })
      .returning();

    return NextResponse.json(newSubscription, { status: 201 });
  } catch (error) {
    console.error("Error subscribing to newsletter:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
