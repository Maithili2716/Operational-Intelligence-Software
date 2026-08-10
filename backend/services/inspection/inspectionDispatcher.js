import { inspectResource } from "./resourceInspection.js";
import { inspectSchedule } from "./scheduleInspection.js";
import { inspectQuality } from "./qualityInspection.js";
import { inspectDependency } from "./dependencyInspection.js";
import { inspectOperational } from "./operationalInspection.js";
import { inspectCompliance } from "./complianceInspection.js";


export function inspectAttention(attention, runtimeModel) {

    switch (attention.category) {

        case "RESOURCE":
            return inspectResource(
                attention,
                runtimeModel
            );


        case "SCHEDULE":
            return inspectSchedule(
                attention,
                runtimeModel
            );


        case "QUALITY":
            return inspectQuality(
                attention,
                runtimeModel
            );


        case "DEPENDENCY":
            return inspectDependency(
                attention,
                runtimeModel
            );


        case "OPERATIONAL":
            return inspectOperational(
                attention,
                runtimeModel
            );


        case "COMPLIANCE":
            return inspectCompliance(
                attention,
                runtimeModel
            );


        default:
            return null;
    }
}