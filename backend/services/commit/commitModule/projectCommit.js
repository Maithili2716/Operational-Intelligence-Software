// =========================================
// Project Commit
// =========================================

import ProjectRepository
    from "../../../modules/projects/projectRepository.js";


export async function commitProject(update) {

    if (!update) {

        throw new Error(
            "Project update is required."
        );

    }


    if (update.entityType !== "PROJECT") {

        throw new Error(
            `Invalid entity type for project commit: ${update.entityType}`
        );

    }


    const id =
        Number(
            update.entityId.split(":")[1]
        );


    if (!Number.isInteger(id)) {

        throw new Error(
            `Invalid project entity ID: ${update.entityId}`
        );

    }


    const project =
        await ProjectRepository.findById(id);


    if (!project) {

        throw new Error(
            `Project not found: ${update.entityId}`
        );

    }


    // =====================================
    // GET CURRENT DATABASE VALUE
    // =====================================

    let databaseValue;


    switch (update.field) {

        case "name":

            databaseValue =
                project.name;

            break;


        case "departmentId":

            databaseValue =
                project.department_id;

            break;


        case "supplierId":

            databaseValue =
                project.supplier_id;

            break;


        case "currentPhase":

            databaseValue =
                project.current_phase;

            break;


        case "progress":

            databaseValue =
                project.progress;

            break;


        case "status":

            databaseValue =
                project.status;

            break;


        case "dueDate":

            databaseValue =
                project.due_date;

            break;


        case "estimatedCompletionDate":

            databaseValue =
                project.estimated_completion_date;

            break;


        default:

            throw new Error(
                `Unsupported project commit field: ${update.field}`
            );
    }


    // =====================================
    // CONCURRENCY CHECK
    // =====================================

    const numericFields = [
        "departmentId",
        "supplierId",
        "progress"
    ];

    let matches;

if (numericFields.includes(update.field)) {

    matches =
        Number(databaseValue) ===
        Number(update.currentValue);

}
else if (
    update.field === "dueDate" ||
    update.field === "estimatedCompletionDate"
) {

    const databaseTime =
        databaseValue
            ? new Date(databaseValue).getTime()
            : null;

    const currentTime =
        update.currentValue
            ? new Date(update.currentValue).getTime()
            : null;

    matches =
        databaseTime === currentTime;

}
else {

    matches =
        String(databaseValue ?? "") ===
        String(update.currentValue ?? "");

}


    // =====================================
    // PRESERVE EXISTING VALUES
    // =====================================

    const data = {

        name:
            project.name,

        departmentId:
            project.department_id,

        supplierId:
            project.supplier_id,

        currentPhase:
            project.current_phase,

        progress:
            project.progress,

        status:
            project.status,

        dueDate:
            project.due_date,

        estimatedCompletionDate:
            project.estimated_completion_date

    };


    // =====================================
    // APPLY REQUESTED CHANGE
    // =====================================

    switch (update.field) {

        case "name":

            data.name =
                update.requiredValue;

            break;


        case "departmentId":

            data.departmentId =
                update.requiredValue;

            break;


        case "supplierId":

            data.supplierId =
                update.requiredValue;

            break;


        case "currentPhase":

            data.currentPhase =
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


    // =====================================
    // UPDATE DATABASE
    // =====================================

    const updatedProject =
        await ProjectRepository.update(
            id,
            data
        );


    // =====================================
    // RETURN COMMIT RESULT
    // =====================================

    let newValue;


    switch (update.field) {

        case "name":

            newValue =
                updatedProject.name;

            break;


        case "departmentId":

            newValue =
                updatedProject.department_id;

            break;


        case "supplierId":

            newValue =
                updatedProject.supplier_id;

            break;


        case "currentPhase":

            newValue =
                updatedProject.current_phase;

            break;


        case "progress":

            newValue =
                updatedProject.progress;

            break;


        case "status":

            newValue =
                updatedProject.status;

            break;


        case "dueDate":

            newValue =
                updatedProject.due_date;

            break;


        case "estimatedCompletionDate":

            newValue =
                updatedProject.estimated_completion_date;

            break;

    }


    return {

        entityType:
            "PROJECT",

        entityId:
            update.entityId,

        field:
            update.field,

        previousValue:
            databaseValue,

        newValue,

        entity:
            updatedProject

    };
}