import useWorkspace from "../../hooks/useWorkspace";
import useSelection from "../../hooks/useSelection";
import useWorkflow from "../../hooks/useWorkflow";

import Header from "./Header";
import AttentionPanel from "../attention/AttentionPanel";
import AttentionHoverCard from "../attention/AttentionHoverCard";

import ActionPanel from "../action/ActionPanel";
import ActionHoverCard from "../action/ActionHoverCard";

import RuntimeCanvas from "../runtime/RuntimeCanvas";
import RuntimeStateCard from "../runtime/RuntimeStateCard";

import InspectionView from "../Inspection/InspectionView";
import ExecutionView from "../execution/ExecutionView";
import ActionExecutionView
from "../execution/ActionExecutionView";
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
        openExecution:selectAction,
        clearSelection
    } = useSelection();
    const {
        workflowStage,
        inspection,
        execution,
        loading:workflowLoading,
        openInspection:openWorkflow,
        openExecution,
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

    async function handleActionSelect(actionItem) {
    if (selectedAction?.id === actionItem.id) {
        return;
    }
    selectAction(actionItem);
    await openExecution(actionItem.id);
    }
    function handlePaneClick() {
    clearSelection();
    resetWorkflow();
    }


    return (
        <div className="h-screen overflow-hidden bg-slate-950 text-slate-10">
            <Header />
            <main className="mx-auto flex h-[calc(100vh-72px)] overflow-hidden max-w-[1800px] gap-6 px-3 pb-6">
                {/* Left Sidebar */}
                <aside className={`flex min-w-[300px]
                flex-col  w-[22%]
            `}>             
            <AttentionPanel
                attention={attention}
                hoveredAttention={hoveredAttention}
                selectedAttention={selectedAttention}
                setHoveredAttention={setHoveredAttention}
                onAttentionSelect={handleAttentionSelect}
            />
            <ActionPanel
                action={action}
                hoveredAction={hoveredAction}
                selectedAction={selectedAction}
                setHoveredAction={setHoveredAction}
                onActionSelect={handleActionSelect}
            />
            </aside>
         
            {/* Runtime */}
                <section className={`flex-1 flex min-w-0  flex-col`}>
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
                <ActionHoverCard
                action={hoveredAction}
                position={hoveredAction?.hoverPosition}
            />
             
            {/* Inspection / Execution */}
            <aside className="shrink-0 w-[340px] flex flex-col min-h-0">
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

            : workflowStage === "execution"
            ? (
                <ExecutionView
                    inspection={inspection}
                    onBack={
                        backToInspection
                    }
                    onCommit={
                        beginCommit 
                        }
                    
                />
            )
            : workflowStage === "actionExecution"
            ? (
                <ActionExecutionView
                    execution={execution}
                    onBack={resetWorkflow}
                    onCommit={beginCommit}
                />
            )
            : null
            }
            </WorkflowPanel>
                </aside>
            </main>
        </div>
    );
}


