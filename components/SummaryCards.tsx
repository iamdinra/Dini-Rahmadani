import React from 'react';

interface SummaryData {
  formsPurchased: number;
  observed: number;
  sitIn: number;
  interviewed: number;
  paid: number;
  cancelled: number;
}

interface SummaryCardsProps {
  data: SummaryData;
  onFilterChange: (filter: string) => void;
  activeFilter: string;
}

interface SummaryCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  filterKey: string;
  isActive: boolean;
  onClick: (filter: string) => void;
  colorScheme?: 'blue' | 'red';
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, icon, filterKey, isActive, onClick, colorScheme = 'blue' }) => {
  const colorStyles = {
    blue: 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300',
    red: 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300',
  };
  
  const activeStyle = isActive ? 'ring-2 ring-offset-2 ring-blue-500 dark:ring-offset-slate-900' : 'shadow-lg';

  return (
    <button
      onClick={() => onClick(filterKey)}
      className={`bg-white dark:bg-slate-800 p-4 rounded-xl flex items-center space-x-3 w-full text-left transition-all duration-200 hover:shadow-md hover:-translate-y-1 focus:outline-none ${activeStyle}`}
    >
      <div className={`flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full ${colorStyles[colorScheme]}`}>
        {icon}
      </div>
      <div>
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 truncate">{title}</p>
        <p className="mt-1 text-xl font-semibold text-slate-900 dark:text-white">{value}</p>
      </div>
    </button>
  );
};

const SummaryCards: React.FC<SummaryCardsProps> = ({ data, onFilterChange, activeFilter }) => {
  const cards = [
    { 
      title: 'Pembelian Formulir', 
      value: data.formsPurchased, 
      filterKey: 'formsPurchased',
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
    },
    { 
      title: 'Sudah Observasi', 
      value: data.observed,
      filterKey: 'observed',
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
    },
    { 
      title: 'Sudah Sit In', 
      value: data.sitIn,
      filterKey: 'sitIn',
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
    },
    { 
      title: 'Sudah Interview', 
      value: data.interviewed,
      filterKey: 'interviewed',
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
    },
    { 
      title: 'Booking Fee / Lunas', 
      value: data.paid,
      filterKey: 'paid',
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
    },
    { 
      title: 'Pendaftaran Dibatalkan', 
      value: data.cancelled,
      filterKey: 'cancelled',
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>,
      colorScheme: 'red'
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
      {cards.map(card => (
        <SummaryCard 
            key={card.title} 
            title={card.title} 
            value={card.value} 
            icon={card.icon} 
            colorScheme={(card as any).colorScheme} 
            filterKey={card.filterKey}
            isActive={activeFilter === card.filterKey}
            onClick={onFilterChange}
        />
      ))}
    </div>
  );
};

export default SummaryCards;