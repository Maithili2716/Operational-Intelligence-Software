import ExecutionItem
    from "./executionItem.js";


export function executePlanning(
    action,
    runtimeModel
) {

    switch (action.title) {

        case "Review Milestone Schedule":

            return executeReviewMilestoneSchedule(
                action,
                runtimeModel
            );


        case "Review Project Schedule":

            return executeReviewProjectSchedule(
                action,
                runtimeModel
            );


        default:
            return null;
    }
}


/*
===========================================================
MILESTONE
===========================================================
*/

function executeReviewMilestoneSchedule(
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

        `Review and confirm the schedule for ${action.entityId} before downstream planning proceeds.`,

        findAffectedEntities(
            action.entityId,
            runtimeModel
        ),

        "Review the milestone schedule and confirm the planned execution state.",

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

                requiredValue: "COMPLETED",

                steps: [
                    "Review the milestone due date.",
                    "Review the estimated completion date.",
                    "Verify dependencies and required resources.",
                    "Confirm that the milestone schedule is achievable.",
                    "Update the milestone status to CONFIRMED.",
                    "Verify downstream project planning."
                ]
            }
        ]
    );
}


/*
===========================================================
PROJECT
===========================================================
*/

function executeReviewProjectSchedule(
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

        `Review the project schedule for ${action.entityId} and confirm that downstream milestones remain achievable.`,

        findAffectedEntities(
            action.entityId,
            runtimeModel
        ),

        "Review the project schedule and confirm the downstream planning assumptions.",

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

                requiredValue: "CONFIRMED",

                steps: [
                    "Review the project schedule.",
                    "Review milestone dependencies.",
                    "Verify the estimated completion date.",
                    "Confirm that the current schedule is achievable.",
                    "Update the project status to CONFIRMED.",
                    "Verify downstream planning."
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
                `${node.type} depends on the schedule of ${entityId}.`

        });
    }


    return affected;
}