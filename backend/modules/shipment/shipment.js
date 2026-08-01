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
        return [
            new Edge(
                `SHIPMENT:${row.id}`,
                `PURCHASE_ORDER:${row.purchase_order_id}`,
                "FULFILLS_PURCHASE_ORDER"
            )
        ];
    }
    static createState(row){
        return new ShipmentState(row);
    }
}