import { useMemo, useState } from "react";
import { BaseEdge, EdgeLabelRenderer } from "reactflow";

import { EDGE } from "./RuntimeTheme";
import { RELATIONSHIP_LAYOUT } from "./RuntimeTheme";

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
    
  
    const midX =
        sourceX +
        (targetX - sourceX) * 0.45 +
        laneOffset;
    let relationshipX;
    let relationshipY;
    switch (
    RELATIONSHIP_LAYOUT[
        data.relationship
    ]
) {

    case "vertical":

        relationshipX = midX;
        relationshipY =
            (sourceY+targetY + midX)/2;

        break;

    default:

        relationshipX =
            (targetX+midX)/2;

        relationshipY =
            sourceY-14;

}
    
    const path =

        `M ${sourceX} ${sourceY}
         L ${midX} ${sourceY}
         L ${midX} ${targetY}
         L ${targetX} ${targetY}`;

   
    
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
    RELATIONSHIP_LAYOUT[data.relationship] !== undefined;
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
z-50
rounded
bg-slate-950/90
px-2
py-[1px]
text-[9px]
font-medium
text-slate-300
whitespace-nowrap
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