// =========================================
// Department Commit
// =========================================

import DepartmentRepository
    from "../../../modules/department/departmentRepository.js";


export async function commitDepartment(update) {

    if (!update) {

        throw new Error(
            "Department update is required."
        );

    }


    if (update.entityType !== "DEPARTMENT") {

        throw new Error(
            `Invalid entity type for department commit: ${update.entityType}`
        );

    }


    const id =
        Number(
            update.entityId.split(":")[1]
        );


    if (!Number.isInteger(id)) {

        throw new Error(
            `Invalid department entity ID: ${update.entityId}`
        );

    }


    const department =
        await DepartmentRepository.findById(id);


    if (!department) {

        throw new Error(
            `Department not found: ${update.entityId}`
        );

    }


    /*
     * Department currently has no
     * operational update generated
     * by the Action / Inspection engines.
     *
     * Do not invent a state transition.
     */

    throw new Error(
        `Unsupported department commit field: ${update.field}`
    );
}