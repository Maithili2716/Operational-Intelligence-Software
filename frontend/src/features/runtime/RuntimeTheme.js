// =========================================
// Runtime Theme
// Shared design tokens for Runtime Canvas
// =========================================

export const ACCENT = "#0891b2";   // cyan-600
export const NODE = {
    WIDTH: 170,
    HEIGHT: 58,
    BORDER_RADIUS: 12
};

export const LAYOUT = {
    // Space between dependency levels
    LEVEL_SPACING: 240,
    // Space between siblings
    NODE_SPACING: 130,
    // Space between root clusters
    CLUSTER_SPACING: 420,
    // Canvas padding
    PADDING_X: 80,
    PADDING_Y: 80
};

export const EDGE = {
    WIDTH: 1.5,
    HIGHLIGHT_WIDTH: 3,
    OPACITY: 0.45,
    FADED_OPACITY: 0.18,
    HIGHLIGHT_OPACITY: 1,
    HIGHLIGHT_COLOR: ACCENT,
    NORMAL_COLOR: "#475569"
};

export const ENTITY_COLORS = {
    PROJECT: "#06b6d4",
    BOM: "#8b5cf6",
    MILESTONE: "#f59e0b",
    SHIPMENT: "#f97316",
    INVENTORY: "#3b82f6",
    SUPPLIER: "#22c55e",
    PURCHASE_ORDER: "#ec4899",
    QUALITY_CHECK: "#ef4444"
};

export const GRAPH = {
    MIN_ZOOM: 0.8,
    MAX_ZOOM: 1.2,
    FIT_PADDING: 0.08
};