import {
    useMemo,
    useEffect,
    useRef
} from "react";

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
    selectedMitigation,
    onPaneClick
}) {
    const scrollContainerRef = useRef(null);
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

    useEffect(() => {
    const selectedEntity =
    selectedAttention?.entityId ??
    selectedAction?.entityId ??
    selectedMitigation?.entityId ??
    selectedNode?.id;

    if (!selectedEntity)
        return;
    const node = graph.nodes.find(
        n => n.id === selectedEntity
    );
    if (!node)
        return;
    scrollContainerRef.current?.scrollTo({
        left:
        Math.max(
            node.position.x-350,
            0
        ),
        top:
        Math.max(
            node.position.y-220,
            0),
        behavior: "smooth"
        });
    }, [
        graph.nodes,
        selectedAttention,
        selectedAction,
        selectedMitigation,
        selectedNode
    ]);
    function handlePaneClick() {
    onPaneClick();
    scrollContainerRef.current?.scrollTo({
          left:0,
          top:0,
        behavior: "smooth"
    });
    }
    
    return (
        <section
            className="
                h-[72vh]
                overflow-hidden
                rounded-2xl
                border
                border-slate-800
                bg-slate-950
            "
        >
            <div
             ref={scrollContainerRef}
                className="
                     w-full
                    h-full
                    overflow-x-auto
                    overflow-y-auto
                "
            >
                <div className=""
                    style={{
                        width: graph.canvas.width,
                        height: graph.canvas.height
                    }}
                >
                    <ReactFlow
                        nodes={graph.nodes}
                        edges={graph.edges}
                        nodeTypes={nodeTypes}
                        edgeTypes={edgeTypes}
                    
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
                        onNodeMouseEnter={(event, node) =>
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
                        onPaneClick={handlePaneClick
                        }
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