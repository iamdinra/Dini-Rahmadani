import React from 'react';

interface DashboardHeaderProps {
  academicYear: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ academicYear }) => {
  return (
    <header className="mb-8 text-center">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white pt-8 uppercase">
        Dashboard Penerimaan Siswa Baru SD Lazuardi
      </h1>
      <p className="text-slate-600 dark:text-slate-400 mt-1">
        Monitoring Alur Pendaftaran Siswa Baru SD Lazuardi (Tahun Ajaran {academicYear}).
      </p>
    </header>
  );
};

export default DashboardHeader;