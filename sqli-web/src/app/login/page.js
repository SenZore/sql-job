'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, User, Terminal, Loader2, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function LoginPage() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorStatus, setErrorStatus] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorStatus(null);

        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                sessionStorage.setItem('user', JSON.stringify(data.user));
                sessionStorage.setItem('sqlQuery', data.queryExecuted);

                // Langsung redirect ke admin (perilaku asli jika terkena SQL Injection)
                router.push('/admin');
            } else {
                setErrorStatus(data.error);
                setLoading(false);
            }
        } catch (err) {
            setErrorStatus("Terjadi kesalahan jaringan.");
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-gray-50 text-gray-900 flex justify-center items-center font-sans p-6">
            <Link href="/" className="absolute top-6 left-6 text-sm font-semibold text-gray-500 hover:text-blue-600 transition-colors">
                &larr; Kembali ke Beranda
            </Link>

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full max-w-md"
            >
                <div className="bg-white border border-gray-200 rounded-2xl shadow-xl p-8 overflow-hidden relative">

                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center p-3 bg-blue-50 rounded-2xl mb-4">
                            <Terminal className="w-8 h-8 text-blue-600" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Portal Akses Pegawai</h1>
                        <p className="text-gray-500 text-sm mt-2">Silakan masukkan kredensial sistem Anda</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Username Pegawai</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    required
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300"
                                    placeholder="ID / Username"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Password Akses</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        {errorStatus && (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm flex items-center gap-2 font-medium"
                            >
                                <ShieldAlert className="w-5 h-5" />
                                <span>{errorStatus}</span>
                            </motion.div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center items-center py-3.5 px-4 rounded-xl shadow-md text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                "Otentikasi Pegawai"
                            )}
                        </button>
                    </form>

                    <p className="mt-8 text-center text-xs text-gray-400 font-medium">
                        &copy; 2026 EduSchool Academic Information System <br /> Kelompok 5 Project Demo
                    </p>
                </div>
            </motion.div>
        </main>
    );
}
