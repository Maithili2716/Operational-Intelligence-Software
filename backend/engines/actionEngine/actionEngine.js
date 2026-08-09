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

    const actions = [
        ...ApprovalEngine.evaluate(runtimeModel),
        ...ProcurementEngine.evaluate(runtimeModel),
        ...LogisticsEngine.evaluate(runtimeModel),
        ...QualityEngine.evaluate(runtimeModel),
        ...PlanningEngine.evaluate(runtimeModel),
        ...EngineeringEngine.evaluate(runtimeModel)
    ];

    return actions;
}