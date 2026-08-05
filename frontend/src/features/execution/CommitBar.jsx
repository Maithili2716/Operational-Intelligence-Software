// =========================================
// Commit Bar
// Execution Actions
// =========================================

export default function CommitBar({
    onBack,
    onCommit
}) {
    return (
        <div
            className="
                flex
                items-center
                justify-between
                gap-4
            "
        >
            {/* Back */}

            <button
                onClick={onBack}
                className="
                    flex
                    items-center
                    gap-2
                    rounded-lg
                    px-3
                    py-2
                    text-sm
                    font-medium
                    text-slate-400
                    transition-all
                    duration-200
                    hover:bg-slate-800
                    hover:text-slate-200
                "
            >
                ←
                <span>
                    Back 
                </span>
            </button>

            {/* Commit */}

            <button
                onClick={onCommit}
                className="
        inline-flex
    items-center
    gap-2
    rounded-full
    border
    border-cyan-500/30
    bg-slate-900
    px-6
    py-2.5
    text-sm
    font-medium
    text-cyan-300
    transition-all
    duration-200
    hover:border-cyan-400
    hover:bg-cyan-500/10
    hover:text-cyan-200
    active:scale-[0.98]
                "
            >
                Commit Changes
            </button>
        </div>
    );
}