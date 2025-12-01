import React from "react";
import styles from "./DataTable.module.css";

/**
 * DataTable
 * Props:
 *  - columns: [{ header, key, styleMap? }]
 *      - styleMap: { value: className }  -> dynamic class per cell
 *  - data: array of objects
 *  - scrollHeight: height of table container
 */
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
                {columns.map((col, idx) => {
                  const cellValue = row[col.key];
                  const className =
                    col.styleMap && cellValue && col.styleMap[cellValue]
                      ? col.styleMap[cellValue]
                      : "";

                  return (
                    <td key={idx}>
                      <span
                        className={className}
                        style={{
                          borderRadius: "50px",
                          padding: "2px 10px",
                          textAlign: "center",
                        }}
                      >
                        {" "}
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
