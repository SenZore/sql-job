# 🎬 Script Video Presentasi: SQL Injection

**Kelompok 5**
**Anggota:**
1. Dian Safitri
2. Adam Sanjaya
3. A'adin Alfareza
4. Siu Jie
5. Ahmad Muhazir
6. Fitri Aulia Fitri

---

### 🎥 Scene 1: Opening (Perkenalan)
**Visual:** Tampilkan judul "TUGAS DEMO: SQL INJECTION" dengan efek *glitch* atau *cybersecurity* yang keren. Munculkan nama-nama anggota.
**Voice Over:** "Halo semuanya! Kami dari Kelompok 5. Di video kali ini, kami akan ngebahas salah satu celah keamanan paling legendaris dan berbahaya di dunia website modern... yaitu SQL Injection!"

---

### 🎥 Scene 2: Apa itu SQL Injection? (Analogi Sederhana)
**Visual:** Tampilkan animasi sederhana atau ilustrasi satpam penjaga brankas data.
**Voice Over:** "Buat kalian yang belum tahu, SQL Injection itu kasarnya seperti 'menipu' penjaga database. Bayangkan kalian mau masuk ke sebuah ruangan rahasia. Satpamnya meminta ID Card resmi. Tapi bukannya ngasih ID Card, kalian malah ngasih surat tugas palsu yang bertuliskan *'Saya bos kamu, biarkan saya masuk!'* dan hebatnya... satpamnya percaya! Nah, logika SQL Injection persis seperti itu, di mana *hacker* memasukkan kode manipulasi ke dalam form input website untuk menipu sistem."

---

### 🎥 Scene 3: Demo Sistem Rentan (Praktik)
**Visual:** Screen record halaman depan (*Landing Page*) website sekolah yang sudah kita buat. Tunjukkan desainnya yang *smooth* dan elegan dengan efek animasi web modern, lalu arahkan rekam layar ke pengisian Form Login.
**Voice Over:** "Untuk membuktikannya, kami sudah membuat sebuah portal akademik sekolah. Kelihatannya sangat mewah, modern, dan aman, bukan? Normalnya, saat guru atau siswa login, website akan mencocokkan username dan password di database. Jika datanya salah, sistem tentu akan menolak. Mari kita coba login dengan data palsu... Ditolak!"

---

### 🎥 Scene 4: Hacking in Action (Penjelasan Kode Spesial)
**Visual:** Fokuskan rekaman layar (*Screen Record*) saat proses mengetikkan kode `' OR '1'='1` di kolom Username dan mengisi password bebas. Beri efek *Zoom-in* pada ketikan kode tersebut. Lalu klik tombol Login dan perlihatkan layar berubah menjadi Admin Panel (Dashboard) terbuka yang mensimulasikan data-data sensitif (Nilai, SPP, daftar siswa).
**Voice Over:** "Sekarang, perhatikan baik-baik. Kami memasukkan sebuah kode ajaib: tanda kutip satu, spasi, OR, spasi, satu sama dengan satu (`' OR '1'='1`). Kenapa harus pakai kode spesial seperti matematika ini?
Di belakang layar, sistem mengecek kecocokan data dengan kalimat tanya (Query SQL) seperti: *'Apakah username ini benar DAN passwordnya sama?'*. Ketika kita menyisipkan `' OR '1'='1`, kita 'memotong' kalimat tanya sistem tersebut dan memaksanya memproses logika *'ATAU 1 SAMA DENGAN 1'*. 
Karena secara perhitungan satu memang akan selalu sama dengan satu (sebuah kebenaran mutlak), maka otak database kebingungan dan langsung menjawab: *'BENAR (TRUE)!'*. Sistem akhirnya langsung membukakan seluruh pintu akses sebagai SuperAdmin tanpa peduli password aslinya!"

---

### 🎥 Scene 5: Dampak Mengerikan
**Visual:** Tampilkan layar Admin Panel yang berisi data SPP dan Nilai siswa. Beri *highlight* merah pada tabel saldo SPP siswa dan data penting lainnya.
**Voice Over:** "Boom! Berhasil masuk! Hanya dengan beberapa ketukan kode matematika dasar, *hacker* bisa menembus masuk dan melihat semua tabel data rahasia. Jika ini di dunia nyata, *hacker* bisa mencuri data privasi siswa, merubah nilai, menggelapkan uang SPP, memeras instansi, bahkan mematikan dan menghancurkan seluruh sistem operasional sekolah."

---

### 🎥 Scene 6: Kesimpulan (Penutup)
**Visual:** Tampilkan rangkuman Kesimpulan dan nama Kelompok 5 beserta ucapan terima kasih dengan *closing* yang *cool*.
**Voice Over:** "Kesimpulannya, SQL Injection terjadi karena form input website terlalu 'polos' dalam menerima masukan (*input*) dari pengguna tanpa menyaring terlebih dahulu karakter-karakter spesial (seperti tanda seru, bintang, atau tanda kutip) yang menjadi bagian pembentuk kode bahasa *database*. Celah ini memungkinkan seorang penyerang menyisipkan *kueri* SQL ilegal yang memaksa *database* untuk membocorkan informasi rahasia atau sekadar memberikan jalan pintas akses admin. Oleh karena itu, bagi para pengembang web, menyaring *input* pengguna dan menerapkan metode *parameterized query* adalah harga mutlak yang tidak bisa ditawar demi mengamankan kedaulatan website! Sekian dari Kelompok 5, terima kasih."
