// =========================================
// Runtime State Card
// Hover Preview
// =========================================

export default function RuntimeStateCard({
    node,
    state,
    position
}) {
    if (!node || !state)
        return null;
    return (
        <div
            className="pointer-events-none absolute z-50 w-58 origin-left transition-all 
            duration-150 ease-out rounded-lg border border-slate-400 bg-slate-900/95 px-3 py-2.5 shadow-2xl backdrop-blur"
            style={{
                left: position?.x ?? 0,
                top: position?.y ?? 0,
                transform: "translate(20px, -50%) scale(1)",
                position:"fixed"
            }}
        >
            {/* Header */}
            <div className="mb-0.5">
                <div className="mt-0.5 text-base font- text-slate-100">
                    {node.data.label}
                </div>
            </div>
            <div className="my-2 h-px bg-slate-800" />

            {/* Properties */}
            <div className="space-y-0.5">
                {
                    Object.entries(state)
                        .filter(([key]) => key !== "name")
                        .map(([key, value]) => (
                            <div
                                key={key}
                                className="flex items-start justify-between gap-1"
                            >
                                <span className="text-xs uppercase tracking-wide text-slate-500">
                                    {formatKey(key)}
                                </span>
                                <span className="text-right text-[11px] text-slate-200">

                                    {String(value)}
                                </span>
                            </div>
                        ))
                }
            </div>
        </div>
    );
}

function formatKey(key) {
    return key
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, c => c.toUpperCase());

}