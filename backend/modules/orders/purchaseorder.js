import Node from "../../shared/runtimeModel/operationalGraph/node.js";
import Edge from "../../shared/runtimeModel/operationalGraph/edge.js";
import PurchaseOrderState from "./state.js";

export default class PurchaseOrder{
    static createNode(row){
        return new Node(
            row.id,
            "PURCHASE_ORDER"
        );
    }
    static createEdges(row){
        return [
            new Edge(
                row.id,
                row.procurement_id,
                "GENERATED_FROM_PROCUREMENT"
            ),
            new Edge(
                row.id,
                row.supplier_id,
                "ORDERED_FROM_SUPPLIER"
            ),
            ...(row.material_ids ?? []).map(
                id =>
                    new Edge(
                        row.id,
                        id,
                        "ORDERS_MATERIAL"
                    )
            ),
            ...(row.shipment_ids ?? []).map(
                id =>
                    new Edge(
                        row.id,
                        id,
                        "FULFILLED_BY_SHIPMENT"
                    )
            )
        ];
    }

    static createState(row){
        return new PurchaseOrderState(row);

    }

}