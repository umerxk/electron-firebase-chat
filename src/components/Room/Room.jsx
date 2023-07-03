import ChatApp from "./ChatApp";
import { useState } from "react";
import "./RoomStyle.css";

const Room = () => {
  const [roomName, setRoomName] = useState("");
  const [enter, setEnter] = useState(false);

  const enterRoom = () => {
    setEnter(!enter);
  };

  const onInput = (event) => setRoomName(event.target.value);
  return (
    <>
      {!enter ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
            padding: "100px 420px 0px 420px",
          }}
        >
          <h1>Enter Room</h1>
          <input
            style={{ padding: 10, marginBottom: 4 }}
            value={roomName}
            onChange={onInput}
          />
          <button
            className="enter-button"
            style={{
              width: "50%",
              justifyContent: "center",
              alignSelf: "center",
              display: "flex",
            }}
            onClick={enterRoom}
          >
            Continue
          </button>
        </div>
      ) : (
        <ChatApp room={roomName} handleBack={enterRoom} />
      )}
    </>
  );
};
export default Room;
