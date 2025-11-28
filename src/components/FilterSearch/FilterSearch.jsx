import React, { useState } from "react";
import styles from "./FilterSearch.module.css";
import { Search, SlidersHorizontal, Calendar, RotateCcw, ChevronDown } from "lucide-react";

const CustomSelect = ({ label, value, onChange, options }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.customSelect}>
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

const FilterSearch = ({ modules = [], severities = [], admins = [], onFilterChange }) => {
  const [filters, setFilters] = useState({
    search: "",
    module: "",
    severity: "",
    admin: "",
    date: "",
  });

  const [mobileOpen, setMobileOpen] = useState(false);

  const updateFilter = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const resetFilters = () => {
    const reset = { search: "", module: "", severity: "", admin: "", date: "" };
    setFilters(reset);
    onFilterChange(reset);
  };

  return (
    <>
      {/* Mobile Button */}
      <button className={styles.mobileFilterBtn} onClick={() => setMobileOpen(true)}>
        Filter & Search
      </button>

      {/* Mobile-only Search */}
      <div className={styles.mobileSearchWrapper}>
        <Search size={18} className={styles.icon} />
        <input
          type="text"
          placeholder="Search Logs"
          value={filters.search}
          onChange={(e) => updateFilter("search", e.target.value)}
        />
      </div>

      {/* Overlay / Filter Box */}
      <div className={`${styles.filterBox} ${mobileOpen ? styles.mobileOpen : ""}`}>
        <div className={styles.header}>
          <div className={styles.heading}>
            <SlidersHorizontal size={20} />
            <h3>Filter & Search</h3>
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
          {/* Desktop Search (hidden on mobile) */}
          <div className={styles.inputWrapper}>
            <Search size={18} className={styles.icon} />
            <input
              type="text"
              placeholder="Search Logs"
              value={filters.search}
              onChange={(e) => updateFilter("search", e.target.value)}
            />
          </div>

          {/* Module */}
          <CustomSelect
            label="All Modules"
            value={filters.module}
            options={modules}
            onChange={(v) => updateFilter("module", v)}
          />

          {/* Severities */}
          <CustomSelect
            label="All Severities"
            value={filters.severity}
            options={severities}
            onChange={(v) => updateFilter("severity", v)}
          />

          {/* Admin */}
          <CustomSelect
            label="All Admins"
            value={filters.admin}
            options={admins}
            onChange={(v) => updateFilter("admin", v)}
          />

          {/* Single Date */}
          <div className={styles.inputWrapper}>
            <Calendar size={18} className={styles.icon} />
            <input
              type="date"
              value={filters.date}
              onChange={(e) => updateFilter("date", e.target.value)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSearch;
