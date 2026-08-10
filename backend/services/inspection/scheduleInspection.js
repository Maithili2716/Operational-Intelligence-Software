import formatDate from "../../utils/formatDate.js";

export function inspectSchedule(attention, runtime) {

    switch (attention.title) {

        case "Deadline Missed":
            return inspectExplicitDeadline(
                attention,
                runtime
            );

        case "Pending Too Long":
            return inspectPendingTooLong(
                attention,
                runtime
            );

        case "No Progress":
            return inspectNoProgress(
                attention,
                runtime
            );

        case "Impossible Schedule":
            return inspectImpossibleSchedule(
                attention,
                runtime
            );

        default:
            return null;
    }
}


/*
=====================================================
DEADLINE MISSED
=====================================================
*/

function inspectExplicitDeadline(
    attention,
    runtime
) {

    const state =
        runtime.state.get(attention.entityId);

    if (!state)
        return null;

    const schedule =
        state.schedule;

    if (!schedule)
        return null;

    const dueDate =
        schedule.dueDate;

    const estimatedCompletionDate =
        schedule.estimatedCompletionDate;

    if (!dueDate)
        return null;

    const now =
        new Date();

    if (new Date(dueDate) >= now)
        return null;


    /*
     * The runtime already contains an estimated
     * completion date.
     *
     * We use that as the proposed revised deadline
     * instead of inventing a new date.
     */

    if (!estimatedCompletionDate)
        return null;

    const revisedDeadline =
        formatDate(
            estimatedCompletionDate
        );


    return {

        entityType:
            attention.entityType,

        entityId:
            attention.entityId,


        rootCauseAnalysis: {

            summary:
                `${attention.entityType} has passed its planned deadline without completion.`,

            cause:
                `The planned deadline was ${formatDate(dueDate)}, but the entity has not completed.`,

            confidence:
                "HIGH"
        },


        affectedEntities:
            findAffectedEntities(
                attention.entityId,
                runtime
            ),


        mitigationStrategy: {

            summary:
                `Propose ${revisedDeadline} as the revised deadline based on the current estimated completion date. Approval is required before applying the change.`,

            updates: [

                {
                    entityType:
                        attention.entityType,

                    entityId:
                        attention.entityId,

                    field:
                        "dueDate",

                    currentValue:
                        formatDate(dueDate),

                    requiredValue:
                        revisedDeadline,

                    steps: [
                        "Review the missed deadline.",
                        "Review the current estimated completion date.",
                        "Confirm that the estimated completion date is achievable.",
                        "Obtain approval for the revised deadline.",
                        `Update the deadline to ${revisedDeadline}.`,
                        "Verify that the revised schedule is reflected in the runtime."
                    ]
                }

            ],

            manualActions: [

                {
                    type:
                        "APPROVE_REVISED_DEADLINE",

                    entityType:
                        attention.entityType,

                    entityId:
                        attention.entityId,

                    description:
                        `Review and approve the proposed revised deadline of ${revisedDeadline}.`
                }

            ]
        }
    };
}


/*
=====================================================
PENDING TOO LONG
=====================================================
*/

function inspectPendingTooLong(
    attention,
    runtime
) {

    const state =
        runtime.state.get(attention.entityId);

    if (!state)
        return null;

    const schedule =
        state.schedule;

    if (!schedule)
        return null;


    const createdAt =
        schedule.createdAt;

    if (!createdAt)
        return null;


    const createdDate =
        new Date(createdAt);

    const now =
        new Date();


    const ageInDays =
        (now - createdDate) /
        (1000 * 60 * 60 * 24);


    return {

        entityType:
            attention.entityType,

        entityId:
            attention.entityId,


        rootCauseAnalysis: {

            summary:
                "The entity has remained pending for an unusually long period.",

            cause:
                `The entity has remained in its current state for approximately ${Math.floor(ageInDays)} days.`,

            confidence:
                "MEDIUM"
        },


        affectedEntities:
            findAffectedEntities(
                attention.entityId,
                runtime
            ),


        mitigationStrategy: {

            summary:
                "Review the pending work and move the entity into active execution once the required resources and conditions are available.",

            updates: [

                {
                    entityType:
                        attention.entityType,

                    entityId:
                        attention.entityId,

                    field:
                        "status",

                    currentValue:
                        schedule.status,

                    requiredValue:
                        "IN_PROGRESS",

                    steps: [
                        "Review why the entity has remained pending.",
                        "Identify the work preventing progress.",
                        "Assign the required resources or owner.",
                        "Move the entity into active execution.",
                        "Verify that execution has started."
                    ]
                }

            ],

            manualActions: []
        }
    };
}


