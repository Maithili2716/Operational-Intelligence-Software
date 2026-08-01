import runtime from "./runtimeModel/runtimeModel"
import builder from "./runtimeModel/operationalModelBuilder"

const builder = new Builder();

const runtime = await builder.build();

console.log("Nodes:", runtime.graph.nodes.size);
console.log("State:", runtime.state.states.size);

const attention = evaluate(runtime);

console.table(attention);