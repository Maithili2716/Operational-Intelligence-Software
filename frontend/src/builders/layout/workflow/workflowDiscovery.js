// =========================================
// Workflow Discovery
// Runtime Graph
//        ↓
// Semantic Workflows
// =========================================

import { WORKFLOW } from "./relationshipVocabulary";
// -----------------------------------------
// Workflow Traversal Rules
// -----------------------------------------
const TRANSITIONS = {
    PROJECT: {
        relationship: "USES_SUPPLIER",
        nextType: "SUPPLIER",
        direction: "outgoing"
    },

    SUPPLIER: {
        relationship: "FROM_SUPPLIER",
        nextType: "PROCUREMENT",
        direction: "incoming"
    },

    PROCUREMENT: {
        relationship: "GENERATES_PURCHASE_ORDER",
        nextType: "PURCHASE_ORDER",
        direction: "outgoing"
    },

    PURCHASE_ORDER: {
        relationship: "FULFILLED_BY_SHIPMENT",
        nextType: "SHIPMENT",
        direction: "outgoing"
    },

    SHIPMENT: {
        relationship: "INSPECTS_SHIPMENT",
        nextType: "QUALITY_INSPECTION",
        direction: "incoming"
    }
};

// =========================================
// Discover Workflows
// =========================================

export function discoverWorkflows(
    nodes,
    edges
) {
    // -------------------------------------
    // Indexes
    // -------------------------------------
    const nodeMap = new Map();
    const outgoing = new Map();
    const incoming = new Map();

    nodes.forEach(node => {
        nodeMap.set(node.id, node);
        outgoing.set(node.id, []);
        incoming.set(node.id, []);
    });

    edges.forEach(edge => {
        if (!WORKFLOW.includes(edge.relationship))
            return;
        outgoing.get(edge.from)?.push(edge);
        incoming.get(edge.to)?.push(edge);

    });

    // -------------------------------------
    // Workflow Roots
    // -------------------------------------
    const projects = nodes.filter(
        node =>
            node.type === "PROJECT"
    );
    const workflows = [];
    const workflowByNode = new Map();

    // -------------------------------------
    // Traverse
    // -------------------------------------

    projects.forEach((project, index) => {
        const workflow = [];
        const visited = new Set();
        let current = project;

        while (current) {
            if (visited.has(current.id))
                break;
            visited.add(current.id);
            workflow.push(current);
            const rule =
                TRANSITIONS[
                    current.type
                ];

            if (!rule)
                break;
            let next = null;

            if (rule.direction === "outgoing") {
                const neighbours =
                    outgoing.get(current.id);
                for (const edge of neighbours) {
                    if (
                        edge.relationship !==
                        rule.relationship
                    )
                        continue;
                    const candidate =
                        nodeMap.get(edge.to);
                    if (
                        candidate &&
                        candidate.type ===
                        rule.nextType
                    ) {

                        next = candidate;
                        break;

                    }
                }
            }

            else {
                const neighbours =
                    incoming.get(current.id);

                for (const edge of neighbours) {
                    if (
                        edge.relationship !==
                        rule.relationship
                    )
                        continue;
                    const candidate =
                        nodeMap.get(edge.from);
                    if (
                        candidate &&
                        candidate.type ===
                        rule.nextType
                    ) {

                        next = candidate;
                        break;

                    }
                }
            }
            current = next;
        }

        const workflowObject = {
        id:`WORKFLOW:${index + 1}`,
        root:project.id,
        nodes:workflow
    };

        workflow.forEach(node => {
        workflowByNode.set(node.id,workflowObject);
    });

        workflows.push(workflowObject);
    });

    return {
        workflows,
        workflowByNode
    };

}