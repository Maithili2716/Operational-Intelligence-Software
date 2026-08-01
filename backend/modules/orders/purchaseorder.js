import Node from "../../runtime/operationalGraph/node.js";
import Edge from "../../runtime/operationalGraph/edge.js";
import PurchaseOrderState from "./state.js";

export default class PurchaseOrder{
    static createNode(row){
        return new Node(
            `PURCHASE_ORDER:${row.id}`,
            "PURCHASE_ORDER"
        );
    }
    static createEdges(row){
        return [
            new Edge(
                `PURCHASE_ORDER:${row.id}`,
                `PROCUREMENT:${row.procurement_id}`,
                "GENERATED_FROM_PROCUREMENT"
            ),
            new Edge(
                `PURCHASE_ORDER:${row.id}`,
                `SUPPLIER:${row.supplier_id}`,
                "ORDERED_FROM_SUPPLIER"
            ),
            ...(row.material_ids ?? []).map(
                id =>
                    new Edge(
                        `PURCHASE_ORDER:${row.id}`,
                        `MATERIAL:${id}`,
                        "ORDERS_MATERIAL"
                    )
            ),
            ...(row.shipment_ids ?? []).map(
                id =>
                    new Edge(
                        `PURCHASE_ORDER:${row.id}`,
                        `SHIPMENT:${id}`,
                        "FULFILLED_BY_SHIPMENT"
                    )
            )
        ];
    }

    static createState(row){
        return new PurchaseOrderState(row);

    }

}