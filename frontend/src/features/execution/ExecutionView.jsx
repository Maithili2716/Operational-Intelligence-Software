// =========================================
// Execution View
// Review Runtime Updates
// =========================================

import ExecutionSection from "./ExecutionSection";

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
            {/* Pending Runtime Changes */}

            <ExecutionSection
                title="Pending Changes"
            >
                <PendingChangesSection
                    updates={
                        inspection.mitigationStrategy.updates
                    }
                />
            </ExecutionSection>

            {/* Estimated Impact */}

            <ExecutionSection
                title="Estimated Impact"
            >
                <EstimatedImpactSection
                    inspection={inspection}
                />
            </ExecutionSection>

            {/* Commit */}

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