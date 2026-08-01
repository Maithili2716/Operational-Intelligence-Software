import Builder from "./runtime/operationalModelBuilder.js";
import { generateAttention } from "./engines/attentionEngine/attentionEngine.js";

const builder = new Builder();

const runtimeModel = await builder.build();

console.log(runtimeModel);

const attention = generateAttention(runtimeModel);

console.log(attention);