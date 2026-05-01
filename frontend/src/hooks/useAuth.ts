import { useState, useCallback } from "react";
import { signin as apiSignin, signup as apiSignup, setToken, removeToken, getToken } from "../utils/api";
import type { SignupInput, SigninInput } from "../types";

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signin = useCallback(async (input: SigninInput) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiSignin(input);
      setToken(response.jwt);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Signin failed";
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signup = useCallback(async (input: SignupInput) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiSignup(input);
      setToken(response.jwt);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Signup failed";
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    removeToken();
  }, []);

  return {
    signin,
    signup,
    logout,
    isLoading,
    error,
    token: getToken(),
  };
};
