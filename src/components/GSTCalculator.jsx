import { useState } from 'react'
import { motion } from 'framer-motion'
import { trackEvent } from '../analytics/trackEvent'
import { Calculator, IndianRupee, Info } from 'lucide-react'
import ABTestCTA from './ABTestCTA'

const GSTCalculator = () => {
    const [amount, setAmount] = useState('')
    const [gstRate, setGstRate] = useState(18)
    const [gstType, setGstType] = useState('CGST_SGST')
    const [result, setResult] = useState(null)

    const calculateGST = () => {
        const amt = parseFloat(amount)
        if (isNaN(amt) || amt <= 0) return

        const gstAmount = (amt * gstRate) / 100
        const totalAmount = amt + gstAmount

        const newResult = {
            baseAmount: amt,
            gstRate,
            gstAmount,
            totalAmount,
            type: gstType
        }

        setResult(newResult)
        trackEvent('gst_calculate_clicked', { amount: amt, rate: gstRate, type: gstType })
    }

    return (
        <div className="card-saas h-full flex flex-col">
            <div className="flex items-center gap-6 mb-12">
                <div className="p-5 bg-primary-light rounded-[24px] text-primary">
                    <Calculator size={32} />
                </div>
                <div>
                    <h3 className="text-2xl font-bold mb-1">GST Calculator</h3>
                    <p className="text-sm text-text-dim">Instantly calculate your taxes accurately</p>
                </div>
            </div>

            <div className="space-y-10 flex-grow">
                <div className="form-group">
                    <label className="form-label">Initial Amount (₹)</label>
                    <div className="relative">
                        <input
                            type="number"
                            className="form-input pr-12"
                            placeholder="e.g. 10000"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                        <IndianRupee className="absolute right-4 top-1/2 -translate-y-1/2 text-text-sub" size={20} />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="form-group">
                        <label className="form-label">GST Tax Rate</label>
                        <select
                            className="form-input cursor-pointer"
                            value={gstRate}
                            onChange={(e) => setGstRate(parseInt(e.target.value))}
                        >
                            <option value="5">5% SGST/CGST</option>
                            <option value="12">12% Standard</option>
                            <option value="18">18% Default</option>
                            <option value="28">28% Luxury</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="form-label">Location Type</label>
                        <select
                            className="form-input cursor-pointer"
                            value={gstType}
                            onChange={(e) => setGstType(e.target.value)}
                        >
                            <option value="CGST_SGST">Intra-State</option>
                            <option value="IGST">Inter-State</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-5">
                    <button className="btn btn-primary w-full py-5" onClick={calculateGST}>
                        Calculate Total Bill
                    </button>
                    <ABTestCTA context="gst_calculator" compact={true} />
                </div>


                {result && (
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-12 p-10 bg-muted rounded-[32px] space-y-6"
                    >
                        <div className="flex justify-between items-center text-sm border-b border-black/5 pb-4">
                            <span className="text-text-dim font-medium">Net Value</span>
                            <span className="font-bold text-text-main">₹{result.baseAmount.toLocaleString('en-IN')}</span>
                        </div>
                        {result.type === 'CGST_SGST' ? (
                            <>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-text-dim font-medium">CGST ({result.gstRate / 2}%)</span>
                                    <span className="font-semibold text-text-main">₹{(result.gstAmount / 2).toLocaleString('en-IN')}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-text-dim font-medium">SGST ({result.gstRate / 2}%)</span>
                                    <span className="font-semibold text-text-main">₹{(result.gstAmount / 2).toLocaleString('en-IN')}</span>
                                </div>
                            </>
                        ) : (
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-text-dim font-medium">IGST ({result.gstRate}%)</span>
                                <span className="font-semibold text-text-main">₹{result.gstAmount.toLocaleString('en-IN')}</span>
                            </div>
                        )}
                        <div className="pt-6 flex justify-between items-end">
                            <div>
                                <p className="text-[11px] font-black text-primary uppercase tracking-widest mb-1">Grand Total</p>
                                <h4 className="text-5xl font-black text-text-main">₹{result.totalAmount.toLocaleString('en-IN')}</h4>
                            </div>
                            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-success/10 text-success rounded-full text-xs font-bold border border-success/10">
                                Correct
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    )
}

export default GSTCalculator
