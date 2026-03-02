import sqlite3 from 'sqlite3';
import os from 'os';
import path from 'path';

// Di Vercel (Serverless), satu-satunya folder yang bisa di-write adalah /tmp.
const dbPath = path.join(os.tmpdir(), 'database.sqlite');

let dbInstance = null;

export default function getDb() {
    return new Promise((resolve, reject) => {
        // Jika sudah ada instance, kembalikan langsung
        if (dbInstance) {
            return resolve(dbInstance);
        }

        const db = new sqlite3.Database(dbPath, (err) => {
            if (err) {
                return reject(err);
            }

            db.serialize(() => {
                db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            password_hash TEXT,
            role TEXT,
            real_name TEXT
        )`);

                db.run(`CREATE TABLE IF NOT EXISTS students_data (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            student_name TEXT,
            grade TEXT,
            spp_status TEXT,
            spp_balance TEXT
        )`);

                db.get("SELECT count(*) as count FROM users", (err, row) => {
                    if (row && row.count === 0) {
                        const stmtUsers = db.prepare("INSERT INTO users (username, password_hash, role, real_name) VALUES (?, ?, ?, ?)");
                        stmtUsers.run("admin_it", "0192023a7bbd73250516f069df18b500", "SuperAdmin", "Bapak Admin");
                        stmtUsers.run("guru_bk", "827ccb0eea8a706c4c34a16891f84e7b", "Teacher", "Ibu Guru BK");
                        stmtUsers.run("kepala_sekolah", "e10adc3949ba59abbe56e057f20f883e", "Owner", "Bpk. Kepala Sekolah");
                        stmtUsers.finalize();

                        const stmtStudents = db.prepare("INSERT INTO students_data (student_name, grade, spp_status, spp_balance) VALUES (?, ?, ?, ?)");
                        stmtStudents.run("Dian Safitri", "A+", "Lunas", "Rp 0");
                        stmtStudents.run("Adam Sanjaya", "A", "Belum Lunas", "Rp 1.500.000");
                        stmtStudents.run("A'adin Alfareza", "A-", "Lunas", "Rp 0");
                        stmtStudents.run("Siu Jie", "B+", "Belum Lunas", "Rp 2.000.000");
                        stmtStudents.run("Ahmad Muhazir", "B", "Lunas", "Rp 0");
                        stmtStudents.run("Fitri Aulia Fitri", "A", "Lunas", "Rp 0");
                        stmtStudents.finalize();
                    }

                    dbInstance = db;
                    resolve(db);
                });
            });
        });
    });
}
