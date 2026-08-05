// =========================================
// Analysis Section
// Root Cause Analysis
// =========================================

export default function AnalysisSection({
    analysis
}) {
    if (!analysis)
        return null;

    const confidenceColor = {
        HIGH: "text-emerald-400",
        MEDIUM: "text-amber-400",
        LOW: "text-rose-400"
    };

    return (
        <>
            {/* Summary */}
            <p
                className="
                    text-sm
                    leading-6
                    text-slate-200
                "
            >
                {analysis.summary}
            </p>
            {/* Root Cause */}
            <div className="mt-5">
                <div
                    className="
                        text-[11px]
                        font-medium
                        uppercase
                        tracking-[0.14em]
                        text-slate-500
                    "
                >
                    Cause
                </div>
                <p
                    className="
                        mt-2
                        text-sm
                        leading-6
                        text-slate-400
                    "
                >
                    {analysis.cause}
                </p>
            </div>

            {/* Confidence */}
            <div
                className="
                    mt-3
                    flex
                    items-center
                    justify-between
                    border-t
                    border-slate-800
                    pt-4
                "
            >
                <span
                    className="
                        text-[11px]
                        uppercase
                        tracking-[0.14em]
                        text-slate-500
                    "
                >
                    Severity
                </span>
                <span
                    className={`
                        text-xs
                        font-semibold
                        uppercase
                        ${
                            confidenceColor[
                                analysis.confidence
                            ]
                        }
                    `}
                >
                    {analysis.confidence}
                </span>
            </div>
        </>
    );
}