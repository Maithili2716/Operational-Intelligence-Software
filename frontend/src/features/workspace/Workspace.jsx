import useWorkspace from "../../hooks/useWorkspace";
import useSelection from "../../hooks/useSelection";
import useWorkflow from "../../hooks/useWorkflow";

import Header from "./Header";
import AttentionPanel from "../attention/AttentionPanel";
import AttentionHoverCard from "../attention/AttentionHoverCard";

import RuntimeCanvas from "../runtime/RuntimeCanvas";
import RuntimeStateCard from "../runtime/RuntimeStateCard";

import InspectionView from "../Inspection/InspectionView";
import WorkflowPanel from "./WorkflowPanel";


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
        openInspection: selectAttention,
        clearSelection
    } = useSelection();
    const {
        workflowStage,
        inspection,
        loading:workflowLoading,
        openInspection:openWorkflow,
        reviewChanges,
        backToInspection,
        beginCommit,
        resetWorkflow
    } = useWorkflow();

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
    async function handleAttentionSelect(attentionItem) {
    if (selectedAttention?.id === attentionItem.id){
        return;
    }
        selectAttention(attentionItem);
        await openWorkflow(attentionItem.id);
    }

    function handlePaneClick() {
    clearSelection();
    resetWorkflow();
    }


    return (
        <div className="h-screen overflow-hidden bg-slate-950 text-slate-10">
            <Header />
            <main className="mx-auto flex h-[calc(100vh-72px)] overflow-hidden max-w-[1800px] gap-6 px-6 pb-6">
                {/* Left Sidebar */}
                <aside className={`flex min-w-[300px]
                flex-col overflow-y-auto w-[22%]
            `}>             
            <AttentionPanel
                attention={attention}
                hoveredAttention={hoveredAttention}
                selectedAttention={selectedAttention}
                setHoveredAttention={setHoveredAttention}
                onAttentionSelect={handleAttentionSelect}
            />
            </aside>
         
            {/* Runtime */}
                <section className={`flex w-[60%]  flex-col`}>
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
                        onPaneClick={handlePaneClick}
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
                <AttentionHoverCard
                attention={hoveredAttention}
                position={hoveredAttention?.hoverPosition}
                />
             
            {/* Inspection / Execution */}
            <aside className="w-[18%] min-w-[340px]">
            <WorkflowPanel inspection={inspection}>
            {
            workflowStage === "inspection"
            ? (
                <InspectionView
                    inspection={inspection}
                    onReviewChanges={
                        reviewChanges
                    }
                />
            )

           /* : workflowStage === "execution"
            ? (
                <ExecutionView
                    inspection={inspection}
                    onBack={
                        backToInspection
                    }
                    onCommit={
                        beginCommit /*onCommit={async () => {
                            await commitExecution();
                            refreshWorkspace();
                            resetWorkflow();
                        }
                        }
                    }
                />
            )*/
            : null
            }
            </WorkflowPanel>
                </aside>
            </main>
        </div>
    );
}


