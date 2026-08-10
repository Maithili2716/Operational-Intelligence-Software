export function uniqueAffectedEntities(entities) {
    const seen = new Set();

    return entities.filter(entity => {
        const key = `${entity.entityType}:${entity.entityId}`;

        if (seen.has(key)) {
            return false;
        }

        seen.add(key);
        return true;
    });
}