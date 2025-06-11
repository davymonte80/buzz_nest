"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { PostCard } from "@/components/post-card";
import { Search, BookOpen } from "lucide-react";
import type { Post } from "@/lib/types";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(searchQuery)}`
      );
      if (response.ok) {
        const data = await response.json();
        setResults(data.posts);
      }
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      handleSearch(query);
    }, 300);

    return () => clearTimeout(delayedSearch);
  }, [query]);

  return (
    <div className="container py-8 lg:py-12">
      <div className="space-y-4 mb-12">
        <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
          Search Posts
        </h1>
        <p className="text-xl text-muted-foreground">
          Find the content you&apos;re looking for across all categories.
        </p>
      </div>

      <div className="max-w-2xl mb-12">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search for posts..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 h-12 text-lg"
          />
        </div>
      </div>

      {isLoading && (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Searching...</p>
        </div>
      )}

      {results.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-8">
            Search Results ({results.length})
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      )}

      {query && !isLoading && results.length === 0 && (
        <div className="text-center py-16 rounded-lg border bg-muted/30">
          <BookOpen className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No posts found</h3>
          <p className="text-muted-foreground">
            No posts found for &#34;{query}&#34;. Try different keywords.
          </p>
        </div>
      )}
    </div>
  );
}
