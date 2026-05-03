const BASE_URL = import.meta.env.VITE_API_URL as string;

export const getToken = (): string | null => {
  return localStorage.getItem("token");
};

export const setToken = (token: string): void => {
  localStorage.setItem("token", token);
};

export const removeToken = (): void => {
  localStorage.removeItem("token");
};

interface FetchOptions extends Omit<RequestInit, 'body'> {
  requiresAuth?: boolean;
  body?: BodyInit | object | null;
}

export const apiFetch = async <T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> => {
  const { requiresAuth = false, method = 'GET', body, ...restOptions } = options;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(restOptions.headers as Record<string, string>),
  };

  if (requiresAuth) {
    const token = getToken();
    if (!token) {
      throw new Error("No authentication token found");
    }
    headers["Authorization"] = `Bearer ${token}`;
  }

  // Prepare the request body
  let finalBody: any = undefined;
  if (body) {
    if (typeof body === 'string') {
      finalBody = body;
    } else if (typeof body === 'object') {
      finalBody = JSON.stringify(body);
    }
  }

  const fetchConfig: RequestInit = {
    method,
    ...restOptions,
    headers,
  };

  if (finalBody) {
    fetchConfig.body = finalBody;
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, fetchConfig);

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }

  return response.json() as Promise<T>;
};

// Auth API calls
export const signup = async (data: {
  name: string;
  username: string;
  password: string;
}): Promise<{ jwt: string }> => {
  return apiFetch("/api/v1/user/signup", {
    method: "POST",
    body: data,
  });
};

export const signin = async (data: {
  username: string;
  password: string;
}): Promise<{ jwt: string }> => {
  return apiFetch("/api/v1/user/signin", {
    method: "POST",
    body: data,
  });
};

// Blog API calls
export const getAllBlogs = async (): Promise<{ blogs: Array<any> }> => {
  return apiFetch("/api/v1/blog/bulk", {
    method: "GET",
  });
};

export const getBlogById = async (id: string): Promise<{ blog: any }> => {
  return apiFetch(`/api/v1/blog/${id}`, {
    method: "GET",
  });
};

export const createBlog = async (data: {
  title: string;
  content: string;
}): Promise<{ id: string }> => {
  return apiFetch("/api/v1/blog", {
    method: "POST",
    body: data,
    requiresAuth: true,
  });
};
