import Node from "../../shared/runtimeModel/operationalGraph/node.js";
import MaterialState from "./state.js";

export default class Material{
    static createNode(row){
        return new Node(
            row.id,
            "MATERIAL"
        );
    }
    static createEdges(){
        return [];
    }

    static createState(row){
        return new MaterialState(row);
    }

}