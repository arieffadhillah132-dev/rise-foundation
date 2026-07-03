/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ProgramType } from '../../types';
import { CAMP_TRAININGS, CAREERS } from '../../data';
import campHeroBg from '../../assets/images/rise_camp_hero_bg_1783073952203.jpg';
import englishBg from '../../assets/images/camp_english_bg_1783073965741.jpg';
import frontendBg from '../../assets/images/camp_frontend_bg_1783073979435.jpg';
import speakBg from '../../assets/images/camp_speak_bg_1783073990339.jpg';
import { 
  ArrowLeft, 
  Calendar, 
  CheckCircle2, 
  Briefcase, 
  Users, 
  TrendingUp, 
  GraduationCap, 
  Clock, 
  BookOpen, 
  User, 
  Award, 
  Sparkles, 
  Mail, 
  MapPin, 
  ChevronRight, 
  Send 
} from 'lucide-react';

interface CampViewProps {
  onNavigate: (route: string) => void;
  onNavigateToForm: (programType: string, programId: string) => void;
  currentUser?: any;
  onRequireLogin?: (route: string, params?: any) => void;
  onAddRegistration?: (programType: ProgramType, programId: string, programName: string, details: any) => Promise<boolean> | void;
  initialTrainingId?: string | null;
  initialJobId?: string | null;
  onClearInitialTrainingId?: () => void;
  onClearInitialJobId?: () => void;
}

