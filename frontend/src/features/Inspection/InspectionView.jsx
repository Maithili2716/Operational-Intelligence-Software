// =========================================
// Inspection View
// Investigation Summary
// =========================================

import InspectionSection from "./InspectionSection";

import AnalysisSection from "./AnalysisSection";
import ImpactSection from "./ImpactSection";
import ResolutionSection from "./ResolutionSection";

export default function InspectionView({
    inspection,
    onReviewChanges,
    onManualActionSelect
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
            {/* Analysis */}

            <InspectionSection
                title="Analysis:"
            >
                <AnalysisSection
                    analysis={
                        inspection.rootCauseAnalysis
                    }
                />
            </InspectionSection>

            {/* Impact */}

            <InspectionSection
                title="Impact- Affected Entities"
            >
                <ImpactSection
                    entities={
                        inspection.affectedEntities
                    }
                />
            </InspectionSection>

            {/* Resolution */}

            <InspectionSection
                title="Resolution"
                footer={
                    <button
                        onClick={
                            onReviewChanges
                        }
                        className="
                            ml-auto
                            flex
                            items-center
                            gap-2
                            text-sm
                            font-medium
                            text-cyan-300
                            transition-colors
                            hover:text-cyan-200
                        "
                    >
                        Review Updates
                        <span>→</span>
                    </button>
                }
            >
                <ResolutionSection
                    strategy={
                        inspection.mitigationStrategy   
                    }
                     onManualActionSelect={
                        onManualActionSelect
                    }
                />
            </InspectionSection>
        </div>
    );
}