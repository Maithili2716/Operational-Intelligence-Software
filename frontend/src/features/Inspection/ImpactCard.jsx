// =========================================
// Impact Card
// Affected Entities
// =========================================

import FadeIn from "./FadeIn";

export default function ImpactCard({
    entities
}) {
    if (!entities?.length)
        return null;

    return (
        <FadeIn
            direction="right"
            delay={140}
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
                    Impact
                </div>
                <div
                    className="
                        space-y-4
                    "
                >
                    {
                        entities.map((entity) => (
                            <div
                                key={entity.entityId}
                                className="
                                    rounded-lg
                                    border
                                    border-slate-800
                                    bg-slate-950/60
                                    px-4
                                    py-3
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
                                        {entity.entityId}
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
                                        {entity.entityType}
                                    </span>
                                </div>
                                {/* Reason */}
                                <p
                                    className="
                                        
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
            </section>
        </FadeIn>
    );
}