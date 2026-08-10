export function findReachableEntity(
    startEntityId,
    targetEntityType,
    runtime,
    maxDepth = 5
) {

    if (!startEntityId || !targetEntityType || !runtime)
        return null;


    const graph =
        runtime.graph;

    if (!graph)
        return null;


    const queue = [
        {
            id: startEntityId,
            depth: 0
        }
    ];


    const visited =
        new Set([startEntityId]);


    while (queue.length > 0) {

        const current =
            queue.shift();


        if (current.depth >= maxDepth)
            continue;


        const neighbours =
            getNeighbours(
                current.id,
                graph
            );


        for (const neighbourId of neighbours) {

            if (visited.has(neighbourId))
                continue;


            visited.add(neighbourId);


            const node =
                graph.findNode(
                    neighbourId
                );


            if (!node)
                continue;


            if (node.type === targetEntityType) {

                return {
                    entityType:
                        node.type,

                    entityId:
                        node.id
                };
            }


            queue.push({

                id:
                    neighbourId,

                depth:
                    current.depth + 1
            });
        }
    }


    return null;
}


/*
===========================================================
FIND ALL REACHABLE ENTITIES OF A TYPE
===========================================================
*/

export function findReachableEntities(
    startEntityId,
    targetEntityType,
    runtime,
    maxDepth = 5
) {

    if (!startEntityId || !targetEntityType || !runtime)
        return [];


    const graph =
        runtime.graph;

    if (!graph)
        return [];


    const results = [];

    const queue = [
        {
            id: startEntityId,
            depth: 0
        }
    ];


    const visited =
        new Set([startEntityId]);


    while (queue.length > 0) {

        const current =
            queue.shift();


        if (current.depth >= maxDepth)
            continue;


        const neighbours =
            getNeighbours(
                current.id,
                graph
            );


        for (const neighbourId of neighbours) {

            if (visited.has(neighbourId))
                continue;


            visited.add(neighbourId);


            const node =
                graph.findNode(
                    neighbourId
                );


            if (!node)
                continue;


            if (node.type === targetEntityType) {

                results.push({

                    entityType:
                        node.type,

                    entityId:
                        node.id
                });
            }


            queue.push({

                id:
                    neighbourId,

                depth:
                    current.depth + 1
            });
        }
    }


    return results;
}


/*
===========================================================
GET NEIGHBOURS
===========================================================
*/

function getNeighbours(
    entityId,
    graph
) {

    const neighbours =
        new Set();


    /*
     * Outgoing edges
     */

    const outgoing =
        graph.adjacencyList?.get(
            entityId
        ) ?? [];


    for (const edge of outgoing) {

        if (edge.to)
            neighbours.add(edge.to);
    }


    /*
     * Incoming edges
     *
     * This is important because some relationships
     * may point toward the entity we started from.
     */

    const edges =
        graph.getAllEdges();


    for (const edge of edges) {

        if (edge.to === entityId) {

            if (edge.from)
                neighbours.add(edge.from);
        }
    }


    return [...neighbours];
}