export function CampView({ 
  onNavigate, 
  onNavigateToForm, 
  currentUser, 
  onRequireLogin, 
  onAddRegistration,
  initialTrainingId, 
  initialJobId,
  onClearInitialTrainingId,
  onClearInitialJobId
}: CampViewProps) {
  // Navigation states for sub-views
  const [selectedTrainingId, setSelectedTrainingId] = useState<string | null>(initialTrainingId || null);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(initialJobId || null);

  React.useEffect(() => {
    if (initialTrainingId) {
      setSelectedTrainingId(initialTrainingId);
      if (onClearInitialTrainingId) onClearInitialTrainingId();
    }
  }, [initialTrainingId, onClearInitialTrainingId]);

  React.useEffect(() => {
    if (initialJobId) {
      setSelectedJobId(initialJobId);
      if (onClearInitialJobId) onClearInitialJobId();
    }
  }, [initialJobId, onClearInitialJobId]);

  const handleSelectTraining = (id: string) => {
    if (!currentUser && onRequireLogin) {
      onRequireLogin('/program/camp', { trainingId: id });
    } else {
      setSelectedTrainingId(id);
    }
  };

  const handleSelectJob = (id: string) => {
    if (!currentUser && onRequireLogin) {
      onRequireLogin('/program/camp', { jobId: id });
    } else {
      setSelectedJobId(id);
    }
  };

  // Form states for Training Detail Sub-view
  const [trainingFormSubmitted, setTrainingFormSubmitted] = useState<boolean>(false);
  const [trainingName, setTrainingName] = useState('');
  const [trainingEmail, setTrainingEmail] = useState('');
  const [trainingLevel, setTrainingLevel] = useState('Beginner');
  const [trainingReason, setTrainingReason] = useState('');

  // Form states for Career Detail Sub-view
  const [careerFormSubmitted, setCareerFormSubmitted] = useState<boolean>(false);
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantCvUrl, setApplicantCvUrl] = useState('');
  const [applicantCover, setApplicantCover] = useState('');

  // Form states for Corporate Collaboration
  const [collabFormSuccess, setCollabFormSuccess] = useState<boolean>(false);
  const [corpName, setCorpName] = useState('');
  const [corpEmail, setCorpEmail] = useState('');
  const [corpNotes, setCorpNotes] = useState('');

  // Hardcoded mappings to enrich details of sub-views
  const trainingDetailsMap: Record<string, {
    syllabus: string[];
    objectives: string[];
    cost: string;
    scheduleDetail: string;
  }> = {
    'camp-english': {
      syllabus: [
        'Strategi Listening: Mengidentifikasi Key Information',
        'Reading Comprehension: Skimming, Scanning & Analisis Teks',
        'Writing Task 1 & 2: Kohesi, Tata Bahasa & Penataan Ide',
        'Speaking Mock Test Terarah dengan Kriteria Penilaian IELTS',
        'Pembahasan Latihan Soal & Manajemen Waktu Ujian'
      ],
      objectives: [
        'Meningkatkan skor band IELTS secara keseluruhan minimal +1.0',
        'Menguasai teknik membaca teks akademis bahasa Inggris dengan cepat dan akurat',
        'Membangun struktur esai argumentatif yang runut untuk tes Writing'
      ],
      cost: 'Rp 1.500.000 (Subsidi Penuh untuk Penerima Beasiswa)',
      scheduleDetail: 'Selasa & Kamis, 16.00 - 18.00 WIB'
    },
    'camp-frontend': {
      syllabus: [
        'Dasar HTML5, CSS3, Modern JS (ES6+)',
        'Pengenalan React Hooks, State & Props',
        'Integrasi Tailwind CSS Utility-First Styling',
        'Konsumsi REST API dengan Penanganan Error Komprehensif',
        'Deployment Web App Terbimbing ke Cloud Ingress'
      ],
      objectives: [
        'Membangun antarmuka web modern yang responsif dan interaktif',
        'Memahami arsitektur komponen React untuk kode yang bersih dan terstruktur',
        'Melakukan deployment mandiri proyek portofolio pribadi ke internet'
      ],
      cost: 'Rp 3.200.000 (Tersedia Beasiswa Diskon Potongan hingga 80%)',
      scheduleDetail: 'Sabtu & Minggu, 09.00 - 12.00 WIB'
    },
    'camp-speak': {
      syllabus: [
        'Mengatasi Demam Panggung (Stage Fright)',
        'Teknik Vokal, Body Language & Kontak Mata',
        'Struktur Storytelling Klasik dan Modern',
        'Mendesain Slide Presentasi Berstandar Profesional',
        'Live Practice & Sesi Wawancara Simulasi'
      ],
      objectives: [
        'Mampu melakukan presentasi bisnis yang persuasif dan memukau',
        'Menguasai intonasi nada bicara untuk mempertahankan perhatian audiens',
        'Percaya diri saat berbicara di forum resmi maupun kasual'
      ],
      cost: 'Rp 950.000 (Tersedia Program Cicilan bagi Mahasiswa)',
      scheduleDetail: 'Senin & Rabu, 19.00 - 21.00 WIB'
    }
  };

  const careerDetailsMap: Record<string, {
    responsibilities: string[];
    requirements: string[];
    benefits: string[];
  }> = {
    'curriculum-developer': {
      responsibilities: [
        'Merancang dan mengevaluasi peta jalan pembelajaran kurikulum SD, SMP, maupun SMA.',
        'Berkolaborasi dengan tutor/guru bidang studi untuk mempersiapkan materi bahan ajar.',
        'Mengembangkan modul tes formatif dan sumatif berbasis project-based learning.',
        'Mengkaji keefektifan kurikulum secara rutin berdasarkan hasil capaian belajar siswa.'
      ],
      requirements: [
        'Pendidikan minimal S1 di bidang Kependidikan, Kurikulum, atau program studi linier.',
        'Pengalaman kerja minimal 2 tahun sebagai Curriculum Designer atau Guru Penggerak.',
        'Memahami konsep dasar Kurikulum Merdeka secara menyeluruh.',
        'Memiliki keahlian komunikasi tertulis dan lisan yang sangat baik.'
      ],
      benefits: [
        'Gaji pokok kompetitif beserta tunjangan kesehatan keluarga.',
        'Kesempatan mengikuti pelatihan dan sertifikasi pengembangan guru.',
        'Lingkungan kerja yang suportif dan berorientasi sosial.'
      ]
    },
    'social-media-intern': {
      responsibilities: [
        'Membuat kalender konten media sosial mingguan (Instagram, TikTok, dan LinkedIn).',
        'Mendesain visual grafis sederhana di Canva/Figma dan mengedit video pendek.',
        'Berinteraksi aktif merespons pertanyaan followers di kolom komentar maupun direct messages.',
        'Menganalisis performa keterlibatan (engagement rate) dari setiap campaign konten.'
      ],
      requirements: [
        'Mahasiswa aktif minimal semester 5 atau fresh graduate di bidang Komunikasi/DKV/Pemasaran.',
        'Mengikuti tren konten kreatif viral dan terbiasa menggunakan media sosial.',
        'Mampu menggunakan aplikasi desain visual dasar (Canva, CapCut, Premiere, dsb).',
        'Bersedia berkomitmen magang selama minimal 3 bulan secara hybrid/remote.'
      ],
      benefits: [
        'Uang saku bulanan berkinerja (Monthly Stipend).',
        'Sertifikat magang resmi dari RISE Foundation.',
        'Pendampingan langsung (mentorship) dari tim Marketing Lead kami.'
      ]
    },
    'program-assistant-intern': {
      responsibilities: [
        'Membantu logistik operasional kelas harian program RISE Camp dan RISE Academy.',
        'Mendokumentasikan aktivitas belajar dan merapikan presensi absensi peserta didik.',
        'Menjadi narahubung utama komunikasi grup komunitas bersama para orang tua wali.',
        'Membantu penyusunan berkas laporan pertanggungjawaban dampak sosial bulanan.'
      ],
      requirements: [
        'Mahasiswa aktif minimal semester 4 atau fresh graduate dari semua jurusan.',
        'Teratur, detail-oriented, dan memiliki manajemen administrasi dokumen yang rapi.',
        'Luwes berinteraksi dengan anak-anak dan masyarakat umum.',
        'Bersedia ditempatkan di Bandung (flexible hybrid).'
      ],
      benefits: [
        'Uang saku bulanan dan penggantian biaya transportasi lapangan.',
        'Akses gratis ke seluruh modul pelatihan eksklusif RISE Camp.',
        'Surat rekomendasi kerja langsung dari pimpinan yayasan.'
      ]
    }
  };

  const handleTrainingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // If a parent provided an API handler, call it so the registration is persisted
    const details = { name: trainingName, email: trainingEmail, level: trainingLevel, reason: trainingReason };
    if (!currentUser && onRequireLogin) {
      onRequireLogin('/form', { trainingId: selectedTrainingId });
      return;
    }

    if (onAddRegistration && selectedTrainingId) {
      onAddRegistration('camp_training', selectedTrainingId, (CAMP_TRAININGS.find(t => t.id === selectedTrainingId)?.name) || 'RISE Camp Training', details);
    }

    setTrainingFormSubmitted(true);
    // Reset form fields
    setTimeout(() => {
      setTrainingFormSubmitted(false);
      setTrainingName('');
      setTrainingEmail('');
      setTrainingReason('');
      setSelectedTrainingId(null);
    }, 4500);
  };

  const handleCareerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const details = { name: applicantName, email: applicantEmail, cvUrl: applicantCvUrl, cover: applicantCover };
    if (!currentUser && onRequireLogin) {
      onRequireLogin('/form', { jobId: selectedJobId });
      return;
    }

    if (onAddRegistration && selectedJobId) {
      // use 'volunteer' as a generic camp-related programType for job applications
      const programName = selectedJobId || 'RISE Job Application';
      onAddRegistration('volunteer', selectedJobId, programName, details as any);
    }

    setCareerFormSubmitted(true);
    // Reset form fields
    setTimeout(() => {
      setCareerFormSubmitted(false);
      setApplicantName('');
      setApplicantEmail('');
      setApplicantCvUrl('');
      setApplicantCover('');
      setSelectedJobId(null);
    }, 4500);
  };

  const handleCorpCollabSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCollabFormSuccess(true);
    setTimeout(() => {
      setCollabFormSuccess(false);
      setCorpName('');
      setCorpEmail('');
      setCorpNotes('');
    }, 5000);
  };

  // RENDER SUB-VIEW: CLASS DETAIL
  if (selectedTrainingId) {
    const trainingId = selectedTrainingId;
    const isEnglish = trainingId === 'camp-english';
    const isFrontend = trainingId === 'camp-frontend';
    const isSpeak = trainingId === 'camp-speak';

    let title = 'Pelatihan RISE Camp';
    let gradient = 'from-blue-400 to-blue-600';
    let icon = '🌐';
    let duration = '12 minggu';
    let location = 'Online & Offline';
    let mentor = 'Arthur Pendragon, M.Ed.';
    let bgImage = englishBg;

    if (isEnglish) {
      title = 'Pelatihan Bahasa Inggris';
      gradient = 'from-blue-400 to-blue-600';
      icon = '🌐';
      duration = '12 minggu';
      location = 'Online & Offline';
      mentor = 'Arthur Pendragon, M.Ed. (Certified IELTS Examiner)';
      bgImage = englishBg;
    } else if (isFrontend) {
      title = 'Web Programming';
      gradient = 'from-purple-400 to-purple-600';
      icon = '💻';
      duration = '16 minggu';
      location = 'Online';
      mentor = 'Fahmi Ramadhan, S.Kom. (Senior Web Architect)';
      bgImage = frontendBg;
    } else if (isSpeak) {
      title = 'Kepemimpinan';
      gradient = 'from-amber-400 to-amber-600';
      icon = '👑';
      duration = '8 minggu';
      location = 'Offline';
      mentor = 'Nadia Amalia, M.A. (Chief Communications Specialist)';
      bgImage = speakBg;
    }

    const detailData = trainingDetailsMap[trainingId] || {
      syllabus: [],
      objectives: [],
      cost: 'Sponsorship Program',
      scheduleDetail: 'Setiap Pekan harian'
    };

    return (
      <div className="font-sans bg-white pb-16">
        {/* Banner/Hero Section with Custom Training Background */}
        <section className="relative py-20 px-4 overflow-hidden bg-slate-950 flex items-center min-h-[35vh]">
          {/* Background Image with Gradient Overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src={bgImage} 
              alt={`${title} Background`} 
              className="w-full h-full object-cover object-center opacity-60 filter brightness-95"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/65 to-slate-950/80"></div>
          </div>

          <div className="max-w-6xl mx-auto relative z-10 w-full">
            <button 
              onClick={() => setSelectedTrainingId(null)} 
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-orange-300 hover:text-white transition-colors bg-black/35 hover:bg-black/50 px-3.5 py-1.5 rounded-full border border-white/10 mb-6 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" /> Kembali ke RISE Camp
            </button>
            <div className="flex items-center gap-4 mb-3">
              <span className="text-xs bg-brand-green text-white px-3 py-1 rounded-full font-medium">★ Program Unggulan</span>
              <span className="text-xs bg-emerald-50 text-brand-green border border-emerald-100 px-3 py-1 rounded-full font-semibold">Sedang Berlangsung</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-2">{title}</h1>
            <p className="text-gray-200 text-base sm:text-lg leading-relaxed max-w-2xl font-medium">
              Tingkatkan daya saing global Anda bersama pengajar bersertifikat internasional dan modul pembelajaran terarah.
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Info and Syllabus */}
            <div className="lg:col-span-7 space-y-8">
              {/* Card Meta */}
              <div className="bg-gray-50 border border-gray-150 rounded-2xl p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1 font-mono">DURASI</p>
                  <p className="font-semibold text-gray-900 text-sm">{duration}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1 font-mono">METODE</p>
                  <p className="font-semibold text-gray-900 text-sm">{location}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1 font-mono">MENTOR</p>
                  <p className="font-semibold text-gray-900 text-sm truncate" title={mentor}>{(mentor || '').split(' ')[0]} {(mentor || '').split(' ')[1] || ''}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1 font-mono">SERTIFIKAT</p>
                  <p className="font-semibold text-brand-green text-sm">Tersertifikasi</p>
                </div>
              </div>

              {/* Objectives */}
              <div className="space-y-4">
                <h2 className="font-bold text-xl text-gray-900">Tujuan Pembelajaran</h2>
                <ul className="space-y-3">
                  {detailData.objectives.map((obj, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-brand-green mt-0.5 shrink-0" />
                      <span className="text-gray-600 text-sm leading-relaxed">{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Syllabus */}
              <div className="space-y-4">
                <h2 className="font-bold text-xl text-gray-900">Kurikulum / Silabus Materi</h2>
                <div className="space-y-3">
                  {detailData.syllabus.map((topic, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl hover:border-brand-orange transition">
                      <div className="w-8 h-8 bg-brand-orange/10 text-brand-orange font-bold text-xs rounded-full flex items-center justify-center shrink-0">
                        {i + 1}
                      </div>
                      <span className="text-gray-700 text-sm font-medium">{topic}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Registration Form Box */}
            <div className="lg:col-span-5">
              <div className="bg-white border-2 border-orange-100 rounded-2xl p-6 sm:p-8 shadow-xl shadow-brand-orange/5 sticky top-24">
                <h3 className="font-bold text-xl text-gray-900 mb-2">Formulir Pendaftaran Kelas</h3>
                <p className="text-xs text-gray-500 mb-6">Silakan lengkapi formulir pendaftaran siswa di bawah ini untuk memulai belajar.</p>
                
                {trainingFormSubmitted ? (
                  <div className="p-6 bg-emerald-50 rounded-xl text-center border border-emerald-100 space-y-3">
                    <div className="w-12 h-12 bg-brand-green text-white rounded-full flex items-center justify-center mx-auto text-xl">
                      ✓
                    </div>
                    <h4 className="font-bold text-lg text-gray-900">Pendaftaran Berhasil!</h4>
                    <p className="text-xs text-gray-600">
                      Terima kasih telah mendaftar. Tim RISE Camp akan mengirimkan konfirmasi jadwal dan tautan kelas ke email Anda dalam 1x24 jam.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleTrainingSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1" htmlFor="tr-name">Nama Lengkap</label>
                      <input 
                        id="tr-name"
                        type="text" 
                        required
                        value={trainingName}
                        onChange={(e) => setTrainingName(e.target.value)}
                        placeholder="Contoh: Budi Santoso"
                        className="w-full text-xs px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-orange focus:outline-none" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1" htmlFor="tr-email">Email Aktif</label>
                      <input 
                        id="tr-email"
                        type="email" 
                        required
                        value={trainingEmail}
                        onChange={(e) => setTrainingEmail(e.target.value)}
                        placeholder="budi@email.com"
                        className="w-full text-xs px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-orange focus:outline-none" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1" htmlFor="tr-level">Kategori Pengalaman</label>
                      <select 
                        id="tr-level"
                        value={trainingLevel}
                        onChange={(e) => setTrainingLevel(e.target.value)}
                        className="w-full text-xs px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-orange focus:outline-none bg-white"
                      >
                        <option value="Beginner">Pemula Sekali (Beginner)</option>
                        <option value="Intermediate">Paham Dasar (Intermediate)</option>
                        <option value="Advanced">Ingin Sertifikasi Profesional (Advanced)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1" htmlFor="tr-reason">Motivasi Singkat</label>
                      <textarea 
                        id="tr-reason"
                        rows={3}
                        required
                        value={trainingReason}
                        onChange={(e) => setTrainingReason(e.target.value)}
                        placeholder="Kenapa Anda berniat menguasai keahlian ini?"
                        className="w-full text-xs px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-orange focus:outline-none resize-none"
                      />
                    </div>
                    
                    <button 
                      type="submit"
                      className="w-full py-3.5 bg-brand-orange text-white rounded-xl font-semibold text-sm hover:bg-[#EA580C] transition cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-brand-orange/20"
                    >
                      <Send className="w-4 h-4" /> Kirim Pendaftaran Kelas
                    </button>
                  </form>
                )}

                {/* Additional class metadata */}
                <div className="mt-6 pt-6 border-t border-gray-100 text-[11px] text-gray-500 space-y-2">
                  <div className="flex justify-between">
                    <span>Investasi / Biaya</span>
                    <span className="font-bold text-gray-900">{detailData.cost}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Jadwal Terjadwal</span>
                    <span className="font-bold text-gray-900">{detailData.scheduleDetail}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>
      </div>
    );
  }

  // RENDER SUB-VIEW: CAREER DETAIL
  if (selectedJobId) {
    const jobId = selectedJobId;
    let jobTitle = 'Curriculum Developer';
    let company = 'RISE Foundation';
    let jobTypeBadge = 'Full-time';
    let loc = 'Jakarta · Pendidikan · Pengalaman 2+ tahun';
    let mappingKey = 'curriculum-developer';

    if (jobId === 'curriculum-developer') {
      jobTitle = 'Curriculum Developer';
      company = 'RISE Foundation';
      jobTypeBadge = 'Full-time';
      loc = 'Jakarta · Pendidikan · Pengalaman 2+ tahun';
      mappingKey = 'curriculum-developer';
    } else if (jobId === 'social-media-intern') {
      jobTitle = 'Social Media Intern';
      company = 'RISE Foundation';
      jobTypeBadge = 'Magang';
      loc = 'Remote · Marketing · Mahasiswa semester 5+';
      mappingKey = 'social-media-intern';
    } else if (jobId === 'program-assistant-intern') {
      jobTitle = 'Program Assistant Intern';
      company = 'RISE Foundation';
      jobTypeBadge = 'Magang';
      loc = 'Bandung · Operations · Mahasiswa semester 4+';
      mappingKey = 'program-assistant-intern';
    }

    const jobData = careerDetailsMap[mappingKey] || {
      responsibilities: [],
      requirements: [],
      benefits: []
    };

    return (
      <div className="font-sans bg-white pb-16">
        {/* Header section */}
        <section className="bg-gradient-to-br from-green-50 to-white py-12 px-4 relative overflow-hidden border-b border-gray-100">
          <div className="max-w-6xl mx-auto relative z-10">
            <button 
              onClick={() => setSelectedJobId(null)} 
              className="flex items-center gap-2 text-brand-orange mb-6 hover:underline font-medium text-sm cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" /> Kembali ke Karir
            </button>
            <div className="flex items-center gap-4 mb-3">
              <span className="text-xs bg-brand-orange text-white px-3 py-1 rounded-full font-medium">{company}</span>
              <span className="text-xs bg-emerald-50 text-brand-green border border-emerald-100 px-3 py-1 rounded-full font-semibold">{jobTypeBadge}</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-2">{jobTitle}</h1>
            <p className="text-gray-600 text-sm leading-relaxed max-w-2xl">{loc}</p>
          </div>
        </section>

        {/* Content body */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Responsibilities and Requirements */}
            <div className="lg:col-span-7 space-y-8">
              {/* Responsibilities */}
              <div className="space-y-4">
                <h2 className="font-bold text-xl text-gray-900">Tanggung Jawab Pekerjaan</h2>
                <ul className="space-y-3">
                  {jobData.responsibilities.map((resp, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-brand-orange rounded-full mt-2 shrink-0" />
                      <span className="text-gray-600 text-sm leading-relaxed">{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Requirements */}
              <div className="space-y-4">
                <h2 className="font-bold text-xl text-gray-900">Kualifikasi / Persyaratan</h2>
                <ul className="space-y-3">
                  {jobData.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-brand-orange rounded-full mt-2 shrink-0" />
                      <span className="text-gray-600 text-sm leading-relaxed">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benefits */}
              <div className="space-y-4">
                <h2 className="font-bold text-xl text-gray-900">Kompensasi & Benefit</h2>
                <ul className="space-y-3">
                  {jobData.benefits.map((ben, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-brand-green mt-0.5 shrink-0" />
                      <span className="text-gray-600 text-sm leading-relaxed">{ben}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Application Form */}
            <div className="lg:col-span-5">
              <div className="bg-white border-2 border-emerald-100 rounded-2xl p-6 sm:p-8 shadow-xl shadow-brand-green/5 sticky top-24">
                <h3 className="font-bold text-xl text-gray-900 mb-2">Formulir Lamaran</h3>
                <p className="text-xs text-gray-500 mb-6">Silakan isi berkas lamaran digital singkat Anda di bawah ini.</p>
                
                {careerFormSubmitted ? (
                  <div className="p-6 bg-emerald-50 rounded-xl text-center border border-emerald-100 space-y-3">
                    <div className="w-12 h-12 bg-brand-green text-white rounded-full flex items-center justify-center mx-auto text-xl">
                      ✓
                    </div>
                    <h4 className="font-bold text-lg text-gray-900">Lamaran Terkirim!</h4>
                    <p className="text-xs text-gray-600">
                      Aplikasi Lamaran Anda telah berhasil masuk ke sistem kami. Tim Rekrutmen RISE Foundation akan melakukan screening berkas dan menghubungi Anda melalui email dalam waktu 3x24 jam kerja.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleCareerSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1" htmlFor="ca-name">Nama Lengkap</label>
                      <input 
                        id="ca-name"
                        type="text" 
                        required
                        value={applicantName}
                        onChange={(e) => setApplicantName(e.target.value)}
                        placeholder="Contoh: Hermawan Susanto"
                        className="w-full text-xs px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-green focus:outline-none" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1" htmlFor="ca-email">Email Aktif</label>
                      <input 
                        id="ca-email"
                        type="email" 
                        required
                        value={applicantEmail}
                        onChange={(e) => setApplicantEmail(e.target.value)}
                        placeholder="hermawan@email.com"
                        className="w-full text-xs px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-green focus:outline-none" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1" htmlFor="ca-cv">Tautan CV/Resume (Google Drive/LinkedIn)</label>
                      <input 
                        id="ca-cv"
                        type="url" 
                        required
                        value={applicantCvUrl}
                        onChange={(e) => setApplicantCvUrl(e.target.value)}
                        placeholder="https://drive.google.com/file/d/..."
                        className="w-full text-xs px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-green focus:outline-none" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1" htmlFor="ca-cover">Cover Letter (Singkat)</label>
                      <textarea 
                        id="ca-cover"
                        rows={3}
                        required
                        value={applicantCover}
                        onChange={(e) => setApplicantCover(e.target.value)}
                        placeholder="Tuliskan alasan kenapa Anda berminat melamar posisi ini..."
                        className="w-full text-xs px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-green focus:outline-none resize-none"
                      />
                    </div>
                    
                    <button 
                      type="submit"
                      className="w-full py-3.5 bg-brand-green text-white rounded-xl font-semibold text-sm hover:bg-brand-green/90 transition cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-brand-green/20"
                    >
                      <Send className="w-4 h-4" /> Kirim Lamaran Pekerjaan
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </section>
      </div>
    );
  }

  // MAIN OVERVIEW PAGE
  return (
    <div className="font-sans bg-white">
      
      {/* Hero Banner Section with Camp Background */}
      <section className="relative py-20 px-4 overflow-hidden bg-slate-950 flex items-center min-h-[40vh] justify-center text-center">
        {/* Background Image of RISE Camp */}
        <div className="absolute inset-0 z-0">
          <img 
            src={campHeroBg} 
            alt="RISE Camp Background" 
            className="w-full h-full object-cover object-center opacity-55 filter brightness-95" 
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/65 to-slate-950/80"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10 w-full space-y-4">
          <span className="text-xs bg-brand-green text-white px-3 py-1 rounded-full font-medium mb-4 inline-block">
            ★ Program Unggulan
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">RISE Camp</h1>
          <p className="text-gray-200 text-lg max-w-2xl mx-auto leading-relaxed font-medium">
            Pelatihan keterampilan, pengembangan karir, dan kolaborasi industri untuk masa depanmu
          </p>
        </div>
      </section>

      {/* Main Content Sections Container */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          
          {/* Section: Pelatihan On Going */}
          <div className="mb-16">
            <h2 className="font-bold text-2xl mb-6 text-gray-900">Pelatihan On Going</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Card 1: Pelatihan Bahasa Inggris */}
              <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-orange/5 group flex flex-col justify-between bg-white">
                <div>
                  <div className="h-40 relative overflow-hidden flex items-center justify-center">
                    <img 
                      src={englishBg} 
                      alt="Pelatihan Bahasa Inggris" 
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20"></div>
                  </div>
                  <div className="p-5 space-y-2">
                    <span className="text-[10px] bg-[#DCFCE7] text-brand-green px-2.5 py-0.5 rounded-full font-semibold">
                      Sedang Berlangsung
                    </span>
                    <h3 className="font-bold text-lg text-gray-900 leading-snug group-hover:text-brand-orange transition-colors">
                      Pelatihan Bahasa Inggris
                    </h3>
                    <p className="text-sm text-gray-500">12 minggu · Online & Offline</p>
                  </div>
                </div>
                <div className="p-5 pt-0">
                  <button 
                    onClick={() => handleSelectTraining('camp-english')}
                    className="w-full py-2 bg-brand-orange text-white rounded-lg font-medium hover:bg-[#EA580C] transition text-sm cursor-pointer"
                  >
                    Daftar Sekarang
                  </button>
                </div>
              </div>

              {/* Card 2: Web Programming */}
              <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-orange/5 group flex flex-col justify-between bg-white">
                <div>
                  <div className="h-40 relative overflow-hidden flex items-center justify-center">
                    <img 
                      src={frontendBg} 
                      alt="Web Programming" 
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20"></div>
                  </div>
                  <div className="p-5 space-y-2">
                    <span className="text-[10px] bg-[#DCFCE7] text-brand-green px-2.5 py-0.5 rounded-full font-semibold">
                      Sedang Berlangsung
                    </span>
                    <h3 className="font-bold text-lg text-gray-900 leading-snug group-hover:text-brand-orange transition-colors">
                      Web Programming
                    </h3>
                    <p className="text-sm text-gray-500">16 minggu · Online</p>
                  </div>
                </div>
                <div className="p-5 pt-0">
                  <button 
                    onClick={() => handleSelectTraining('camp-frontend')}
                    className="w-full py-2 bg-brand-orange text-white rounded-lg font-medium hover:bg-[#EA580C] transition text-sm cursor-pointer"
                  >
                    Daftar Sekarang
                  </button>
                </div>
              </div>

              {/* Card 3: Kepemimpinan */}
              <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-orange/5 group flex flex-col justify-between bg-white">
                <div>
                  <div className="h-40 relative overflow-hidden flex items-center justify-center">
                    <img 
                      src={speakBg} 
                      alt="Kepemimpinan" 
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20"></div>
                  </div>
                  <div className="p-5 space-y-2">
                    <span className="text-[10px] bg-[#DCFCE7] text-brand-green px-2.5 py-0.5 rounded-full font-semibold">
                      Sedang Berlangsung
                    </span>
                    <h3 className="font-bold text-lg text-gray-900 leading-snug group-hover:text-brand-orange transition-colors">
                      Kepemimpinan
                    </h3>
                    <p className="text-sm text-gray-500">8 minggu · Offline</p>
                  </div>
                </div>
                <div className="p-5 pt-0">
                  <button 
                    onClick={() => handleSelectTraining('camp-speak')}
                    className="w-full py-2 bg-brand-orange text-white rounded-lg font-medium hover:bg-[#EA580C] transition text-sm cursor-pointer"
                  >
                    Daftar Sekarang
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Section: Coming Soon */}
          <div className="mb-16">
            <h2 className="font-bold text-2xl mb-6 text-gray-900">Coming Soon</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Coming Soon Card 1 */}
              <div className="border border-dashed border-gray-300 rounded-xl p-5 flex items-center gap-4 opacity-70 bg-gray-50/50">
                <span className="text-2xl">🎨</span>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">UI/UX Design</h4>
                  <p className="text-xs text-gray-500">Mulai Maret 2027</p>
                </div>
              </div>

              {/* Coming Soon Card 2 */}
              <div className="border border-dashed border-gray-300 rounded-xl p-5 flex items-center gap-4 opacity-70 bg-gray-50/50">
                <span className="text-2xl">📊</span>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">Data Analytics</h4>
                  <p className="text-xs text-gray-500">Mulai April 2027</p>
                </div>
              </div>

            </div>
          </div>

          {/* Section: Training Collaboration */}
          <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 mb-16 border border-gray-200">
            <h2 className="font-bold text-2xl mb-2 text-gray-900">Training Collaboration</h2>
            <p className="text-gray-600 text-sm mb-6 leading-relaxed">
              Kami menyediakan layanan kolaborasi pelatihan dengan perusahaan. Bawa tim Anda ke level berikutnya!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              
              {/* Corp Training Item */}
              <div className="bg-white p-5 rounded-xl text-center border border-gray-150">
                <Briefcase className="w-8 h-8 text-brand-orange mx-auto mb-2" />
                <p className="font-semibold text-sm text-gray-900">Corporate Training</p>
              </div>

              {/* Team Building Item */}
              <div className="bg-white p-5 rounded-xl text-center border border-gray-150">
                <Users className="w-8 h-8 text-brand-orange mx-auto mb-2" />
                <p className="font-semibold text-sm text-gray-900">Team Building</p>
              </div>

              {/* Upskilling Program Item */}
              <div className="bg-white p-5 rounded-xl text-center border border-gray-150">
                <TrendingUp className="w-8 h-8 text-brand-orange mx-auto mb-2" />
                <p className="font-semibold text-sm text-gray-900">Upskilling Program</p>
              </div>

            </div>

            {/* Inquire section inside Collaboration */}
            <div className="pt-6 border-t border-gray-200">
              {collabFormSuccess ? (
                <div className="p-4 bg-emerald-50 text-brand-green border border-emerald-100 rounded-xl text-xs font-semibold">
                  ✓ Terima kasih! Permintaan kolaborasi korporat berhasil terkirim. Hub PIC kami akan membalas segera.
                </div>
              ) : (
                <form onSubmit={handleCorpCollabSubmit} className="max-w-4xl grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
                  <div className="sm:col-span-4 space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider" htmlFor="cp-name">Nama Perusahaan</label>
                    <input 
                      id="cp-name"
                      type="text" 
                      required
                      value={corpName}
                      onChange={(e) => setCorpName(e.target.value)}
                      placeholder="PT. Inovasi Bangsa"
                      className="w-full text-xs px-3 py-2 border border-gray-200 rounded-lg outline-none bg-white focus:ring-1 focus:ring-brand-orange" 
                    />
                  </div>
                  <div className="sm:col-span-4 space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider" htmlFor="cp-email">Email PIC</label>
                    <input 
                      id="cp-email"
                      type="email" 
                      required
                      value={corpEmail}
                      onChange={(e) => setCorpEmail(e.target.value)}
                      placeholder="pic@inovasi.id"
                      className="w-full text-xs px-3 py-2 border border-gray-200 rounded-lg outline-none bg-white focus:ring-1 focus:ring-brand-orange" 
                    />
                  </div>
                  <div className="sm:col-span-4">
                    <button 
                      type="submit"
                      className="w-full py-2 bg-brand-orange text-white rounded-lg font-semibold text-xs hover:bg-[#EA580C] transition cursor-pointer uppercase tracking-wider"
                    >
                      Hubungi untuk Kolaborasi
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Section: Career */}
          <div id="career-section" className="mb-8">
            <h2 className="font-bold text-2xl mb-2 text-gray-900">Career</h2>
            <p className="text-gray-600 text-sm mb-6">Lowongan pekerjaan dan magang di RISE Foundation</p>
            
            <div className="space-y-4">
              
              {/* Job 1 */}
              <div className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white">
                <div className="space-y-1.5">
                  <span className="text-[10px] bg-emerald-50 text-brand-green border border-emerald-100 px-2.5 py-0.5 rounded-full font-semibold">
                    Full-time
                  </span>
                  <h4 className="font-bold text-base text-gray-900">Curriculum Developer</h4>
                  <p className="text-xs text-gray-500">Jakarta · Pendidikan · Pengalaman 2+ tahun</p>
                </div>
                <button 
                  onClick={() => handleSelectJob('curriculum-developer')}
                  className="px-6 py-2 bg-brand-orange text-white rounded-lg font-medium hover:bg-[#EA580C] transition text-sm cursor-pointer whitespace-nowrap"
                >
                  Lamar
                </button>
              </div>

              {/* Job 2 */}
              <div className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white">
                <div className="space-y-1.5">
                  <span className="text-[10px] bg-blue-50 text-blue-600 border border-blue-100 px-2.5 py-0.5 rounded-full font-semibold">
                    Magang
                  </span>
                  <h4 className="font-bold text-base text-gray-900">Social Media Intern</h4>
                  <p className="text-xs text-gray-500">Remote · Marketing · Mahasiswa semester 5+</p>
                </div>
                <button 
                  onClick={() => handleSelectJob('social-media-intern')}
                  className="px-6 py-2 bg-brand-orange text-white rounded-lg font-medium hover:bg-[#EA580C] transition text-sm cursor-pointer whitespace-nowrap"
                >
                  Lamar
                </button>
              </div>

              {/* Job 3 */}
              <div className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white">
                <div className="space-y-1.5">
                  <span className="text-[10px] bg-blue-50 text-blue-600 border border-blue-100 px-2.5 py-0.5 rounded-full font-semibold">
                    Magang
                  </span>
                  <h4 className="font-bold text-base text-gray-900">Program Assistant Intern</h4>
                  <p className="text-xs text-gray-500">Bandung · Operations · Mahasiswa semester 4+</p>
                </div>
                <button 
                  onClick={() => handleSelectJob('program-assistant-intern')}
                  className="px-6 py-2 bg-brand-orange text-white rounded-lg font-medium hover:bg-[#EA580C] transition text-sm cursor-pointer whitespace-nowrap"
                >
                  Lamar
                </button>
              </div>

            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
