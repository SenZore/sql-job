import getDb from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const db = await getDb();

        return new Promise((resolve) => {
            const query = `SELECT * FROM students_data`;

            db.all(query, [], (err, rows) => {
                if (err) {
                    console.error("Database Error:", err);
                    return resolve(NextResponse.json({ error: "Gagal memuat data akademik." }, { status: 500 }));
                }

                return resolve(NextResponse.json({
                    success: true,
                    data: rows
                }));
            });
        });

    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
