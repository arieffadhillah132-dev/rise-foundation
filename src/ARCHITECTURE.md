# RISE Foundation — Modular Frontend Architecture Specification
## Integrated Education Digital Ecosystem (Laravel-Ready)

This document serves as the absolute blueprint and single source of truth (SSoT) for the **RISE Foundation** frontend application, meticulously designed for modularity, scalability, and seamless future integration with a **Laravel** backend API.

---

## 1. Product Hierarchy

The RISE Foundation digital ecosystem adheres to a strict hierarchical structure, bridging user goals down to database entities.

```
BUSINESS (RISE Foundation: Reach, Inspire, Sustain, Empower)
   ↓
MODULES (e.g., Academy, Camp, Community, Scholarship, Library, Career, Sponsorship, Blog)
   ↓
FEATURES (e.g., Single Account System, Smart Search, Recommendation Engine, Forum, Library Loan)
   ↓
PAGES (e.g., /program/academy, /program/camp, /dashboard, /library)
   ↓
COMPONENTS (Reusable atomic UI elements & module-specific blocks)
   ↓
API (Restful JSON Endpoints using Bearer JWT authentication)
   ↓
DATABASE (Relational Postgres/MySQL entities mapped via migrations)
```

---

## 2. Complete Sitemap

The digital ecosystem is structured into distinct public, authenticated, and administrative routing zones:

```
├── Public Portal (Unauthenticated & General)
│   ├── Home (Landing Page)
│   ├── Blog (Articles & News)
│   │   └── Blog Detail (/blog/:slug)
│   ├── Sponsorship & Partnership (/sponsorship)
│   └── Search Portal (/search)
│
├── Authentication Module
│   ├── Login (/auth/login)
│   ├── Register (/auth/register)
│   └── Password Reset (/auth/reset-password)
│
├── RISE Academy (Formal Education Segment)
│   ├── Academy Index (/program/academy)
│   ├── Education Details (/program/academy/:level) -> [sd, smp, sma]
│   ├── Scholarship Portal (/program/academy/scholarships)
│   └── Digital Library (/program/academy/library)
│
├── RISE Camp (Skills & Career Segment)
│   ├── Camp Index (/program/camp)
│   └── Career & Internships Hub (/program/camp/careers)
│
├── RISE Community (Social Impact Segment)
│   ├── Community Index (/program/community)
│   ├── Volunteer Portal (/program/community/volunteers)
│   └── Community Forum (/program/community/forum)
│
├── Student & Member Dashboard (Authenticated Area)
│   └── Dashboard Index (/dashboard)
│       ├── My Registrations (/dashboard/registrations)
│       ├── Library Borrowing History (/dashboard/library)
│       └── Personalized Recommendations (/dashboard/recommendations)
│
└── Unified dynamic Application Form Flow
    └── Program Registration (/form/:programType/:programId)
```

---

## 3. Module Breakdown

The application is decomposed into eight distinct business modules:

| Module ID | Module Name | Business Purpose | Target Audience | Primary Metric (Success) |
| :--- | :--- | :--- | :--- | :--- |
| **MOD-01** | **RISE Academy** | Comprehensive formal education services (SD, SMP, SMA) and supporting systems. | Students, Parents | Formal registration conversions |
| **MOD-02** | **RISE Camp** | Hard skills, soft skills, language courses, and career development preparation. | University Students, Fresh Grads, Employees | Active training enrollment rate |
| **MOD-03** | **RISE Community** | Social activities, voluntarism (RISE Peduli), and Brand Ambassador coordination. | Young Activists, Students | Active volunteer count & social engagement |
| **MOD-04** | **Scholarship** | Access to financial aids, academic scholarships, and selection flows. | Academic Aspirants, Sponsors | Successful application counts |
| **MOD-05** | **Library** | Unified online physical book ordering and digital e-book reader resources. | Platform Members | Digital readership duration & borrowing rate |
| **MOD-06** | **Career Hub** | Dynamic listings for job opportunities, internships, and career coaching resources. | Fresh Graduates, Corporate Partners | Active internship placements |
| **MOD-07** | **Sponsorship** | Professional channels for partners to collaborate, secure benefits, and track sponsor impacts. | Sponsors, Partners, Corporates | Live partnerships secured |
| **MOD-08** | **Blog / Media** | Official articles, updates, news, and inspirational reports. | Public, Stakeholders | Weekly unique visitors |

