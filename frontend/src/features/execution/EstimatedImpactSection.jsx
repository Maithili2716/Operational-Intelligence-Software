// =========================================
// Estimated Impact Section
// Expected Runtime Outcome
// =========================================

export default function EstimatedImpactSection({
    inspection
}) {
    if (!inspection)
        return null;

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
                Applying these runtime updates is expected to
                resolve the current attention and restore the
                affected workflow.
            </p>

            {/* Runtime Impact */}

            <div
                className="
                    mt-4
                    space-y-3
                "
            >
                {/* Affected Entities */}

                <div
                    className="
                        border-t
                        border-slate-800
                        pt-3
                    "
                >
                    <div
                        className="
                            text-[11px]
                            font-medium
                            uppercase
                            tracking-[0.14em]
                            text-slate-500
                        "
                    >
                        Expected Recovery
                    </div>

                    <ul
                        className="
                            mt-3
                            space-y-2
                        "
                    >
                        {
                            inspection.affectedEntities.map(entity => (

                                <li
                                    key={entity.entityId}
                                    className="
                                        flex
                                        items-start
                                        gap-3
                                    "
                                >
                                    <span
                                        className="
                                            mt-[5px]
                                            h-2
                                            w-2
                                            rounded-full
                                            bg-emerald-400
                                        "
                                    />
                                    <div>
                                        <div
                                            className="
                                                text-sm
                                                font-medium
                                                text-slate-100
                                            "
                                        >
                                            {entity.entityId}
                                        </div>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
}