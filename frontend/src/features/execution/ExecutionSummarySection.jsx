// =========================================
// Execution Summary Section
// =========================================

import { formatEntityId } from "../../utils/formatEntityId";

export default function ExecutionSummarySection({
    summary,
    entityId
}) {
    if (!summary)
        return null;

    const formattedEntityId =
        formatEntityId(entityId);

    const parts =
        entityId
            ? summary.split(entityId)
            : [summary];

    return (
        <div>
            <p
                className="
                    text-sm
                    leading-6
                    text-slate-200
                "
            >
                {parts.map((part, index) => (

                    <span key={index}>

                        {index > 0 && (
                            <span
                                className="
                                    mx-1
                                    inline-flex
                                    rounded
                                    bg-slate-800
                                    px-1.5
                                    py-0.5
                                    text-[11px]
                                    font-medium
                                    text-cyan-300
                                "
                            >
                                {formattedEntityId}
                            </span>
                        )}

                        {part}

                    </span>

                ))}
            </p>
        </div>
    );
}