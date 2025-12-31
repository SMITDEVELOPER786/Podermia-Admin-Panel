import React, { useState, useEffect, useRef } from "react";
import styles from "./FilterSearch.module.css";
import { Search, SlidersHorizontal, Calendar, RotateCcw, ChevronDown } from "lucide-react";

// ===== Reusable Dropdown Component =====
const CustomSelect = ({ label, value, onChange, options }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div className={styles.customSelect} ref={dropdownRef}>
      <div className={styles.selected} onClick={() => setOpen((p) => !p)}>
        {value || label}
        <ChevronDown
          size={18}
          className={`${styles.chevron} ${open ? styles.rotate : ""}`}
        />
      </div>

      {open && (
        <ul className={styles.dropdown}>
          {options.map((opt, index) => (
            <li
              key={index}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// ===== Main Filter Component =====
const FilterSearch = ({
  config = {},
  onFilterChange,
}) => {
  const {
    showSearch = true,
    searchPlaceholder = "Search...",
    dropdowns = [],
    showDate = false,
    showMonth = false,
    showDatePeriod = false,
    heading = "Filter & Search",
  } = config;

  const initialFilters = {
    search: "",
    date: "",
    month: "",
    ...dropdowns.reduce((acc, d) => ({ ...acc, [d.key]: "" }), {}),
  };

  const [filters, setFilters] = useState(initialFilters);
  const [mobileOpen, setMobileOpen] = useState(false);

  const updateFilter = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const resetFilters = () => {
    setFilters(initialFilters);
    onFilterChange(initialFilters);
  };

  return (
    <>
      {/* Mobile Button */}
      <button className={styles.mobileFilterBtn} onClick={() => setMobileOpen(true)}>
        {heading}
      </button>

      {/* Mobile Search (Conditional) */}
      {showSearch && (
        <div className={styles.mobileSearchWrapper}>
          <Search size={18} className={styles.icon} />
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={filters.search}
            onChange={(e) => updateFilter("search", e.target.value)}
          />
        </div>
      )}

      {/* Filter Box */}
      <div className={`${styles.filterBox} ${mobileOpen ? styles.mobileOpen : ""}`}>
        <div className={styles.header}>
          <div className={styles.heading}>
            <SlidersHorizontal size={20} />
            <h3>{heading}</h3>
          </div>

          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <button onClick={resetFilters} className={styles.resetBtn}>
              <RotateCcw size={18} />
              Reset
            </button>
            <button className={styles.closeBtn} onClick={() => setMobileOpen(false)}>
              Close
            </button>
          </div>
        </div>

        <div className={styles.filtersGrid}>
          {/* Desktop Search (Conditional) */}
          {showSearch && (
            <div className={styles.inputWrapper}>
              <Search size={18} className={styles.icon} />
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={filters.search}
                onChange={(e) => updateFilter("search", e.target.value)}
              />
            </div>
          )}

          {/* ===== Dynamic Dropdowns ===== */}
          {dropdowns.map((d) => (
            <CustomSelect
              key={d.key}
              label={d.label}
              value={filters[d.key]}
              options={d.options}
              onChange={(v) => updateFilter(d.key, v)}
            />
          ))}

          {/* ===== Date (Conditional) ===== */}
          {showDate && (
            <div className={styles.inputWrapper}>
              <Calendar size={18} className={styles.icon} />
              <input
                type="date"
                value={filters.date}
                onChange={(e) => updateFilter("date", e.target.value)}
              />
            </div>
          )}

          {/* ===== Month (Conditional) ===== */}
          {showMonth && (
            <div className={styles.inputWrapper}>
              <Calendar size={18} className={styles.icon} />
              <input
                type="month"
                value={filters.month}
                onChange={(e) => updateFilter("month", e.target.value)}
              />
            </div>
          )}

          {/* ===== Date Period (Conditional) ===== */}
          {showDatePeriod && (
            <div className={styles.inputWrapper}>
              <Calendar size={18} className={styles.icon} />
              <input
                type="date"
                value={filters.date}
                onChange={(e) => updateFilter("date", e.target.value)}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FilterSearch;
