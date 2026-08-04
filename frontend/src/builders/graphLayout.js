// =========================================
// Graph Layout Engine
// Backend Graph
//        ↓
// Positioned ReactFlow Graph
// =========================================

import { LAYOUT } from "../features/runtime/RuntimeTheme";

export function getLayoutedGraph(nodes, edges) {
    // --------------------------------------
    // Build Graph
    // --------------------------------------
    const adjacency = new Map();
    const indegree = new Map();

    nodes.forEach(node => {
        adjacency.set(node.id, []);
        indegree.set(node.id, 0);

    });

    edges.forEach(edge => {
        adjacency.get(edge.source)?.push(edge.target);
        indegree.set(
            edge.target,
            (indegree.get(edge.target) ?? 0) + 1
        );
    });

    // --------------------------------------
    // Find Root Nodes
    // --------------------------------------
    const roots = nodes.filter(
        node => indegree.get(node.id) === 0
    );

    // --------------------------------------
    // Assign Levels (BFS)
    // --------------------------------------
    const levels = new Map();
    const queue = [];
    roots.forEach(root => {
        levels.set(root.id, 0);
       queue.push(root.id);
    });

    while (queue.length) {
        const current = queue.shift();
        const currentLevel = levels.get(current);
        adjacency.get(current).forEach(next => {
            const nextLevel = currentLevel + 1;
            if (
                !levels.has(next) ||
                nextLevel > levels.get(next)
            ) {
                levels.set(next, nextLevel);
            }
            queue.push(next);
        });
    }
    // --------------------------------------
    // Group Nodes By Level
    // --------------------------------------
    const groupedLevels = new Map();
    nodes.forEach(node => {
        const level = levels.get(node.id) ?? 0;
        if (!groupedLevels.has(level)) {

            groupedLevels.set(level, []);

        }
        groupedLevels.get(level).push(node);
    });
    // --------------------------------------
    // Position Nodes
    // --------------------------------------
    const layoutedNodes = [];
    const orderedLevels =
        [...groupedLevels.keys()].sort((a, b) => a - b);
    orderedLevels.forEach(level => {
        const levelNodes = groupedLevels.get(level);
        levelNodes.forEach((node, index) => {
            layoutedNodes.push({
                ...node,
                sourcePosition: "right",
                targetPosition: "left",
                position: {
                    x:
                        LAYOUT.PADDING_X +
                        level * LAYOUT.LEVEL_SPACING,
                    y:
                        LAYOUT.PADDING_Y +
                        index * LAYOUT.NODE_SPACING
                }
            });
        });
    });

    return {
        nodes: layoutedNodes,
        edges
    };
}