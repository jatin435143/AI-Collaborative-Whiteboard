// import { useParams } from "react-router-dom";
// import Toolbar from "../components/Toolbar";
// import Whiteboard from "../components/Whiteboard";

// export default function Room() {
//   const { roomId } = useParams();

//   return (
//     <div
//       style={{
//         height: "100vh",
//         display: "flex",
//         flexDirection: "column",
//       }}
//     >
//       <Toolbar roomId={roomId || ""} />

//       <div
//         style={{
//           flex: 1,
//         }}
//       >
//         <Whiteboard roomId={roomId || ""} />
//       </div>
//     </div>
//   );
// }






// import { Excalidraw } from "@excalidraw/excalidraw";
// import "@excalidraw/excalidraw/index.css";

// export default function Room() {
//   return (
//     <div
//       style={{
//         width: "100vw",
//         height: "100vh",
//       }}
//     >
//       <Excalidraw />
//     </div>
//   );
// }







import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSocket } from "../services/socket";

import Whiteboard from "../components/Whiteboard";
import Toolbar from "../components/Toolbar";

export default function Room() {
  const { roomId } = useParams();

  useEffect(() => {
    if (!roomId) return;
  
    const socket = getSocket();
  
    socket.on("connect", () => {
      console.log("Connected:", socket.id);
  
      socket.on("connect", () => {
          console.log("Connected", socket.id);
      
          socket.emit("join-room", roomId);
          socket.emit("ping-test", "Hello from " + socket.id);

          socket.on("ping-test", (msg) => {
              console.log("📩", msg);
          });
      });
    });
  
    return () => {
      socket.off("connect");
      socket.disconnect();
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

      <div style={{ flex: 1 }}>
        <Whiteboard roomId={roomId || ""} />
      </div>
    </div>
  );
}