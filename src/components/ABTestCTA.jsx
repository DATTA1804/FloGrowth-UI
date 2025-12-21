import { useState, useEffect } from 'react'
import { trackEvent, getABVariant } from '../analytics/trackEvent'
import { ArrowRight, FileText, Zap } from 'lucide-react'

const ABTestCTA = ({ context = 'general', compact = false }) => {
    const [variant, setVariant] = useState(null)

    useEffect(() => {
        setVariant(getABVariant('cta_button_v1'))
    }, [])

    const handleClick = () => {
        trackEvent(`cta_variant_${variant}_clicked`, { context })
        alert(`Growth Insight: You clicked Variant ${variant}! In a real scenario, this helps us optimize conversion.`)
    }

    if (!variant) return null

    return (
        <div className={`w-full flex flex-col items-center`}>
            {variant === 'A' ? (
                <button
                    onClick={handleClick}
                    className="btn btn-primary w-full group relative overflow-hidden"
                >
                    <Zap size={18} />
                    <span>Start Free Billing</span>
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                </button>
            ) : (
                <button
                    onClick={handleClick}
                    className="btn btn-primary w-full group relative overflow-hidden"
                >
                    <FileText size={18} />
                    <span>Generate GST Invoice</span>
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                </button>
            )}
            {!compact && (
                <p className="text-[10px] text-text-sub mt-3 uppercase tracking-widest font-bold opacity-60">
                    Active Experiment: Type {variant}
                </p>
            )}
        </div>
    )
}

export default ABTestCTA
