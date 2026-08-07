import { useMemo, useState } from "react";
import { BaseEdge, EdgeLabelRenderer } from "reactflow";

import { EDGE } from "./RuntimeTheme";

export default function RuntimeEdge({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    data
}) {
    const laneOffset = useMemo(() => {
        let hash = 0;
        for (const c of id)
            hash += c.charCodeAt(0);
        return ((hash % 5) - 2) * 10;
    }, [id]);
    const SUPPORT_RELATIONSHIPS = new Set([
    "OWNED_BY",
    "PROCURES_MATERIAL",
    "PROVIDED_BY_SUPPLIER",
    "FOR_MATERIAL",
    "STORED_IN",
    "ORDERS_MATERIAL"
]);

    const isSupport =
        SUPPORT_RELATIONSHIPS.has(
            data.relationship
    );
    const midX =
        sourceX +
        (targetX - sourceX) * 0.45 +
        laneOffset;
        const relationshipX = (sourceX + targetX) / 2;
        const relationshipY = Math.min(sourceY,targetY)-14;
    const path =

        `M ${sourceX} ${sourceY}
         L ${midX} ${sourceY}
         L ${midX} ${targetY}
         L ${targetX} ${targetY}`;
    const labelX = midX;
    const labelY = (sourceY + targetY) / 2;
    const stroke =
        data.highlighted
            ? EDGE.HIGHLIGHT_COLOR
            : EDGE.NORMAL_COLOR;;
    const strokeWidth =
        data.highlighted
            ? EDGE.HIGHLIGHT_WIDTH
            : EDGE.WIDTH;
    const opacity =
        data.faded
            ? EDGE.FADED_OPACITY
            : data.highlighted
            ? EDGE.HIGHLIGHT_OPACITY
            : EDGE.OPACITY;
    function formatRelationship(value) {
    return value
        .replaceAll("_", " ");
    }
    const showRelationship =
    data.highlighted &&
    Math.abs(sourceY - targetY) < 40;
    
    return (
        <>
            <BaseEdge
                id={id}
                path={path}
                style={{
                    stroke,
                    strokeWidth,
                    opacity,
                    fill: "none",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    filter:data.highlighted
                    ? "drop-shadow(0 0 1px rgba(8,145,178,.35))"
                    : "none",
                    transition: "all 200ms ease-out"
                }}
            />
            {showRelationship && (
                <EdgeLabelRenderer>
                    <div
                        className="
                        absolute
                        flex
                        items-center
                        gap-2
                        whitespace-nowrap
                        text-[9px]
                        font-medium
                        text-slate-400
                        "
                        style={{
                            transform:
                                `translate(-50%, -100%) translate(${relationshipX}px, ${relationshipY}px)`,
                            pointerEvents: "none"
                        }}
                    >
                    <>
            <span>{formatRelationship(data.relationship)}</span>
</>    
                    </div>
                </EdgeLabelRenderer>
            )}
        </>
    );
}