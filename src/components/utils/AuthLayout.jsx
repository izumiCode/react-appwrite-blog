import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);

  const authStatus = useSelector((state) => state.status);

  useEffect(() => {
    /**
     * The below if condition is TRUE only when authentication is true and authstatus is false
     * the else if is TRUE only when authentication is false and authstatus is true
     */
    if (authentication && authStatus !== authentication) navigate("/login");
    else if (!authentication && authStatus !== authentication) navigate("/");

    setLoader(false);
  }, [authStatus, navigate, authentication]);

  return <div></div>;
}
