import Node from "../../runtime/operationalGraph/node.js";
import Edge from "../../runtime/operationalGraph/edge.js";
import QualityInspectionState from "./state.js";

export default class QualityInspection{
    static createNode(row){
        return new Node(
            `QUALITY:${row.id}`,
            "QUALITY_INSPECTION"
        );
    }
    static createEdges(row){
        return [
            new Edge(
                `QUALITY:${row.id}`,
                `SHIPMENT:${row.shipment_id}`,
                "INSPECTS_SHIPMENT"
            )
        ];
    }
    static createState(row){
        return new QualityInspectionState(row);
    }
}