// =========================================
// Execution Mock
// Mirrors: GET /execution/:actionId
// =========================================

const executions = {
    "ACTION:1": {
        id: "EXECUTION:1",
        actionId: "ACTION:1",
        entityType: "PURCHASE_ORDER",
        entityId: "PURCHASE_ORDER:1",
        executionSummary:
            "Approve Purchase Order PO-1045 to unblock downstream procurement and quality operations.",
        affectedEntities: [
            {
                entityType: "QUALITY_CHECK",
                entityId: "QUALITY_CHECK:1",
                reason: "Incoming inspection cannot begin until the purchase order is approved."
            },
            {
                entityType: "SHIPMENT",
                entityId: "SHIPMENT:1",
                reason: "Shipment scheduling depends on purchase order approval."
            }
        ],
        executionPlan: {
            summary:
                "Approve the purchase order and update its operational status.",
            updates: [
                {
                    entityType: "PURCHASE_ORDER",
                    entityId: "PURCHASE_ORDER:1",
                    field: "status",
                    currentValue: "Awaiting Approval",
                    requiredValue: "Approved"
                }
            ]
        }
    },
    "ACTION:2": {
        id: "EXECUTION:2",
        actionId: "ACTION:2",
        entityType: "SUPPLIER",
        entityId: "SUPPLIER:1",
        executionSummary:
            "Assign an alternate supplier capable of meeting the required delivery timeline.",
        affectedEntities: [
            {
                entityType: "BOM",
                entityId: "BOM:1",
                reason: "Material sourcing depends on supplier availability."
            },
            {
                entityType: "PROJECT",
                entityId: "PROJECT:1",
                reason: "Project schedule depends on procurement."
            }
        ],
        executionPlan: {
            summary:
                "Update the assigned supplier for the affected procurement workflow.",
            updates: [
                {
                    entityType: "SUPPLIER",
                    entityId: "SUPPLIER:1",
                    field: "status",
                    currentValue: "Operational",
                    requiredValue: "Reassigned"
                }
            ]
        }
    },

    "ACTION:3": {
        id: "EXECUTION:3",
        actionId: "ACTION:3",
        entityType: "SHIPMENT",
        entityId: "SHIPMENT:1",
        executionSummary:
            "Reschedule shipment delivery to restore downstream inventory availability.",
        affectedEntities: [
            {
                entityType: "INVENTORY",
                entityId: "INVENTORY:1",
                reason: "Inventory replenishment depends on shipment arrival."
            }
        ],
        executionPlan: {
            summary:
                "Update the shipment status after confirming the revised delivery schedule.",
            updates: [
                {
                    entityType: "SHIPMENT",
                    entityId: "SHIPMENT:1",
                    field: "status",
                    currentValue: "Delayed",
                    requiredValue: "Rescheduled"
                }
            ]
        }
    },
    "ACTION:4": {
        id: "EXECUTION:4",
        actionId: "ACTION:4",
        entityType: "QUALITY_CHECK",
        entityId: "QUALITY_CHECK:1",
        executionSummary:
            "Begin the incoming quality inspection to release inventory.",
        affectedEntities: [
            {
                entityType: "INVENTORY",
                entityId: "INVENTORY:1",
                reason: "Inventory cannot be released until inspection begins."
            }
        ],
        executionPlan: {
            summary:
                "Update inspection status to indicate execution has started.",
            updates: [
                {
                    entityType: "QUALITY_CHECK",
                    entityId: "QUALITY_CHECK:1",
                    field: "status",
                    currentValue: "Pending",
                    requiredValue: "In Progress"
                }
            ]
        }
    },
    "ACTION:5": {
        id: "EXECUTION:5",
        actionId: "ACTION:5",
        entityType: "MILESTONE",
        entityId: "MILESTONE:2",
        executionSummary:
            "Review and confirm the prototype build schedule before downstream planning.",
        affectedEntities: [
            {
                entityType: "PROJECT",
                entityId: "PROJECT:2",
                reason: "Project planning depends on milestone confirmation."
            }
        ],
        executionPlan: {
            summary:
                "Update milestone completion after schedule review.",
            updates: [
                {
                    entityType: "MILESTONE",
                  entityId: "MILESTONE:2",
                    field: "completion",
                    currentValue: 18,
                    requiredValue: 25
                }
            ]
        }
    }
};

export default executions;