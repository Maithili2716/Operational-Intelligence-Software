// =========================================
// Blocked Workflow Section
// Downstream Operations Waiting
// =========================================

export default function BlockedWorkflowSection({
    entities
}) {
    if (!entities?.length)
        return null;

    return (
        <div>

            {
                entities.map((entity, index) => (

                    <div
                        key={entity.entityId}
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
                                    {entity.entityId}
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
                                    {entity.entityType}
                                </div>

                            </div>

                            <span
                                className="
                                    shrink-0
                                    rounded-full
                                    bg-red-500/10
                                    px-2
                                    py-1
                                    text-[10px]
                                    font-medium
                                    uppercase
                                    tracking-[0.08em]
                                    text-red-300
                                "
                            >
                                Blocked
                            </span>

                        </div>

                        {/* Reason */}

                        <p
                            className="
                                mt-3
                                text-sm
                                leading-6
                                text-slate-400
                            "
                        >
                            {entity.reason}
                        </p>

                    </div>

                ))
            }

        </div>
    );
}