import Node from "../../runtime/operationalGraph/node.js";
import Edge from "../../runtime/operationalGraph/edge.js";
import ProcurementState from "./state.js";

export default class Procurement{
    static createNode(row){
        return new Node(
            `PROCUREMENT:${row.id}`,
            "PROCUREMENT"
        );
    }
    static createEdges(row){
        return [
            new Edge(
                `PROCUREMENT:${row.id}`,
                `SUPPLIER:${row.supplier_id}`,
                "FROM_SUPPLIER"
            ),
            ...(row.material_ids ?? []).map(
                id =>
                new Edge(
                    `PROCUREMENT:${row.id}`,
                    `MATERIAL:${id}`,
                    "PROCURES_MATERIAL"
                )
            ),
            ...(row.purchase_order_ids ?? []).map(
                id =>
                new Edge(
                    `PROCUREMENT:${row.id}`,
                    `PURCHASE_ORDER:${id}`,
                    "GENERATES_PURCHASE_ORDER"
                )
            )
        ];
    }

    static createState(row){
        return new ProcurementState(row);
    }
}