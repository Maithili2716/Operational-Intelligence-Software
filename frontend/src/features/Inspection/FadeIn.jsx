// =========================================
// Fade In
// Shared Motion Wrapper
// =========================================

export default function FadeIn({
    children,
    delay = 0,
    direction = "bottom",
    className = "",
    distance = 20
}) {
    const transform =
        direction === "right"
            ? "translateX(20px) scale(0.985)"
            : direction === "left"
            ? "translateX(-20px) scale(0.985)"
            : direction === "top"
            ? "translateY(-12px) scale(0.985)"
            : "translateY(12px) scale(0.985)";

    return (
        <div
            className={className}
            style={{
                opacity: 0,
                transform,
                animation:
                    "workspaceFadeIn 240ms cubic-bezier(0.22, 1, 0.36, 1) forwards",
                animationDelay: `${delay}ms`,
                distance
            }}
        >
            {children}
        </div>
    );
}