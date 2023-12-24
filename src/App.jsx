import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Outlet } from "react-router-dom";

//components
import { Header, Footer } from "./components/index";
const App = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .catch((err) => console.error("error :: ", err))
      .finally(() => setLoading(false));
  }, []);

  return loading ? null : (
    <div className="min-h-screen flex flex-wrap justify-between ">
      <div className="w-full block">
        <Header />
        <main className="min-h-[75vh]">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;
