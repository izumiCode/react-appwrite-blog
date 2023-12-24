import React from "react";
import { LogoutBtn } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  //This was state.auth.status but for some reason it is giving me an error so now it is state.status
  const authStatus = useSelector((state) => state.status);
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <div className="navbar bg-transparent backdrop-blur-xl flex justify-evenly items-center">
      <div className="navbar-start">
        <a className="btn btn-ghost text-xl">Izumii.Code</a>
      </div>
      <nav className="">
        {navItems.map((item) =>
          item.active ? (
            <li key={item.name} className="list-none ">
              <button
                onClick={() => navigate(item.slug)}
                className="btn btn-ghost mx-4"
              >
                {item.name}
              </button>
            </li>
          ) : null
        )}
      </nav>
      {!authStatus && <LogoutBtn />}
    </div>
  );
};

export default Header;
