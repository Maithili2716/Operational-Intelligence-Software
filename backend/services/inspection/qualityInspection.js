import {
    findReachableEntity,
    findReachableEntities
} from "./utils/runtimeGraphHelpers.js";


export function inspectQuality(attention, runtime) {

    switch (attention.title) {

        case "High Defect Rate":
            return inspectHighDefectRate(
                attention,
                runtime
            );

        case "Inspection Pending":
            return inspectInspectionPending(
                attention,
                runtime
            );

        case "Inspection Failure":
            return inspectInspectionFailure(
                attention,
                runtime
            );

        case "Inventory Not Updated":
            return inspectInventoryNotUpdated(
                attention,
                runtime
            );

        case "Supplier Not Notified":
            return inspectSupplierNotNotified(
                attention,
                runtime
            );

        default:
            return null;
    }
}


/*
===========================================================
HIGH DEFECT RATE
===========================================================
*/
 function inspectHighDefectRate(
    attention,
    runtime
) {

    const state =
        runtime.state.get(attention.entityId);

    if (!state)
        return null;

    const quality =
        state.quality;

    if (!quality)
        return null;


    const goodPieces =
        quality.goodPieces;

    const faultyPieces =
        quality.faultyPieces;


    if (
        goodPieces === undefined ||
        faultyPieces === undefined
    ) {
        return null;
    }


    const totalPieces =
        goodPieces + faultyPieces;


    if (totalPieces === 0)
        return null;


    const defectRate =
        faultyPieces / totalPieces;


    /*
     * Find the operational entities affected by
     * this quality inspection.
     */

    const shipment =
        findReachableEntity(
            attention.entityId,
            "SHIPMENT",
            runtime
        );


    const material =
        findReachableEntity(
            shipment?.entityId,
            "MATERIAL",
            runtime
        );


    const supplier =
        findReachableEntity(
            shipment?.entityId,
            "SUPPLIER",
            runtime
        );


    /*
     * Build the affected entity list.
     */

    const affectedEntities =
        findAffectedEntities(
            attention.entityId,
            runtime
        );


    /*
     * Actual database mutations.
     */

    const updates = null;


    if (shipment) {

        const shipmentState =
            runtime.state.get(
                shipment.entityId
            );


        const currentStatus =
            shipmentState?.status ??
            shipmentState?.schedule?.status;

    }


    return {

        entityType:
            attention.entityType,

        entityId:
            attention.entityId,


        rootCauseAnalysis: {

            summary:
                `The inspection detected a high defect rate of ${(defectRate * 100).toFixed(1)}%.`,

            cause:
                `${faultyPieces} out of ${totalPieces} inspected pieces were classified as faulty.`,

            confidence:
                "HIGH"
        },


        affectedEntities,


        mitigationStrategy: {

            summary:
                "Reject the affected shipment, quarantine the defective material, and notify the responsible supplier.",


            updates,


            manualActions: [

                ...(material
                    ? [{
                        type:
                            "QUARANTINE_MATERIAL",

                        entityType:
                            "MATERIAL",

                        entityId:
                            material.entityId,

                        description:
                            "Quarantine the material associated with the failed inspection and prevent it from being released into production."
                    }]
                    : []),


                ...(supplier
                    ? [{
                        type:
                            "NOTIFY_SUPPLIER",

                        entityType:
                            "SUPPLIER",

                        entityId:
                            supplier.entityId,

                        description:
                            "Notify the supplier about the quality failure and provide the inspection findings."
                    }]
                    : []),


                ...(supplier
                    ? [{
                        type:
                            "REVIEW_SUPPLIER",

                        entityType:
                            "SUPPLIER",

                        entityId:
                            supplier.entityId,

                        description:
                            "Review the supplier's quality performance and consider reducing the supplier rating based on the failed inspection."
                    }]
                    : [])
            ]
        }
    };
}


