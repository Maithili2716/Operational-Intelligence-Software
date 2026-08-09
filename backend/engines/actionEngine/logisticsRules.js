import ActionItem from "./actionEngine.js";

export function evaluate(runtimeModel) {
    const actions = [];

    for (const [id, state] of runtimeModel.state) {
        if (state.entityType !== "SHIPMENT")
            continue;

        const context = createContext(
            id,
            state,
            runtimeModel
        );

        actions.push(
            ...checkRescheduleShipment(context)
        );

        actions.push(
            ...checkAlternateTransporter(context)
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


function checkRescheduleShipment(context) {
    const { state } = context;
    const status =
        state.schedule?.status ??
        state.status;

    if (status !== "ONGOING")
        return [];

    const expectedDelivery =
        state.schedule.estimatedCompletionDate ;
    if (!expectedDelivery)
        return [];
    if (
        new Date(expectedDelivery) >=
        new Date()
    ) {
        return [];
    }

    return [
        ActionItem.createActionItem(
            context,
            "LOGISTICS",
            "Reschedule Shipment",
            `${context.entityId} has passed its expected delivery date and requires rescheduling.`
        )
    ];
}


function checkAlternateTransporter(context) {
    const { state } = context;
    const status =
        state.schedule?.status ??
        state.status;
    if (status !== "FAILED")
        return [];

    return [
        ActionItem.createActionItem(
            context,
            "LOGISTICS",
            "Reassign to Alternate Transporter",
            `${context.entityId} has failed and requires reassignment to an alternate transporter.`
        )
    ];
}