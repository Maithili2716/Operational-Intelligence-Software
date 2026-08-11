// =========================================
// Shipment Commit
// =========================================

import ShipmentRepository
    from "../../../modules/shipment/shipmentRepository.js";


export async function commitShipment(update) {

    if (!update) {

        throw new Error(
            "Shipment update is required."
        );

    }


    if (update.entityType !== "SHIPMENT") {

        throw new Error(
            `Invalid entity type for shipment commit: ${update.entityType}`
        );

    }


    const id =
        Number(
            update.entityId.split(":")[1]
        );


    if (!Number.isInteger(id)) {

        throw new Error(
            `Invalid shipment entity ID: ${update.entityId}`
        );

    }


    const shipment =
        await ShipmentRepository.findById(id);


    if (!shipment) {

        throw new Error(
            `Shipment not found: ${update.entityId}`
        );

    }


    // =====================================
    // GET CURRENT DATABASE VALUE
    // =====================================

    let databaseValue;


    switch (update.field) {

        case "trackingNumber":

            databaseValue =
                shipment.tracking_number;

            break;


        case "expectedDelivery":

            databaseValue =
                shipment.expected_delivery;

            break;


        case "status":

            databaseValue =
                shipment.status;

            break;


        default:

            throw new Error(
                `Unsupported shipment commit field: ${update.field}`
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
            `Shipment ${id} changed before commit. ` +
            `Expected ${update.field} "${update.currentValue}" ` +
            `but found "${databaseValue}".`
        );

    }


    // =====================================
    // PRESERVE EXISTING VALUES
    // =====================================

    const data = {

        trackingNumber:
            shipment.tracking_number,

        expectedDelivery:
            shipment.expected_delivery,

        status:
            shipment.status

    };


    // =====================================
    // APPLY REQUESTED CHANGE
    // =====================================

    switch (update.field) {

        case "trackingNumber":

            data.trackingNumber =
                update.requiredValue;

            break;


        case "expectedDelivery":

            data.expectedDelivery =
                update.requiredValue;

            break;


        case "status":

            data.status =
                update.requiredValue;

            break;

    }


    // =====================================
    // UPDATE DATABASE
    // =====================================

    const updatedShipment =
        await ShipmentRepository.update(
            id,
            data
        );


    // =====================================
    // RETURN COMMIT RESULT
    // =====================================

    let newValue;


    switch (update.field) {

        case "trackingNumber":

            newValue =
                updatedShipment.tracking_number;

            break;


        case "expectedDelivery":

            newValue =
                updatedShipment.expected_delivery;

            break;


        case "status":

            newValue =
                updatedShipment.status;

            break;

    }


    return {

        entityType:
            "SHIPMENT",

        entityId:
            update.entityId,

        field:
            update.field,

        previousValue:
            databaseValue,

        newValue,

        entity:
            updatedShipment

    };
}