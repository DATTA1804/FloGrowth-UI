import { motion } from 'framer-motion'
import { Sparkles, TrendingUp, ShieldCheck, Zap, ArrowRight, Play, CheckCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import GSTCalculator from '../components/GSTCalculator'
import BarcodeGenerator from '../components/BarcodeGenerator'
import LeadForm from '../components/LeadForm'

const LandingPage = () => {
    return (
        <div className="bg-transparent">
            {/* Hero Section */}
            <section className="section pb-0 pt-40 overflow-hidden">
                <div className="container">
                    <div className="text-center max-w-4xl mx-auto mb-20">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-primary-light text-primary text-sm font-bold mb-8 border border-primary/10">
                                <Sparkles size={16} />
                                Trusted by 10,000+ Indian SMEs
                            </div>

                            <h1 className="mb-8">
                                The Growth Engine <br />
                                <span className="text-primary italic">for your business.</span>
                            </h1>

                            <p className="subtext mb-12">
                                Get a powerful suite of digital tools designed exclusively for Indian merchants.
                                Automate your billing, inventory, and taxation in minutes, not days.
                            </p>

                            <div className="flex flex-wrap justify-center gap-6 mb-20">
                                <a href="#lead-form" className="btn btn-primary px-12 py-5 text-lg">
                                    Start Free Trial
                                    <ArrowRight size={20} />
                                </a>
                                <a href="#tools" className="btn btn-secondary px-12 py-5 text-lg">
                                    Watch Demo
                                    <Play size={20} />
                                </a>
                            </div>
                        </motion.div>
                    </div>

                    {/* Visual / Video Section Reference */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 1 }}
                        className="relative max-w-6xl mx-auto"
                    >
                        <div className="relative bg-white p-4 md:p-8 rounded-[40px] shadow-premium border border-border-light overflow-hidden">
                            <div className="aspect-[16/9] w-full bg-slate-100 rounded-[24px] flex items-center justify-center overflow-hidden relative">
                                {/* Mockup Image/Video Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
                                <div className="relative text-center p-12">
                                    <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-xl mb-6 mx-auto cursor-pointer hover:scale-110 transition-transform">
                                        <Play className="text-primary ml-1" fill="currentColor" size={32} />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2">See SMEkit in Action</h3>
                                    <p className="text-text-dim">Discover how Rahul Enterprise scaled 3x using our tools.</p>
                                </div>
                            </div>
                        </div>

                        {/* Decorative elements */}
                        <div className="absolute -z-10 -top-20 -left-20 w-80 h-80 bg-primary/10 rounded-full blur-[100px]" />
                        <div className="absolute -z-10 -bottom-20 -right-20 w-80 h-80 bg-secondary/10 rounded-full blur-[100px]" />
                    </motion.div>
                </div>
            </section>

            {/* Feature Highlight Section */}
            <section className="section">
                <div className="container">
                    <div className="text-center mb-24">
                        <h2 className="mb-6">Everything you need to <br /> scale with confidence.</h2>
                        <p className="subtext">No hidden fees, no complex setup. Just growth.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <FeatureCard
                            icon={<ShieldCheck size={32} className="text-primary" />}
                            title="Tax Compliant"
                            desc="Automatic GST calculation and documentation matching Indian regulations."
                        />
                        <FeatureCard
                            icon={<TrendingUp size={32} className="text-primary" />}
                            title="Revenue Tracking"
                            desc="Real-time analytics to monitor your best performing products and variants."
                        />
                        <FeatureCard
                            icon={<CheckCircle size={32} className="text-primary" />}
                            title="Inventory Sync"
                            desc="Generate barcodes and manage stock across multiple locations instantly."
                        />
                    </div>
                </div>
            </section>

            {/* Tools Section */}
            <section id="tools" className="section bg-white/50 backdrop-blur-sm border-y border-border-light">
                <div className="container">
                    <div className="text-center mb-20">
                        <h2 className="mb-4">Power Tools for Merchants</h2>
                        <p className="subtext">Functionality built for speed and accuracy.</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <GSTCalculator />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <BarcodeGenerator />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Lead Generation Section */}
            <section id="lead-form" className="section">
                <div className="container max-w-5xl">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <LeadForm />
                    </motion.div>
                </div>
            </section>
        </div>
    )
}

const FeatureCard = ({ icon, title, desc }) => (
    <div className="text-center p-12 card-saas">
        <div className="inline-flex items-center justify-center p-5 bg-primary-light rounded-[24px] mb-8">
            {icon}
        </div>
        <h3 className="text-2xl font-bold mb-4">{title}</h3>
        <p className="text-text-dim leading-relaxed">{desc}</p>
    </div>
)

export default LandingPage
