// =========================================
// Material Commit
// =========================================

import MaterialRepository
    from "../../../modules/material/materialRepository.js";


export async function commitMaterial(update) {

    if (!update) {

        throw new Error(
            "Material update is required."
        );

    }


    if (update.entityType !== "MATERIAL") {

        throw new Error(
            `Invalid entity type for material commit: ${update.entityType}`
        );

    }


    const id =
        Number(
            update.entityId.split(":")[1]
        );


    if (!Number.isInteger(id)) {

        throw new Error(
            `Invalid material entity ID: ${update.entityId}`
        );

    }


    const material =
        await MaterialRepository.findById(id);


    if (!material) {

        throw new Error(
            `Material not found: ${update.entityId}`
        );

    }


    // =====================================
    // MATERIAL CODE
    // =====================================

    if (update.field === "materialCode") {

        if (
            material.material_code !==
            update.currentValue
        ) {

            throw new Error(
                `Material ${id} changed before commit. ` +
                `Expected materialCode "${update.currentValue}" ` +
                `but found "${material.material_code}".`
            );

        }


        const updatedMaterial =
            await MaterialRepository.update(
                id,
                {

                    materialCode:
                        update.requiredValue,

                    name:
                        material.name,

                    description:
                        material.description,

                    unit:
                        material.unit

                }
            );


        return {

            entityType:
                "MATERIAL",

            entityId:
                update.entityId,

            field:
                "materialCode",

            previousValue:
                material.material_code,

            newValue:
                updatedMaterial.material_code,

            entity:
                updatedMaterial

        };

    }


    // =====================================
    // NAME
    // =====================================

    if (update.field === "name") {

        if (
            material.name !==
            update.currentValue
        ) {

            throw new Error(
                `Material ${id} changed before commit. ` +
                `Expected name "${update.currentValue}" ` +
                `but found "${material.name}".`
            );

        }


        const updatedMaterial =
            await MaterialRepository.update(
                id,
                {

                    materialCode:
                        material.material_code,

                    name:
                        update.requiredValue,

                    description:
                        material.description,

                    unit:
                        material.unit

                }
            );


        return {

            entityType:
                "MATERIAL",

            entityId:
                update.entityId,

            field:
                "name",

            previousValue:
                material.name,

            newValue:
                updatedMaterial.name,

            entity:
                updatedMaterial

        };

    }


    // =====================================
    // DESCRIPTION
    // =====================================

    if (update.field === "description") {

        if (
            material.description !==
            update.currentValue
        ) {

            throw new Error(
                `Material ${id} changed before commit. ` +
                `Expected description "${update.currentValue}" ` +
                `but found "${material.description}".`
            );

        }


        const updatedMaterial =
            await MaterialRepository.update(
                id,
                {

                    materialCode:
                        material.material_code,

                    name:
                        material.name,

                    description:
                        update.requiredValue,

                    unit:
                        material.unit

                }
            );


        return {

            entityType:
                "MATERIAL",

            entityId:
                update.entityId,

            field:
                "description",

            previousValue:
                material.description,

            newValue:
                updatedMaterial.description,

            entity:
                updatedMaterial

        };

    }


    // =====================================
    // UNIT
    // =====================================

    if (update.field === "unit") {

        if (
            material.unit !==
            update.currentValue
        ) {

            throw new Error(
                `Material ${id} changed before commit. ` +
                `Expected unit "${update.currentValue}" ` +
                `but found "${material.unit}".`
            );

        }


        const updatedMaterial =
            await MaterialRepository.update(
                id,
                {

                    materialCode:
                        material.material_code,

                    name:
                        material.name,

                    description:
                        material.description,

                    unit:
                        update.requiredValue

                }
            );


        return {

            entityType:
                "MATERIAL",

            entityId:
                update.entityId,

            field:
                "unit",

            previousValue:
                material.unit,

            newValue:
                updatedMaterial.unit,

            entity:
                updatedMaterial

        };

    }


    // =====================================
    // UNSUPPORTED FIELD
    // =====================================

    throw new Error(
        `Unsupported material commit field: ${update.field}`
    );
}