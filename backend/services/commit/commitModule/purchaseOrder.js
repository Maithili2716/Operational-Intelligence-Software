// =========================================
// Purchase Order Commit
// =========================================

import PurchaseOrderRepository
    from "../../../modules/orders/purchaseordersRepository.js";


export async function commitPurchaseOrder(update) {

    if (!update) {

        throw new Error(
            "Purchase order update is required."
        );

    }


    if (update.entityType !== "PURCHASE_ORDER") {

        throw new Error(
            `Invalid entity type for purchase order commit: ${update.entityType}`
        );

    }


    const id =
        Number(
            update.entityId.split(":")[1]
        );


    if (!Number.isInteger(id)) {

        throw new Error(
            `Invalid purchase order entity ID: ${update.entityId}`
        );

    }


    const purchaseOrder =
        await PurchaseOrderRepository.findById(id);


    if (!purchaseOrder) {

        throw new Error(
            `Purchase order not found: ${update.entityId}`
        );

    }


    // =====================================
    // GET CURRENT DATABASE VALUE
    // =====================================

    let databaseValue;


    switch (update.field) {

        case "status":

            databaseValue =
                purchaseOrder.status;

            break;


        case "dueDate":

            databaseValue =
                purchaseOrder.due_date;

            break;


        case "estimatedCompletionDate":

            databaseValue =
                purchaseOrder.estimated_completion_date;

            break;


        default:

            throw new Error(
                `Unsupported purchase order commit field: ${update.field}`
            );
    }


    // =====================================
    // CONCURRENCY CHECK
    // =====================================

    const matches =
        String(databaseValue ?? "") ===
        String(update.currentValue ?? "");


    if (!matches) {

        throw new Error(
            `Purchase order ${id} changed before commit. ` +
            `Expected ${update.field} "${update.currentValue}" ` +
            `but found "${databaseValue}".`
        );

    }


    // =====================================
    // PRESERVE EXISTING VALUES
    // =====================================

    const data = {

        status:
            purchaseOrder.status,

        dueDate:
            purchaseOrder.due_date,

        estimatedCompletionDate:
            purchaseOrder.estimated_completion_date

    };


    // =====================================
    // APPLY REQUESTED CHANGE
    // =====================================

    switch (update.field) {

        case "status":

            data.status =
                update.requiredValue;

            break;


        case "dueDate":

            data.dueDate =
                update.requiredValue;

            break;


        case "estimatedCompletionDate":

            data.estimatedCompletionDate =
                update.requiredValue;

            break;

    }


    // =====================================
    // UPDATE DATABASE
    // =====================================

    const updatedPurchaseOrder =
        await PurchaseOrderRepository.update(
            id,
            data
        );


    // =====================================
    // RETURN COMMIT RESULT
    // =====================================

    let newValue;


    switch (update.field) {

        case "status":

            newValue =
                updatedPurchaseOrder.status;

            break;


        case "dueDate":

            newValue =
                updatedPurchaseOrder.due_date;

            break;


        case "estimatedCompletionDate":

            newValue =
                updatedPurchaseOrder.estimated_completion_date;

            break;

    }


    return {

        entityType:
            "PURCHASE_ORDER",

        entityId:
            update.entityId,

        field:
            update.field,

        previousValue:
            databaseValue,

        newValue,

        entity:
            updatedPurchaseOrder

    };
}