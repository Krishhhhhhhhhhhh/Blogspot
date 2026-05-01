import { ChangeEvent, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({ label, error, value, onChange, ...props }: InputProps) => {
  return (
    <div className="mt-4">
      {label && (
        <label className="block mb-2.5 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        value={value}
        onChange={onChange}
        className={`block w-full px-3 py-2.5 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        {...props}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};
