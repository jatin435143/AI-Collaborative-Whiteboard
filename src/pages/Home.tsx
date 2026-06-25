/**
 * Home page — entry point to create or join a room.
 * TODO: Add room creation and join form.
 */
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-3xl font-bold">AI Collaborative Whiteboard</h1>
      <p className="text-gray-600">Create or join a room to start drawing.</p>
      <Link
        to="/room/demo"
        className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
      >
        Open Demo Room
      </Link>
    </div>
  );
}
