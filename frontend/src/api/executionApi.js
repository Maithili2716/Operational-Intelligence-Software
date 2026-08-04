import executions from "../mocks/execution.mock.js";
import { success } from "../utils/response";

export async function getExecution(actionId) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(
                success(
                    executions[actionId]
                )
            );
        }, 300);
    });
}