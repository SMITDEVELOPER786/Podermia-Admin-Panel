import React, { useState } from 'react';
import FilterSearch from '../components/FilterSearch/FilterSearch';
import styles from '../css/Investment.module.css';

const InvestmentProducts = () => {
  const [filters, setFilters] = useState({});

  // Sample product data
  const products = [
    {
      issuer: 'FGN',
      product: 'T-Bill 182 days',
      rate: '12.5%',
      minAmount: '₦10,000',
      available: '$50,000.000',
      status: 'Active'
    },
    {
      issuer: 'ABC crop',
      product: 'Corporate bond',
      rate: '1.52%',
      minAmount: '₦50,00',
      available: '$25,000.000',
      status: 'Active'
    },
    {
      issuer: 'XYZ Ltd',
      product: 'Commercial paper',
      rate: '13.8%',
      minAmount: '₦ 25,000',
      available: '0',
      status: 'Sold out'
    },
    {
      issuer: 'DEF Bank',
      product: 'Fixed Deposit Bond',
      rate: '8.75%',
      minAmount: '₦100,000',
      available: '$75,000.000',
      status: 'Active'
    },
    {
      issuer: 'GHI Crop',
      product: 'Infrastructure bond',
      rate: '1.52%',
      minAmount: '₦500,000',
      available: '$200,000.000',
      status: 'Active'
    },
  ];

  const filterConfig = {
    showSearch: true,
    searchPlaceholder: 'Search All Products Issues....',
    dropdowns: [
      {
        key: 'type',
        label: 'All Type',
        options: ['T-Bill', 'Bond', 'Commercial Paper']
      },
      {
        key: 'status',
        label: 'All Status',
        options: ['Active', 'Inactive', 'Sold Out']
      },
      {
        key: 'sector',
        label: 'All Sector',
        options: ['Government', 'Corporate', 'Banking', 'Energy', 'Commercial']
      }
    ],
    showDate: false,
    showMonth: false,
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  // Filter products based on active filters
  const filteredProducts = products.filter((product) => {
    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const matchesSearch = 
        product.issuer.toLowerCase().includes(searchLower) ||
        product.product.toLowerCase().includes(searchLower) ||
        product.rate.toLowerCase().includes(searchLower) ||
        product.minAmount.toLowerCase().includes(searchLower) ||
        product.available.toLowerCase().includes(searchLower);
      
      if (!matchesSearch) return false;
    }

    // Type filter
    if (filters.type && filters.type !== 'All Type') {
      const productType = filters.type.toLowerCase();
      if (!product.product.toLowerCase().includes(productType.split(' ')[0])) {
        return false;
      }
    }

    // Status filter
    if (filters.status && filters.status !== 'All Status') {
      if (product.status.toLowerCase() !== filters.status.toLowerCase()) {
        return false;
      }
    }

    // Sector filter - you may need to add sector field to products
    if (filters.sector && filters.sector !== 'All Sector') {
      // This assumes you'll add sector info to products later
      // For now, it won't filter by sector
    }

    return true;
  });

  return (
    <div className={styles.investmentProductsContainer}>
      <FilterSearch 
        config={filterConfig} 
        onFilterChange={handleFilterChange}
      />

      <div className={styles.productsListContainer}>
        {filteredProducts.map((product, index) => (
          <div key={index} className={styles.productCard}>
            <div className={styles.productInfo}>
              <div className={styles.productField}>
                <span className={styles.productLabel}>Issuer</span>
                <span className={styles.productValue}>{product.issuer}</span>
              </div>

              <div className={styles.productField}>
                <span className={styles.productLabel}>Product</span>
                <span className={styles.productValue}>{product.product}</span>
              </div>

              <div className={styles.productField}>
                <span className={styles.productLabel}>Rate</span>
                <span className={styles.productValue}>{product.rate}</span>
              </div>

              <div className={styles.productField}>
                <span className={styles.productLabel}>Min Ammount</span>
                <span className={styles.productValue}>{product.minAmount}</span>
              </div>

              <div className={styles.productField}>
                <span className={styles.productLabel}>Available</span>
                <span className={styles.productValue}>{product.available}</span>
              </div>
            </div>

            <div className={styles.productStatus}>
              <button 
                className={`${styles.statusBtn} ${
                  product.status === 'Active' ? styles.statusActive : styles.statusSoldOut
                }`}
              >
                {product.status}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.productsFooter}>
        <span>Showing {filteredProducts.length} of {products.length} Products</span>
      </div>
    </div>
  );
};

export default InvestmentProducts
