// =========================================
// Supplier Quote Commit
// =========================================

import SupplierQuoteRepository
    from "../../../modules/supplierQuote/supplierquoteRepository.js";


export async function commitSupplierQuote(update) {

    if (!update) {

        throw new Error(
            "Supplier quote update is required."
        );

    }


    if (update.entityType !== "SUPPLIER_QUOTE") {

        throw new Error(
            `Invalid entity type for supplier quote commit: ${update.entityType}`
        );

    }


    const id =
        Number(
            update.entityId.split(":")[1]
        );


    if (!Number.isInteger(id)) {

        throw new Error(
            `Invalid supplier quote entity ID: ${update.entityId}`
        );

    }


    const quote =
        await SupplierQuoteRepository.findById(id);


    if (!quote) {

        throw new Error(
            `Supplier quote not found: ${update.entityId}`
        );

    }


    // =====================================
    // GET CURRENT DATABASE VALUE
    // =====================================

    let databaseValue;


    switch (update.field) {

        case "price":

            databaseValue =
                quote.price;

            break;


        case "validUntil":

            databaseValue =
                quote.valid_until;

            break;


        case "status":

            databaseValue =
                quote.status;

            break;


        default:

            throw new Error(
                `Unsupported supplier quote commit field: ${update.field}`
            );
    }


    // =====================================
    // CONCURRENCY CHECK
    // =====================================

    const numericFields = [
        "price"
    ];


    const matches =
        numericFields.includes(update.field)

            ? Number(databaseValue) ===
              Number(update.currentValue)

            : String(databaseValue ?? "") ===
              String(update.currentValue ?? "");


    if (!matches) {

        throw new Error(
            `Supplier quote ${id} changed before commit. ` +
            `Expected ${update.field} "${update.currentValue}" ` +
            `but found "${databaseValue}".`
        );

    }


    // =====================================
    // PRESERVE EXISTING VALUES
    // =====================================

    const data = {

        price:
            quote.price,

        validUntil:
            quote.valid_until,

        status:
            quote.status

    };


    // =====================================
    // APPLY REQUESTED CHANGE
    // =====================================

    switch (update.field) {

        case "price":

            data.price =
                update.requiredValue;

            break;


        case "validUntil":

            data.validUntil =
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

    const updatedQuote =
        await SupplierQuoteRepository.update(
            id,
            data
        );


    // =====================================
    // RETURN COMMIT RESULT
    // =====================================

    let newValue;


    switch (update.field) {

        case "price":

            newValue =
                updatedQuote.price;

            break;


        case "validUntil":

            newValue =
                updatedQuote.valid_until;

            break;


        case "status":

            newValue =
                updatedQuote.status;

            break;

    }


    return {

        entityType:
            "SUPPLIER_QUOTE",

        entityId:
            update.entityId,

        field:
            update.field,

        previousValue:
            databaseValue,

        newValue,

        entity:
            updatedQuote

    };
}