
import React, { useState, useEffect } from 'react';
import { Student, UniformStatus, AssessmentStatus, FeeStatus, PaymentStatus, StudentType, StudentCategory, ApplicationStatus } from '../types';

interface UpdateModalProps {
  student: Student | Omit<Student, 'id'>;
  onClose: () => void;
  onSave: (student: Student | Omit<Student, 'id'>) => void;
  onViewFile: (fileUrl: string) => void;
}

const UpdateModal: React.FC<UpdateModalProps> = ({ student, onClose, onSave, onViewFile }) => {
  const [formData, setFormData] = useState(student);
  const isNewStudent = !('id' in student);

  useEffect(() => {
    setFormData(student);
  }, [student]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value === 'null' ? null : value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
        if (file.type !== 'application/pdf') {
            alert('Hanya file PDF yang diizinkan.');
            e.target.value = '';
            return;
        }
        const reader = new FileReader();
        reader.onloadend = () => {
            setFormData(prev => ({ ...prev, acceptanceLetterFile: reader.result as string }));
        };
        reader.readAsDataURL(file);
    }
  };
  
  const removeFile = () => {
    setFormData(prev => ({ ...prev, acceptanceLetterFile: null }));
    const fileInput = document.getElementById('acceptanceLetterFile') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };
  
  const renderSelect = <T extends string>(name: keyof typeof formData, label: string, enumObject: Record<string, T>, value: T) => (
      <div>
        <label htmlFor={String(name)} className="block mb-2 text-sm font-medium text-slate-900 dark:text-white">{label}</label>
        <select
            id={String(name)}
            name={String(name)}
            value={value}
            onChange={handleChange}
            className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
            {Object.values(enumObject).map(val => (
                <option key={val} value={val}>{val}</option>
            ))}
        </select>
      </div>
  );

  const renderDateInput = (name: keyof typeof formData, label: string, value: string | null) => (
      <div>
        <label htmlFor={String(name)} className="block mb-2 text-sm font-medium text-slate-900 dark:text-white">{label}</label>
        <input
            type="date"
            id={String(name)}
            name={String(name)}
            value={value || ''}
            onChange={handleChange}
            className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
  );
  
  const renderTextInput = (name: keyof typeof formData, label: string, value: string) => (
    <div>
        <label htmlFor={String(name)} className="block mb-2 text-sm font-medium text-slate-900 dark:text-white">{label}</label>
        <input
            type="text"
            id={String(name)}
            name={String(name)}
            value={value}
            onChange={handleChange}
            required
            className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
    </div>
  )


  return (
    <div 
      className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div 
        className="relative bg-white rounded-lg shadow dark:bg-slate-800 w-full max-w-2xl max-h-[90vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-slate-600 sticky top-0 bg-white dark:bg-slate-800 z-10">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
            {isNewStudent ? 'Tambah Calon Siswa Baru' : `Update Status: ${student.name}`}
          </h3>
          <button
            type="button"
            className="text-slate-400 bg-transparent hover:bg-slate-200 hover:text-slate-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-slate-600 dark:hover:text-white"
            onClick={onClose}
          >
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="flex-grow overflow-y-auto">
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {renderTextInput('name', 'Nama Siswa', formData.name)}
              {renderSelect('studentType', 'Tipe Siswa', StudentType, formData.studentType)}
              
              {formData.studentType === StudentType.TRANSFER && (
                <>
                  {renderTextInput('transferGrade', 'Pindahan Kelas', formData.transferGrade || '')}
                  {renderDateInput('sitInDate', 'Tanggal Sit In', formData.sitInDate)}
                </>
              )}

              {formData.studentType !== StudentType.TRANSFER && (
                 renderDateInput('observationDate', 'Tanggal Observasi', formData.observationDate)
              )}

              {renderDateInput('formPurchaseDate', 'Tanggal Beli Formulir', formData.formPurchaseDate)}
              {renderSelect('studentCategory', 'Kategori Siswa', StudentCategory, formData.studentCategory)}
              {renderDateInput('interviewDate', 'Tanggal Interview', formData.interviewDate)}
              {renderSelect('uniformStatus', 'Pengukuran Seragam', UniformStatus, formData.uniformStatus)}
              {renderSelect('assessmentNote', 'Asesmen Lanjutan', AssessmentStatus, formData.assessmentNote)}
              {renderSelect('feeStatus', 'Info Biaya', FeeStatus, formData.feeStatus)}
              {renderDateInput('acceptanceLetterDate', 'Tanggal Surat Penerimaan', formData.acceptanceLetterDate)}
              
              <div className="md:col-span-2">
                <label htmlFor="acceptanceLetterFile" className="block mb-2 text-sm font-medium text-slate-900 dark:text-white">
                    File Surat Penerimaan (PDF)
                </label>
                <div className="flex items-center space-x-4">
                    <input
                        type="file"
                        id="acceptanceLetterFile"
                        name="acceptanceLetterFile"
                        onChange={handleFileChange}
                        accept="application/pdf"
                        className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    {formData.acceptanceLetterFile && (
                        <div className="flex items-center space-x-2 flex-shrink-0">
                            <button type="button" onClick={() => onViewFile(formData.acceptanceLetterFile as string)} className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium focus:outline-none">Lihat</button>
                            <button type="button" onClick={removeFile} title="Hapus file" className="text-red-500 hover:text-red-700 text-lg font-bold">&times;</button>
                        </div>
                    )}
                </div>
              </div>
              
              {renderSelect('paymentStatus', 'Status Pembayaran', PaymentStatus, formData.paymentStatus)}
              {renderDateInput('paymentDate', 'Tanggal Pembayaran', formData.paymentDate)}
              {renderSelect('applicationStatus', 'Status Pendaftaran', ApplicationStatus, formData.applicationStatus)}
            </div>
          </div>
        
          <div className="flex items-center p-6 space-x-2 border-t border-slate-200 rounded-b dark:border-slate-600 sticky bottom-0 bg-white dark:bg-slate-800">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Simpan Perubahan
            </button>
            <button
              type="button"
              onClick={onClose}
              className="text-slate-500 bg-white hover:bg-slate-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-slate-200 text-sm font-medium px-5 py-2.5 hover:text-slate-900 focus:z-10 dark:bg-slate-700 dark:text-slate-300 dark:border-slate-500 dark:hover:text-white dark:hover:bg-slate-600 dark:focus:ring-slate-600"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateModal;
