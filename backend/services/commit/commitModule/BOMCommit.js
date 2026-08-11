// =========================================
// BOM Commit
// =========================================

import BOMRepository
    from "../../../modules/BOM/BOMRepository.js";


export async function commitBOM(update) {

    if (!update) {

        throw new Error(
            "BOM update is required."
        );

    }


    if (update.entityType !== "BOM") {

        throw new Error(
            `Invalid entity type for BOM commit: ${update.entityType}`
        );

    }


    const id =
        Number(
            update.entityId.split(":")[1]
        );


    if (!Number.isInteger(id)) {

        throw new Error(
            `Invalid BOM entity ID: ${update.entityId}`
        );

    }


    const bom =
        await BOMRepository.findById(id);


    if (!bom) {

        throw new Error(
            `BOM not found: ${update.entityId}`
        );

    }


    // =====================================
    // REVISION FLAG
    // =====================================

    if (update.field === "revisionFlag") {

        if (
            bom.revision_flag !==
            update.currentValue
        ) {

            throw new Error(
                `BOM ${id} changed before commit. ` +
                `Expected revisionFlag "${update.currentValue}" ` +
                `but found "${bom.revision_flag}".`
            );

        }


        const updatedBOM =
            await BOMRepository.update(
                id,
                {

                    revisionNo:
                        bom.revision_no,

                    revisionFlag:
                        update.requiredValue,

                    owner:
                        bom.owner,

                    approvedBy:
                        bom.approved_by,

                    approvalStatus:
                        bom.approval_status,

                    mandatoryFieldsComplete:
                        bom.mandatory_fields_complete,

                    status:
                        bom.status,

                    dueDate:
                        bom.due_date,

                    estimatedCompletionDate:
                        bom.estimated_completion_date

                }
            );


        return {

            entityType:
                "BOM",

            entityId:
                update.entityId,

            field:
                "revisionFlag",

            previousValue:
                bom.revision_flag,

            newValue:
                updatedBOM.revision_flag,

            entity:
                updatedBOM

        };

    }


    // =====================================
    // APPROVAL STATUS
    // =====================================

    if (update.field === "approvalStatus") {

        if (
            bom.approval_status !==
            update.currentValue
        ) {

            throw new Error(
                `BOM ${id} changed before commit. ` +
                `Expected approvalStatus "${update.currentValue}" ` +
                `but found "${bom.approval_status}".`
            );

        }


        const updatedBOM =
            await BOMRepository.update(
                id,
                {

                    revisionNo:
                        bom.revision_no,

                    revisionFlag:
                        bom.revision_flag,

                    owner:
                        bom.owner,

                    approvedBy:
                        bom.approved_by,

                    approvalStatus:
                        update.requiredValue,

                    mandatoryFieldsComplete:
                        bom.mandatory_fields_complete,

                    status:
                        bom.status,

                    dueDate:
                        bom.due_date,

                    estimatedCompletionDate:
                        bom.estimated_completion_date

                }
            );


        return {

            entityType:
                "BOM",

            entityId:
                update.entityId,

            field:
                "approvalStatus",

            previousValue:
                bom.approval_status,

            newValue:
                updatedBOM.approval_status,

            entity:
                updatedBOM

        };

    }


    // =====================================
    // UNSUPPORTED FIELD
    // =====================================

    throw new Error(
        `Unsupported BOM commit field: ${update.field}`
    );
}