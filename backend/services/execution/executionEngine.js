import { executeAction } from "./executionDispatcher.js";


export function generateExecutions(
    runtimeModel,
    actions
) {

    const executions = [];

    for (const action of actions) {

        const execution =
            executeAction(
                action,
                runtimeModel
            );

        if (!execution)
            continue;

        executions.push({

            action,

            execution

        });
    }

    return executions;
}