import { ref } from "vue";

const BASE_URL: string =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

type FetchOptions<B = unknown> = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: B;
  headers?: Record<string, string>;
};

export function useFetch<T = unknown, B = unknown>(baseUrl: string = BASE_URL) {
  const data = ref<T | null>(null);
  const error = ref<string | null>(null);
  const loading = ref(false);

  const request = async (
    endpoint: string,
    options: FetchOptions<B> = {}
  ): Promise<T> => {
    loading.value = true;
    error.value = null;

    try {
      const res = await fetch(`${baseUrl}${endpoint}`, {
        method: options.method || "GET",
        headers: {
          "Content-Type": "application/json",
          ...(options.headers || {}),
        },
        body: options.body ? JSON.stringify(options.body) : undefined,
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        throw new Error(errData?.message || `HTTP error ${res.status}`);
      }
      const json: T = await res.json();
      data.value = json;
      return json;
    } catch (err: any) {
      error.value = err.message || "Unknown error";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const get = (endpoint: string) => request(endpoint, { method: "GET" });
  const post = (endpoint: string, body: B) =>
    request(endpoint, { method: "POST", body });

  return { data, error, loading, get, post };
}
