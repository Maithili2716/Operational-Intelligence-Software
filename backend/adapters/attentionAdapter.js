import formatDate from "../utils/formatDate.js";

export default class AttentionAdapter {

    static adapt(attentionItems) {
         const sortedItems = this.sortAttention(attentionItems);
        return sortedItems
            .map(item => {

                const normalizedTitle = item.title
                    .toUpperCase()
                    .replace(/\s+/g, "_");

                const id = item.discriminator
                    ? `ATTENTION:${item.entityId}:${item.category}:${item.discriminator}:${normalizedTitle}`
                    : `ATTENTION:${item.entityId}:${item.category}:${normalizedTitle}`;

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

     static sortAttention(items) {
        // Group attention items by entity number
        const groups = new Map();

        for (const item of items) {
            const entityNumber =
                Number(item.entityId.split(":")[1]);

            if (!groups.has(entityNumber)) {
                groups.set(entityNumber, []);
            }

            groups.get(entityNumber).push(item);
        }
        const result = [];
        // Process entity numbers in order:
        // 1 → 2 → 3 → ...
        for (const number of [...groups.keys()].sort((a, b) => a - b)) {
            const group = groups.get(number);
            // Initially, earliest detected items have priority
            group.sort(
                (a, b) =>
                    new Date(a.detectedAt) -
                    new Date(b.detectedAt)
            );

            let previousType = null;

            while (group.length > 0) {
                // Prefer an item whose entity type
                // differs from the previous item
                let index = group.findIndex(
                    item => item.entityType !== previousType
                );
                // If every remaining item has the same type,
                // we have no choice but to use the first one
                if (index === -1) {
                    index = 0;
                }
                const [item] = group.splice(index, 1)
                result.push(item);
                previousType = item.entityType;
            }
        }
        return result;
    }
}