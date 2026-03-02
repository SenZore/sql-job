const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

const dbFile = './database.sqlite';

// Hapus file database jika sudah ada agar selalu fresh
if (fs.existsSync(dbFile)) {
    fs.unlinkSync(dbFile);
}

const db = new sqlite3.Database(dbFile, (err) => {
    if (err) {
        console.error("Gagal membuka database", err.message);
    } else {
        console.log("Database berhasil dibuat.");
    }
});

db.serialize(() => {
    // Buat tabel users
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password_hash TEXT,
        role TEXT,
        real_name TEXT
    )`);

    // Buat tabel students_data
    db.run(`CREATE TABLE IF NOT EXISTS students_data (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        student_name TEXT,
        grade TEXT,
        spp_status TEXT,
        spp_balance TEXT
    )`);

    // Insert dummy data ke tabel users
    const stmtUsers = db.prepare("INSERT INTO users (username, password_hash, role, real_name) VALUES (?, ?, ?, ?)");
    stmtUsers.run("admin_it", "0192023a7bbd73250516f069df18b500", "SuperAdmin", "Bapak Admin"); // Password pura-puranya di hash
    stmtUsers.run("guru_bk", "827ccb0eea8a706c4c34a16891f84e7b", "Teacher", "Ibu Guru BK");
    stmtUsers.run("kepala_sekolah", "e10adc3949ba59abbe56e057f20f883e", "Owner", "Bpk. Kepala Sekolah");
    stmtUsers.finalize();

    // Insert dummy data ke tabel students_data
    const stmtStudents = db.prepare("INSERT INTO students_data (student_name, grade, spp_status, spp_balance) VALUES (?, ?, ?, ?)");
    stmtStudents.run("Dian Safitri", "A+", "Lunas", "Rp 0");
    stmtStudents.run("Adam Sanjaya", "A", "Belum Lunas", "Rp 1.500.000");
    stmtStudents.run("A'adin Alfareza", "A-", "Lunas", "Rp 0");
    stmtStudents.run("Siu Jie", "B+", "Belum Lunas", "Rp 2.000.000");
    stmtStudents.run("Ahmad Muhazir", "B", "Lunas", "Rp 0");
    stmtStudents.run("Fitri Aulia Fitri", "A", "Lunas", "Rp 0");
    stmtStudents.finalize();

    console.log("Dummy data berhasil dimasukkan ke dalam tabel 'users' dan 'students_data'.");
});

db.close();
