export function formatEntityId(entityId) {
    if (!entityId)
        return "";

    const [type, number] =
        entityId.split(":");

    return `${type
        .replace(/_/g, " ")
        .toLowerCase()
        .replace(/\b\w/g, char => char.toUpperCase())
    } ${number}`;
}