// =========================================
// Inspection Section
// Shared Inspector Layout
// =========================================

export default function InspectionSection({
    title,
    children,
    footer = null
}) {
    return (
        <section
            className="
                py-5
                first:pt-0
                last:pb-0
                border-b
                border-slate-800
                last:border-b-0
            "
        >
            {/* Section Title */}

            <div
                className="
                    mb-4
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.18em]
                    text-slate-500
                "
            >
                {title}
            </div>

            {/* Content */}

            <div
                className="
                    space-y-4
                "
            >
                {children}
            </div>

            {/* Optional Footer */}

            {
                footer && (
                    <div
                        className="
                            mt-5
                            pt-4
                            border-t
                            border-slate-800
                        "
                    >
                        {footer}
                    </div>
                )
            }

        </section>
    );
}