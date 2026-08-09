import ActionItem from "./actionEngine.js";

export function evaluate(runtimeModel) {
    const actions = [];
    for (const [id, state] of runtimeModel.state) {
        if (state.entityType !== "PURCHASE_ORDER")
            continue;
        const context = createContext(id, state, runtimeModel);
        actions.push(
            ...checkPurchaseOrderApproval(context)
        );
    }

    return actions;
}


function createContext(id, state, runtimeModel) {
    return {
        entityType: state.entityType,
        entityId: id,
        state,
        node: runtimeModel.graph.findNode(id),
        downstream: runtimeModel.graph.findNeighbours(id)
    };
}


function checkPurchaseOrderApproval(context) {

    const { state, downstream } = context;

     if ((state.schedule?.status ?? state.status) !== "PENDING")
        return [];
    if (!downstream || downstream.length === 0)
        return [];
    const blockedEntities = downstream
        .map(edge => edge.to)
        .join(", ");

    return [
        ActionItem.createActionItem(
            context,
            "APPROVAL",
            "Approve Purchase Order",
            `Downstream operations (${blockedEntities}) cannot proceed until ${context.entityId} is approved.`
        )
    ];
}