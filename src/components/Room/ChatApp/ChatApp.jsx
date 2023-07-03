import { useEffect, useState, useRef } from "react";
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "../../../firebase-configs/configs";
import "./Style.css";

const ChatApp = ({ room, handleBack }) => {
  const [msg, setMsg] = useState("");
  const [allMsgs, setAllMsgs] = useState([]);
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const msgRef = collection(db, "messages");
  const inpRef = useRef("");
  const chatContainerRef = useRef(null);

  useEffect(() => {
    try {
      const queryMsg = query(
        msgRef,
        where("room", "==", room),
        orderBy("createdAt")
      );
      onSnapshot(queryMsg, (snapshot) => {
        let msgs = [];
        snapshot.forEach((doc) => {
          msgs.push({ ...doc.data(), id: doc.id });
        });
        setAllMsgs(msgs);
      });
    } catch (err) {}
  }, []);

  const convertDate = (createdAtObject) => {
    if (!createdAtObject) return "";
    const createdAtDate = new Date(
      createdAtObject.seconds * 1000 + createdAtObject.nanoseconds / 1000000
    );
    const readableDate = createdAtDate.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });

    return readableDate;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    const msgObj = {
      text: msg,
      createdAt: serverTimestamp(),
      user: userDetails.fullName,
      room,
      userId: userDetails.userId,
    };
    await addDoc(msgRef, msgObj);
  };

  useEffect(() => {
    if (inpRef.current) {
      inpRef.current.focus();
    }
  }, []);

  useEffect(() => {
    scrollToLatestMessage();
  }, [allMsgs]);

  const scrollToLatestMessage = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
    <div style={{ marginLeft: 200 }}>
    <h1 >Room {room}</h1>
      <p style={{ cursor: "pointer" }} onClick={handleBack}>Go back</p>
    </div>
   
      <div className="chat-container">
        <div className="messages">
          {allMsgs.map((message, index) => (
            <div
              className={`message ${
                message.userId === userDetails?.userId
                  ? "align-right"
                  : "align-left"
              } `}
              key={index}
            >
              <span style={{ color: "purple" }}>{message.user}</span>
              <br />
              <span style={{ color: "black" }}>{message.text}</span>
              <br />
              <span style={{ color: "gray", fontSize: 10 }}>
                {convertDate(message.createdAt)}
              </span>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <input
              type="text"
              value={msg}
              className="chat-input"
              onChange={(e) => setMsg(e.target.value)}
              placeholder="Type your message..."
              ref={inpRef}
              style={{ width: 20 }}
            />
            <button type="button" className="chat-button">
              Send
            </button>
          </div>
        </form>
        <div ref={chatContainerRef} id="last" />
      </div>
    </>
  );
};
export default ChatApp;