---

## 4. Page Breakdown

Every route corresponds to a meticulously designed view optimized for friendly UX and professional style:

### A. Public Pages

#### 1. Home (`/`)
*   **Purpose:** Introduce RISE Foundation values (Reach, Inspire, Sustain, Empower), display aggregate stats, feature core modules, showcase trusted partners, and route users.
*   **Target Users:** General public, prospective students, potential sponsors.
*   **Primary CTA:** "Mulai Perjalanan Anda" (Primary Orange Button routing to Register/Search).
*   **Data Required:** Aggregated metrics (students count, camps, partners, regions).
*   **Expected API Usage:** `GET /api/v1/sponsorship/info` (to fetch sponsor highlights).
*   **Reusable Components:** `Navbar`, `Footer`, `Hero`, `ImpactMetrics`, `PartnerLogoBelt`.

#### 2. Blog Index (`/blog`)
*   **Purpose:** Display news, feature articles, and institutional updates.
*   **Target Users:** Platform users, general public.
*   **Primary CTA:** Click on featured article card.
*   **Data Required:** Paginated array of blog posts with categories, thumbnails, titles, and dates.
*   **Expected API Usage:** `GET /api/v1/blog/posts?page=1`
*   **Reusable Components:** `BlogCard`, `SearchBar`, `Pagination`, `CategoryPills`.

#### 3. Blog Detail (`/blog/:slug`)
*   **Purpose:** Render structured markdown text for a specific published article.
*   **Target Users:** Readers, educators, partners.
*   **Primary CTA:** "Kembali ke Artikel" or "Bagikan Artikel".
*   **Data Required:** Single detailed blog post payload.
*   **Expected API Usage:** `GET /api/v1/blog/posts/{slug}`
*   **Reusable Components:** `MarkdownRenderer`, `ShareButtons`, `RelatedArticlesSidebar`.

#### 4. Sponsorship & Partnership (`/sponsorship`)
*   **Purpose:** Attract corporate and individual sponsors by detailing benefits, showcasing partner testimonials, and presenting a consultation form.
*   **Target Users:** Institutional donors, Corporate Social Responsibility (CSR) directors.
*   **Primary CTA:** "Hubungi Kemitraan" (Open inquiry modal).
*   **Data Required:** Partner stats, testimonials list, benefit cards details.
*   **Expected API Usage:** `POST /api/v1/sponsorship/requests` (Submit inquiry)
*   **Reusable Components:** `TestimonialSection`, `InquiryFormModal`, `BenefitGrid`.

---

### B. Academy Module Pages

#### 5. Academy Landing (`/program/academy`)
*   **Purpose:** Present SD RISE, SMP RISE, and SMA RISE paths, along with scholarship and library quick routes.
*   **Target Users:** Prospective junior/senior school students, parents.
*   **Primary CTA:** "Lihat Program Detail" or "Ajukan Beasiswa".
*   **Data Required:** Quick descriptions, accreditation indices, educational focus details.
*   **Expected API Usage:** `GET /api/v1/academy/programs`
*   **Reusable Components:** `ProgramCard`, `BannerHighlight`, `AdmissionStatusBadge`.

