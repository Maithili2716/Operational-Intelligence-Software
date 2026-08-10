import createActionId from "../utils/actionId.js";


export default class ExecutionAdapter {

    static adapt(executionResults) {
        const result = {};
        let executionCounter = 1;

        for (const resultItem of executionResults) {
            const action =
                resultItem.action;
            const execution =
                resultItem.execution;

            if (!action || !execution)
                continue;

            const actionId =
                createActionId(action);

            const executionId =
                `EXECUTION:${executionCounter++}`;

            result[actionId] = {
                id:
                    executionId,
                actionId,
                entityType:
                    execution.entityType,
                entityId:
                    execution.entityId,
                executionSummary:
                    execution.executionSummary,

                affectedEntities:
                    execution.affectedEntities ?? [],

                executionPlan:
                    execution.executionPlan ?? {
                        summary: "",
                        updates: []
                    }
            };
        }


        return result;
    }
}