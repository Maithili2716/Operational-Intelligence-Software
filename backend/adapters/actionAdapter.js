/*import formatDate from "../utils/formatDate.js";

export default class ActionAdapter {

    static adapt(actionItems) {
        const sortedItems = this.sortActions(actionItems);
        return sortedItems.map(item => {

            const normalizedTitle = item.title
                .toUpperCase()
                .replace(/\s+/g, "_");

            const id =
                `ACTION:${item.entityId}:${item.category}:${normalizedTitle}`;

            return {
                id,
                category: item.category,
                entityType: item.entityType,
                entityId: item.entityId,
                title: item.title,
                blockedEntitiesSummary:
                    item.blockedEntitiesSummary,
                createdAt: formatDate(item.createdAt)
            };
        });
    }


    static sortActions(items) {
        const groups = new Map();

        /*
         * Group actions by entity number.
         *
         * PROJECT:1
         * SHIPMENT:1
         * PROJECT:2
         * ...
         */
/*
        for (const item of items) {
            const entityNumber =
                Number(item.entityId.split(":")[1]);

            if (!groups.has(entityNumber)) {
                groups.set(entityNumber, []);
            }
            groups.get(entityNumber).push(item);
        }


        const result = [];
        /*
         * Process entity numbers in order.
         *//*
        for (
            const number of [...groups.keys()]
                .sort((a, b) => a - b)
        ) {
            const group = groups.get(number);
            /*
             * Earliest action first.
             *//*
            group.sort(
                (a, b) =>
                    new Date(a.createdAt) -
                    new Date(b.createdAt)
            );
            let previousType = null;
            /*
             * Try to avoid placing the same entity type
             * immediately after itself.
             *//*
            while (group.length > 0) {
                let index = group.findIndex(
                    item =>
                        item.entityType !== previousType
                );

                /*
                 * If all remaining items have the same
                 * entity type, there is no alternative.
                 *//*
                if (index === -1) {
                    index = 0;
                }
                const [item] = group.splice(index, 1);
                result.push(item);
                previousType = item.entityType;
            }
        }
        return result;
    }
}*/

import formatDate from "../utils/formatDate.js";
import createActionId from "../utils/actionId.js";

export default class ActionAdapter {
    static adapt(actionItems) {
        return actionItems.map(item => {
            const id =
                createActionId(item);
            return {
                id,
                category:
                    item.category,
                entityType:
                    item.entityType,
                entityId:
                    item.entityId,
                title:
                    item.title,
                blockedEntitiesSummary:
                    item.blockedEntitiesSummary,
                createdAt:
                    formatDate(item.createdAt)

            };
        });
    }
}