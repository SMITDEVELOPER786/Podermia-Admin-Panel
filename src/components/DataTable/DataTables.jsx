import React from "react";
import styles from "./DataTable.module.css";

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
 */
const DataTable = ({ columns, data, scrollHeight = 400, onRowClick, loading }) => {
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
            {data.map((row, i) => (
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
                      <span
                        className={`${styles.badge} ${className}`}
                        style={col.styleMap ? {
                          borderRadius: "50px",
                          padding: "4px 12px",
                          textAlign: "center",
                          display: "inline-block",
                          minWidth: "80px",
                        } : {}}
                      >
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
    </div>
  );
};

export default DataTable;