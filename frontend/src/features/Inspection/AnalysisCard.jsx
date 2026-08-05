// =========================================
// Analysis Card
// Root Cause Analysis
// =========================================

import FadeIn from "./FadeIn";

export default function AnalysisCard({
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
        <FadeIn
            direction="right"
            delay={60}
        >
            <section
                className="
                    rounded-xl
                    border
                    border-slate-800
                    bg-slate-900/60
                    p-5
                "
            >
                {/* Header */}
                <div
                    className="
                        flex
                        items-center
                        justify-between
                    "
                >
                    <div
                        className="
                            text-[10px]
                            font-semibold
                            uppercase
                            tracking-[0.16em]
                            text-slate-500
                        "
                    >
                        Analysis
                    </div>
                    <span
                        className={`
                            text-[10px]
                            font-semibold
                            uppercase
                            ${confidenceColor[
                                analysis.confidence
                            ]}
                        `}
                    >
                        {analysis.confidence}
                    </span>

                </div>
                {/* Summary */}
                <p
                    className="
                        mt-4
                        text-sm
                        leading-6
                        text-slate-200
                    "
                >
                    {analysis.summary}
                </p>
                {/* Cause */}
                <div
                    className="
                        mt-5
                        border-l-2
                        border-cyan-500/60
                        pl-4
                    "
                >
                    <div
                        className="
                            mb-1
                            text-[10px]
                            font-semibold
                            uppercase
                            tracking-[0.16em]
                            text-slate-500
                        "
                    >
                        Root Cause
                    </div>
                    <p
                        className="
                            text-sm
                            leading-6
                            text-slate-300
                        "
                    >
                        {analysis.cause}
                    </p>
                </div>
            </section>
        </FadeIn>
    );
}