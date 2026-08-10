export default class ExecutionItem {

    static createExecutionItem(
        action,
        executionSummary,
        affectedEntities,
        planSummary,
        updates
    ) {

        return {

            entityType:
                action.entityType,

            entityId:
                action.entityId,

            executionSummary,

            affectedEntities:
                affectedEntities ?? [],

            executionPlan: {

                summary:
                    planSummary,

                updates:
                    updates ?? []
            }
        };
    }
}