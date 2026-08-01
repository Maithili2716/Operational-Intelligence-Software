import Node from "../../shared/runtimeModel/operationalGraph/node.js";
import Edge from "../../shared/runtimeModel/operationalGraph/edge.js";
import QualityInspectionState from "./state.js";

export default class QualityInspection{
    static createNode(row){
        return new Node(
            row.id,
            "QUALITY_INSPECTION"
        );
    }
    static createEdges(row){
        return [
            new Edge(
                row.id,
                row.shipment_id,
                "INSPECTS_SHIPMENT"
            )
        ];
    }
    static createState(row){
        return new QualityInspectionState(row);
    }
}