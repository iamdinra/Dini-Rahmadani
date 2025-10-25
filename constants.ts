import { Student, UniformStatus, AssessmentStatus, FeeStatus, PaymentStatus, StudentType, StudentCategory, ApplicationStatus } from './types';

const CSV_DATA = `
,Monitoring Proses PSB ,,,,,,,,,,,,,,,,,,,,,,,,,,
,Tahun Ajaran 2026/2027,,,,,,,,,,,,,,,,,,,,,,,,,,
,Internal,36,Eksternal SN,1,Cancel,2,,KELAS 1,88,,,,,,,,,,,,,,,,,,
,Eksternal,40,Special Need,7,,,,Beasiswa TK B ,2,,,,,,,,,,,,,,,,,,
,Pindahan,2,Karyawan,2,,,,,,,,,,,,,,,,,,,,,,,
,Internal karyawan,2,,PHASE ONE,,,,PHASE TWO,,,,,,,,PHASE THREE,,,PHASE FOUR,,PHASE FIVE,,PHASE SIX,,,,
No,Nama Siswa ,Internal/Eksternal ,Keterangan,Tanggal Pembelian Formulir,Pengembalian Berkas Formulir ,Kelengkapan Dokumen Pendukung (Akte-KK),Cek Rekomendasi Guru TK untuk siswa internal,Pengiriman Undangan Observasi/Interview ,Jadwal Observasi Siswa,Notes,"Proses Interview (kecuali notes diisi admin, bagian lainnya diisi oleh Interviewer)",,,,,Pengukuran Seragam ,Penjelasan Keuangan ,Ttd Surat Pernyataan ,Surat Penerimaan PSB,Tanggal booking Fee,Pembayaran ,Lama Proses (hari),Surat Rekomendasi bagi Siswa Pindahan (diberikan jika sudah pembayaran),Informasi Buku (siswa berkebutuhan khusus menyusul),Akun Email,Folder arsip info persiapan sekolah (di-share ke orang tua),Join Information WA Group
,,,,,,,,,,,Jadwal Interview,Notes,Interviewer ,Rekomendasi Hasil Interview ,Sibling di SMP/kakak akan masuk ke SMP Lazuardi,,,,,,,,,,,,
,,,,,,,,,,,,,,,,,,,,,,,,,,,
1,Sherunaya Patriana,Internal,,9/6/2025,9/9/2025,Lengkap,Disarankan observasi,,,,,,,,,,,,,,,,,,,,
2,Reandra Pininta Kusuma,Internal,,9/6/2025,9/8/2025,Lengkap,,,,,,,,,,,,,,,,,,,,,
3,Jan Aldari Elmaco,Internal SN,,9/6/2025,9/24/2025,Lengkap,,,,,10/9/2025,,Tr. Sari,Diterima,,,Sudah acc finance,,Surat Penerimaan SD Lazuardi-ananda Jan Aldari Elmaco.pdf,,,,,,,,
4,Ashenath Harzky,Internal,,9/8/2025,9/26/2025,Lengkap,,,,,,,,,,,,Sudah ditandatangani dengan materai,,,,,,,,,
5,Reyhan Sakha Alfarizi,Internal,,9/8/2025,9/26/2025,Lengkap,,,,,,,,,,,,,,,,,,,,,
6,Hawla Kalani Zagira,Internal,,9/8/2025,10/9/2025,Lengkap,,,,,,,,,,,,,,,,,,,,,
7,Rumi Amina Narayana,Internal,,9/8/2025,9/10/2025,Lengkap,,,,,,,,,,,,,,,,,,,,,
8,Ahmad Zewail Ryoutaziz Tahir,Internal SN,,9/10/2025,9/18/2025,Lengkap,,,,,10/1/2025,,Tr. Fina,Diterima,,,Sudah acc finance,,Surat Penerimaan SD Lazuardi-ananda Ahmad Zewail Ryoutaziz Tahir.pdf,10/13/2025,Booking Fee,,,,,,
9,Saka Kata Athaillah Baihaqi ,Internal,,9/10/2025,9/19/2025,Lengkap,,,,,,,,,,,,,,,,,,,,,
10,Muhammad Ryuga Alezayn,Internal,,9/12/2025,9/26/2025,Lengkap,,,,,,,,,,,,,,,,,,,,,
11,Muhammad Ardiaz Prayudi,Internal,,9/12/2025,,,,,,,,,,,,,,,,,,,,,,,
12,Kaiga Rauf Widodo,Internal,,9/12/2025,10/24/2025,Lengkap,,,,,,,,,,,,,,,,,,,,,
13,Alexein Alvarendra Sudwi,Internal,,9/12/2025,,,,,,,,,,,,,,,,,,,,,,,
14,Mahdi Idrus,Internal,,9/12/2025,9/26/2025,KK dan akte belum ada,,,,,,,,,,,,,,,,,,,,,
15,Aurora Langit Biru,Internal,Adik Laksmana Samudra Biru,9/12/2025,9/24/2025,KK dan akte belum ada,,,,,,,,,,,,,,10/22/2025,Lunas UP-SPP Juli,,,,,,
16,Hamzah Dahlan Rahadityo,Internal SN,,9/12/2025,10/16/2025,Lengkap,,,,,10/17/2025,,Tr. Sari,Diterima,,,,,,,,,,,,,
17,Chayra Adinda Elfikri,Internal,,9/12/2025,9/26/2025,Lengkap,,,,,,,,,,,,Sudah ditandatangani dengan materai,,,,,,,,,
18,Muhammad Husain Ramadhan,Internal,,9/12/2025,9/19/2025,KK dan akte belum ada,,,,,,,,,,,,,,,,,,,,,
19,Valerie Aiza Setianegara,Internal,,9/12/2025,9/26/2025,Belum ada Akte Lahir,,,,,,,,,,,,,,,,,,,,,
20,Nail Hamid Adkaruni,Internal,,9/12/2025,10/16/2025,Lengkap,,,,,,,,,,,,,,,,,,,,,
21,Lateshia Aurora Maleeka,Internal,,9/12/2025,9/26/2025,Lengkap,,,,,,,,,,,,,,,,,,,,,
22,Zahra Aleefa Subiyanto,Internal,Adik Zaky Alvaronizam,9/12/2025,,,,,,,,,,,,,,,,,,,,,,,
23,Arvilla Arjidin Putri Hurairah,Internal,Adik Arly Arjidin Putri Hurairah,9/12/2025,9/26/2025,Lengkap,,,,,,,,,,,,Sudah ditandatangani dengan materai,,,,,,,,,
24,Damar Handaru,Internal SN,,9/12/2025,10/1/2025,Lengkap,,,,,10/1/2025,,Tr. Fina,Diterima,,,Sudah acc finance,Sudah ditandatangani dengan materai,Surat Penerimaan SD Lazuardi-ananda Damar Handaru.pdf,10/13/2025,Booking Fee,,,,,,
25,Demas Herdian,Internal SN,,9/12/2025,10/1/2025,Lengkap,,,,,10/1/2025,,Tr. Fina,Diterima,,,Sudah acc finance,Sudah ditandatangani dengan materai,Surat Penerimaan SD Lazuardi-ananda Demas Herdian.pdf,10/13/2025,Booking Fee,,,,,,
26,Atharazka Khairan Putra Lintang,Internal,,9/12/2025,9/15/2025,Lengkap,,,,,,,,,,,,Sudah ditandatangani,,,,,,,,,
27,Qyuzee Muizzu Nelson Dermawan,Internal SN,,9/12/2025,9/15/2025,Lengkap,,,,,10/1/2025,,Tr. Sari,Diterima,,,Sudah acc finance,,Surat Penerimaan SD Lazuardi-ananda Qyuzee Muizzu Nelson Dermawan.pdf,10/2/2025,Booking Fee,,,,,,
28,Firnas Ammar Yusuf,Internal SN,,9/13/2025,10/1/2025,KK dan akte belum ada,,,,,10/1/2025,,Tr. Sari,Diterima,,,Sudah acc finance,,Surat Penerimaan SD Lazuardi-ananda Firnas Ammar Yusuf.pdf,10/15/2025,Booking Fee,,,,,,
29,Louis Siddhartha,Internal,,9/15/2025,9/26/2025,Lengkap,,,,,,,,,,,,,,,,,,,,,
30,Rayhan Ashami Eishennoraz,Eksternal SN,Adik Rania Eishennoraz,9/15/2025,9/29/2025,Lengkap,,,9/27/2025,,10/1/2025,,Tr. Sari,Diterima,Kakak di kelas 1-5 SD Lazuardi,Sudah ukur seragam,Sudah acc finance,,Surat Penerimaan SD Lazuardi-ananda Rayhan Ashami Eishenoraz.pdf,10/5/2025,Booking Fee,,,,,,
31,Qaleey Lunara Radityo,Internal,,9/15/2025,,,,,,,,,,,,,,,,,,,,,,,
32,Ayesha Kyreen Mikhayla Kusnadi,Karyawan,,9/15/2025,10/24/2025,,,,,,,,,,,,,,,,,,,,,,
33,Gemmica Jaden,Internal,Adik Geenesha Olivine,9/17/2025,10/1/2025,Lengkap,,,,,,,,,,,,,,,,,,,,,
34,Albirru Isaac Mubarok,Internal,Adik Elvan Mubarok,9/18/2025,10/13/2025,Lengkap,,,,,,,,,,,,,,,,,,,,,
35,Gemattaya Aaravasa Akbar,Eksternal,Adik Ahmad Azkavin,9/18/2025,10/2/2025,Lengkap,,,10/4/2025,,10/23/2025,,Tr. Fina,Diterima,,Sudah ukur seragam,,,,,,,,,,,
36,Kiano Atharrazka Kalandra,Internal,Adik Alrafaeyza Muhammad Farzani,9/19/2025,9/26/2025,KK dan akte belum ada,,,,,,,,,,,,,,,,,,,,,
37,Janizara Ramadhani Bachtiar,Internal,Adik Marsya Garsita dan Fachri Akbar,9/19/2025,,,,,,,,,,,,,,,,10/22/2025,Booking Fee,,,,,,
38,Alqantara Nabil Bastian,Internal,,9/19/2025,,,,,,,,,,,,,,,,,,,,,,,
39,Kassandra Wirahayu Sosodoro,Eksternal,,9/20/2025,9/25/2025,Lengkap,,,9/27/2025,,10/9/2025,,Tr. Fina,Diterima,,Sudah ukur seragam,Sudah acc finance,,Surat Penerimaan SD Lazuardi-ananda Kassandra Wirahayu Sosodoro.pdf,,,,,,,,
40,Arsyanendra Kaisan,Eksternal,,9/20/2025,10/8/2025,Lengkap,,,10/11/2025,,10/24/2025,,Tr. Fina,Diterima,,Sudah ukur seragam,,,,,,,,,,,
41,Nadira Parisya Kahar,Eksternal,,9/20/2025,,,,,10/25/2025,,,,,,,,,,,,,,,,,,
42,Ryola Divya Solihin,Eksternal,Adik Agnia Audy Solihin,9/20/2025,10/4/2025,Lengkap,,,9/27/2025,,10/17/2025,,Tr. Fina,Diterima,,Sudah ukur seragam,Sudah acc finance,,Surat Penerimaan SD Lazuardi-ananda Ryola Divya Solihin.pdf,10/22/2025,Lunas UP-SPP Juli,,,,,,
43,Axel Hafeez Akbar,Eksternal,,9/20/2025,10/1/2025,Lengkap,,,9/27/2025,Hasil observasi menunjukkan ananda memerlukan asesmen/evaluasi ahli,10/9/2025,,Tr. Fina,Menunggu Hasil Observasi Lanjutan,,Sudah ukur seragam,,Sudah ditandatangani dengan materai,,,,,,,,,
44,Sankara Rumimaha Herdanu,Eksternal,,9/20/2025,10/1/2025,Lengkap,,,9/27/2025,,10/9/2025,,Tr. Sari,Diterima,,Sudah ukur seragam,Sudah acc finance,,Surat Penerimaan SD Lazuardi-ananda Sankara Rumimaha Herdanu.pdf,10/23/2025,Booking Fee,,,,,,
45,Sophie Ailana Setiawan,Eksternal,,9/20/2025,9/22/2025,Lengkap,,,9/27/2025,,10/17/2025,,Tr. Sari,Diterima,,Sudah ukur seragam,,,,,,,,,,,
46,Anamishka Tabinda Giadin,Internal,,9/20/2025,,,,,,,,,,,,,,,,,,,,,,,
47,Wistara Raska Aswindra,Internal,,9/20/2025,,,,,,,,,,,,,,,,,,,,,,,
48,Arlo Rasyid,Cancel,,9/20/2025,,,,,,,,,,,,,,,,,,,,,,,
49,Shuna Amani Rasyid,Internal,,9/20/2025,,,,,,,,,,,,,,,,,,,,,,,
50,Zaina Aatreya,Cancel,,9/20/2025,,,,,,,,,,,,,,,,,,,,,,,
51,Saadat Habib Samudra,Eksternal,,9/20/2025,9/26/2025,Lengkap,,,9/27/2025,,10/9/2025,,Tr. Fina,Diterima,,Sudah ukur seragam,Sudah acc finance,,Surat Penerimaan SD Lazuardi-ananda Saadat Habib Samudra.pdf,,,,,,,,
52,Aruna Zahira Andamari,Eksternal,,9/20/2025,10/2/2025,Lengkap,,,10/4/2025,,10/23/2025,,Tr. Sari,Diterima,,Sudah ukur seragam,,,,,,,,,,,
53,Banda Dhyra Rafif,Eksternal,,9/20/2025,9/27/2025,Lengkap,,,9/27/2025,Hasil observasi menunjukkan ananda memerlukan asesmen/evaluasi ahli,10/9/2025,,Tr. Sari,Menunggu Hasil Observasi Lanjutan,,Sudah ukur seragam,,Sudah ditandatangani,,,,,,,,,
54,Damarayu Putri Maulana,Eksternal,,9/20/2025,10/23/2025,Lengkap,,,10/4/2025,Hasil observasi menunjukkan ananda memerlukan asesmen/evaluasi ahli,10/23/2025,Orangtua akan mengirimkan hasil asesmen psikolog,Tr. Sari,Menunggu Hasil Observasi Lanjutan,,Sudah ukur seragam,,,,,,,,,,,
55,Pradipta Aska Diriga,Eksternal,,9/20/2025,9/27/2025,Lengkap,,,9/27/2025,Hasil observasi menunjukkan ananda memerlukan asesmen/evaluasi ahli,10/10/2025,,Tr. Fina,Menunggu Hasil Observasi Lanjutan,,Sudah ukur seragam,,,,,,,,,,,
56,Nara Magani Natabumi,Eksternal,,9/20/2025,10/1/2025,Lengkap,,,10/4/2025,,10/23/2025,,Tr. Sari,Diterima,,Sudah ukur seragam,,,,,,,,,,,
57,Raghdan A. Soemada,Eksternal,,9/20/2025,10/17/2025,KK dan akte belum ada,,,9/27/2025,,10/17/2025,,Tr. Sari,Diterima,,Sudah ukur seragam,Sudah acc finance,,Surat Penerimaan SD Lazuardi-ananda Raghdan Abqarizz Soemada.pdf,,,,,,,,
58,Hafshah Akatara Atahiktri ,Eksternal,,9/20/2025,9/26/2025,Lengkap,,,9/27/2025,,10/10/2025,,Tr. Fina,Diterima,,Sudah ukur seragam,Sudah acc finance,,Surat Penerimaan SD Lazuardi-ananda Hafshah Akatara Atahiktri .pdf,,,,,,,,
59,Annasya Mouneera Ayrasachi,Eksternal,,9/20/2025,10/4/2025,Lengkap,,,10/4/2025,Diterima tetapi butuh dukungan untuk beradaptasi,10/23/2025,Akan ikut observasi kedua pada sebelum masuk tahun ajaran baru,Tr. Fina,Diterima,,Sudah ukur seragam,,,,,,,,,,,
60,Shireen Almahyra Shanum,Eksternal,,9/20/2025,10/14/2025,Lengkap,,,9/27/2025,,10/17/2025,,Tr. Fina,Diterima,,Sudah ukur seragam,Sudah acc finance,,Surat Penerimaan SD Lazuardi-ananda Shireen Almahyra Shanum.pdf,10/24/2025,Booking Fee,,,,,,
61,Razka Bergat Lakeswara,Eksternal,,9/20/2025,9/25/2025,Lengkap,,,9/27/2025,,10/17/2025,,Tr. Fina,Diterima,,Sudah ukur seragam,Sudah acc finance,,Surat Penerimaan SD Lazuardi-ananda Razka Bergat Lakeswara.pdf,,,,,,,,
62,Ghaisan Ubaidillah,Eksternal,,9/20/2025,10/11/2025,KK dan akte belum ada,,,10/11/2025,"Reschedule interview, orangtua umroh",,,,,,Sudah ukur seragam,,,,,,,,,,,
63,Minara Kamaniya,Eksternal,,9/20/2025,10/2/2025,Lengkap,,,10/4/2025,Hasil observasi menunjukkan ananda memerlukan asesmen/evaluasi ahli,10/24/2025,,Tr. Sari,Menunggu Hasil Observasi Lanjutan,,Sudah ukur seragam,,,,,,,,,,,
64,Yusuf Harits El Zhafran,Eksternal,,9/20/2025,9/30/2025,Lengkap,,,10/4/2025,Hasil observasi menunjukkan ananda memerlukan asesmen/evaluasi ahli,10/24/2025,,Tr. Sari,,,Sudah ukur seragam,,,,,,,,,,,
65,Rakastra Reyn Ramadhan,Eksternal,Adik Rasyadan Reyn Ramadhan,9/20/2025,9/26/2025,Lengkap,,,10/4/2025,,10/24/2025,,Tr. Sari,,,Sudah ukur seragam,,,,,,,,,,,
66,Gemma Kaindra Oskar,Pindahan,Pindahan kelas 4,9/22/2025,9/25/2025,Lengkap,,,,,,,,,,,,,,,,,,,,,
67,Nayzeela Humaira Kusumodityo,Internal,,9/23/2025,,,,,,,,,,,,,,,,,,,,,,,
68,Fakhira Agassie Putri,Internal,,9/23/2025,,,,,,,,,,,,,,,,,,,,,,,
69,Savian Abraham Al-Hari,Eksternal,Adik Vishal Erdogan Al-Hari,9/23/2025,10/3/2025,Lengkap,,,10/4/2025,,10/24/2025,,Tr. Fina,Diterima,,Sudah ukur seragam,,,,,,,,,,,
70,Adsakha Ramaditya Laidan,Eksternal,,9/24/2025,10/1/2025,KK dan akte belum ada,,,10/4/2025,Hasil observasi menunjukkan ananda memerlukan asesmen/evaluasi ahli,,,,,,Sudah ukur seragam,,Sudah ditandatangani,,,,,,,,,
71,Muhammad Aqsa Rayyanka Al Kahfi,Eksternal,Adik Arshaq Musa,9/25/2025,10/6/2025,Lengkap,,,10/18/2025,,10/23/2025,,Bu Fina,Diterima,,Sudah ukur seragam,,,,,,,,,,,
72,Muhammad Rasya Al Qiyam Ramadhan,Eksternal,Adik Muhammad Al Fatih,9/27/2025,10/16/2025,Lengkap,,,10/25/2025,,,,,,,,,,,,,,,,,,
73,Sagrada Ali Satyakusuma,Eksternal,,9/27/2025,10/3/2025,Lengkap,,,10/25/2025,,,,,,,,,,,,,,,,,,
74,Alira Daima Atarya,Eksternal,Adik Aldio Rananda Atarya,9/30/2025,,,,,10/11/2025,,,,,,,Sudah ukur seragam,,,,,,,,,,,
75,Giotama Satya Antoro,Eksternal,,10/1/2025,10/17/2025,Lengkap,,,10/25/2025,,,,,,,,,,,,,,,,,,
76,Devandra Alkhalifi Nadi,Pindahan,Pindahan Kelas 2,10/4/2025,,,,,,,,,,,,,,,,,,,,,,,
77,Shaquille Atharrazka Maliq,Eksternal,Adik Devandra Alkhalifi Nadi,10/4/2025,10/13/2025,Lengkap,,,10/11/2025,,10/24/2025,,Tr. Fina,Diterima,,Sudah ukur seragam,,,,,,,,,,,
78,Anissa Anarawati Drajat,Eksternal,,10/4/2025,10/6/2025,Lengkap,,,10/18/2025,,,,,,,Sudah ukur seragam,,,,,,,,,,,
79,Rayyan Nata Arshanu Haidi,Eksternal,,10/7/2025,10/17/2025,Lengkap,,,10/18/2025,,,,,,,Sudah ukur seragam,,,,,,,,,,,
80,Syarifah Diara,Eksternal,,10/6/2025,10/8/2025,Lengkap,,,10/11/2025,,,,,,,Sudah ukur seragam,,,,,,,,,,,
81,Muhammad Zhafran Arsakha,Eksternal,,10/7/2025,10/16/2025,Lengkap,,,10/25/2025,,,,,,,,,,,,,,,,,,
82,Ranum Kalifa Al Meera,Karyawan,Anak Karyawan Deisy Nursifa,10/9/2025,,,,,,,,,,,,,,,,,,,,,,,
83,Callathea Shreya Risandy,Eksternal,,10/9/2025,10/16/2025,Lengkap,,,10/25/2025,,,,,,,,,,,,,,,,,,
84,Ralina Aura Malika,Internal,Adik Rafif Alfatih,10/14/2025,10/24/2025,Lengkap,,,,,,,,,,,,,,,,,,,,,
85,Ayyash Radeya Mauzakani,Eksternal,,10/15/2025,10/22/2025,Lengkap,,,10/18/2025,,,,,,,Sudah ukur seragam,,,,,,,,,,,
86,Alisya lubna sahira,Eksternal,,10/16/2025,10/22/2025,Lengkap,,,10/25/2025,,,,,,,,,,,,,,,,,,
87,Raka Radeya Mahardika,Eksternal,,10/16/2025,10/20/2025,Lengkap,,,10/18/2025,,,,,,,Sudah ukur seragam,,,,,,,,,,,
88,Beasiswa,Internal,,,,,,,,,,,,,,,,,,,,,,,,,
89,Beasiswa,Internal,,,,,,,,,,,,,,,,,,,,,,,,,
90,Dariya Haura Insiya,Eksternal,Adik Darish Kazhim Elazzan,10/20/2025,10/25/2025,KK dan akte belum ada, ,,10/25/2025,,,,,,,,,,,,,,,,,,
91,,None,,,,,,,,,,,,,,,,,,,,,,,,,
92,,None,,,,,,,,,,,,,,,,,,,,,,,,,
93,,None,,,,,,,,,,,,,,,,,,,,,,,,,
94,,None,,,,,,,,,,,,,,,,,,,,,,,,,
95,,None,,,,,,,,,,,,,,,,,,,,,,,,,
96,,None,,,,,,,,,,,,,,,,,,,,,,,,,
97,,None,,,,,,,,,,,,,,,,,,,,,,,,,
98,,None,,,,,,,,,,,,,,,,,,,,,,,,,
99,,None,,,,,,,,,,,,,,,,,,,,,,,,,
`;

