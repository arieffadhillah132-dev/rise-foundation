RISE Foundation

RISE Foundation adalah sebuah yayasan yang berfokus pada pengembangan sumber daya manusia melalui penyediaan ekosistem pendidikan digital yang terintegrasi. Sebagai organisasi induk, RISE Foundation menaungi berbagai layanan pendidikan, pelatihan, dan pengembangan pengalaman yang dirancang untuk mendukung perjalanan belajar dan pengembangan individu pada berbagai tahap kehidupan.

Melalui satu platform terpadu, pengguna dapat mengakses layanan pendidikan formal, pelatihan keterampilan, komunitas pengembangan diri, peluang karier, program volunteer, hingga berbagai sumber belajar digital. Setiap layanan memiliki tujuan yang berbeda namun saling melengkapi sehingga membentuk sebuah ekosistem pembelajaran yang berkelanjutan.

Konsep utama RISE Foundation bukan hanya menyediakan materi pembelajaran, tetapi juga menjadi wadah yang menghubungkan proses belajar, pengembangan kompetensi, pengalaman organisasi, dan kesiapan karier dalam satu lingkungan digital yang terintegrasi.

Struktur Produk

Di dalam ekosistem tersebut, RISE Foundation memiliki beberapa unit layanan utama.

RISE Academy

RISE Academy merupakan unit layanan pendidikan formal yang berada di bawah RISE Foundation. Layanan ini menyediakan informasi, proses penerimaan peserta didik, dan pengelolaan program pendidikan untuk jenjang:

Sekolah Dasar (SD)
Sekolah Menengah Pertama (SMP)
Sekolah Menengah Atas (SMA)

Melalui website, calon peserta didik maupun orang tua dapat memperoleh informasi mengenai sekolah, fasilitas, biaya pendidikan, jadwal penerimaan, serta melakukan proses pendaftaran secara daring.

Pada ruang lingkup website, proses layanan dibatasi hingga tahap admission (penerimaan peserta didik), sedangkan pengelolaan kegiatan akademik setelah siswa diterima berada di luar ruang lingkup sistem ini.

RISE Camp

RISE Camp merupakan layanan pelatihan nonformal yang berfokus pada pengembangan kompetensi melalui berbagai program pelatihan, seperti:

Soft Skill
Hard Skill
Bahasa
Pengembangan Karier

Setiap program dilengkapi dengan fitur pembelajaran daring, mentoring, sertifikat digital, progress tracking, roadmap pembelajaran, serta mini project sebagai sarana praktik peserta.

RISE Community

RISE Community merupakan layanan pengembangan pengalaman dan jejaring sosial yang mempertemukan pengguna dengan berbagai aktivitas kolaboratif, seperti:

Volunteer
Internship
Brand Ambassador
Program sosial RISE Peduli

Layanan ini bertujuan memberikan ruang bagi pengguna untuk membangun pengalaman, memperluas relasi, serta berkontribusi dalam kegiatan sosial maupun profesional

Deployment Vercel

Project ini memakai Vite untuk frontend dan Vercel Serverless Functions di folder `api/` untuk backend. Backend Express lama tidak dipakai oleh Vercel runtime; endpoint production berada di:

- `api/auth/*`
- `api/academy/apply`
- `api/camp/apply`
- `api/scholarship/apply`
- `api/library/*`

Database

Gunakan MySQL cloud, bukan `localhost`, untuk deployment Vercel. Provider yang kompatibel antara lain Railway MySQL, Aiven MySQL, DigitalOcean Managed MySQL, TiDB Cloud, atau PlanetScale-compatible MySQL. Buat database kosong, lalu isi Environment Variables di Vercel:

- `DATABASE_URL`: format `mysql://USER:PASSWORD@HOST:3306/DB_NAME`
- `JWT_SECRET`: string rahasia panjang untuk signing token
- `DB_SSL=true`: aktifkan jika provider mewajibkan SSL/TLS
- `DB_SSL_CA`: isi sertifikat CA jika provider memberikannya

Jika provider tidak memberi `DATABASE_URL`, gunakan variabel terpisah: `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, dan `DB_NAME`.

Saat function pertama kali dipanggil, tabel berikut akan dibuat otomatis jika belum ada: `users`, `registrations`, `library_members`, `book_loans`, dan `sponsor_inquiries`. Akun demo juga otomatis dibuat ketika tabel `users` masih kosong:

- `maharani@rise.org` / `password123`
- `admin@rise.org` / `password123`

Langkah Deploy

1. Push repo ke GitHub.
2. Import project ke Vercel.
3. Set Environment Variables di Vercel sesuai `.env.example`.
4. Deploy ulang setelah env tersimpan.
5. Test login, registrasi program, membership library, loan, sponsorship inquiry, dan tombol update status admin.
