// =========================================
// Stable Layout Offsets
// Same node always gets same offset
// =========================================
/*const OFFSETS = [
    0,
    18,
    -12,
    25,
    -20,
    14,
    -8,
    10
];

export function stableOffset(id) {
    let hash = 0;
    for (let i = 0; i < id.length; i++) {

        hash += id.charCodeAt(i);

    }
    return OFFSETS[
        hash % OFFSETS.length
    ];
}*/

export function stableOffset(id) {

    let hash = 0;

    for (const c of id) {
        hash += c.charCodeAt(0);
    }

    return (hash % 15) - 7;
}