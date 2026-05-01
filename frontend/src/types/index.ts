// Auth Types
export interface SignupInput {
  name: string;
  username: string;
  password: string;
}

export interface SigninInput {
  username: string;
  password: string;
}

export interface AuthResponse {
  jwt: string;
}

// Blog Types
export interface Blog {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
  };
}

export interface CreateBlogInput {
  title: string;
  content: string;
}

// API Response Types
export interface ApiResponse<T> {
  success?: boolean;
  data?: T;
  error?: string;
}

// User Context
export interface AuthContextType {
  token: string | null;
  isLoading: boolean;
  signin: (input: SigninInput) => Promise<void>;
  signup: (input: SignupInput) => Promise<void>;
  logout: () => void;
}
