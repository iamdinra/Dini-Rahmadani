
import React, { useState, useCallback, useMemo } from 'react';
import { MOCK_STUDENTS, ACADEMIC_YEAR } from './constants';
import { Student, UniformStatus, AssessmentStatus, FeeStatus, PaymentStatus, StudentType, StudentCategory, ApplicationStatus } from './types';
import DashboardHeader from './components/DashboardHeader';
import StudentTable from './components/StudentTable';
import UpdateModal from './components/UpdateModal';
import SummaryCards from './components/SummaryCards';
import Pagination from './components/Pagination';
import FilterControls from './components/FilterControls';
import SubSummary from './components/SubSummary';

const newStudentTemplate: Omit<Student, 'id'> = {
  name: '',
  formPurchaseDate: null,
  observationDate: null,
  sitInDate: null,
  transferGrade: null,
  interviewDate: null,
  uniformStatus: UniformStatus.PENDING,
  assessmentNote: AssessmentStatus.NOT_REQUIRED,
  feeStatus: FeeStatus.PENDING,
  acceptanceLetterDate: null,
  acceptanceLetterFile: null,
  paymentStatus: PaymentStatus.PENDING,
  paymentDate: null,
  studentType: StudentType.EXTERNAL,
  studentCategory: StudentCategory.REGULER,
  applicationStatus: ApplicationStatus.ACTIVE,
};

interface FileViewerModalProps {
  fileUrl: string;
  onClose: () => void;
}

const FileViewerModal: React.FC<FileViewerModalProps> = ({ fileUrl, onClose }) => {
  return (
    <div
      className="fixed inset-0 z-60 flex justify-center items-center w-full h-full bg-black bg-opacity-75"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="relative bg-white dark:bg-slate-800 rounded-lg shadow-xl w-full max-w-4xl h-[90vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-2 border-b dark:border-slate-600">
           <span className="text-sm font-medium text-slate-500 dark:text-slate-400 pl-2">Pratinjau Dokumen</span>
            <button
                type="button"
                className="text-slate-400 bg-transparent hover:bg-slate-200 hover:text-slate-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-slate-600 dark:hover:text-white"
                onClick={onClose}
                aria-label="Close"
            >
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span className="sr-only">Close modal</span>
            </button>
        </div>
        <div className="flex-grow p-4 overflow-auto">
           <iframe src={fileUrl} title="Pratinjau Surat Penerimaan" className="w-full h-full border-0" />
        </div>
      </div>
    </div>
  );
};


