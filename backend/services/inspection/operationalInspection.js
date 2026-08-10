import {
    findReachableEntities
} from "./utils/runtimeGraphHelpers.js";


export function inspectOperational(attention, runtime) {

    switch (attention.title) {

        case "Unexpected Status":
            return inspectUnexpectedStatus(
                attention,
                runtime
            );

        case "State Conflict":
            return inspectStateConflict(
                attention,
                runtime
            );

        case "Impossible Values":
            return inspectImpossibleValues(
                attention,
                runtime
            );

        default:
            return null;
    }
}


/*
===========================================================
UNEXPECTED STATUS
===========================================================
*/

function inspectUnexpectedStatus(
    attention,
    runtime
) {

    const state =
        runtime.state.get(
            attention.entityId
        );

    if (!state)
        return null;


    const currentStatus =
        state.schedule?.status ??
        state.quality?.status ??
        state.resource?.status ??
        state.status;


    if (!currentStatus)
        return null;


    return {

        entityType:
            attention.entityType,

        entityId:
            attention.entityId,


        rootCauseAnalysis: {

            summary:
                "The entity is currently in a status that is inconsistent with its expected operational state.",

            cause:
                `The current status is ${currentStatus}, which does not match the expected operational state.`,

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
                "Review the entity state and update the status to the correct operational state.",

            updates: [

                {
                    entityType:
                        attention.entityType,

                    entityId:
                        attention.entityId,

                    field:
                        "status",

                    currentValue:
                        currentStatus,

                    requiredValue:
                        "EXPECTED_STATUS",

                    steps: [
                        "Review the current operational state.",
                        "Identify the status that the entity should have.",
                        "Validate the status against the entity's operational conditions.",
                        "Update the entity status.",
                        "Verify that the resulting state is consistent."
                    ]
                }

            ],

            manualActions: []
        }
    };
}


/*
===========================================================
STATE CONFLICT
===========================================================
*/

function inspectStateConflict(
    attention,
    runtime
) {

    const state =
        runtime.state.get(
            attention.entityId
        );

    if (!state)
        return null;


    const currentStatus =
        state.schedule?.status ??
        state.quality?.status ??
        state.resource?.status ??
        state.status;


    const affectedEntities =
        findAffectedEntities(
            attention.entityId,
            runtime
        );


    return {

        entityType:
            attention.entityType,

        entityId:
            attention.entityId,


        rootCauseAnalysis: {

            summary:
                "Different parts of the operational state contain conflicting information.",

            cause:
                `The entity currently reports the operational status as ${currentStatus ?? "UNKNOWN"}, while another state condition conflicts with it.`,

            confidence:
                "HIGH"
        },


        affectedEntities,


        mitigationStrategy: {

            summary:
                "Review the conflicting state values and reconcile the entity into one consistent operational state.",

            updates: [],

            manualActions: [

                {
                    type:
                        "RESOLVE_STATE_CONFLICT",

                    entityType:
                        attention.entityType,

                    entityId:
                        attention.entityId,

                    description:
                        "Review the conflicting state values, determine the authoritative value, update the inconsistent data, and verify that the entity state is internally consistent."
                }

            ]
        }
    };
}


/*
===========================================================
IMPOSSIBLE VALUES
===========================================================
*/

function inspectImpossibleValues(
    attention,
    runtime
) {

    const state =
        runtime.state.get(
            attention.entityId
        );

    if (!state)
        return null;


    const invalidFields =
        findImpossibleFields(
            state
        );


    if (invalidFields.length === 0)
        return null;


    const affectedEntities =
        findAffectedEntities(
            attention.entityId,
            runtime
        );


    const updates =
        invalidFields.map(
            field => ({

                entityType:
                    attention.entityType,

                entityId:
                    attention.entityId,

                field:
                    field.name,

                currentValue:
                    field.currentValue,

                requiredValue:
                    field.requiredValue,

                steps: [
                    `Review the invalid value for ${field.name}.`,
                    "Determine the correct value using the entity's operational context.",
                    `Replace ${field.name} with a valid value.`,
                    "Validate the updated value.",
                    "Verify that the entity state is operationally consistent."
                ]
            })
        );


    return {

        entityType:
            attention.entityType,

        entityId:
            attention.entityId,


        rootCauseAnalysis: {

            summary:
                "One or more values in the operational state violate the valid range or expected constraints.",

            cause:
                `Invalid values detected in: ${invalidFields.map(
                    field => field.name
                ).join(", ")}.`,

            confidence:
                "HIGH"
        },


        affectedEntities,


        mitigationStrategy: {

            summary:
                "Correct the invalid operational values and verify that the entity state satisfies its constraints.",

            updates,

            manualActions: []
        }
    };
}


/*
===========================================================
FIND IMPOSSIBLE VALUES
===========================================================
*/
 function findImpossibleFields(
    state
) {

    const invalidFields = [];


    /*
     * Progress
     */

    const progress =
        state.schedule?.progress ??
        state.progress;


    if (
        progress !== undefined &&
        progress !== null &&
        (
            progress < 0 ||
            progress > 100
        )
    ) {

        invalidFields.push({

            name:
                "progress",

            currentValue:
                progress,

            requiredValue:
                "0-100"
        });
    }


    /*
     * Completion
     */

    const completion =
        state.schedule?.completion ??
        state.completion;


    if (
        completion !== undefined &&
        completion !== null &&
        (
            completion < 0 ||
            completion > 100
        )
    ) {

        invalidFields.push({

            name:
                "completion",

            currentValue:
                completion,

            requiredValue:
                "0-100"
        });
    }


    /*
     * Inventory quantities
     */

    const available =
        state.resource?.availableQuantity ??
        state.availableQuantity;


    const required =
        state.resource?.requiredQuantity ??
        state.requiredQuantity;


    if (
        available !== undefined &&
        available !== null &&
        available < 0
    ) {

        invalidFields.push({

            name:
                "availableQuantity",

            currentValue:
                available,

            requiredValue:
                ">= 0"
        });
    }


    if (
        required !== undefined &&
        required !== null &&
        required < 0
    ) {

        invalidFields.push({

            name:
                "requiredQuantity",

            currentValue:
                required,

            requiredValue:
                ">= 0"
        });
    }


    /*
     * Inventory consistency
     */

    if (
        available !== undefined &&
        required !== undefined &&
        available > required * 1000
    ) {

        invalidFields.push({

            name:
                "availableQuantity",

            currentValue:
                available,

            requiredValue:
                "Operationally valid inventory quantity"
        });
    }


    return invalidFields;
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
        "PROJECT",
        "MILESTONE",
        "BOM",
        "PROCUREMENT",
        "PURCHASE_ORDER",
        "SHIPMENT",
        "QUALITY_INSPECTION",
        "WORK_ORDER",
        "INVENTORY",
        "SUPPLIER",
        "MATERIAL",
        "WAREHOUSE"
    ];


    const affectedEntities = [];


    for (const entityType of entityTypes) {

        const entities =
            findReachableEntities(
                entityId,
                entityType,
                runtime,
                2
            );


        for (const entity of entities) {

            affectedEntities.push({

                entityType:
                    entity.entityType,

                entityId:
                    entity.entityId,

                reason:
                    `${entity.entityType} is operationally connected to ${entityId} and may be affected by the operational anomaly.`
            });
        }
    }


    return affectedEntities;
}