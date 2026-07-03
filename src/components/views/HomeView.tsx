/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Globe, Lightbulb, Leaf, Rocket, Eye, Target, CheckCircle, GraduationCap, Compass, Users, ArrowRight, Tent, Laptop, Coins, Heart } from 'lucide-react';
import { motion } from 'motion/react';
import heroBg from '../../assets/images/educational_foundation_building_1783051516953.jpg';
import cardReach from '../../assets/images/card_reach_1783069132948.jpg';
import cardInspire from '../../assets/images/card_inspire_1783069155852.jpg';
import cardSustain from '../../assets/images/card_sustain_1783069169650.jpg';
import cardEmpower from '../../assets/images/card_empower_1783069183348.jpg';
import bgVisi from '../../assets/images/bg_visi_vision_1783069996792.jpg';
import bgMisi from '../../assets/images/bg_misi_mission_1783070009741.jpg';
import academyHeroBg from '../../assets/images/academy_modern_hero_1783076485969.jpg';
import campHeroBg from '../../assets/images/rise_camp_hero_bg_1783073952203.jpg';
import communityHeroBg from '../../assets/images/community_hero_bg_1783074438056.jpg';

interface HomeViewProps {
  onNavigate: (route: string) => void;
  currentUser: any;
}

export function HomeView({ onNavigate, currentUser }: HomeViewProps) {
  // Container animation variants for staggered entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }
    }
  } as const;

  return (
    <div className="font-sans">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden py-24 md:py-36 px-4 bg-slate-950 text-white flex items-center justify-center min-h-[80vh] md:min-h-[85vh]">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroBg} 
            alt="RISE Foundation Building Background" 
            className="w-full h-full object-cover object-center opacity-65 filter brightness-95 saturate-[0.9]" 
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/80"></div>
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-slate-200 font-semibold mb-4 tracking-[0.4em] uppercase text-sm"
          >
            Yayasan Pendidikan &amp; Pemberdayaan
          </motion.p>

          <motion.h1
            id="heroTitle"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight tracking-tight max-w-5xl mx-auto"
          >
            RISE Foundation
          </motion.h1>

          <motion.p
            id="heroSubtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-slate-300 text-base sm:text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed font-normal"
          >
            Kami berkomitmen untuk mendampingi talenta muda Indonesia agar tumbuh mandiri, adaptif, dan berdaya saing tinggi demi masa depan bangsa yang lebih cerah.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button
              onClick={() => onNavigate('/program/academy')}
              className="w-full sm:w-auto px-8 py-4 bg-brand-orange text-white rounded-xl font-semibold text-lg hover:bg-brand-orange/95 transition duration-200 shadow-lg shadow-brand-orange/20 cursor-pointer"
            >
              Bergabunglah Sekarang
            </button>
            <button
              onClick={() => {
                document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-8 py-4 border-2 border-white/80 text-white rounded-xl font-semibold text-lg hover:bg-white hover:text-slate-950 transition duration-200 cursor-pointer"
            >
              Pelajari Lebih Lanjut
            </button>
          </motion.div>
        </div>
      </section>

      {/* 2. TENTANG KAMI */}
      <section id="about-section" className="py-20 px-4 bg-white scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">Tentang Kami</h2>
            <p className="text-gray-600 text-lg font-medium">Menjangkau, Menginspirasi, Memelihara, Memberdayakan</p>
          </div>
          
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12 text-base sm:text-lg leading-relaxed">
            RISE Foundation adalah yayasan yang berdedikasi untuk menciptakan dampak positif melalui pendidikan, pemberdayaan komunitas, dan pengembangan keterampilan. Kami percaya bahwa setiap individu berhak mendapatkan kesempatan untuk berkembang.
          </p>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
          >
            {/* Card 1: Reach */}
            <motion.div
              variants={itemVariants}
              className="relative overflow-hidden group min-h-[250px] flex flex-col justify-end p-6 rounded-2xl border border-slate-800 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-orange-500/10"
            >
              <div className="absolute inset-0 z-0">
                <img 
                  src={cardReach} 
                  alt="Reach Background" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-transparent"></div>
              </div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-orange-500/20 backdrop-blur-xs border border-orange-500/35 rounded-xl flex items-center justify-center mb-4 text-orange-400 shadow-inner">
                  <Globe className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-xl text-white mb-2">Reach</h3>
                <p className="text-gray-300 text-sm leading-relaxed">Menjangkau seluruh lapisan masyarakat</p>
              </div>
            </motion.div>

            {/* Card 2: Inspire */}
            <motion.div
              variants={itemVariants}
              className="relative overflow-hidden group min-h-[250px] flex flex-col justify-end p-6 rounded-2xl border border-slate-800 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-orange-500/10"
            >
              <div className="absolute inset-0 z-0">
                <img 
                  src={cardInspire} 
                  alt="Inspire Background" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-transparent"></div>
              </div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-orange-500/20 backdrop-blur-xs border border-orange-500/35 rounded-xl flex items-center justify-center mb-4 text-orange-400 shadow-inner">
                  <Lightbulb className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-xl text-white mb-2">Inspire</h3>
                <p className="text-gray-300 text-sm leading-relaxed">Menginspirasi perubahan dan inovasi</p>
              </div>
            </motion.div>

            {/* Card 3: Sustain */}
            <motion.div
              variants={itemVariants}
              className="relative overflow-hidden group min-h-[250px] flex flex-col justify-end p-6 rounded-2xl border border-slate-800 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-500/10"
            >
              <div className="absolute inset-0 z-0">
                <img 
                  src={cardSustain} 
                  alt="Sustain Background" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-transparent"></div>
              </div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-emerald-500/20 backdrop-blur-xs border border-emerald-500/35 rounded-xl flex items-center justify-center mb-4 text-emerald-400 shadow-inner">
                  <Leaf className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-xl text-white mb-2">Sustain</h3>
                <p className="text-gray-300 text-sm leading-relaxed">Memelihara keberlanjutan program</p>
              </div>
            </motion.div>

            {/* Card 4: Empower */}
            <motion.div
              variants={itemVariants}
              className="relative overflow-hidden group min-h-[250px] flex flex-col justify-end p-6 rounded-2xl border border-slate-800 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-500/10"
            >
              <div className="absolute inset-0 z-0">
                <img 
                  src={cardEmpower} 
                  alt="Empower Background" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-transparent"></div>
              </div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-emerald-500/20 backdrop-blur-xs border border-emerald-500/35 rounded-xl flex items-center justify-center mb-4 text-emerald-400 shadow-inner">
                  <Rocket className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-xl text-white mb-2">Empower</h3>
                <p className="text-gray-300 text-sm leading-relaxed">Memberdayakan potensi setiap individu</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 3. VISI & MISI */}
            <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          
          {/* Visi Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden group rounded-2xl p-8 md:p-10 shadow-xl border border-slate-800/20 bg-slate-950 text-white min-h-[350px] flex flex-col justify-between"
          >
            <div className="absolute inset-0 z-0">
              <img 
                src={bgVisi} 
                alt="Visi Background" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-55"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-slate-950/90 via-slate-950/75 to-slate-900/80"></div>
            </div>
            
            <div className="relative z-10 space-y-4">
              <div className="w-14 h-14 bg-brand-orange/20 border border-brand-orange/35 rounded-xl flex items-center justify-center mb-6 text-brand-orange shadow-inner">
                <Eye className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-3xl font-extrabold tracking-tight mb-2 text-white">Visi</h3>
              <p className="text-gray-200 leading-relaxed text-base sm:text-lg">
                Menjadi yayasan pendidikan dan pemberdayaan terdepan yang menghasilkan generasi berkarakter, berdaya saing global, dan berdampak positif bagi Indonesia.
              </p>
            </div>
          </motion.div>

          {/* Misi Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden group rounded-2xl p-8 md:p-10 shadow-xl border border-slate-800/20 bg-slate-950 text-white min-h-[350px] flex flex-col justify-between"
          >
            <div className="absolute inset-0 z-0">
              <img 
                src={bgMisi} 
                alt="Misi Background" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-55"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-slate-950/90 via-slate-950/75 to-slate-900/80"></div>
            </div>

            <div className="relative z-10 space-y-4">
              <div className="w-14 h-14 bg-emerald-500/20 border border-emerald-500/35 rounded-xl flex items-center justify-center mb-6 text-emerald-400 shadow-inner">
                <Target className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-3xl font-extrabold tracking-tight mb-2 text-white">Misi</h3>
              <ul className="text-gray-200 space-y-3.5 text-sm sm:text-base">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400 mt-1 shrink-0" />
                  <span>Menyediakan akses pendidikan berkualitas untuk semua</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400 mt-1 shrink-0" />
                  <span>Mengembangkan keterampilan melalui pelatihan terarah</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400 mt-1 shrink-0" />
                  <span>Memberdayakan komunitas untuk mandiri dan berdaya</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400 mt-1 shrink-0" />
                  <span>Membangun kolaborasi strategis dengan berbagai pihak</span>
                </li>
              </ul>
            </div>
          </motion.div>

        </div>
      </section>

 {/* 4. PROGRAMS OVERVIEW */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">Program Kami</h2>
            <p className="text-gray-600 text-lg font-medium">Tiga pilar utama untuk pembangunan generasi unggul</p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {/* RISE Academy */}
            <motion.div
              variants={itemVariants}
              onClick={() => onNavigate('/program/academy')}
              className="relative overflow-hidden bg-slate-950 rounded-2xl p-8 cursor-pointer flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-orange/10 group min-h-[320px]"
            >
              {/* Background Image with Gradient Overlay */}
              <div className="absolute inset-0 z-0">
                <img 
                  src={academyHeroBg} 
                  alt="RISE Academy Background" 
                  className="w-full h-full object-cover opacity-55 transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/35"></div>
              </div>

              <div className="relative z-10">
                <div className="w-14 h-14 bg-brand-orange rounded-2xl flex items-center justify-center mb-6 text-white shadow-md shadow-brand-orange/20">
                  <GraduationCap className="w-7 h-7" />
                </div>
                <h3 className="font-serif font-bold text-2xl mb-3 text-white">RISE Academy</h3>
                <p className="text-gray-200 mb-4 text-xs sm:text-sm leading-relaxed">
                  Pendidikan formal SD, SMP, SMA dengan kurikulum berkualitas dan program beasiswa.
                </p>
              </div>
              <span className="relative z-10 text-orange-400 font-semibold flex items-center gap-1 text-sm pt-2 group-hover:text-orange-300">
                Selengkapnya <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.div>

            {/* RISE Camp */}
            <motion.div
              variants={itemVariants}
              onClick={() => onNavigate('/program/camp')}
              className="relative overflow-hidden bg-slate-950 rounded-2xl p-8 cursor-pointer flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-green/10 group min-h-[320px]"
            >
              <span className="absolute top-4 right-4 text-xs bg-brand-green text-white px-3 py-1 rounded-full font-semibold z-20 shadow-sm">
                ★ Unggulan
              </span>
              {/* Background Image with Gradient Overlay */}
              <div className="absolute inset-0 z-0">
                <img 
                  src={campHeroBg} 
                  alt="RISE Camp Background" 
                  className="w-full h-full object-cover opacity-55 transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/35"></div>
              </div>

              <div className="relative z-10">
                <div className="w-14 h-14 bg-brand-green rounded-2xl flex items-center justify-center mb-6 text-white shadow-md shadow-brand-green/20">
                  <Tent className="w-7 h-7" />
                </div>
                <h3 className="font-serif font-bold text-2xl mb-3 text-white">RISE Camp</h3>
                <p className="text-gray-200 mb-4 text-xs sm:text-sm leading-relaxed">
                  Pelatihan keterampilan, career development, dan kolaborasi dengan industri.
                </p>
              </div>
              <span className="relative z-10 text-emerald-400 font-semibold flex items-center gap-1 text-sm pt-2 group-hover:text-emerald-300">
                Selengkapnya <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.div>

            {/* RISE Community */}
            <motion.div
              variants={itemVariants}
              onClick={() => onNavigate('/program/community')}
              className="relative overflow-hidden bg-slate-950 rounded-2xl p-8 cursor-pointer flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-orange/10 group min-h-[320px]"
            >
              {/* Background Image with Gradient Overlay */}
              <div className="absolute inset-0 z-0">
                <img 
                  src={communityHeroBg} 
                  alt="RISE Community Background" 
                  className="w-full h-full object-cover opacity-55 transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/35"></div>
              </div>

              <div className="relative z-10">
                <div className="w-14 h-14 bg-brand-orange rounded-2xl flex items-center justify-center mb-6 text-white shadow-md shadow-brand-orange/20">
                  <Users className="w-7 h-7" />
                </div>
                <h3 className="font-serif font-bold text-2xl mb-3 text-white">RISE Community</h3>
                <p className="text-gray-200 mb-4 text-xs sm:text-sm leading-relaxed">
                  Program volunteer, Brand Ambassador, dan kegiatan sosial berdampak.
                </p>
              </div>
              <span className="relative z-10 text-orange-400 font-semibold flex items-center gap-1 text-sm pt-2 group-hover:text-orange-300">
                Selengkapnya <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 5. DAMPAK KAMI */}
      <section className="py-20 px-4 bg-brand-orange text-white">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-3xl font-bold mb-12"
          >
            Dampak Kami
          </motion.h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <p className="text-4xl font-bold">5,000+</p>
              <p className="text-orange-100 mt-2 text-sm uppercase tracking-wide">Siswa Terdampak</p>
            </div>
            <div>
              <p className="text-4xl font-bold">150+</p>
              <p className="text-orange-100 mt-2 text-sm uppercase tracking-wide">Program Selesai</p>
            </div>
            <div>
              <p className="text-4xl font-bold">50+</p>
              <p className="text-orange-100 mt-2 text-sm uppercase tracking-wide">Mitra &amp; Sponsor</p>
            </div>
            <div>
              <p className="text-4xl font-bold">30+</p>
              <p className="text-orange-100 mt-2 text-sm uppercase tracking-wide">Kota Terjangkau</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. MITRA KAMI */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="font-serif text-3xl font-bold text-gray-900 mb-4">Mitra Kami</h2>
          <p className="text-gray-600 mb-12">Bekerja sama dengan berbagai organisasi untuk dampak yang lebih besar</p>
          
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8 items-center">
            <div className="flex items-center gap-4 px-6 py-4 bg-amber-50/60 rounded-2xl border border-amber-100 shadow-xs hover:shadow-md hover:bg-amber-50/90 transition duration-300 w-56 text-left">
              <div className="p-3 bg-amber-500 rounded-xl text-white shadow-sm">
                <GraduationCap className="h-6 w-6" />
              </div>
              <div>
                <p className="text-base font-extrabold text-slate-800">EduTech Hub</p>
              </div>
            </div>

            <div className="flex items-center gap-4 px-6 py-4 bg-blue-50/60 rounded-2xl border border-blue-100 shadow-xs hover:shadow-md hover:bg-blue-50/90 transition duration-300 w-56 text-left">
              <div className="p-3 bg-blue-500 rounded-xl text-white shadow-sm">
                <Laptop className="h-6 w-6" />
              </div>
              <div>
                <p className="text-base font-extrabold text-slate-800">InnoTech Lab</p>
              </div>
            </div>

            <div className="flex items-center gap-4 px-6 py-4 bg-emerald-50/60 rounded-2xl border border-emerald-100 shadow-xs hover:shadow-md hover:bg-emerald-50/90 transition duration-300 w-56 text-left">
              <div className="p-3 bg-emerald-500 rounded-xl text-white shadow-sm">
                <Coins className="h-6 w-6" />
              </div>
              <div>
                <p className="text-base font-extrabold text-slate-800">FinCorp Group</p>
              </div>
            </div>

            <div className="flex items-center gap-4 px-6 py-4 bg-rose-50/60 rounded-2xl border border-rose-100 shadow-xs hover:shadow-md hover:bg-rose-50/90 transition duration-300 w-56 text-left">
              <div className="p-3 bg-rose-500 rounded-xl text-white shadow-sm">
                <Heart className="h-6 w-6" />
              </div>
              <div>
                <p className="text-base font-extrabold text-slate-800">Care Initiative</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CTA SECTION */}
      <section className="py-20 px-4 bg-gradient-to-r from-brand-green to-emerald-700 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-5"></div>
        <div className="max-w-4xl mx-auto relative z-10 space-y-6">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Siap Memulai Perjalananmu?</h2>
          <p className="text-green-100 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-8">
            Bergabunglah bersama ribuan individu yang telah merasakan dampak positif dari RISE Foundation
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => onNavigate('/program/academy')}
              className="w-full sm:w-auto px-8 py-4 bg-white text-emerald-800 rounded-xl font-semibold text-lg hover:bg-gray-100 transition duration-200 cursor-pointer"
            >
              Daftar Sekarang
            </button>
            <button
              onClick={() => onNavigate('/sponsorship')}
              className="w-full sm:w-auto px-8 py-4 border-2 border-white text-white rounded-xl font-semibold text-lg hover:bg-white/10 transition duration-200 cursor-pointer"
            >
              Jadi Sponsor
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
