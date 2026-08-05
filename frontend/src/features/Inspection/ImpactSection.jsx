// =========================================
// Impact Section
// Affected Runtime Entities
// =========================================

export default function ImpactSection({
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
             </div>

             <span
                className="
                    shrink-0
                    rounded-full
                    border
                     border-amber-500/30
                     bg-amber-500/10
                    px-2.5
                    py-1
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.08em]
                     text-amber-300
                        "
                        >
                            {entity.entityType}
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