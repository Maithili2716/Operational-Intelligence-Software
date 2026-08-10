// =========================================
// Execution View
// Review Runtime Updates
// =========================================

/*import ExecutionSection from "./ExecutionSection";

import PendingChangesSection from "./PendingChangesSection";
import EstimatedImpactSection from "./EstimatedImpactSection";
import CommitBar from "./CommitBar";

export default function ExecutionView({
    inspection,
    onBack,
    onCommit
}) {
    if (!inspection)
        return null;

    return (
        <div
            className="
                h-full
                flex
                flex-col
            "
        >
            {}

            <ExecutionSection
                title="Pending Changes"
            >
                <PendingChangesSection
                    updates={
                        inspection.mitigationStrategy.updates
                    }
                />
            </ExecutionSection>

            {}

            <ExecutionSection
                title="Estimated Impact"
            >
                <EstimatedImpactSection
                    inspection={inspection}
                />
            </ExecutionSection>

            {}

            <ExecutionSection
                title="Commit"
            >
                <CommitBar
                    onBack={onBack}
                    onCommit={onCommit}
                />
            </ExecutionSection>

        </div>
    );
}*/

// =========================================
// Execution View
// Review Runtime Updates / Manual Actions
// =========================================

import ExecutionSection from "./ExecutionSection";

import PendingChangesSection from "./PendingChangesSection";
import ManualActionsSection from "./ManualActionsSection";
import EstimatedImpactSection from "./EstimatedImpactSection";
import CommitBar from "./CommitBar";

export default function ExecutionView({
    inspection,
    onBack,
    onCommit,
    onManualActionSelect
}) {
    if (!inspection)
        return null;

    const updates =
        inspection.mitigationStrategy?.updates ?? [];

    const manualActions =
        inspection.mitigationStrategy?.manualActions ?? [];

    return (
        <div
            className="
                h-full
                flex
                flex-col
            "
        >

            {/* =====================================
                Pending Changes / Manual Actions
            ====================================== */}

            <ExecutionSection
                title={
                    updates.length > 0
                        ? "Pending Changes"
                        : "Manual Actions"
                }
            >

                {updates.length > 0 ? (

                    <PendingChangesSection
                        updates={updates}
                    />

                ) : manualActions.length > 0 ? (

                    <ManualActionsSection
                        actions={manualActions}
                        onActionSelect={
                            onManualActionSelect
                        }
                    />

                ) : (

                    <div
                        className="
                            py-6
                            text-sm
                            text-slate-500
                        "
                    >
                        No pending changes or manual actions.
                    </div>

                )}

            </ExecutionSection>


            {/* =====================================
                Estimated Impact
            ====================================== */}

            <ExecutionSection
                title="Estimated Impact"
            >
                <EstimatedImpactSection
                    inspection={inspection}
                />
            </ExecutionSection>


            {/* =====================================
                Commit
            ====================================== */}

            <ExecutionSection
                title="Commit"
            >
                <CommitBar
                    onBack={onBack}
                    onCommit={onCommit}
                />
            </ExecutionSection>

        </div>
    );
}