import { api } from "./client";


export async function commitInspection(
    inspection
) {

    return api(
        "/commit",
        {
            method: "POST",

            body: JSON.stringify({

                source:
                    "INSPECTION",

                sourceId:
                    inspection.id,

                updates:
                    inspection
                        .mitigationStrategy
                        ?.updates ?? []

            })
        }
    );

}


export async function commitExecution(
    execution
) {

    return api(
        "/commit",
        {
            method: "POST",

            body: JSON.stringify({

                source:
                    "ACTION_EXECUTION",

                sourceId:
                    execution.id,

                updates:
                    execution
                        .executionPlan
                        ?.updates ?? []

            })
        }
    );

}