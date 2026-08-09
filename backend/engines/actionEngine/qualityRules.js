import ActionItem from "./actionEngine.js";

export function evaluate(runtimeModel) {
    const actions = [];

    for (const [id, state] of runtimeModel.state) {
        if (state.entityType !== "QUALITY_INSPECTION")
            continue;

        const context = createContext(
            id,
            state,
            runtimeModel
        );

        actions.push(
            ...checkStartInspection(context)
        );

        actions.push(
            ...checkInventoryUpdate(context)
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
        dependencies: runtimeModel.graph.findNeighbours(id),
        runtimeModel
    };
}


function checkStartInspection(context) {
    const { state, dependencies } = context;
    const status =
        state.quality?.status ??
        state.status;
    if (status !== "PENDING")
        return [];
    /*
        Quality inspection should only become
        actionable once its shipment has arrived.
    */
    const shipmentEdge = dependencies.find(
        edge =>
            edge.relationship === "INSPECTS_SHIPMENT"
    );
    if (!shipmentEdge)
        return [];

    const shipmentState =
        context.runtimeModel.state.get(
            shipmentEdge.to
        );
    if (!shipmentState)
        return [];

    const shipmentStatus =
        shipmentState.schedule?.status ??
        shipmentState.status;

    if (
        shipmentStatus !== "COMPLETED" &&
        shipmentStatus !== "DELIVERED"
    ) {
        return [];
    }

    return [
        ActionItem.createActionItem(
            context,
            "QUALITY",
            "Start Incoming Inspection",
            `Inventory release and downstream production activities are waiting for inspection ${context.entityId}.`
        )
    ];
}


function checkInventoryUpdate(context) {
    const { state } = context;
    const status =
        state.quality?.status ??
        state.status;
    if (status !== "COMPLETED")
        return [];
    const inventoryStatus =
        state.quality?.inventoryUpdateStatus ??
        state.inventoryUpdateStatus;

    if (inventoryStatus === "COMPLETED")
        return [];
    return [
        ActionItem.createActionItem(
            context,
            "QUALITY",
            "Update Inventory After Inspection",
            `Inspection ${context.entityId} is complete but the inventory update is still pending.`
        )
    ];
}