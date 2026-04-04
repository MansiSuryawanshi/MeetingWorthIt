/**
 * Demo mode utilities.
 * Checks the VITE_APP_MODE env var and provides helpers for the demo flow.
 */

import DEMO_VERDICTS from '../data/demoVerdicts'

/**
 * Returns true when the app is launched in demo mode via environment variable.
 * Usage: `VITE_APP_MODE=demo` in .env or `vite --mode demo` with .env.demo
 */
export function isDemoEnv() {
  return import.meta.env.VITE_APP_MODE === 'demo'
}

/**
 * Returns the prebuilt mock verdict for a given demo scenario ID.
 * Falls back to the weekly-product-sync verdict if the ID is unknown.
 */
export function getDemoVerdict(scenarioId) {
  return DEMO_VERDICTS[scenarioId] || DEMO_VERDICTS['weekly-product-sync']
}
