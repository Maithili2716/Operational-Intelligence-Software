import Graph from "./operationalGraph/operationalgraph.js";
import State from "./operationalState.js";
import RuntimeModel from "./runtimeModel.js";
import EntityLoader from "./loader.js";

import modules from "../modules/index.js";

class Builder {

    async build() {

        const graph = new Graph();
        const state = new State();

        const cache = new Map();

        // PASS 1 - Nodes
        for (const module of modules) {
            await EntityLoader.loadNodes(
                module,
                graph,
                cache
            );
        }

        // PASS 2 - Edges
        for (const module of modules) {
            EntityLoader.loadEdges(
                module,
                graph,
                cache
            );
        }

        // PASS 3 - State
        for (const module of modules) {
            EntityLoader.loadState(
                module,
                state,
                cache
            );
        }

        return new RuntimeModel(
            graph,
            state
        );
    }
}

export default new Builder();