// =========================================
// Resolution Section
// Proposed Runtime Updates
// =========================================

export default function ResolutionSection({
    strategy,
    onManualActionSelect
}) {
    if (!strategy)
        return null;

    const updates =
        strategy.updates ?? [];

    const manualActions =
        strategy.manualActions ?? [];

    return (
        <div className="space-y-4">

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

            {updates.length > 0 && (
                <div className="mt-5">

                    {updates.map((update, index) => (

                        <div
                            key={`${update.entityId}-${update.field}-${index}`}
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

                                <div className="min-w-0">

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
                                    {String(
                                        update.currentValue
                                    )}
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
                                    {String(
                                        update.requiredValue
                                    )}
                                </span>

                            </div>


                            {/* Steps */}

                            {update.steps?.length > 0 && (

                                <div className="mt-4">

                                    <div
                                        className="
                                            text-[11px]
                                            uppercase
                                            tracking-[0.14em]
                                            text-slate-500
                                        "
                                    >
                                        Steps
                                    </div>

                                    <ol
                                        className="
                                            mt-2
                                            space-y-2
                                            text-sm
                                            text-slate-300
                                        "
                                    >

                                        {update.steps.map(
                                            (step, stepIndex) => (

                                                <li
                                                    key={stepIndex}
                                                    className="
                                                        flex
                                                        gap-3
                                                    "
                                                >

                                                    <span
                                                        className="
                                                            shrink-0
                                                            text-slate-500
                                                        "
                                                    >
                                                        {stepIndex + 1}.
                                                    </span>

                                                    <span>
                                                        {step}
                                                    </span>

                                                </li>

                                            )
                                        )}

                                    </ol>

                                </div>

                            )}

                        </div>

                    ))}

                </div>
            )}


            {/* Manual Actions */}

            {manualActions.length > 0 && (

                <div className="mt-5">

                    <div
                        className="
                            border-t
                            border-slate-800
                            pt-4
                        "
                    >

                        <div
                            className="
                                text-[11px]
                                uppercase
                                tracking-[0.14em]
                                text-slate-500
                            "
                        >
                            Manual Actions
                        </div>


                        <div className="mt-3 space-y-2">

                            {manualActions.map(
                                (action, index) => (

                                    <button
                                        key={`${action.entityId}-${action.type}-${index}`}
                                        type="button"
                                        onClick={() =>
                                            onManualActionSelect?.(
                                                action
                                            )
                                        }
                                        className="
                                            w-full
                                            rounded-lg
                                            border
                                            border-slate-800
                                            bg-slate-900/40
                                            p-3
                                            text-left
                                            transition-colors
                                            hover:border-cyan-500
                                            hover:bg-slate-900
                                        "
                                    >

                                        <div
                                            className="
                                                flex
                                                items-start
                                                justify-between
                                                gap-3
                                            "
                                        >

                                            <div className="min-w-0">

                                                <div
                                                    className="
                                                        text-sm
                                                        font-medium
                                                        text-slate-100
                                                    "
                                                >
                                                    {action.description}
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
                                                    {action.entityType}
                                                    {" · "}
                                                    {action.entityId}
                                                </div>

                                            </div>

                                            <span
                                                className="
                                                    shrink-0
                                                    text-slate-500
                                                "
                                            >
                                                →
                                            </span>

                                        </div>

                                    </button>

                                )
                            )}

                        </div>

                    </div>

                </div>

            )}

        </div>
    );
}