/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AcademyProgram, Scholarship, CampTraining, Career, LibraryBook, BlogPost } from './types';

export const ACADEMY_PROGRAMS: AcademyProgram[] = [
  {
    id: 'acad-sd',
    level: 'sd',
    name: 'SD RISE Academy',
    description: 'Pendidikan dasar unggulan berkarakter dengan pendekatan kurikulum terintegrasi dan ramah anak untuk melahirkan tunas bangsa yang kreatif.',
    curriculum: [
      'Pendidikan Karakter & Budi Pekerti',
      'Matematika Kreatif & Sains Dasar',
      'Bahasa Inggris Komunikasi Sejak Dini',
      'Teknologi Informasi & Kreativitas Digital Dasar',
      'Ekstrakurikuler Seni & Olahraga Pembentukan Minat'
    ],
    tuitionFee: 1500000
  },
  {
    id: 'acad-smp',
    level: 'smp',
    name: 'SMP RISE Academy',
    description: 'Pendidikan menengah pertama berorientasi kepemimpinan, riset sederhana, dan penguasaan sains lanjut dengan dukungan mentor bersertifikasi.',
    curriculum: [
      'Problem Solving & Critical Thinking',
      'Sains Praktis & Eksperimental',
      'Bahasa Inggris Akademik & Debat',
      'Dasar Algoritma & Pemrograman Visual',
      'Kepemimpinan (Leadership Program) & Kepanduan'
    ],
    tuitionFee: 2200000
  },
  {
    id: 'acad-sma',
    level: 'sma',
    name: 'SMA RISE Academy',
    description: 'Persiapan matang menuju jenjang perguruan tinggi nasional maupun internasional melalui pembinaan karir terarah, penguasaan teknologi tinggi, dan riset mendalam.',
    curriculum: [
      'Sains Terapan & Matematika Tingkat Lanjut',
      'Pemrograman Python, Web Development & AI Dasar',
      'Persiapan Ujian UTBK & Kerjasama Perguruan Tinggi',
      'Kewirausahaan Remaja (Youth Entrepreneurship)',
      'Bahasa Asing Pilihan (Mandarin / Jepang / Jerman)'
    ],
    tuitionFee: 3000000
  }
];

export const SCHOLARSHIPS: Scholarship[] = [
  {
    id: 'schol-prestasi',
    name: 'Beasiswa Unggulan Prestasi RISE 2026',
    requirements: [
      'Rata-rata nilai rapor minimal 85 dalam 2 semester terakhir',
      'Memiliki sertifikat kejuaraan minimal tingkat Kabupaten/Kota (Akademik maupun Non-Akademik)',
      'Lolos tes wawancara kepribadian & tes potensi akademik'
    ],
    deadline: '2026-08-31',
    quota: 15,
    benefit: 'Pembebasan uang gedung 100%, bantuan biaya buku per semester, dan pembinaan intensif kepemimpinan.'
  },
  {
    id: 'schol-harapan',
    name: 'Beasiswa Bakti Harapan Nusantara',
    requirements: [
      'Surat Keterangan Tidak Mampu (SKTM) resmi dari desa atau kelurahan setempat',
      'Rata-rata nilai rapor minimal 75',
      'Menulis esai motivasi bertema "Mimpi Saya untuk Memajukan Pendidikan Indonesia"'
    ],
    deadline: '2026-07-25',
    quota: 25,
    benefit: 'Subsidi biaya SPP sekolah bulanan 100%, gratis perangkat belajar e-book, dan bantuan uang saku transportasi.'
  },
  {
    id: 'schol-mitra',
    name: 'Beasiswa Kemitraan Korporat RISE - TechSustain',
    requirements: [
      'Siswa jenjang SMA / SMK sederajat tingkat akhir',
      'Memiliki minat tinggi pada bidang Rekayasa Perangkat Lunak atau Ilmu Komputer',
      'Melampirkan portofolio karya digital (aplikasi, web sederhana, atau tulisan esai sains)'
    ],
    deadline: '2026-09-15',
    quota: 10,
    benefit: 'Bantuan studi penuh selama 1 tahun ajaran, pendampingan langsung oleh praktisi IT, dan prioritas penempatan magang.'
  }
];

