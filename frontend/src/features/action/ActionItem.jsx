// =========================================
// Action Item
// =========================================

export default function ActionItem({
    action,
    hovered,
    selected,
    onHover,
    onLeave,
    onClick
}) {
    return (
        <button
            type="button"
            onMouseEnter={(event) =>
                onHover({
                    ...action,
                    hoverPosition: {
                        x: event.currentTarget.getBoundingClientRect().right,
                        y:
                            event.currentTarget.getBoundingClientRect().top +
                            event.currentTarget.getBoundingClientRect().height / 2
                    }
                })
            }
            onMouseLeave={onLeave}
            onClick={onClick}
            className={`
                group
                w-full
                border-b
                border-slate-800
                px-4
                py-2.5
                text-left
                transition-colors
                duration-150
                ${
                    selected
                        ? "bg-slate-900 border-l-2 border-l-cyan-500"
                        : "hover:bg-slate-900/50"
                }
            `}
        >

            <div className="flex items-start gap-3">

                <div
                    className="
                        mt-[7px]
                        h-2
                        w-2
                        shrink-0
                        rounded-full
                        bg-red-500
                    "
                />

                <div className="min-w-0 flex-1">

                    <div
                        className="
                            truncate
                            text-sm
                            font-medium
                            text-slate-100
                        "
                    >
                        {action.title}
                    </div>

                    <div
                        className="
                            mt-1
                            flex
                            items-center
                            gap-2
                            text-[10px]
                            uppercase
                            tracking-[0.12em]
                            text-slate-500
                        "
                    >
                        <span>{action.category}</span>

                        <span>•</span>

                        <span>{action.entityId}</span>

                    </div>

                </div>

            </div>

        </button>
    );
}