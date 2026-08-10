import {
    executeApproval
} from "./approvalExecution.js";

import {
    executeEngineering
} from "./engineeringExecution.js";

import {
    executeLogistics
} from "./logisticsExecution.js";

import {
    executePlanning
} from "./planningExecution.js";

import {
    executeProcurement
} from "./procurementExecution.js";

import {
    executeQuality
} from "./qualityExecution.js";


export function executeAction(
    action,
    runtimeModel
) {

    switch (action.category) {

        case "APPROVAL":

            return executeApproval(
                action,
                runtimeModel
            );


        case "ENGINEERING":

            return executeEngineering(
                action,
                runtimeModel
            );


        case "LOGISTICS":

            return executeLogistics(
                action,
                runtimeModel
            );


        case "PLANNING":

            return executePlanning(
                action,
                runtimeModel
            );


        case "PROCUREMENT":

            return executeProcurement(
                action,
                runtimeModel
            );


        case "QUALITY":

            return executeQuality(
                action,
                runtimeModel
            );


        default:
            return null;
    }
}