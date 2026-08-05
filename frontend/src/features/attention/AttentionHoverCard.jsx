// =========================================
// Attention Hover Card
// Quick Preview
// =========================================

const SEVERITY = {
    CRITICAL: "text-red-400",
    HIGH: "text-orange-400",
    MEDIUM: "text-yellow-400",
    LOW: "text-sky-400"
};

export default function AttentionHoverCard({
    attention,
    position
}) {
    if (!attention)
        return null;
    const severityColor =
        SEVERITY[attention.severity] ??
        SEVERITY.LOW;
    return (
        <div
            className="
                pointer-events-none
                absolute
                z-50
                w-46
                rounded-lg
                border
                border-slate-800
                bg-slate-900/95
                px-2
                py-3
                shadow-xl
                backdrop-blur
                transition-all
                duration-150
                ease-out
            "
            style={{
                left: position?.x ?? 0,
                top: position?.y ?? 0,
                transform:
                    "translate(16px,-50%) scale(1)",
                opacity: 1
            }}
        >
            {/* Severity */}
            <div
                className={`
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.16em]
                    ${severityColor}
                `}
            >
                {attention.severity}
            </div>
            {/* Summary */}
            <p
                className="
                    mt-2
                    text-xs
                    leading-5
                    text-slate-300
                    line-clamp-4
                "
            >
                {attention.summary}
            </p>
        </div>
    );
}