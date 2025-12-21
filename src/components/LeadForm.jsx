import { useState } from 'react'
import { motion } from 'framer-motion'
import { trackEvent } from '../analytics/trackEvent'
import { User, Building2, Phone, Send, CheckCircle, Sparkles, ShieldCheck, Zap } from 'lucide-react'

const LeadForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        businessName: '',
        phone: ''
    })
    const [status, setStatus] = useState('idle')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setStatus('loading')
        trackEvent('lead_submitted', formData)

        try {
            await new Promise(resolve => setTimeout(resolve, 2000))
            setStatus('success')
            trackEvent('lead_converted', { ...formData, source: 'growth_toolkit_v4' })
        } catch (error) {
            console.error('Lead submission failed', error)
            setStatus('idle')
        }
    }

    if (status === 'success') {
        return (
            <div className="card-saas text-center py-24 bg-white border-primary/20">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="inline-flex items-center justify-center w-28 h-28 bg-success/10 rounded-full mb-10 border border-success/10"
                >
                    <CheckCircle className="text-success" size={56} />
                </motion.div>
                <h2 className="text-4xl font-black mb-6">Request Received!</h2>
                <p className="text-xl text-text-dim max-w-lg mx-auto mb-12 leading-relaxed">
                    Thanks <span className="text-text-main font-bold">{formData.name.split(' ')[0]}</span>. Our founding team will reach out to schedule your demo for <span className="text-text-main font-bold">{formData.businessName}</span> shortly.
                </p>
                <button
                    className="btn btn-secondary"
                    onClick={() => {
                        setFormData({ name: '', businessName: '', phone: '' })
                        setStatus('idle')
                    }}
                >
                    Back to Toolkit
                </button>
            </div>
        )
    }

    return (
        <div className="card-saas bg-white border-none shadow-premium relative overflow-hidden">
            {/* Subtle Background Accent */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-0 translate-x-1/2 -translate-y-1/2" />

            <div className="grid lg:grid-cols-5 gap-20 items-center relative z-10">
                <div className="lg:col-span-3 space-y-10">
                    <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-primary-light text-primary text-xs font-bold uppercase tracking-widest border border-primary/10">
                        <Zap size={16} />
                        Exclusive Early Access
                    </div>
                    <h2 className="text-5xl font-black leading-tight">
                        Ready to <span className="text-primary italic">supercharge</span> <br />
                        your SME growth?
                    </h2>
                    <p className="text-xl text-text-dim leading-relaxed max-w-xl">
                        Join 5,000+ forward-thinking Indian businesses. Get early access to our premium ERP suite and automated compliance tools.
                    </p>

                    <div className="flex flex-col gap-6 pt-4">
                        <FeatureRow icon={<ShieldCheck className="text-primary" />} text="Bank-grade data security with encrypted logs" />
                        <FeatureRow icon={<Sparkles className="text-primary" />} text="AI-powered inventory forecasting tools" />
                        <FeatureRow icon={<User className="text-primary" />} text="24/7 dedicated support for merchants" />
                    </div>
                </div>

                <div className="lg:col-span-2">
                    <form onSubmit={handleSubmit} className="space-y-8 p-10 bg-muted rounded-[32px] border border-black/5">
                        <div className="form-group">
                            <label className="form-label">Full Name</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    className="form-input pl-14"
                                    required
                                    placeholder="Rahul Gupta"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                                <User className="absolute left-5 top-1/2 -translate-y-1/2 text-text-sub" size={20} />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Business Name</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    className="form-input pl-14"
                                    required
                                    placeholder="Gupta Electronics"
                                    value={formData.businessName}
                                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                                />
                                <Building2 className="absolute left-5 top-1/2 -translate-y-1/2 text-text-sub" size={20} />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Mobile Number</label>
                            <div className="relative">
                                <input
                                    type="tel"
                                    pattern="[0-9]{10}"
                                    className="form-input pl-14"
                                    required
                                    placeholder="98XXXXXX10"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                />
                                <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-text-sub" size={20} />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-full py-5 text-lg group"
                            disabled={status === 'loading'}
                        >
                            {status === 'loading' ? 'Verifying...' : 'Request Access'}
                            <Send className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={20} />
                        </button>

                        <p className="text-[10px] text-center text-text-sub font-bold uppercase tracking-widest mt-4">
                            🛡️ No credit card required. Cancel anytime.
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

const FeatureRow = ({ icon, text }) => (
    <div className="flex items-center gap-4 text-text-dim font-bold text-sm">
        <div className="p-2 bg-primary-light rounded-lg">
            {icon}
        </div>
        {text}
    </div>
)

export default LeadForm
