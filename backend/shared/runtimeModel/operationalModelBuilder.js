import EntityLoader from "./entityLoader.js";
import Graph from "./operstionalGraph/operationalgraph.js";
import RuntimeModel from "./runtimeModel.js";
import State from "./operationalState.js";

import ProjectModule from "../../modules/projects/index.js";
import WorkOrderModule from "../../modules/workOrder";
import InventoryModule from "../../modules/inventory";


class Builder{
     async build(){
          const graph=new Graph();
          const state= new State();
          
          const modules = [
               ProjectModule,
               WorkOrderModule,
               InventoryModule,
               ShipmentModule
          ];

          for (const module of modules) {
               await EntityLoader.load(module, graph, state);
          }

          
          return new RuntimeModel(graph,state);
          
          }
     }

export default Builder;