import Node from "../../shared/runtimeModel/operationalGraph/node.js";
import Edge from "../../shared/runtimeModel/operationalGraph/edge.js";
import SupplierQuoteState from "./state.js";

export default class SupplierQuote{
    static createNode(row){
        return new Node(
            row.id,
            "SUPPLIER_QUOTE"
        );
    }
    static createEdges(row){
        return [
            new Edge(
                row.id,
                row.supplier_id,
                "PROVIDED_BY_SUPPLIER"
            ),
            new Edge(
                row.id,
                row.material_id,
                "QUOTES_FOR_MATERIAL"
            )
        ];
    }
    static createState(row){
        return new SupplierQuoteState(row);
    }
}