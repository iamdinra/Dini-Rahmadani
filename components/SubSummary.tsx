import React from 'react';

interface SubSummaryData {
  transfers: number;
  internal: number;
  external: number;
  employees: number;
  specialNeeds: number;
}

interface SubSummaryProps {
  data: SubSummaryData;
}

const StatItem: React.FC<{ label: string; value: number }> = ({ label, value }) => (
  <div className="text-center px-2">
    <p className="text-2xl font-bold text-slate-900 dark:text-white">{value}</p>
    <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">{label}</p>
  </div>
);


const SubSummary: React.FC<SubSummaryProps> = ({ data }) => {
  return (
    <div className="mt-6">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-y-4">
          <StatItem label="Internal" value={data.internal} />
          <StatItem label="Eksternal" value={data.external} />
          <StatItem label="Karyawan" value={data.employees} />
          <StatItem label="Pindahan" value={data.transfers} />
          <StatItem label="Special Needs" value={data.specialNeeds} />
        </div>
    </div>
  );
};

export default SubSummary;
