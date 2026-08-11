// =========================================
// Milestone Commit
// =========================================

import MilestoneRepository
    from "../../../modules/milestone/milestoneRepository.js";


export async function commitMilestone(update) {

    if (!update) {

        throw new Error(
            "Milestone update is required."
        );

    }


    if (update.entityType !== "MILESTONE") {

        throw new Error(
            `Invalid entity type for milestone commit: ${update.entityType}`
        );

    }


    const id =
        Number(
            update.entityId.split(":")[1]
        );


    if (!Number.isInteger(id)) {

        throw new Error(
            `Invalid milestone entity ID: ${update.entityId}`
        );

    }


    const milestone =
        await MilestoneRepository.findById(id);


    if (!milestone) {

        throw new Error(
            `Milestone not found: ${update.entityId}`
        );

    }


    // =====================================
    // VALIDATE CURRENT VALUE
    // =====================================

    let databaseValue;


    switch (update.field) {

        case "name":
            databaseValue =
                milestone.name;
            break;

        case "progress":
            databaseValue =
                milestone.progress;
            break;

        case "status":
            databaseValue =
                milestone.status;
            break;

        case "dueDate":
            databaseValue =
                milestone.due_date;
            break;

        case "estimatedCompletionDate":
            databaseValue =
                milestone.estimated_completion_date;
            break;

        default:

            throw new Error(
                `Unsupported milestone commit field: ${update.field}`
            );
    }


    /*
     * Numeric fields need numeric comparison.
     */

    const matches =
        ["progress"].includes(update.field)
            ? Number(databaseValue) ===
              Number(update.currentValue)

            : String(databaseValue ?? "") ===
              String(update.currentValue ?? "");


    if (!matches) {

        throw new Error(
            `Milestone ${id} changed before commit. ` +
            `Expected ${update.field} "${update.currentValue}" ` +
            `but found "${databaseValue}".`
        );

    }


    // =====================================
    // BUILD FULL UPDATE
    // =====================================

    const data = {

        name:
            milestone.name,

        progress:
            milestone.progress,

        status:
            milestone.status,

        dueDate:
            milestone.due_date,

        estimatedCompletionDate:
            milestone.estimated_completion_date

    };


    // =====================================
    // APPLY REQUESTED CHANGE
    // =====================================

    switch (update.field) {

        case "name":

            data.name =
                update.requiredValue;

            break;


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


    const updatedMilestone =
        await MilestoneRepository.update(
            id,
            data
        );


    return {

        entityType:
            "MILESTONE",

        entityId:
            update.entityId,

        field:
            update.field,

        previousValue:
            databaseValue,

        newValue:
            updatedMilestone[
                update.field === "dueDate"
                    ? "due_date"
                    : update.field ===
                      "estimatedCompletionDate"
                        ? "estimated_completion_date"
                        : update.field
            ],

        entity:
            updatedMilestone

    };
}