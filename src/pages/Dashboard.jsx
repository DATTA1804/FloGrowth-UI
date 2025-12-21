import { useState, useEffect } from 'react'
import { getAnalyticsData, clearAnalytics } from '../analytics/trackEvent'
import {
    BarChart3,
    Users,
    Target,
    Trash2,
    AlertCircle,
    TrendingUp,
    Zap,
    ChevronRight,
    Activity,
    ArrowUpRight
} from 'lucide-react'
import { motion } from 'framer-motion'

const Dashboard = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        setData(getAnalyticsData())
    }, [])

    const stats = {
        totalToolsUsed: data.filter(e => ['gst_calculate_clicked', 'barcode_generated'].includes(e.eventName)).length,
        totalLeads: data.filter(e => e.eventName === 'lead_converted').length,
        leadConversionRate: 0,
        ctaClicksA: data.filter(e => e.eventName === 'cta_variant_A_clicked').length,
        ctaClicksB: data.filter(e => e.eventName === 'cta_variant_B_clicked').length,
    }

    const leadSubmissions = data.filter(e => e.eventName === 'lead_submitted').length
    stats.leadConversionRate = leadSubmissions > 0 ? ((stats.totalLeads / leadSubmissions) * 100).toFixed(1) : 0

    const bestVariant = stats.ctaClicksA > stats.ctaClicksB ? 'A' : (stats.ctaClicksB > stats.ctaClicksA ? 'B' : 'Tie')

    const handleClear = () => {
        if (confirm('Are you sure you want to clear all analytics data?')) {
            clearAnalytics()
            setData([])
        }
    }

    return (
        <div className="section pt-40 min-h-screen bg-muted/30">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-20"
                >
                    <div>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-light text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-primary/10">
                            <Activity size={14} />
                            Growth Performance
                        </div>
                        <h1 className="text-5xl font-black mb-4 tracking-tighter">Strategic Metrics</h1>
                        <p className="text-xl text-text-dim max-w-2xl font-medium">Monitoring user behavior and conversion velocity across the suite.</p>
                    </div>
                    <button className="btn btn-secondary text-danger border-danger/10 hover:bg-danger/5" onClick={handleClear}>
                        <Trash2 size={18} />
                        Reset Insights
                    </button>
                </motion.div>

                {/* Global Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-20">
                    <DashboardStat
                        title="Total Tools Used"
                        value={stats.totalToolsUsed}
                        icon={<Zap />}
                        delay={0.1}
                        color="text-primary"
                    />
                    <DashboardStat
                        title="Leads Converted"
                        value={stats.totalLeads}
                        icon={<Users />}
                        delay={0.2}
                        color="text-secondary"
                    />
                    <DashboardStat
                        title="Conversion Rate"
                        value={`${stats.leadConversionRate}%`}
                        icon={<Target />}
                        delay={0.3}
                        color="text-success"
                    />
                    <DashboardStat
                        title="Optimum Path"
                        value={`Variant ${bestVariant}`}
                        icon={<TrendingUp />}
                        delay={0.4}
                        color="text-accent"
                    />
                </div>

                <div className="grid lg:grid-cols-3 gap-16">
                    {/* Recent Events */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                        className="lg:col-span-1 card-saas flex flex-col h-[700px] border-none shadow-premium"
                    >
                        <div className="flex items-center justify-between mb-12">
                            <h3 className="text-xl font-bold flex items-center gap-3">
                                <BarChart3 size={24} className="text-primary" />
                                Live Log Stream
                            </h3>
                            <div className="flex h-3 w-3 rounded-full bg-success animate-pulse" />
                        </div>
                        <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar flex-grow">
                            {data.length === 0 ? (
                                <div className="text-center py-32 opacity-20">
                                    <AlertCircle className="mx-auto mb-6" size={64} />
                                    <p className="text-sm font-black uppercase tracking-widest">Awaiting Interactions</p>
                                </div>
                            ) : (
                                data.slice().reverse().map((event, i) => (
                                    <div key={i} className="p-6 bg-muted rounded-[24px] border border-black/5 hover:border-primary/20 transition-all group">
                                        <div className="flex justify-between items-start mb-3">
                                            <span className="font-black text-[10px] text-primary uppercase tracking-widest">{event.eventName}</span>
                                            <span className="text-[10px] text-text-sub font-bold">{new Date(event.timestamp).toLocaleTimeString()}</span>
                                        </div>
                                        <div className="text-[11px] text-text-dim flex items-center gap-2 font-medium">
                                            <span className="bg-white px-2 py-0.5 rounded-lg border border-black/5">SID: {event.sessionId.slice(-6)}</span>
                                            <ChevronRight size={14} className="text-text-sub" />
                                            <span>{event.params.context || 'general'}</span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </motion.div>

                    {/* Detailed Experiment Analysis */}
                    <div className="lg:col-span-2 space-y-16">
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 }}
                            className="card-saas h-full border-none shadow-premium"
                        >
                            <h3 className="text-3xl font-black mb-4 tracking-tighter">A/B Optimization Analysis</h3>
                            <p className="text-text-dim mb-16 text-lg font-medium">Measuring engagement variance between primary CTA styles.</p>

                            <div className="space-y-16">
                                <ABVisualization
                                    variant="Variant A"
                                    desc="Direct Value Messaging (Green)"
                                    count={stats.ctaClicksA}
                                    total={stats.ctaClicksA + stats.ctaClicksB}
                                    color="bg-success"
                                />
                                <ABVisualization
                                    variant="Variant B"
                                    desc="Utility Focused Messaging (Blue)"
                                    count={stats.ctaClicksB}
                                    total={stats.ctaClicksA + stats.ctaClicksB}
                                    color="bg-primary"
                                />
                            </div>

                            <div className="mt-24 pt-16 border-t border-black/5">
                                <h4 className="text-xs font-black uppercase tracking-[0.2em] text-text-sub mb-10 text-center">Conversion Velocity stages</h4>
                                <div className="grid grid-cols-3 gap-8">
                                    <VelocityStep count={stats.totalToolsUsed} label="Awareness" />
                                    <VelocityStep count={leadSubmissions} label="Consideration" />
                                    <VelocityStep count={stats.totalLeads} label="Conversion" highlight />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const DashboardStat = ({ title, value, icon, delay, color }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay }}
        className="card-saas p-10 border-none shadow-premium"
    >
        <div className={`p-4 bg-muted rounded-2xl w-fit mb-8 ${color}`}>
            {icon}
        </div>
        <p className="text-[10px] font-black text-text-sub uppercase tracking-widest mb-3">{title}</p>
        <h4 className="text-5xl font-black mb-2 tracking-tighter text-text-main">{value}</h4>
        <p className="text-[11px] font-bold text-success flex items-center gap-1">
            <ArrowUpRight size={14} />
            Real-time active
        </p>
    </motion.div>
)

const ABVisualization = ({ variant, desc, count, total, color }) => {
    const percentage = total > 0 ? Math.round((count / total) * 100) : 0
    return (
        <div>
            <div className="flex justify-between items-end mb-6">
                <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-primary mb-2 block">{variant}</span>
                    <span className="text-xl font-bold text-text-main">{desc}</span>
                </div>
                <div className="text-right">
                    <span className="text-3xl font-black">{count}</span>
                    <span className="text-sm text-text-sub font-black ml-3">({percentage}%)</span>
                </div>
            </div>
            <div className="w-full h-4 bg-muted rounded-full overflow-hidden border border-black/5 p-1">
                <motion.div
                    className={`h-full rounded-full ${color}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1.8, ease: 'circOut' }}
                />
            </div>
        </div>
    )
}

const VelocityStep = ({ count, label, highlight }) => (
    <div className={`text-center p-10 rounded-[40px] border-2 transition-all ${highlight ? 'bg-primary text-white border-primary shadow-xl scale-110 translate-y-[-10px]' : 'bg-white border-black/5 opacity-40'}`}>
        <div className="text-4xl font-black mb-2">{count}</div>
        <div className="text-[10px] font-black uppercase tracking-widest">{label}</div>
    </div>
)

export default Dashboard
