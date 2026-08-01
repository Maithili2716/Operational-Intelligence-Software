import Node from "../../shared/runtimeModel/operationalGraph/node.js";
import WorkOrderState from "./state.js";

export default class WorkOrder{
    static createNode(row){
        return new Node(
            row.id,
            "WORK_ORDER"
        );
    }
    static createEdges(){
        return [];
    }
    static createState(row){
        return new WorkOrderState(row);
    }
}