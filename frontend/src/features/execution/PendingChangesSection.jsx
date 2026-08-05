// =========================================
// Pending Changes Section
// Review Runtime Updates
// =========================================

export default function PendingChangesSection({
    updates
}) {
    if (!updates?.length)
        return null;

    return (
        <div>
            {
                updates.map((update, index) => (
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
                                        inline-flex
                                        rounded-full
                                        border
                                        border-cyan-500/20
                                        bg-cyan-500/10
                                        px-2.5
                                        py-1
                                        text-[10px]
                                        font-semibold
                                        uppercase
                                        tracking-[0.08em]
                                        text-cyan-300
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

                        {/* Runtime Diff */}

                        <div
                            className="
                                mt-4
                                rounded-lg
                                border
                                border-slate-800
                                bg-slate-950/60
                                p-3
                            "
                        >

                            <div
                                className="
                                    flex
                                    items-center
                                    justify-between
                                "
                            >

                                <div>

                                    <div
                                        className="
                                            text-[10px]
                                            uppercase
                                            tracking-[0.14em]
                                            text-slate-500
                                        "
                                    >
                                        Current
                                    </div>

                                    <div
                                        className="
                                            mt-1
                                            text-sm
                                            text-slate-300
                                        "
                                    >
                                        {String(update.currentValue)}
                                    </div>

                                </div>

                                <div
                                    className="
                                        text-cyan-400
                                        text-lg
                                    "
                                >
                                    →
                                </div>

                                <div className="text-right">

                                    <div
                                        className="
                                            text-[10px]
                                            uppercase
                                            tracking-[0.14em]
                                            text-slate-500
                                        "
                                    >
                                        New
                                    </div>

                                    <div
                                        className="
                                            mt-1
                                            text-sm
                                            font-semibold
                                            text-cyan-300
                                        "
                                    >
                                        {String(update.requiredValue)}
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                ))
            }

        </div>
    );
}