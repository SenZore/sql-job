import getDb from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const { username, password } = await request.json();

        // Memanggil inisialisasi database (agar kompatibel di Vercel Serverless)
        const db = await getDb();

        return new Promise((resolve) => {
            // PERHATIAN: BARIS DI BAWAH INI ADALAH CELAH SQL INJECTION UTAMA
            // Kueri sengaja tidak menggunakan parameterized query (tanda '?')
            // Melainkan langsung menggabungkan (concat) teks input dari user.
            const query = `SELECT * FROM users WHERE username = '${username}' AND password_hash = '${password}'`;

            console.log("Mengeksekusi Kueri Rentan:", query);

            db.get(query, (err, row) => {
                if (err) {
                    console.error("Database Error:", err);
                    return resolve(NextResponse.json({ error: "Terjadi kesalahan internal pada database." }, { status: 500 }));
                }

                if (row) {
                    // Berhasil masuk, baik login normal atau lewat Injeksi
                    return resolve(NextResponse.json({
                        success: true,
                        user: {
                            id: row.id,
                            username: row.username,
                            role: row.role,
                            real_name: row.real_name
                        },
                        queryExecuted: query // Mengembalikan kueri eksaknya untuk demo/efek di UI
                    }));
                } else {
                    return resolve(NextResponse.json({ error: "Username atau Password salah." }, { status: 401 }));
                }
            });
        });

    } catch (error) {
        return NextResponse.json({ error: "Invalid Request Error" }, { status: 400 });
    }
}
