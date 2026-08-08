import Node from "../../runtime/operationalGraph/node.js";
import Edge from "../../runtime/operationalGraph/edge.js";
import SupplierQuoteState from "./state.js";

export default class SupplierQuote{
    static createNode(row){
        return new Node(
            `SUPPLIER_QUOTE:${row.id}`,
            "SUPPLIER_QUOTE"
        );
    }
    static createEdges(row){
        return [
            new Edge(
                `SUPPLIER_QUOTE:${row.id}`,
                `SUPPLIER:${row.supplier_id}`,
                "PROVIDED_BY_SUPPLIER"
            ),
            new Edge(
                `SUPPLIER_QUOTE:${row.id}`,
                `MATERIAL:${row.material_id}`,
                "QUOTES_FOR_MATERIAL"
            )
        ];
    }
    static createState(row){
        return new SupplierQuoteState(row);
    }
}