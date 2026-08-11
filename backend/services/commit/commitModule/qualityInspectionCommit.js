// =========================================
// Quality Inspection Commit
// =========================================

import QualityInspectionRepository
    from "../../../modules/quality/qualityinspectionRepository.js";


export async function commitQualityInspection(update) {

    if (!update) {

        throw new Error(
            "Quality inspection update is required."
        );

    }


    if (update.entityType !== "QUALITY_INSPECTION") {

        throw new Error(
            `Invalid entity type for quality inspection commit: ${update.entityType}`
        );

    }


    const id =
        Number(
            update.entityId.split(":")[1]
        );


    if (!Number.isInteger(id)) {

        throw new Error(
            `Invalid quality inspection entity ID: ${update.entityId}`
        );

    }


    const inspection =
        await QualityInspectionRepository.findById(id);


    if (!inspection) {

        throw new Error(
            `Quality inspection not found: ${update.entityId}`
        );

    }


    // =====================================
    // GET CURRENT DATABASE VALUE
    // =====================================

    let databaseValue;


    switch (update.field) {

        case "status":

            databaseValue =
                inspection.status;

            break;


        case "goodPieces":

            databaseValue =
                inspection.good_pieces;

            break;


        case "faultyPieces":

            databaseValue =
                inspection.faulty_pieces;

            break;


        case "notificationStatus":

            databaseValue =
                inspection.notification_status;

            break;


        case "inventoryUpdateStatus":

            databaseValue =
                inspection.inventory_update_status;

            break;


        default:

            throw new Error(
                `Unsupported quality inspection commit field: ${update.field}`
            );
    }


    // =====================================
    // CONCURRENCY CHECK
    // =====================================

    const numericFields = [
        "goodPieces",
        "faultyPieces"
    ];


    const matches =
        numericFields.includes(update.field)

            ? Number(databaseValue) ===
              Number(update.currentValue)

            : String(databaseValue ?? "") ===
              String(update.currentValue ?? "");


    if (!matches) {

        throw new Error(
            `Quality inspection ${id} changed before commit. ` +
            `Expected ${update.field} "${update.currentValue}" ` +
            `but found "${databaseValue}".`
        );

    }


    // =====================================
    // PRESERVE EXISTING VALUES
    // =====================================

    const data = {

        status:
            inspection.status,

        goodPieces:
            inspection.good_pieces,

        faultyPieces:
            inspection.faulty_pieces,

        notificationStatus:
            inspection.notification_status,

        inventoryUpdateStatus:
            inspection.inventory_update_status

    };


    // =====================================
    // APPLY REQUESTED CHANGE
    // =====================================

    switch (update.field) {

        case "status":

            data.status =
                update.requiredValue;

            break;


        case "goodPieces":

            data.goodPieces =
                update.requiredValue;

            break;


        case "faultyPieces":

            data.faultyPieces =
                update.requiredValue;

            break;


        case "notificationStatus":

            data.notificationStatus =
                update.requiredValue;

            break;


        case "inventoryUpdateStatus":

            data.inventoryUpdateStatus =
                update.requiredValue;

            break;

    }


    // =====================================
    // UPDATE DATABASE
    // =====================================

    const updatedInspection =
        await QualityInspectionRepository.update(
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
                updatedInspection.status;

            break;


        case "goodPieces":

            newValue =
                updatedInspection.good_pieces;

            break;


        case "faultyPieces":

            newValue =
                updatedInspection.faulty_pieces;

            break;


        case "notificationStatus":

            newValue =
                updatedInspection.notification_status;

            break;


        case "inventoryUpdateStatus":

            newValue =
                updatedInspection.inventory_update_status;

            break;

    }


    return {

        entityType:
            "QUALITY_INSPECTION",

        entityId:
            update.entityId,

        field:
            update.field,

        previousValue:
            databaseValue,

        newValue,

        entity:
            updatedInspection

    };
}