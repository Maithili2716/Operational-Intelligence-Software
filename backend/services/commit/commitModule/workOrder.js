// =========================================
// Work Order Commit
// =========================================

import WorkOrderRepository
    from "../../../modules/workOrder/workorderRepository.js";


export async function commitWorkOrder(update) {

    if (!update) {

        throw new Error(
            "Work order update is required."
        );

    }


    if (update.entityType !== "WORK_ORDER") {

        throw new Error(
            `Invalid entity type for work order commit: ${update.entityType}`
        );

    }


    const id =
        Number(
            update.entityId.split(":")[1]
        );


    if (!Number.isInteger(id)) {

        throw new Error(
            `Invalid work order entity ID: ${update.entityId}`
        );

    }


    const workOrder =
        await WorkOrderRepository.findById(id);


    if (!workOrder) {

        throw new Error(
            `Work order not found: ${update.entityId}`
        );

    }


    // =====================================
    // GET CURRENT DATABASE VALUE
    // =====================================

    let databaseValue;


    switch (update.field) {

        case "progress":

            databaseValue =
                workOrder.progress;

            break;


        case "status":

            databaseValue =
                workOrder.status;

            break;


        case "dueDate":

            databaseValue =
                workOrder.due_date;

            break;


        case "estimatedCompletionDate":

            databaseValue =
                workOrder.estimated_completion_date;

            break;


        default:

            throw new Error(
                `Unsupported work order commit field: ${update.field}`
            );
    }


    // =====================================
    // CONCURRENCY CHECK
    // =====================================

    const matches =
        update.field === "progress"

            ? Number(databaseValue) ===
              Number(update.currentValue)

            : String(databaseValue ?? "") ===
              String(update.currentValue ?? "");


    if (!matches) {

        throw new Error(
            `Work order ${id} changed before commit. ` +
            `Expected ${update.field} "${update.currentValue}" ` +
            `but found "${databaseValue}".`
        );

    }


    // =====================================
    // PRESERVE EXISTING VALUES
    // =====================================

    const data = {

        progress:
            workOrder.progress,

        status:
            workOrder.status,

        dueDate:
            workOrder.due_date,

        estimatedCompletionDate:
            workOrder.estimated_completion_date

    };


    // =====================================
    // APPLY REQUESTED CHANGE
    // =====================================

    switch (update.field) {

        case "progress":

            data.progress =
                update.requiredValue;

            break;


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

    const updatedWorkOrder =
        await WorkOrderRepository.update(
            id,
            data
        );


    // =====================================
    // RETURN COMMIT RESULT
    // =====================================

    let newValue;


    switch (update.field) {

        case "progress":

            newValue =
                updatedWorkOrder.progress;

            break;


        case "status":

            newValue =
                updatedWorkOrder.status;

            break;


        case "dueDate":

            newValue =
                updatedWorkOrder.due_date;

            break;


        case "estimatedCompletionDate":

            newValue =
                updatedWorkOrder.estimated_completion_date;

            break;

    }


    return {

        entityType:
            "WORK_ORDER",

        entityId:
            update.entityId,

        field:
            update.field,

        previousValue:
            databaseValue,

        newValue,

        entity:
            updatedWorkOrder

    };
}