#### 6. Level Detail (`/program/academy/:level`)
*   **Purpose:** Provide deep-dive details on Curriculum, tuition costs, milestones, and enrollment cycles for SD, SMP, or SMA.
*   **Target Users:** Parent decision-makers, students.
*   **Primary CTA:** "Daftar Sekarang" (routes to `/form/academy/{program_id}`).
*   **Data Required:** Detailed schedules, course modules, fee structures, program details.
*   **Expected API Usage:** `GET /api/v1/academy/programs` (filtered by slug or level).
*   **Reusable Components:** `TimelineStepper`, `FeeTable`, `FeatureAccordion`.

#### 7. Scholarship Portal (`/program/academy/scholarships`)
*   **Purpose:** Outline available fully-funded/partial-funded beasiswa options, eligibility rules, and selection phases.
*   **Target Users:** Disadvantaged students, high-achieving scholars.
*   **Primary CTA:** "Daftar Beasiswa" (routes to `/form/scholarship/{scholarship_id}`).
*   **Data Required:** Active scholarship records, timeline, prerequisite checklists.
*   **Expected API Usage:** `GET /api/v1/academy/scholarships`
*   **Reusable Components:** `PrerequisiteChecklist`, `TimelineStepper`, `StatusBadge`.

#### 8. Digital Library (`/program/academy/library`)
*   **Purpose:** Display physical catalog and e-book materials. Enable unified book loan requests.
*   **Target Users:** Verified members.
*   **Primary CTA:** "Pinjam Buku" or "Daftar Member Perpustakaan".
*   **Data Required:** Paginated library assets, categories, formats (PDF vs physical).
*   **Expected API Usage:** 
    *   `GET /api/v1/library/books`
    *   `POST /api/v1/library/loan-requests`
    *   `POST /api/v1/library/members`
*   **Reusable Components:** `BookGridCard`, `DoubleFormPanel` (Loan + Membership registration side-by-side).

---

### C. Camp & Career Pages

#### 9. RISE Camp Landing (`/program/camp`)
*   **Purpose:** Catalog professional certification courses, intensive workshops, and live coaching cohorts.
*   **Target Users:** Fresh graduates, employees seeking upskilling.
*   **Primary CTA:** "Ambil Kelas" (routes to `/form/camp_training/{training_id}`).
*   **Data Required:** Active training arrays classified into Hard Skill, Soft Skill, and Languages.
*   **Expected API Usage:** `GET /api/v1/camp/trainings`
*   **Reusable Components:** `TrainingCard`, `CategoryPills`, `ProgressStepper`.

#### 10. Careers & Internships Hub (`/program/camp/careers`)
*   **Purpose:** List available entry-level roles, administrative internships, and corporate placements with application forms.
*   **Target Users:** Fresh graduates, job-hunting students.
*   **Primary CTA:** "Kirim Lamaran" (routes to `/form/career/{career_id}`).
*   **Data Required:** Directory of job positions, hiring partners, salary range, constraints.
*   **Expected API Usage:**
    *   `GET /api/v1/camp/careers`
    *   `POST /api/v1/camp/careers/{id}/apply`
*   **Reusable Components:** `JobListingCard`, `FilterSidebar`, `FileUploadZone`.

---

### D. Community Pages

#### 11. Community Index (`/program/community`)
*   **Purpose:** Highlight social initiatives, brand ambassador programs, volunteer recruitments, and achievements.
*   **Target Users:** Active youth, change-makers, volunteers.
*   **Primary CTA:** "Bergabung Sebagai Relawan" (routes to `/form/volunteer/{id}`).
*   **Data Required:** Active social projects, historical volunteer reviews, timeline of campaigns.
*   **Expected API Usage:** `GET /api/v1/community/volunteer-batches`
*   **Reusable Components:** `VolunteerCard`, `BrandAmbassadorHighlights`, `ImpactCard`.

