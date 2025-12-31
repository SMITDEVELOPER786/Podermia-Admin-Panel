import React from 'react';
import styles from '../css/Investment.module.css';
import jsPDF from 'jspdf';

const PortfolioOverview = ({
  portfolioItems,
  setToast,
  handleEdit,
  handleDelete
}) => {
  const handleExport = () => {
    const doc = new jsPDF();
    
    doc.setFillColor(240, 248, 255);
    doc.rect(0, 0, 210, 30, 'F');
    
    doc.setFontSize(22);
    doc.setTextColor(41, 92, 191);
    doc.setFont(undefined, 'bold');
    doc.text('Investment Portfolio Report', 105, 18, { align: 'center' });
    
    doc.setFillColor(247, 250, 252);
    doc.roundedRect(15, 35, 180, 35, 3, 3, 'F');
    
    doc.setFontSize(11);
    doc.setTextColor(60, 60, 60);
    doc.setFont(undefined, 'normal');
    
    const totalValue = portfolioItems.reduce((sum, item) => sum + parseFloat(item.amount.replace(/,/g, '')), 0).toLocaleString();
    const activeCount = portfolioItems.filter(item => item.status === 'Active').length;
    const avgReturn = portfolioItems.length > 0 
      ? (portfolioItems.reduce((sum, item) => sum + parseFloat(item.expectedReturn), 0) / portfolioItems.length).toFixed(1) + '%'
      : '0%';
    
    doc.text(`Total Value: ₦${totalValue}`, 25, 45);
    doc.text(`Active Investments: ${activeCount}`, 25, 53);
    doc.text(`Avg. Expected Return: ${avgReturn}`, 25, 61);
    doc.text(`Total Products: ${portfolioItems.length}`, 120, 45);
    
    doc.setFillColor(245, 247, 250);
    doc.rect(15, 78, 180, 10, 'F');
    doc.setFontSize(13);
    doc.setTextColor(41, 92, 191);
    doc.setFont(undefined, 'bold');
    doc.text('Investment Details', 20, 85);
    
    let yPos = 100;
    doc.setFontSize(10);
    
    portfolioItems.forEach((item, index) => {
      if (yPos > 265) {
        doc.addPage();
        yPos = 20;
      }
      
      doc.setFillColor(252, 252, 253);
      doc.roundedRect(15, yPos - 5, 180, 42, 2, 2, 'F');
      
      doc.setDrawColor(220, 220, 225);
      doc.setLineWidth(0.3);
      doc.roundedRect(15, yPos - 5, 180, 42, 2, 2, 'S');
      
      doc.setFont(undefined, 'bold');
      doc.setTextColor(30, 30, 30);
      doc.text(`${index + 1}. ${item.name}`, 20, yPos);
      
      if (item.status === 'Active') {
        doc.setFillColor(220, 252, 231);
        doc.setTextColor(22, 101, 52);
      } else {
        doc.setFillColor(254, 226, 226);
        doc.setTextColor(153, 27, 27);
      }
      doc.roundedRect(160, yPos - 4, 30, 6, 1, 1, 'F');
      doc.setFontSize(8);
      doc.text(item.status, 175, yPos, { align: 'center' });
      
      doc.setFontSize(9);
      doc.setFont(undefined, 'normal');
      doc.setTextColor(80, 80, 80);
      
      yPos += 7;
      doc.text(`Type: ${item.productType}`, 22, yPos);
      doc.text(`Category: ${item.category}`, 100, yPos);
      
      yPos += 5;
      doc.setTextColor(22, 163, 74);
      doc.text(`Amount: ₦${item.amount}`, 22, yPos);
      doc.setTextColor(80, 80, 80);
      doc.text(`Return: ${item.expectedReturn}`, 100, yPos);
      
      yPos += 5;
      doc.text(`Risk: ${item.risk}`, 22, yPos);
      doc.text(`Maturity: ${item.maturity}`, 100, yPos);
      
      yPos += 5;
      doc.setFontSize(8);
      doc.setTextColor(120, 120, 120);
      const descText = item.description.length > 80 ? item.description.substring(0, 80) + '...' : item.description;
      doc.text(descText, 22, yPos);
      
      doc.setFontSize(10);
      yPos += 15;
    });
    
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setDrawColor(220, 220, 225);
      doc.setLineWidth(0.5);
      doc.line(15, 285, 195, 285);
      doc.setFontSize(8);
      doc.setTextColor(120, 120, 120);
      doc.text(`Page ${i} of ${pageCount}`, 20, 290);
      doc.text(`Generated: ${new Date().toLocaleDateString()}`, 105, 290, { align: 'center' });
      doc.text('Podermia Admin', 190, 290, { align: 'right' });
    }
    
    doc.save('Portfolio_Report.pdf');
    
    setToast({
      type: 'success',
      title: 'Exported Successfully',
      message: 'Portfolio report has been downloaded as PDF'
    });
  };

  return (
    <div className={styles.portfolioOverview}>
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Total Value</span>
          <span className={styles.statValue}>
            {portfolioItems.reduce((sum, item) => sum + parseFloat(item.amount.replace(/,/g, '')), 0).toLocaleString()}
          </span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Active Investments</span>
          <span className={styles.statValue}>{portfolioItems.filter(item => item.status === 'Active').length}</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Avg. Expected Return</span>
          <span className={styles.statValue}>
            {portfolioItems.length > 0 
              ? (portfolioItems.reduce((sum, item) => sum + parseFloat(item.expectedReturn), 0) / portfolioItems.length).toFixed(1) + '%'
              : '0%'
            }
          </span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Portfolio Health</span>
          <span className={styles.statValue}>
            {portfolioItems.length > 0
              ? Math.round((portfolioItems.filter(item => item.status === 'Active').length / portfolioItems.length) * 100) + '%'
              : '0%'
            }
          </span>
          <div className={styles.healthBar}>
            <div 
              className={styles.healthProgress} 
              style={{ 
                width: portfolioItems.length > 0 
                  ? `${(portfolioItems.filter(item => item.status === 'Active').length / portfolioItems.length) * 100}%`
                  : '0%'
              }}
            ></div>
          </div>
        </div>
      </div>

      <div className={styles.portfolioSection}>
        <div className={styles.portfolioHeader}>
          <h3>Investment Portfolio</h3>
          <button className={styles.exportBtn} onClick={handleExport}>Export Data</button>
        </div>

        {portfolioItems.length === 0 ? (
          <div className={styles.emptyState}>
            <p>No investment products yet. Create your first product using the Investment Form.</p>
          </div>
        ) : (
          portfolioItems.map((item) => (
            <div key={item.id} className={styles.investmentCard}>
              <div className={styles.investmentHeader}>
                <div>
                  <h4>{item.name}</h4>
                  {item.issuerName && (
                    <p className={styles.issuerName}>Issuer: {item.issuerName}</p>
                  )}
                  {item.badges.map((badge, idx) => (
                    <span 
                      key={idx}
                      className={
                        badge === 'Active' ? styles.statusBadgeActive :
                        badge === 'Error' ? styles.statusBadgeError :
                        styles.statusBadgeAttention
                      }
                    >
                      {badge}
                    </span>
                  ))}
                </div>
                <div className={styles.cardActions}>
                  <button className={styles.editBtn} onClick={() => handleEdit(item)}>Edit</button>
                  <button className={styles.deleteBtn} onClick={() => handleDelete(item)}>Delete</button>
                </div>
              </div>
              
              <div className={styles.investmentDetails}>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Product Category</span>
                  <span className={styles.detailValue}>{item.productCategory || item.productType || 'N/A'}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Investment Objective</span>
                  <span className={styles.detailValue}>{item.investmentObjective || 'N/A'}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Min Investment</span>
                  <span className={styles.detailValue}>₦{item.minInvestment ? parseFloat(item.minInvestment).toLocaleString() : (item.amount ? parseFloat(item.amount.replace(/,/g, '')).toLocaleString() : 'N/A')}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Max Investment</span>
                  <span className={styles.detailValue}>₦{item.maxInvestment ? parseFloat(item.maxInvestment).toLocaleString() : 'Unlimited'}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Coupon/Interest Rate</span>
                  <span className={styles.detailValue}>{item.couponInterestRate ? `${item.couponInterestRate}%` : (item.expectedReturn || 'N/A')}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Annual Yield</span>
                  <span className={styles.detailValue}>{item.annualYield ? `${item.annualYield}%` : 'N/A'}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Interest Type</span>
                  <span className={styles.detailValue}>{item.interestType || 'N/A'}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Payout Frequency</span>
                  <span className={styles.detailValue}>{item.payoutFrequency || 'N/A'}</span>
                </div>
              </div>

              <div className={styles.investmentMeta}>
                <span className={item.riskLevel === 'Low' || (item.risk && item.risk.includes('Low')) ? styles.riskBadgeLow : styles.riskBadge}>
                  {item.riskLevel || item.risk || 'N/A'}
                </span>
                <span className={styles.metaText}>Maturity: {item.maturityDate || item.maturity || 'N/A'}</span>
                <span className={styles.metaText}>Start: {item.startDate || 'N/A'}</span>
                {item.endDate && <span className={styles.metaText}>End: {item.endDate}</span>}
                {item.maturityType && <span className={styles.metaText}>Type: {item.maturityType}</span>}
                {item.productCode && <span className={styles.metaText}>Code: {item.productCode}</span>}
              </div>

              <p className={styles.investmentDesc}>{item.description}</p>
              
              <div className={styles.complianceTags}>
                {item.tags.map((tag, idx) => (
                  <span key={idx} className={styles.complianceTag}>{tag}</span>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PortfolioOverview;

