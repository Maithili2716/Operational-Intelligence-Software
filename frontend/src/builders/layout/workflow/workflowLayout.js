import { LAYOUT } from "../layoutConfig";
import { stableOffset } from "../offsets";

export function buildWorkflowLayout(discovery, scene) {

    const positionedWorkflow = new Map();
    const lanes = discovery.workflows.map(
        (workflow, laneIndex) => {
            const lane = scene.workflow.lanes[laneIndex];
            const positionedNodes =
                workflow.nodes.map((node, order) => {
                    const column =
                        scene.workflow.columns[order];

                    const positioned = {
                        ...node,
                        laneId: laneIndex,
                        workflowId: workflow.id,
                        order,
                        sourcePosition: "right",
                        targetPosition: "left",
                        position: {
                            x:
                                column.x +
                                stableOffset(node.id),
                            y:
                                lane.y +
                                stableOffset(node.id)
                        }
                    };
                    positionedWorkflow.set(
                        node.id,
                        positioned
                    );
                    return positioned;
                });

            return {
                laneId: laneIndex,
                workflowId: workflow.id,
                root: workflow.root,
                nodes: positionedNodes
            };
        }
    );

    return {
        lanes,
        positionedWorkflow,
        workflowByNode:
            discovery.workflowByNode
    };
}