#### 12. Forum Diskusi (`/program/community/forum`)
*   **Purpose:** Collaborative forum for students and partners to discuss academic topics, career development, and program guidelines.
*   **Target Users:** Active members.
*   **Primary CTA:** "Buat Thread Baru".
*   **Data Required:** Message boards, categories, user-profiles metadata.
*   **Expected API Usage:**
    *   `GET /api/v1/community/forum/threads`
    *   `POST /api/v1/community/forum/threads/{id}/posts`
*   **Reusable Components:** `ThreadCard`, `ReplyEditor`, `ForumModerationBanner`.

---

### E. Authenticated Dashboard

#### 13. Student Dashboard (`/dashboard`)
*   **Purpose:** Provide unified member status overview: submitted program registration tracking, library loan requests overview, active training progress, earned digital certificates, and system recommendations.
*   **Target Users:** Registered Members.
*   **Primary CTA:** "Lanjutkan Pelatihan" or "Cek Status Berkas".
*   **Data Required:** Logged-in profile fields, personal application history array, borrowing approvals, personalization logs.
*   **Expected API Usage:**
    *   `GET /api/v1/auth/me`
    *   `GET /api/v1/recommendations`
*   **Reusable Components:** `DashboardSidebar`, `DynamicRegistrationTrackerTable`, `RecommendationSection`, `CertificateCard`.

---

## 5. Component Library

To prevent design regression, the frontend UI relies exclusively on a highly standardized component library built with Tailwind CSS and `motion`:

```
├── Base UI Elements
│   ├── Button (Primary Orange #F37021, Secondary Green #16A34A, Outline/Ghost)
│   ├── FormInput (Floated labels, Grey border, dynamic inline red validation errors)
│   ├── FormBuilder (Generic automated form generator utilizing strict rule-based fields)
│   ├── StatusBadge (Success/Accepted green pill, Warning/In-Review yellow, Danger/Rejected red)
│   └── Breadcrumbs (Standard navigation paths for clean backwards flow)
│
├── Navigation & Layouts
│   ├── Navbar (Institutional branding, middle dropdowns, SearchIcon, Right Side Auth button)
│   ├── Footer (Dark Navy #0F172A background, 4 semantic info columns)
│   ├── DashboardSidebar (Collapsible menu for member pages)
│   └── ContentLayout (Symmetric, desk-optimized layouts with auto-margins)
│
├── Specialized Cards
│   ├── ProgramCard (Round pastel illustration overlay, title, brief specs, arrow link)
│   ├── TrainingCard (Upskilling course information with badge classification)
│   ├── JobListingCard (Hiring partner thumbnail, tags, job specifications)
│   ├── VolunteerCard (Impact program specifications, slots remaining progress indicators)
│   ├── BookGridCard (Aesthetic covers, categories, loan indicators)
│   └── ThreadCard (Forum thread title, user profile thumbnail, activity metadata)
│
└── System & State Management UI
    ├── Toast (Animated slide-in notifications for validation / API results)
    ├── SearchBar (Auto-complete integrated search box with dropdown filter categories)
    ├── EmptyState (Subtle modern graphics displaying lack of files / submissions)
    ├── LoadingState (Pristine theme skeleton blocks replacing content during API requests)
    └── ErrorModal (Polished warning details for Permission Denied or Session Expired)
```

---

## 6. Frontend Route Structure

The routing framework maps standard user request addresses directly to React component views:

```typescript
const routes = [
  // Public Core
  { path: '/', component: HomeView },
  { path: '/blog', component: BlogIndexView },
  { path: '/blog/:slug', component: BlogDetailView },
  { path: '/sponsorship', component: SponsorshipView },
  { path: '/search', component: SearchPortalView },

  // Authentication
  { path: '/auth/login', component: LoginView },
  { path: '/auth/register', component: RegisterView },

  // Academy Module
  { path: '/program/academy', component: AcademyView },
  { path: '/program/academy/scholarships', component: ScholarshipsView },
  { path: '/program/academy/library', component: LibraryView },
  { path: '/program/academy/:level', component: AcademyLevelDetailView },

  // Camp Module
  { path: '/program/camp', component: CampView },
  { path: '/program/camp/careers', component: CareerHubView },

  // Community Module
  { path: '/program/community', component: CommunityView },
  { path: '/program/community/forum', component: ForumView },

  // Shared Dynamic Registration
  { path: '/form/:programType/:programId', component: DynamicRegistrationFormView },

  // Protected Member Dashboard
  { path: '/dashboard', component: DashboardIndexView, private: true },
];
```

