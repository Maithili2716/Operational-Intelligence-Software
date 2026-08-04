import { Handle, Position } from "reactflow";

import {
    ENTITY_COLORS
} from "./RuntimeTheme";

export default function RuntimeNode({ data }) {
    const {
        id,
        label,
        entityType,
        highlighted,
        selected,
        faded
    } = data;

    const accent =
        ENTITY_COLORS[entityType] ??
        "#64748b";
    return (
        <>
            <Handle
                type="target"
                position={Position.Left}
                className="opacity-0"
            />
            <div
                className={`
                    relative
                    flex
                    w-[170px]
                    flex-col
                    rounded-xl
                    border
                    bg-slate-900/95
                    px-4
                    py-3
                    transition-all
                    duration-200
                    ease-out
                    origin-center
                    ${
                        selected
                            ? "scale-105 z-20 border-cyan-500 ring-2 ring-cyan-500/40 shadow-xl"
                            : highlighted
                            ? "border-cyan-400 shadow-lg"
                            : "border-slate-800"
                    }
                    ${
                        faded
                            ? "opacity-30 scale-[0.98]"
                            : "opacity-100"
                    }
                    hover:border-slate-600
                `}
            >
                {/* Accent Strip */}
                <div
                    className="absolute left-0 top-0 h-full w-1 rounded-l-xl"
                    style={{
                        backgroundColor: accent

                    }}
                />
                {/* Entity Type */}
                <span
                    className="
                        pl-2
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-[0.18em]
                        text-slate-500
                    "
                >
                    {entityType}
                </span>

                {/* Entity Label */}

                <span
                    className="
                        mt-1
                        pl-2
                        text-sm
                        font-medium
                        text-slate-100
                    "
                >
                    {label ?? id}
                </span>
            </div>
            <Handle
                type="source"
                position={Position.Right}
                className="opacity-0"
            />
        </>
    );
}