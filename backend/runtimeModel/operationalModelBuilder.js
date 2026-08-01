import EntityLoader from "./loader.js";
import Graph from "./operationalGraph/operationalgraph.js";
import RuntimeModel from "./runtimeModel.js";
import State from "./operationalState.js";
import modules from "../modules/index.js";


class Builder{
     async build(){
          const graph=new Graph();
          const state= new State();
          for (const module of modules) {
               await EntityLoader.load(module, graph, state);
          }      
          return new RuntimeModel(graph,state);      
          }
     }

export default Builder;