---

## 7. Backend Mapping

Each frontend component maps directly to a Laravel-ready controller action and business domain, maintaining absolute naming symmetry:

```
FRONTEND VIEW                      ENDPOINT                                   CONTROLLER ACTION               BUSINESS MODULE
-------------------------------------------------------------------------------------------------------------------------------
HomeView                           -                                          -                               Public Core
LoginView                          POST /api/v1/auth/login                    AuthController@login            Auth Module
RegisterView                       POST /api/v1/auth/register                 AuthController@register         Auth Module
DashboardIndexView                 GET /api/v1/auth/me                        AuthController@me               Auth Module
AcademyView                        GET /api/v1/academy/programs               AcademyController@index         Academy Module
AcademyLevelDetailView             GET /api/v1/academy/programs/{id}          AcademyController@show          Academy Module
ScholarshipsView                   GET /api/v1/academy/scholarships           ScholarshipController@index     Scholarship Module
LibraryView                        GET /api/v1/library/books                  LibraryController@index         Library Module
LibraryView (Form Submit)          POST /api/v1/library/loan-requests         LibraryController@loanRequest   Library Module
LibraryView (Join Member)          POST /api/v1/library/members               LibraryController@joinMember    Library Module
CampView                           GET /api/v1/camp/trainings                 CampController@index            Camp Module
CareerHubView                      GET /api/v1/camp/careers                   CareerController@index          Career Module
CareerHubView (Submit application) POST /api/v1/camp/careers/{id}/apply       CareerController@apply          Career Module
CommunityView                      GET /api/v1/community/volunteer-batches    CommunityController@index       Community Module
ForumView                          GET /api/v1/community/forum/threads        ForumController@threads         Community Module
ForumView (Send Reply)             POST /api/v1/community/forum/threads/{id}/p ForumController@storePost       Community Module
SearchPortalView                   GET /api/v1/search?q={k}&category={c}      SearchController@query          Search Engine
DashboardIndexView (Recommend)     GET /api/v1/recommendations                RecommendationController@get    Recommendation Module
SponsorshipView                    POST /api/v1/sponsorship/requests          SponsorshipController@submit    Sponsorship Module
```

---

## 8. Data Entity Mapping

Every displayed data component mirrors a relational table structure. The schema mappings are declared as follows:

### Primary Entity Specifications

#### 1. `users` (Account Credentials)
*   `id` (UUID, Primary Key)
*   `full_name` (VARCHAR, Length 150)
*   `email` (VARCHAR, Length 150, Unique Index)
*   `password_hash` (VARCHAR, Length 255, Nullable for OAuth logins)
*   `phone_number` (VARCHAR, Length 20, for WhatsApp notifications)
*   `role` (ENUM: `'visitor'`, `'member'`, `'partner'`, `'admin'`)
*   `created_at` / `updated_at` (TIMESTAMP)

#### 2. `profiles` (Member Details)
*   `id` (UUID, Primary Key)
*   `user_id` (UUID, Foreign Key referencing `users.id`)
*   `persona` (ENUM: `'siswa_sma'`, `'mahasiswa'`, `'fresh_graduate'`, `'karyawan'`, `'mitra'`)
*   `interests` (JSON array of topics)
*   `resume_url` (VARCHAR, Length 255, Nullable)

