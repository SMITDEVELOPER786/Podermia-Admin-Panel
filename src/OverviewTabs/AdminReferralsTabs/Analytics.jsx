import React from "react";
import styles from "../../css/AdminReferrals.module.css";
import { DollarSignIcon, TrendingUpIcon, UsersRoundIcon } from "lucide-react";

function Div({ className, ...props }) {
  const mappedClass = className
    ?.split(" ")
    .map((c) => styles[c] || c)
    .join(" ");
  return <div className={mappedClass} {...props} />;
}

const Card = ({ icon, header, value }) => {
  return (
    <Div className="card">
      <Div className="card-icon">{icon}</Div>
      <Div className="head-and-value">
        <p>{header}</p>
        <h4>{value}</h4>
      </Div>
    </Div>
  );
};

function toPercent(value, fullValue = 450) {
  if (value < 0) value = 0;
  if (value > fullValue) value = fullValue;
  return (value / fullValue) * 100;
}

const ProgressBars = () => {
  const progressDetails = [
    { id: 1, label: "Referral Sent", value: 450 },
    { id: 2, label: "Signed Up", value: 280 },
    { id: 3, label: "KYC Complete", value: 210 },
    { id: 4, label: "Funded Wallet", value: 160 },
    { id: 5, label: "First Investment", value: 95 },
    { id: 6, label: "Bonus Paid", value: 95 },
  ];

  return (
    <Div className="progress-wrapper">
      {progressDetails.map((item) => {
        const percent = Math.round(toPercent(item.value));

        return (
          <Div key={item.id} className="progress-bar">
            <Div className="label-and-value">
              <label className={styles.progressLabel}>{item.label}</label>
              <p>
                {item.value} ({percent}%)
              </p>
            </Div>
            <Div className="progress-track">
              <Div className="progress-fill" style={{ width: `${percent}%` }} />
            </Div>
          </Div>
        );
      })}
    </Div>
  );
};

const Analytics = () => {
  return (
    <div className="content-panel">
      <Div className="analytics-cards">
        <Card
          icon={<UsersRoundIcon size={20} color="#295cbf" />}
          header={"Total Referrals"}
          value={"1,247"}
        />
        <Card
          icon={<DollarSignIcon size={20} color="#295cbf" />}
          header={"Bonus Paid"}
          value={"₦475,000"}
        />
        <Card
          icon={<TrendingUpIcon size={20} color="#295cbf" />}
          header={"Conversion Rate"}
          value={"21%"}
        />
      </Div>

      <Div className="analytics-funnels">
        <h4>Referral Funnel</h4>

        <Div className="progress-bars"></Div>
        <ProgressBars />
      </Div>
    </div>
  );
};

export default Analytics;
