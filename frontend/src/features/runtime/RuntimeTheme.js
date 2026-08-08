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
    PROJECT: "#06b6d4",          // Cyan
    BOM: "#8b5cf6",              // Violet
    MILESTONE: "#f59e0b",        // Amber
    SHIPMENT: "#f97316",         // Orange
    INVENTORY: "#3b82f6",        // Blue
    SUPPLIER: "#22c55e",         // Green
    PURCHASE_ORDER: "#ec4899",  // Pink
    QUALITY_CHECK: "#ef4444",    // Red

    DEPARTMENT: "#14b8a6",       // Teal
    MATERIAL: "#84cc16"   
};

export const GRAPH = {
    MIN_ZOOM: 0.8,
    MAX_ZOOM: 1.2,
    FIT_PADDING: 0.08
};

export const NODE_EDGE = {
    WIDTH: 170,
    HEIGHT: 72
};

export const RELATIONSHIP_LAYOUT = {

    PROCURES_MATERIAL: "vertical",

    STORED_IN: "vertical",

    USES_SUPPLIER: "horizontal",

    GENERATES_PURCHASE_ORDER: "horizontal",

    FULFILLED_BY_SHIPMENT: "horizontal",

    OWNED_BY: "vertical"

};