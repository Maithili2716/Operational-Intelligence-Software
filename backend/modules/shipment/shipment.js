import Node from "../../runtime/operationalGraph/node.js";
import Edge from "../../runtime/operationalGraph/edge.js";
import ShipmentState from "./state.js";

export default class Shipment{
    static createNode(row){
        return new Node(
            `SHIPMENT:${row.id}`,
            "SHIPMENT"
        );
    }
    static createEdges(row){
        return [ ];
    }
    static createState(row){
        return new ShipmentState(row);
    }
}