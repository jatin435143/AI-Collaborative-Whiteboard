import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Toolbar from "../components/Toolbar";
import Whiteboard from "../components/Whiteboard";
import UserList from "../components/UserList";

import { getSocket } from "../services/socket";
import type { User } from "../types/User";

export default function Room() {
  const { roomId } = useParams();

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    if (!roomId) return;

    const socket = getSocket();

    const joinRoom = () => {
      const username =
        localStorage.getItem("username") || "Anonymous";

      socket.emit("join-room", {
        roomId,
        name: username,
      });
    };

    const handleUsersUpdated = (users: User[]) => {
      console.log(users);

      setUsers(users);
    };

    socket.on("connect", joinRoom);

    socket.on("users-updated", handleUsersUpdated);

    if (socket.connected) {
      joinRoom();
    } else {
      socket.connect();
    }

    return () => {
      socket.off("connect", joinRoom);
      socket.off("users-updated", handleUsersUpdated);
    };
  }, [roomId]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Toolbar roomId={roomId || ""} />

      <div
        style={{
          flex: 1,
          display: "flex",
        }}
      >
        <div
          style={{
            flex: 1,
          }}
        >
          <Whiteboard roomId={roomId || ""} />
        </div>

        <UserList users={users} />
      </div>
    </div>
  );
}