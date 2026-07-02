/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Globe, Lightbulb, Leaf, Rocket, Eye, Target, CheckCircle, GraduationCap, Compass, Users, ArrowRight, Tent } from 'lucide-react';
import { motion } from 'motion/react';

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
      <section className="bg-gradient-to-br from-[#FFF7ED] via-[#FFEDD5] to-[#FED7AA] py-20 md:py-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#F37021_1px,transparent_1px)] [background-size:24px_24px] opacity-5"></div>
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-brand-orange font-semibold mb-4 tracking-wide uppercase text-sm"
          >
            Yayasan Pendidikan &amp; Pemberdayaan
          </motion.p>
          
          <motion.h1
            id="heroTitle"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-3xl sm:text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight tracking-tight"
          >
            Membangun generasi unggul melalui pendidikan berkualitas, pelatihan keterampilan, dan pemberdayaan komunitas untuk masa depan Indonesia yang lebih cerah
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-brand-green font-semibold text-lg mb-6"
          >
            Reach · Inspire · Sustain · Empower
          </motion.p>

          <motion.p
            id="heroSubtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-gray-600 text-base sm:text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            Membangun generasi unggul melalui pendidikan berkualitas, pelatihan keterampilan, dan pemberdayaan komunitas untuk masa depan Indonesia yang lebih cerah
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
              className="w-full sm:w-auto px-8 py-4 border-2 border-brand-orange text-brand-orange rounded-xl font-semibold text-lg hover:bg-brand-orange hover:text-white transition duration-200 cursor-pointer"
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
              className="bg-white border-2 border-[#ffedd5] rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-orange/5"
            >
              <div className="w-14 h-14 bg-brand-orange/10 rounded-xl flex items-center justify-center mx-auto mb-4 text-brand-orange">
                <Globe className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Reach</h3>
              <p className="text-gray-500 text-sm">Menjangkau seluruh lapisan masyarakat</p>
            </motion.div>

            {/* Card 2: Inspire */}
            <motion.div
              variants={itemVariants}
              className="bg-white border-2 border-[#ffedd5] rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-orange/5"
            >
              <div className="w-14 h-14 bg-brand-orange/10 rounded-xl flex items-center justify-center mx-auto mb-4 text-brand-orange">
                <Lightbulb className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Inspire</h3>
              <p className="text-gray-500 text-sm">Menginspirasi perubahan dan inovasi</p>
            </motion.div>

            {/* Card 3: Sustain */}
            <motion.div
              variants={itemVariants}
              className="bg-white border-2 border-[#ffedd5] rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-orange/5"
            >
              <div className="w-14 h-14 bg-brand-green/10 rounded-xl flex items-center justify-center mx-auto mb-4 text-brand-green">
                <Leaf className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Sustain</h3>
              <p className="text-gray-500 text-sm">Memelihara keberlanjutan program</p>
            </motion.div>

            {/* Card 4: Empower */}
            <motion.div
              variants={itemVariants}
              className="bg-white border-2 border-[#ffedd5] rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-orange/5"
            >
              <div className="w-14 h-14 bg-brand-green/10 rounded-xl flex items-center justify-center mx-auto mb-4 text-brand-green">
                <Rocket className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Empower</h3>
              <p className="text-gray-500 text-sm">Memberdayakan potensi setiap individu</p>
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
            className="bg-white rounded-2xl p-8 shadow-sm border border-gray-150"
          >
            <div className="w-12 h-12 bg-brand-orange rounded-xl flex items-center justify-center mb-4 text-white">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-bold mb-4 text-gray-900">Visi</h3>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
              Menjadi yayasan pendidikan dan pemberdayaan terdepan yang menghasilkan generasi berkarakter, berdaya saing global, dan berdampak positif bagi Indonesia.
            </p>
          </motion.div>

          {/* Misi Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl p-8 shadow-sm border border-gray-150"
          >
            <div className="w-12 h-12 bg-brand-green rounded-xl flex items-center justify-center mb-4 text-white">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-bold mb-4 text-gray-900">Misi</h3>
            <ul className="text-gray-600 space-y-3 text-sm sm:text-base">
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-5 h-5 text-brand-green mt-0.5 shrink-0" />
                <span>Menyediakan akses pendidikan berkualitas untuk semua</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-5 h-5 text-brand-green mt-0.5 shrink-0" />
                <span>Mengembangkan keterampilan melalui pelatihan terarah</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-5 h-5 text-brand-green mt-0.5 shrink-0" />
                <span>Memberdayakan komunitas untuk mandiri dan berdaya</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-5 h-5 text-brand-green mt-0.5 shrink-0" />
                <span>Membangun kolaborasi strategis dengan berbagai pihak</span>
              </li>
            </ul>
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
              className="bg-gradient-to-br from-[#FFF7ED] to-white border-2 border-[#ffedd5] rounded-2xl p-8 cursor-pointer flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-orange/5 group"
            >
              <div>
                <div className="w-16 h-16 bg-brand-orange rounded-2xl flex items-center justify-center mb-6 text-white shadow-md shadow-brand-orange/10">
                  <GraduationCap className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-xl mb-3 text-gray-900">RISE Academy</h3>
                <p className="text-gray-500 mb-4 text-sm leading-relaxed">
                  Pendidikan formal SD, SMP, SMA dengan kurikulum berkualitas dan program beasiswa.
                </p>
              </div>
              <span className="text-brand-orange font-semibold flex items-center gap-1 text-sm pt-2 group-hover:translate-x-1 transition-transform">
                Selengkapnya <ArrowRight className="w-4 h-4" />
              </span>
            </motion.div>

            {/* RISE Camp */}
            <motion.div
              variants={itemVariants}
              onClick={() => onNavigate('/program/camp')}
              className="bg-gradient-to-br from-[#f0fdf4] to-white border-2 border-emerald-100 rounded-2xl p-8 cursor-pointer relative flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-green/5 group"
            >
              <span className="absolute top-4 right-4 text-xs bg-brand-green text-white px-3 py-1 rounded-full font-semibold">
                ★ Unggulan
              </span>
              <div>
                <div className="w-16 h-16 bg-brand-green rounded-2xl flex items-center justify-center mb-6 text-white shadow-md shadow-brand-green/10">
                  <Tent className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-xl mb-3 text-gray-900">RISE Camp</h3>
                <p className="text-gray-500 mb-4 text-sm leading-relaxed">
                  Pelatihan keterampilan, career development, dan kolaborasi dengan industri.
                </p>
              </div>
              <span className="text-brand-green font-semibold flex items-center gap-1 text-sm pt-2 group-hover:translate-x-1 transition-transform">
                Selengkapnya <ArrowRight className="w-4 h-4" />
              </span>
            </motion.div>

            {/* RISE Community */}
            <motion.div
              variants={itemVariants}
              onClick={() => onNavigate('/program/community')}
              className="bg-gradient-to-br from-[#FFF7ED] to-white border-2 border-[#ffedd5] rounded-2xl p-8 cursor-pointer flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-orange/5 group"
            >
              <div>
                <div className="w-16 h-16 bg-brand-orange rounded-2xl flex items-center justify-center mb-6 text-white shadow-md shadow-brand-orange/10">
                  <Users className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-xl mb-3 text-gray-900">RISE Community</h3>
                <p className="text-gray-500 mb-4 text-sm leading-relaxed">
                  Program volunteer, Brand Ambassador, dan kegiatan sosial berdampak.
                </p>
              </div>
              <span className="text-brand-orange font-semibold flex items-center gap-1 text-sm pt-2 group-hover:translate-x-1 transition-transform">
                Selengkapnya <ArrowRight className="w-4 h-4" />
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
          
          <div className="flex flex-wrap justify-center gap-8 items-center opacity-70">
            <div className="w-32 h-16 bg-gray-100 rounded-lg flex items-center justify-center font-bold text-gray-400 text-sm">
              Partner 1
            </div>
            <div className="w-32 h-16 bg-gray-100 rounded-lg flex items-center justify-center font-bold text-gray-400 text-sm">
              Partner 2
            </div>
            <div className="w-32 h-16 bg-gray-100 rounded-lg flex items-center justify-center font-bold text-gray-400 text-sm">
              Partner 3
            </div>
            <div className="w-32 h-16 bg-gray-100 rounded-lg flex items-center justify-center font-bold text-gray-400 text-sm">
              Partner 4
            </div>
            <div className="w-32 h-16 bg-gray-100 rounded-lg flex items-center justify-center font-bold text-gray-400 text-sm">
              Partner 5
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
