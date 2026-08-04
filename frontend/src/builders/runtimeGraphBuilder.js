// =========================================
// Runtime Graph Builder
// Runtime Contract
//        ↓
// React Flow Model
// =========================================
import { getLayoutedGraph } from "./graphLayout";

export function buildRuntimeGraph(
    graph,
    state,
    selection
) {
    const {
        selectedAttention,
        selectedAction,
        selectedNode,
        hoveredNode,
        hoveredEdge
    } = selection;
  
    // =====================================
    // Cross Highlight Target
    // =====================================
    const highlightedEntity =
        selectedAttention
            ? selectedAttention.entityId
            : selectedAction
            ? selectedAction.entityId
            : null;

    // =====================================
    // Visual Focus
    // =====================================
    const startNode =
    highlightedEntity ??
    selectedNode?.id ??
    null;   
    const highlightedNodes = new Set();
    const highlightedEdges = new Set(); 

    if (startNode) {
    const stack = [startNode];
    while (stack.length) {
        const current = stack.pop();
        if (highlightedNodes.has(current))
            continue;
        highlightedNodes.add(current);
        graph.edges.forEach(edge => {
            if (edge.from === current) {
                highlightedEdges.add(
                    `${edge.from}-${edge.to}`
                );
                stack.push(edge.to);
            }
        });
    }
}
    // =====================================
    // React Flow Nodes
    // =====================================

    const nodes = graph.nodes.map(node => {
        const isHighlighted =
            highlightedNodes.has(node.id);

        const isSelected =
            selectedNode?.id === node.id  ;

        const faded =
            hoveredNode
            ? hoveredNode.id !== node.id
            :startNode ? !highlightedNodes.has(node.id)
            : false;

        return {
            id: node.id,
            type: "runtimeNode",
            position: {
                x: 0,
                y: 0
            },
            data: {
                id: node.id,
                entityType: node.type,
                label: node.label ?? node.id,
                state: state[node.id],
                highlighted: isHighlighted,
                selected: isSelected,
                faded,
                hovered:
                    hoveredNode?.id === node.id
            }
        };
    });

    // =====================================
    // React Flow Edges
    // =====================================
    const edges = graph.edges.map(edge => {
        const highlighted =
            highlightedEdges.has(
            `${edge.from}-${edge.to}`   
    );
        return {
            id:
                `${edge.from}-${edge.to}`,
            source:
                edge.from,
            target:
                edge.to,
            type:
                "runtimeEdge",
            data: {
                relationship:
                    edge.relationship,
                highlighted,
                faded:
                   startNode
                    ? !highlighted: false,
                hovered:
                    hoveredEdge?.id ===
                    `${edge.from}-${edge.to}`
            }
        };
    });

    return getLayoutedGraph(
        nodes,
        edges
    );
}