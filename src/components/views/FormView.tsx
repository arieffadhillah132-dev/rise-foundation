/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ACADEMY_PROGRAMS, SCHOLARSHIPS, CAMP_TRAININGS } from '../../data';
import { ProgramType } from '../../types';
import { ArrowLeft, ChevronDown, Send, Sparkles, UploadCloud } from 'lucide-react';

interface FormViewProps {
  programType: ProgramType;
  programId: string;
  onNavigate: (route: string) => void;
  currentUser: any;
  onAddRegistration: (programType: ProgramType, programId: string, programName: string, details: any) => void;
}

export function FormView({ programType, programId, onNavigate, currentUser, onAddRegistration }: FormViewProps) {
  // 1. Resolve program title dynamically
  let solvedName = 'Program RISE Foundation';
  if (programType === 'academy') {
    if (programId === 'acad-sd') solvedName = 'Formulir Pendaftaran SD RISE';
    else if (programId === 'acad-smp') solvedName = 'Formulir Pendaftaran SMP RISE';
    else if (programId === 'acad-sma') solvedName = 'Formulir Pendaftaran SMA RISE';
    else {
      const item = ACADEMY_PROGRAMS.find(p => p.id === programId);
      if (item) solvedName = item.name;
    }
  } else if (programType === 'scholarship') {
    solvedName = 'Formulir Pendaftaran Beasiswa';
  } else if (programType === 'camp_training') {
    solvedName = 'Daftar Pelatihan RISE Camp';
  } else if (programType === 'volunteer') {
    solvedName = 'Daftar Volunteer Batch 8';
  } else if (programType === 'brand_ambassador') {
    solvedName = 'Daftar Brand Ambassador';
  }

  // Common/Academy-specific state
  const [parentName, setParentName] = useState('');
  const [gpaScore, setGpaScore] = useState('');
  const [essayContent, setEssayContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Scholarship-specific form state
  const [scholarshipFullName, setScholarshipFullName] = useState(currentUser?.fullName || '');
  const [scholarshipJenjang, setScholarshipJenjang] = useState('SD');
  const [scholarshipEmail, setScholarshipEmail] = useState(currentUser?.email || '');
  const [scholarshipGpa, setScholarshipGpa] = useState('');
  const [scholarshipEssay, setScholarshipEssay] = useState('');

  const isSD = programId === 'acad-sd';
  const isSMP = programId === 'acad-smp';
  const isSMA = programId === 'acad-sma';

  const [studentName, setStudentName] = useState(currentUser?.fullName || '');
  const [address, setAddress] = useState('');
  const [registeredClass, setRegisteredClass] = useState(isSD ? 'Kelas 1' : isSMP ? 'Kelas 7' : 'Kelas 10');
  const [wave, setWave] = useState(isSMA ? 'Gelombang 1 - 1 November - 31 Desember 2024' : 'Gelombang 1 - 1 Januari - 28 Februari 2025');

  // Camp-specific form state (matches Screenshot 1 prototype exactly!)
  const [campFullName, setCampFullName] = useState(currentUser?.fullName || '');
  const [campEmail, setCampEmail] = useState(currentUser?.email || '');
  const [campSelectedProgram, setCampSelectedProgram] = useState(() => {
    if (programId === 'camp-english' || programId === 'camp-frontend' || programId === 'camp-speak') {
      return programId;
    }
    return 'camp-english';
  });
  const [campMotivation, setCampMotivation] = useState('');

  // Volunteer-specific form state (matches Screenshot 3 prototype exactly!)
  const [volunteerFullName, setVolunteerFullName] = useState(currentUser?.fullName || '');
  const [volunteerEmail, setVolunteerEmail] = useState(currentUser?.email || '');
  const [volunteerAge, setVolunteerAge] = useState('');
  const [volunteerPosition, setVolunteerPosition] = useState('Pengajar');
  const [volunteerReason, setVolunteerReason] = useState('');

  // Brand Ambassador-specific form state (matches Screenshot 4 prototype exactly!)
  const [baFullName, setBaFullName] = useState(currentUser?.fullName || '');
  const [baUniversity, setBaUniversity] = useState('');
  const [baInstagram, setBaInstagram] = useState('');
  const [baReason, setBaReason] = useState('');

  // Sync inputs with currentUser if loaded
  React.useEffect(() => {
    if (currentUser) {
      if (programType === 'academy') {
        setStudentName(currentUser.fullName || '');
      }
      setCampFullName(currentUser.fullName || '');
      setCampEmail(currentUser.email || '');
      setVolunteerFullName(currentUser.fullName || '');
      setVolunteerEmail(currentUser.email || '');
      setBaFullName(currentUser.fullName || '');
      setScholarshipFullName(currentUser.fullName || '');
      setScholarshipEmail(currentUser.email || '');
    }
    if (programType === 'academy') {
      setRegisteredClass(isSD ? 'Kelas 1' : isSMP ? 'Kelas 7' : 'Kelas 10');
      setWave(isSMA ? 'Gelombang 1 - 1 November - 31 Desember 2024' : 'Gelombang 1 - 1 Januari - 28 Februari 2025');
    }
  }, [programId, currentUser, programType, isSD, isSMP, isSMA]);

  // File Upload placeholders
  const [uploadedFileName, setUploadedFileName] = useState('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFileName(e.target.files[0].name);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      alert('Silakan Masuk Akun terlebih dahulu sebelum mendaftar program.');
      onNavigate('/auth/login');
      return;
    }

    setSubmitting(true);
    
    let finalFileName = uploadedFileName;
    if (!finalFileName) {
      if (programType === 'academy') {
        finalFileName = 'Rapor_dan_Ijazah_Siswa.pdf';
      } else if (programType === 'scholarship') {
        finalFileName = 'Rapor_Prestasi_Siswa.pdf';
      } else {
        finalFileName = 'Dokumen_Rapor_Tervalidasi.pdf';
      }
    }

    // Package dynamic details
    const details: Record<string, any> = {
      uploadedFileName: finalFileName,
    };

    let targetProgramName = solvedName;

    if (programType === 'academy') {
      details.studentName = studentName;
      details.parentName = parentName;
      details.address = address;
      details.registeredClass = registeredClass;
      details.wave = wave;
    } else if (programType === 'scholarship') {
      details.fullName = scholarshipFullName;
      details.jenjang = scholarshipJenjang;
      details.email = scholarshipEmail;
      details.gpaScore = scholarshipGpa;
      details.essayContent = scholarshipEssay;
    } else if (programType === 'camp_training') {
      details.fullName = campFullName;
      details.email = campEmail;
      details.selectedProgram = campSelectedProgram;
      details.motivation = campMotivation;

      // Resolve training name
      const item = CAMP_TRAININGS.find(p => p.id === campSelectedProgram);
      if (item) targetProgramName = item.name;
    } else if (programType === 'volunteer') {
      details.fullName = volunteerFullName;
      details.email = volunteerEmail;
      details.age = volunteerAge;
      details.position = volunteerPosition;
      details.reason = volunteerReason;
    } else if (programType === 'brand_ambassador') {
      details.fullName = baFullName;
      details.university = baUniversity;
      details.instagram = baInstagram;
      details.reason = baReason;
    }

    setTimeout(() => {
      onAddRegistration(programType, programType === 'camp_training' ? campSelectedProgram : programId, targetProgramName, details);
      setSubmitting(false);
      onNavigate('/dashboard');
    }, 1200);
  };

  // Determine back navigation target
  const handleBackNavigation = () => {
    if (programType === 'academy') {
      onNavigate('/program/academy');
    } else if (programType === 'scholarship') {
      onNavigate('/program/scholarship');
    } else if (programType === 'camp_training') {
      onNavigate('/program/camp');
    } else if (programType === 'volunteer' || programType === 'brand_ambassador') {
      onNavigate('/program/community');
    } else {
      onNavigate('/');
    }
  };

  // Hide the notice and upload panel for Scholarship, Camp, Volunteer, and BA
  const isPrototypeStyle = programType === 'camp_training' || programType === 'volunteer' || programType === 'brand_ambassador' || programType === 'scholarship';

  return (
    <div className="bg-white min-h-screen py-12 font-sans">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Header Block */}
        <div className="space-y-4">
          <button 
            onClick={handleBackNavigation}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-orange hover:text-brand-orange/80 transition-colors"
          >
            <span className="text-base">←</span> Kembali
          </button>

          {!isPrototypeStyle && (
            <div className="space-y-1">
              <span className="inline-block px-2.5 py-0.5 rounded bg-brand-orange/15 text-brand-orange text-[9px] font-bold font-mono tracking-widest uppercase">
                Formulir Pendaftaran
              </span>
              <h1 className="font-serif font-bold text-2xl sm:text-3xl text-brand-navy leading-tight">
                {solvedName}
              </h1>
              <p className="text-xs text-brand-grey font-sans">
                Terintegrasi dengan akun terpadu Anda: <strong>{currentUser?.fullName || 'Tamu'} ({currentUser?.email || 'Belum masuk'})</strong>
              </p>
            </div>
          )}
        </div>

        {/* Informative notice block (Only shown for non-prototype style programs) */}
        {!isPrototypeStyle && (
          <div className="bg-white p-5 rounded-2xl border border-gray-150 flex gap-4 items-start shadow-sm">
            <div className="w-9 h-9 rounded-xl bg-brand-orange/10 text-brand-orange flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 animate-spin" style={{ animationDuration: '6s' }} />
            </div>
            <div className="space-y-1">
              <h4 className="font-semibold text-xs text-brand-navy">Single Account Verification</h4>
              <p className="text-[11px] text-brand-grey leading-relaxed">
                Formulir ini secara otomatis tersinkronisasi dengan profil keanggotaan Anda. Anda tidak perlu memasukkan kembali berkas nama dasar, email, maupun handphone.
              </p>
            </div>
          </div>
        )}

        {/* Core Wizard Form card */}
        <div className="bg-white p-2 sm:p-4 rounded-3xl">
          {isPrototypeStyle && (
            <h1 className="font-serif font-bold text-2xl sm:text-3xl text-brand-navy leading-tight mb-8">
              {solvedName}
            </h1>
          )}

          <form onSubmit={handleFormSubmit} className="space-y-6">
            
            {/* Dynamic Inputs: Academy */}
            {programType === 'academy' && (
              <div className="space-y-4">
                <h3 className="text-xs font-bold tracking-wider text-brand-grey uppercase font-mono border-b border-gray-100 pb-2">Formulir Pendaftaran</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-brand-navy">Nama Lengkap Siswa</label>
                    <input 
                      type="text" 
                      required
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      placeholder="Nama Lengkap Siswa" 
                      className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-gray-200 focus:border-brand-orange outline-none bg-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-brand-navy">Nama Orang Tua / Wali</label>
                    <input 
                      type="text" 
                      required
                      value={parentName}
                      onChange={(e) => setParentName(e.target.value)}
                      placeholder="Nama Orang Tua / Wali" 
                      className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-gray-200 focus:border-brand-orange outline-none bg-white"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-brand-navy">Alamat Lengkap</label>
                  <textarea 
                    rows={3}
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Alamat Lengkap Rumah" 
                    className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-gray-200 focus:border-brand-orange outline-none bg-white resize-none font-sans"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-brand-navy">Kelas yang Didaftarkan</label>
                    <select
                      value={registeredClass}
                      onChange={(e) => setRegisteredClass(e.target.value)}
                      className="w-full text-xs px-3 py-2.5 rounded-lg border border-gray-200 focus:border-brand-orange bg-white outline-none"
                    >
                      {isSD && [1, 2, 3, 4, 5, 6].map(k => (
                        <option key={k} value={`Kelas ${k}`}>{`Kelas ${k} (SD)`}</option>
                      ))}
                      {isSMP && [7, 8, 9].map(k => (
                        <option key={k} value={`Kelas ${k}`}>{`Kelas ${k} (SMP)`}</option>
                      ))}
                      {isSMA && [10, 11, 12].map(k => (
                        <option key={k} value={`Kelas ${k}`}>{`Kelas ${k} (SMA)`}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-brand-navy">Pilih Gelombang</label>
                    <select
                      value={wave}
                      onChange={(e) => setWave(e.target.value)}
                      className="w-full text-xs px-3 py-2.5 rounded-lg border border-gray-200 focus:border-brand-orange bg-white outline-none"
                    >
                      {isSD && (
                        <>
                          <option value="Gelombang 1 - 1 Januari - 28 Februari 2025">Gelombang 1 - 1 Januari - 28 Februari 2025</option>
                          <option value="Gelombang 2 - 1 Maret - 30 April 2025">Gelombang 2 - 1 Maret - 30 April 2025</option>
                          <option value="Gelombang 3 - 1 Mei - 30 Juni 2025">Gelombang 3 - 1 Mei - 30 Juni 2025</option>
                        </>
                      )}
                      {isSMP && (
                        <>
                          <option value="Gelombang 1 - 1 Januari - 28 Februari 2025">Gelombang 1 - 1 Januari - 28 Februari 2025</option>
                          <option value="Gelombang 2 - 1 Maret - 30 April 2025">Gelombang 2 - 1 Maret - 30 April 2025</option>
                        </>
                      )}
                      {isSMA && (
                        <>
                          <option value="Gelombang 1 - 1 November - 31 Desember 2024">Gelombang 1 - 1 November - 31 Desember 2024</option>
                          <option value="Gelombang 2 - 1 Januari - 28 Februari 2025">Gelombang 2 - 1 Januari - 28 Februari 2025</option>
                        </>
                      )}
                    </select>
                  </div>
                </div>

                {/* Upload Section: Rapor / Ijazah for Academy */}
                <div className="space-y-2.5 pt-4">
                  <label className="text-xs font-semibold text-brand-navy block">Lampirkan Rapor / Ijazah</label>
                  
                  <div className="border-2 border-dashed border-orange-200 hover:border-brand-orange bg-[#FFF8F3]/50 rounded-2xl p-5 transition-all relative group">
                    <input 
                      type="file" 
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      onChange={handleFileUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      {/* Left Icon */}
                      <div className="w-12 h-12 rounded-xl bg-orange-100/50 flex items-center justify-center shrink-0 text-brand-orange border border-orange-100">
                        <UploadCloud className="w-6 h-6 text-brand-orange group-hover:scale-110 transition-transform" />
                      </div>

                      {/* Middle description */}
                      <div className="text-center sm:text-left space-y-1 flex-1">
                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                          <span className="text-xs font-bold text-brand-navy">
                            {uploadedFileName || "Rapor_dan_Ijazah_Siswa.pdf"}
                          </span>
                          <span className="text-[10px] bg-brand-orange/10 text-brand-orange font-mono font-bold px-2 py-0.5 rounded-full">
                            {uploadedFileName ? "Berkas Anda" : "Otomatis Disiapkan"}
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-500">
                          Format: PDF, PNG, JPG (Maks. 5MB) · Seret ke sini atau klik untuk mengganti berkas
                        </p>
                      </div>

                      {/* Right Indicator */}
                      <div className="bg-emerald-50 text-emerald-700 border border-emerald-200/50 text-[11px] font-semibold px-3 py-1.5 rounded-xl flex items-center gap-1.5 shrink-0 shadow-sm shadow-emerald-50/50">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        Terlampir
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* Dynamic Inputs: Scholarship */}
            {programType === 'scholarship' && (
              <div className="space-y-4 font-sans text-[#1E293B]">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#1E293B]">Nama Lengkap</label>
                    <input 
                      type="text" 
                      required
                      value={scholarshipFullName}
                      onChange={(e) => setScholarshipFullName(e.target.value)}
                      className="w-full text-xs px-3.5 py-3 rounded-xl border border-gray-200 focus:border-brand-orange outline-none bg-white"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#1E293B]">Jenjang</label>
                    <div className="relative">
                      <select
                        value={scholarshipJenjang}
                        onChange={(e) => setScholarshipJenjang(e.target.value)}
                        className="w-full text-xs px-3.5 py-3.5 rounded-xl border border-gray-200 focus:border-brand-orange bg-white outline-none appearance-none cursor-pointer font-medium text-[#1E293B]"
                      >
                        <option value="SD">SD</option>
                        <option value="SMP">SMP</option>
                        <option value="SMA">SMA</option>
                        <option value="Perguruan Tinggi">Perguruan Tinggi</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-[#1E293B] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#1E293B]">Email</label>
                  <input 
                    type="email" 
                    required
                    value={scholarshipEmail}
                    onChange={(e) => setScholarshipEmail(e.target.value)}
                    className="w-full text-xs px-3.5 py-3 rounded-xl border border-gray-200 focus:border-brand-orange outline-none bg-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#1E293B]">Nilai Rata-rata Rapor Terakhir</label>
                  <input 
                    type="number" 
                    min="10"
                    max="100"
                    required
                    value={scholarshipGpa}
                    onChange={(e) => setScholarshipGpa(e.target.value)}
                    placeholder="Masukkan nilai rata-rata..."
                    className="w-full text-xs px-3.5 py-3 rounded-xl border border-gray-200 focus:border-brand-orange outline-none bg-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#1E293B]">Essay Motivasi (500 kata)</label>
                  <textarea 
                    rows={6}
                    required
                    value={scholarshipEssay}
                    onChange={(e) => setScholarshipEssay(e.target.value)}
                    placeholder="Ceritakan motivasi Anda..."
                    className="w-full text-xs px-3.5 py-3 rounded-xl border border-gray-200 focus:border-brand-orange outline-none bg-white resize-none font-sans"
                  />
                </div>

                {/* Upload Section: Rapor for Scholarship */}
                <div className="space-y-2.5 pt-4">
                  <label className="text-xs font-semibold text-[#1E293B] block">Lampirkan Rapor</label>
                  
                  <div className="border-2 border-dashed border-emerald-200 hover:border-brand-green bg-[#ECFDF5]/20 rounded-2xl p-5 transition-all relative group">
                    <input 
                      type="file" 
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      onChange={handleFileUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      {/* Left Icon */}
                      <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0 text-emerald-600 border border-emerald-100">
                        <UploadCloud className="w-6 h-6 text-emerald-600 group-hover:scale-110 transition-transform" />
                      </div>

                      {/* Middle description */}
                      <div className="text-center sm:text-left space-y-1 flex-1">
                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                          <span className="text-xs font-bold text-[#1E293B]">
                            {uploadedFileName || "Rapor_Prestasi_Siswa.pdf"}
                          </span>
                          <span className="text-[10px] bg-brand-green/10 text-brand-green font-mono font-bold px-2 py-0.5 rounded-full">
                            {uploadedFileName ? "Berkas Anda" : "Otomatis Disiapkan"}
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-500">
                          Format: PDF, PNG, JPG (Maks. 5MB) · Seret ke sini atau klik untuk mengganti berkas
                        </p>
                      </div>

                      {/* Right Indicator */}
                      <div className="bg-emerald-50 text-emerald-700 border border-emerald-200/50 text-[11px] font-semibold px-3 py-1.5 rounded-xl flex items-center gap-1.5 shrink-0 shadow-sm shadow-emerald-50/50">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        Terlampir
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* Dynamic Inputs: Camp Trainings (PROTOTYPE STYLE - matches Screenshot 1) */}
            {programType === 'camp_training' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#1E293B]">Nama Lengkap</label>
                    <input 
                      type="text" 
                      required
                      value={campFullName}
                      onChange={(e) => setCampFullName(e.target.value)}
                      className="w-full text-xs px-3.5 py-3 rounded-xl border border-gray-200 focus:border-brand-orange outline-none bg-white"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#1E293B]">Email</label>
                    <input 
                      type="email" 
                      required
                      value={campEmail}
                      onChange={(e) => setCampEmail(e.target.value)}
                      className="w-full text-xs px-3.5 py-3 rounded-xl border border-gray-200 focus:border-brand-orange outline-none bg-white"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#1E293B]">Pilih Pelatihan</label>
                  <select
                    value={campSelectedProgram}
                    onChange={(e) => setCampSelectedProgram(e.target.value)}
                    className="w-full text-xs px-3.5 py-3 rounded-xl border border-gray-200 focus:border-brand-orange bg-white outline-none appearance-none cursor-pointer"
                    style={{ backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23334155' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>")`, backgroundPosition: 'right 12px center', backgroundRepeat: 'no-repeat', backgroundSize: '16px' }}
                  >
                    <option value="camp-english">Pelatihan Bahasa Inggris</option>
                    <option value="camp-frontend">Web Programming</option>
                    <option value="camp-speak">Kepemimpinan</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#1E293B]">Motivasi Mengikuti Pelatihan</label>
                  <textarea 
                    rows={6}
                    required
                    value={campMotivation}
                    onChange={(e) => setCampMotivation(e.target.value)}
                    className="w-full text-xs px-3.5 py-3 rounded-xl border border-gray-200 focus:border-brand-orange outline-none bg-white resize-none font-sans"
                  />
                </div>
              </div>
            )}

            {/* Dynamic Inputs: Volunteer (PROTOTYPE STYLE - matches Screenshot 3) */}
            {programType === 'volunteer' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#1E293B]">Nama Lengkap</label>
                    <input 
                      type="text" 
                      required
                      value={volunteerFullName}
                      onChange={(e) => setVolunteerFullName(e.target.value)}
                      className="w-full text-xs px-3.5 py-3 rounded-xl border border-gray-200 focus:border-brand-orange outline-none bg-white"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#1E293B]">Email</label>
                    <input 
                      type="email" 
                      required
                      value={volunteerEmail}
                      onChange={(e) => setVolunteerEmail(e.target.value)}
                      className="w-full text-xs px-3.5 py-3 rounded-xl border border-gray-200 focus:border-brand-orange outline-none bg-white"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#1E293B]">Usia</label>
                  <input 
                    type="number" 
                    required
                    value={volunteerAge}
                    onChange={(e) => setVolunteerAge(e.target.value)}
                    className="w-full text-xs px-3.5 py-3 rounded-xl border border-gray-200 focus:border-brand-orange outline-none bg-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#1E293B]">Posisi yang Diminati</label>
                  <select
                    value={volunteerPosition}
                    onChange={(e) => setVolunteerPosition(e.target.value)}
                    className="w-full text-xs px-3.5 py-3 rounded-xl border border-gray-200 focus:border-brand-orange bg-white outline-none appearance-none cursor-pointer"
                    style={{ backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23334155' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>")`, backgroundPosition: 'right 12px center', backgroundRepeat: 'no-repeat', backgroundSize: '16px' }}
                  >
                    <option value="Pengajar">Pengajar</option>
                    <option value="Event Organizer">Event Organizer</option>
                    <option value="Liaison Officer">Liaison Officer</option>
                    <option value="Fundraiser">Fundraiser</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#1E293B]">Mengapa ingin jadi volunteer?</label>
                  <textarea 
                    rows={6}
                    required
                    value={volunteerReason}
                    onChange={(e) => setVolunteerReason(e.target.value)}
                    className="w-full text-xs px-3.5 py-3 rounded-xl border border-gray-200 focus:border-brand-orange outline-none bg-white resize-none font-sans"
                  />
                </div>
              </div>
            )}

            {/* Dynamic Inputs: Brand Ambassador (PROTOTYPE STYLE - matches Screenshot 4) */}
            {programType === 'brand_ambassador' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#1E293B]">Nama Lengkap</label>
                    <input 
                      type="text" 
                      required
                      value={baFullName}
                      onChange={(e) => setBaFullName(e.target.value)}
                      className="w-full text-xs px-3.5 py-3 rounded-xl border border-gray-200 focus:border-brand-orange outline-none bg-white"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#1E293B]">Universitas/Institusi</label>
                    <input 
                      type="text" 
                      required
                      value={baUniversity}
                      onChange={(e) => setBaUniversity(e.target.value)}
                      className="w-full text-xs px-3.5 py-3 rounded-xl border border-gray-200 focus:border-brand-orange outline-none bg-white"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#1E293B]">Link Instagram</label>
                  <input 
                    type="text" 
                    required
                    value={baInstagram}
                    onChange={(e) => setBaInstagram(e.target.value)}
                    placeholder="https://instagram.com/..." 
                    className="w-full text-xs px-3.5 py-3 rounded-xl border border-gray-200 focus:border-brand-orange outline-none bg-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#1E293B]">Mengapa ingin menjadi BA RISE?</label>
                  <textarea 
                    rows={6}
                    required
                    value={baReason}
                    onChange={(e) => setBaReason(e.target.value)}
                    className="w-full text-xs px-3.5 py-3 rounded-xl border border-gray-200 focus:border-brand-orange outline-none bg-white resize-none font-sans"
                  />
                </div>
              </div>
            )}

            {/* Document upload box for non-prototype programs */}
            {!isPrototypeStyle && programType !== 'academy' && (
              <div className="space-y-2">
                <h3 className="text-xs font-bold tracking-wider text-brand-grey uppercase font-mono">Unggah Berkas Pendukung (SKTM / Rapor / Resume)</h3>
                
                <div className="border-2 border-dashed border-gray-200 rounded-2xl p-6 text-center hover:border-brand-orange transition-colors bg-gray-50/30 relative">
                  <input 
                    type="file" 
                    accept=".pdf,.doc,.docx,.jpg,.png"
                    onChange={handleFileUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="space-y-2">
                    <UploadCloud className="w-8 h-8 text-brand-orange mx-auto animate-bounce" style={{ animationDuration: '3s' }} />
                    <div>
                      <p className="text-xs font-bold text-brand-navy">Seret berkas ke sini atau klik untuk mencari dokumen</p>
                      <p className="text-[10px] text-gray-400">Format yang diterima: PDF, PNG, JPG (Maksimal 5MB)</p>
                    </div>
                    {uploadedFileName ? (
                      <div className="inline-block bg-emerald-50 text-brand-green border border-brand-green/20 text-xs px-3 py-1 rounded-xl font-mono mt-2">
                        ✔ {uploadedFileName}
                      </div>
                    ) : (
                      <p className="text-[10px] italic text-brand-orange font-semibold font-mono">*Jika diabaikan, kami menyaring berkas simulasi "Dokumen_Rapor_Tervalidasi.pdf" otomatis.</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Submit Block */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={submitting}
                className={`w-full text-center py-4 rounded-xl font-semibold text-sm transition shadow-sm flex items-center justify-center gap-2 cursor-pointer ${
                  programType === 'camp_training' || programType === 'scholarship'
                    ? 'bg-[#16A34A] hover:bg-[#15803d] text-white'
                    : 'bg-[#F97316] hover:bg-[#EA580C] text-white'
                }`}
              >
                {submitting ? (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
                    <span>Menyimpan...</span>
                  </>
                ) : (
                  <>
                    {programType === 'scholarship' ? 'Kirim Pendaftaran Beasiswa' : 'Kirim Pendaftaran'}
                  </>
                )}
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
}
