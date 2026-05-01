import { useState, useEffect } from "react";

interface UseFetchState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}

export const useFetch = <T,>(
  fetchFn: () => Promise<T>,
  dependencies: any[] = []
): UseFetchState<T> => {
  const [state, setState] = useState<UseFetchState<T>>({
    data: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setState((prev) => ({ ...prev, isLoading: true, error: null }));
        const result = await fetchFn();
        if (isMounted) {
          setState({
            data: result,
            isLoading: false,
            error: null,
          });
        }
      } catch (err) {
        if (isMounted) {
          const message = err instanceof Error ? err.message : "An error occurred";
          setState({
            data: null,
            isLoading: false,
            error: message,
          });
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, dependencies);

  return state;
};
