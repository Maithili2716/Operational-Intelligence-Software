// =========================================
// Resolution Card
// Proposed Runtime Updates
// =========================================

import FadeIn from "./FadeIn";

export default function ResolutionCard({
    strategy,
    onReviewChanges
}) {
    if (!strategy)
        return null;

    return (
        <FadeIn
            direction="right"
            delay={220}
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
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-[0.16em]
                        text-slate-500
                    "
                >
                    Resolution
                </div>
                {/* Summary */}
                <p
                    className="
                        
                        text-sm
                        leading-6
                        text-slate-200
                    "
                >
                    {strategy.summary}
                </p>
                {/* Updates */}
                <div
                    className="
                        
                        space-y-3
                    "
                >
                    {
                        strategy.updates.map(update => (
                            <div
                                key={`${update.entityId}-${update.field}`}
                                className="
                                    rounded-lg
                                    border
                                    border-slate-800
                                    bg-slate-950/70
                                    p-4
                                "
                            >
                                {/* Entity */}
                                <div
                                    className="
                                        flex
                                        items-center
                                        justify-between
                                    "
                                >
                                    <span
                                        className="
                                            text-sm
                                            font-medium
                                            text-slate-100
                                        "
                                    >
                                        {update.entityId}
                                    </span>
                                    <span
                                        className="
                                            rounded-md
                                            border
                                            border-slate-700
                                            px-2
                                            py-0.5
                                            text-[10px]
                                            font-semibold
                                            uppercase
                                            tracking-[0.14em]
                                            text-slate-400
                                        "
                                    >
                                        {update.entityType}
                                    </span>
                                </div>

                                {/* Field */}
                                <div
                                    className="
                                        
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
                                        {update.field}
                                    </div>
                                    <div
                                        className="
                                            flex
                                            items-center
                                            gap-3
                                        "
                                    >
                                        <span
                                            className="
                                                rounded-md
                                                bg-slate-800
                                                px-3
                                                py-1
                                                text-sm
                                                text-slate-300
                                            "
                                        >
                                            {String(update.currentValue)}
                                        </span>
                                        <span
                                            className="
                                                text-slate-500
                                            "
                                        >
                                            →
                                        </span>
                                        <span
                                            className="
                                                rounded-md
                                                bg-cyan-500/10
                                                px-3
                                                py-1
                                                text-sm
                                                font-medium
                                                text-cyan-300
                                            "
                                        >
                                            {String(update.requiredValue)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                         <div className=" flex justify-end">
                         <button>
                          Review Changes →
                         </button>
                         </div>

                </div>
            </section>
        </FadeIn>
    );
}