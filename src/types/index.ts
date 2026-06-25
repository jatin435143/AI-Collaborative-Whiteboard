/**
 * Shared TypeScript types used across the frontend.
 */

export interface Board {
  _id: string;
  roomId: string;
  elements: unknown[];
  appState: Record<string, unknown>;
  updatedAt: string;
}

export interface Room {
  id: string;
  name: string;
}
