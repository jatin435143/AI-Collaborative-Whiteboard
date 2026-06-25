import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const [name, setName] = useState(
    localStorage.getItem("username") || ""
  );

  const joinRoom = () => {
    if (!name.trim()) {
      alert("Please enter your name");
      return;
    }

    localStorage.setItem("username", name);

    navigate("/room/demo");
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f4f4f4",
      }}
    >
      <div
        style={{
          width: 420,
          background: "white",
          padding: 30,
          borderRadius: 10,
          boxShadow: "0 5px 20px rgba(0,0,0,0.15)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: 15,
          }}
        >
          AI Collaborative Whiteboard
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#666",
            marginBottom: 25,
          }}
        >
          Enter your name to join the collaboration.
        </p>

        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            width: "100%",
            padding: 12,
            fontSize: 16,
            marginBottom: 20,
            borderRadius: 6,
            border: "1px solid #ccc",
            boxSizing: "border-box",
          }}
        />

        <button
          onClick={joinRoom}
          style={{
            width: "100%",
            padding: 12,
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: 6,
            fontSize: 16,
            cursor: "pointer",
          }}
        >
          Join Demo Room
        </button>
      </div>
    </div>
  );
}