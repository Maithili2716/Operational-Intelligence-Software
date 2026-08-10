// =========================================
// Impact Section
// Affected Entities
// =========================================

export default function ImpactSection({
    entities = []
}) {

    if (entities.length === 0) {
        return (
            <div
                className="
                    py-2
                    text-sm
                    text-slate-500
                "
            >
                No directly affected entities identified.
            </div>
        );
    }

    return (
        <div className="space-y-4">

            {entities.map(
                (entity, index) => {

                    const [type, number] =
                        entity.entityId
                            ?.split(":") ?? [];

                    const displayType =
                        type
                            ?.replace(/_/g, " ")
                            .toLowerCase()
                            .replace(
                                /\b\w/g,
                                char =>
                                    char.toUpperCase()
                            );

                    return (
                        <div
                            key={
                                `${entity.entityId}-${index}`
                            }
                            className="
                                flex
                                gap-3
                            "
                        >

                            {/* Indicator */}

                            <div
                                className="
                                    mt-2
                                    h-1.5
                                    w-1.5
                                    shrink-0
                                    rounded-full
                                    bg-cyan-400
                                "
                            />

                            {/* Content */}

                            <div
                                className="
                                    min-w-0
                                "
                            >

                                <div
                                    className="
                                        text-sm
                                        font-medium
                                        text-slate-200
                                    "
                                >
                                    {displayType} {number}
                                </div>

                                {entity.reason && (
                                    <div
                                        className="
                                            mt-1
                                            text-xs
                                            leading-5
                                            text-slate-500
                                        "
                                    >
                                        {entity.reason}
                                    </div>
                                )}

                            </div>

                        </div>
                    );
                }
            )}

        </div>
    );
}