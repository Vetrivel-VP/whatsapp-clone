import {
  AttachFile,
  InsertEmoticon,
  Mic,
  MoreVert,
  Phone,
  Send,
  Videocam,
} from "@mui/icons-material";
import { useStateValue } from "./StateProvider";
import { Avatar, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import db from "./firebaseConfiguration";
import firebase from "firebase/compat/app";

function Chat({ id }) {
  const [input, setInput] = useState("");
  const [seed, setSeed] = useState(0);
  const [chatId, setChatid] = useState(id);
  const [roomName, SetRoomName] = useState("");
  const [message, setMessage] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
    if (id) {
      setChatid(id);
      db.collection("chatRooms")
        .doc(id)
        .onSnapshot((snapshot) => SetRoomName(snapshot.data().name));

      db.collection("chatRooms")
        .doc(chatId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessage(snapshot.docs.map((doc) => doc.data()))
        );
      console.log(roomName);
    }
  }, [id]);

  const sendMessage = (e) => {
    e.preventDefault();
    console.log(`your message >> ${input}`);

    db.collection("chatRooms").doc(chatId).collection("messages").add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };

  return (
    <div className="flex-[0.65] flex flex-col">
      {/* Chat Header */}
      <div className="p-4 flex items-center border-b border-gray-300">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />

        <div className="flex-1 ml-3">
          <h3 className="text-[16px] font-bold">{roomName}</h3>
          <p className="text-[12px] text-gray-500">
            {/* Last seen ... */}
            {new Date(
              message[message.length - 1]?.timestamp?.toDate()
            ).toUTCString()}
          </p>
        </div>

        <div>
          <IconButton className="md:mr-[1vw] lg:mr-[2vw]">
            <Videocam className=" text-[24px]" />
          </IconButton>

          <IconButton className="md:mr-[1vw] lg:mr-[2vw]">
            <Phone className=" text-[24px]" />
          </IconButton>

          <IconButton className="md:mr-[1vw] lg:mr-[2vw]">
            <MoreVert className=" text-[24px]" />
          </IconButton>
        </div>
      </div>
      {/* Chat Body */}
      <div
        className="flex-1 bg-chat-wallpaper bg-no-repeat bg-center bg-cover 
      overflow-y-scroll scrollbar-thin scrollbar-thumb-appBg p-7"
      >
        {message &&
          message.map((msg, index) => (
            <p
              className={` relative text-[16px] p-2 rounded-lg bg-white w-[fit-content] mb-6 ${
                msg.name === user.displayName && `ml-auto bg-chatReciever`
              }
            
        `}
              key={index}
            >
              <span className="absolute top-[-18px] left-1 text-[12px] font-bold">
                {msg.name}
              </span>
              {msg.message}
              <span className="ml-2 text-[10px] font-bold text-gray-500">
                {new Date(msg.timestamp?.toDate()).toUTCString()}
              </span>
            </p>
          ))}
      </div>
      {/* Chat footer */}

      <div className="flex items-center justify-between h-[62px] border-t border-gray-300 px-2">
        <IconButton className="md:mr-[1vw] lg:mr-[2vw]">
          <InsertEmoticon className=" text-gray-500" />
        </IconButton>
        <IconButton className="md:mr-[1vw] lg:mr-[2vw]">
          <AttachFile className=" text-gray-500" />
        </IconButton>
        <form action="" className="flex-1 flex">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
            type="text"
            className="flex-1 rounded-[30px] p-2 border-none outline-none mx-1"
          />
          <button className="hidden" onClick={sendMessage}>
            Send a message
          </button>
        </form>
        <IconButton className="md:mr-[1vw] lg:mr-[2vw] ">
          <Mic className=" text-gray-500" />
        </IconButton>
      </div>
    </div>
  );
}

export default Chat;
