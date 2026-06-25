/**
 * Toolbar component — room actions (export, clear, AI tools, etc.).
 * TODO: Add action buttons and wire to whiteboard.
 */
interface ToolbarProps {
  roomId: string;
}

export default function Toolbar({ roomId }: ToolbarProps) {
  return (
    <div className="flex items-center justify-between border-b bg-white px-4 py-3">
      <span className="text-sm text-gray-600">
        Room: <strong>{roomId}</strong>
      </span>
      {/* TODO: Add toolbar buttons */}
    </div>
  );
}
