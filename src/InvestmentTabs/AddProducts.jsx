import React, { useState } from 'react';
import styles from '../css/Investment.module.css';
import { Upload } from 'lucide-react';
import Toast from '../components/Toast/Toast';
import ConfirmDialog from '../components/ConfirmDialog/ConfirmDialog';
import EditModal from '../components/EditModal/EditModal';

const AddProducts = () => {
  const [activeTab, setActiveTab] = useState('Portfolio Overview');
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState(null);
  const [portfolioItems, setPortfolioItems] = useState([
    {
      id: 1,
      name: 'Growth Tech Fund',
      status: 'Active',
      productType: 'Equity Funds',
      category: 'Growth',
      amount: '50,000',
      expectedReturn: '8.5%',
      risk: 'High Medium Risk',
      maturity: '12/31/2025',
      complianceTags: 2,
      description: 'Technology focused growth fund with diversified holdings',
      tags: ['SEC-Compliant', 'FINRA-Approved'],
      badges: ['Active']
    },
    {
      id: 2,
      name: 'Conservative Bond Portfolio',
      status: 'Error',
      productType: 'Hedge Funds',
      category: 'Conservative',
      amount: '75,000',
      expectedReturn: '3.2%',
      risk: 'Low Risk',
      maturity: '6/30/2026',
      complianceTags: 3,
      description: 'Low-risk bond portfolio for capital preservation',
      tags: ['SEC-Compliant', 'FINRA-Approved', 'SIPC-Protected'],
      badges: ['Error', 'Requires Attention']
    }
  ]);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    // Basic Information
    issuerName: '',
    productName: '',
    productType: '',
    sector: '',
    description: '',
    
    // Financial Details
    interestRate: '',
    minInvestment: '',
    maxInvestment: '',
    totalOffering: '',
    availableAmount: '',
    
    // Terms & Condition
    maturityDate: '',
    lockInPeriod: '',
    couponFrequency: '',
    riskRating: '',
    creditRating: '',
    
    // Document Upload
    termSheet: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        termSheet: file
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Basic Information validation
    if (!formData.issuerName.trim()) {
      newErrors.issuerName = 'Issuer name is required';
    }
    if (!formData.productName.trim()) {
      newErrors.productName = 'Product name is required';
    }
    if (!formData.productType.trim()) {
      newErrors.productType = 'Product type is required';
    }
    if (!formData.sector.trim()) {
      newErrors.sector = 'Sector is required';
    }

    // Financial Details validation
    if (!formData.interestRate.trim()) {
      newErrors.interestRate = 'Interest rate is required';
    } else if (isNaN(formData.interestRate) || parseFloat(formData.interestRate) <= 0) {
      newErrors.interestRate = 'Please enter a valid interest rate';
    }

    if (!formData.minInvestment.trim()) {
      newErrors.minInvestment = 'Minimum investment is required';
    } else if (isNaN(formData.minInvestment) || parseFloat(formData.minInvestment) <= 0) {
      newErrors.minInvestment = 'Please enter a valid amount';
    }

    if (!formData.maxInvestment.trim()) {
      newErrors.maxInvestment = 'Maximum investment is required';
    } else if (isNaN(formData.maxInvestment) || parseFloat(formData.maxInvestment) <= 0) {
      newErrors.maxInvestment = 'Please enter a valid amount';
    } else if (parseFloat(formData.maxInvestment) < parseFloat(formData.minInvestment)) {
      newErrors.maxInvestment = 'Maximum must be greater than minimum';
    }

    if (!formData.totalOffering.trim()) {
      newErrors.totalOffering = 'Total offering amount is required';
    }

    if (!formData.availableAmount.trim()) {
      newErrors.availableAmount = 'Available amount is required';
    }

    // Terms & Condition validation
    if (!formData.maturityDate.trim()) {
      newErrors.maturityDate = 'Maturity date is required';
    }

    if (!formData.lockInPeriod.trim()) {
      newErrors.lockInPeriod = 'Lock-in period is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveDraft = () => {
    console.log('Saving draft...', formData);
    setToast({
      type: 'success',
      title: 'Draft Saved Successfully',
      message: 'Your product draft has been saved'
    });
  };

  const handleCreateProduct = () => {
    if (!validateForm()) {
      setToast({
        type: 'error',
        title: 'Validation Error',
        message: 'Please fill in all required fields correctly'
      });
      return;
    }

    if (editingItem) {
      // Update existing item
      handleUpdateItem();
      return;
    }

    // Create new item
    const newItem = {
      id: portfolioItems.length + 1,
      name: formData.productName,
      status: 'Active',
      productType: formData.productType,
      category: formData.sector,
      amount: formData.totalOffering,
      expectedReturn: formData.interestRate + '%',
      risk: formData.riskRating || 'Medium Risk',
      maturity: formData.maturityDate,
      complianceTags: 2,
      description: formData.description || 'New investment product',
      tags: ['SEC-Compliant', 'FINRA-Approved'],
      badges: ['Active']
    };

    setPortfolioItems(prev => [...prev, newItem]);

    console.log('Creating product...', formData);
    setToast({
      type: 'success',
      title: 'Product Created Successfully',
      message: 'Your investment product has been created'
    });
    
    // Reset form after successful creation
    setTimeout(() => {
      setFormData({
        issuerName: '',
        productName: '',
        productType: '',
        sector: '',
        description: '',
        interestRate: '',
        minInvestment: '',
        maxInvestment: '',
        totalOffering: '',
        availableAmount: '',
        maturityDate: '',
        lockInPeriod: '',
        couponFrequency: '',
        riskRating: '',
        creditRating: '',
        termSheet: null,
      });
      setActiveTab('Portfolio Overview');
    }, 2000);
  };

  const handleCancel = () => {
    setConfirmDialog({
      type: 'warning',
      title: 'Cancel Form',
      message: 'Are you sure you want to cancel? All unsaved changes will be lost.',
      confirmText: 'Yes, Cancel',
      cancelText: 'No, Keep Editing',
      onConfirm: () => {
        setFormData({
          issuerName: '',
          productName: '',
          productType: '',
          sector: '',
          description: '',
          interestRate: '',
          minInvestment: '',
          maxInvestment: '',
          totalOffering: '',
          availableAmount: '',
          maturityDate: '',
          lockInPeriod: '',
          couponFrequency: '',
          riskRating: '',
          creditRating: '',
          termSheet: null,
        });
        setErrors({});
        setEditingItem(null);
        setConfirmDialog(null);
        setToast({
          type: 'info',
          title: 'Form Cleared',
          message: 'All form data has been cleared'
        });
      },
      onCancel: () => setConfirmDialog(null)
    });
  };

  const handleDelete = (item) => {
    setConfirmDialog({
      type: 'warning',
      title: 'Delete Investment',
      message: `Are you sure you want to delete "${item.name}"? This action cannot be undone.`,
      confirmText: 'Yes, Delete',
      cancelText: 'Cancel',
      onConfirm: () => {
        setPortfolioItems(prev => prev.filter(p => p.id !== item.id));
        setConfirmDialog(null);
        setToast({
          type: 'success',
          title: 'Deleted Successfully',
          message: `${item.name} has been deleted`
        });
      },
      onCancel: () => setConfirmDialog(null)
    });
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      issuerName: item.name.split(' ')[0] || '',
      productName: item.name,
      productType: item.productType,
      sector: item.category,
      description: item.description,
      interestRate: item.expectedReturn.replace('%', ''),
      minInvestment: '',
      maxInvestment: '',
      totalOffering: item.amount,
      availableAmount: item.amount,
      maturityDate: item.maturity,
      lockInPeriod: '',
      couponFrequency: '',
      riskRating: item.risk,
      creditRating: '',
      termSheet: null,
    });
  };

  const handleUpdateItem = () => {
    // No validation for edit mode - user can update what they want
    // Only update fields that have values (are not empty)
    const updatedItem = {
      ...editingItem,
      name: formData.productName?.trim() ? formData.productName : editingItem.name,
      productType: formData.productType?.trim() ? formData.productType : editingItem.productType,
      category: formData.sector?.trim() ? formData.sector : editingItem.category,
      amount: formData.totalOffering?.trim() ? formData.totalOffering : editingItem.amount,
      expectedReturn: formData.interestRate?.trim() ? formData.interestRate + '%' : editingItem.expectedReturn,
      maturity: formData.maturityDate?.trim() ? formData.maturityDate : editingItem.maturity,
      risk: formData.riskRating?.trim() ? formData.riskRating : editingItem.risk,
      description: formData.description?.trim() ? formData.description : editingItem.description,
    };

    console.log('Updating item:', updatedItem);

    setPortfolioItems(prev => 
      prev.map(item => item.id === editingItem.id ? updatedItem : item)
    );

    setToast({
      type: 'success',
      title: 'Updated Successfully',
      message: 'Investment product has been updated'
    });

    // Close modal and clear form
    setEditingItem(null);
    setFormData({
      issuerName: '',
      productName: '',
      productType: '',
      sector: '',
      description: '',
      interestRate: '',
      minInvestment: '',
      maxInvestment: '',
      totalOffering: '',
      availableAmount: '',
      maturityDate: '',
      lockInPeriod: '',
      couponFrequency: '',
      riskRating: '',
      creditRating: '',
      termSheet: null,
    });
    setErrors({});
  };

  const handleCancelEdit = () => {
    setConfirmDialog({
      type: 'warning',
      title: 'Cancel Editing',
      message: 'Are you sure you want to cancel? All unsaved changes will be lost.',
      confirmText: 'Yes, Cancel',
      cancelText: 'No, Keep Editing',
      onConfirm: () => {
        setEditingItem(null);
        setFormData({
          issuerName: '',
          productName: '',
          productType: '',
          sector: '',
          description: '',
          interestRate: '',
          minInvestment: '',
          maxInvestment: '',
          totalOffering: '',
          availableAmount: '',
          maturityDate: '',
          lockInPeriod: '',
          couponFrequency: '',
          riskRating: '',
          creditRating: '',
          termSheet: null,
        });
        setErrors({});
        setConfirmDialog(null);
      },
      onCancel: () => setConfirmDialog(null)
    });
  };

  const handleExport = () => {
    setToast({
      type: 'success',
      title: 'Exported Successful',
      message: 'Your data has been exported successfully'
    });
  };

  return (
    <div className={styles.addProductsContainer}>
      {/* Tab Navigation */}
      <div className={styles.formTabs}>
        <button
          className={`${styles.formTab} ${activeTab === 'Portfolio Overview' ? styles.formTabActive : ''}`}
          onClick={() => setActiveTab('Portfolio Overview')}
        >
          Portfolio Overview
        </button>
        <button
          className={`${styles.formTab} ${activeTab === 'Investment Form' ? styles.formTabActive : ''}`}
          onClick={() => setActiveTab('Investment Form')}
        >
          Investment Form
        </button>
      </div>

      {/* Portfolio Overview Tab */}
      {activeTab === 'Portfolio Overview' && (
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

            {/* Dynamic Investment Cards */}
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
                      <button className={styles.editBtn}>Edit</button>
                      <button className={styles.deleteBtn} onClick={() => handleDelete(item)}>Delete</button>
                    </div>
                  </div>
                  
                  <div className={styles.investmentDetails}>
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Product Type</span>
                      <span className={styles.detailValue}>{item.productType}</span>
                    </div>
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Category</span>
                      <span className={styles.detailValue}>{item.category}</span>
                    </div>
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Amount</span>
                      <span className={styles.detailValue}>{item.amount}</span>
                    </div>
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Expected Return</span>
                      <span className={styles.detailValue}>{item.expectedReturn}</span>
                    </div>
                  </div>

                  <div className={styles.investmentMeta}>
                    <span className={item.risk.includes('Low') ? styles.riskBadgeLow : styles.riskBadge}>
                      {item.risk}
                    </span>
                    <span className={styles.metaText}>Maturity: {item.maturity}</span>
                    <span className={styles.metaText}>{item.complianceTags} compliance tags</span>
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
      )}

      {activeTab === 'Investment Form' && (
        <div className={styles.investmentForm}>
          <h2 className={styles.formTitle}>
            {editingItem ? '✏️ Edit Investment Product' : '+ Add New Investment Product'}
          </h2>

          <div className={styles.formGrid}>
            <div className={styles.formSection}>
              <h3 className={styles.sectionTitle}>Basic Information</h3>
              
              <div className={styles.formGroup}>
                <label>Issuer Name</label>
                <input
                  type="text"
                  name="issuerName"
                  placeholder="Enter Issuer Name"
                  value={formData.issuerName}
                  onChange={handleInputChange}
                  className={errors.issuerName ? styles.inputError : ''}
                />
                {errors.issuerName && <span className={styles.errorText}>{errors.issuerName}</span>}
              </div>

              <div className={styles.formGroup}>
                <label>Product Name</label>
                <input
                  type="text"
                  name="productName"
                  placeholder="Enter Product Name"
                  value={formData.productName}
                  onChange={handleInputChange}
                  className={errors.productName ? styles.inputError : ''}
                />
                {errors.productName && <span className={styles.errorText}>{errors.productName}</span>}
              </div>

              <div className={styles.formGroup}>
                <label>Product Type</label>
                <input
                  type="text"
                  name="productType"
                  placeholder="Enter Product Type"
                  value={formData.productType}
                  onChange={handleInputChange}
                  className={errors.productType ? styles.inputError : ''}
                />
                {errors.productType && <span className={styles.errorText}>{errors.productType}</span>}
              </div>

              <div className={styles.formGroup}>
                <label>Sector</label>
                <input
                  type="text"
                  name="sector"
                  placeholder="Enter Sector"
                  value={formData.sector}
                  onChange={handleInputChange}
                  className={errors.sector ? styles.inputError : ''}
                />
                {errors.sector && <span className={styles.errorText}>{errors.sector}</span>}
              </div>

              <div className={styles.formGroup}>
                <label>Description</label>
                <textarea
                  name="description"
                  placeholder="Description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                />
              </div>
            </div>

            <div className={styles.formSection}>
              <h3 className={styles.sectionTitle}>Financial Details</h3>
              
              <div className={styles.formGroup}>
                <label>Interest Rate (%)</label>
                <input
                  type="text"
                  name="interestRate"
                  placeholder="e.g 12.5"
                  value={formData.interestRate}
                  onChange={handleInputChange}
                  className={errors.interestRate ? styles.inputError : ''}
                />
                {errors.interestRate && <span className={styles.errorText}>{errors.interestRate}</span>}
              </div>

              <div className={styles.formGroup}>
                <label>Minimum Investment Amount</label>
                <input
                  type="text"
                  name="minInvestment"
                  placeholder="Enter Minimum amount"
                  value={formData.minInvestment}
                  onChange={handleInputChange}
                  className={errors.minInvestment ? styles.inputError : ''}
                />
                {errors.minInvestment && <span className={styles.errorText}>{errors.minInvestment}</span>}
              </div>

              <div className={styles.formGroup}>
                <label>Maximum Investment Amount</label>
                <input
                  type="text"
                  name="maxInvestment"
                  placeholder="Enter Maximum Amount"
                  value={formData.maxInvestment}
                  onChange={handleInputChange}
                  className={errors.maxInvestment ? styles.inputError : ''}
                />
                {errors.maxInvestment && <span className={styles.errorText}>{errors.maxInvestment}</span>}
              </div>

              <div className={styles.formGroup}>
                <label>Total Coffering Amount</label>
                <input
                  type="text"
                  name="totalOffering"
                  placeholder="Enter Total Coffering Amount*"
                  value={formData.totalOffering}
                  onChange={handleInputChange}
                  className={errors.totalOffering ? styles.inputError : ''}
                />
                {errors.totalOffering && <span className={styles.errorText}>{errors.totalOffering}</span>}
              </div>

              <div className={styles.formGroup}>
                <label>Available Amount</label>
                <input
                  type="text"
                  name="availableAmount"
                  placeholder="Enter Available Amount"
                  value={formData.availableAmount}
                  onChange={handleInputChange}
                  className={errors.availableAmount ? styles.inputError : ''}
                />
                {errors.availableAmount && <span className={styles.errorText}>{errors.availableAmount}</span>}
              </div>
            </div>

            <div className={styles.formSection}>
              <h3 className={styles.sectionTitle}>Terms & Condition</h3>
              
              <div className={styles.formGroup}>
                <label>Maturity Date</label>
                <input
                  type="text"
                  name="maturityDate"
                  placeholder="mm/dd/yyyy"
                  value={formData.maturityDate}
                  onChange={handleInputChange}
                  className={errors.maturityDate ? styles.inputError : ''}
                />
                {errors.maturityDate && <span className={styles.errorText}>{errors.maturityDate}</span>}
              </div>

              <div className={styles.formGroup}>
                <label>Lock-In Period</label>
                <input
                  type="text"
                  name="lockInPeriod"
                  placeholder="e.g 90-1 year"
                  value={formData.lockInPeriod}
                  onChange={handleInputChange}
                  className={errors.lockInPeriod ? styles.inputError : ''}
                />
                {errors.lockInPeriod && <span className={styles.errorText}>{errors.lockInPeriod}</span>}
              </div>

              <div className={styles.formGroup}>
                <label>Coupon Frequency</label>
                <input
                  type="text"
                  name="couponFrequency"
                  placeholder="Enter Frequency"
                  value={formData.couponFrequency}
                  onChange={handleInputChange}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Risk Rating</label>
                <input
                  type="text"
                  name="riskRating"
                  placeholder="Enter risk rating"
                  value={formData.riskRating}
                  onChange={handleInputChange}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Credit Rating</label>
                <input
                  type="text"
                  name="creditRating"
                  placeholder="e.g AAA, BBB"
                  value={formData.creditRating}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Document Upload Section */}
            <div className={styles.formSection}>
              <h3 className={styles.sectionTitle}>Document Upload</h3>
              
              <div className={styles.formGroup}>
                <label>Term Sheet Upload</label>
                <div className={styles.uploadArea}>
                  <input
                    type="file"
                    id="termSheet"
                    onChange={handleFileUpload}
                    accept=".pdf,.docx,.doc"
                    style={{ display: 'none' }}
                  />
                  <label htmlFor="termSheet" className={styles.uploadLabel}>
                    <Upload size={40} className={styles.uploadIcon} />
                    <p>Click to Upload drag and drop</p>
                    <span>PDF, DOCX, MAX 10MB</span>
                  </label>
                  {formData.termSheet && (
                    <p className={styles.fileName}>{formData.termSheet.name}</p>
                  )}
                </div>
              </div>

              <div className={styles.documentsChecklist}>
                <h4>Required Documents Checklist</h4>
                <ul>
                  <li>Team Sheet</li>
                  <li>Issuer Financial Statement</li>
                  <li>Credit Rating Report</li>
                  <li>Regulatory Approval</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className={styles.formActions}>
            <button className={styles.cancelBtn} onClick={handleCancel}>Cancel</button>
            <button className={styles.draftBtn} onClick={handleSaveDraft}>Save as draft</button>
            <button className={styles.createBtn} onClick={handleCreateProduct}>
              {editingItem ? 'Update Product' : 'Create Product'}
            </button>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <Toast
          type={toast.type}
          title={toast.title}
          message={toast.message}
          onClose={() => setToast(null)}
          duration={3000}
        />
      )}

      {/* Confirm Dialog */}
      {confirmDialog && (
        <ConfirmDialog
          type={confirmDialog.type}
          title={confirmDialog.title}
          message={confirmDialog.message}
          confirmText={confirmDialog.confirmText}
          cancelText={confirmDialog.cancelText}
          onConfirm={confirmDialog.onConfirm}
          onCancel={confirmDialog.onCancel}
        />
      )}

      {/* Edit Modal */}
      {editingItem && (
        <EditModal
          item={editingItem}
          formData={formData}
          errors={errors}
          onInputChange={handleInputChange}
          onUpdate={handleUpdateItem}
          onCancel={handleCancelEdit}
        />
      )}
    </div>
  );
};

export default AddProducts;
