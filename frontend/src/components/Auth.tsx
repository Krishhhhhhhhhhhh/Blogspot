import { Link } from "react-router-dom";
import { useState, type ChangeEvent } from "react";
import { SignupInput } from "medium-commonjs-krishna";

type AuthType = "signup" | "signin";

export const Auth = ({ type }: { type: AuthType }) => {
  const [postInputs, setPostInputs] = useState<SignupInput>({
    name: "",
    username: "",
    password: "",
  });

  const handleChange =
    (field: keyof SignupInput) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      setPostInputs((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  const isSignup = type === "signup";

  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div className="w-80">
          <div className="text-3xl font-extrabold">
            {isSignup ? "Create an Account" : "Welcome Back"}
          </div>

          <div className="text-slate-400 mt-2">
            {isSignup ? "Already have an account?" : "Don't have an account?"}
            <Link
              className="pl-2 underline"
              to={isSignup ? "/signin" : "/signup"}
            >
              {isSignup ? "Login" : "Sign up"}
            </Link>
          </div>

          {isSignup && (
            <LabelledInput
              label="Name"
              placeholder="Krishna Pathak"
              onChange={handleChange("name")}
            />
          )}

          <LabelledInput
            label="Username"
            placeholder="krishna@gmail.com"
            onChange={handleChange("username")}
          />

          <LabelledInput
            label="Password"
            type="password"
            placeholder="••••••••"
            onChange={handleChange("password")}
          />
        </div>
      </div>
    </div>
  );
};

interface LabelledInputProps {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

function LabelledInput({
  label,
  placeholder,
  onChange,
  type = "text",
}: LabelledInputProps) {
  return (
    <div className="mt-4">
      <label className="block mb-2.5 text-sm font-medium text-heading">
        {label}
      </label>

      <input
        onChange={onChange}
        type={type}
        className="block w-full px-3 py-2.5 border rounded-md shadow-sm"
        placeholder={placeholder}
      />
    </div>
  );
}