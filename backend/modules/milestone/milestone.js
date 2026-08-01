import Node from "../../runtime/operationalGraph/node.js";
import Edge from "../../runtime/operationalGraph/edge.js";
import MilestoneState from "./state.js";

export default class Milestone{
    static createNode(row){
        return new Node(
            `MILESTONE:${row.id}`,
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