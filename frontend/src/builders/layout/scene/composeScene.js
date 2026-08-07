// =========================================
// Scene Composer
// Semantic Runtime Scene
// =========================================

import { LAYOUT } from "../layoutConfig";

export function composeScene(
    workflowSeed,
    supportDiscovery
) {

    //---------------------------------------
    // Workflow
    //---------------------------------------

    const laneCount =
        workflowSeed.lanes.length;

    const stageCount =
        Math.max(
            ...workflowSeed.lanes.map(
                lane => lane.nodes.length
            )
        );

    //---------------------------------------
    // Workflow Zone
    //---------------------------------------
        const workflowTop = LAYOUT.CANVAS_PADDING_Y;

       const lanes = workflowSeed.lanes.map(
          (lane, index) => ({
          ...lane,
          y:
            workflowTop +
            index * LAYOUT.LANE_HEIGHT
    })
);

     const lastLane = lanes[lanes.length - 1];
     const workflowBottom =lastLane.y + 70;
     const planningY =workflowBottom + 10;
     const infrastructureY =planningY +LAYOUT.PLANNING_HEIGHT+30;
     const canvasHeight =
    infrastructureY +
    LAYOUT.INFRA_HEIGHT +
    LAYOUT.CANVAS_PADDING_Y;
    //---------------------------------------
    // Support Zone
    //---------------------------------------

    const supportTop =
        workflowTop;

    const supportBottom =
        workflowBottom;

    //---------------------------------------
    // Planning Zone
    //---------------------------------------

    const planningTop =
        supportBottom +
        LAYOUT.ZONE_GAP;
     

    //---------------------------------------
    // Infrastructure Zone
    //---------------------------------------

    const infrastructureTop =
        planningTop +
        LAYOUT.PLANNING_HEIGHT +
        LAYOUT.ZONE_GAP;

    //---------------------------------------
    // Canvas
    //---------------------------------------

    const canvasWidth =
        Math.max(
            stageCount *
                LAYOUT.COLUMN_WIDTH,

            supportDiscovery.planning.length *
                LAYOUT.PLANNING_COLUMN_WIDTH ,

            supportDiscovery.infrastructure.length *
                LAYOUT.INFRA_COLUMN_WIDTH 
        );


    //---------------------------------------
    // Workflow Columns
    //---------------------------------------

    const columns = [];

    for (let i = 0; i < stageCount; i++) {

        columns.push({

            index: i,

            x:
                LAYOUT.CANVAS_PADDING_X +
                i * LAYOUT.COLUMN_WIDTH

        });

    }

    //---------------------------------------
    // Workflow Lanes
    //---------------------------------------


    //---------------------------------------

    return {

        canvas: {

            width: canvasWidth,
            height: canvasHeight

        },

        workflow: {

            lanes,
            columns

        },

        support: {

            top: supportTop,
            bottom: supportBottom

        },

        planning: {

            top: planningTop

        },

        infrastructure: {

            top: infrastructureTop

        }

    };

}