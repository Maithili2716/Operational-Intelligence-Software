import Node from "../../runtime/operationalGraph/node.js";
import DepartmentState from "./state.js";

export default class Department{
    static createNode(row){
        return new Node(
            `DEPARTMENT:${row.id}`,
            "DEPARTMENT"
        );
    }
    static createEdges(row){
        return [];
    }

    static createState(row){
        return new DepartmentState(row);
    }

}