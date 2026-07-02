/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type UserRole = 'visitor' | 'admin';

export interface User {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  role: UserRole;
  createdAt: string;
}

export interface Profile {
  id: string;
  userId: string;
  persona: 'siswa_sma' | 'mahasiswa' | 'fresh_graduate' | 'karyawan' | 'mitra';
  interests: string[];
  resumeUrl?: string;
}

export type ProgramType = 'academy' | 'scholarship' | 'camp_training' | 'career' | 'volunteer' | 'brand_ambassador';

export type RegistrationStatus = 'submitted' | 'in_review' | 'accepted' | 'rejected';

export interface Registration {
  id: string;
  userId: string;
  programType: ProgramType;
  programId: string;
  programName: string; // denormalized for easy listing
  status: RegistrationStatus;
  submittedAt: string;
  details: Record<string, any>; // holds fields collected during application
}

export interface AcademyProgram {
  id: string;
  level: 'sd' | 'smp' | 'sma';
  name: string;
  description: string;
  curriculum: string[];
  tuitionFee: number;
}

export interface Scholarship {
  id: string;
  name: string;
  requirements: string[];
  deadline: string;
  quota: number;
  benefit: string;
}

export interface CampTraining {
  id: string;
  name: string;
  classification: 'soft_skill' | 'hard_skill' | 'language';
  mentorName: string;
  schedule: string;
  syllabus: string[];
  rating: number;
  duration: string;
}

export interface Career {
  id: string;
  companyName: string;
  position: string;
  type: 'internship' | 'full_time' | 'part_time';
  description: string;
  location: string;
}

export interface LibraryBook {
  id: string;
  title: string;
  author: string;
  category: string;
  format: 'physical' | 'digital';
  pdfUrl?: string;
  coverUrl: string;
}

export interface LoanRequest {
  id: string;
  userId: string;
  bookId: string;
  bookTitle: string;
  status: 'pending' | 'borrowed' | 'returned' | 'overdue';
  loanDate: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
}

export interface SponsorInquiry {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  notes: string;
  submittedAt: string;
}

export interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: ProgramType | 'blog';
  targetPath: string;
}
