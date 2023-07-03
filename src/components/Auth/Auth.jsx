import { auth, provider } from "../../firebase-configs/configs";
import { signInWithPopup } from "firebase/auth";
import { useContext } from "react";
import AppContext from "../../context/AppContext";
import './style.css';
const Auth = () => {
  const { setCurrentUser, currentUser } = useContext(AppContext);

  console.log("me", currentUser);

  const signin = async () => {
    const { user } = await signInWithPopup(auth, provider);
    const userObj = {
      fullName: user.displayName,
      email: user.email,
      accessToken: user.accessToken,
      userId: user.uid,
      profilePic: user.photoURL,
    };
    setCurrentUser(userObj);
    localStorage.setItem("userDetails", JSON.stringify(userObj));
  };

  return (
    <div className="google-parent">
      <p>Signin with Google to continue</p>
      <button onClick={signin} className="google-button">
        <img src="gooogle.png" alt="Google Icon" />
        Sign in with Google
      </button>
    </div>
  );
};

export default Auth;
