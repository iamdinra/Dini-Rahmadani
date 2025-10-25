
import React from 'react';
import { Student, StudentCategory, ApplicationStatus, StudentType, PaymentStatus } from '../types';
import StatusBadge from './StatusBadge';

interface StudentTableRowProps {
  student: Student;
  onUpdate: (student: Student) => void;
  onViewFile: (fileUrl: string | null) => void;
}

const StudentTableRow: React.FC<StudentTableRowProps> = ({ student, onUpdate, onViewFile }) => {
  const { 
    name, formPurchaseDate, observationDate, sitInDate, interviewDate, uniformStatus, 
    assessmentNote, feeStatus, acceptanceLetterDate, acceptanceLetterFile, paymentStatus, paymentDate,
    studentCategory, applicationStatus, studentType, transferGrade,
  } = student;

  const formatDate = (dateString: string | null) => dateString || '-';

  const isPaid = paymentStatus === PaymentStatus.BOOKING_FEE || paymentStatus === PaymentStatus.FULL;

  const rowClass = applicationStatus === ApplicationStatus.CANCELLED 
    ? 'opacity-50 line-through' 
    : 'hover:bg-slate-50 dark:hover:bg-slate-600';

  const nameClass = isPaid 
    ? 'text-green-600 dark:text-green-400 font-bold'
    : '';

  return (
    <tr className={`bg-white dark:bg-slate-800 border-b dark:border-slate-700 ${rowClass}`}>
      <th scope="row" className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap dark:text-white sticky left-0 z-10 bg-white dark:bg-slate-800 min-w-64 border-r dark:border-slate-700">
        <div className="flex items-center gap-2 flex-wrap">
          {isPaid && (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          )}
          <span className={nameClass}>{name}</span>
          {studentCategory === StudentCategory.ABK && (
            <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">
              ABK
            </span>
          )}
          {studentType === StudentType.TRANSFER && (
             <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-300">
              Pindahan {transferGrade ? `(${transferGrade})` : ''}
            </span>
          )}
        </div>
      </th>
      <td className="px-6 py-4">{formatDate(formPurchaseDate)}</td>
      <td className="px-6 py-4">{formatDate(observationDate)}</td>
      <td className="px-6 py-4">{formatDate(sitInDate)}</td>
      <td className="px-6 py-4">{formatDate(interviewDate)}</td>
      <td className="px-6 py-4">
        <StatusBadge status={uniformStatus} type="uniform" />
      </td>
      <td className="px-6 py-4">
        <StatusBadge status={assessmentNote} type="assessment" />
      </td>
      <td className="px-6 py-4">
        <StatusBadge status={feeStatus} type="fee" />
      </td>
      <td className="px-6 py-4">
        <div className="flex flex-col">
          <span>{formatDate(acceptanceLetterDate)}</span>
          {acceptanceLetterFile && (
            <button
              onClick={() => onViewFile(acceptanceLetterFile)}
              className="mt-1 text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline text-left focus:outline-none"
            >
              Lihat Surat
            </button>
          )}
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex flex-col">
            <StatusBadge status={paymentStatus} type="payment" />
            <span className="text-xs text-slate-500 mt-1">{formatDate(paymentDate)}</span>
        </div>
      </td>
      <td className="px-6 py-4">
        <button
          onClick={() => onUpdate(student)}
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline disabled:text-slate-400 disabled:no-underline"
          disabled={applicationStatus === ApplicationStatus.CANCELLED}
        >
          Update
        </button>
      </td>
    </tr>
  );
};

export default StudentTableRow;
