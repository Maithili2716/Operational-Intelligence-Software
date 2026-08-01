import Node from "../../runtime/operationalGraph/node.js";
import Edge from "../../runtime/operationalGraph/edge.js";
import BOMState from "./state.js";

export default class BOM{
    static createNode(row){
        return new Node(
            `BOM:${row.id}`,
            "BOM"
        );
    }
    static createEdges(row){
        return [
            ...(row.materialIds ?? []).map(
                id =>
                    new Edge(
                        `BOM:${row.id}`,
                        `MATERIAL:${id}`,
                        "USES_MATERIAL"
                    )
            ),
            ...(row.supplierIds ?? []).map(
                id =>
                    new Edge(
                        `BOM:${row.id}`,
                        `SUPPLIER:${id}`,
                        "REQUIRES_SUPPLIER"
                    )
            )
        ];
    }

    static createState(row){
        return new BOMState(row);
    }
}