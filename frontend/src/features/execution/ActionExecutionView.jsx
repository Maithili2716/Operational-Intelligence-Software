// =========================================
// Action Execution View
// =========================================

import ExecutionSection from "./ExecutionSection";

import ExecutionSummarySection from "./ExecutionSummarySection";
import BlockedWorkflowSection from "./BlockedWorkflowSection";
import ExecutionPlanSection from "./ExecutionPlanSection";
import CommitBar from "./CommitBar";

export default function ActionExecutionView({
    execution,
    onBack,
    onCommit
}) {
    if (!execution)
        return null;

    return (
        <div
            className="
                h-full
                flex
                flex-col
            "
        >
            <ExecutionSection
                title="Execution Summary"
            >
                <ExecutionSummarySection
                    summary={
                        execution.executionSummary
                    }
                    entityId={execution.entityId}
                />
            </ExecutionSection>

            <ExecutionSection
                title="Blocked Workflow"
            >
                <BlockedWorkflowSection
                    entities={
                        execution.affectedEntities
                    }
                />
            </ExecutionSection>

            <ExecutionSection
                title="Execution Plan"
            >
                <ExecutionPlanSection
                    plan={
                        execution.executionPlan
                    }
                />
            </ExecutionSection>

            <ExecutionSection
                title="Execute"
            >
                <CommitBar
                    onBack={onBack}
                    onCommit={onCommit}
                />
            </ExecutionSection>

        </div>
    );
}