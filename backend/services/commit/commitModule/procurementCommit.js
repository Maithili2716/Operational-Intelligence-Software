// =========================================
// Procurement Commit
// =========================================

import ProcurementRepository
    from "../../../modules/procurement/procurementRepository.js";


export async function commitProcurement(update) {

    if (!update) {

        throw new Error(
            "Procurement update is required."
        );

    }


    if (update.entityType !== "PROCUREMENT") {

        throw new Error(
            `Invalid entity type for procurement commit: ${update.entityType}`
        );

    }


    const id =
        Number(
            update.entityId.split(":")[1]
        );


    if (!Number.isInteger(id)) {

        throw new Error(
            `Invalid procurement entity ID: ${update.entityId}`
        );

    }


    const procurement =
        await ProcurementRepository.findById(id);


    if (!procurement) {

        throw new Error(
            `Procurement not found: ${update.entityId}`
        );

    }


    // =====================================
    // GET CURRENT DATABASE VALUE
    // =====================================

    let databaseValue;


    switch (update.field) {

        case "status":

            databaseValue =
                procurement.status;

            break;


        case "expectedDelivery":

            databaseValue =
                procurement.expected_delivery;

            break;


        default:

            throw new Error(
                `Unsupported procurement commit field: ${update.field}`
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
            `Procurement ${id} changed before commit. ` +
            `Expected ${update.field} "${update.currentValue}" ` +
            `but found "${databaseValue}".`
        );

    }


    // =====================================
    // PRESERVE EXISTING VALUES
    // =====================================

    const data = {

        status:
            procurement.status,

        expectedDelivery:
            procurement.expected_delivery

    };


    // =====================================
    // APPLY REQUESTED CHANGE
    // =====================================

    switch (update.field) {

        case "status":

            data.status =
                update.requiredValue;

            break;


        case "expectedDelivery":

            data.expectedDelivery =
                update.requiredValue;

            break;

    }


    // =====================================
    // UPDATE DATABASE
    // =====================================

    const updatedProcurement =
        await ProcurementRepository.update(
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
                updatedProcurement.status;

            break;


        case "expectedDelivery":

            newValue =
                updatedProcurement.expected_delivery;

            break;

    }


    return {

        entityType:
            "PROCUREMENT",

        entityId:
            update.entityId,

        field:
            update.field,

        previousValue:
            databaseValue,

        newValue,

        entity:
            updatedProcurement

    };
}