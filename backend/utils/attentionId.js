export default function createAttentionId(item) {

    const normalizedTitle =
        item.title
            .toUpperCase()
            .replace(/\s+/g, "_");

    return item.discriminator
        ? `ATTENTION:${item.entityId}:${item.category}:${item.discriminator}:${normalizedTitle}`
        : `ATTENTION:${item.entityId}:${item.category}:${normalizedTitle}`;
}