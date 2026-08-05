// =========================================
// Attention Item
// =========================================

const SEVERITY = {
    CRITICAL: {
        accent: "bg-red-500",
        text: "text-red-400"
    },
    HIGH: {
        accent: "bg-orange-500",
        text: "text-orange-400"
    },
    MEDIUM: {
        accent: "bg-yellow-500",
        text: "text-yellow-400"
    },
    LOW: {
        accent: "bg-sky-500",
        text: "text-sky-400"
    }
};

export default function AttentionItem({
    attention,
    hovered,
    selected,
    onHover,
    onLeave,
    onClick
}) {
    const severity =
        SEVERITY[attention.severity] ??
        SEVERITY.LOW;
    return (
        <button
            type="button"
            onMouseEnter={(event) =>
        onHover({...attention,
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
                relative
                flex
                w-full
                items-start
                gap-3
                border-b
                border-slate-800
                px-4
                py-3
                text-left
                transition-all
                duration-150
                ease-out
                ${selected
                    ? "bg-slate-900"
                    : "hover:bg-slate-900/60"}
                ${selected
                    ? "border-l-2 border-l-cyan-500"
                    : ""}
            `}
        >
            {/* Severity */}
            <div

                className={`
                    mt-1
                    h-2
                    w-2
                    rounded-full
                    ${severity.accent}
                `}

            />
            {/* Content */}
            <div className="min-w-0 flex-1">
                {/* Title */}
                <div
                    className="
                        truncate
                        text-sm
                        font-medium
                        text-slate-100
                    "
                >
                    {attention.title}
                </div>

                {/* Entity */}
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
                    <span>
                        {attention.entityType}
                    </span>
                    <span>
                        •
                    </span>
                    <span>
                        {attention.entityId}
                  </span>
                </div>
            </div>

            {/* Severity Label */}
            <div
                className={`
                    mt-0.5
                    shrink-0
                    text-[10px]
                    font-medium
                    uppercase
                    ${severity.text}
                `}
            >
                {attention.severity}
            </div>
        </button>
    );
}