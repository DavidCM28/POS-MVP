export type ApiClientConfig = {
  baseUrl: string;
  headers?: HeadersInit;
};

export type ApiErrorPayload = {
  message: string;
  status: number;
  details?: unknown;
};

export class ApiError extends Error {
  readonly status: number;
  readonly details?: unknown;

  constructor(payload: ApiErrorPayload) {
    super(payload.message);
    this.name = "ApiError";
    this.status = payload.status;
    this.details = payload.details;
  }
}

export class HttpClient {
  constructor(private readonly config: ApiClientConfig) {}

  async get<TResponse>(path: string, init?: RequestInit) {
    return this.request<TResponse>(path, { ...init, method: "GET" });
  }

  async post<TResponse, TBody>(path: string, body: TBody, init?: RequestInit) {
    return this.request<TResponse>(path, {
      ...init,
      body: JSON.stringify(body),
      method: "POST",
    });
  }

  async put<TResponse, TBody>(path: string, body: TBody, init?: RequestInit) {
    return this.request<TResponse>(path, {
      ...init,
      body: JSON.stringify(body),
      method: "PUT",
    });
  }

  async delete<TResponse>(path: string, init?: RequestInit) {
    return this.request<TResponse>(path, { ...init, method: "DELETE" });
  }

  private async request<TResponse>(path: string, init: RequestInit) {
    const response = await fetch(`${this.config.baseUrl}${path}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...this.config.headers,
        ...init.headers,
      },
    });

    if (!response.ok) {
      let details: unknown;

      try {
        details = await response.json();
      } catch {
        details = await response.text();
      }

      throw new ApiError({
        message: "No se pudo completar la solicitud",
        status: response.status,
        details,
      });
    }

    if (response.status === 204) {
      return undefined as TResponse;
    }

    return (await response.json()) as TResponse;
  }
}

export const apiClient = new HttpClient({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL ?? "/api",
});
