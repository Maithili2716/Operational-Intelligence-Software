import ExecutionItem
    from "./executionItem.js";


export function executeLogistics(
    action,
    runtimeModel
) {

    switch (action.title) {

        case "Reschedule Shipment":

            return executeRescheduleShipment(
                action,
                runtimeModel
            );


        case "Reassign To Alternate Transporter":

            return executeReassignTransporter(
                action,
                runtimeModel
            );


        default:
            return null;
    }
}


/*
===========================================================
RESCHEDULE SHIPMENT
===========================================================
*/

function executeRescheduleShipment(
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

        `Reschedule ${action.entityId} to restore downstream inventory availability.`,

        findAffectedEntities(
            action.entityId,
            runtimeModel
        ),

        "Confirm the revised delivery schedule and update the shipment status.",

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
                    "RESCHEDULED",

                steps: [
                    "Review the current shipment delay.",
                    "Confirm a revised delivery schedule.",
                    "Confirm that the revised schedule is operationally feasible.",
                    "Update the shipment status to RESCHEDULED.",
                    "Verify downstream inventory planning."
                ]
            }
        ]
    );
}


/*
===========================================================
ALTERNATE TRANSPORTER
===========================================================
*/

function executeReassignTransporter(
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


    /*
     * Current schema has no transporter field.
     *
     * Therefore the actual transporter assignment
     * remains a human/manual step.
     *
     * We can still update the shipment status once
     * reassignment has been completed.
     */

    return ExecutionItem.createExecutionItem(

        action,

        `Reassign ${action.entityId} to an alternate transporter and restore its logistics schedule.`,

        findAffectedEntities(
            action.entityId,
            runtimeModel
        ),

        "Confirm an alternate transporter and update the shipment status after reassignment.",

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
                    "RESCHEDULED",

                steps: [
                    "Identify an alternate transporter.",
                    "Confirm transporter availability.",
                    "Confirm the revised delivery schedule.",
                    "Reassign the shipment to the alternate transporter.",
                    "Update the shipment status.",
                    "Verify the revised logistics plan."
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
                `${node.type} depends on the logistics state of ${entityId}.`

        });
    }


    return affected;
}