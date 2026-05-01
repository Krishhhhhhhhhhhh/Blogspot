import { Link } from "react-router-dom";
import type { Blog } from "../types";

interface BlogCardProps {
  blog: Blog;
}

export const BlogCard = ({ blog }: BlogCardProps) => {
  return (
    <Link to={`/blog/${blog.id}`}>
      <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{blog.title}</h2>
        <p className="text-gray-600 mb-4 line-clamp-2">
          {blog.content}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">
            By {blog.author?.name || "Unknown"}
          </span>
          <span className="text-blue-600 font-medium hover:underline">
            Read more →
          </span>
        </div>
      </div>
    </Link>
  );
};
