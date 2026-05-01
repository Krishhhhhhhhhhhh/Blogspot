import { useFetch } from "../hooks/useFetch";
import { getAllBlogs } from "../utils/api";
import { BlogCard } from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { AppBar } from "../components/AppBar";
import type { Blog } from "../types";

export const Blogs = () => {
  const { data, isLoading, error } = useFetch<{ blogs: Blog[] }>(
    () => getAllBlogs(),
    []
  );

  if (isLoading) {
    return (
      <>
        <AppBar />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="mb-8 animate-pulse">
            <div className="h-10 bg-gray-200 rounded w-48 mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-32"></div>
          </div>
          <div className="grid gap-6">
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <AppBar />
        <div className="flex justify-center items-center min-h-[calc(100vh-80px)]">
          <div className="text-center">
            <p className="text-red-600 mb-4">Error loading blogs: {error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Try again
            </button>
          </div>
        </div>
      </>
    );
  }

  const blogs = data?.blogs || [];

  return (
    <>
      <AppBar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">All Blogs</h1>
          <p className="text-gray-600">
            {blogs.length} {blogs.length === 1 ? "blog" : "blogs"} found
          </p>
        </div>

        {blogs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">No blogs found yet.</p>
            <p className="text-gray-500">Be the first to create one!</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {blogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};
