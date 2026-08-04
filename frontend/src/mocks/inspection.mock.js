// =========================================
// Inspection Mock
// Mirrors: GET /inspection/:attentionId
// =========================================

const inspections = {
    "ATTENTION:1": {
        id: "INSPECTION:1",
        attentionId: "ATTENTION:1",
        entityType: "INVENTORY",
        entityId: "INVENTORY:1",
        rootCauseAnalysis: {
            summary:
                "Inventory demand exceeds the currently available stock.",
            cause:
                "The required quantity for the active purchase order is greater than the inventory currently allocated to Project Alpha.",
            confidence: "HIGH"
        },
        affectedEntities: [
            {
                entityType: "PROJECT",
                entityId: "PROJECT:1",
                reason: "Production schedule depends on inventory availability."
            },
            {
                entityType: "PURCHASE_ORDER",
                entityId: "PURCHASE_ORDER:1",
                reason: "Purchase order cannot proceed without sufficient inventory."
            }
        ],
        mitigationStrategy: {
            summary:
                "Increase available inventory by updating the inventory allocation before continuing procurement.",
            updates: [
                {
                    entityType: "INVENTORY",
                    entityId: "INVENTORY:1",
                    field: "availableQuantity",
                    currentValue: 40,
               requiredValue: 150
                }
            ]
        }
    },
    "ATTENTION:2": {
        id: "INSPECTION:2",
        attentionId: "ATTENTION:2",
        entityType: "SHIPMENT",
        entityId: "SHIPMENT:1",
        rootCauseAnalysis: {
            summary:
                "Shipment dispatch is blocked by supplier confirmation.",
            cause:
                "Supplier has not confirmed material dispatch.",
            confidence: "HIGH"
        },
        affectedEntities: [
            {
                entityType: "SUPPLIER",
                entityId: "SUPPLIER:1",
                reason: "Supplier confirmation is pending."
            },
            {
                entityType: "INVENTORY",
                entityId: "INVENTORY:1",
                reason: "Inventory replenishment depends on shipment arrival."
            }
        ],

        mitigationStrategy: {
            summary:
                "Confirm supplier dispatch and update shipment status.",
            updates: [
                {
                    entityType: "SHIPMENT",
                    entityId: "SHIPMENT:1",
                    field: "status",
                    currentValue: "Delayed",
                requiredValue: "In Transit"
                }
            ]
        }
    },
    "ATTENTION:3": {
        id: "INSPECTION:3",
        attentionId: "ATTENTION:3",
        entityType: "MILESTONE",
        entityId: "MILESTONE:1",
        rootCauseAnalysis: {
            summary:
                "Milestone completion has slipped because procurement activities are behind schedule.",
            cause:
                "Dependent procurement tasks remain incomplete.",
            confidence: "MEDIUM"
        },
        affectedEntities: [
            {
                entityType: "PROJECT",
                entityId: "PROJECT:1",
                reason: "Overall project schedule is affected."
            }
        ],

        mitigationStrategy: {
            summary:
                "Update milestone completion after procurement activities are completed.",
            updates: [
                {
                    entityType: "MILESTONE",
                    entityId: "MILESTONE:1",
                    field: "completion",
                    currentValue: 74,
                    requiredValue: 100
                }
            ]
        }
    },
    "ATTENTION:4": {
        id: "INSPECTION:4",
        attentionId: "ATTENTION:4",
        entityType: "QUALITY_CHECK",
        entityId: "QUALITY_CHECK:1",
        rootCauseAnalysis: {
            summary:
                "Incoming inspection has not been initiated.",
            cause:
                "Inspection resource has not been assigned.",
            confidence: "HIGH"
        },
        affectedEntities: [
            {
                entityType: "SHIPMENT",
                entityId: "SHIPMENT:1",
                reason: "Shipment cannot be released."
            }
        ],

        mitigationStrategy: {
            summary:
                "Assign inspector and begin inspection.",
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
    "ATTENTION:5": {
        id: "INSPECTION:5",
       attentionId: "ATTENTION:5",
      entityType: "SUPPLIER",
        entityId: "SUPPLIER:1",
        rootCauseAnalysis: {
            summary:
                "Supplier lead time has increased.",
            cause:
                "Supplier capacity has reduced temporarily.",
            confidence: "MEDIUM"
        },
        affectedEntities: [
            {
                entityType: "BOM",
                entityId: "BOM:1",
                reason: "Material procurement may be delayed."
            }
        ],
        mitigationStrategy: {
            summary:
                "Update supplier lead time after confirming revised delivery schedule.",
            updates: [
                {
                    entityType: "SUPPLIER",
                    entityId: "SUPPLIER:1",
                    field: "leadTime",
                    currentValue: "12 Days",
                  requiredValue: "10 Days"
                }
            ]
        }
    }
};

export default inspections;