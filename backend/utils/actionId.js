export default function createActionId(action) {

    const normalizedTitle =
        action.title
            .toUpperCase()
            .replace(/\s+/g, "_");

    return `ACTION:${action.entityId}:${action.category}:${normalizedTitle}`;
}