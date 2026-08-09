import ActionItem from "./actionEngine.js";

export function evaluate(runtimeModel) {
    const actions = [];

    for (const [id, state] of runtimeModel.state) {
        if (state.entityType !== "BOM")
            continue;
        const context = createContext(
            id,
            state,
            runtimeModel
        );
        actions.push(
            ...checkBOMRevision(context)
        );
        actions.push(
            ...checkBOMApproval(context)
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


function checkBOMRevision(context) {
    const { state } = context;
    if (state.revisionFlag !== true)
        return [];

    /*
        If the BOM has been flagged for revision
        and mandatory fields are incomplete,
        the first action is to review/fix the revision.
    */

    if (state.compliance?.mandatoryFieldsComplete === true)
        return [];

    return [
        ActionItem.createActionItem(
            context,
            "ENGINEERING",
            "Review BOM Revision",
            `${context.entityId} has been flagged for revision and requires engineering review.`
        )
    ];
}


function checkBOMApproval(context) {
    const { state } = context;
    if (state.revisionFlag !== true)
        return [];
    if (state.compliance?.mandatoryFieldsComplete !== true)
        return [];
    if (state.compliance?.approvalStatus === "APPROVED")
        return [];
    return [
        ActionItem.createActionItem(
            context,
            "ENGINEERING",
            "Approve BOM Revision",
            `${context.entityId} has a completed revision that is awaiting approval.`
        )
    ];
}