class EntityLoader {

    static async load(
        module,
        graph,
        state
    ) {

        const rows = await module.repository.getActive();

        for (const row of rows) {

            graph.addNode(
               module.entity.createNode(row)
            );

            for (const edge of module.entity.createEdges(row)) {
               graph.addEdge(edge);
            }

            state.set(
               row.id,
               module.entity.createState(row)
            );

        }

    }

}