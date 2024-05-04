import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./nav.css";
import { LoginFormContext } from "../../App";
import seperateName from "../../utils/seperateName";

//! importing the logout api

import { logout } from "../../utils/api/api";

import { toast } from "react-toastify";
import { Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type NavProps = {
  username: string;
};

const Nav: React.FC<NavProps> = ({ username }) => {
  const navigate = useNavigate();

  const { setAvatar } = useContext(LoginFormContext);

  const notifyLogout = (message: string) =>
    toast.info(message, {
      position: "bottom-right",
      autoClose: 2500, // use a number here
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });

  useEffect(() => {
    const fetchAvatar = async () => {
      const parts = seperateName(username);
      if (parts) {
        const { first, last } = parts;
        console.log(first, last);
        const avatarResponse = await fetch(
          `https://ui-avatars.com/api/?name=${first}+${last}&background=random&rounded=true&size=50&bold=true&color=fff`
        );
        const avatarUrl = avatarResponse.url; // Assuming avatarResponse.url is the correct way to extract the URL
        setAvatar(avatarUrl); // Pass the URL string to setAvatar
      }
    };

    fetchAvatar();
  }, [username, setAvatar]); // Depend on username and setAvatar to re-run the effect if they change

  const handleLogout = async () => {
    const success = await logout();

    if (!success) {
      alert("error logging out");
    } else {
      console.log("logged out");
      notifyLogout("LOGGED OUT");

      // Delay the navigation by 2.5 seconds to allow the toast to be displayed
      setTimeout(() => {
        navigate("/");
      }, 1500);
    }

    // // Implement logout logic here
    // alert("Logout clicked");
  };

  return (
    <nav>
      <div className="app-name">
        <h1>TaskFlow</h1>
      </div>
      <div className="user">
        <p>{username}</p>
        {/* <img src={avatar} alt="user" /> */}
        <div className="logout-wrapper">
          <img
            className="logout-icon"
            onClick={handleLogout}
            src="log-out.svg"
            alt="LOGOUT"
          />
        </div>
      </div>
    </nav>
  );
};

export default Nav;
