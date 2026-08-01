import Node from "../../runtimeModel/operationalGraph/node.js";
import Edge from "../../runtimeModel/operationalGraph/edge.js"
import ProjectState from "./state.js"

export default class Project{
    static createNode(row){
     return new Node(row.id,"PROJECT");
}
    static createEdges(row){
    return [
        new Edge(
            row.id,
            row.departmentId,
            "OWNED_BY"
        ),
        new Edge(
            row.id,
            row.supplierId,
            "USES_SUPPLIER"
        ),
        ...(row.bomIds ?? []).map(id =>
            new Edge(
                row.id,
                id,
                "HAS_BOM"
            )
        ),
        ...(row.milestoneIds ?? []).map(id =>
            new Edge(
                row.id,
                id,
                "HAS_MILESTONE"
            )
        ),
        ...(row.workOrderIds ?? []).map(id =>
            new Edge(
                row.id,
                id,
                "HAS_WORK_ORDER"
            )
        )
    ];
}
    static createState(row) {
        return new ProjectState(row);
    }
     }


