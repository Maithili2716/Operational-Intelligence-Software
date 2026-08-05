// =========================================
// Action Hover Card
// =========================================

export default function ActionHoverCard({
    action,
    position
}) {
    if (!action)
        return null;

    return (
        <div
            className="
                pointer-events-none
                absolute
                z-50
                w-60
                rounded-lg
                border
                border-slate-800
                bg-slate-900/95
                px-3
                py-3
                shadow-xl
                backdrop-blur
            "
            style={{
                left: position?.x ?? 0,
                top: position?.y ?? 0,
                transform: "translate(14px,-50%)"
            }}
        >

            <div
                className="
                    text-[10px]
                    uppercase
                    tracking-[0.16em]
                    text-slate-500
                "
            >
                Blocked Workflow
            </div>

            <p
                className="
                    mt-2
                    text-xs
                    leading-5
                    text-slate-300
                "
            >
                {action.blockedEntitiesSummary}
            </p>

        </div>
    );
}