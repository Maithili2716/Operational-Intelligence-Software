import Node from "../../shared/runtimeModel/operationalGraph/node.js";
import Edge from "../../shared/runtimeModel/operationalGraph/edge.js";
import ShipmentState from "./state.js";

export default class Shipment{
    static createNode(row){
        return new Node(
            row.id,
            "SHIPMENT"
        );
    }
    static createEdges(row){
        return [
            new Edge(
                row.id,
                row.purchase_order_id,
                "FULFILLS_PURCHASE_ORDER"
            )
        ];
    }
    static createState(row){
        return new ShipmentState(row);
    }
}