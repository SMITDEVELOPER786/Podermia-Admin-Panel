import styles from '../css/Investment.module.css'

function Div({ className, ...props }) {
  const mappedClass = className
    ?.split(" ")
    .map((c) => styles[c] || c)
    .join(" ");
  return <div className={mappedClass} {...props} />;
}

function InvestmentNavigations ({ activeTab, onTabChange }) {
  const tabs = [
    'Investment Products',
    'Add Products',
    'User Investments',
    'Payout Calender',
    'Reports',
  ];

  return (
    <Div className="investment-nav-tabs">
      {tabs.map((tab) => {
        const buttonClass = ['investment-nav-tab', activeTab === tab ? 'investment-nav-tab-active' : '']
          .map((c) => styles[c] || c)
          .join(" ");
        return (
          <button
            key={tab}
            className={buttonClass}
            onClick={() => onTabChange(tab)}
          >
            {tab}
          </button>
        );
      })}
    </Div>
  );
}

export default InvestmentNavigations;
