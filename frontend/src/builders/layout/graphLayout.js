// =========================================
// Semantic Runtime Layout Engine
// Backend Graph
//          ↓
// Positioned ReactFlow Graph
// =========================================

import { discoverWorkflows }
from "./workflow/workflowDiscovery";

import { buildWorkflowLayout }
from "./workflow/workflowLayout";

import { discoverSupportNodes }
from "./support/supportDiscovery";

import { composeScene }
from "./scene/composeScene";

import { buildSupportLayout }
from "./support/supportLayout";

import { assembleLayout }
from "./assemble/assembleLayout";


export function getLayoutedGraph(
    nodes,
    edges
) {

    //---------------------------------------
    // Workflow Discovery
    //---------------------------------------

    const workflowDiscovery =
        discoverWorkflows(
            nodes,
            edges
        );

    //---------------------------------------
    // Temporary Workflow Layout
    //---------------------------------------
    // Only semantic information
    // Positions come after Scene Composition

    const workflowSeed = {
        lanes:
            workflowDiscovery.workflows.map(
                (workflow, laneId) => ({
                    laneId,
                    workflowId: workflow.id,
                    root: workflow.root,
                    nodes: workflow.nodes
                })
            )
    };

    //---------------------------------------
    // Support Discovery
    //---------------------------------------

    const supportDiscovery =
        discoverSupportNodes(
            nodes,
            edges,
            {
                workflowByNode:
                    workflowDiscovery.workflowByNode
            }
        );

    //---------------------------------------
    // Compose Scene
    //---------------------------------------

    const scene =
        composeScene(
            workflowSeed,
            supportDiscovery
        );

    //---------------------------------------
    // Position Workflow
    //---------------------------------------

    const workflowLayout =
        buildWorkflowLayout(
            workflowDiscovery,
            scene
        );

    //---------------------------------------
    // Position Supports
    //---------------------------------------

    const supportLayout =
        buildSupportLayout(
            supportDiscovery,
            workflowLayout,
            scene
        );

    //---------------------------------------
    // Assemble Scene
    //---------------------------------------

    const layout =
        assembleLayout(
            workflowLayout,
            supportLayout
        );
    const NODE_WIDTH = 220;

    const maxX = Math.max(
    ...layout.map(node => node.position.x)
);
    const canvasWidth = maxX + NODE_WIDTH + 120;
    const NODE_HEIGHT = 80;

    const maxY = Math.max(
    ...layout.map(node => node.position.y)
);
    const canvasHeight =
    maxY +
    NODE_HEIGHT +
    120;
    //---------------------------------------
    // Debug
    //---------------------------------------

    

    //---------------------------------------

return {

    nodes:
        layout,
    edges,
    scene: {
        ...scene,
        width: canvasWidth,
        height: canvasHeight
    }

};

}