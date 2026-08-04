import useWorkspace from "../../hooks/useWorkspace";
import useSelection from "../../hooks/useSelection";
import useInspectionExecution from "../../hooks/useInspectionExecution";

import Header from "./Header";

/*import AttentionList from "../attention/AttentionList/AttentionList";
import ActionList from "../action/ActionList/ActionList";*/

import RuntimeCanvas from "../runtime/RuntimeCanvas";
import RuntimeStateCard from "../runtime/RuntimeStateCard";
/*import InspectionPanel from "../inspection/InspectionPanel/InspectionPanel";*/

/*export default function Workspace() {
    const {
        runtime,
        attention,
        action,
        loading,
        error,
        refreshWorkspace
    } = useWorkspace();

    const {
        hoveredAttention,
        setHoveredAttention,
        hoveredAction,
        setHoveredAction,
        hoveredNode,
        setHoveredNode,
        hoveredEdge,
        setHoveredEdge,
        selectedAttention,
        selectedAction,
        selectedNode,
        selectNode,
        isInspectionOpen,
        openInspection,
        closeInspection,
        isExecutionOpen,
        openExecution,
        closeExecution,
        clearSelection
    } = useSelection();
    const {
      inspection,
        inspectionLoading,
        loadInspection,
        execution,
        executionLoading,
        loadExecution,
        clearPanel
    } = useInspectionExecution();
    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950" />
        );
    }
    if (error) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-950 text-red-400">
                {error.message}
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100">
            <Header />
            <main className="mx-auto flex h-[calc(100vh-72px)] max-w-[1800px] gap-6 px-6 pb-6">
                {/* Left Sidebar *//*}
                <aside className="flex w-[22%] min-w-[300px] flex-col overflow-y-auto">
                    <AttentionList
                        attention={attention}
                        selectedAttention={selectedAttention}
                        hoveredAttention={hoveredAttention}
                        onHover={setHoveredAttention}
                        onSelect={async (item) => {
                            openInspection(item);
                            await loadInspection(item.id);
                        }}
                    />
                    <ActionList
                        action={action}
                        selectedAction={selectedAction}
                        hoveredAction={hoveredAction}
                        onHover={setHoveredAction}
                        onSelect={async (item) => {
                            openExecution(item);
                          await loadExecution(item.id);
                        }}
                    />
                </aside>*/

              /*  {/* Runtime *//*}
                <section className="flex w-[60%] flex-col">
                    <RuntimeCanvas
                        runtime={runtime}
                        selectedAttention={selectedAttention}
                        selectedAction={selectedAction}
                        selectedNode={selectedNode}
                        hoveredNode={hoveredNode}
                        hoveredEdge={hoveredEdge}
                        onNodeHover={setHoveredNode}
                        onEdgeHover={setHoveredEdge}
                        onNodeSelect={selectNode}
                    />
                </section>
                {/* Inspection / Execution *//*}
                <aside className="w-[18%] min-w-[340px]">
                    <InspectionPanel
                        inspection={inspection}
                        execution={execution}
                      inspectionLoading={inspectionLoading}
                        executionLoading={executionLoading}
                        isInspectionOpen={isInspectionOpen}
                        isExecutionOpen={isExecutionOpen}
                        onClose={() => {
                            closeInspection();
                            closeExecution();
                            clearPanel();
                            clearSelection();
                        }}
                      refreshWorkspace={refreshWorkspace}
                    />
                </aside>
            </main>
        </div>
    );
}
    */

export default function Workspace() {
    const {
        runtime,
        attention,
        action,
        loading,
        error,
        refreshWorkspace
    } = useWorkspace();

    const {
        hoveredAttention,
        setHoveredAttention,
        hoveredAction,
        setHoveredAction,
        hoveredNode,
        setHoveredNode,
        hoveredEdge,
        setHoveredEdge,
        selectedAttention,
        selectedAction,
        selectedNode,
        selectNode,
        isInspectionOpen,
        openInspection,
        closeInspection,
        isExecutionOpen,
        openExecution,
        closeExecution,
        clearSelection,
        clearNodeSelection
    } = useSelection();
    const {
      inspection,
        inspectionLoading,
        loadInspection,
        execution,
        executionLoading,
        loadExecution,
        clearPanel
    } = useInspectionExecution();
    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950" />
        );
    }
    if (error) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-950 text-red-400">
                {error.message}
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100">
            <Header />
            <main className="mx-auto flex h-[calc(100vh-72px)] max-w-[1800px] gap-6 px-6 pb-6">
                {/* Left Sidebar */}
                <aside className="flex w-[22%] min-w-[300px] flex-col overflow-y-auto">
                 Attention and Action
                </aside>

                {/* Runtime */}
                <section className="flex w-[60%] flex-col">
                    <RuntimeCanvas
                        runtime={runtime}
                        selectedAttention={selectedAttention}
                        selectedAction={selectedAction}
                        selectedNode={selectedNode}
                        hoveredNode={hoveredNode}
                        hoveredEdge={hoveredEdge}
                        onNodeHover={setHoveredNode}
                        onEdgeHover={setHoveredEdge}
                        onNodeSelect={selectNode}
                        onPaneClick={clearNodeSelection}
                    />
                </section>
                <RuntimeStateCard
                node={hoveredNode}
                state={ hoveredNode
                ? runtime.state[hoveredNode.id]
                : null
                }
                position={
                hoveredNode?.hoverPosition }
                />
                {/* Inspection / Execution */}
                <aside className="w-[18%] min-w-[340px]">
                  Inspection panel
                </aside>
            </main>
        </div>
    );
}


