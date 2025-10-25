import React from 'react';

const FILTERS = [
  { key: 'all', label: 'Semua' },
  { key: 'internal', label: 'Internal' },
  { key: 'external', label: 'Eksternal' },
  { key: 'karyawan', label: 'Karyawan' },
  { key: 'abk', label: 'Special Needs' },
];

interface FilterControlsProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const FilterControls: React.FC<FilterControlsProps> = ({ activeFilter, onFilterChange }) => {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {FILTERS.map(({ key, label }) => {
        const isActive = activeFilter === key;
        const baseClasses = "px-4 py-2 text-sm font-medium rounded-lg focus:outline-none focus:ring-4 transition-colors duration-200";
        const activeClasses = "bg-blue-600 text-white focus:ring-blue-300 dark:focus:ring-blue-800";
        const inactiveClasses = "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 focus:ring-slate-200 dark:focus:ring-slate-600 border border-slate-200 dark:border-slate-700";
        
        return (
          <button
            key={key}
            onClick={() => onFilterChange(key)}
            className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};

export default FilterControls;
