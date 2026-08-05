export default function WorkflowPanel({
    inspection,
    children
}) {
    return (
        <aside
            className="
                h-full
                min-w-0
                overflow-hidden
                rounded-2xl
                border
                border-slate-800
                bg-slate-950
            "
        >
            <div
                className="
                    h-full
                    overflow-y-auto
                    overflow-x-hidden
                    px-5
                    py-5
                "
            >
                {children}
            </div>
        </aside>
    );
}