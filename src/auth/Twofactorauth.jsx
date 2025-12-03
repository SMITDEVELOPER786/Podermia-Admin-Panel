import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../css/Auth.module.css";

const TwoFactorPage = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (code.length === 6) {
      localStorage.setItem("2fa", "verified");
      setError("");
      navigate("/", { replace: true });
    } else {
      setError("Enter a valid 6-digit code");
    }
  };

  const handleBack = () => {
    navigate("/login", { replace: true });
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.card}>
        <h1 className={styles.brand}>PoderMonie</h1>
        <h2 className={styles.title}>Admin Portal</h2>
        <p className={styles.subtitle}>Secure access to Administrator Dashboard</p>

        <h3 className={styles.miniTitle}>Two-Factor Authentication</h3>
        <p className={styles.small}>
          Enter the 6-digit code from your authenticator app
        </p>

        <label className={styles.label}>Authentication Code</label>
        <input
          className={styles.input}
          maxLength={6}
          placeholder="000000"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        {error && <p style={{ color: "red", marginTop: "5px" }}>{error}</p>}

        <button className={styles.primary} onClick={handleLogin}>
          Login to Dashboard
        </button>

        <button className={styles.secondary} onClick={handleBack}>
          Back to Login
        </button>

        <p className={styles.footer}>
          Protected by advanced security protocols
        </p>
      </div>
    </div>
  );
};

export default TwoFactorPage;
