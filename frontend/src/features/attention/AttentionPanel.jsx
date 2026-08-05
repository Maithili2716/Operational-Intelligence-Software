// =========================================
// Attention Panel
// Left Workspace Panel
// =========================================

import AttentionItem from "./AttentionItem";

export default function AttentionPanel({
    attention,
    hoveredAttention,
    selectedAttention,
    setHoveredAttention,
    onAttentionSelect

}) {
    return (
        <aside
            className="
                flex
                 max-h-[50%]
                h-full
                flex-col
                border-r
                border-slate-800
                bg-slate-950
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
                    Attention
                </div>
                <div
                    className="
                        mt-1
                        text-xs
                        text-slate-400
                    "
                >
                    {attention.length} Active Issue{attention.length !== 1 ? "s" : ""}
                </div>
            </div>
            {/* List */}
            <div
                className="
                    flex-1
                    overflow-y-auto
                "
            >
                {
                    attention.map(item => (
                        <AttentionItem
                            key={item.id}
                            attention={item}
                            hovered={
                                hoveredAttention?.id === item.id
                            }
                            selected={
                                selectedAttention?.id === item.id
                            }
                            onHover={setHoveredAttention
                            }
                            onLeave={() =>
                                setHoveredAttention(null)
                            }
                            onClick={() =>
                                onAttentionSelect(item)
                            }
                        />

                ))
                }
            </div>
        </aside>
    );
}