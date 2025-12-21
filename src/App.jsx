import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import { Rocket, LayoutDashboard, Menu, IndianRupee } from 'lucide-react'

function App() {
    return (
        <Router>
            <div className="min-h-screen">
                {/* Professional SaaS Navbar */}
                <nav className="nav-container">
                    <div className="container nav-content">
                        <Link to="/" className="flex items-center gap-2 text-2xl font-black text-primary decoration-none">
                            <Rocket fill="currentColor" size={28} />
                            <span className="text-text-main tracking-tighter">SME<span className="text-primary">kit.</span></span>
                        </Link>

                        <div className="nav-links">
                            <Link to="/" className="nav-link">Home</Link>
                            <a href="#tools" className="nav-link">Features</a>
                            <a href="#lead-form" className="nav-link">Contact</a>
                            <Link to="/pricing" className="nav-link">Pricing</Link>
                            <Link to="/dashboard" className="btn btn-secondary px-6 py-2.5 text-sm">
                                <LayoutDashboard size={18} />
                                Dashboard
                            </Link>
                            <a href="#lead-form" className="btn btn-primary px-8 py-2.5 text-sm">
                                Get Started
                            </a>
                        </div>

                        <button className="md:hidden text-text-main">
                            <Menu size={24} />
                        </button>
                    </div>
                </nav>

                <main>
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                    </Routes>
                </main>

                <footer className="section bg-white border-t border-border-light">
                    <div className="container">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                            <div className="text-center md:text-left">
                                <div className="flex items-center gap-2 text-2xl font-black text-primary mb-4 justify-center md:justify-start">
                                    <Rocket fill="currentColor" size={24} />
                                    <span className="text-text-main tracking-tighter">SME<span className="text-primary">kit.</span></span>
                                </div>
                                <p className="text-text-dim text-sm max-w-sm">
                                    The most versatile growth toolkit for Indian SMEs. Built to scale your business with enterprise-grade tools.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-12 text-sm">
                                <div className="flex flex-col gap-4">
                                    <span className="font-bold text-text-main">Product</span>
                                    <a href="#tools" className="text-text-dim hover:text-primary decoration-none">GST Tools</a>
                                    <a href="#tools" className="text-text-dim hover:text-primary decoration-none">Barcode Engine</a>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <span className="font-bold text-text-main">Company</span>
                                    <a href="#" className="text-text-dim hover:text-primary decoration-none">About</a>
                                    <a href="#" className="text-text-dim hover:text-primary decoration-none">Careers</a>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <span className="font-bold text-text-main">Legal</span>
                                    <a href="#" className="text-text-dim hover:text-primary decoration-none">Privacy</a>
                                    <a href="#" className="text-text-dim hover:text-primary decoration-none">Terms</a>
                                </div>
                            </div>
                        </div>

                        <div className="mt-20 pt-8 border-t border-border-light text-center text-text-sub text-xs">
                            <p>© 2025 SMEkit. All rights reserved.</p>
                        </div>
                    </div>
                </footer>
            </div>
        </Router>
    )
}

export default App
