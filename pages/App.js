import { useState } from "react";
import Chat from "./Components/Chat";
import SideBar from "./Components/SideBar";
import Login from "./Components/Login";
import { useRouter } from "next/router";
import { useStateValue } from "./Components/StateProvider";

function App() {
  const [{ user }, dispatch] = useStateValue();
  const router = useRouter();
  return (
    <div className="bg-mainBg h-screen grid place-items-center">
      {!user ? (
        <Login />
      ) : (
        <div className="bg-appBg h-[90vh] w-[90vw] flex shadow-mainShadow">
          <SideBar />
          {router.query.id ? <Chat id={router.query.id} /> : ""}
        </div>
      )}
    </div>
  );
}

export default App;
