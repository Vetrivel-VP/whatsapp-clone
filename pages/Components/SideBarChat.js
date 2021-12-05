import { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import db from "./firebaseConfiguration";
import { useRouter } from "next/router";

function SideBarChat({ addNewChat, name, id }) {
  const [seed, setSeed] = useState(0);
  const [chatId, setChatid] = useState("");
  const [message, setMessage] = useState([]);
  const router = useRouter();
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));

    db.collection("chatRooms")
      .doc(id)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setMessage(snapshot.docs.map((doc) => doc.data()))
      );
  }, [chatId]);

  const createNewChat = () => {
    const chatName = prompt("Enter a new chat name");

    if (chatName) {
      // need to do some db coding
      db.collection("chatRooms").add({
        name: chatName,
      });
    }
  };

  const getChatData = (chatid) => {
    setChatid(chatid);
    router.push({
      asPath: "/",
      pathname: "/",
      query: {
        id: chatid,
      },
    });
  };

  return !addNewChat ? (
    <div
      className="flex p-5 cursor-pointer border-b border-searchBg hover:bg-appBg 
        duration-150"
      onClick={() => {
        getChatData(id);
      }}
    >
      <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
      <div className="ml-3">
        <h2 className="text-[16px]">{name}</h2>
        <p className="text-[12px] text-gray-500">
          {/* Last Message... */}
          {message[0]?.message}
        </p>
      </div>
    </div>
  ) : (
    <div
      className="flex p-5 cursor-pointer border-b border-searchBg hover:bg-appBg 
      duration-150"
      onClick={createNewChat}
    >
      <h2>Add New Chat</h2>
    </div>
  );
}

export default SideBarChat;
