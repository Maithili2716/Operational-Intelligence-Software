export default class EntityLoader {
    static async load(
        module,
        graph,
        state
    ) {
        const rows = await module.repository.getActive();
        for (const row of rows) {
          const node = module.entity.createNode(row);
          graph.addNode(node);

        const edges = module.entity.createEdges(row) ?? [];
        const entityState = module.entity.createState(row);
        state.set(node.id, entityState);

        }

    }

}