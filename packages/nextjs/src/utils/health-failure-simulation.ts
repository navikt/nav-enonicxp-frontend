// --- TEMPORARY: Shared state for health failure simulation ---
// Remove this file when testing is complete.

const HEALTH_FAILURE_TEST_ENVS = new Set(['localhost', 'dev1', 'dev2', 'dev3']);
const DEFAULT_SIMULATION_TTL_MS = 120000;

let simulateFailureUntil = 0;

const getSimulationTtlMs = () => {
    const configuredTtlMs = Number(process.env.HEALTH_FAILURE_SIMULATION_TTL_MS);
    return Number.isFinite(configuredTtlMs) && configuredTtlMs > 0
        ? configuredTtlMs
        : DEFAULT_SIMULATION_TTL_MS;
};

export function isHealthFailureSimulationEnabled() {
    return HEALTH_FAILURE_TEST_ENVS.has(process.env.ENV || '');
}

export function triggerHealthFailure() {
    const ttlMs = getSimulationTtlMs();
    simulateFailureUntil = Date.now() + ttlMs;
    return ttlMs;
}

export function isHealthFailureSimulated() {
    return Date.now() < simulateFailureUntil;
}
