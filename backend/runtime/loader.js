export default class EntityLoader {

    static async loadNodes(module, graph, cache) {
        const rows = await module.repository.getActive();
        cache.set(module, rows);
        for (const row of rows) {
            graph.addNode(
                module.entity.createNode(row)
            );
        }
    }

       static loadEdges(module, graph, cache) {
        const rows = cache.get(module);
        for (const row of rows) {
            const edges = module.entity.createEdges(row) ?? [];
            for (const edge of edges) {
                if (!graph.nodes.has(edge.to)) {
                    throw new Error(
                        `Missing target node: ${edge.to} while adding edge ${edge.from} -> ${edge.to}`
                    );
                }
                graph.addEdge(edge);
            }
        }
    }

    
    static loadState(module, state, cache) {
        const rows = cache.get(module);
        for (const row of rows) {
            const node = module.entity.createNode(row);
            state.set(
                node.id,
                module.entity.createState(row)
            );
        }
    }

}