// src/components/LoginPage.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

export default function LoginPage() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/staff", { replace: true });
  }, [navigate]);

  return <div className="login-page" />;
}
