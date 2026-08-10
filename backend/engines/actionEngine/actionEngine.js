import * as ApprovalEngine from "./approvalRules.js";
import * as ProcurementEngine from "./procurementRules.js";
import * as LogisticsEngine from "./logisticsRules.js";
import * as QualityEngine from "./qualityRules.js";
import * as PlanningEngine from "./planningRules.js";
import * as EngineeringEngine from "./engineeringRules.js";


export default class ActionItem {

    static createActionItem(
        context,
        category,
        title,
        blockedEntitiesSummary
    ) {
        return {
            category,
            entityType: context.entityType,
            entityId: context.entityId,
            title,
            blockedEntitiesSummary,
            createdAt: new Date()
        };
    }
}

export function generateActions(runtimeModel) {
    const engineResults = [
        ApprovalEngine.evaluate(
            runtimeModel
        ),
        EngineeringEngine.evaluate(
            runtimeModel
        ),
        LogisticsEngine.evaluate(
            runtimeModel
        ),
        PlanningEngine.evaluate(
            runtimeModel
        ),
        ProcurementEngine.evaluate(
            runtimeModel
        ),
        QualityEngine.evaluate(
            runtimeModel
        )

    ];
    return roundRobin(
        engineResults
    );
}


function roundRobin(
    engineResults
) {
    const result = [];
    let index = 0;
    let added = true;

    while (added) {
        added = false;
        for (
            const engineItems
            of engineResults
        ) {

            if (
                index <
                engineItems.length
            ) {

                result.push(
                    engineItems[index]
                );

                added = true;
            }
        }

        index++;
    }
    return result;
}
