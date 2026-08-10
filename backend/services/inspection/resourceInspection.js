import formatDate from "../../utils/formatDate.js";

export function inspectResource(attention, runtime) {

    switch (attention.title) {

        case "Insufficient Inventory":
            return inspectInsufficientInventory(
                attention,
                runtime
            );

        case "Out Of Stock":
            return inspectOutOfStock(
                attention,
                runtime
            );

        case "Inventory Not Updated For Too Long":
            return inspectIdleInventory(
                attention,
                runtime
            );

        case "Resource Mismatch":
            return inspectResourceMismatch(
                attention,
                runtime
            );

        default:
            return null;
    }
}


/*
===========================================================
INSUFFICIENT INVENTORY
===========================================================
*/

function inspectInsufficientInventory(
    attention,
    runtime
) {

    const state =
        runtime.state.get(attention.entityId);

    if (!state)
        return null;


    const available =
        state.resource?.available;

    const required =
        state.resource?.required;


    if (
        available === undefined ||
        required === undefined
    ) {
        return null;
    }


    return {

        entityType:
            attention.entityType,

        entityId:
            attention.entityId,


        rootCauseAnalysis: {

            summary:
                "Inventory demand exceeds the currently available stock.",

            cause:
                `The required quantity (${required}) is greater than the currently available quantity (${available}).`,

            confidence:
                "HIGH"
        },


        affectedEntities:
            findInventoryAffectedEntities(
                attention.entityId,
                runtime
            ),


        mitigationStrategy: {

            summary:
                "Increase available inventory to satisfy the required quantity before continuing the dependent operation.",

            updates: [

                {
                    entityType:
                        attention.entityType,

                    entityId:
                        attention.entityId,

                    field:
                        "availableQuantity",

                    currentValue:
                        available,

                    requiredValue:
                        required,

                    steps: [
                        "Verify the current inventory requirement.",
                        "Confirm the quantity required by the dependent operation.",
                        `Increase available quantity from ${available} to ${required}.`,
                        "Verify that the available quantity satisfies the requirement."
                    ]
                }

            ],

            manualActions: []
        }
    };
}


/*
===========================================================
OUT OF STOCK
===========================================================
*/

function inspectOutOfStock(
    attention,
    runtime
) {

    const state =
        runtime.state.get(attention.entityId);

    if (!state)
        return null;


    const available =
        state.resource?.available;


    if (available === undefined)
        return null;


    if (available !== 0)
        return null;


    const required =
        state.resource?.required ?? 1;


    return {

        entityType:
            attention.entityType,

        entityId:
            attention.entityId,


        rootCauseAnalysis: {

            summary:
                "Required inventory is completely unavailable.",

            cause:
                "The inventory currently has zero available quantity.",

            confidence:
                "HIGH"
        },


        affectedEntities:
            findInventoryAffectedEntities(
                attention.entityId,
                runtime
            ),


        mitigationStrategy: {

            summary:
                "Restore inventory availability before the dependent operation can proceed.",

            updates: [

                {
                    entityType:
                        attention.entityType,

                    entityId:
                        attention.entityId,

                    field:
                        "availableQuantity",

                    currentValue:
                        available,

                    requiredValue:
                        required,

                    steps: [
                        "Verify that the inventory is completely unavailable.",
                        "Identify the quantity required by the dependent operation.",
                        "Arrange replenishment or allocation of the required material.",
                        "Update the available inventory quantity.",
                        "Verify that inventory is available for the dependent operation."
                    ]
                }

            ],

            manualActions: []
        }
    };
}


/*
===========================================================
INVENTORY NOT UPDATED FOR TOO LONG
===========================================================
*/

function inspectIdleInventory(
    attention,
    runtime
) {

    const state =
        runtime.state.get(attention.entityId);

    if (!state)
        return null;


    const lastUpdated =
        state.resource?.lastUpdated ??
        state.lastUpdated;


    if (!lastUpdated)
        return null;


    const available =
        state.resource?.available;


    return {

        entityType:
            attention.entityType,

        entityId:
            attention.entityId,


        rootCauseAnalysis: {

            summary:
                "Inventory has not been updated within the expected operational period.",

            cause:
                `The inventory record has remained unchanged since ${lastUpdated}.`,

            confidence:
                "MEDIUM"
        },


        affectedEntities:
            findInventoryAffectedEntities(
                attention.entityId,
                runtime
            ),


        mitigationStrategy: {

            summary:
                "Verify the physical inventory and update the inventory record with the latest quantity.",

            updates: [

                {
                    entityType:
                        attention.entityType,

                    entityId:
                        attention.entityId,

                    field:
                        "availableQuantity",

                    currentValue:
                        available,

                    requiredValue:
                        available,

                    steps: [
                        "Verify the current physical inventory.",
                        "Compare the physical quantity with the recorded inventory.",
                        "Update the inventory record with the verified quantity.",
                        "Verify that the inventory record reflects the current stock."
                    ]
                }

            ],

            manualActions: []
        }
    };
}


/*
===========================================================
RESOURCE MISMATCH
===========================================================
*/

