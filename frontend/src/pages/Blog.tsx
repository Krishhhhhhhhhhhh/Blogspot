import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { getBlogById } from "../utils/api";
import { AppBar } from "../components/AppBar";
import type { Blog as BlogType } from "../types";

export const Blog = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, error } = useFetch<{ blog: BlogType }>(
    () => {
      if (!id) throw new Error("Blog ID is required");
      return getBlogById(id);
    },
    [id]
  );

  if (!id) {
    return (
      <>
        <AppBar />
        <div className="flex justify-center items-center min-h-[calc(100vh-80px)]">
          <p className="text-red-600">Invalid blog ID</p>
        </div>
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        <AppBar />
        <div className="flex justify-center items-center min-h-[calc(100vh-80px)]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
            <p className="text-gray-600">Loading blog...</p>
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
            <p className="text-red-600 mb-4">Error loading blog: {error}</p>
            <button
              onClick={() => window.history.back()}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Go back
            </button>
          </div>
        </div>
      </>
    );
  }

  const blog = data?.blog;

  if (!blog) {
    return (
      <>
        <AppBar />
        <div className="flex justify-center items-center min-h-[calc(100vh-80px)]">
          <p className="text-gray-600">Blog not found</p>
        </div>
      </>
    );
  }

  return (
    <>
      <AppBar />
      <div className="max-w-3xl mx-auto px-4 py-8">
        <article>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{blog.title}</h1>

          <div className="mb-8 pb-8 border-b border-gray-200">
            <p className="text-gray-600">
              By <span className="font-semibold">{blog.author?.name || "Unknown"}</span>
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="whitespace-pre-wrap text-gray-800 leading-relaxed">
              {blog.content}
            </p>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <button
              onClick={() => window.history.back()}
              className="text-blue-600 hover:underline font-medium"
            >
              ← Back to blogs
            </button>
          </div>
        </article>
      </div>
    </>
  );
}