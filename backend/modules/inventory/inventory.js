import Node from "../../runtime/operationalGraph/node.js";
import Edge from "../../runtime/operationalGraph/edge.js";
import InventoryState from "./state.js";

export default class Inventory{
    static createNode(row){
        return new Node(
            `INVENTORY:${row.id}`,
            "INVENTORY"
        );
    }
    static createEdges(row){
        return [
            new Edge(
                `INVENTORY:${row.id}`,
                `MATERIAL:${row.material_id}`,
                "FOR_MATERIAL"
            ),
            new Edge(
                `INVENTORY:${row.id}`,
                `WAREHOUSE:${row.warehouse_id}`,
                "STORED_IN"
            )
        ];
    }
    static createState(row){
        return new InventoryState(row);
    }
}