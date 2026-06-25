import type { Cursor } from "../types/Cursor";

interface Props {
  cursors: Cursor[];
}

export default function CursorLayer({ cursors }: Props) {
  return (
    <>
      {cursors.map((cursor) => (
        <div
          key={cursor.id}
          style={{
            position: "absolute",
            left: cursor.x,
            top: cursor.y,
            transform: "translate(10px,10px)",
            pointerEvents: "none",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              color: cursor.color,
              fontWeight: "bold",
              fontSize: 14,
            }}
          >
            🖱 {cursor.name}
          </div>
        </div>
      ))}
    </>
  );
}