/*
===========================================================
INSPECTION PENDING
===========================================================
*/
 function inspectInspectionPending(
    attention,
    runtime
) {

    const state =
        runtime.state.get(attention.entityId);

    if (!state)
        return null;

    const quality =
        state.quality;

    if (!quality)
        return null;


    const status =
        quality.status;


    if (status !== "PENDING")
        return null;


    return {

        entityType:
            attention.entityType,

        entityId:
            attention.entityId,


        rootCauseAnalysis: {

            summary:
                "The incoming quality inspection has not yet started.",

            cause:
                "The inspection remains pending even though the associated shipment requires quality verification.",

            confidence:
                "HIGH"
        },


        affectedEntities:
            findAffectedEntities(
                attention.entityId,
                runtime
            ),


        mitigationStrategy: {

            summary:
                "Begin the incoming inspection so the shipment can be evaluated and released.",

            updates: [

                {
                    entityType:
                        attention.entityType,

                    entityId:
                        attention.entityId,

                    field:
                        "status",

                    currentValue:
                        status,

                    requiredValue:
                        "IN_PROGRESS",

                    steps: [
                        "Assign an inspector to the incoming shipment.",
                        "Verify that the shipment is available for inspection.",
                        "Start the incoming quality inspection.",
                        "Record the inspection results.",
                        "Verify that the inspection status is updated."
                    ]
                }

            ],

            manualActions: []
        }
    };
}


/*
===========================================================
INSPECTION FAILURE
===========================================================
*/

 function inspectInspectionFailure(
    attention,
    runtime
) {

    const state =
        runtime.state.get(attention.entityId);

    if (!state)
        return null;

    const quality =
        state.quality;

    if (!quality)
        return null;


    const status =
        quality.status;


    if (status !== "FAILED")
        return null;


    const shipment =
        findReachableEntity(
            attention.entityId,
            "SHIPMENT",
            runtime
        );


    const material =
        findReachableEntity(
            shipment?.entityId,
            "MATERIAL",
            runtime
        );


    const supplier =
        findReachableEntity(
            shipment?.entityId,
            "SUPPLIER",
            runtime
        );


    const affectedEntities =
        findAffectedEntities(
            attention.entityId,
            runtime
        );


    


    if (shipment) {

        const shipmentState =
            runtime.state.get(
                shipment.entityId
            );

    }


    return {

        entityType:
            attention.entityType,

        entityId:
            attention.entityId,


        rootCauseAnalysis: {

            summary:
                "The incoming quality inspection has failed.",

            cause:
                "The inspection result indicates that the inspected material did not satisfy the required quality conditions.",

            confidence:
                "HIGH"
        },


        affectedEntities,


        mitigationStrategy: {

            summary:
                "Reject the shipment, quarantine the affected material, and notify the supplier about the failed inspection.",

            updates:null,


            manualActions: [

                ...(material
                    ? [{
                        type:
                            "QUARANTINE_MATERIAL",

                        entityType:
                            "MATERIAL",

                        entityId:
                            material.entityId,

                        description:
                            "Quarantine the material associated with the failed inspection and prevent it from entering production."
                    }]
                    : []),


                ...(supplier
                    ? [{
                        type:
                            "NOTIFY_SUPPLIER",

                        entityType:
                            "SUPPLIER",

                        entityId:
                            supplier.entityId,

                        description:
                            "Notify the supplier about the failed quality inspection and provide the inspection findings."
                    }]
                    : [])
            ]
        }
    };
}


/*
===========================================================
INVENTORY NOT UPDATED
===========================================================
*/

