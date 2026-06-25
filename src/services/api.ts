/**
 * API service — HTTP calls to the Express backend.
 * TODO: Add board save/load and AI endpoints.
 */
const API_URL = import.meta.env.VITE_API_URL ?? '/api';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json() as Promise<T>;
}

export const api = {
  getBoard: (boardId: string) => request(`/boards/${boardId}`),
  saveBoard: (boardId: string, data: unknown) =>
    request(`/boards/${boardId}`, { method: 'PUT', body: JSON.stringify(data) }),
};
