import React, { useState, useRef, useEffect } from "react";
import styles from "../../css/AdminReferrals.module.css";
import { BiCaretDown, BiCaretUp } from "react-icons/bi";
import { ChevronDown, ChevronUpIcon } from "lucide-react";

function Div({ className, children, ...props }) {
  const mappedClass = className
    ?.split(" ")
    .map((c) => styles[c] || c)
    .join(" ");
  return (
    <div className={mappedClass} {...props}>
      {children}
    </div>
  );
}

const Export = () => {
  const [reportType, setReportType] = useState("All Referral");
  const [open, setOpen] = useState(false);
  const triggerRef = useRef(null);
  const listRef = useRef(null);

  const options = ["All Referral", "Completed Only", "Pending Only", "Fraud Cases"];

  useEffect(() => {
    function handleOutside(e) {
      if (
        !triggerRef.current?.contains(e.target) &&
        !listRef.current?.contains(e.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("touchstart", handleOutside);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("touchstart", handleOutside);
    };
  }, []);

  function focusOption(index) {
    const items = listRef.current?.querySelectorAll('[role="option"]');
    if (!items || items.length === 0) return;
    const i = Math.max(0, Math.min(index, items.length - 1));
    items[i].focus();
  }

  function onTriggerKeyDown(e) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      // focus first option next tick
      setTimeout(() => focusOption(0), 0);
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setOpen(true);
      setTimeout(() => focusOption(options.length - 1), 0);
    }
    if (e.key === "Escape") {
      setOpen(false);
    }
  }

  function onOptionKeyDown(e, idx, opt) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      selectOption(opt);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      focusOption(idx + 1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      focusOption(idx - 1);
    } else if (e.key === "Escape") {
      setOpen(false);
      triggerRef.current?.focus();
    }
  }

  function selectOption(opt) {
    setReportType(opt);
    setOpen(false);
    triggerRef.current?.focus();
  }

  return (
    <div
      className="content-panel"
      style={open ? { paddingBottom: "150px" } : undefined}
    >
      <h3 className={styles.exportTitle}>Data Export</h3>

      <Div className="btnRow">
        <button className={styles.exportBtn}>Export CSV</button>
        <button className={styles.exportBtn}>Export PDF</button>
      </Div>

      <label className={styles.label}>Report Type</label>

      {/* Trigger: use a button for accessibility */}
      <div className={styles.ExportdropdownWrapper}>
        <button
          ref={triggerRef}
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          className={styles.ExportdropdownTrigger}
          onClick={() => setOpen((s) => !s)}
          onKeyDown={onTriggerKeyDown}
        >
          <span className={styles.ExportdropdownLabel}>{reportType}</span>
          <span className={styles.caret}>{open ? <ChevronUpIcon size={20} color="black"/> : <ChevronDown size={20} color="black"/>}</span>
        </button>

        {open && (
          <div
            ref={listRef}
            role="listbox"
            tabIndex={-1}
            className={styles.ExportdropdownList}
            aria-activedescendant={reportType}
          >
            {options.map((opt, idx) => (
              <div
                key={opt}
                role="option"
                tabIndex={0}
                data-index={idx}
                aria-selected={opt === reportType}
                className={`${styles.ExportdropdownItem} ${
                  opt === reportType ? styles.selectedItem : ""
                }`}
                onClick={() => selectOption(opt)}
                onKeyDown={(e) => onOptionKeyDown(e, idx, opt)}
              >
                {opt}
              </div>
            ))}
          </div>
        )}
      </div>

      <button className={styles.generateBtn}>Generate Report</button>
    </div>
  );
};

export default Export;
