import AttentionItem from "./attentionEngine.js";

export function evaluate(runtimeState){
    const attention = [];
    for(const [id,state] of runtimeState){
        const context = createContext(id,state);

        attention.push(
            ...checkUnexpectedStatus(context)
        );
        /*attention.push(
            ...checkImpossibleValues(context)
        );
       /* attention.push(
            ...checkMissingCriticalData(context)
        );*/
        attention.push(
            ...checkStateConflict(context)
        );
    }
    return attention;
}

function createContext(id,state){
    return{
        id,
        state,
        entityType:state.entityType,
        entityId:id
        
    };

}
    

function checkUnexpectedStatus(context) {
    const { id, state } = context;

    const status =
        state.schedule?.status ??
        state.quality?.status ??
        state.resource?.status;

    if (status == null) {
        return [];
    }

    const validStatuses = [
        "FAILED",
        "ONGOING",
        "ON HOLD",
        "PENDING",
        "COMPLETED"
    ];

    if (validStatuses.includes(status)) {
        return [];
    }

    return [
        AttentionItem.createAttentionItem(
            context,
            "HIGH",
            "OPERATIONAL",
            "Unexpected Status",
            `${id} has unexpected status "${status}"`
        )
    ];
}

//function checkMissingCriticalData(context){}
/*function checkImpossibleValues(context) {
    const { id, state } = context;

    if (!state.schedule) {
        return [];
    }

    const {
        estimatedCompletionDate,
        createdAt
    } = state.schedule;

    if (!estimatedCompletionDate || !createdAt) {
        return [];
    }

    if (
        new Date(estimatedCompletionDate) <
        new Date(createdAt)
    ) {
        return [
            AttentionItem.createAttentionItem(
                context,
                "HIGH",
                "OPERATIONAL",
                "Impossible Values",
                `${id} contains impossible schedule values`
            )
        ];
    }

    return [];
}*/



function checkStateConflict(context) {
    const { id, state } = context;
    const conflicts = [];

    if (state.resource) {

        if (state.resource.available < 0) {
            conflicts.push(
                "Available quantity is negative"
            );
        }

        if (
            state.resource.reserved >
            state.resource.available
        ) {
            conflicts.push(
                "Reserved quantity exceeds available quantity"
            );
        }
    }

    if (state.quality) {

        if (
            state.quality.goodPieces < 0 ||
            state.quality.faultyPieces < 0
        ) {
            conflicts.push(
                "Negative inspection counts"
            );
        }
    }

    if (conflicts.length === 0) {
        return [];
    }

    return [
        AttentionItem.createAttentionItem(
            context,
            "HIGH",
            "OPERATIONAL",
            "State Conflict",
            conflicts.join("; ")
        )
    ];
}

