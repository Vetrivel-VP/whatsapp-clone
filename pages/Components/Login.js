import { Button } from "@mui/material";
import { auth, provider } from "./firebaseConfiguration";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";

function Login() {
  const [{}, dispatch] = useStateValue();
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) =>
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        })
      )
      .catch((error) => alert(error.message));
  };
  return (
    <div className="bg-loginBg h-screen w-screen grid place-items-center">
      <div className="p-[100px] flex flex-col justify-center items-center bg-white rounded-xl shadow-mainShadow">
        <img
          className="object-contain h-[100px] mb-[40px]"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1021px-WhatsApp.svg.png"
        />
        <h1 className="text-[30px] font-bold">Sign in to WhatsApp</h1>

        <Button
          onClick={signIn}
          className="capitalize bg-loginBtn text-white mt-[10px]
          hover:bg-loginBtnHover hover:text-white hover:shadow-md"
        >
          Sign In with Google
        </Button>
      </div>
    </div>
  );
}

export default Login;
