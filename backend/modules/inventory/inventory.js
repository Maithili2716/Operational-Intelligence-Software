import Node from "../../shared/runtimeModel/operationalGraph/node.js";
import Edge from "../../shared/runtimeModel/operationalGraph/edge.js";
import InventoryState from "./state.js";

export default class Inventory{
    static createNode(row){
        return new Node(
            row.id,
            "INVENTORY"
        );
    }
    static createEdges(row){
        return [
            new Edge(
                row.id,
                row.material_id,
                "FOR_MATERIAL"
            ),
            new Edge(
                row.id,
                row.warehouse_id,
                "STORED_IN"
            )
        ];
    }
    static createState(row){
        return new InventoryState(row);
    }
}