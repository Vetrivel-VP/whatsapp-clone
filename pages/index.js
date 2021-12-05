import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { StateProvider } from "../Components/StateProvider";
import reducer, { initialState } from "../Components/reducer";
import App from "./App";

export default function Home() {
  // const [{}, dispatch] = useStateValue();
  const router = useRouter();
  const [user, setUser] = useState(null);
  console.log(router, router.query);
  return (
    <div>
      <Head>
        <title>Whatsapp Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <StateProvider initialState={initialState} reducer={reducer}>
        <App />
      </StateProvider>
    </div>
  );
}
