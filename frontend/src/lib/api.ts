const BASE_URL = "http://127.0.0.1:8000/api";

export const getToken = () => localStorage.getItem("access");

export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
  const token = getToken();

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });

  if (!res.ok) throw new Error("API error");

  return res.json();
};
