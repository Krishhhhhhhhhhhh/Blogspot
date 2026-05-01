import { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { createBlog } from "../utils/api";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { AppBar } from "../components/AppBar";
import { ProtectedRoute } from "../components/ProtectedRoute";

interface PublishFormData {
  title: string;
  content: string;
}

export const Publish = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<PublishFormData>({
    title: "",
    content: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange =
    (field: keyof PublishFormData) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.title.trim()) {
      setError("Title is required");
      return;
    }
    if (!formData.content.trim()) {
      setError("Content is required");
      return;
    }

    setIsLoading(true);
    try {
      await createBlog({
        title: formData.title,
        content: formData.content,
      });
      navigate("/blogs");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to publish blog";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <>
        <AppBar />
        <div className="max-w-3xl mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Publish New Blog</h1>
            <p className="text-gray-600">Share your thoughts with the world</p>
          </div>

          <form onSubmit={handleSubmit}>
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}

            <Input
              label="Blog Title"
              type="text"
              placeholder="Enter your blog title"
              value={formData.title}
              onChange={handleChange("title")}
              required
            />

            <div className="mt-4">
              <label className="block mb-2.5 text-sm font-medium text-gray-700">
                Content
              </label>
              <textarea
                value={formData.content}
                onChange={handleChange("content")}
                placeholder="Write your blog content here..."
                rows={12}
                className="block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mt-6 flex gap-3">
              <Button
                type="submit"
                isLoading={isLoading}
              >
                Publish
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate("/blogs")}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </>
    </ProtectedRoute>
  );
};