function inspectResourceMismatch(
    attention,
    runtime
) {

    const state =
        runtime.state.get(attention.entityId);

    if (!state)
        return null;


    const available =
        state.resource?.available;

    const required =
        state.resource?.required;


    if (
        available === undefined ||
        required === undefined
    ) {
        return null;
    }


    return {

        entityType:
            attention.entityType,

        entityId:
            attention.entityId,


        rootCauseAnalysis: {

            summary:
                "The available resource does not match the quantity required by the dependent operation.",

            cause:
                `Available quantity is ${available}, while the required quantity is ${required}.`,

            confidence:
                "HIGH"
        },


        affectedEntities:
            findInventoryAffectedEntities(
                attention.entityId,
                runtime
            ),


        mitigationStrategy: {

            summary:
                "Resolve the resource allocation mismatch before the dependent operation proceeds.",

            updates: [

                {
                    entityType:
                        attention.entityType,

                    entityId:
                        attention.entityId,

                    field:
                        "availableQuantity",

                    currentValue:
                        available,

                    requiredValue:
                        required,

                    steps: [
                        "Verify the required resource quantity.",
                        "Verify the currently available resource quantity.",
                        "Identify the source of the allocation mismatch.",
                        `Adjust the available allocation from ${available} to ${required}.`,
                        "Verify that the resource allocation now matches the requirement."
                    ]
                }

            ],

            manualActions: []
        }
    };
}


/*
===========================================================
AFFECTED ENTITIES
===========================================================
*/

/*
    Inventory is directly connected to:

        INVENTORY
             ↓
          MATERIAL
             ↓
       PROCUREMENT
             ↓
       PURCHASE ORDER
             ↓
         SHIPMENT
             ↓
          QUALITY

    The inventory itself is the source of the problem.

    MATERIAL and WAREHOUSE are contextual entities,
    but the operationally affected entities are the
    downstream business entities that depend on the
    material.

    Therefore we:

        1. Find the material connected to inventory.
        2. Traverse the graph from that material.
        3. Collect operational entities.
        4. Exclude the inventory itself.
        5. Exclude infrastructure/context entities.
        6. Deduplicate entities.
*/


function findInventoryAffectedEntities(
    inventoryId,
    runtime
) {

    const affectedEntities = [];

    const visited = new Set();

    const edges =
        runtime.graph.getAllEdges();


    /*
    -------------------------------------------------------
    Find material(s) associated with this inventory
    -------------------------------------------------------
    */

    const materialIds = [];

    for (const edge of edges) {

        if (
            edge.from === inventoryId &&
            edge.to.startsWith("MATERIAL:")
        ) {
            materialIds.push(
                edge.to
            );
        }

        if (
            edge.to === inventoryId &&
            edge.from.startsWith("MATERIAL:")
        ) {
            materialIds.push(
                edge.from
            );
        }
    }


    /*
    If there is no material relationship,
    fall back to direct operational relationships.
    */

    if (materialIds.length === 0) {

        for (const edge of edges) {

            let affectedId = null;

            if (edge.from === inventoryId) {
                affectedId = edge.to;
            }

            else if (edge.to === inventoryId) {
                affectedId = edge.from;
            }


            if (!affectedId)
                continue;


            if (affectedId === inventoryId)
                continue;


            const node =
                runtime.graph.findNode(
                    affectedId
                );


            if (!node)
                continue;


            if (
                node.type === "MATERIAL" ||
                node.type === "WAREHOUSE"
            ) {
                continue;
            }


            const key =
                `${node.type}:${node.id}`;


            if (visited.has(key))
                continue;


            visited.add(key);


            affectedEntities.push({

                entityType:
                    node.type,

                entityId:
                    node.id,

                reason:
                    `The ${node.type.toLowerCase()} is directly connected to the affected inventory.`
            });
        }


        return affectedEntities;
    }


    /*
    -------------------------------------------------------
    Traverse from material into operational dependencies
    -------------------------------------------------------
    */

    const queue = [
        ...materialIds
    ];


    const traversed = new Set([
        inventoryId,
        ...materialIds
    ]);


    while (queue.length > 0) {

        const currentId =
            queue.shift();


        for (const edge of edges) {

            let nextId = null;


            if (edge.from === currentId) {
                nextId = edge.to;
            }

            else if (edge.to === currentId) {
                nextId = edge.from;
            }


            if (!nextId)
                continue;


            if (traversed.has(nextId))
                continue;


            traversed.add(nextId);


            const node =
                runtime.graph.findNode(
                    nextId
                );


            if (!node)
                continue;


            /*
            ------------------------------------------------
            Context / infrastructure nodes
            ------------------------------------------------
            */

            if (
                node.type === "MATERIAL" ||
                node.type === "WAREHOUSE"
            ) {
                queue.push(nextId);
                continue;
            }


            /*
            ------------------------------------------------
            Inventory itself is never an affected entity
            ------------------------------------------------
            */

            if (
                node.type === "INVENTORY"
            ) {
                continue;
            }


            /*
            ------------------------------------------------
            Operational entity
            ------------------------------------------------
            */

            const key =
                `${node.type}:${node.id}`;


            if (!visited.has(key)) {

                visited.add(key);

                affectedEntities.push({

                    entityType:
                        node.type,

                    entityId:
                        node.id,

                    reason:
                        `The ${node.type.toLowerCase()} depends on material associated with the affected inventory.`
                });
            }


            /*
            Continue traversal so that downstream
            operational dependencies can also be found.
            */

            queue.push(nextId);
        }
    }


    return affectedEntities;
}