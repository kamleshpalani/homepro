import * as SecureStore from "expo-secure-store";

const API_URL = "http://localhost:4000"; // reuse same backend (MongoDB) as web
const TOKEN_KEY = "HOMECAREPRO_CUSTOMER_TOKEN";

let authToken: string | null = null;

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export async function setAuthToken(token: string | null) {
  authToken = token;
  if (token) {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
  } else {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
  }
}

export async function loadStoredToken() {
  authToken = await SecureStore.getItemAsync(TOKEN_KEY);
  return authToken;
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = authToken || (await SecureStore.getItemAsync(TOKEN_KEY));

  const res = await fetch(`${API_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
    ...options,
  });

  const data = await res.json().catch(() => ({} as T));
  if (!res.ok) {
    const message = (data as any)?.message || "Request failed";
    throw new Error(message);
  }
  return data as T;
}

export const api = {
  login: (payload: { email: string; password: string }) =>
    request<{ token: string; user: any }>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  profile: () => request<any>("/api/auth/profile"),
  bookings: () => request<any[]>("/api/auth/bookings"),
  createBooking: (payload: any) =>
    request<{ message: string; bookingId?: string }>("/api/bookings", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  applyCleaner: (payload: any) =>
    request<{ message: string }>("/api/cleaners/apply", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
};

export { API_URL, TOKEN_KEY };
