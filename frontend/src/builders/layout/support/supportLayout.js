// =========================================
// Support Layout
// Semantic Support Anchors
//          ↓
// Positioned Support Nodes
// =========================================

import { stableOffset } from "../offsets";
import {
    LAYOUT,
    SUPPORT_LAYOUT
} from "../layoutConfig";


export function buildSupportLayout(
    supportDiscovery,
    workflowLayout,scene
) {
    const positionedSupports = [];
    // -------------------------------------
    // Position support nodes
    // -------------------------------------
    supportDiscovery.anchors.forEach(anchor => {
    const workflowNode =
        workflowLayout.positionedWorkflow.get(
            anchor.anchorNodeId
        );
    if (!workflowNode) {
        return;
    }

    const relationship = anchor.relationship;

    const offset =
        SUPPORT_LAYOUT[relationship] ??
        SUPPORT_LAYOUT.DEFAULT;

    positionedSupports.push({
        ...anchor.supportNode,
        workflowId: workflowNode.workflowId,
        anchorNode: workflowNode.id,
        relationship,
        sourcePosition: "right",
        targetPosition: "left",
        position: {
            x:
                workflowNode.position.x +
                offset.x +
                stableOffset(anchor.supportNode.id),

            y:
                workflowNode.position.y +
                offset.y +
                stableOffset(anchor.supportNode.id)
        }
    });
});

    // -------------------------------------
    // Planning Strip
    // -------------------------------------
  const planningNodes =
    supportDiscovery.planning.map(
        (node,index)=>({

            ...node,

            sourcePosition:"right",
            targetPosition:"left",

            position:{

                x:
                    LAYOUT.CANVAS_PADDING_X +
                    index *
                    LAYOUT.PLANNING_COLUMN_WIDTH,

                y:
                    scene.planning.top +
                    stableOffset(node.id)

            }

        })
    );
        //infrastructure strip
    const infrastructureSpacing =
    scene.canvas.width /
    Math.max(
        supportDiscovery.infrastructure.length,
        1
    );
const infrastructureNodes =
    supportDiscovery.infrastructure.map(
        (node,index)=>({

            ...node,

            sourcePosition:"right",
            targetPosition:"left",

            position:{

                x:
                    LAYOUT.CANVAS_PADDING_X +
                    index *
                    LAYOUT.INFRA_COLUMN_WIDTH,

                y:
                    scene.infrastructure.top +
                    stableOffset(node.id)

            }

        })
    );
    


    return {
        supports:
            positionedSupports,
        planning:
            planningNodes,
        infrastructure: infrastructureNodes
    };
}

