import Node from "../../shared/runtimeModel/operationalGraph/node.js";
import Edge from "../../shared/runtimeModel/operationalGraph/edge.js";
import ProcurementState from "./state.js";

export default class Procurement{
    static createNode(row){
        return new Node(
            row.id,
            "PROCUREMENT"
        );
    }
    static createEdges(row){
        return [
            new Edge(
                row.id,
                row.supplier_id,
                "FROM_SUPPLIER"
            ),
            ...(row.material_ids ?? []).map(
                id =>
                new Edge(
                    row.id,
                    id,
                    "PROCURES_MATERIAL"
                )
            ),
            ...(row.purchase_order_ids ?? []).map(
                id =>
                new Edge(
                    row.id,
                    id,
                    "GENERATES_PURCHASE_ORDER"
                )
            )
        ];
    }

    static createState(row){
        return new ProcurementState(row);
    }
}