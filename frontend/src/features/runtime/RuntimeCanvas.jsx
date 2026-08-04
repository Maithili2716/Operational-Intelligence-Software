import { useMemo } from "react";

import ReactFlow, {
    Background
} from "reactflow";

import "reactflow/dist/style.css";

import RuntimeNode from "./RuntimeNode";
import RuntimeEdge from "./RuntimeEdge";

import { buildRuntimeGraph } from "../../builders/runtimeGraphBuilder";
import { GRAPH } from "./RuntimeTheme";

const nodeTypes = {
    runtimeNode: RuntimeNode
};
const edgeTypes = {
    runtimeEdge: RuntimeEdge
};
export default function RuntimeCanvas({
    runtime,
    selectedAttention,
    selectedAction,
    selectedNode,
    hoveredNode,
    hoveredEdge,
    onNodeHover,
    onEdgeHover,
    onNodeSelect,
    onPaneClick
}) {
    const graph = useMemo(() => {
        if (!runtime) {
            return {
                nodes: [],
                edges: []
            };
     }
        return buildRuntimeGraph(
         runtime.graph,
            runtime.state,
            {
                selectedAttention,
                selectedAction,
                selectedNode,
                hoveredNode,
                hoveredEdge
            }
        );
    }, [
        runtime,
        selectedAttention,
        selectedAction,
        selectedNode,
        hoveredNode,
      hoveredEdge
    ]);
    return (
        <section
            className="
                h-[72vh]
                w-full
                overflow-hidden
                rounded-2xl
                border
                border-slate-800
                bg-slate-950
            "
        >
            <div
                className="
                    h-full
                    w-full
                    overflow-x-auto
                    overflow-y-auto
                "
            >
                <div
                    className="h-full"
                    style={{
                        minWidth: "1800px"
                    }}
                >
                    <ReactFlow
                        nodes={graph.nodes}
                        edges={graph.edges}
                        nodeTypes={nodeTypes}
                        edgeTypes={edgeTypes}
                        fitView
                        fitViewOptions={{
                            padding: GRAPH.FIT_PADDING
                        }}

                        defaultViewport={{
                            x: 0,
                          y: 0,
                            zoom: 1
                        }}
                        minZoom={1}
                        maxZoom={1}
                        nodesDraggable={false}
                        nodesConnectable={false}
                        elementsSelectable={false}
                        panOnDrag={false}
                        panOnScroll={false}
                        zoomOnScroll={false}
                        zoomOnPinch={false}
                        zoomOnDoubleClick={false}
                        preventScrolling={false}
                        proOptions={{
                            hideAttribution: true

                        }}
                        onNodeClick={(_, node) =>

                            onNodeSelect(node)
                        }
                        onNodeMouseEnter={(_, node) =>
                            onNodeHover({...node,
                            hoverPosition: {
                            x: event.clientX,
                            y: event.clientY
                         }})
                        }
                        onNodeMouseLeave={() =>
                        onNodeHover(null)
                        }
                        onEdgeMouseEnter={(_, edge) =>
                            onEdgeHover(edge)
                        }
                        onEdgeMouseLeave={() =>
                            onEdgeHover(null)
                        }
                        onPaneClick={() => {
                            onPaneClick();
                        }}
                    >
                        <Background
                            variant="dots"
                            gap={36}
                            size={1}
                            color="#20262e"
                        />
                    </ReactFlow>
                </div>
            </div>
        </section>
    );
}