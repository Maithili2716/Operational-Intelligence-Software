// =========================================
// Runtime Graph Builder
// Runtime Contract
//        ↓
// React Flow Model
// =========================================
import { getLayoutedGraph } from "./layout/graphLayout";

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
    const layout = getLayoutedGraph(
    graph.nodes,
    graph.edges
);
    console.log("GRAPH LAYOUT:", layout);
    
    const nodes = layout.nodes.map(node => {

    const faded =
        hoveredNode
            ? hoveredNode.id !== node.id
            : startNode
                ? !highlightedNodes.has(node.id)
                : false;
    return {
        id: node.id,
     type: "runtimeNode",
        position: node.position,
        sourcePosition: node.sourcePosition,
        targetPosition: node.targetPosition,

        data: {
            id: node.id,
            entityType: node.type,
            label: node.label ?? node.id,
            state: state[node.id],
            highlighted:
                highlightedNodes.has(node.id),
            selected:
                selectedNode?.id === node.id,
            faded,
            hovered:
                hoveredNode?.id === node.id
        }
    };
});


    const edges = layout.edges.map(edge => {
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
                    ? !highlighted
                    : false,
            hovered:
                hoveredEdge?.id ===
                `${edge.from}-${edge.to}`
        }
    };
});
    return {
    nodes,
    edges,canvas:layout.scene.canvas,
     

};

}