#### 3. `registrations` (Polymorphic Program Application Log)
*   `id` (UUID, Primary Key)
*   `user_id` (UUID, Foreign Key referencing `users.id`)
*   `program_type` (ENUM: `'academy'`, `'scholarship'`, `'camp_training'`, `'career'`, `'volunteer'`, `'brand_ambassador'`)
*   `program_id` (UUID, references primary ID of matching service model)
*   `status` (ENUM: `'submitted'`, `'in_review'`, `'accepted'`, `'rejected'`)
*   `submitted_at` (TIMESTAMP)

#### 4. `academy_programs` (Formal Schooling Options)
*   `id` (UUID, Primary Key)
*   `level` (ENUM: `'sd'`, `'smp'`, `'sma'`)
*   `name` (VARCHAR, Full program designation)
*   `description` (TEXT)
*   `curriculum` (TEXT / JSON)
*   `tuition_fee` (DECIMAL, 12, 2)

#### 5. `scholarships` (Academic Financial Aids)
*   `id` (UUID, Primary Key)
*   `name` (VARCHAR)
*   `requirements` (TEXT)
*   `deadline` (DATE)
*   `quota` (INTEGER)

#### 6. `camp_trainings` (Upskilling Offerings)
*   `id` (UUID, Primary Key)
*   `name` (VARCHAR)
*   `classification` (ENUM: `'soft_skill'`, `'hard_skill'`, `'language'`)
*   `mentor_name` (VARCHAR)
*   `schedule` (VARCHAR)
*   `syllabus` (JSON)

#### 7. `careers` (Job Listings)
*   `id` (UUID, Primary Key)
*   `company_name` (VARCHAR)
*   `position` (VARCHAR)
*   `type` (ENUM: `'internship'`, `'full_time'`, `'part_time'`)
*   `description` (TEXT)

#### 8. `library_books` (Inventory catalog)
*   `id` (UUID, Primary Key)
*   `title` (VARCHAR)
*   `author` (VARCHAR)
*   `category` (VARCHAR)
*   `format` (ENUM: `'physical'`, `'digital'`)
*   `pdf_url` (VARCHAR, Nullable)

#### 9. `loan_requests` (Borrow Logs)
*   `id` (UUID, Primary Key)
*   `user_id` (UUID, references `users.id`)
*   `book_id` (UUID, references `library_books.id`)
*   `status` (ENUM: `'pending'`, `'borrowed'`, `'returned'`, `'overdue'`)
*   `loan_date` (DATE)

---

## 9. State Management Plan

To prevent race conditions, infinite re-renders, and ensure high system speed:

1.  **Auth & Session Storage:**
    *   Saves active JWT details inside client `localStorage` securely.
    *   Uses a simple, unified `AuthContext` to broadcast logged-in credentials (`full_name`, `role`, `user_id`) to layout blocks like `Navbar`.
2.  **Server Data Sync & Fetching (React Query / SWR-like custom hooks):**
    *   Maintains consistent frontend data feeds.
    *   Validates caching limits to prevent repeating server requests for heavy queries.
3.  **Application Form Cache:**
    *   Saves form data draft in React component state, clearing strictly upon successful submission responses.
4.  **UI Feedback Alerts:**
    *   State-driven alerts broadcast instantaneous confirmation messages (Toasts) upon successful database inserts or descriptive error screens during connection failures.

### Standardized Page State Matrix

