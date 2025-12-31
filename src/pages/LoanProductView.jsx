import { useParams, useNavigate } from "react-router-dom";
import styles from "../css/LoanProductSetting.module.css";

export default function LoanProductView() {
  const { index } = useParams();
  const navigate = useNavigate();

  const products = JSON.parse(localStorage.getItem("loanProducts")) || [];
  const p = products[index];

  if (!p) {
    return <p className={styles.notFound}>Product not found</p>;
  }

  const renderSection = (title, data) => (
    <div className={styles.section}>
      <h3 className={styles.sectionTitle}>{title}</h3>

      <div className={styles.grid}>
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className={styles.row}>
            <span className={styles.label}>{key}</span>
            <span className={styles.value}>
              {Array.isArray(value) ? value.join(", ") : String(value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className={styles.page}>
      <div className={styles.header}>
     <button
  className={styles.backBtn}
  onClick={() => navigate("/loans")} // ya /loan-settings
>
   Back
</button>


        <h2 className={styles.title}>{p.name}</h2>
      </div>

      {renderSection("Basic Information", {
        "Product Code": p.code,
        "Category": p.category,
       
      })}

      {renderSection("Controls", p.controls)}
      {renderSection("Admin Settings", p.admin)}
    </div>
  );
}
