import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import Constants from "expo-constants";

// Use environment variable or fallback to localhost
const API_URL =
  Constants.expoConfig?.extra?.apiUrl ||
  process.env.EXPO_PUBLIC_API_URL ||
  "http://localhost:4000";

const TOKEN_KEY = "HOMECAREPRO_CUSTOMER_TOKEN";

let authToken: string | null = null;

// Platform-aware storage helper
const storage = {
  async setItem(key: string, value: string) {
    if (Platform.OS === "web") {
      localStorage.setItem(key, value);
    } else {
      await SecureStore.setItemAsync(key, value);
    }
  },
  async getItem(key: string): Promise<string | null> {
    if (Platform.OS === "web") {
      return localStorage.getItem(key);
    } else {
      return await SecureStore.getItemAsync(key);
    }
  },
  async removeItem(key: string) {
    if (Platform.OS === "web") {
      localStorage.removeItem(key);
    } else {
      await SecureStore.deleteItemAsync(key);
    }
  },
};

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export async function setAuthToken(token: string | null) {
  authToken = token;
  if (token) {
    await storage.setItem(TOKEN_KEY, token);
  } else {
    await storage.removeItem(TOKEN_KEY);
  }
}

export async function loadStoredToken() {
  authToken = await storage.getItem(TOKEN_KEY);
  return authToken;
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = authToken || (await storage.getItem(TOKEN_KEY));

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
    request<{ success: boolean; message?: string; token: string; user: any }>(
      "/api/auth/login",
      {
        method: "POST",
        body: JSON.stringify(payload),
      }
    ).then(async (data) => {
      if (data.token) {
        await setAuthToken(data.token);
      }
      return data;
    }),

  signup: (payload: {
    firstName: string;
    lastName?: string;
    email: string;
    password: string;
    phone: string;
  }) =>
    request<{ success: boolean; message: string; token?: string; user?: any }>(
      "/api/auth/signup",
      {
        method: "POST",
        body: JSON.stringify(payload),
      }
    ),

  logout: async () => {
    await setAuthToken(null);
    return { success: true };
  },

  profile: () => request<any>("/api/auth/profile"),

  getBookings: () =>
    request<{ success: boolean; bookings: any[] }>("/api/bookings"),

  createBooking: (payload: any) =>
    request<{ success: boolean; message: string; bookingId?: string }>(
      "/api/bookings",
      {
        method: "POST",
        body: JSON.stringify(payload),
      }
    ),

  applyCleaner: (payload: any) =>
    request<{ success: boolean; message: string }>("/api/cleaners/apply", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  getCleaners: () =>
    request<{ success: boolean; cleaners: any[] }>("/api/cleaners"),

  updateCleanerStatus: (payload: { cleanerId: string; status: string }) =>
    request<{ success: boolean; message: string }>(
      `/api/admin/cleaners/${payload.cleanerId}/status`,
      {
        method: "PATCH",
        body: JSON.stringify({ status: payload.status }),
      }
    ),
};

export { API_URL, TOKEN_KEY };
