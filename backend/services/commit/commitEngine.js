// =========================================
// Commit Engine
// Handles Inspection + Action Execution
// =========================================

import { dispatchCommit } from "./commitDispatcher.js";


// =========================================
// INSPECTION COMMIT
// =========================================

export async function commitInspection(
    inspection
) {

    if (!inspection)
        throw new Error(
            "Inspection is required."
        );


    const updates =
        inspection
            .mitigationStrategy
            ?.updates ?? [];


    return commitUpdates(
        updates,
        {
            source: "INSPECTION",
            sourceId: inspection.id
        }
    );
}


// =========================================
// ACTION EXECUTION COMMIT
// =========================================

export async function commitExecution(
    execution
) {

    if (!execution)
        throw new Error(
            "Execution is required."
        );


    const updates =
        execution
            .executionPlan
            ?.updates ?? [];


    return commitUpdates(
        updates,
        {
            source: "ACTION_EXECUTION",
            sourceId: execution.id
        }
    );
}


// =========================================
// COMMON COMMIT
// =========================================

async function commitUpdates(
    updates,
    context
) {

    if (!Array.isArray(updates)) {

        throw new Error(
            "Commit updates must be an array."
        );

    }


    const results = [];


    for (const update of updates) {

        if (!update)
            continue;


        if (
            !update.entityType ||
            !update.entityId ||
            !update.field
        ) {

            throw new Error(
                "Invalid commit update."
            );

        }


        const result =
            await dispatchCommit(
                update
            );


        results.push({

            entityType:
                update.entityType,

            entityId:
                update.entityId,

            field:
                update.field,

            previousValue:
                update.currentValue,

            newValue:
                update.requiredValue,

            result

        });
    }


    return {

        source:
            context.source,

        sourceId:
            context.sourceId,

        committed:
            true,

        updates:
            results

    };
}