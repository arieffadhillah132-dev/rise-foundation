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

function normalizeApiBase(url: string) {
  let normalized = url.trim().replace(/\/$/, '');
  if (normalized.endsWith('/api')) {
    normalized = normalized.replace(/\/api$/, '');
  }
  return normalized;
}

export default function App() {
  const API_BASE = normalizeApiBase(import.meta.env.VITE_API_URL ?? '');
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
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loans, setLoans] = useState<LoanRequest[]>([]);
  const [sponsorInquiries, setSponsorInquiries] = useState<SponsorInquiry[]>([]);

  // 3b. API UTILS & STARTUP SYNC
  const fetchDashboardData = async (token: string, userRole: string) => {
    try {
      const headers = { 'Authorization': `Bearer ${token}` };

      // Fetch registrations
      const regRes = await fetch(`${API_BASE || ''}/api/auth/registrations`, { headers });
      if (regRes.ok) {
        const regs = await regRes.json();
        setRegistrations(regs);
      }

      // Fetch loans
      const loanRes = await fetch(`${API_BASE || ''}/api/library/loans`, { headers });
      if (loanRes.ok) {
        const ln = await loanRes.json();
        setLoans(ln);
      }

      // Fetch membership status
      const memRes = await fetch(`${API_BASE || ''}/api/library/membership`, { headers });
      if (memRes.ok) {
        const data = await memRes.json();
        setIsLibraryMember(data.isMember);
      }

      // Fetch sponsor inquiries if admin
      if (userRole === 'admin') {
        const inqRes = await fetch(`${API_BASE || ''}/api/auth/inquiries`, { headers });
        if (inqRes.ok) {
          const inq = await inqRes.json();
          setSponsorInquiries(inq);
        }
      }
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    }
  };

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch(`${API_BASE || ''}/api/auth/me`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
        .then(res => {
          if (res.ok) return res.json();
          throw new Error('Invalid token');
        })
        .then(user => {
          setCurrentUser(user);
          fetchDashboardData(token, user.role);
        })
        .catch(err => {
          console.error(err);
          localStorage.removeItem('token');
          setCurrentUser(null);
        });
    }
  }, []);

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
  const handleLoginSuccess = (userObj: any, token?: string) => {
    if (token) {
      localStorage.setItem('token', token);
      fetchDashboardData(token, userObj.role);
    }
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
    localStorage.removeItem('token');
    setCurrentUser(null);
    setIsLibraryMember(false);
    setRegistrations([]);
    setLoans([]);
    setSponsorInquiries([]);
    showToast('Sesi Anda telah keluar secara aman.', 'info');
    handleNavigate('/');
  };

  const handleRoleSwitch = async (newRole: UserRole) => {
    setIsLibraryMember(false);
    const email = newRole === 'admin' ? 'admin@rise.org' : 'maharani@rise.org';
    const password = 'password123';
    
    try {
      const res = await fetch(`${API_BASE || ''}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (res.ok) {
        const data = await res.json();
        handleLoginSuccess(data.user, data.token);
      } else {
        showToast('Gagal beralih peran simulasi.', 'error');
      }
    } catch (err) {
      showToast('Koneksi internet bermasalah.', 'error');
    }
  };

  const handleAddRegistration = async (programType: ProgramType, programId: string, programName: string, details: any) => {
    const token = localStorage.getItem('token');
    if (!token) {
      showToast('Silakan masuk terlebih dahulu sebelum mendaftar program.', 'error');
      return false;
    }

    let url = '/api/academy/apply';
    let bodyData: any = { programId, programName, details };

    if (programType === 'scholarship') {
      url = '/api/scholarship/apply';
    } else if (programType === 'camp_training' || programType === 'volunteer' || programType === 'brand_ambassador') {
      url = '/api/camp/apply';
      bodyData = { programType, programId, programName, details };
    }

    try {
      const res = await fetch(`${API_BASE || ''}${url}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(bodyData)
      });

      if (res.ok) {
        const data = await res.json();
        setRegistrations(prev => [data.registration, ...prev]);
        showToast(`Registrasi Anda untuk "${programName}" berhasil dikirim! Tinjau statusnya di dashboard.`, 'success');
        return true;
      } else {
        const errData = await res.json();
        showToast(errData.message || 'Gagal mengirim pendaftaran.', 'error');
        return false;
      }
    } catch (err) {
      showToast('Koneksi internet bermasalah.', 'error');
      return false;
    }
  };

  const handleAddLoan = async (bookId: string, bookTitle: string) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const res = await fetch(`${API_BASE || ''}/api/library/loans`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ bookId, bookTitle })
      });

      if (res.ok) {
        const data = await res.json();
        setLoans(prev => [data.loan, ...prev]);
        showToast(`Permohonan pinjam buku "${bookTitle}" berhasil dikirim!`, 'success');
      } else {
        const errData = await res.json();
        showToast(errData.message || 'Gagal mengajukan pinjaman.', 'error');
      }
    } catch (err) {
      showToast('Koneksi internet bermasalah.', 'error');
    }
  };

  const handleJoinMember = async () => {
    const token = localStorage.getItem('token');
    if (!token || !currentUser) return;

    try {
      const res = await fetch(`${API_BASE || ''}/api/library/membership`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          memberName: currentUser.fullName,
          memberEmail: currentUser.email
        })
      });

      if (res.ok) {
        setIsLibraryMember(true);
        showToast('Keanggotaan perpustakaan digital Anda berhasil diaktifkan!', 'success');
      } else {
        showToast('Gagal mengaktifkan keanggotaan.', 'error');
      }
    } catch (err) {
      showToast('Koneksi internet bermasalah.', 'error');
    }
  };

  const handleAddInquiry = async (companyName: string, contactName: string, email: string, phone: string, notes: string) => {
    try {
      const res = await fetch(`${API_BASE || ''}/api/auth/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ companyName, contactName, email, phone, notes })
      });

      if (res.ok) {
        const data = await res.json();
        setSponsorInquiries(prev => [data.inquiry, ...prev]);
        showToast('Proposal kerja sama sponsorship Anda berhasil dikirim ke Komite RISE!', 'success');
      } else {
        showToast('Gagal mengirim proposal sponsorship.', 'error');
      }
    } catch (err) {
      showToast('Koneksi internet bermasalah.', 'error');
    }
  };

  const handleUpdateRegistrationStatus = async (regId: string, newStatus: 'submitted' | 'in_review' | 'accepted' | 'rejected') => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const res = await fetch(`${API_BASE || ''}/api/auth/registrations/${regId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (res.ok) {
        setRegistrations(prev => prev.map(reg => reg.id === regId ? { ...reg, status: newStatus } : reg));
        showToast(`Status berkas registrasi #${regId} berhasil diubah menjadi: ${newStatus.toUpperCase()}`, 'success');
      } else {
        // Some hosts may reject PATCH (405). Retry with POST to the same endpoint which the server mirrors.
        if (res.status === 405) {
          const retry = await fetch(`${API_BASE || ''}/api/auth/registrations/${regId}/status`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ status: newStatus })
          });
          if (retry.ok) {
            setRegistrations(prev => prev.map(reg => reg.id === regId ? { ...reg, status: newStatus } : reg));
            showToast(`Status berkas registrasi #${regId} berhasil diubah menjadi: ${newStatus.toUpperCase()}`, 'success');
            return;
          }
        }
        showToast('Gagal memperbarui status pendaftaran.', 'error');
      }
    } catch (err) {
      showToast('Koneksi internet bermasalah.', 'error');
    }
  };

  const handleUpdateLoanStatus = async (loanId: string, newStatus: 'pending' | 'borrowed' | 'returned' | 'overdue') => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const res = await fetch(`${API_BASE || ''}/api/library/loans/${loanId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (res.ok) {
        setLoans(prev => prev.map(loan => loan.id === loanId ? { ...loan, status: newStatus } : loan));
        showToast(`Status peminjaman buku #${loanId} diperbarui: ${newStatus.toUpperCase()}`, 'success');
      } else {
        // Retry with POST if server/host rejects PATCH
        if (res.status === 405) {
          const retry = await fetch(`${API_BASE || ''}/api/library/loans/${loanId}/status`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ status: newStatus })
          });
          if (retry.ok) {
            setLoans(prev => prev.map(loan => loan.id === loanId ? { ...loan, status: newStatus } : loan));
            showToast(`Status peminjaman buku #${loanId} diperbarui: ${newStatus.toUpperCase()}`, 'success');
            return;
          }
        }
        showToast('Gagal memperbarui status peminjaman.', 'error');
      }
    } catch (err) {
      showToast('Koneksi internet bermasalah.', 'error');
    }
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
          onAddRegistration={handleAddRegistration}
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