| State Name | Visual Presentation | Behavioral Trigger | CTA / Mitigation |
| :--- | :--- | :--- | :--- |
| **Loading** | Shimmer Skeletons, soft spinner overlays. | Active API request in progress. | Visual elements disabled. |
| **Empty** | Elegant illustrated card with placeholder icon. | API payload returned empty array `[]`. | "Muat Ulang" or "Cari Kata Kunci Lain" |
| **Error** | Red notification card detailing network cause. | Endpoint returns `500` or connection failure. | "Coba Lagi" manual refresh trigger. |
| **Success** | Large green verification mark, floating confettis. | Endpoint returns `success: true`. | "Kembali ke Beranda" or "Lihat Status" |
| **Skeleton** | Soft grey pulses matching target card sizes. | Routing transitions before database fetch finishes. | Natural fading entrance. |
| **Permission Denied** | Locked padlock illustration. | User lacks role privilege (`visitor` accessing `admin` paths). | "Masuk Akun" or "Kembali ke Beranda" |
| **No Data** | Centered clean graphic text labels. | Search keyword fails to retrieve matching entries. | Reset categories / Reset filter terms. |
| **Expired Session** | Inline warning prompt + lock. | Bearer JWT verification returns token validation failure. | Forces redirect to `/auth/login`. |

---

## 10. Responsive Strategy

Symmetric mobile-first styling principles applied across typical device viewpoints:

*   **Desktop (Breakpoint `> 1024px`):**
    *   Fully expanded multi-column grid layouts (Bento grids for Academy and Camp pages).
    *   Header displays complete text-links navbar menu.
    *   Personalized sidebar is pinned to left during dashboard operations.
*   **Tablet (Breakpoint `768px - 1024px`):**
    *   Dual-column grids.
    *   Sidebar collapses into touchable toggle tabs.
    *   Navbar converts into floating horizontal links or icon bars.
*   **Mobile (Breakpoint `< 768px`):**
    *   Symmetric single-column linear cards.
    *   Large interactive buttons (Minimum target padding `44px` for touch accuracy).
    *   Desktop navbar menu collapses into a responsive Hamburger toggle drawer.
    *   CTA buttons are pinned sticky to screen top/bottom for high conversion.

---

## 11. Folder Structure

The frontend modules follow a clean domain-oriented structural framework:

```
src/
├── assets/             # Shared static illustrations and logos
├── components/         # Global Atomic UI components
│   ├── ui/             # Reusable base elements (Button, Badge, Input, Toast)
│   ├── layouts/        # Shared layouts (Navbar, Footer, RootLayout)
│   └── feedback/       # State views (Loading, EmptyState, ErrorBoundary)
├── modules/            # Isolated business domain spaces
│   ├── auth/           # Login, Register, PasswordReset forms & logic
│   ├── academy/        # School listings, level pages, library & loan forms
│   ├── camp/           # Course cards, enrollment form, career opportunities
│   ├── community/      # Volunteer recruitment batches, active forums
│   └── dashboard/      # Custom member profiles & tracking tables
├── hooks/              # Custom utilities for state transitions, filters, and searches
├── services/           # RESTful API client wrappers (Laravel endpoints mapper)
├── types/              # Type declarations and database model types matching Laravel schemas
├── utils/              # Calculation helpers, currency converters, and styling merges
├── App.tsx             # Dynamic routing configurations & view rendering
└── main.tsx            # Global mounting & root initialization
```

---

## 12. Naming Convention Rules

To ensure seamless integration with **Laravel's standard MVC architecture**, the frontend codebase strictly adheres to the following naming conventions across all directories:

1.  **Frontend View Files:** Named using PascalCase matching their routing purpose (e.g. `AcademyLevelDetailView.tsx`, `ScholarshipsView.tsx`).
2.  **API Services:** Placed in the `services/` directory, mapping precisely to Laravel's standard Controllers (e.g., `academyService.ts` matches `AcademyController`).
3.  **Entity Models & Types:** Maintained in `types/` with strict CamelCase matching Laravel's Eloquent Model properties, translating snake_case attributes at API level (e.g., `user_id` inside Laravel maps precisely to `userId` or kept clean using standard API serializers).
4.  **Database Relational Tables:** Designated with snake_case and strictly pluralized naming (e.g., `users`, `academy_programs`, `registrations`).
5.  **Form Validation Rules:** Map precisely to Laravel's Request classes (e.g., frontend validations match `StoreRegistrationRequest` requirements, featuring matching required parameters and string constraints).
