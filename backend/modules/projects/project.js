import Node from "../../runtime/operationalGraph/node.js";
import Edge from "../../runtime/operationalGraph/edge.js"
import ProjectState from "./state.js"

export default class Project{
    static createNode(row){
     return new Node(`PROJECT:${row.id}`,"PROJECT");
}
    static createEdges(row){
    return [
        new Edge(
            `PROJECT:${row.id}`,
            `DEPARTMENT:${row.departmentId}`,
            "OWNED_BY"
        ),
        new Edge(
            `PROJECT:${row.id}`,
            `SUPPLIER:${row.supplierId}`,
            "USES_SUPPLIER"
        ),
        ...(row.bomIds ?? []).map(id =>
            new Edge(
                `PROJECT:${row.id}`,
                `BOM:${id}`,
                "HAS_BOM"
            )
        ),
        ...(row.milestoneIds ?? []).map(id =>
            new Edge(
                `PROJECT:${row.id}`,
                `MILESTONE:${id}`,
                "HAS_MILESTONE"
            )
        ),
        ...(row.workOrderIds ?? []).map(id =>
            new Edge(
                `PROJECT:${row.id}`,
                `WORK_ORDER:${id}`,
                "HAS_WORK_ORDER"
            )
        )
    ];
}
    static createState(row) {
        return new ProjectState(row);
    }
     }


