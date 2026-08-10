import ExecutionItem
    from "./executionItem.js";


export function executeApproval(
    action,
    runtimeModel
) {

    switch (action.title) {

        case "Approve Purchase Order":

            return executeApprovePurchaseOrder(
                action,
                runtimeModel
            );

        default:
            return null;
    }
}


function executeApprovePurchaseOrder(
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

        `Approve ${action.entityId} to unblock downstream procurement and quality operations.`,

        findAffectedEntities(
            action.entityId,
            runtimeModel
        ),

        "Approve the purchase order and update its operational status.",

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
                    "APPROVED",

                steps: [
                    "Review the purchase order details.",
                    "Confirm supplier and order information.",
                    "Approve the purchase order.",
                    "Update the purchase order status to APPROVED.",
                    "Verify that downstream operations can proceed."
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
                `${node.type} is affected by the approval of ${entityId}.`
        });
    }


    return affected;
}