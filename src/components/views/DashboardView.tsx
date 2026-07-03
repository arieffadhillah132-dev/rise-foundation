/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Registration, LoanRequest, SponsorInquiry, UserRole } from '../../types';
import { StatusBadge } from '../ui/StatusBadge';
import { LIBRARY_BOOKS } from '../../data';
import { 
  User, Award, Compass, GraduationCap, CheckCircle2, ClipboardList, 
  HelpCircle, BookOpen, ShieldCheck, Heart, Mail, Building, Users, Clock, Settings, FileSpreadsheet, Eye
} from 'lucide-react';

interface DashboardViewProps {
  onNavigate: (route: string) => void;
  currentUser: any;
  registrations: Registration[];
  loans: LoanRequest[];
  sponsorInquiries: SponsorInquiry[];
  onUpdateRegistrationStatus: (regId: string, status: any) => void;
  onUpdateLoanStatus: (loanId: string, status: any) => void;
  isLibraryMember?: boolean;
}

export function DashboardView({
  onNavigate,
  currentUser,
  registrations,
  loans,
  sponsorInquiries,
  onUpdateRegistrationStatus,
  onUpdateLoanStatus,
  isLibraryMember = false
}: DashboardViewProps) {
  // Local profile state
  const [profilePersona, setProfilePersona] = useState(currentUser?.persona || 'siswa_sma');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Filter registrations/loans belonging to this student
  const myRegistrations = registrations.filter(r => r.userId === currentUser?.id);
  const myLoans = loans.filter(l => l.userId === currentUser?.id);

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 4000);
  };

  const getPersonaLabel = (p: string) => {
    switch (p) {
      case 'siswa_sma': return 'Siswa SMA / Sederajat';
      case 'mahasiswa': return 'Mahasiswa Aktif';
      case 'fresh_graduate': return 'Pencari Kerja';
      case 'karyawan': return 'Karyawan / Profesional';
      case 'mitra': return 'Mitra Korporat';
      default: return 'Member RISE';
    }
  };

  // Check if current user is admin
  const isAdmin = currentUser?.role === 'admin';

  return (
    <div className="bg-[#FFF3E9]/30 min-h-screen py-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Navigation Breadcrumb */}
        <div className="space-y-4">
          <nav className="flex text-xs font-mono text-brand-grey gap-2">
            <span onClick={() => onNavigate('/')} className="hover:text-brand-orange cursor-pointer">BERANDA</span>
            <span>/</span>
            <span className="text-brand-orange font-bold font-mono">
              {isAdmin ? 'ADMINISTRATOR CONTROL PANEL' : 'STUDENT DASHBOARD'}
            </span>
          </nav>

          <div className="max-w-3xl space-y-2">
            <h1 className="font-serif font-bold text-3xl text-brand-navy">
              {isAdmin ? 'Panel Kontrol Komite RISE' : 'Student & Member Hub'}
            </h1>
            <p className="text-sm text-brand-grey leading-relaxed">
              {isAdmin 
                ? 'Saring dokumen pendaftaran siswa, kelola peminjaman buku perpustakaan fisik, dan tinjau penawaran sponsorship korporat yang masuk.'
                : 'Satu dashboard terpadu untuk memantau status kelulusan program beasiswa, masa aktif pinjaman e-book, serta memperbarui resume Anda.'
              }
            </p>
          </div>
        </div>

        {/* ----------------- ADMINISTRATOR CONTROL PANEL ----------------- */}
        {isAdmin ? (
          <div className="space-y-10">
            {/* Admin Stats widgets */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-3xl border border-gray-150 shadow-sm space-y-2">
                <div className="w-10 h-10 rounded-xl bg-brand-orange/10 text-brand-orange flex items-center justify-center">
                  <ClipboardList className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-brand-navy font-serif">{registrations.length}</p>
                  <p className="text-[10px] text-brand-grey uppercase tracking-wider font-semibold font-mono">Dokumen Masuk</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-gray-150 shadow-sm space-y-2">
                <div className="w-10 h-10 rounded-xl bg-brand-green/10 text-brand-green flex items-center justify-center">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-brand-navy font-serif">{loans.length}</p>
                  <p className="text-[10px] text-brand-grey uppercase tracking-wider font-semibold font-mono">Peminjaman Buku</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-gray-150 shadow-sm space-y-2">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-brand-navy font-serif">{sponsorInquiries.length}</p>
                  <p className="text-[10px] text-brand-grey uppercase tracking-wider font-semibold font-mono">Proposal Sponsor</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-gray-150 shadow-sm space-y-2">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-brand-navy font-serif">5</p>
                  <p className="text-[10px] text-brand-grey uppercase tracking-wider font-semibold font-mono">User Terdaftar</p>
                </div>
              </div>
            </div>

            {/* Managed Registrations Table */}
            <div className="bg-white rounded-3xl border border-gray-150 shadow-sm overflow-hidden space-y-4 p-6">
              <div className="space-y-1">
                <h3 className="font-serif font-bold text-lg text-brand-navy">Kelola Berkas Registrasi Siswa</h3>
                <p className="text-xs text-brand-grey">Tinjau seluruh pendaftaran untuk sekolah formal (academy), beasiswa, kelas camps, maupun relawan sosial.</p>
              </div>

              <div className="overflow-x-auto border border-gray-100 rounded-2xl">
                <table className="w-full text-left text-xs text-brand-navy font-sans">
                  <thead className="bg-gray-50 border-b border-gray-100 font-mono text-[10px] text-brand-grey uppercase tracking-wider">
                    <tr>
                      <th className="p-4">Program / ID</th>
                      <th className="p-4">Kategori</th>
                      <th className="p-4">Waktu Kirim</th>
                      <th className="p-4">Status Saat Ini</th>
                      <th className="p-4 text-right">Aksi Moderator</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {registrations.length > 0 ? (
                      registrations.map((reg) => (
                        <tr key={reg.id} className="hover:bg-gray-50/50">
                          <td className="p-4">
                            <div>
                              <p className="font-bold text-xs">{reg.programName}</p>
                              <p className="text-[10px] text-gray-400 font-mono">REG-ID: {reg.id}</p>
                              {reg.details && reg.programType === 'academy' && (
                                <div className="mt-1 text-[10px] text-gray-500 bg-gray-50 p-2 rounded space-y-0.5 border border-gray-100">
                                  <p><strong>Siswa:</strong> {reg.details.studentName}</p>
                                  <p><strong>Orang Tua:</strong> {reg.details.parentName}</p>
                                  <p><strong>Alamat:</strong> {reg.details.address}</p>
                                  <p><strong>Kelas:</strong> {reg.details.registeredClass} • <strong>{(reg.details?.wave ?? '').split(' - ')[0] || ''}</strong></p>
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="p-4">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-brand-light text-brand-orange font-mono">
                              {reg.programType.replace('_', ' ')}
                            </span>
                          </td>
                          <td className="p-4 text-brand-grey">{reg.submittedAt}</td>
                          <td className="p-4">
                            <StatusBadge status={reg.status} />
                          </td>
                          <td className="p-4 text-right space-x-1">
                            <button
                              onClick={() => onUpdateRegistrationStatus(reg.id, 'accepted')}
                              className="px-2 py-1 rounded bg-emerald-50 hover:bg-brand-green hover:text-white text-brand-green text-[10px] font-bold transition uppercase"
                            >
                              Terima
                            </button>
                            <button
                              onClick={() => onUpdateRegistrationStatus(reg.id, 'rejected')}
                              className="px-2 py-1 rounded bg-rose-50 hover:bg-rose-600 hover:text-white text-rose-700 text-[10px] font-bold transition uppercase"
                            >
                              Tolak
                            </button>
                            <button
                              onClick={() => onUpdateRegistrationStatus(reg.id, 'in_review')}
                              className="px-2 py-1 rounded bg-amber-50 hover:bg-brand-orange hover:text-white text-brand-orange text-[10px] font-bold transition uppercase"
                            >
                              Tinjau
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="p-8 text-center text-brand-grey font-sans">Belum ada berkas pendaftaran yang masuk ke sistem.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Corporate Sponsor Inquiries */}
            <div className="bg-white rounded-3xl border border-gray-150 shadow-sm overflow-hidden space-y-4 p-6">
              <div className="space-y-1">
                <h3 className="font-serif font-bold text-lg text-brand-navy">Proposal Kemitraan Korporat (Sponsorship)</h3>
                <p className="text-xs text-brand-grey">Daftar instansi yang mengirimkan proposal dan permohonan kolaborasi CSR.</p>
              </div>

              <div className="overflow-x-auto border border-gray-100 rounded-2xl">
                <table className="w-full text-left text-xs text-brand-navy font-sans">
                  <thead className="bg-gray-50 border-b border-gray-100 font-mono text-[10px] text-brand-grey uppercase tracking-wider">
                    <tr>
                      <th className="p-4">Perusahaan / CP</th>
                      <th className="p-4">Kontak</th>
                      <th className="p-4">Kebutuhan / Catatan</th>
                      <th className="p-4">Tanggal Kirim</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {sponsorInquiries.length > 0 ? (
                      sponsorInquiries.map((inq) => (
                        <tr key={inq.id} className="hover:bg-gray-50/50">
                          <td className="p-4">
                            <div>
                              <p className="font-bold text-xs">{inq.companyName}</p>
                              <p className="text-[10px] text-gray-400 font-sans">Contact: {inq.contactName}</p>
                            </div>
                          </td>
                          <td className="p-4 text-brand-grey">
                            <div>
                              <p>{inq.email}</p>
                              <p className="text-[10px]">{inq.phone}</p>
                            </div>
                          </td>
                          <td className="p-4 text-brand-navy font-sans max-w-xs truncate" title={inq.notes}>
                            {inq.notes}
                          </td>
                          <td className="p-4 text-brand-grey font-mono">{inq.submittedAt}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="p-8 text-center text-brand-grey">Belum ada proposal kemitraan korporat yang masuk.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Managed Book Loans */}
            <div className="bg-white rounded-3xl border border-gray-150 shadow-sm overflow-hidden space-y-4 p-6">
              <div className="space-y-1">
                <h3 className="font-serif font-bold text-lg text-brand-navy">Kelola Peminjaman Buku Perpustakaan</h3>
                <p className="text-xs text-brand-grey">Daftar permohonan pinjam buku fisik dari anggota perpustakaan digital RISE.</p>
              </div>

              <div className="overflow-x-auto border border-gray-100 rounded-2xl">
                <table className="w-full text-left text-xs text-brand-navy font-sans">
                  <thead className="bg-gray-50 border-b border-gray-100 font-mono text-[10px] text-brand-grey uppercase tracking-wider">
                    <tr>
                      <th className="p-4">Judul Buku</th>
                      <th className="p-4">ID Peminjam</th>
                      <th className="p-4">Tanggal Pinjam</th>
                      <th className="p-4">Status Pinjam</th>
                      <th className="p-4 text-right">Aksi Moderator</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {loans.length > 0 ? (
                      loans.map((loan) => (
                        <tr key={loan.id} className="hover:bg-gray-50/50">
                          <td className="p-4 font-bold">{loan.bookTitle}</td>
                          <td className="p-4 text-brand-grey font-mono text-[11px]">{loan.userId}</td>
                          <td className="p-4 text-brand-grey">{loan.loanDate}</td>
                          <td className="p-4 font-semibold font-mono text-[10px]">
                            <span className={`px-2 py-0.5 rounded-full ${
                              loan.status === 'borrowed' ? 'bg-blue-100 text-blue-800' :
                              loan.status === 'returned' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                            }`}>
                              {loan.status.toUpperCase()}
                            </span>
                          </td>
                          <td className="p-4 text-right space-x-1">
                            <button
                              onClick={() => onUpdateLoanStatus(loan.id, 'borrowed')}
                              className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-[10px] font-bold"
                            >
                              Kirim
                            </button>
                            <button
                              onClick={() => onUpdateLoanStatus(loan.id, 'returned')}
                              className="px-2 py-0.5 rounded bg-emerald-50 text-brand-green text-[10px] font-bold"
                            >
                              Selesai
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="p-8 text-center text-brand-grey">Belum ada peminjaman buku fisik aktif.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        ) : (
          /* ----------------- STANDARD STUDENT/MEMBER DASHBOARD ----------------- */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Virtual ID Card & Profile Settings (Grid 4) */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Premium Virtual ID Card */}
              <div className="bg-brand-navy text-white rounded-3xl p-6 border border-white/5 shadow-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(#F37021_1px,transparent_1px)] [background-size:12px_12px] opacity-10"></div>
                <div className="absolute -right-12 -bottom-12 w-32 h-32 bg-brand-orange/20 rounded-full blur-2xl"></div>
                
                <div className="relative z-10 space-y-6">
                  {/* Card Header */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-brand-orange flex items-center justify-center text-white font-bold text-sm">R</div>
                      <span className="font-serif font-bold text-sm tracking-wide">RISE CARD</span>
                    </div>
                    <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-brand-orange">Student ID</span>
                  </div>

                  {/* Profile Info */}
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-bold text-xs">
                        {currentUser?.fullName.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm">{currentUser?.fullName}</h4>
                        <span className="px-2 py-0.5 rounded text-[8px] font-bold uppercase bg-white/10 text-brand-orange font-mono">
                          {getPersonaLabel(profilePersona)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer Code */}
                  <div className="pt-4 border-t border-white/10 flex justify-between items-end text-[10px] font-sans text-gray-300">
                    <div>
                      <p className="text-[8px] text-gray-500 uppercase tracking-widest">Nomor Anggota</p>
                      <p className="font-bold tracking-widest text-white">RISE-MEMBER-{((currentUser?.id ?? '').split('-')[1] ?? 'A78B').toUpperCase()}</p>
                    </div>
                    <div>
                      <p className="text-[8px] text-gray-500 uppercase tracking-widest">Dibuat Sejak</p>
                      <p className="font-bold text-white">{currentUser?.createdAt || '2026'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Profile settings edit form */}
              <div className="bg-white p-6 rounded-3xl border border-gray-150 shadow-sm space-y-4">
                <div className="space-y-1">
                  <h3 className="font-serif font-bold text-base text-brand-navy flex items-center gap-1.5">
                    <Settings className="w-4 h-4 text-brand-orange" /> Pengaturan Akun
                  </h3>
                  <p className="text-[11px] text-brand-grey">Sesuaikan minat belajar dan jenis pendidikan Anda.</p>
                </div>

                {savedSuccess && (
                  <div className="p-2.5 bg-emerald-50 border border-brand-green/20 rounded-lg text-xs text-brand-green font-sans leading-relaxed">
                    ✔ Perubahan profil berhasil disimpan!
                  </div>
                )}

                <form onSubmit={handleProfileSave} className="space-y-3 text-xs">
                  <div className="space-y-1">
                    <label className="font-semibold text-brand-navy">Persona Pelajar Anda</label>
                    <select
                      value={profilePersona}
                      onChange={(e) => setProfilePersona(e.target.value)}
                      className="w-full px-2.5 py-2 rounded-lg border border-gray-200 focus:border-brand-orange bg-white outline-none"
                    >
                      <option value="siswa_sma">Siswa SMA / Sederajat</option>
                      <option value="mahasiswa">Mahasiswa Aktif</option>
                      <option value="fresh_graduate">Fresh Graduate (Pencari Kerja)</option>
                      <option value="karyawan">Karyawan / Profesional</option>
                      <option value="mitra">Mitra Korporat</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-semibold text-brand-navy">Minat Program Belajar</label>
                    <div className="space-y-1">
                      {['Coding Web & AI', 'Public Speaking & Presentation', 'Sains Dasar & Matematika', 'IELTS & Bahasa Asing'].map((m) => (
                        <label key={m} className="flex items-center gap-2 text-[11px] text-gray-500">
                          <input type="checkbox" defaultChecked className="rounded text-brand-orange focus:ring-brand-orange" />
                          <span>{m}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full text-center py-2 rounded-lg bg-brand-orange hover:bg-brand-orange/95 text-white font-semibold text-xs tracking-wider uppercase transition shadow-sm"
                  >
                    Simpan Perubahan
                  </button>
                </form>
              </div>

            </div>

            {/* Right Column: Registrations and Loans list (Grid 8) */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Section A: Active Registrations */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-150 shadow-sm space-y-6">
                <div className="space-y-1">
                  <h3 className="font-serif font-bold text-lg text-brand-navy">Status Berkas Pendaftaran Anda</h3>
                  <p className="text-xs text-brand-grey">Saring progress penyaringan administrasi, seleksi wawancara, dan SK kelulusan program beasiswa secara berkala di sini.</p>
                </div>

                {myRegistrations.length > 0 ? (
                  <div className="space-y-4">
                    {myRegistrations.map((reg) => (
                      <div 
                        key={reg.id}
                        className="p-4 rounded-2xl border border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-brand-orange transition"
                      >
                        <div className="flex gap-3 items-start">
                          <div className="w-10 h-10 rounded-xl bg-brand-orange/10 text-brand-orange flex items-center justify-center shrink-0">
                            {reg.programType === 'academy' ? <GraduationCap className="w-5.5 h-5.5" /> : 
                             reg.programType === 'scholarship' ? <Award className="w-5.5 h-5.5" /> : <Compass className="w-5.5 h-5.5" />}
                          </div>
                          <div>
                            <span className="text-[9px] uppercase font-bold font-mono text-brand-orange tracking-widest">{reg.programType.replace('_', ' ')}</span>
                            <h4 className="font-serif font-bold text-sm text-brand-navy mt-0.5">{reg.programName}</h4>
                            <p className="text-[10px] text-gray-400 font-mono">REG-ID: {reg.id} • Tanggal Kirim: {reg.submittedAt}</p>
                            {reg.details && reg.programType === 'academy' && (
                              <div className="mt-2 text-[11px] text-gray-600 bg-white p-3 rounded-lg border border-gray-100 space-y-1 max-w-md">
                                <p><strong>Nama Siswa:</strong> {reg.details.studentName}</p>
                                <p><strong>Orang Tua/Wali:</strong> {reg.details.parentName}</p>
                                <p><strong>Alamat:</strong> {reg.details.address}</p>
                                <p><strong>Kelas:</strong> {reg.details.registeredClass} • <strong>{reg.details.wave}</strong></p>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                          <StatusBadge status={reg.status} />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center border border-dashed border-gray-200 rounded-2xl bg-gray-50/30 space-y-3">
                    <ClipboardList className="w-10 h-10 text-gray-300 mx-auto" />
                    <div>
                      <p className="font-serif font-bold text-sm text-brand-navy">Belum Mengajukan Program</p>
                      <p className="text-xs text-brand-grey mt-0.5">Siswa dapat mengunjungi halaman Akademi, Beasiswa, atau Camps untuk mendaftarkan diri.</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Section B: Library Book Loans */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-150 shadow-sm space-y-6">
                <div className="space-y-1">
                  <h3 className="font-serif font-bold text-lg text-brand-navy">Peminjaman Buku & Literasi Saya</h3>
                  <p className="text-xs text-brand-grey">E-book dapat langsung dibaca, sementara buku fisik akan dikirim ke alamat rumah Anda setelah dikonfirmasi.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Left Column: Loaned Books List (lg:col-span-8) */}
                  <div className="lg:col-span-8 space-y-4">
                    <h4 className="text-[10px] font-bold tracking-wider text-brand-grey uppercase font-mono pb-1 border-b border-gray-100">Buku yang Dipinjam</h4>
                    
                    {myLoans.length > 0 ? (
                      <div className="space-y-3">
                        {myLoans.map((loan) => (
                          <div 
                            key={loan.id}
                            className="p-4 rounded-2xl border border-gray-100 bg-gray-50/30 flex justify-between items-center hover:border-brand-green/30 transition-all"
                          >
                            <div className="flex gap-3 items-center">
                              <div className="w-9 h-9 rounded-xl bg-brand-green/10 text-brand-green flex items-center justify-center shrink-0">
                                <BookOpen className="w-5 h-5" />
                              </div>
                              <div>
                                <h4 className="font-bold text-xs sm:text-sm text-brand-navy">{loan.bookTitle}</h4>
                                <p className="text-[10px] text-gray-400 font-sans">Mulai Pinjam: {loan.loanDate}</p>
                              </div>
                            </div>

                            <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold font-mono uppercase shrink-0 ${
                              loan.status === 'borrowed' ? 'bg-blue-100 text-blue-800' : 
                              loan.status === 'returned' ? 'bg-emerald-100 text-brand-green' : 'bg-amber-100 text-amber-800'
                            }`}>
                              {loan.status === 'borrowed' ? 'Sedang Dipinjam' : 
                               loan.status === 'returned' ? 'Sudah Dikembalikan' : 'Menunggu Konfirmasi'}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-8 text-center border border-dashed border-gray-200 rounded-2xl bg-gray-50/30 space-y-3">
                        <BookOpen className="w-8 h-8 text-gray-300 mx-auto" />
                        <div>
                          <p className="font-serif font-bold text-xs text-brand-navy">Belum Memiliki Riwayat Pinjam</p>
                          <p className="text-[11px] text-brand-grey mt-0.5">Kunjungi portal Library RISE untuk memesan buku fisik maupun mengunduh e-book.</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right Column: Library Membership Card (lg:col-span-4) */}
                  <div className="lg:col-span-4 space-y-4">
                    <h4 className="text-[10px] font-bold tracking-wider text-brand-grey uppercase font-mono pb-1 border-b border-gray-100">Status Keanggotaan</h4>
                    
                    {isLibraryMember ? (
                      /* Active Member Card */
                      <div className="bg-[#ECFDF5] border border-emerald-200 rounded-2xl p-5 space-y-4 relative overflow-hidden shadow-sm shadow-emerald-100">
                        <div className="absolute right-0 top-0 translate-x-3 -translate-y-3 w-16 h-16 bg-emerald-100/35 rounded-full pointer-events-none"></div>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-[#059669] text-white flex items-center justify-center font-bold text-xs shadow-sm">L</div>
                          <div>
                            <p className="text-[11px] font-bold text-[#065F46] leading-none">RISE LIBRARY</p>
                            <span className="text-[9px] font-semibold text-[#059669]">Digital Access Member</span>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <p className="text-[9px] uppercase tracking-wider font-mono text-emerald-600 font-bold">Status Member</p>
                          <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            <span className="text-xs font-extrabold text-[#065F46] tracking-wide">AKTIF & VALID</span>
                          </div>
                        </div>

                        <p className="text-[11px] text-[#065F46]/80 leading-relaxed font-sans">
                          Akses tak terbatas untuk mengunduh gratis seluruh e-book dan meminjam hingga 5 buku fisik sekaligus.
                        </p>

                        <button 
                          onClick={() => onNavigate('/program/library')}
                          className="w-full text-center py-2 rounded-xl bg-[#059669] hover:bg-[#047857] text-white text-xs font-bold transition-all shadow-sm shadow-emerald-100"
                        >
                          Masuk Portal Library
                        </button>
                      </div>
                    ) : (
                      /* Inactive Member Card */
                      <div className="bg-[#FFFBEB] border border-amber-200 rounded-2xl p-5 space-y-4 relative overflow-hidden shadow-sm shadow-amber-50">
                        <div className="absolute right-0 top-0 translate-x-3 -translate-y-3 w-16 h-16 bg-amber-100/30 rounded-full pointer-events-none"></div>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center font-bold text-xs shadow-sm">L</div>
                          <div>
                            <p className="text-[11px] font-bold text-[#92400E] leading-none">RISE LIBRARY</p>
                            <span className="text-[9px] font-semibold text-amber-600">Digital Access Member</span>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <p className="text-[9px] uppercase tracking-wider font-mono text-amber-600 font-bold">Status Member</p>
                          <span className="text-xs font-extrabold text-[#92400E] tracking-wide uppercase">BELUM AKTIF</span>
                        </div>

                        <p className="text-[11px] text-[#92400E]/80 leading-relaxed font-sans">
                          Aktifkan akun perpustakaan untuk membaca e-book gratis dan meminjam buku fisik di lokasi terdekat.
                        </p>

                        <button 
                          onClick={() => onNavigate('/program/library')}
                          className="w-full text-center py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition-all shadow-sm shadow-amber-100"
                        >
                          Daftar Jadi Member →
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