/*
=====================================================
NO PROGRESS
=====================================================
*/

function inspectNoProgress(
    attention,
    runtime
) {

    const state =
        runtime.state.get(attention.entityId);

    if (!state)
        return null;

    const schedule =
        state.schedule;

    if (!schedule)
        return null;


    const progress =
        schedule.progress;


    if (progress === undefined)
        return null;


    return {

        entityType:
            attention.entityType,

        entityId:
            attention.entityId,


        rootCauseAnalysis: {

            summary:
                "The entity has not made the expected operational progress.",

            cause:
                `Current progress remains at ${progress}%, indicating that the expected work has not advanced.`,

            confidence:
                "MEDIUM"
        },


        affectedEntities:
            findAffectedEntities(
                attention.entityId,
                runtime
            ),


        mitigationStrategy: {

            summary:
                "Move the entity into active execution and verify that operational progress resumes.",

            updates: [

                {
                    entityType:
                        attention.entityType,

                    entityId:
                        attention.entityId,

                    field:
                        "status",

                    currentValue:
                        schedule.status,

                    requiredValue:
                        "IN_PROGRESS",

                    steps: [
                        "Review the reason for the lack of progress.",
                        "Identify the operational blocker.",
                        "Assign or release the required resources.",
                        "Move the entity into active execution.",
                        "Verify that progress begins increasing."
                    ]
                }

            ],

            manualActions: []
        }
    };
}


/*
=====================================================
IMPOSSIBLE SCHEDULE
=====================================================
*/

function inspectImpossibleSchedule(
    attention,
    runtime
) {

    const state =
        runtime.state.get(attention.entityId);

    if (!state)
        return null;

    const schedule =
        state.schedule;

    if (!schedule)
        return null;


    const dueDate =
        schedule.dueDate;

    const estimatedCompletionDate =
        schedule.estimatedCompletionDate;


    if (
        !dueDate ||
        !estimatedCompletionDate
    ) {
        return null;
    }


    if (
        new Date(estimatedCompletionDate) <=
        new Date(dueDate)
    ) {
        return null;
    }


    const revisedDeadline =
        formatDate(
            estimatedCompletionDate
        );


    return {

        entityType:
            attention.entityType,

        entityId:
            attention.entityId,


        rootCauseAnalysis: {

            summary:
                "The estimated completion date falls after the planned deadline.",

            cause:
                `The current estimated completion date (${formatDate(estimatedCompletionDate)}) exceeds the planned deadline (${formatDate(dueDate)}).`,

            confidence:
                "HIGH"
        },


        affectedEntities:
            findAffectedEntities(
                attention.entityId,
                runtime
            ),


        mitigationStrategy: {

            summary:
                `Propose ${revisedDeadline} as the revised deadline based on the current completion estimate. Approval is required before applying the change.`,

            updates: [

                {
                    entityType:
                        attention.entityType,

                    entityId:
                        attention.entityId,

                    field:
                        "dueDate",

                    currentValue:
                        formatDate(dueDate),

                    requiredValue:
                        revisedDeadline,

                    steps: [
                        "Review the current schedule.",
                        "Review the estimated completion date.",
                        "Confirm that the estimated completion date is achievable.",
                        "Obtain approval for the revised deadline.",
                        `Update the deadline to ${revisedDeadline}.`,
                        "Verify that the revised schedule is feasible."
                    ]
                }

            ],

            manualActions: [

                {
                    type:
                        "APPROVE_REVISED_DEADLINE",

                    entityType:
                        attention.entityType,

                    entityId:
                        attention.entityId,

                    description:
                        `Review and approve the proposed revised deadline of ${revisedDeadline}.`
                }

            ]
        }
    };
}


/*
=====================================================
AFFECTED ENTITIES
=====================================================
*/

function findAffectedEntities(
    entityId,
    runtime
) {

    const affectedEntities = [];

    const edges =
        runtime.graph.getAllEdges();


    for (const edge of edges) {

        let affectedId = null;


        if (edge.from === entityId) {

            affectedId =
                edge.to;

        } else if (edge.to === entityId) {

            affectedId =
                edge.from;
        }


        if (!affectedId)
            continue;


        if (affectedId === entityId)
            continue;


        const node =
            runtime.graph.findNode(
                affectedId
            );


        if (!node)
            continue;


        affectedEntities.push({

            entityType:
                node.type,

            entityId:
                node.id,

            reason:
                `${node.type} is connected to ${entityId} and may be affected by its schedule.`
        });
    }


    return affectedEntities;
}