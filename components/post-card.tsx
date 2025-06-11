import Link from "next/link";
import Image from "next/image";
import { formatDate, getReadingTime } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, Calendar } from "lucide-react";
import type { Post } from "@/lib/types";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const readingTime = getReadingTime(post.content);

  return (
    <article className="group relative overflow-hidden rounded-xl border bg-card transition-all hover:shadow-lg">
      {post.coverImage && (
        <Link href={`/posts/${post.slug}`}>
          <div className="aspect-[16/9] overflow-hidden">
            <Image
              src={post.coverImage || "/placeholder.svg?height=400&width=600"}
              alt={post.title}
              width={600}
              height={400}
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
            />
          </div>
        </Link>
      )}

      <div className="p-6 space-y-4">
        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
          <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary capitalize">
            {post.category}
          </span>
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

        <div className="space-y-2">
          <h2 className="text-xl font-bold leading-tight line-clamp-2">
            <Link
              href={`/posts/${post.slug}`}
              className="hover:text-primary transition-colors"
            >
              {post.title}
            </Link>
          </h2>
          {post.excerpt && (
            <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed">
              {post.excerpt}
            </p>
          )}
        </div>

        <div className="flex items-center space-x-3 pt-2">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={post.author.image || ""}
              alt={post.author.name || ""}
            />
            <AvatarFallback>
              {post.author.name?.charAt(0).toUpperCase() || "A"}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">{post.author.name}</p>
            <p className="text-xs text-muted-foreground">Author</p>
          </div>
        </div>
      </div>
    </article>
  );
}
