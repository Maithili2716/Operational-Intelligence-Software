import Node from "../../shared/runtimeModel/operationalGraph/node.js";
import Edge from "../../shared/runtimeModel/operationalGraph/edge.js";
import BOMState from "./state.js";

export default class BOM{
    static createNode(row){
        return new Node(
            row.id,
            "BOM"
        );
    }
    static createEdges(row){
        return [
            ...(row.material_ids ?? []).map(
                id =>
                    new Edge(
                        row.id,
                        id,
                        "USES_MATERIAL"
                    )
            ),
            ...(row.supplier_ids ?? []).map(
                id =>
                    new Edge(
                        row.id,
                        id,
                        "REQUIRES_SUPPLIER"
                    )
            )
        ];
    }

    static createState(row){
        return new BOMState(row);
    }
}