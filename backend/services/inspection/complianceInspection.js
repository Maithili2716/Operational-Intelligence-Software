import {
    findReachableEntities
} from "./utils/runtimeGraphHelpers.js";


export function inspectCompliance(attention, runtime) {

    switch (attention.title) {

        case "Missing Approval":
            return inspectMissingApproval(
                attention,
                runtime
            );

        case "Missing Owner":
            return inspectMissingOwner(
                attention,
                runtime
            );

        case "Missing Mandatory Data":
            return inspectMissingMandatoryData(
                attention,
                runtime
            );

        default:
            return null;
    }
}


/*
===========================================================
MISSING APPROVAL
===========================================================
*/

function inspectMissingApproval(
    attention,
    runtime
) {

    const state =
        runtime.state.get(
            attention.entityId
        );

    if (!state)
        return null;


    const compliance =
        state.compliance;

    if (!compliance)
        return null;


    const currentApprovalStatus =
        compliance.approvalStatus;


    if (
        currentApprovalStatus === "APPROVED"
    ) {
        return null;
    }


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
                "The entity has not received the required approval.",

            cause:
                `The current approval status is ${currentApprovalStatus ?? "NOT SET"}.`,

            confidence:
                "HIGH"
        },


        affectedEntities,


        mitigationStrategy: {

            summary:
                "Complete the required approval before allowing dependent operations to proceed.",

            updates: [

                {
                    entityType:
                        attention.entityType,

                    entityId:
                        attention.entityId,

                    field:
                        "approvalStatus",

                    currentValue:
                        currentApprovalStatus,

                    requiredValue:
                        "APPROVED",

                    steps: [
                        "Review the entity and its required approval information.",
                        "Verify that all approval prerequisites are satisfied.",
                        "Obtain approval from the authorized owner or approver.",
                        "Update the approval status to APPROVED.",
                        "Verify that the approval has been recorded."
                    ]
                }

            ],

            manualActions: []
        }
    };
}


/*
===========================================================
MISSING OWNER
===========================================================
*/

function inspectMissingOwner(
    attention,
    runtime
) {

    const state =
        runtime.state.get(
            attention.entityId
        );

    if (!state)
        return null;


    const compliance =
        state.compliance;

    if (!compliance)
        return null;


    const currentOwner =
        compliance.owner;


    if (currentOwner)
        return null;


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
                "The entity does not have an owner assigned.",

            cause:
                "The compliance state does not contain an assigned owner.",

            confidence:
                "HIGH"
        },


        affectedEntities,


        mitigationStrategy: {

            summary:
                "Assign an accountable owner to the entity before continuing dependent operations.",

            updates: [

                {
                    entityType:
                        attention.entityType,

                    entityId:
                        attention.entityId,

                    field:
                        "owner",

                    currentValue:
                        currentOwner ?? null,

                    requiredValue:
                        "ASSIGNED_OWNER",

                    steps: [
                        "Identify the department or individual responsible for the entity.",
                        "Confirm that the selected owner is authorized to manage the entity.",
                        "Assign the owner.",
                        "Verify that the owner assignment has been recorded."
                    ]
                }

            ],

            manualActions: []
        }
    };
}


/*
===========================================================
MISSING MANDATORY DATA
===========================================================
*/

function inspectMissingMandatoryData(
    attention,
    runtime
) {

    const state =
        runtime.state.get(
            attention.entityId
        );

    if (!state)
        return null;


    const compliance =
        state.compliance;

    if (!compliance)
        return null;


    const mandatoryFieldsComplete =
        compliance.mandatoryFieldsComplete;


    if (
        mandatoryFieldsComplete === true
    ) {
        return null;
    }


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
                "One or more mandatory fields required for the entity are incomplete.",

            cause:
                "The compliance state indicates that mandatory data requirements have not been satisfied.",

            confidence:
                "HIGH"
        },


        affectedEntities,


        mitigationStrategy: {

            summary:
                "Complete the required mandatory data before allowing the entity to proceed.",

            updates: [

                {
                    entityType:
                        attention.entityType,

                    entityId:
                        attention.entityId,

                    field:
                        "mandatoryFieldsComplete",

                    currentValue:
                        mandatoryFieldsComplete,

                    requiredValue:
                        true,

                    steps: [
                        "Identify which mandatory fields are incomplete.",
                        "Collect the missing information.",
                        "Validate the supplied information.",
                        "Update the missing mandatory fields.",
                        "Verify that all mandatory fields are complete."
                    ]
                }

            ],

            manualActions: []
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
        "MATERIAL"
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
                    `${entity.entityType} is operationally connected to ${entityId} and may be affected by the compliance issue.`
            });
        }
    }


    return affectedEntities;
}