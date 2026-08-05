// =========================================
// Inspection View
// Investigation Flow
// =========================================

import AnalysisCard from "./AnalysisCard";
import ImpactCard from "./ImpactCard";
import ResolutionCard from "./ResolutionCard";

export default function InspectionView({
    inspection,
    onReviewChanges
}) {
    if (!inspection)
        return null;

    return (
        <div
            className="
                flex
                flex-col
                gap-5
            "
        >
            <AnalysisCard
                analysis={
                    inspection.rootCauseAnalysis
                }
            />
            <ImpactCard
                entities={
                    inspection.affectedEntities
                }
            />
            <ResolutionCard
                strategy={
                    inspection.mitigationStrategy
                }
                onReviewChanges={
                    onReviewChanges
                }
            />
        </div>
    );
}