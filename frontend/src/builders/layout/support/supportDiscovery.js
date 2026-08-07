// =========================================
// Support Discovery
// Runtime Graph
//         ↓
// Semantic Support Anchors
// =========================================

import {
    SUPPORT,
    RESOURCE,
    PRIORITY
} from "../workflow/relationshipVocabulary";

// -----------------------------------------
// Planning Entities
// -----------------------------------------
const PLANNING_TYPES = [
    "BOM",
    "WORK_ORDER",
    "MILESTONE"
];

// =========================================
// Discover Support Nodes
// =========================================

export function discoverSupportNodes(
    nodes,
    edges,
    workflowLayout
) {
    //--------------------------------------
    // Indexes
    //--------------------------------------
    const nodeMap =
        new Map(
            nodes.map(node => [
                node.id,
                node
            ])
        );

    const anchors = [];
    const planning = [];
    const discovered = new Set();

    //--------------------------------------
    // Planning
    //--------------------------------------

    nodes.forEach(node => {
        if (
            PLANNING_TYPES.includes(
                node.type
            )
        ) {
            planning.push(node);
        }
    });

    //--------------------------------------
    // Support Discovery
    //--------------------------------------

    nodes.forEach(node => {
        // Skip workflow nodes
        if (
            workflowLayout.workflowByNode.has(
                node.id
            )
        ) {
            return;
        }
        // Skip planning nodes
        if (
            planning.find(
                p => p.id === node.id
            )
        ) {
            return;
        }

     nodes.forEach(node => {
     if (discovered.has(node.id))
        return;

    edges.forEach(edge => {
        const discoveredAnchor =
            anchors.find(anchor =>
                anchor.supportNode.id === edge.from
            );

        if (
            discoveredAnchor &&
            edge.to === node.id &&
            RESOURCE.includes(edge.relationship)
        ) {
            anchors.push({
                supportNode: node,
                workflow:
                    discoveredAnchor.workflow,
                anchorNodeId:
                    discoveredAnchor.supportNode.id,
                relationship:
                    edge.relationship,
                secondaryAnchors: []
            });
            discovered.add(node.id);
        }
    });
});
        //----------------------------------
        // Candidate Anchors
        //----------------------------------
        const candidates = [];
        edges.forEach(edge => {
            //----------------------------------
            // Ignore unrelated relationships
            //----------------------------------
            if (
                !SUPPORT.includes(edge.relationship) &&

                !RESOURCE.includes(edge.relationship)

            ) {

                return;
            }

            //----------------------------------
            // node → workflow
            //----------------------------------

            if (
                edge.from === node.id &&
                workflowLayout.workflowByNode.has(
                    edge.to
                )

            ) {

                candidates.push({
                    relationship:
                        edge.relationship,

                    workflow:
                        workflowLayout
                            .workflowByNode
                            .get(edge.to),
                    anchorNodeId:edge.to

                });
            }

            //----------------------------------
            // workflow → node
            //----------------------------------

            if (
                edge.to === node.id &&
                workflowLayout.workflowByNode.has(
                    edge.from
                )

            ) {
                candidates.push({
                    relationship:
                        edge.relationship,
                    workflow:
                        workflowLayout
                            .workflowByNode
                            .get(edge.from),
                    anchorNodeId:edge.from
                });
            }
        });

        //----------------------------------
        // Nothing attached
        //----------------------------------
        if (!candidates.length)
            return;
        //----------------------------------
        // Sort by semantic priority
        //----------------------------------

        candidates.sort(
            (a, b) =>
                PRIORITY[a.relationship] -
                PRIORITY[b.relationship]
        );

        //----------------------------------
        // Primary + Secondary
        //----------------------------------


        anchors.push({
            supportNode: node,
            anchorNodeId:
                candidates[0].anchorNodeId,
            workflow:
                candidates[0].workflow,
            relationship:
                candidates[0].relationship,
            secondaryAnchors:
                candidates
                    .slice(1)
                    .map(candidate => ({
                        anchorNodeId:
                            candidate.anchorNodeId,
                        relationship:
                            candidate.relationship

                    }))
        });
        discovered.add(node.id);
    });

    const infrastructure = nodes.filter(
    node =>
        !workflowLayout.workflowByNode.has(node.id) &&
        !planning.some(p => p.id === node.id) &&
        !anchors.some(a => a.supportNode.id === node.id)
);

    //--------------------------------------
    // Return
    //--------------------------------------

    return {
        anchors,
        planning,infrastructure
    };
}