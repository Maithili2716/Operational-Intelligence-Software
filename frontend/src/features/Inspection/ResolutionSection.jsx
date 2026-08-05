// =========================================
// Resolution Section
// Proposed Runtime Updates
// =========================================

export default function ResolutionSection({
    strategy
}) {
    if (!strategy)
        return null;

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
                {strategy.summary}
            </p>

            {/* Runtime Updates */}

            <div className="mt-5">

                {
                    strategy.updates.map((update, index) => (

                        <div
                            key={`${update.entityId}-${update.field}`}
                            className={`
                                py-4
                                ${
                                    index !== 0
                                        ? "border-t border-slate-800"
                                        : ""
                                }
                            `}
                        >

                            {/* Entity */}

                            <div
                                className="
                                    flex
                                    items-start
                                    justify-between
                                    gap-4
                                "
                            >

                                <div
                                    className="
                                        min-w-0
                                    "
                                >

                                    <div
                                        className="
                                            truncate
                                            text-sm
                                            font-medium
                                            text-slate-100
                                        "
                                    >
                                        {update.entityId}
                                    </div>

                                    <div
                                        className="
                                            mt-1
                                            text-[11px]
                                            uppercase
                                            tracking-[0.14em]
                                            text-slate-500
                                        "
                                    >
                                        {update.entityType}
                                    </div>

                                </div>

                                <div
                                    className="
                                        text-xs
                                        text-slate-400
                                    "
                                >
                                    {update.field}
                                </div>

                            </div>

                            {/* Diff */}

                            <div
                                className="
                                    mt-4
                                    flex
                                    items-center
                                    gap-3
                                    text-sm
                                "
                            >

                                <span
                                    className="
                                        font-medium
                                        text-slate-400
                                    "
                                >
                                    {String(update.currentValue)}
                                </span>

                                <span
                                    className="
                                        text-slate-600
                                    "
                                >
                                    →
                                </span>

                                <span
                                    className="
                                        font-semibold
                                        text-cyan-300
                                    "
                                >
                                    {String(update.requiredValue)}
                                </span>

                            </div>

                        </div>

                    ))
                }

            </div>
        </>
    );
}