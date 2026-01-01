import React, { useState } from 'react';
import styles from '../css/Investment.module.css';
import Toast from '../components/Toast/Toast';
import ConfirmDialog from '../components/ConfirmDialog/ConfirmDialog';
import EditModal from '../components/EditModal/EditModal';
import PortfolioOverview from './PortfolioOverview';
import InvestmentForm from './InvestmentForm';

const AddProducts = () => {
  const [activeTab, setActiveTab] = useState('Portfolio Overview');
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState(null);
  const [portfolioItems, setPortfolioItems] = useState([
    {
      id: 1,
      name: 'Growth Tech Fund',
      issuerName: 'Tech Ventures Inc',
      status: 'Active',
      productType: 'Treasury Bill',
      productCategory: 'Treasury Bill',
      category: 'Growth',
      investmentObjective: 'Growth',
      amount: '50,000',
      minInvestment: '1000',
      maxInvestment: '100000',
      couponInterestRate: '8.5',
      annualYield: '8.5',
      interestType: 'Simple',
      payoutFrequency: 'Monthly',
      processingFees: '100',
      withholdingTax: '10',
      expectedReturn: '8.5%',
      risk: 'High',
      riskLevel: 'High',
      maturity: '12/31/2025',
      maturityDate: '2025-12-31',
      startDate: '2024-01-01',
      endDate: '2025-12-31',
      maturityType: 'Fixed',
      earlyRedemptionOption: 'Yes',
      penaltyOnEarlyRedemption: '5',
      statusControl: 'Active',
      complianceTags: 2,
      description: 'Technology focused growth fund with diversified holdings',
      tags: ['SEC-Compliant', 'FINRA-Approved'],
      badges: ['Active'],
      productCode: 'PROD-001',
      createdBy: 'System Admin',
      createdDate: new Date().toLocaleDateString()
    },
    {
      id: 2,
      name: 'Conservative Bond Portfolio',
      issuerName: 'Safe Bonds LLC',
      status: 'Active',
      productType: 'Bond',
      productCategory: 'Bond',
      category: 'Income',
      investmentObjective: 'Income',
      amount: '75,000',
      minInvestment: '5000',
      maxInvestment: '500000',
      couponInterestRate: '3.2',
      annualYield: '3.2',
      interestType: 'Compound',
      payoutFrequency: 'Quarterly',
      processingFees: '150',
      withholdingTax: '15',
      expectedReturn: '3.2%',
      risk: 'Low',
      riskLevel: 'Low',
      maturity: '6/30/2026',
      maturityDate: '2026-06-30',
      startDate: '2024-01-01',
      endDate: '2026-06-30',
      maturityType: 'Fixed',
      earlyRedemptionOption: 'No',
      penaltyOnEarlyRedemption: '10',
      statusControl: 'Active',
      complianceTags: 3,
      description: 'Low-risk bond portfolio for capital preservation',
      tags: ['SEC-Compliant', 'FINRA-Approved', 'SIPC-Protected'],
      badges: ['Active'],
      productCode: 'PROD-002',
      createdBy: 'System Admin',
      createdDate: new Date().toLocaleDateString()
    }
  ]);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    productName: '',
    productCategory: '',
    issuerName: '',
    description: '',
    investmentObjective: '',
    minInvestment: '',
    maxInvestment: '',
    couponInterestRate: '',
    annualYield: '',
    interestType: '',
    payoutFrequency: '',
    processingFeeType: '%',
    processingFees: '',
    withholdingTax: '',
    productActivationTimeOpen: '',
    productActivationTimeClose: '',
    investmentApprovalMode: 'Automatic',
    couponPayoutMode: 'Automatic',
    statusControl: 'Active',
    penaltyOnEarlyRedemption: '0',
    earlyRedemptionOption: 'No',
    maturityDate: '',
    startDate: '',
    endDate: '',
    maturityType: '',
    autoRollover: false,
    gracePeriod: '',
    riskLevel: '',
    investmentRating: '',
    additionalDocumentationRequired: false,
    kycTierRestriction: '',
    regulatoryNotes: '',
    orderPriority: '',
    productCode: '',
    createdBy: '',
    createdDate: '',
    suspendProduct: false,
    archiveProduct: false,
    referralEligibility: false,
    notifyUser: false,
    productType: '',
    sector: '',
    interestRate: '',
    totalOffering: '',
    availableAmount: '',
    lockInPeriod: '',
    couponFrequency: '',
    riskRating: '',
    creditRating: '',
    status: 'Active',
    termSheet: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (name === 'minInvestment') {
      if (!value || value.trim() === '') {
        setErrors(prev => ({
          ...prev,
          [name]: 'Minimum investment is required'
        }));
      } else {
        const minInv = parseFloat(value);
        if (isNaN(minInv)) {
          setErrors(prev => ({
            ...prev,
            [name]: 'Minimum investment must be a valid number'
          }));
        } else if (minInv < 1000) {
          setErrors(prev => ({
            ...prev,
            [name]: 'Minimum investment must be at least ₦1,000'
          }));
        } else {
          setErrors(prev => ({
            ...prev,
            [name]: ''
          }));
        }
      }
    } else if (name === 'couponInterestRate' || name === 'annualYield') {
      if (errors[name]) {
        setErrors(prev => ({
          ...prev,
          [name]: ''
        }));
      }
    } else {
      if (errors[name]) {
        setErrors(prev => ({
          ...prev,
          [name]: ''
        }));
      }
    }
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const newFiles = [];
      const duplicates = [];
      
      files.forEach(file => {
        const isDuplicate = formData.termSheet.some(
          existingFile => existingFile.name === file.name && existingFile.size === file.size
        );
        
        if (isDuplicate) {
          duplicates.push(file.name);
        } else {
          newFiles.push(file);
        }
      });
      
      if (duplicates.length > 0) {
        setToast({
          type: 'error',
          title: 'Duplicate Files',
          message: `${duplicates.join(', ')} already selected`
        });
      }
      
      if (newFiles.length > 0) {
        setFormData(prev => ({
          ...prev,
          termSheet: [...prev.termSheet, ...newFiles]
        }));
      }
    }
    
    e.target.value = '';
  };

  const removeFile = (index) => {
    setFormData(prev => ({
      ...prev,
      termSheet: prev.termSheet.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.productName.trim()) {
      newErrors.productName = 'Product name is required';
    } else {
      const isDuplicate = portfolioItems.some(item => 
        item.id !== editingItem?.id && 
        item.name.toLowerCase() === formData.productName.trim().toLowerCase()
      );
      if (isDuplicate) {
        newErrors.productName = 'Product name already exists or is too similar';
      }
    }

    if (!formData.issuerName.trim()) {
      newErrors.issuerName = 'Issuer name is required';
    }

    if (!formData.minInvestment || formData.minInvestment.trim() === '') {
      newErrors.minInvestment = 'Minimum investment is required';
    } else {
      const minInv = parseFloat(formData.minInvestment);
      if (isNaN(minInv)) {
        newErrors.minInvestment = 'Minimum investment must be a valid number';
      } else if (minInv < 1000) {
        newErrors.minInvestment = 'Minimum investment must be at least ₦1,000';
      }
    }

    if (formData.maxInvestment && parseFloat(formData.maxInvestment) < parseFloat(formData.minInvestment || 0)) {
      newErrors.maxInvestment = 'Maximum must be greater than minimum';
    }

    if (!formData.couponInterestRate || isNaN(formData.couponInterestRate)) {
      newErrors.couponInterestRate = 'Coupon/Interest rate is required';
    } else {
      const rate = parseFloat(formData.couponInterestRate);
      if (rate < 1 || rate > 100) {
        newErrors.couponInterestRate = 'Coupon/Interest rate must be between 1% and 100%';
      }
    }

    if (!formData.annualYield || isNaN(formData.annualYield)) {
      newErrors.annualYield = 'Annual yield is required';
    } else {
      const yieldVal = parseFloat(formData.annualYield);
      if (yieldVal < 1 || yieldVal > 100) {
        newErrors.annualYield = 'Annual yield must be between 1% and 100%';
      }
    }

    if (!formData.productCategory) {
      newErrors.productCategory = 'Product category is required';
    }

    if (!formData.investmentObjective) {
      newErrors.investmentObjective = 'Investment objective is required';
    }

    if (!formData.processingFees || isNaN(formData.processingFees) || parseFloat(formData.processingFees) < 0) {
      newErrors.processingFees = 'Processing fees is required and must be a valid number';
    }

    if (!formData.withholdingTax || isNaN(formData.withholdingTax) || parseFloat(formData.withholdingTax) < 0) {
      newErrors.withholdingTax = 'Withholding tax is required and must be a valid number';
    }

    if (!formData.interestType) {
      newErrors.interestType = 'Interest type is required';
    }

    if (!formData.payoutFrequency) {
      newErrors.payoutFrequency = 'Payout frequency is required';
    }

    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    } else {
      const startDate = new Date(formData.startDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (startDate < today) {
        newErrors.startDate = 'Start date cannot be in the past';
      }
    }

    if (formData.endDate && formData.startDate) {
      const endDate = new Date(formData.endDate);
      const startDate = new Date(formData.startDate);
      if (endDate < startDate) {
        newErrors.endDate = 'End date must be after start date';
      }
    }

    if (formData.maturityDate && formData.startDate) {
      const maturityDate = new Date(formData.maturityDate);
      const startDate = new Date(formData.startDate);
      if (maturityDate < startDate) {
        newErrors.maturityDate = 'Maturity date must be after start date';
      }
    }

    if (!formData.maturityType) {
      newErrors.maturityType = 'Maturity type is required';
    }

    if (!formData.riskLevel) {
      newErrors.riskLevel = 'Risk level is required';
    }

    if (!formData.statusControl) {
      newErrors.statusControl = 'Status control is required';
    }

    if (formData.orderPriority && (isNaN(formData.orderPriority) || parseFloat(formData.orderPriority) < 1 || parseFloat(formData.orderPriority) > 10)) {
      newErrors.orderPriority = 'Order priority must be between 1 and 10';
    }

    if (formData.gracePeriod && (isNaN(formData.gracePeriod) || parseFloat(formData.gracePeriod) < 0)) {
      newErrors.gracePeriod = 'Grace period must be a valid positive number';
    }

    if (!formData.earlyRedemptionOption) {
      newErrors.earlyRedemptionOption = 'Early redemption option is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveDraft = () => {
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
      handleUpdateItem();
      return;
    }

    const productCode = `PROD-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    
    const newItem = {
      id: portfolioItems.length + 1,
      name: formData.productName,
      issuerName: formData.issuerName,
      status: formData.statusControl || 'Active',
      productType: formData.productCategory || formData.productType,
      category: formData.productCategory || formData.sector,
      amount: formData.totalOffering || formData.minInvestment,
      expectedReturn: formData.annualYield ? `${formData.annualYield}%` : (formData.couponInterestRate ? `${formData.couponInterestRate}%` : '0%'),
      risk: formData.riskLevel || formData.riskRating || 'Medium Risk',
      maturity: formData.maturityDate || formData.maturity,
      complianceTags: 2,
      description: formData.description || 'New investment product',
      tags: ['SEC-Compliant', 'FINRA-Approved'],
      badges: [formData.statusControl || 'Active'],
      productCategory: formData.productCategory,
      investmentObjective: formData.investmentObjective,
      minInvestment: formData.minInvestment,
      maxInvestment: formData.maxInvestment,
      couponInterestRate: formData.couponInterestRate,
      annualYield: formData.annualYield,
      interestType: formData.interestType,
      payoutFrequency: formData.payoutFrequency,
      processingFeeType: formData.processingFeeType || '%',
      processingFees: formData.processingFees,
      withholdingTax: formData.withholdingTax,
      productActivationTimeOpen: formData.productActivationTimeOpen,
      productActivationTimeClose: formData.productActivationTimeClose,
      investmentApprovalMode: formData.investmentApprovalMode || 'Automatic',
      couponPayoutMode: formData.couponPayoutMode || 'Automatic',
      statusControl: formData.statusControl,
      penaltyOnEarlyRedemption: formData.penaltyOnEarlyRedemption || '0',
      earlyRedemptionOption: formData.earlyRedemptionOption,
      maturityDate: formData.maturityDate,
      startDate: formData.startDate,
      endDate: formData.endDate,
      maturityType: formData.maturityType,
      autoRollover: formData.autoRollover,
      gracePeriod: formData.gracePeriod,
      riskLevel: formData.riskLevel,
      investmentRating: formData.investmentRating,
      additionalDocumentationRequired: formData.additionalDocumentationRequired,
      kycTierRestriction: formData.kycTierRestriction,
      regulatoryNotes: formData.regulatoryNotes,
      orderPriority: formData.orderPriority,
      productCode: productCode,
      createdBy: 'System Admin',
      createdDate: new Date().toLocaleDateString(),
      suspendProduct: formData.suspendProduct,
      archiveProduct: formData.archiveProduct,
      referralEligibility: formData.referralEligibility,
      notifyUser: formData.notifyUser,
    };

    setPortfolioItems(prev => [...prev, newItem]);

    setToast({
      type: 'success',
      title: 'Product Created Successfully',
      message: 'Your investment product has been created'
    });
    
    setTimeout(() => {
      setFormData({
        productName: '',
        productCategory: '',
        issuerName: '',
        description: '',
        investmentObjective: '',
        minInvestment: '',
        maxInvestment: '',
        couponInterestRate: '',
        annualYield: '',
        interestType: '',
        payoutFrequency: '',
        processingFeeType: '%',
        processingFees: '',
        withholdingTax: '',
        productActivationTimeOpen: '',
        productActivationTimeClose: '',
        investmentApprovalMode: 'Automatic',
        couponPayoutMode: 'Automatic',
        statusControl: 'Active',
        penaltyOnEarlyRedemption: '0',
        earlyRedemptionOption: 'No',
        maturityDate: '',
        startDate: '',
        endDate: '',
        maturityType: '',
        autoRollover: false,
        gracePeriod: '',
        riskLevel: '',
        investmentRating: '',
        additionalDocumentationRequired: false,
        kycTierRestriction: '',
        regulatoryNotes: '',
        orderPriority: '',
        productCode: '',
        createdBy: '',
        createdDate: '',
        suspendProduct: false,
        archiveProduct: false,
        referralEligibility: false,
        notifyUser: false,
        productType: '',
        sector: '',
        interestRate: '',
        totalOffering: '',
        availableAmount: '',
        lockInPeriod: '',
        couponFrequency: '',
        riskRating: '',
        creditRating: '',
        status: 'Active',
        termSheet: [],
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
      productName: item.name || '',
      productCategory: item.productCategory || item.productType || '',
      issuerName: item.issuerName || '',
      description: item.description || '',
      investmentObjective: item.investmentObjective || '',
      minInvestment: item.minInvestment || '',
      maxInvestment: item.maxInvestment || '',
      couponInterestRate: item.couponInterestRate || (item.expectedReturn ? item.expectedReturn.replace('%', '') : ''),
      annualYield: item.annualYield || '',
      interestType: item.interestType || '',
      payoutFrequency: item.payoutFrequency || item.couponFrequency || '',
      processingFeeType: item.processingFeeType || '%',
      processingFees: item.processingFees || '',
      withholdingTax: item.withholdingTax || '',
      productActivationTimeOpen: item.productActivationTimeOpen || item.productActivationTime || '',
      productActivationTimeClose: item.productActivationTimeClose || '',
      investmentApprovalMode: item.investmentApprovalMode || 'Automatic',
      couponPayoutMode: item.couponPayoutMode || 'Automatic',
      statusControl: item.statusControl || item.status || 'Active',
      penaltyOnEarlyRedemption: item.penaltyOnEarlyRedemption || '0',
      earlyRedemptionOption: item.earlyRedemptionOption || 'No',
      maturityDate: item.maturityDate || item.maturity || '',
      startDate: item.startDate || '',
      endDate: item.endDate || '',
      maturityType: item.maturityType || '',
      autoRollover: item.autoRollover || false,
      gracePeriod: item.gracePeriod || '',
      riskLevel: item.riskLevel || item.risk || '',
      investmentRating: item.investmentRating || '',
      additionalDocumentationRequired: item.additionalDocumentationRequired || false,
      kycTierRestriction: item.kycTierRestriction || '',
      regulatoryNotes: item.regulatoryNotes || '',
      orderPriority: item.orderPriority || '',
      productCode: item.productCode || '',
      createdBy: item.createdBy || '',
      createdDate: item.createdDate || '',
      suspendProduct: item.suspendProduct || false,
      archiveProduct: item.archiveProduct || false,
      referralEligibility: item.referralEligibility || false,
      notifyUser: item.notifyUser || false,
      productType: item.productType || '',
      sector: item.category || '',
      interestRate: item.expectedReturn ? item.expectedReturn.replace('%', '') : '',
      totalOffering: item.amount || '',
      availableAmount: item.amount || '',
      lockInPeriod: item.lockInPeriod || '',
      couponFrequency: item.couponFrequency || '',
      riskRating: item.risk || '',
      creditRating: item.creditRating || '',
      status: item.status || 'Active',
      termSheet: item.termSheet || null,
    });
  };

  const handleUpdateItem = () => {
    const newErrors = {};
    
    if (formData.minInvestment && formData.minInvestment.trim() !== '') {
      const minInv = parseFloat(formData.minInvestment);
      if (isNaN(minInv)) {
        newErrors.minInvestment = 'Minimum investment must be a valid number';
      } else if (minInv < 1000) {
        newErrors.minInvestment = 'Minimum investment must be at least ₦1,000';
      }
    }
    
    if (formData.couponInterestRate && formData.couponInterestRate.trim() !== '') {
      const rate = parseFloat(formData.couponInterestRate);
      if (isNaN(rate)) {
        newErrors.couponInterestRate = 'Coupon/Interest rate must be a valid number';
      } else if (rate < 1 || rate > 100) {
        newErrors.couponInterestRate = 'Coupon/Interest rate must be between 1% and 100%';
      }
    }
    
    if (formData.annualYield && formData.annualYield.trim() !== '') {
      const yieldVal = parseFloat(formData.annualYield);
      if (isNaN(yieldVal)) {
        newErrors.annualYield = 'Annual yield must be a valid number';
      } else if (yieldVal < 1 || yieldVal > 100) {
        newErrors.annualYield = 'Annual yield must be between 1% and 100%';
      }
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(prev => ({ ...prev, ...newErrors }));
      setToast({
        type: 'error',
        title: 'Validation Error',
        message: 'Please fix the validation errors before updating'
      });
      return;
    }

    const updatedItem = {
      ...editingItem,
      name: formData.productName?.trim() ? formData.productName : editingItem.name,
      issuerName: formData.issuerName?.trim() ? formData.issuerName : editingItem.issuerName,
      productType: formData.productCategory?.trim() || formData.productType?.trim() ? (formData.productCategory || formData.productType) : editingItem.productType,
      category: formData.productCategory?.trim() || formData.sector?.trim() ? (formData.productCategory || formData.sector) : editingItem.category,
      description: formData.description?.trim() ? formData.description : editingItem.description,
      amount: formData.totalOffering?.trim() || formData.minInvestment ? (formData.totalOffering || formData.minInvestment) : editingItem.amount,
      expectedReturn: formData.annualYield ? `${formData.annualYield}%` : (formData.couponInterestRate ? `${formData.couponInterestRate}%` : (formData.interestRate ? `${formData.interestRate}%` : editingItem.expectedReturn)),
      maturity: formData.maturityDate?.trim() ? formData.maturityDate : editingItem.maturity,
      risk: formData.riskLevel?.trim() || formData.riskRating?.trim() ? (formData.riskLevel || formData.riskRating) : editingItem.risk,
      status: formData.statusControl || formData.status || editingItem.status,
      badges: formData.statusControl ? [formData.statusControl] : (formData.status ? [formData.status] : editingItem.badges),
      productCategory: formData.productCategory || editingItem.productCategory || '',
      investmentObjective: formData.investmentObjective || editingItem.investmentObjective,
      minInvestment: formData.minInvestment || editingItem.minInvestment,
      maxInvestment: formData.maxInvestment || editingItem.maxInvestment,
      couponInterestRate: formData.couponInterestRate || editingItem.couponInterestRate,
      annualYield: formData.annualYield || editingItem.annualYield,
      interestType: formData.interestType || editingItem.interestType,
      payoutFrequency: formData.payoutFrequency || editingItem.payoutFrequency,
      processingFeeType: formData.processingFeeType || editingItem.processingFeeType || '%',
      processingFees: formData.processingFees || editingItem.processingFees,
      withholdingTax: formData.withholdingTax || editingItem.withholdingTax,
      productActivationTimeOpen: formData.productActivationTimeOpen || editingItem.productActivationTimeOpen || editingItem.productActivationTime || '',
      productActivationTimeClose: formData.productActivationTimeClose || editingItem.productActivationTimeClose || '',
      investmentApprovalMode: formData.investmentApprovalMode || editingItem.investmentApprovalMode || 'Automatic',
      couponPayoutMode: formData.couponPayoutMode || editingItem.couponPayoutMode || 'Automatic',
      statusControl: formData.statusControl || editingItem.statusControl,
      penaltyOnEarlyRedemption: formData.penaltyOnEarlyRedemption || editingItem.penaltyOnEarlyRedemption,
      earlyRedemptionOption: formData.earlyRedemptionOption || editingItem.earlyRedemptionOption,
      startDate: formData.startDate || editingItem.startDate,
      endDate: formData.endDate || editingItem.endDate,
      maturityType: formData.maturityType || editingItem.maturityType,
      autoRollover: formData.autoRollover !== undefined ? formData.autoRollover : editingItem.autoRollover,
      gracePeriod: formData.gracePeriod || editingItem.gracePeriod,
      riskLevel: formData.riskLevel || editingItem.riskLevel,
      investmentRating: formData.investmentRating || editingItem.investmentRating,
      additionalDocumentationRequired: formData.additionalDocumentationRequired !== undefined ? formData.additionalDocumentationRequired : editingItem.additionalDocumentationRequired,
      kycTierRestriction: formData.kycTierRestriction || editingItem.kycTierRestriction,
      regulatoryNotes: formData.regulatoryNotes || editingItem.regulatoryNotes,
      orderPriority: formData.orderPriority || editingItem.orderPriority,
      productCode: formData.productCode || editingItem.productCode,
      createdBy: formData.createdBy || editingItem.createdBy,
      createdDate: formData.createdDate || editingItem.createdDate,
      suspendProduct: formData.suspendProduct !== undefined ? formData.suspendProduct : editingItem.suspendProduct,
      archiveProduct: formData.archiveProduct !== undefined ? formData.archiveProduct : editingItem.archiveProduct,
      referralEligibility: formData.referralEligibility !== undefined ? formData.referralEligibility : editingItem.referralEligibility,
      notifyUser: formData.notifyUser !== undefined ? formData.notifyUser : editingItem.notifyUser,
    };

    setPortfolioItems(prev => 
      prev.map(item => item.id === editingItem.id ? updatedItem : item)
    );

    setToast({
      type: 'success',
      title: 'Updated Successfully',
      message: 'Investment product has been updated'
    });

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
      status: 'Active',
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


  return (
    <div className={styles.addProductsContainer}>
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

      {activeTab === 'Portfolio Overview' && (
        <PortfolioOverview
          portfolioItems={portfolioItems}
          setToast={setToast}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      )}

      {activeTab === 'Investment Form' && (
        <InvestmentForm
          editingItem={editingItem}
          formData={formData}
          errors={errors}
          handleInputChange={handleInputChange}
          handleFileUpload={handleFileUpload}
          removeFile={removeFile}
          handleSaveDraft={handleSaveDraft}
          handleCreateProduct={handleCreateProduct}
          handleCancel={handleCancel}
          handleCancelEdit={handleCancelEdit}
          handleUpdateItem={handleUpdateItem}
        />
      )}
      
      <EditModal
        isOpen={!!editingItem}
        item={editingItem}
        formData={formData}
        errors={errors}
        onInputChange={handleInputChange}
        onUpdate={handleUpdateItem}
        onCancel={handleCancelEdit}
      />

      {toast && (
        <Toast
          type={toast.type}
          title={toast.title}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}

      {confirmDialog && (
        <ConfirmDialog
          isOpen={!!confirmDialog}
          type={confirmDialog.type}
          title={confirmDialog.title}
          message={confirmDialog.message}
          confirmText={confirmDialog.confirmText}
          cancelText={confirmDialog.cancelText}
          onConfirm={confirmDialog.onConfirm}
          onCancel={confirmDialog.onCancel}
        />
      )}
    </div>
  );
};

export default AddProducts;