const App: React.FC = () => {
  const [students, setStudents] = useState<Student[]>(MOCK_STUDENTS);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | Omit<Student, 'id'> | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [fileToView, setFileToView] = useState<string | null>(null);

  const handleViewFile = useCallback((fileUrl: string | null) => {
    if (fileUrl) {
      setFileToView(fileUrl);
    }
  }, []);

  const handleCloseFileViewer = useCallback(() => {
    setFileToView(null);
  }, []);

  const handleOpenModal = useCallback((student?: Student) => {
    if (student) {
      setSelectedStudent(student);
    } else {
      setSelectedStudent(newStudentTemplate);
    }
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedStudent(null);
    setIsModalOpen(false);
  }, []);

  const handleSaveStudent = useCallback((updatedStudentData: Student | Omit<Student, 'id'>) => {
    if ('id' in updatedStudentData) {
      // Update existing student
      setStudents(prevStudents =>
        prevStudents.map(student =>
          student.id === updatedStudentData.id ? updatedStudentData : student
        )
      );
    } else {
      // Add new student
      const newStudentWithId: Student = {
        ...updatedStudentData,
        id: Math.max(...students.map(s => s.id), 0) + 1, // simple ID generation
      };
      setStudents(prevStudents => [...prevStudents, newStudentWithId]);
    }
    handleCloseModal();
  }, [students, handleCloseModal]);

  const subSummaryData = useMemo(() => {
    const activeStudents = students.filter(s => s.applicationStatus !== ApplicationStatus.CANCELLED);
    return {
      internal: activeStudents.filter(s => s.studentType === StudentType.INTERNAL).length,
      external: activeStudents.filter(s => s.studentType === StudentType.EXTERNAL).length,
      employees: activeStudents.filter(s => s.studentType === StudentType.KARYAWAN).length,
      transfers: activeStudents.filter(s => s.studentType === StudentType.TRANSFER).length,
      specialNeeds: activeStudents.filter(s => s.studentCategory === StudentCategory.ABK).length,
    }
  }, [students]);

  const filteredStudents = useMemo(() => {
    let tempStudents = students;

    // Filter logic
    switch (activeFilter) {
      case 'internal':
        tempStudents = tempStudents.filter(s => s.studentType === StudentType.INTERNAL);
        break;
      case 'external':
        tempStudents = tempStudents.filter(s => s.studentType === StudentType.EXTERNAL);
        break;
      case 'karyawan':
        tempStudents = tempStudents.filter(s => s.studentType === StudentType.KARYAWAN);
        break;
      case 'abk':
        tempStudents = tempStudents.filter(s => s.studentCategory === StudentCategory.ABK);
        break;
      case 'formsPurchased':
        tempStudents = tempStudents.filter(s => s.formPurchaseDate && s.applicationStatus !== ApplicationStatus.CANCELLED);
        break;
      case 'observed':
        tempStudents = tempStudents.filter(s => s.observationDate && s.applicationStatus !== ApplicationStatus.CANCELLED);
        break;
      case 'sitIn':
        tempStudents = tempStudents.filter(s => s.sitInDate && s.applicationStatus !== ApplicationStatus.CANCELLED);
        break;
      case 'interviewed':
        tempStudents = tempStudents.filter(s => s.interviewDate && s.applicationStatus !== ApplicationStatus.CANCELLED);
        break;
      case 'paid':
        tempStudents = tempStudents.filter(s => (s.paymentStatus === PaymentStatus.BOOKING_FEE || s.paymentStatus === PaymentStatus.FULL) && s.applicationStatus !== ApplicationStatus.CANCELLED);
        break;
      case 'cancelled':
        tempStudents = tempStudents.filter(s => s.applicationStatus === ApplicationStatus.CANCELLED);
        break;
      default: // 'all'
        // No filter
        break;
    }

    // Search logic
    if (searchQuery) {
      tempStudents = tempStudents.filter(s =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return tempStudents;
  }, [students, activeFilter, searchQuery]);
  
  const summaryData = useMemo(() => {
    // Summary data should reflect the whole dataset, not the filtered one
    const activeStudents = students.filter(s => s.applicationStatus !== ApplicationStatus.CANCELLED);
    return {
      formsPurchased: activeStudents.filter(s => s.formPurchaseDate).length,
      observed: activeStudents.filter(s => s.observationDate).length,
      sitIn: activeStudents.filter(s => s.sitInDate).length,
      interviewed: activeStudents.filter(s => s.interviewDate).length,
      paid: activeStudents.filter(s => s.paymentStatus === PaymentStatus.BOOKING_FEE || s.paymentStatus === PaymentStatus.FULL).length,
      cancelled: students.filter(s => s.applicationStatus === ApplicationStatus.CANCELLED).length,
    };
  }, [students]);

  const paginatedStudents = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredStudents.slice(startIndex, endIndex);
  }, [filteredStudents, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleItemsPerPageChange = (size: number) => {
    setItemsPerPage(size);
    setCurrentPage(1); // Reset to first page
  };

  const handleFilterChange = useCallback((filter: string) => {
    // If clicking the same filter, reset to 'all'
    setActiveFilter(prevFilter => prevFilter === filter ? 'all' : filter);
    setCurrentPage(1); // Reset to first page on filter change
  }, []);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  }, []);


  return (
    <div className="min-h-screen text-slate-800 dark:text-slate-200 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <DashboardHeader academicYear={ACADEMIC_YEAR} />
        <main>
          <SummaryCards data={summaryData} onFilterChange={handleFilterChange} activeFilter={activeFilter} />
          <SubSummary data={subSummaryData} />

          <div className="mt-8 mb-4 flex justify-between items-center flex-wrap gap-4">
            <FilterControls activeFilter={activeFilter} onFilterChange={handleFilterChange} />
             <div className="flex items-center gap-4 flex-1 sm:flex-none sm:justify-end">
                <div className="relative flex-1 sm:flex-auto">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        placeholder="Cari nama siswa..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md leading-5 bg-white dark:bg-slate-700 dark:border-slate-600 text-slate-900 dark:text-slate-200 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:placeholder-slate-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                </div>
                <button
                onClick={() => handleOpenModal()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 font-medium text-sm"
                >
                Tambah Calon Siswa Baru
                </button>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden">
            <StudentTable students={paginatedStudents} onUpdate={handleOpenModal} onViewFile={handleViewFile} />
            {filteredStudents.length > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                itemsPerPage={itemsPerPage}
                onItemsPerPageChange={handleItemsPerPageChange}
                totalItems={filteredStudents.length}
              />
            )}
          </div>
        </main>
      </div>
      {isModalOpen && selectedStudent && (
        <UpdateModal
          student={selectedStudent}
          onClose={handleCloseModal}
          onSave={handleSaveStudent}
          onViewFile={handleViewFile}
        />
      )}
      {fileToView && (
        <FileViewerModal
            fileUrl={fileToView}
            onClose={handleCloseFileViewer}
        />
      )}
    </div>
  );
};

export default App;
