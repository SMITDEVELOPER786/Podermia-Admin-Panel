import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import styles from "../css/Auth.module.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("adminpassword");
  const [email, setEmail] = useState("admin@podermonie.com");
  const [error, setError] = useState(""); 

  const handleContinue = () => {
    if (email === "admin@podermonie.com" && password === "adminpassword") {
      localStorage.setItem("token", "auth_token_here");
      setError(""); 
      navigate("/2fa", { replace: true });
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.card}>
        <h1 className={styles.brand}>PoderMonie</h1>
        <h2 className={styles.title}>Admin Portal</h2>
        <p className={styles.subtitle}>
          Secure access to Administrator Dashboard
        </p>

        <label className={styles.label}>Email Address</label>
        <input
          className={styles.input}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className={styles.label}>Password</label>
        <div className={styles.passwordWrap}>
          <input
            className={styles.input}
            type={passwordVisible ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="button"
            className={styles.eye}
            onClick={() => setPasswordVisible(!passwordVisible)}
          >
            {passwordVisible ? (
              <AiOutlineEyeInvisible size={22} />
            ) : (
              <AiOutlineEye size={22} />
            )}
          </button>
        </div>

        {error && <p style={{ color: "red", marginTop: "5px" }}>{error}</p>}

        <button className={styles.primary} onClick={handleContinue}>
          Continue
        </button>

        <p className={styles.footer}>
          Protected by advanced security protocols
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
