/**
 * Analytics utility for tracking user events and storing them locally.
 * In a real-world scenario, this would send data to Mixpanel, Segment, or PostHog.
 */

const STORAGE_KEY = 'sme_growth_analytics'

export const trackEvent = (eventName, params = {}) => {
    const timestamp = new Date().toISOString()
    const eventData = {
        eventName,
        timestamp,
        params,
        sessionId: getSessionId()
    }

    // Log to console for development visibility
    console.log(`[Analytics] ${eventName}`, eventData)

    // Store in localStorage for the "Dashboard" feature
    const existingEvents = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    existingEvents.push(eventData)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existingEvents))

    return eventData
}

export const getAnalyticsData = () => {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
}

export const clearAnalytics = () => {
    localStorage.removeItem(STORAGE_KEY)
}

// Simple session management
const getSessionId = () => {
    let sessionId = sessionStorage.getItem('sme_session_id')
    if (!sessionId) {
        sessionId = 'sess_' + Math.random().toString(36).substr(2, 9)
        sessionStorage.setItem('sme_session_id', sessionId)
    }
    return sessionId
}

export const getABVariant = (experimentName) => {
    const key = `ab_variant_${experimentName}`
    let variant = localStorage.getItem(key)

    if (!variant) {
        variant = Math.random() < 0.5 ? 'A' : 'B'
        localStorage.setItem(key, variant)
    }

    return variant
}
