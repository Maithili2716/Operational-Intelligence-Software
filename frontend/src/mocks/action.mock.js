// =========================================
// Action Mock
// Mirrors: GET /action
// =========================================

const action = [
    {
        id: "ACTION:1",
        priority: "HIGH",
        category: "APPROVAL",
        entityType: "PURCHASE_ORDER",
        entityId: "PURCHASE_ORDER:1",
        title: "Approve Purchase Order",
        blockedEntitiesSummary:
            "Quality Check and Shipment cannot proceed until Purchase Order PO-1045 is approved.",
        createdAt: "2026-08-03T05:10:14Z"
    },
    {
        id: "ACTION:2",
        priority: "CRITICAL",
        category: "PROCUREMENT",
        entityType: "SUPPLIER",
        entityId: "SUPPLIER:1",
        title: "Assign Alternate Supplier",
        blockedEntitiesSummary:
            "BOM-1 procurement is blocked because the current supplier cannot meet the required delivery timeline.",
        createdAt: "2026-08-03T05:18:42Z"
    },
    {
        id: "ACTION:3",
        priority: "MEDIUM",
        category: "LOGISTICS",
        entityType: "SHIPMENT",
        entityId: "SHIPMENT:1",
        title: "Reschedule Shipment",
        blockedEntitiesSummary:
            "Warehouse replenishment depends on Shipment #1 arriving before the next production cycle.",
        createdAt: "2026-08-03T05:26:33Z"
    },
    {
        id: "ACTION:4",
        priority: "HIGH",
        category: "QUALITY",
        entityType: "QUALITY_CHECK",
        entityId: "QUALITY_CHECK:1",
        title: "Start Incoming Inspection",
        blockedEntitiesSummary:
            "Inventory release and production scheduling are waiting for inspection approval.",
        createdAt: "2026-08-03T05:31:09Z"
    },
    {
        id: "ACTION:5",
        priority: "LOW",
        category: "PLANNING",
        entityType: "MILESTONE",
        entityId: "MILESTONE:2",
        title: "Review Milestone Schedule",
        blockedEntitiesSummary:
            "Prototype Build milestone requires schedule confirmation before downstream planning can begin.",
        createdAt: "2026-08-03T05:39:21Z"
    }
];

export default action;