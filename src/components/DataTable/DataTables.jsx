// DataTable.jsx
import React from "react";
import styles from "./DataTable.module.css";

const DataTable = ({ columns, data, scrollHeight = 400 }) => {
  return (
    <div className={styles.responsiveWrapper}>
      <div
        className={styles.tableContainer}
        style={{ maxHeight: `${scrollHeight}px` }}
      >
        <table>
          <thead>
            <tr>
              {columns.map((col, idx) => (
                <th key={idx}>{col.header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i}>
                {columns.map((col, idx) => (
                  <td key={idx}>
                    {col.key === "severity" ? (
                      <span
                        className={
                          styles[`severity-${row[col.key].toLowerCase()}`]
                        }
                      >
                        {row[col.key]}
                      </span>
                    ) : (
                      row[col.key]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