export const CAMP_TRAININGS: CampTraining[] = [
  {
    id: 'camp-frontend',
    name: 'Intensive Frontend React & Tailwind Web Bootcamp',
    classification: 'hard_skill',
    mentorName: 'Fahmi Ramadhan, S.Kom. (Senior Web Architect)',
    schedule: 'Sabtu & Minggu, 09.00 - 12.00 WIB',
    syllabus: [
      'Dasar HTML5, CSS3, Modern JS (ES6+)',
      'Pengenalan React Hooks, State & Props',
      'Integrasi Tailwind CSS Utility-First Styling',
      'Konsumsi REST API dengan Penanganan Error Komprehensif',
      'Deployment Web App Terbimbing ke Cloud Ingress'
    ],
    rating: 4.8,
    duration: '8 Minggu',
    withCertificate: true
  } as any,
  {
    id: 'camp-speak',
    name: 'Effective Public Speaking & Corporate Presentation Mastery',
    classification: 'soft_skill',
    mentorName: 'Nadia Amalia, M.A. (Chief Communications Specialist)',
    schedule: 'Senin & Rabu, 19.00 - 21.00 WIB',
    syllabus: [
      'Mengatasi Demam Panggung (Stage Fright)',
      'Teknik Vokal, Body Language & Kontak Mata',
      'Struktur Storytelling Klasik dan Modern',
      'Mendesain Slide Presentasi Berstandar Profesional',
      'Live Practice & Sesi Wawancara Simulasi'
    ],
    rating: 4.9,
    duration: '4 Minggu',
    withCertificate: true
  } as any,
  {
    id: 'camp-english',
    name: 'English for Academic Purposes & IELTS Preparation',
    classification: 'language',
    mentorName: 'Arthur Pendragon, M.Ed. (Certified IELTS Examiner)',
    schedule: 'Selasa & Kamis, 16.00 - 18.00 WIB',
    syllabus: [
      'Strategi Listening: Mengidentifikasi Key Information',
      'Reading Comprehension: Skimming, Scanning & Analisis Teks',
      'Writing Task 1 & 2: Kohesi, Tata Bahasa & Penataan Ide',
      'Speaking Mock Test Terarah dengan Kriteria Penilaian IELTS',
      'Pembahasan Latihan Soal & Manajemen Waktu Ujian'
    ],
    rating: 4.7,
    duration: '6 Minggu',
    withCertificate: true
  } as any
];

export const CAREERS: Career[] = [
  {
    id: 'car-intern-uiux',
    companyName: 'RISE Digital Labs',
    position: 'Junior UI/UX Designer (Internship)',
    type: 'internship',
    description: 'Bergabunglah dengan tim desain kami untuk merancang solusi digital ramah anak dan platform pembelajaran interaktif. Anda akan terlibat langsung dalam riset pengguna, wireframing, pembuatan visual prototype di Figma, hingga sesi pengujian kegunaan bersama sasaran pengguna nyata.',
    location: 'Jakarta Selatan (Hybrid)'
  },
  {
    id: 'car-full-ops',
    companyName: 'Yayasan RISE Nusantara',
    position: 'Education Program Coordinator',
    type: 'full_time',
    description: 'Kami mencari profesional berdedikasi tinggi untuk mengelola operasi kurikulum harian, menjalin kemitraan strategis dengan sekolah-sekolah di wilayah terdepan, serta menyusun laporan pertanggungjawaban dampak kegiatan sosial secara berkala kepada pihak sponsor.',
    location: 'Sleman, Yogyakarta (On-site)'
  },
  {
    id: 'car-part-tutor',
    companyName: 'RISE Academy Learning Hub',
    position: 'Asisten Tutor Bahasa Inggris & Literasi',
    type: 'part_time',
    description: 'Membimbing adik-adik tingkat sekolah dasar dan menengah pertama dalam menguasai kompetensi dasar bahasa Inggris dan minat baca digital. Posisi fleksibel yang cocok untuk mahasiswa tingkat akhir dengan kepribadian hangat, ramah, serta penyabar.',
    location: 'Bandung (Remote / Flexible)'
  }
];

