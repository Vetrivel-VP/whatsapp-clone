import { useState, useEffect } from "react";

import { Avatar } from "@mui/material";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import ChatIcon from "@mui/icons-material/Chat";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { IconButton } from "@mui/material";
import { SearchOutlined } from "@mui/icons-material";
import SideBarChat from "./SideBarChat";
import db from "./firebaseConfiguration";
import { useStateValue } from "./StateProvider";

function SideBar() {
  const [{ user }, dispatch] = useStateValue();
  const [room, setRoom] = useState([]);
  useEffect(() => {
    const unsubscribe = db.collection("chatRooms").onSnapshot((snapshot) => {
      setRoom(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="flex flex-col flex-[0.35]">
      {/* Sidebar header */}
      <div className="flex justify-between items-center p-4 border-r border-gray-300">
        <Avatar className="text-[30px]" src={user?.photoURL} />

        <div className="flex items-center justify-between min-w-[10vw]">
          <IconButton className="md:mr-[1vw] lg:mr-[2vw]">
            <DonutLargeIcon className=" text-[24px]" />
          </IconButton>

          <IconButton className="md:mr-[1vw] lg:mr-[2vw]">
            <ChatIcon className=" text-[24px]" />
          </IconButton>

          <IconButton className="md:mr-[1vw] lg:mr-[2vw]">
            <MoreHorizIcon className="text-[24px]" />
          </IconButton>
        </div>
      </div>

      {/* sidebar seach  */}
      <div className="flex items-center  p-[8px] bg-searchBg">
        <div className="flex items-center bg-white w-full h-[35px] rounded-2xl ">
          <SearchOutlined className="text-gray-500 mx-1" />
          <input
            type="text"
            placeholder="search or start new chat"
            className="border-none outline-none ml-[5px] text-gray-600"
          />
        </div>
      </div>
      {/* sidebar chats */}

      <div className="flex-1 bg-white overflow-y-scroll scrollbar-thin scrollbar-thumb-appBg">
        <SideBarChat addNewChat />

        {room.map((n) => (
          <SideBarChat key={n.id} id={n.id} name={n.data.name} />
        ))}
      </div>
    </div>
  );
}

export default SideBar;
