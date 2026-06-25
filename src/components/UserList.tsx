import type { User } from "../types/User";

interface Props {
  users: User[];
}

export default function UserList({ users }: Props) {
  return (
    <div
      style={{
        width: 220,
        background: "#ffffff",
        borderLeft: "1px solid #ddd",
        padding: 20,
        overflowY: "auto",
      }}
    >
      <h3 style={{ marginTop: 0 }}>
        Online Users ({users.length})
      </h3>

      {users.map((user) => (
        <div
          key={user.id}
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: 12,
            gap: 10,
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: user.color,
            }}
          />

          <span>{user.name}</span>
        </div>
      ))}
    </div>
  );
}