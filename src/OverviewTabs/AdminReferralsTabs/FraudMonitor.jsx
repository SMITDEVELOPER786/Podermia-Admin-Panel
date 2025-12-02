import React from "react";
import styles from "../../css/AdminReferrals.module.css";
import { Triangle, TriangleAlertIcon } from "lucide-react";

function Div({ className, ...props }) {
  const mappedClass = className
    ?.split(" ")
    .map((c) => styles[c] || c)
    .join(" ");
  return <div className={mappedClass} {...props} />;
}

const FraudMonitor = () => {
  const data = [
    {
      id: 1,
      title: "Duplicate BVN detected",
      cases: "3",
    },
    {
      id: 2,
      title: "Same Device/IP detected",
      cases: "7",
    },
    {
      id: 3,
      title: "Rapid Signups detected",
      cases: "13",
    },
  ];
  return (
    <div className="content-panel">
      <h4 className={styles.fraudDetection}>Fraud Detection</h4>
      <Div className="fraud-cards">
        {data.map((item) => (
          <Div key={item.id} className="fraud-card flexRow">
           <Div className="icon flexRow">
            <TriangleAlertIcon size={25} color="#295cbf"/>
           </Div>

            <Div className="cases-review-title flexRow">
              <h4>{item.title}</h4>
              <Div className="cases-review flexRow">
                <p>{item.cases} Cases</p>
              <button>Review</button>
              </Div>
            </Div>
          </Div>
        ))}
      </Div>
    </div>
  );
};

export default FraudMonitor;
