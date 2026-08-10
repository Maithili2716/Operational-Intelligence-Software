import ExecutionItem
    from "./executionItem.js";


export function executeQuality(
    action,
    runtimeModel
) {

    switch (action.title) {

        case "Start Upcoming Inspection":

            return executeStartInspection(
                action,
                runtimeModel
            );


        case "Update Inventory After Inspection":

            return executeUpdateInventory(
                action,
                runtimeModel
            );


        default:
            return null;
    }
}


/*
===========================================================
START INSPECTION
===========================================================
*/

function executeStartInspection(
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
        state.quality?.status ??
        state.status;


    return ExecutionItem.createExecutionItem(

        action,

        `Begin the incoming quality inspection for ${action.entityId} to release downstream inventory.`,

        findAffectedEntities(
            action.entityId,
            runtimeModel
        ),

        "Assign the inspection resource and update the inspection status to indicate that execution has started.",

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
                    "IN_PROGRESS",

                steps: [
                    "Assign the required inspection resource.",
                    "Verify that the shipment is available for inspection.",
                    "Begin the incoming inspection.",
                    "Update inspection status to IN_PROGRESS.",
                    "Verify that downstream inventory release can proceed."
                ]
            }
        ]
    );
}


/*
===========================================================
UPDATE INVENTORY AFTER INSPECTION
===========================================================
*/

function executeUpdateInventory(
    action,
    runtimeModel
) {

    const state =
        runtimeModel.state.get(
            action.entityId
        );

    if (!state)
        return null;


    /*
     * This action is normally associated with a
     * quality inspection.
     *
     * The actual inventory quantity must come from
     * the inspection result and cannot safely be
     * fabricated here.
     */

    const inventory =
        findAffectedInventory(
            action.entityId,
            runtimeModel
        );


    if (!inventory)
        return null;


    return ExecutionItem.createExecutionItem(

        action,

        `Update inventory after the inspection results for ${action.entityId} have been confirmed.`,

        findAffectedEntities(
            action.entityId,
            runtimeModel
        ),

        "Apply the confirmed inspection result to the affected inventory.",

        [
            {
                entityType:
                    "INVENTORY",

                entityId:
                    inventory.id,

                field:
                    "available",

                currentValue:
                    inventory.available,

                requiredValue:
                    inventory.available,

                steps: [
                    "Complete the quality inspection.",
                    "Confirm the accepted quantity.",
                    "Confirm the rejected quantity.",
                    "Update inventory using the confirmed accepted quantity.",
                    "Verify that inventory reflects the inspection result."
                ]
            }
        ]
    );
}


function findAffectedInventory(
    entityId,
    runtimeModel
) {

    for (
        const edge of
        runtimeModel.graph.getAllEdges()
    ) {

        const connectedId =
            edge.from === entityId
                ? edge.to
                : edge.to === entityId
                    ? edge.from
                    : null;


        if (!connectedId)
            continue;


        if (
            connectedId.startsWith(
                "INVENTORY:"
            )
        ) {

            const state =
                runtimeModel.state.get(
                    connectedId
                );

            if (!state)
                continue;


            return {

                id:
                    connectedId,

                available:
                    state.resource?.available ??
                    state.available ??
                    0
            };
        }
    }


    return null;
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
                `${node.type} is affected by the quality state of ${entityId}.`

        });
    }


    return affected;
}