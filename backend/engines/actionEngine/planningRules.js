import ActionItem from "./actionEngine.js";

export function evaluate(runtimeModel) {
    const actions = [];

    for (const [id, state] of runtimeModel.state) {

        if (
            state.entityType !== "MILESTONE" &&
            state.entityType !== "PROJECT"
        ) {
            continue;
        }

        const context = createContext(
            id,
            state,
            runtimeModel
        );

        if (state.entityType === "MILESTONE") {
            actions.push(
                ...checkMilestoneSchedule(context)
            );
        }

        if (state.entityType === "PROJECT") {
            actions.push(
                ...checkProjectSchedule(context)
            );
        }
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


function checkMilestoneSchedule(context) {
    const { state } = context;
    const status =
        state.schedule?.status ??
        state.status;

    if (status !== "ONGOING")
        return [];

    const dueDate =
        state.schedule?.dueDate;
    const estimatedCompletion =
        state.schedule?.estimatedCompletionDate;
    if (!dueDate || !estimatedCompletion)
        return [];
    if (
        new Date(estimatedCompletion) <=
        new Date(dueDate)
    ) {
        return [];
    }
    return [
        ActionItem.createActionItem(
            context,
            "PLANNING",
            "Review Milestone Schedule",
            `${context.entityId} is projected to complete after its planned due date and requires schedule review.`
        )
    ];
}


function checkProjectSchedule(context) {
    const { state } = context;
    const status =
        state.schedule?.status ??
        state.status;
    if (status !== "ONGOING")
        return [];
    const dueDate =
        state.schedule?.dueDate;
    const estimatedCompletion =
        state.schedule?.estimatedCompletionDate;
    if (!dueDate || !estimatedCompletion)
        return [];
    if (
        new Date(estimatedCompletion) <=
        new Date(dueDate)
    ) {
        return [];
    }
    return [
        ActionItem.createActionItem(
            context,
            "PLANNING",
            "Review Project Schedule",
            `${context.entityId} is projected to complete after its planned due date and requires schedule review.`
        )
    ];
}