export const LIBRARY_BOOKS: LibraryBook[] = [
  {
    id: 'book-kiat',
    title: 'Kiat Sukses Memperoleh Beasiswa Pendidikan Dunia',
    author: 'Dr. Indah Rahayu, M.Sc.',
    category: 'Siswa & Mahasiswa',
    format: 'physical',
    coverUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=200&h=280'
  },
  {
    id: 'book-pembelajaran',
    title: 'Pembelajaran Kreatif di Era Transformasi Digital',
    author: 'Prof. Sugeng Riyadi, Ph.D.',
    category: 'Pedagogi & Guru',
    format: 'digital',
    pdfUrl: 'https://arxiv.org/pdf/2103.11111.pdf',
    coverUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=200&h=280'
  },
  {
    id: 'book-rekayasa',
    title: 'Konsep Desain Web Responsif Bermodulkan Tailwind CSS',
    author: 'Rayya Andini & Tim 7',
    category: 'Teknologi & IT',
    format: 'digital',
    pdfUrl: 'https://arxiv.org/pdf/2204.11111.pdf',
    coverUrl: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=200&h=280'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'Pentingnya Integrasi Ekosistem Digital dalam Dunia Pendidikan Indonesia',
    slug: 'integrasi-ekosistem-digital-pendidikan',
    content: `
 Pentingnya Integrasi Ekosistem Digital dalam Dunia Pendidikan Indonesia

Perkembangan teknologi internet di Indonesia mencatat pertumbuhan yang sangat pesat. Menurut survei terbaru APJII pada tahun 2024, jumlah pengguna internet di Indonesia mencapai 221,5 juta jiwa dengan tingkat penetrasi sebesar 79,5% dari total populasi nasional. Namun, peningkatan ini belum diimbangi secara maksimal oleh ketersediaan sistem informasi pendidikan yang terpadu.

 Permasalahan yang Dihadapi Pengguna

Saat ini, para siswa, mahasiswa, maupun guru seringkali harus menghadapi kenyataan pahit di mana data dan informasi pendidikan masih tersebar acak di berbagai portal yang terisolasi. Beberapa masalah klasik di antaranya:

1. Fragmentasi Informasi: Informasi mengenai program sekolah formal, peluang beasiswa nasional, program pelatihan kerja sertifikasi, hingga lowongan magang tersebar di puluhan situs mandiri yang berbeda.
2. Efisiensi Akses Rendah: Pengguna harus menghabiskan waktu luang berharga hanya untuk melompat dari satu portal ke portal lainnya demi membandingkan detail program.
3. Pendaftaran Berulang: Setiap situs mandiri mewajibkan pengisian form data diri terpisah, menyebabkan pemborosan tenaga dan tidak adanya standardisasi satu pintu (Single Account System).

 Solusi RISE Foundation

Melalui gagasan Modular Product Architecture, RISE Foundation hadir mengintegrasikan tiga pilar program utama:
- RISE Academy: Melingkupi data sekolah formal berkualitas (SD, SMP, SMA), beasiswa unggulan, serta perpustakaan digital terintegrasi.
- RISE Camp: Memberikan pelatihan keterampilan keras (hard skills) seperti web coding, keterampilan lembut (soft skills) seperti komunikasi kepemimpinan, serta persiapan sertifikasi bahasa internasional.
- RISE Community: Mewadahi ruang ekspresi relawan sosial melalui gerakan RISE Peduli serta program Brand Ambassador.

Dengan disatukannya layanan-layanan ini dalam satu akun tunggal terintegrasi, efisiensi pencarian informasi meningkat pesat, validitas kebenaran data terjamin resmi, serta memungkinkan rekomendasi personal yang disesuaikan langsung dengan minat unik profil pengguna masing-masing.
    `,
    author: 'Evi Lestari (Ketua Tim 7)',
    date: '2026-06-15',
    category: 'Kebijakan Pendidikan',
    readTime: '5 Menit'
  },
  {
    id: 'blog-2',
    title: 'Bagaimana Memilih Beasiswa Pendidikan yang Sesuai dengan Kebutuhan Karir Masa Depan',
    slug: 'memilih-beasiswa-pendidikan-sesuai-karir',
    content: `
 Memilih Beasiswa Pendidikan Sesuai Karir Anda

Mendapatkan beasiswa sekolah atau kuliah adalah impian hampir setiap orang. Beasiswa bukan sekadar cara menghemat biaya pendidikan, melainkan merupakan jembatan emas menuju jaringan profesional yang sangat luas dan kredibel di tingkat global.

 Langkah Cerdas Memilih Beasiswa

Berikut adalah 4 panduan terstruktur sebelum Anda mengirimkan berkas pengajuan program beasiswa:

 1. Pahami Syarat Keahlian & Kriteria Penerimaan
Banyak pencari beasiswa gugur di tahap berkas karena tergesa-gesa tanpa memperhatikan persyaratan dasar. Selalu saring beasiswa sesuai jenjang IPK raport, sertifikat kepemimpinan, atau status kemandirian sosial Anda.

 2. Hubungkan Manfaat Pendidikan dengan Rencana Masa Depan
Pilihlah beasiswa kemitraan korporat jika Anda menargetkan jalur karir cepat berkat dukungan internship terjamin, atau pilihlah beasiswa bakti sosial jika Anda berniat memfokuskan karir pada sektor kemanusiaan dan pengembangan daerah tertinggal.

 3. Persiapkan Dokumen Pendukung Terbaik
- Esai deskriptif yang orisinal dan humanis.
- Surat rekomendasi akademis dari guru pembimbing kelas atau ketua organisasi.
- Portofolio pencapaian digital yang tersusun secara profesional.

RISE Foundation menyediakan menu Scholarship Portal terpadu lengkap dengan petunjuk pendaftaran yang siap membantu mempermudah langkah impian masa depan Anda!
    `,
    author: 'Maharani Syifatania',
    date: '2026-06-20',
    category: 'Tips & Beasiswa',
    readTime: '4 Menit'
  }
];
