import createAttentionId from "../utils/attentionId.js";
import { uniqueAffectedEntities } from "../utils/deduplication.js";

export default class InspectionAdapter {

    static adapt(inspectionResults) {

        const result = {};

        let inspectionCounter = 1;

        for (const resultItem of inspectionResults) {

            const attention =
                resultItem.attention;

            const inspection =
                resultItem.inspection;

            if (!attention || !inspection)
                continue;

            const attentionId =
                createAttentionId(attention);

            const inspectionId =
                `INSPECTION:${inspectionCounter++}`;

            result[attentionId] = {

                id: inspectionId,

                attentionId,

                entityType:
                    inspection.entityType,

                entityId:
                    inspection.entityId,

                rootCauseAnalysis:
                    inspection.rootCauseAnalysis,

                affectedEntities:uniqueAffectedEntities(
                    inspection.affectedEntities ?? []),

                mitigationStrategy:
                    inspection.mitigationStrategy ?? {
                        summary: "",
                        updates: [],
                        manualActions: []
                    }
            };
        }

        return result;
    }
}