import React from "react";
import styles from '../css/WalletAdmin.module.css'

function Div({ className, ...props }) {
  const mappedClass = className
    ?.split(" ")
    .map((c) => styles[c] || c)
    .join(" ");
  return <div className={mappedClass} {...props} />;
}





const Card = () => {
  const cardData = [
  { header: "Total wallet Balance", value: "$2.5B" },
  { header: "Deposits Today", value: "$2.5B" },
  { header: "Pending Withdraw", value: "$2.3M" },
  { header: "Pending Transaction", value: "2" },
];
  return (
    <>
    {cardData.map((item) => (
      <Div className="card" key={item.header}>
        <p>{item.header}</p>
        <h4>{item.value}</h4>
      </Div>
    ))}
    </>
  );
};

const Overview = () => {
  return (
  <div>
    <Card/>
  </div>);
};

export default Overview;
