import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

function LogoutBtn() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    authService
      .logout()
      .then(() => dispatch(logout()))
      .catch((err) => console.error("LOGOUT ERROR || ", err));
  };
  return (
    <button className="btn  px-8 " onClick={handleLogout}>
      Logout
    </button>
  );
}

export default LogoutBtn;
