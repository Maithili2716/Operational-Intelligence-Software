import ExecutionItem
    from "./executionItem.js";


export function executeEngineering(
    action,
    runtimeModel
) {

    switch (action.title) {

        case "Review BOM Revision":

            return executeReviewBOMRevision(
                action,
                runtimeModel
            );


        case "Approve BOM Revision":

            return executeApproveBOMRevision(
                action,
                runtimeModel
            );


        default:
            return null;
    }
}


/*
===========================================================
REVIEW BOM REVISION
===========================================================
*/

function executeReviewBOMRevision(
    action,
    runtimeModel
) {

    const state =
        runtimeModel.state.get(
            action.entityId
        );

    if (!state)
        return null;


    const revisionNo =
        state.revisionNo;


    return ExecutionItem.createExecutionItem(

        action,

        `Review revision ${revisionNo ?? "current"} of ${action.entityId} before downstream engineering and procurement activities proceed.`,

        findAffectedEntities(
            action.entityId,
            runtimeModel
        ),

        "Review the BOM revision and confirm that the current revision is valid.",

        [
            {
                entityType:
                    action.entityType,

                entityId:
                    action.entityId,

                field:
                    "revisionFlag",

                currentValue:
                    state.revisionFlag,

                requiredValue:
                    false,

                steps: [
                    "Review the current BOM revision.",
                    "Verify the revision against the project requirements.",
                    "Confirm that the revision is the intended active revision.",
                    "Clear the revision flag after confirmation.",
                    "Verify that downstream engineering and procurement can use the revision."
                ]
            }
        ]
    );
}


/*
===========================================================
APPROVE BOM REVISION
===========================================================
*/

function executeApproveBOMRevision(
    action,
    runtimeModel
) {

    const state =
        runtimeModel.state.get(
            action.entityId
        );

    if (!state)
        return null;


    const approvalStatus =
        state.compliance?.approvalStatus ??
        state.approvalStatus;


    return ExecutionItem.createExecutionItem(

        action,

        `Approve the current revision of ${action.entityId} so downstream engineering and procurement activities can proceed.`,

        findAffectedEntities(
            action.entityId,
            runtimeModel
        ),

        "Approve the BOM revision and update its approval status.",

        [
            {
                entityType:
                    action.entityType,

                entityId:
                    action.entityId,

                field:
                    "approvalStatus",

                currentValue:
                    approvalStatus,

                requiredValue:
                    "APPROVED",

                steps: [
                    "Review the BOM revision.",
                    "Verify mandatory engineering information.",
                    "Confirm the revision is ready for use.",
                    "Approve the BOM revision.",
                    "Verify that downstream procurement can proceed."
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
                `${node.type} may be affected by the BOM revision.`

        });
    }


    return affected;
}