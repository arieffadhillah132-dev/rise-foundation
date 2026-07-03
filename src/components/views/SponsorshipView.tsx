/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Megaphone, Heart, Users, Sparkles, Mail, Phone, ChevronDown } from 'lucide-react';
import sponsorshipHeroBg from '../../assets/images/sponsorship_hero_bg.jpg';

interface SponsorshipViewProps {
  onNavigate: (route: string) => void;
  onAddInquiry: (companyName: string, contactName: string, email: string, phone: string, notes: string) => void;
  currentUser?: any;
  onRequireLogin?: (route: string, params?: any) => void;
  initialShowForm?: boolean;
  onClearInitialShowForm?: () => void;
}

export function SponsorshipView({ 
  onNavigate, 
  onAddInquiry, 
  currentUser, 
  onRequireLogin, 
  initialShowForm, 
  onClearInitialShowForm 
}: SponsorshipViewProps) {
  const [showForm, setShowForm] = useState(initialShowForm || false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    if (initialShowForm) {
      setShowForm(true);
      if (onClearInitialShowForm) onClearInitialShowForm();
    }
  }, [initialShowForm, onClearInitialShowForm]);

  const handleDiskusiSponsorship = () => {
    if (!currentUser && onRequireLogin) {
      onRequireLogin('/sponsorship', { showForm: true });
    } else {
      setShowForm(true);
    }
  };

  // Automatically scroll to top of the page when switching between landing and form views
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [showForm]);

  // Form State
  const [contactName, setContactName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [sponsorshipType, setSponsorshipType] = useState('Sponsor Program');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedNotes = `[Jenis Sponsorship: ${sponsorshipType}] ${notes}`;
    onAddInquiry(companyName, contactName, email, phone, formattedNotes);

    setSuccessMsg('Terima kasih! Pesan diskusi sponsorship Anda berhasil terkirim. Tim partnership kami akan segera menghubungi Anda.');
    
    // Reset form
    setContactName('');
    setCompanyName('');
    setEmail('');
    setPhone('');
    setSponsorshipType('Sponsor Program');
    setNotes('');

    // Go back to landing page after brief delay
    setTimeout(() => {
      setSuccessMsg(null);
      setShowForm(false);
    }, 2000);
  };

  // 1. FORM VIEW (Screenshot 2)
  if (showForm) {
    return (
      <div className="bg-white min-h-screen py-12 font-sans">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          {/* Back Navigation */}
          <div>
            <button
              onClick={() => setShowForm(false)}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-brand-orange hover:text-brand-orange/80 transition-colors"
            >
              <span className="text-base">←</span> Kembali
            </button>
          </div>

          <div className="space-y-6">
            <h1 className="font-serif font-bold text-2xl sm:text-3xl text-brand-navy">
              Diskusi Sponsorship
            </h1>

            {successMsg && (
              <div className="p-4 bg-emerald-50 border border-brand-green/20 rounded-xl text-xs text-brand-green">
                {successMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#1E293B]">Nama PIC</label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full text-xs px-3.5 py-3 rounded-xl border border-gray-200 focus:border-brand-orange outline-none bg-white"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#1E293B]">Perusahaan/Organisasi</label>
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full text-xs px-3.5 py-3 rounded-xl border border-gray-200 focus:border-brand-orange outline-none bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#1E293B]">Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-xs px-3.5 py-3 rounded-xl border border-gray-200 focus:border-brand-orange outline-none bg-white"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#1E293B]">No. Telepon</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full text-xs px-3.5 py-3 rounded-xl border border-gray-200 focus:border-brand-orange outline-none bg-white"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#1E293B]">Jenis Sponsorship</label>
                <div className="relative">
                  <select
                    value={sponsorshipType}
                    onChange={(e) => setSponsorshipType(e.target.value)}
                    className="w-full text-xs px-3.5 py-3.5 rounded-xl border border-gray-200 focus:border-brand-orange bg-white outline-none appearance-none cursor-pointer font-medium text-[#1E293B]"
                  >
                    <option value="Sponsor Program">Sponsor Program</option>
                    <option value="Sponsor Beasiswa">Sponsor Beasiswa</option>
                    <option value="CSR Partnership">CSR Partnership</option>
                    <option value="Brand Partnership">Brand Partnership</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#1E293B] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#1E293B]">Pesan/Detail</label>
                <textarea
                  rows={6}
                  required
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Ceritakan tentang kebutuhan sponsorship Anda..."
                  className="w-full text-xs px-3.5 py-3.5 rounded-xl border border-gray-200 focus:border-brand-orange outline-none bg-white resize-none font-sans"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full text-center py-4 rounded-xl bg-brand-orange hover:bg-brand-orange/95 text-white font-bold text-xs sm:text-sm transition active:scale-95 shadow-md shadow-brand-orange/10"
                >
                  Kirim Pesan
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    );
  }

  // 2. LANDING MAIN VIEW (Screenshot 1)
  return (
    <div className="bg-white min-h-screen font-sans">
      
      {/* HEADER BANNER with Handshake Background Image */}
      <div className="relative py-24 px-4 overflow-hidden bg-slate-900 flex items-center min-h-[35vh]">
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={sponsorshipHeroBg} 
            alt="Partnership Handshake Background" 
            className="w-full h-full object-cover object-center opacity-60 filter brightness-100"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/30 to-slate-900/55"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 relative z-10 w-full text-white">
          <h1 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
            Sponsorship & Partnership
          </h1>
          <p className="text-xs sm:text-sm text-gray-300 max-w-xl mx-auto font-sans leading-relaxed">
            Bersama membangun masa depan pendidikan Indonesia melalui kolaborasi nyata, berdampak, dan berkelanjutan.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        
        {/* STATS ROW */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-[#FFF5EE] p-6 rounded-2xl text-center space-y-1">
            <p className="font-serif font-bold text-3xl text-brand-orange">50+</p>
            <p className="text-[11px] text-[#475569] font-medium font-sans">Total Partner</p>
          </div>

          <div className="bg-[#ECFDF5] p-6 rounded-2xl text-center space-y-1">
            <p className="font-serif font-bold text-3xl text-[#10B981]">12</p>
            <p className="text-[11px] text-[#475569] font-medium font-sans">Partner Aktif</p>
          </div>

          <div className="bg-[#FFFDF9] p-6 rounded-2xl text-center border border-amber-100/40 space-y-1">
            <p className="font-serif font-bold text-3xl text-[#B45309]">3 Tahun</p>
            <p className="text-[11px] text-[#475569] font-medium font-sans">Rata-rata Kerjasama</p>
          </div>
        </div>

        {/* BENEFIT SECTION */}
        <div className="space-y-8">
          <h2 className="font-serif font-bold text-2xl text-[#1E293B]">
            Benefit Menjadi Sponsor
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Benefit Card 1 */}
            <div className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100/80 space-y-2">
              <div className="flex items-center gap-2.5">
                <Megaphone className="w-4 h-4 text-brand-orange" />
                <h3 className="font-bold text-sm sm:text-base text-[#1E293B]">
                  Brand Exposure
                </h3>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed pl-6">
                Logo di semua materi, website, dan event RISE
              </p>
            </div>

            {/* Benefit Card 2 */}
            <div className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100/80 space-y-2">
              <div className="flex items-center gap-2.5">
                <Heart className="w-4 h-4 text-brand-orange" />
                <h3 className="font-bold text-sm sm:text-base text-[#1E293B]">
                  CSR Impact
                </h3>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed pl-6">
                Laporan dampak sosial untuk kebutuhan CSR perusahaan
              </p>
            </div>

            {/* Benefit Card 3 */}
            <div className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100/80 space-y-2">
              <div className="flex items-center gap-2.5">
                <Users className="w-4 h-4 text-brand-orange" />
                <h3 className="font-bold text-sm sm:text-base text-[#1E293B]">
                  Talent Pipeline
                </h3>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed pl-6">
                Akses ke talenta muda terlatih dari program RISE
              </p>
            </div>

            {/* Benefit Card 4 */}
            <div className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100/80 space-y-2">
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-brand-orange" />
                <h3 className="font-bold text-sm sm:text-base text-[#1E293B]">
                  Co-branding Event
                </h3>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed pl-6">
                Kolaborasi event bersama untuk engagement
              </p>
            </div>

          </div>
        </div>

        {/* TESTIMONI PARTNER */}
        <div className="space-y-8">
          <h2 className="font-serif font-bold text-2xl text-[#1E293B]">
            Testimoni Partner
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="bg-gray-50/50 p-7 rounded-2xl border border-gray-100/85 flex flex-col justify-between space-y-4">
              <p className="text-xs sm:text-sm text-gray-600 italic leading-relaxed font-sans">
                "Kolaborasi dengan RISE Foundation sangat berdampak. Program mereka terukur dan transparan."
              </p>
              <div className="text-xs">
                <p className="font-bold text-[#1E293B]">— PT Tech Indonesia</p>
                <p className="text-gray-400 font-sans text-[10px]">Partner sejak 2022</p>
              </div>
            </div>

            <div className="bg-gray-50/50 p-7 rounded-2xl border border-gray-100/85 flex flex-col justify-between space-y-4">
              <p className="text-xs sm:text-sm text-gray-600 italic leading-relaxed font-sans">
                "RISE membantu kami menyalurkan CSR dengan tepat sasaran. Reporting mereka sangat profesional."
              </p>
              <div className="text-xs">
                <p className="font-bold text-[#1E293B]">— Bank Nusantara</p>
                <p className="text-gray-400 font-sans text-[10px]">Partner sejak 2021</p>
              </div>
            </div>

          </div>
        </div>

        {/* CTA BANNER */}
        <div className="bg-[#F97316] rounded-3xl p-8 sm:p-10 text-white text-center space-y-6 shadow-lg shadow-orange-500/10">
          <div className="space-y-2">
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-white">
              Mari Berkolaborasi!
            </h2>
            <p className="text-xs sm:text-sm text-orange-50 max-w-xl mx-auto leading-relaxed">
              Hubungi tim partnership kami untuk diskusi lebih lanjut tentang peluang sponsorship
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs sm:text-sm font-medium">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-orange-100" />
              <span>partnership@risefoundation.id</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-orange-100" />
              <span>+62 812-3456-7890</span>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={handleDiskusiSponsorship}
              className="bg-white hover:bg-orange-50 text-[#F97316] transition-all font-bold rounded-xl px-8 py-3.5 text-xs tracking-wider uppercase shadow-md active:scale-95"
            >
              Diskusi Sponsorship
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
