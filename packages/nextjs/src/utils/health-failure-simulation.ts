// --- TEMPORARY: Shared state for health failure simulation ---
// Remove this file when testing is complete.

let simulateFailure = false;

export function triggerHealthFailure() {
    simulateFailure = true;
}

export function isHealthFailureSimulated() {
    return simulateFailure;
}
