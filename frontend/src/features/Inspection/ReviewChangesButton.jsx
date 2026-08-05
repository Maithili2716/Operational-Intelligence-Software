// =========================================
// Review Changes Button
// Transition To Execution
// =========================================

export default function ReviewChangesButton({
    onClick
}) {
    return (
        <button
            onClick={onClick}
            className="
                ml-auto
                flex
                items-center
                gap-2
                rounded-lg
                px-3
                py-2
                text-sm
                font-medium
                text-cyan-300
                transition-all
                duration-200
                hover:bg-cyan-500/10
                hover:text-cyan-200
            "
        >
            <span>
                Review Updates
            </span>

            <span
                className="
                    transition-transform
                    duration-200
                    group-hover:translate-x-1
                "
            >
                →
            </span>
        </button>
    );
}