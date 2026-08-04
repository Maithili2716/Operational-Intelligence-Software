// =========================================
// Attention Mock
// Mirrors: GET /attention
// =========================================

const attention = [
    {
        id: "ATTENTION:1",
        severity: "HIGH",
        category: "RESOURCE",
        entityType: "INVENTORY",
        entityId: "INVENTORY:1",
        title: "Insufficient Inventory",
        summary:
            "Available quantity (40) is below required quantity (150).",
        detectedAt: "2026-08-03T04:10:11Z"
    },
    {
        id: "ATTENTION:2",
        severity: "CRITICAL",
        category: "DEPENDENCY",
        entityType: "SHIPMENT",
        entityId: "SHIPMENT:1",
        title: "Blocked Shipment",
        summary:
            "Shipment #1 is waiting for supplier dispatch confirmation.",
        detectedAt: "2026-08-03T04:18:24Z"
    },
    {
        id: "ATTENTION:3",
        severity: "MEDIUM",
        category: "SCHEDULE",
        entityType: "MILESTONE",
        entityId: "MILESTONE:1",
        title: "Milestone Delay",
        summary:
            "Procurement Phase is projected to miss its planned completion date.",
        detectedAt: "2026-08-03T04:24:39Z"
    },
    {
        id: "ATTENTION:4",
        severity: "HIGH",
        category: "QUALITY",
        entityType: "QUALITY_CHECK",
        entityId: "QUALITY_CHECK:1",
        title: "Inspection Pending",
        summary:
            "Incoming inspection has not started after shipment arrival.",
        detectedAt: "2026-08-03T04:30:15Z"
    },
    {
        id: "ATTENTION:5",
        severity: "LOW",
        category: "SUPPLIER",
        entityType: "SUPPLIER",
        entityId: "SUPPLIER:1",
        title: "Lead Time Increase",
        summary:
            "Supplier lead time has increased from 10 to 12 days.",
        detectedAt: "2026-08-03T04:36:48Z"
    }
];

export default attention;