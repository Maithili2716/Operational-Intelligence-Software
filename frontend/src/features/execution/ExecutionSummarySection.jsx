// =========================================
// Execution Summary Section
// =========================================

export default function ExecutionSummarySection({
    summary
}) {
    if (!summary)
        return null;
    return (
        <div>
            <p
                className="
                    text-sm
                    leading-6
                    text-slate-200
                "
            >
                {summary}
            </p>
        </div>
    );
}