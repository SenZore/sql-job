'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Database, Users, LogOut, Terminal, Activity, FileText } from 'lucide-react';

export default function AdminPanel() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [students, setStudents] = useState([]);
    const [sqlQuery, setSqlQuery] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = sessionStorage.getItem('user');
        const storedQuery = sessionStorage.getItem('sqlQuery');

        if (!storedUser) {
            router.push('/login');
            return;
        }

        setUser(JSON.parse(storedUser));
        if (storedQuery) setSqlQuery(storedQuery);

        fetch('/api/students')
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setStudents(data.data);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });

    }, [router]);

    const handleLogout = () => {
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('sqlQuery');
        router.push('/');
    };

    if (loading || !user) {
        return (
            <div className="min-h-screen bg-gray-50 flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50 text-gray-900 p-6 lg:p-12 font-sans overflow-x-hidden">
            <div className="max-w-7xl mx-auto relative z-10">

                {/* Header Dashboard Minimalis */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 pb-6 border-b border-gray-200 gap-4">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-white rounded-xl border border-gray-200 shadow-sm">
                            <Database className="w-8 h-8 text-blue-600" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Enterprise Dashboard</h1>
                            <p className="text-gray-500 flex items-center gap-2 mt-1">
                                Selamat datang kembali, <span className="font-semibold text-gray-800">{user.real_name}</span>
                                <span className="px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider rounded-md bg-blue-50 text-blue-700 border border-blue-100">{user.role}</span>
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm text-sm font-semibold text-gray-700"
                    >
                        <LogOut className="w-4 h-4" />
                        Keluar Sistem
                    </button>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Main Table Area */}
                    <div className="lg:col-span-2 space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm"
                        >
                            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                                <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                                    <Users className="w-5 h-5 text-blue-600" /> Basis Data Akademik Siswa
                                </h2>
                                <span className="text-xs font-bold bg-green-100 text-green-700 px-3 py-1 rounded-full border border-green-200">Database Aktif</span>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-200 font-semibold tracking-wider">
                                        <tr>
                                            <th className="px-6 py-4">Nama Peserta Didik</th>
                                            <th className="px-6 py-4">Nilai Akhir</th>
                                            <th className="px-6 py-4">Status Tagihan</th>
                                            <th className="px-6 py-4">Sisa Saldo</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {students.map((student, idx) => (
                                            <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                                                <td className="px-6 py-5 text-gray-900 font-semibold">{student.student_name}</td>
                                                <td className="px-6 py-5">
                                                    <span className={`px-2.5 py-1 rounded-md font-bold text-xs ${student.grade.includes('A') ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                                        {student.grade}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-5">
                                                    {student.spp_status === 'Lunas' ? (
                                                        <span className="text-green-600 font-semibold flex items-center gap-1.5"><div className="w-2 h-2 shrink-0 rounded-full bg-green-500"></div>Lunas</span>
                                                    ) : (
                                                        <span className="text-red-500 font-semibold flex items-center gap-1.5"><div className="w-2 h-2 shrink-0 rounded-full bg-red-500"></div>Menunggak</span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-5 font-mono text-gray-600 font-medium">{student.spp_balance}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>
                    </div>

                    {/* Sidebar Info */}
                    <div className="space-y-6">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm"
                        >
                            <h3 className="text-md font-bold text-gray-800 mb-6 flex items-center gap-2">
                                <Activity className="w-5 h-5 text-gray-500" /> Log Aktivitas Sistem
                            </h3>
                            <div className="space-y-5">
                                <div className="border-l-2 border-blue-500 pl-4 py-1">
                                    <p className="text-xs text-gray-400 mb-1 font-medium">Hari ini, 08:32 Pagi</p>
                                    <p className="text-sm font-medium text-gray-700">Pencadangan server berhasil dilakukan.</p>
                                </div>
                                <div className="border-l-2 border-yellow-500 pl-4 py-1">
                                    <p className="text-xs text-gray-400 mb-1 font-medium">Hari ini, 09:15 Pagi</p>
                                    <p className="text-sm font-medium text-gray-700">Sinkronisasi data absensi siswa.</p>
                                </div>

                                {/* Ini bagian demonstrasi Kueri terakhir (Supaya presentasi tetap jalan tapi terlihat asli) */}
                                <div className="mt-6 pt-4 border-t border-gray-100">
                                    <p className="text-xs text-gray-400 font-medium mb-2 flex items-center gap-1"><Terminal className="w-3 h-3" /> Debug (Presentasi): Akses Kueri Terakhir</p>
                                    <div className="bg-gray-800 p-3 rounded-md font-mono text-xs text-green-400 break-all leading-relaxed shadow-inner">
                                        {sqlQuery}
                                    </div>
                                    <p className="text-[10px] text-gray-400 mt-2 font-medium">Perhatikan bagaimana kueri manipulasi di atas membypass otentikasi server secara fatal.</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-blue-50 rounded-2xl p-6 border border-blue-100 text-center"
                        >
                            <p className="text-sm text-blue-800 font-medium">Portal ini menggunakan sistem pemantauan tingkat lanjut untuk memastikan integritas data.</p>
                            <div className="mt-4 pt-4 border-t border-blue-200/50">
                                <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
                                    Kelompok 5 Project SQLi
                                </span>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </main>
    );
}
