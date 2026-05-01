import { useState, ChangeEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { AppBar } from "../components/AppBar";
import type { SigninInput } from "../types";

export const Signin = () => {
  const navigate = useNavigate();
  const { signin, isLoading, error: authError } = useAuth();
  const [formData, setFormData] = useState<SigninInput>({
    username: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange =
    (field: keyof SigninInput) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.username.trim()) {
      setError("Email/Username is required");
      return;
    }
    if (!formData.password.trim()) {
      setError("Password is required");
      return;
    }

    try {
      await signin(formData);
      navigate("/blogs");
    } catch {
      // Error is already handled by useAuth
    }
  };

  const displayError = error || authError;

  return (
    <>
      <AppBar />
      <div className="min-h-[calc(100vh-80px)] flex justify-center flex-col">
        <div className="flex justify-center">
          <div className="w-full max-w-md px-4">
            <div className="text-3xl font-extrabold mb-2">Welcome Back</div>

            <div className="text-slate-400 mb-6">
              Don't have an account?
              <Link className="pl-2 underline text-blue-600" to="/signup">
                Sign up
              </Link>
            </div>

            <form onSubmit={handleSubmit}>
              {displayError && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                  {displayError}
                </div>
              )}

              <Input
                label="Email or Username"
                type="text"
                placeholder="krishna@example.com"
                value={formData.username}
                onChange={handleChange("username")}
              />

              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange("password")}
              />

              <Button
                type="submit"
                isLoading={isLoading}
                className="w-full mt-6"
              >
                Sign in
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}