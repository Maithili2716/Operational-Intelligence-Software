// =========================================
// Action Panel
// =========================================

import ActionItem from "./ActionItem";

export default function ActionPanel({
    action,
    hoveredAction,
    selectedAction,
    setHoveredAction,
    onActionSelect
}) {
    return (
        <section
            className="
                mt-6
                border
                border-slate-800
                flex-1
                overflow-hidden
                bg-slate-950
                flex
                flex-col
                min-h-0
                left-scroll
            "
        >
            {/* Header */}

            <div
                className="
                    border-b
                    border-slate-800
                    px-5
                    py-4
                "
            >
                <div
                    className="
                        text-[11px]
                        font-semibold
                        uppercase
                        tracking-[0.18em]
                        text-slate-500
                    "
                >
                    Action
                </div>

                <div
                    className="
                        mt-1
                        text-xs
                        text-slate-400
                    "
                >
                    {action.length} Pending Action{action.length !== 1 ? "s" : ""}
                </div>
            </div>

            {/* List */}

            <div
                className="
                    flex-1
                    overflow-y-auto
                "
            >
                {action.map(item => (
                    <ActionItem
                        key={item.id}
                        action={item}
                        hovered={hoveredAction?.id === item.id}
                        selected={selectedAction?.id === item.id}
                        onHover={setHoveredAction}
                        onLeave={() => setHoveredAction(null)}
                        onClick={() => onActionSelect(item)}
                    />
                ))}
            </div>
        </section>
    );
}