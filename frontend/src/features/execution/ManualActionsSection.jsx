// =========================================
// Manual Actions Section
// =========================================

export default function ManualActionsSection({
    actions,
    onActionSelect
}) {
    return (
        <div className="space-y-2">

            {actions.map((action, index) => (

                <button
                    key={`${action.entityId}-${action.type}-${index}`}
                    type="button"
                    onClick={() =>
                        onActionSelect?.(action)
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

                </button>

            ))}

        </div>
    );
}