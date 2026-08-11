// =========================================
// Supplier Commit
// =========================================

import SupplierRepository
    from "../../../modules/suppliers/supplierRepository.js";


export async function commitSupplier(update) {

    if (!update) {

        throw new Error(
            "Supplier update is required."
        );

    }


    if (update.entityType !== "SUPPLIER") {

        throw new Error(
            `Invalid entity type for supplier commit: ${update.entityType}`
        );

    }


    const id =
        Number(
            update.entityId.split(":")[1]
        );


    if (!Number.isInteger(id)) {

        throw new Error(
            `Invalid supplier entity ID: ${update.entityId}`
        );

    }


    const supplier =
        await SupplierRepository.findById(id);


    if (!supplier) {

        throw new Error(
            `Supplier not found: ${update.entityId}`
        );

    }


    // =====================================
    // STATUS
    // =====================================

    if (update.field === "status") {

        if (
            String(supplier.status) !==
            String(update.currentValue)
        ) {

            throw new Error(
                `Supplier ${id} changed before commit. ` +
                `Expected status "${update.currentValue}" ` +
                `but found "${supplier.status}".`
            );

        }


        const updatedSupplier =
            await SupplierRepository.update(
                id,
                {
                    name:
                        supplier.name,

                    email:
                        supplier.email,

                    phone:
                        supplier.phone,

                    address:
                        supplier.address,

                    status:
                        update.requiredValue
                }
            );


        return {

            entityType:
                "SUPPLIER",

            entityId:
                update.entityId,

            field:
                "status",

            previousValue:
                supplier.status,

            newValue:
                updatedSupplier.status,

            entity:
                updatedSupplier

        };

    }


    // =====================================
    // UNSUPPORTED FIELD
    // =====================================

    throw new Error(
        `Unsupported supplier commit field: ${update.field}`
    );
}