import Node from "../../shared/runtimeModel/operationalGraph/node.js";
import WarehouseState from "./state.js";

export default class Warehouse{
    static createNode(row){
        return new Node(
            row.id,
            "WAREHOUSE"
        );
    }
    static createEdges(){
        return [];
    }
    static createState(row){
        return new WarehouseState(row);
    }
}