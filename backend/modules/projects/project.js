import Node from "../../shared/runtimeModel/operationalGraph/node.js";
import Edge from "../../shared/runtimeModel/operstionalGraph/edge.js"
import ProjectState from "./state.js"

class Project{
    static createNode(row){
     return new Node(row.id,"PROJECT");
}
    static createEdges(row) {
        return [
            new Edge(row.id, row.departmentId, "OWNED_BY"),
            ...row.milestoneIds.map(id =>
                new Edge(row.id, id, "HAS_MILESTONE")
            ),
            new Edge(row.id, row.supplierId, "USES_SUPPLIER")
        ];
    }
    static createState(row) {
        return new ProjectState(row);
    }
     }


