// =========================================
// Commit Dispatcher
// Routes runtime updates to entity commit
// handlers.
// =========================================

import {
    commitDepartment
} from "./commitModule/departmentCommit.js";

import {
    commitSupplier
} from "./commitModule/supplierCommit.js";

import {
    commitMaterial
} from "./commitModule/materialCommit.js";


import {
    commitProject
} from "./commitModule/projectCommit.js";

import {
    commitMilestone
} from "./commitModule/milestoneCommit.js";

import {
    commitBOM
} from "./commitModule/BOMCommit.js";

import {
    commitInventory
} from "./commitModule/InventoryCommit.js";

import {
    commitProcurement
} from "./commitModule/procurementCommit.js";

import {
    commitPurchaseOrder
} from "./commitModule/purchaseOrder.js";

import {
    commitSupplierQuote
} from "./commitModule/supplierQuote.js";

import {
    commitShipment
} from "./commitModule/shipmentCommit.js";

import {
    commitQualityInspection
} from "./commitModule/qualityInspectionCommit.js";

import {
    commitWorkOrder
} from "./commitModule/workOrder.js";


// =========================================
// Dispatcher
// =========================================

export async function dispatchCommit(
    update
) {

    switch (update.entityType) {

        // =====================================
        // DEPARTMENT
        // =====================================

        case "DEPARTMENT":

            return commitDepartment(
                update
            );


        // =====================================
        // SUPPLIER
        // =====================================

        case "SUPPLIER":

            return commitSupplier(
                update
            );


        // =====================================
        // MATERIAL
        // =====================================

        case "MATERIAL":

            return commitMaterial(
                update
            );


        // =====================================
        // WAREHOUSE
        // =====================================

        case "WAREHOUSE":

            return commitWarehouse(
                update
            );


        // =====================================
        // PROJECT
        // =====================================

        case "PROJECT":

            return commitProject(
                update
            );


        // =====================================
        // MILESTONE
        // =====================================

        case "MILESTONE":

            return commitMilestone(
                update
            );


        // =====================================
        // BOM
        // =====================================

        case "BOM":

            return commitBOM(
                update
            );


        // =====================================
        // INVENTORY
        // =====================================

        case "INVENTORY":

            return commitInventory(
                update
            );


        // =====================================
        // PROCUREMENT
        // =====================================

        case "PROCUREMENT":

            return commitProcurement(
                update
            );


        // =====================================
        // PURCHASE ORDER
        // =====================================

        case "PURCHASE_ORDER":

            return commitPurchaseOrder(
                update
            );


        // =====================================
        // SUPPLIER QUOTE
        // =====================================

        case "SUPPLIER_QUOTE":

            return commitSupplierQuote(
                update
            );


        // =====================================
        // SHIPMENT
        // =====================================

        case "SHIPMENT":

            return commitShipment(
                update
            );


        // =====================================
        // QUALITY INSPECTION
        // =====================================

        case "QUALITY_INSPECTION":

            return commitQualityInspection(
                update
            );


        // =====================================
        // WORK ORDER
        // =====================================

        case "WORK_ORDER":

            return commitWorkOrder(
                update
            );


        // =====================================
        // UNKNOWN ENTITY
        // =====================================

        default:

            throw new Error(
                `Unsupported commit entity type: ${update.entityType}`
            );
    }
}