/**
 * Parses a date string from format M/D/YYYY to YYYY-MM-DD.
 * @param dateStr The date string to parse.
 * @returns The formatted date string or null if invalid.
 */
function parseDate(dateStr: string | undefined): string | null {
  if (!dateStr || dateStr.trim() === '') return null;
  const parts = dateStr.split('/');
  if (parts.length !== 3) return null;
  
  const [month, day, year] = parts;
  
  if (isNaN(parseInt(month)) || isNaN(parseInt(day)) || isNaN(parseInt(year))) return null;
  
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
}

/**
 * Parses the raw CSV data into an array of Student objects.
 * @param csv The raw CSV string.
 * @returns An array of Student objects.
 */
function parseCSVToStudents(csv: string): Student[] {
    // Start parsing from the actual data rows, skipping headers.
    const lines = csv.trim().split('\n').slice(9);
    const students: Student[] = [];

    lines.forEach((line) => {
        const cols = line.split(',');
        
        const name = cols[1]?.trim();
        // Skip rows that are empty or placeholders
        if (!name || name === 'None') return;

        const idStr = cols[0]?.trim();
        if (!idStr || isNaN(parseInt(idStr))) return;
        const id = parseInt(idStr);

        const typeStr = cols[2]?.trim() || '';
        const noteStr = cols[3]?.trim() || '';
        
        // Determine Application Status
        let applicationStatus = ApplicationStatus.ACTIVE;
        // The CSV marks cancelled students in different columns
        if (name.toLowerCase().includes('cancel') || typeStr.toLowerCase().includes('cancel')) {
            applicationStatus = ApplicationStatus.CANCELLED;
        }

        // Determine Student Type
        let studentType: StudentType;
        if (typeStr.includes('Pindahan')) {
            studentType = StudentType.TRANSFER;
        } else if (typeStr.includes('Karyawan')) {
            studentType = StudentType.KARYAWAN;
        } else if (typeStr.includes('Internal')) {
            studentType = StudentType.INTERNAL;
        } else if (typeStr.includes('Eksternal')) {
            studentType = StudentType.EXTERNAL;
        } else {
            studentType = StudentType.EXTERNAL; // A safe default
        }


        // Determine Student Category
        let studentCategory = StudentCategory.REGULER;
        if (typeStr.includes('SN')) { // SN for Special Needs
            studentCategory = StudentCategory.ABK;
        }

        // Determine Transfer Grade
        let transferGrade: string | null = null;
        if (studentType === StudentType.TRANSFER && noteStr.toLowerCase().includes('pindahan kelas')) {
            transferGrade = noteStr.replace(/pindahan kelas/i, '').trim();
        }

        // Determine Payment Status
        const paymentStatusStr = cols[21]?.trim() || '';
        let paymentStatus = PaymentStatus.PENDING;
        if (paymentStatusStr.includes('Lunas')) paymentStatus = PaymentStatus.FULL;
        else if (paymentStatusStr.includes('Booking Fee')) paymentStatus = PaymentStatus.BOOKING_FEE;

        const student: Student = {
            id,
            name,
            applicationStatus,
            studentType,
            studentCategory,
            transferGrade,
            sitInDate: null, // No specific "Sit In" date column in the provided CSV
            formPurchaseDate: parseDate(cols[4]),
            observationDate: parseDate(cols[9]),
            interviewDate: parseDate(cols[11]),
            uniformStatus: cols[16]?.trim() ? UniformStatus.DONE : UniformStatus.PENDING,
            assessmentNote: cols[14]?.trim().includes('Menunggu') ? AssessmentStatus.REQUIRED : AssessmentStatus.NOT_REQUIRED,
            feeStatus: cols[17]?.trim().includes('Sudah acc finance') ? FeeStatus.APPROVED : FeeStatus.PENDING,
            acceptanceLetterDate: cols[19]?.trim() ? parseDate(cols[20]) : null, // No specific date, use payment date if available
            acceptanceLetterFile: null,
            paymentDate: parseDate(cols[20]),
            paymentStatus,
        };

        students.push(student);
    });

    return students;
}


/**
 * Parses the academic year from the CSV data.
 * @param csv The raw CSV string.
 * @returns The academic year string.
 */
function parseAcademicYear(csv: string): string {
    const lines = csv.trim().split('\n');
    const yearLine = lines.find(line => line.toLowerCase().includes('tahun ajaran'));
    if (yearLine) {
        const year = yearLine.split(',')[1]?.replace(/tahun ajaran/i, '').trim();
        return year || 'Tidak Diketahui';
    }
    return 'Tidak Diketahui';
}


export const MOCK_STUDENTS: Student[] = parseCSVToStudents(CSV_DATA);
export const ACADEMIC_YEAR: string = parseAcademicYear(CSV_DATA);