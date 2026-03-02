'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, BookOpen, ShieldCheck, Users } from 'lucide-react';

export default function LandingPage() {
    return (
        <main className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-blue-200">
            {/* Navbar Minimalis */}
            <nav className="w-full bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center shadow-sm">
                <div className="flex items-center gap-2">
                    <BookOpen className="w-6 h-6 text-blue-600" />
                    <span className="font-bold tracking-tight text-xl text-gray-800">EduSchool<span className="text-blue-600">.</span></span>
                </div>
                <div>
                    <Link href="/login" className="text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors mr-6">
                        Portal Karyawan
                    </Link>
                    <Link href="/login" className="px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg">
                        Masuk / Login
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative w-full max-w-7xl mx-auto px-6 pt-24 pb-32 flex flex-col items-center justify-center text-center">
                {/* Ornamen Latar Belakang */}
                <div className="absolute top-10 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute top-10 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative z-10"
                >
                    <span className="px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold tracking-wider uppercase mb-6 inline-block">
                        Sistem Informasi Terpadu
                    </span>
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 mb-6 leading-tight">
                        Membangun Masa Depan <br className="hidden md:block" /> Pendidikan yang <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Terpercaya</span>.
                    </h1>
                    <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10">
                        Akses portal akademik untuk manajemen siswa, nilai, dan tagihan SPP kini dalam satu platform yang terpusat dan mudah digunakan.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                        <Link href="/login">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-xl font-semibold shadow-xl hover:bg-gray-800 transition-colors text-lg"
                            >
                                Akses Portal Akademik <ArrowRight className="w-5 h-5" />
                            </motion.button>
                        </Link>
                    </div>
                </motion.div>
            </section>

            {/* Ekstra Fitur */}
            <section className="bg-white py-20 border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col items-center text-center"
                    >
                        <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                            <ShieldCheck className="w-7 h-7" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">Keamanan Terjamin</h3>
                        <p className="text-gray-600">Sistem kami menggunakan metode autentikasi terkini untuk mencegah akses yang tidak sah ke dalam database siswa.</p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col items-center text-center"
                    >
                        <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                            <Users className="w-7 h-7" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">Manajemen Siswa</h3>
                        <p className="text-gray-600">Mengelola data ribuan siswa, nilai tugas, dan aktivitas akademik dengan lebih cepat dan efisien.</p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-col items-center text-center"
                    >
                        <div className="w-14 h-14 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                            <BookOpen className="w-7 h-7" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">Rekap SPP</h3>
                        <p className="text-gray-600">Pemantauan transparansi keuangan sekolah dan rekapitulasi pembayaran SPP bulanan siswa yang akurat.</p>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
