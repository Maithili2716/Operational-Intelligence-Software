import ExecutionItem
    from "./executionItem.js";


export function executeProcurement(
    action,
    runtimeModel
) {

    switch (action.title) {

        case "Contact Supplier For Ordering":

            return executeContactSupplier(
                action,
                runtimeModel
            );


        case "Assign Alternate Supplier":

            return executeAlternateSupplier(
                action,
                runtimeModel
            );


        default:
            return null;
    }
}


/*
===========================================================
CONTACT SUPPLIER
===========================================================
*/

function executeContactSupplier(
    action,
    runtimeModel
) {

    const state =
        runtimeModel.state.get(
            action.entityId
        );

    if (!state)
        return null;


    const status =
        state.schedule?.status ??
        state.status;


    return ExecutionItem.createExecutionItem(

        action,

        `Contact ${action.entityId} to confirm material availability and delivery commitment before ordering.`,

        findAffectedEntities(
            action.entityId,
            runtimeModel
        ),

        "Contact the supplier, confirm the ordering requirements, and move the procurement workflow into an actionable state.",

        [
            {
                entityType:
                    action.entityType,

                entityId:
                    action.entityId,

                field:
                    "status",

                currentValue:
                    status,

                requiredValue:
                    "READY",

                steps: [
                    "Contact the supplier.",
                    "Confirm material availability.",
                    "Confirm the required quantity.",
                    "Confirm the supplier delivery commitment.",
                    "Record the supplier confirmation.",
                    "Update the procurement status to READY.",
                    "Verify that ordering can proceed."
                ]
            }
        ]
    );
}


/*
===========================================================
ALTERNATE SUPPLIER
===========================================================
*/

function executeAlternateSupplier(
    action,
    runtimeModel
) {

    const state =
        runtimeModel.state.get(
            action.entityId
        );

    if (!state)
        return null;


    const status =
        state.schedule?.status ??
        state.status;


    return ExecutionItem.createExecutionItem(

        action,

        `Assign an alternate supplier for the affected procurement workflow and restore material availability.`,

        findAffectedEntities(
            action.entityId,
            runtimeModel
        ),

        "Identify an alternate supplier, confirm availability, and update the procurement workflow.",

        [
            {
                entityType:
                    action.entityType,

                entityId:
                    action.entityId,

                field:
                    "status",

                currentValue:
                    status,

                requiredValue:
                    "ACTIVE",

                steps: [
                    "Identify an alternate supplier.",
                    "Confirm the supplier can provide the required material.",
                    "Confirm quantity and delivery commitment.",
                    "Update the supplier assignment.",
                    "Update the procurement status to READY.",
                    "Verify that downstream ordering can proceed."
                ]
            }
        ]
    );
}


function findAffectedEntities(
    entityId,
    runtimeModel
) {

    const affected = [];

    const visited =
        new Set();


    for (
        const edge of
        runtimeModel.graph.getAllEdges()
    ) {

        const affectedId =
            edge.from === entityId
                ? edge.to
                : edge.to === entityId
                    ? edge.from
                    : null;


        if (!affectedId)
            continue;


        if (
            affectedId === entityId ||
            visited.has(affectedId)
        )
            continue;


        const node =
            runtimeModel.graph.findNode(
                affectedId
            );

        if (!node)
            continue;


        visited.add(affectedId);


        affected.push({

            entityType:
                node.type,

            entityId:
                node.id,

            reason:
                `${node.type} is affected by the procurement action on ${entityId}.`

        });
    }


    return affected;
}