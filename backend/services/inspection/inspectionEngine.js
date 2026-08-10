import { inspectAttention } from "./inspectionDispatcher.js";

export function generateInspections(attentionItems, runtimeModel) {
    const inspections = [];
    for (const attention of attentionItems) {
        const inspection =
            inspectAttention(
                attention,
                runtimeModel
            );

        if (!inspection)
            continue;

        inspections.push({
            attention,
            inspection
        });
    }

    return inspections;
}