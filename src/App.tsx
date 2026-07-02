/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { User, UserRole, Registration, LoanRequest, SponsorInquiry, ProgramType } from './types';
import { ACADEMY_PROGRAMS, SCHOLARSHIPS, CAMP_TRAININGS, LIBRARY_BOOKS } from './data';

// Layout components
import { Navbar } from './components/layouts/Navbar';
import { Footer } from './components/layouts/Footer';

// UI components
import { Toast, ToastMessage } from './components/ui/Toast';

// View components
import { HomeView } from './components/views/HomeView';
import { AcademyView } from './components/views/AcademyView';
import { ScholarshipsView } from './components/views/ScholarshipsView';
import { LibraryView } from './components/views/LibraryView';
import { CampView } from './components/views/CampView';
import { CommunityView } from './components/views/CommunityView';
import { BlogView } from './components/views/BlogView';
import { SponsorshipView } from './components/views/SponsorshipView';
import { AuthView } from './components/views/AuthView';
import { FormView } from './components/views/FormView';
import { SearchPortalView } from './components/views/SearchPortalView';
import { DashboardView } from './components/views/DashboardView';

export default function App() {
  // 1. ROUTING STATE
  const [activeRoute, setActiveRoute] = useState<string>('/');
  // Storing form parameters
  const [formProgramType, setFormProgramType] = useState<ProgramType>('academy');
  const [formProgramId, setFormProgramId] = useState<string>('');

  // 1b. LOGIN REDIRECTION & INTEGRATION STATE
  const [redirectIntent, setRedirectIntent] = useState<{
    route: string;
    programType?: ProgramType;
    programId?: string;
    trainingId?: string | null;
    jobId?: string | null;
    showSponsorshipForm?: boolean;
  } | null>(null);

  const [campTrainingId, setCampTrainingId] = useState<string | null>(null);
  const [campJobId, setCampJobId] = useState<string | null>(null);
  const [sponsorshipShowForm, setSponsorshipShowForm] = useState<boolean>(false);

  // 2. ACTIVE USER / SANDBOX AUTHENTICATION STATE
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isLibraryMember, setIsLibraryMember] = useState<boolean>(false);

  // 3. SEEDED DATABASE STATES
  const [registrations, setRegistrations] = useState<Registration[]>([
    {
      id: 'reg-001',
      userId: 'usr-default',
      programType: 'scholarship',
      programId: 'schol-prestasi',
      programName: 'Beasiswa Unggulan Prestasi RISE 2026',
      status: 'submitted',
      submittedAt: '2026-06-25',
      details: { gpaScore: '89', essayContent: 'Memajukan literasi sains dan AI di Indonesia.' }
    },
    {
      id: 'reg-002',
      userId: 'usr-default',
      programType: 'camp_training',
      programId: 'camp-frontend',
      programName: 'Intensive Frontend React & Tailwind Web Bootcamp',
      status: 'accepted',
      submittedAt: '2026-06-20',
      details: { experienceLevel: 'Beginner' }
    }
  ]);

  const [loans, setLoans] = useState<LoanRequest[]>([
    {
      id: 'loan-001',
      userId: 'usr-default',
      bookId: 'book-kiat',
      bookTitle: 'Kiat Sukses Memperoleh Beasiswa Pendidikan Dunia',
      status: 'borrowed',
      loanDate: '2026-06-28'
    }
  ]);

  const [sponsorInquiries, setSponsorInquiries] = useState<SponsorInquiry[]>([
    {
      id: 'inq-001',
      companyName: 'PT TechSustain Corp',
      contactName: 'Fahmi Ramadhan',
      email: 'fahmi@techsustain.com',
      phone: '08123456789',
      notes: 'Tertarik menjadi sponsor utama Beasiswa Kemitraan Korporat RISE 2026.',
      submittedAt: '2026-06-29'
    }
  ]);

  // 4. ALERTS / TOAST STATE
  const [activeToast, setActiveToast] = useState<ToastMessage | null>(null);

  const showToast = (text: string, type: 'success' | 'error' | 'info' = 'success') => {
    setActiveToast({
      id: 'toast-' + Math.random().toString(36).substr(2, 9),
      text,
      type
    });
  };

  // 5. NAVIGATION TRIGGER ACTIONS
  const handleNavigate = (route: string) => {
    // If navigating normally to standard pages, clear stale redirect intents
    if (route === '/auth/login' || route === '/auth/register') {
      setRedirectIntent(null);
    } else if (route !== '/form' && route !== '/program/camp' && route !== '/sponsorship') {
      setRedirectIntent(null);
    }
    setActiveRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToForm = (programTypeStr: string, programIdStr: string) => {
    if (!currentUser) {
      showToast('Silakan masuk akun terlebih dahulu sebelum mengajukan pendaftaran.', 'info');
      setRedirectIntent({
        route: '/form',
        programType: programTypeStr as ProgramType,
        programId: programIdStr
      });
      // Bypass handleNavigate to prevent clearing the intent we just set
      setActiveRoute('/auth/login');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setFormProgramType(programTypeStr as ProgramType);
    setFormProgramId(programIdStr);
    handleNavigate('/form');
  };

  const handleRequireLogin = (route: string, params?: any) => {
    showToast('Silakan masuk akun terlebih dahulu sebelum mengajukan pendaftaran.', 'info');
    setRedirectIntent({
      route,
      trainingId: params?.trainingId || null,
      jobId: params?.jobId || null,
      showSponsorshipForm: params?.showForm || false
    });
    // Bypass handleNavigate to prevent clearing the intent we just set
    setActiveRoute('/auth/login');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 6. SHARED STATE SYNCHRONIZATION MUTATORS
  const handleLoginSuccess = (userObj: any) => {
    setCurrentUser(userObj);
    showToast(`Selamat datang kembali, ${userObj.fullName}!`, 'success');
    
    if (redirectIntent) {
      const intent = redirectIntent;
      setRedirectIntent(null); // Clear the intent immediately
      
      if (intent.route === '/form') {
        setFormProgramType(intent.programType || 'academy');
        setFormProgramId(intent.programId || '');
        handleNavigate('/form');
      } else if (intent.route === '/program/camp') {
        setCampTrainingId(intent.trainingId || null);
        setCampJobId(intent.jobId || null);
        handleNavigate('/program/camp');
      } else if (intent.route === '/sponsorship') {
        setSponsorshipShowForm(intent.showSponsorshipForm || false);
        handleNavigate('/sponsorship');
      } else {
        handleNavigate(intent.route);
      }
    } else {
      handleNavigate('/dashboard');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsLibraryMember(false);
    showToast('Sesi Anda telah keluar secara aman.', 'info');
    handleNavigate('/');
  };

  const handleRoleSwitch = (newRole: UserRole) => {
    setIsLibraryMember(false);
    if (newRole === 'visitor') {
      setCurrentUser({
        id: 'usr-default',
        fullName: 'Maharani Syifatania',
        email: 'maharani@rise.org',
        phoneNumber: '081299998888',
        role: 'visitor',
        persona: 'siswa_sma',
        createdAt: '15/06/2026'
      });
      showToast('Berhasil mengubah simulasi ke peran Pengunjung (Siswa / Sponsor / Umum)!', 'success');
    } else if (newRole === 'admin') {
      setCurrentUser({
        id: 'usr-admin',
        fullName: 'Evi Lestari',
        email: 'admin@rise.org',
        phoneNumber: '081122223333',
        role: 'admin',
        persona: 'mitra',
        createdAt: '01/01/2026'
      });
      showToast('HAK AKSES ADMINISTRATOR DIBUKA: Anda kini dapat menyaring berkas siswa!', 'success');
    }
    handleNavigate('/dashboard');
  };

  const handleAddRegistration = (programType: ProgramType, programId: string, programName: string, details: any) => {
    if (!currentUser) return;

    const newReg: Registration = {
      id: 'reg-' + Math.random().toString(36).substr(2, 5).toUpperCase(),
      userId: currentUser.id,
      programType,
      programId,
      programName,
      status: 'submitted',
      submittedAt: new Date().toISOString().split('T')[0],
      details
    };

    setRegistrations(prev => [newReg, ...prev]);
    showToast(`Registrasi Anda untuk "${programName}" berhasil dikirim! Tinjau statusnya di dashboard.`, 'success');
  };

  const handleAddLoan = (bookId: string, bookTitle: string) => {
    if (!currentUser) return;

    const newLoan: LoanRequest = {
      id: 'loan-' + Math.random().toString(36).substr(2, 5).toUpperCase(),
      userId: currentUser.id,
      bookId,
      bookTitle,
      status: 'pending',
      loanDate: new Date().toISOString().split('T')[0]
    };

    setLoans(prev => [newLoan, ...prev]);
    showToast(`Permohonan pinjam buku "${bookTitle}" berhasil dikirim!`, 'success');
  };

  const handleJoinMember = () => {
    setIsLibraryMember(true);
    showToast('Keanggotaan perpustakaan digital Anda berhasil diaktifkan!', 'success');
  };

  const handleAddInquiry = (companyName: string, contactName: string, email: string, phone: string, notes: string) => {
    const newInq: SponsorInquiry = {
      id: 'inq-' + Math.random().toString(36).substr(2, 5).toUpperCase(),
      companyName,
      contactName,
      email,
      phone,
      notes,
      submittedAt: new Date().toISOString().split('T')[0]
    };

    setSponsorInquiries(prev => [newInq, ...prev]);
    showToast('Proposal kerja sama sponsorship Anda berhasil dikirim ke Komite RISE!', 'success');
  };

  const handleUpdateRegistrationStatus = (regId: string, newStatus: 'submitted' | 'in_review' | 'accepted' | 'rejected') => {
    setRegistrations(prev => prev.map(reg => reg.id === regId ? { ...reg, status: newStatus } : reg));
    showToast(`Status berkas registrasi #${regId} berhasil diubah menjadi: ${newStatus.toUpperCase()}`, 'success');
  };

  const handleUpdateLoanStatus = (loanId: string, newStatus: 'pending' | 'borrowed' | 'returned' | 'overdue') => {
    setLoans(prev => prev.map(loan => loan.id === loanId ? { ...loan, status: newStatus } : loan));
    showToast(`Status peminjaman buku #${loanId} diperbarui: ${newStatus.toUpperCase()}`, 'success');
  };

  // 7. ROUTING DISPATCH CANVAS
  const renderView = () => {
    if (activeRoute === '/') {
      return <HomeView onNavigate={handleNavigate} currentUser={currentUser} />;
    }
    if (activeRoute === '/program/academy') {
      return (
        <AcademyView 
          onNavigate={handleNavigate} 
          onNavigateToForm={handleNavigateToForm} 
        />
      );
    }
    if (activeRoute === '/program/scholarship') {
      return (
        <ScholarshipsView 
          onNavigate={handleNavigate} 
          onNavigateToForm={handleNavigateToForm} 
        />
      );
    }
    if (activeRoute === '/program/library') {
      return (
        <LibraryView 
          onNavigate={handleNavigate} 
          currentUser={currentUser} 
          onAddLoan={handleAddLoan} 
          onJoinMember={handleJoinMember} 
          isLibraryMember={isLibraryMember}
        />
      );
    }
    if (activeRoute === '/program/camp') {
      return (
        <CampView 
          onNavigate={handleNavigate} 
          onNavigateToForm={handleNavigateToForm} 
          currentUser={currentUser}
          onRequireLogin={handleRequireLogin}
          initialTrainingId={campTrainingId}
          initialJobId={campJobId}
          onClearInitialTrainingId={() => setCampTrainingId(null)}
          onClearInitialJobId={() => setCampJobId(null)}
        />
      );
    }
    if (activeRoute === '/program/community') {
      return (
        <CommunityView 
          onNavigate={handleNavigate} 
          onNavigateToForm={handleNavigateToForm} 
          currentUser={currentUser} 
        />
      );
    }
    if (activeRoute === '/blog') {
      return <BlogView onNavigate={handleNavigate} />;
    }
    if (activeRoute === '/sponsorship') {
      return (
        <SponsorshipView 
          onNavigate={handleNavigate} 
          onAddInquiry={handleAddInquiry} 
          currentUser={currentUser}
          onRequireLogin={handleRequireLogin}
          initialShowForm={sponsorshipShowForm}
          onClearInitialShowForm={() => setSponsorshipShowForm(false)}
        />
      );
    }
    if (activeRoute === '/auth/login') {
      return (
        <AuthView 
          onNavigate={handleNavigate} 
          onLoginSuccess={handleLoginSuccess} 
          initialMode="login" 
        />
      );
    }
    if (activeRoute === '/auth/register') {
      return (
        <AuthView 
          onNavigate={handleNavigate} 
          onLoginSuccess={handleLoginSuccess} 
          initialMode="register" 
        />
      );
    }
    if (activeRoute === '/form') {
      return (
        <FormView 
          programType={formProgramType} 
          programId={formProgramId} 
          onNavigate={handleNavigate} 
          currentUser={currentUser} 
          onAddRegistration={handleAddRegistration} 
        />
      );
    }
    if (activeRoute === '/search') {
      return (
        <SearchPortalView 
          onNavigate={handleNavigate} 
          onNavigateToForm={handleNavigateToForm} 
        />
      );
    }
    if (activeRoute === '/dashboard') {
      return (
        <DashboardView 
          onNavigate={handleNavigate} 
          currentUser={currentUser} 
          registrations={registrations} 
          loans={loans} 
          sponsorInquiries={sponsorInquiries} 
          onUpdateRegistrationStatus={handleUpdateRegistrationStatus} 
          onUpdateLoanStatus={handleUpdateLoanStatus} 
          isLibraryMember={isLibraryMember}
        />
      );
    }

    // Fallback default home
    return <HomeView onNavigate={handleNavigate} currentUser={currentUser} />;
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FFF3E9]/10">
      
      {/* Toast Alert System overlay */}
      <Toast message={activeToast} onClose={() => setActiveToast(null)} />

      {/* Primary Header */}
      <Navbar 
        activeRoute={activeRoute} 
        onNavigate={handleNavigate} 
        currentUser={currentUser} 
        onLogout={handleLogout} 
        onNavigateSearch={() => handleNavigate('/search')} 
      />

      {/* Main Viewport Content with transition anchors */}
      <main className="flex-grow pt-16 sm:pt-20">
        {renderView()}
      </main>

      {/* Primary Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
