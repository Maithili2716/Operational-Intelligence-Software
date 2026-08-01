import Node from "../../runtime/operationalGraph/node.js";
import SupplierState from "./state.js";

export default class Supplier{
    static createNode(row){
        return new Node(
            `SUPPLIER:${row.id}`,
            "SUPPLIER"
        );
    }

    static createEdges(){
        return [];
    }

    static createState(row){
        return new SupplierState(row);
    }

}