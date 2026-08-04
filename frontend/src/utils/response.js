// =========================================
// Common API Response Helpers
// Mirrors backend response envelope
// =========================================

export function success(data) {
    return {
        success: true,
        data,
        error: null
    };
}
export function failure(message) {
    return {
        success: false,
        data: null,
        error: {
            message
        }
    };
}