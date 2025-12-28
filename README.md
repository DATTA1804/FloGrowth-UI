# SME Growth Toolkit 🚀

A production-ready frontend project designed to empower Indian SMEs with essential digital tools while demonstrating advanced Growth Engineering principles.

**Live Demo:** [sme-growth-toolkit.vercel.app](https://smegrowth.netlify.app/) (Replace with real URL after deployment)

## 🌟 Overview

Inspired by **FloBiz's myBillBook**, this toolkit provides a mobile-first, high-performance experience for small business owners. It's not just a collection of tools; it's a lead generation and conversion engine built with growth at its core.

## 🛠️ Key Features & Growth Mechanics

### 1. GST Calculator (Taxation Utility)
- **Growth Concept:** Value-based Acquisition.
- **Implementation:** Handles CGST, SGST, and IGST logic.
- **Conversion Hook:** Integrated A/B tested CTA below the result to drive users toward the core product (Billing Software).

### 2. Barcode Generator (Inventory Utility)
- **Growth Concept:** Tool-led Growth.
- **Implementation:** Generates downloadable PNG barcodes for SKUs/Product Names.
- **Viral Loop:** Encourages business owners to use the tool for their physical store inventory, creating a recurring use case.

### 3. Lead Capture & Automation
- **Growth Concept:** Funnel Optimization.
- **Implementation:** A high-conversion lead form with phone validation.
- **Automation:** Simulates webhook triggers for CRM integration (Salesforce/HubSpot).

### 4. A/B Testing System
- **Growth Concept:** Data-Driven Iteration.
- **Variants:**
  - **Variant A:** High-intent (Green) - "Start Free Billing"
  - **Variant B:** Utility-intent (Blue) - "Generate GST Invoice"
- **Analytics:** Tracks CTR for each variant to determine the winning copy for Indian SME demographics.

### 5. Analytics Dashboard
- **Growth Concept:** Full-Funnel Visibility.
- **Implementation:** Real-time tracking of Tool Usage -> Form Submission -> Conversion.
- **Visualization:** Includes funnel drop-off rates and A/B test performance meters.

## 🚀 Tech Stack

- **Frontend:** React 18, Vite (SWC), Framer Motion (Animations)
- **Icons:** Lucide-React
- **Styling:** Vanilla CSS3 (Custom Design System with Glassmorphism)
- **Analytics:** Custom LocalStorage-based Event Tracking Utility
- **Barcode:** JsBarcode

## 📈 Event Tracking Explanation

We use a centralized `trackEvent` utility to capture user behavior without affecting performance:
- `gst_calculate_clicked`: Tracks tool engagement.
- `lead_submitted`: Tracks intent.
- `lead_converted`: Tracks successful lead capture.
- `cta_variant_[A/B]_clicked`: Measures experiment performance.

## 🤖 AI Usage

- **Copywriting:** AI was used to generate persuasive CTA variants and landing page copy tailored for the Indian SME segment.
- **Development:** Built with AI-assisted pair programming for rapid prototyping and clean architecture.

## 💼 Why this fits the FloBiz Growth Engineer Role?

1. **Mobile-First Thinking:** Optimized for the "Kirana Store" owner on the go.
2. **Experimental Mindset:** Built-in A/B testing shows a commitment to "What works" vs "What looks good".
3. **Data-Centricity:** Every click is an event, and every event is an opportunity for optimization.
4. **Technical Excellence:** Clean, modular React code that is easy to scale and maintain.

---
Built with ❤️ for Indian SMEs.

