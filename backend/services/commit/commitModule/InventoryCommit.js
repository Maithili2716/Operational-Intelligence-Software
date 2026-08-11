// =========================================
// Inventory Commit
// =========================================

import InventoryRepository
    from "../../../modules/inventory/inventoryRepository.js";


export async function commitInventory(update) {

    if (!update) {

        throw new Error(
            "Inventory update is required."
        );

    }


    if (update.entityType !== "INVENTORY") {

        throw new Error(
            `Invalid entity type for inventory commit: ${update.entityType}`
        );

    }


    const id =
        Number(
            update.entityId.split(":")[1]
        );


    if (!Number.isInteger(id)) {

        throw new Error(
            `Invalid inventory entity ID: ${update.entityId}`
        );

    }


    const inventory =
        await InventoryRepository.findById(id);


    if (!inventory) {

        throw new Error(
            `Inventory not found: ${update.entityId}`
        );

    }


    // =====================================
    // AVAILABLE
    // =====================================

    if (update.field === "available") {

        if (
            Number(inventory.available) !==
            Number(update.currentValue)
        ) {

            throw new Error(
                `Inventory ${id} changed before commit. ` +
                `Expected available "${update.currentValue}" ` +
                `but found "${inventory.available}".`
            );

        }


        const updatedInventory =
            await InventoryRepository.update(
                id,
                {

                    available:
                        update.requiredValue,

                    reserved:
                        inventory.reserved,

                    required:
                        inventory.required

                }
            );


        return {

            entityType:
                "INVENTORY",

            entityId:
                update.entityId,

            field:
                "available",

            previousValue:
                inventory.available,

            newValue:
                updatedInventory.available,

            entity:
                updatedInventory

        };

    }


    // =====================================
    // RESERVED
    // =====================================

    if (update.field === "reserved") {

        if (
            Number(inventory.reserved) !==
            Number(update.currentValue)
        ) {

            throw new Error(
                `Inventory ${id} changed before commit. ` +
                `Expected reserved "${update.currentValue}" ` +
                `but found "${inventory.reserved}".`
            );

        }


        const updatedInventory =
            await InventoryRepository.update(
                id,
                {

                    available:
                        inventory.available,

                    reserved:
                        update.requiredValue,

                    required:
                        inventory.required

                }
            );


        return {

            entityType:
                "INVENTORY",

            entityId:
                update.entityId,

            field:
                "reserved",

            previousValue:
                inventory.reserved,

            newValue:
                updatedInventory.reserved,

            entity:
                updatedInventory

        };

    }


    // =====================================
    // REQUIRED
    // =====================================

    if (update.field === "required") {

        if (
            Number(inventory.required) !==
            Number(update.currentValue)
        ) {

            throw new Error(
                `Inventory ${id} changed before commit. ` +
                `Expected required "${update.currentValue}" ` +
                `but found "${inventory.required}".`
            );

        }


        const updatedInventory =
            await InventoryRepository.update(
                id,
                {

                    available:
                        inventory.available,

                    reserved:
                        inventory.reserved,

                    required:
                        update.requiredValue

                }
            );


        return {

            entityType:
                "INVENTORY",

            entityId:
                update.entityId,

            field:
                "required",

            previousValue:
                inventory.required,

            newValue:
                updatedInventory.required,

            entity:
                updatedInventory

        };

    }


    // =====================================
    // UNSUPPORTED FIELD
    // =====================================

    throw new Error(
        `Unsupported inventory commit field: ${update.field}`
    );
}