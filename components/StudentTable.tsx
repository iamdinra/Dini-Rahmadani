
import React from 'react';
import { Student } from '../types';
import StudentTableRow from './StudentTableRow';

interface StudentTableProps {
  students: Student[];
  onUpdate: (student: Student) => void;
  onViewFile: (fileUrl: string | null) => void;
}

const StudentTable: React.FC<StudentTableProps> = ({ students, onUpdate, onViewFile }) => {
  const tableHeaders = [
    { name: 'Nama Siswa', sticky: true, position: 'left-0', minWidth: 'min-w-64' },
    { name: 'Tgl Beli Formulir' },
    { name: 'Observasi' },
    { name: 'Sit In' },
    { name: 'Interview' },
    { name: 'Seragam' },
    { name: 'Asesmen Lanjutan' },
    { name: 'Biaya' },
    { name: 'Surat Penerimaan' },
    { name: 'Pembayaran' },
    { name: 'Aksi' }
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-slate-500 dark:text-slate-400">
        <thead className="text-xs text-slate-700 uppercase bg-slate-50 dark:bg-slate-700 dark:text-slate-300">
          <tr>
            {tableHeaders.map(header => (
              <th 
                key={header.name} 
                scope="col" 
                className={`
                  px-6 py-3 whitespace-nowrap 
                  ${header.sticky ? 'sticky z-10 bg-slate-50 dark:bg-slate-700 border-r dark:border-slate-600' : ''}
                  ${header.position || ''}
                  ${header.minWidth || ''}
                `}
              >
                {header.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <StudentTableRow 
              key={student.id} 
              student={student} 
              onUpdate={onUpdate} 
              onViewFile={onViewFile}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
