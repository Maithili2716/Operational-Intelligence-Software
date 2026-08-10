import formatDate from "../utils/formatDate.js";
import createAttentionId from "../utils/attentionId.js";

export default class AttentionAdapter {

    static adapt(attentionItems) {
        return attentionItems
            .map(item => {
                const id = createAttentionId(item);

                return {
                    id,
                    severity: item.severity,
                    category: item.category,
                    entityType: item.entityType,
                    entityId: item.entityId,
                    title: item.title,
                    summary: item.summary,
                    detectedAt: formatDate(item.detectedAt)
                };
                

            });
    }
}

     