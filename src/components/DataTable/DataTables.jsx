import React, { useState } from "react";
import styles from "./DataTable.module.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * DataTable
 * Props:
 *  - columns: [{ header, key, styleMap?, sortable?, render? }]
 *      - styleMap: { value: className }  -> dynamic class per cell
 *      - sortable: boolean (default: true) -> whether column is sortable
 *      - render: function(row) -> custom render function for cell
 *  - data: array of objects
 *  - scrollHeight: height of table container
 *  - onRowClick: function to handle row clicks
 *  - loading: boolean to show loading state
 *  - rowsPerPage: number of rows per page (default: 5)
 *  - showPagination: boolean to enable pagination (default: true)
 */
const DataTable = ({ 
  columns, 
  data, 
  scrollHeight = 400, 
  onRowClick, 
  loading,
  rowsPerPage = 5,
  showPagination = true 
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Pagination logic
  const totalPages = Math.ceil(data.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedData = showPagination ? data.slice(startIndex, endIndex) : data;

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  if (loading) {
    return (
      <div className={styles.responsiveWrapper}>
        <div
          className={styles.tableContainer}
          style={{ maxHeight: `${scrollHeight}px` }}
        >
          <table className={styles.dataTable}>
            <thead>
              <tr>
                {columns.map((col, idx) => (
                  <th 
                    key={idx} 
                    className={styles.tableHeader}
                  >
                    <div className={styles.headerContent}>
                      {typeof col.header === 'function' || React.isValidElement(col.header) 
                        ? col.header 
                        : <span>{col.header}</span>}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={columns.length} className={styles.loadingCell}>
                  <div className={styles.loadingSpinner}></div>
                  <span>Loading data...</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.responsiveWrapper}>
      <div
        className={styles.tableContainer}
        style={showPagination ? {} : { maxHeight: `${scrollHeight}px` }}
      >
        <table className={styles.dataTable}>
          <thead>
            <tr>
              {columns.map((col, idx) => (
                <th 
                  key={idx} 
                  className={styles.tableHeader}
                >
                  <div className={styles.headerContent}>
                    {typeof col.header === 'function' || React.isValidElement(col.header) 
                      ? col.header 
                      : <span>{col.header}</span>}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, i) => (
              <tr 
                key={i} 
                className={`${styles.tableRow} ${onRowClick ? styles.clickableRow : ''}`}
                onClick={() => onRowClick && onRowClick(row)}
              >
                {columns.map((col, idx) => {
                  // If custom render function exists, use it
                  if (col.render) {
                    return (
                      <td key={idx} className={styles.tableCell}>
                        {col.render(row)}
                      </td>
                    );
                  }

                  // Default rendering
                  const cellValue = row[col.key];
                  const className =
                    col.styleMap && cellValue && col.styleMap[cellValue]
                      ? col.styleMap[cellValue]
                      : "";

                  return (
                    <td key={idx} className={styles.tableCell}>
                      <span className={`${styles.badge} ${className}`}>
                        {cellValue}
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {showPagination && data.length > 0 && (
        <div className={styles.paginationContainer}>
          <div className={styles.paginationInfo}>
            Showing {startIndex + 1} to {Math.min(endIndex, data.length)} of {data.length} entries
          </div>
          <div className={styles.paginationControls}>
            <button 
              className={styles.paginationBtn}
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              <ChevronLeft size={18} />
              <span className={styles.paginationBtnText}>Previous</span>
            </button>
            <div className={styles.pageNumbers}>
              {Array.from({ length: Math.min(totalPages, 4) }, (_, i) => {
                let pageNum;
                if (totalPages <= 4) {
                  pageNum = i + 1;
                } else if (currentPage <= 2) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 1) {
                  pageNum = totalPages - 3 + i;
                } else {
                  pageNum = currentPage - 1 + i;
                }
                return (
                  <button
                    key={pageNum}
                    className={`${styles.pageBtn} ${currentPage === pageNum ? styles.pageActive : ''}`}
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
            <button 
              className={styles.paginationBtn}
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              <span className={styles.paginationBtnText}>Next</span>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;