function inspectInventoryNotUpdated(
    attention,
    runtime
) {

    const state =
        runtime.state.get(attention.entityId);

    if (!state)
        return null;

    const quality =
        state.quality;

    if (!quality)
        return null;


    const inventoryUpdateStatus =
        quality.inventoryUpdateStatus;


    if (
        inventoryUpdateStatus === undefined ||
        inventoryUpdateStatus === null
    ) {
        return null;
    }


    if (
        inventoryUpdateStatus === "UPDATED" ||
        inventoryUpdateStatus === "COMPLETED"
    ) {
        return null;
    }


    return {

        entityType:
            attention.entityType,

        entityId:
            attention.entityId,


        rootCauseAnalysis: {

            summary:
                "The quality inspection has completed but the corresponding inventory update has not been completed.",

            cause:
                `Inventory update status is currently ${inventoryUpdateStatus}.`,

            confidence:
                "HIGH"
        },


        affectedEntities:
            findAffectedEntities(
                attention.entityId,
                runtime
            ),


        mitigationStrategy: {

            summary:
                "Update inventory using the verified inspection result before releasing the material.",

            updates: [

                {
                    entityType:
                        attention.entityType,

                    entityId:
                        attention.entityId,

                    field:
                        "inventoryUpdateStatus",

                    currentValue:
                        inventoryUpdateStatus,

                    requiredValue:
                        "COMPLETED",

                    steps: [
                        "Verify the final inspection result.",
                        "Confirm the quantity approved for inventory.",
                        "Update the corresponding inventory record.",
                        "Mark the inspection inventory update as completed.",
                        "Verify that inventory reflects the inspection result."
                    ]
                }

            ],

            manualActions: []
        }
    };
}


/*
===========================================================
SUPPLIER NOT NOTIFIED
===========================================================
*/

function inspectSupplierNotNotified(
    attention,
    runtime
) {

    const state =
        runtime.state.get(attention.entityId);

    if (!state)
        return null;

    const quality =
        state.quality;

    if (!quality)
        return null;


    const notificationStatus =
        quality.notificationStatus;


    if (
        notificationStatus === undefined ||
        notificationStatus === null
    ) {
        return null;
    }


    if (
        notificationStatus === "NOTIFIED" ||
        notificationStatus === "COMPLETED"
    ) {
        return null;
    }


    const supplier =
        findReachableEntity(
            attention.entityId,
            "SUPPLIER",
            runtime
        );


    return {

        entityType:
            attention.entityType,

        entityId:
            attention.entityId,


        rootCauseAnalysis: {

            summary:
                "The supplier has not been notified about the quality inspection result.",

            cause:
                `Supplier notification status is currently ${notificationStatus}.`,

            confidence:
                "MEDIUM"
        },


        affectedEntities:
            findAffectedEntities(
                attention.entityId,
                runtime
            ),


        mitigationStrategy: {

            summary:
                "Notify the responsible supplier about the inspection result.",

            updates: [

                {
                    entityType:
                        attention.entityType,

                    entityId:
                        attention.entityId,

                    field:
                        "notificationStatus",

                    currentValue:
                        notificationStatus,

                    requiredValue:
                        "NOTIFIED",

                    steps: [
                        "Review the final inspection result.",
                        "Identify the supplier associated with the inspected shipment.",
                        "Notify the supplier about the inspection result.",
                        "Record the supplier notification.",
                        "Verify that the notification status is updated."
                    ]
                }

            ],

            manualActions: [

                ...(supplier
                    ? [{
                        type:
                            "NOTIFY_SUPPLIER",

                        entityType:
                            "SUPPLIER",

                        entityId:
                            supplier.entityId,

                        description:
                            "Inform the supplier about the quality inspection result and provide the relevant findings."
                    }]
                    : [])
            ]
        }
    };
}


/*
===========================================================
AFFECTED ENTITIES
===========================================================
*/

function findAffectedEntities(
    entityId,
    runtime
) {

    const entityTypes = [
        "SHIPMENT",
        "INVENTORY",
        "PURCHASE_ORDER",
        "SUPPLIER",
        "MATERIAL"
    ];


    const affectedEntities = [];


    for (const entityType of entityTypes) {

        const entities =
            findReachableEntities(
                entityId,
                entityType,
                runtime
            );


        for (const entity of entities) {

            affectedEntities.push({

                entityType:
                    entity.entityType,

                entityId:
                    entity.entityId,

                reason:
                    `${entity.entityType} is operationally connected to ${entityId} and may be affected by the quality inspection.`
            });
        }
    }


    return affectedEntities;
}