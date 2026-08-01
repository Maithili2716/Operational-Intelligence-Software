import Node from "../../shared/runtimeModel/operationalGraph/node.js";
import Edge from "../../shared/runtimeModel/operationalGraph/edge.js";
import MilestoneState from "./state.js";

export default class Milestone{
    static createNode(row){
        return new Node(
            row.id,
            "MILESTONE"
        );
    }
    static createEdges(){
        return [];
    }
    static createState(row){
        return new MilestoneState(row);
    }
}