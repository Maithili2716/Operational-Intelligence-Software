import ActionItem from "./actionEngine.js";

export function evaluate(runtimeModel) {
    const actions = [];
    for (const [id, state] of runtimeModel.state) {
        if (
            state.entityType !== "PROCUREMENT" &&
            state.entityType !== "SUPPLIER"
        ) {
            continue;
        }

        if (state.entityType === "PROCUREMENT") {
            const context =
                createProcurementContext(
                    id,
                    state,
                    runtimeModel
                );
            actions.push(
                ...checkContactSupplier(context)
            );
        }

        if (state.entityType === "SUPPLIER") {
            const context =
                createSupplierContext(
                    id,
                    state,
                    runtimeModel
                );
            actions.push(
                ...checkAlternateSupplier(context)
            );
        }
    }

    return actions;
}

function createProcurementContext(
    id,
    state,
    runtimeModel
) {
    const edges =
        runtimeModel.graph.findNeighbours(id);
    return {
        entityType: state.entityType,
        entityId: id,
        state,
        node: runtimeModel.graph.findNode(id),
        dependencies: edges
    };
}

function createSupplierContext(
    id,
    state,
    runtimeModel
) {
    const edges =
        runtimeModel.graph.findNeighbours(id);
    return {
        entityType: state.entityType,
        entityId: id,
        state,
        node: runtimeModel.graph.findNode(id),
        dependencies:
            runtimeModel.graph.findNeighbours(id),
        runtimeModel
    };
}

function checkContactSupplier(context) {
    const { state, dependencies } = context;
    if (state.schedule?.status !== "ONGOING")
        return [];
    /*
        Find material dependencies.
    */
    const materialEdges = dependencies.filter(
        edge =>
            edge.relationship === "PROCURES_MATERIAL"
    );
    if (materialEdges.length === 0)
        return [];
    /*
        Find whether this procurement already
        generated a Purchase Order.
    */
    const hasPurchaseOrder = dependencies.some(
        edge =>
            edge.relationship ===
            "GENERATES_PURCHASE_ORDER"
    );

    if (hasPurchaseOrder)
        return [];
    const materials = materialEdges
        .map(edge => edge.to)
        .join(", ");
    return [
        ActionItem.createActionItem(
            context,
            "PROCUREMENT",
            "Contact Supplier for Ordering",
            `Required materials (${materials}) need to be ordered from the supplier.`
        )
    ];
}

function checkAlternateSupplier(context) {
    const { runtimeModel, entityId } = context;
    const affectedProcurements =
        runtimeModel.graph
            .getAllEdges()
            .filter(
                edge =>
                    edge.to === entityId &&
                    edge.relationship === "FROM_SUPPLIER"
            );

    const actions = [];

    for (const edge of affectedProcurements) {
        const procurementState =
            runtimeModel.state.get(edge.from);
        if (!procurementState)
            continue;
        if (procurementState.schedule?.status !== "FAILED")
            continue;

        actions.push(
            ActionItem.createActionItem(
                context,
                "PROCUREMENT",
                "Assign Alternate Supplier",
                `${edge.from} is blocked because supplier ${entityId} cannot fulfill the procurement requirement.`
            )
        );
    }

    return actions;
}