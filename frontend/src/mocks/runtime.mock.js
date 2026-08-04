// =========================================
// Runtime Mock
// Mirrors: GET /runtime
// =========================================
const runtime = {
    graph: {
        nodes: [
            {
                id: "PROJECT:1",
                type: "PROJECT"
            },
            {
                id: "PROJECT:2",
                type: "PROJECT"
            },
            {
                id: "BOM:1",
                type: "BOM"
            },
            {
                id: "BOM:2",
                type: "BOM"
            },
            {
                id: "MILESTONE:1",
                type: "MILESTONE"
            },
            {
                id: "MILESTONE:2",
                type: "MILESTONE"
            },
            {
                id: "SUPPLIER:1",
                type: "SUPPLIER"
            },
            {
                id: "INVENTORY:1",
                type: "INVENTORY"
            },
            {
                id: "SHIPMENT:1",
                type: "SHIPMENT"
            },
            {
                id: "PURCHASE_ORDER:1",
                type: "PURCHASE_ORDER"
            },
            {
                id: "QUALITY_CHECK:1",
                type: "QUALITY_CHECK"
            }
        ],
        edges: [
            {
                from: "PROJECT:1",
                to: "BOM:1",
                relationship: "HAS_BOM"
            },
            {
                from: "PROJECT:1",
                to: "MILESTONE:1",
                relationship: "HAS"
            },
            {
                from: "BOM:1",
                to: "SUPPLIER:1",
                relationship: "REQUIRES"
            },
            {
                from: "SUPPLIER:1",
                to: "SHIPMENT:1",
                relationship: "DISPATCHES"
            },
            {
                from: "SHIPMENT:1",
                to: "INVENTORY:1",
                relationship: "DELIVERS_TO"
            },
            {
                from: "INVENTORY:1",
                to: "PURCHASE_ORDER:1",
                relationship: "ALLOCATED_TO"
            },
            {
                from: "PURCHASE_ORDER:1",
                to: "QUALITY_CHECK:1",
                relationship: "REQUIRES"
            },
            {
                from: "PROJECT:2",
                to: "BOM:2",
                relationship: "HAS_BOM"
            },
            {
                from: "PROJECT:2",
                to: "MILESTONE:2",
                relationship: "HAS"
            }
        ]
    },

    state: {
        "PROJECT:1": {
            name: "Project Alpha",
            status: "Running",
            progress: 62,
            owner: "Engineering",
            deadline: "2026-08-20"
        },
        "PROJECT:2": {
            name: "Warehouse Automation",
            status: "Planning",
            progress: 28,
            owner: "Operations",
            deadline: "2026-10-15"
        },
        "BOM:1": {
            name: "Motor Assembly",
            status: "Approved",
            revision: "B",
            components: 42
        },

        "BOM:2": {
            name: "Control Cabinet",
            status: "Draft",
            revision: "A",
            components: 31
        },
        "MILESTONE:1": {
            name: "Procurement Phase",
            status: "Delayed",
            completion: 74,
            plannedDate: "2026-08-10"
        },
        "MILESTONE:2": {
            name: "Prototype Build",
            status: "On Track",
            completion: 18,
            plannedDate: "2026-09-12"
        },
        "SUPPLIER:1": {
            name: "ABC Manufacturing",
            status: "Operational",
            rating: "A",
            leadTime: "12 Days"
        },

        "INVENTORY:1": {
            name: "Motor Inventory",
            status: "Low Stock",
            availableQuantity: 40,
            requiredQuantity: 150
        },

        "SHIPMENT:1": {
            name: "Shipment #1",
            status: "Delayed",
            carrier: "BlueDart Logistics",
            expectedArrival: "2026-08-02"
        },

        "PURCHASE_ORDER:1": {
            name: "PO-1045",
            status: "Awaiting Approval",
            supplier: "ABC Manufacturing",
            value: "₹14,80,000"
        },

        "QUALITY_CHECK:1": {
            name: "Incoming Inspection",
            status: "Pending",
            inspector: "Rohan Patil",
            priority: "High"
        }
    }
};

export default runtime;