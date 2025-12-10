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
                      <span>{col.header}</span>
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
                    <span>{col.header}</span>
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
              Previous
            </button>
            <div className={styles.pageNumbers}>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  className={`${styles.pageBtn} ${currentPage === page ? styles.pageActive : ''}`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}
            </div>
            <button 
              className={styles.paginationBtn}
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;