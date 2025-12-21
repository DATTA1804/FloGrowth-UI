import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { trackEvent } from '../analytics/trackEvent'
import { Barcode, Download, Box, Layers, RefreshCw } from 'lucide-react'
import JsBarcode from 'jsbarcode'
import ABTestCTA from './ABTestCTA'

const BarcodeGenerator = () => {
    const [sku, setSku] = useState('')
    const [productName, setProductName] = useState('')
    const [generated, setGenerated] = useState(false)
    const barcodeRef = useRef(null)

    const generateBarcode = () => {
        if (!sku) return

        setGenerated(true)
        trackEvent('barcode_generated', { sku, productName })

        setTimeout(() => {
            if (barcodeRef.current) {
                JsBarcode(barcodeRef.current, sku, {
                    format: "CODE128",
                    lineColor: "#0f172a",
                    width: 2.2,
                    height: 60,
                    displayValue: true,
                    background: "#ffffff",
                    fontSize: 14,
                    margin: 15
                })
            }
        }, 10)
    }

    const downloadBarcode = () => {
        if (!barcodeRef.current) return

        const canvas = barcodeRef.current
        const url = canvas.toDataURL("image/png")
        const link = document.createElement('a')
        link.download = `barcode-${sku}.png`
        link.href = url
        link.click()

        trackEvent('barcode_downloaded', { sku })
    }

    return (
        <div className="card-saas h-full flex flex-col group">
            <div className="flex items-center gap-6 mb-12">
                <div className="p-5 bg-primary-light rounded-[24px] text-primary">
                    <Barcode size={32} />
                </div>
                <div>
                    <h3 className="text-2xl font-bold mb-1">Stock Tags</h3>
                    <p className="text-sm text-text-dim">Generate labels for your inventory</p>
                </div>
            </div>

            <div className="space-y-10 flex-grow">
                <div className="form-group">
                    <label className="form-label">Item Description</label>
                    <div className="relative">
                        <input
                            type="text"
                            className="form-input pr-12"
                            placeholder="e.g. Masala Tea 250g"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                        />
                        <Box className="absolute right-4 top-1/2 -translate-y-1/2 text-text-sub" size={20} />
                    </div>
                </div>

                <div className="form-group">
                    <label className="form-label">Product SKU / EAN</label>
                    <div className="relative">
                        <input
                            type="text"
                            className="form-input pr-12"
                            placeholder="e.g. SKU-1002-LTD"
                            value={sku}
                            onChange={(e) => setSku(e.target.value)}
                        />
                        <Layers className="absolute right-4 top-1/2 -translate-y-1/2 text-text-sub" size={20} />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-5">
                    <button className="btn btn-primary w-full py-5" onClick={generateBarcode}>
                        Generate Label
                    </button>
                    <ABTestCTA context="barcode_generator" compact={true} />
                </div>

                {generated && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-12 flex flex-col items-center"
                    >
                        <div className="bg-white p-10 rounded-[32px] border border-black/5 shadow-premium overflow-hidden">
                            <canvas ref={barcodeRef}></canvas>
                        </div>

                        <button
                            className="btn btn-secondary mt-10 w-full py-4 text-sm font-bold"
                            onClick={downloadBarcode}
                        >
                            <Download size={18} />
                            Download PNG Asset
                        </button>
                    </motion.div>
                )}
            </div>

        </div>
    )
}

export default BarcodeGenerator
