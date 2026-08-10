import {
    findReachableEntity,
    findReachableEntities
} from "./utils/runtimeGraphHelpers.js";


export function inspectDependency(attention, runtime) {

    switch (attention.title) {

        case "Blocked Dependency":
            return inspectBlockedDependency(
                attention,
                runtime
            );

        case "Missing Dependency":
            return inspectMissingDependency(
                attention,
                runtime
            );

        case "Failed Dependency":
            return inspectFailedDependency(
                attention,
                runtime
            );

        default:
            return null;
    }
}


/*
===========================================================
BLOCKED DEPENDENCY
===========================================================
*/

function inspectBlockedDependency(
    attention,
    runtime
) {

    const dependentEntity =
        runtime.graph.findNode(
            attention.entityId
        );

    if (!dependentEntity)
        return null;


    /*
     * Find the entities that the dependent entity
     * is waiting on.
     */
    const dependencies =
        findReachableEntities(
            attention.entityId,
            getDependencyTypes(
                attention.entityType
            ),
            runtime,
            1
        );


    const affectedEntities =
        findAffectedEntities(
            attention.entityId,
            runtime
        );


    return {

        entityType:
            attention.entityType,

        entityId:
            attention.entityId,


        rootCauseAnalysis: {

            summary:
                `${attention.entityType} is blocked by an unresolved dependency.`,

            cause:
                buildBlockedDependencyCause(
                    attention,
                    runtime
                ),

            confidence:
                "HIGH"
        },


        affectedEntities,


        mitigationStrategy: {

            summary:
                "Resolve the blocking dependency before allowing the dependent operation to proceed.",

            updates: [],

            manualActions:
                dependencies.map(
                    dependency => ({

                        type:
                            "RESOLVE_DEPENDENCY",

                        entityType:
                            dependency.entityType,

                        entityId:
                            dependency.entityId,

                        description:
                            `Resolve the blocking ${dependency.entityType.toLowerCase()} before continuing ${attention.entityType.toLowerCase()} ${attention.entityId}.`
                    })
                )
        }
    };
}


/*
===========================================================
MISSING DEPENDENCY
===========================================================
*/

function inspectMissingDependency(
    attention,
    runtime
) {

    /*
     * The dependency rule has already determined that
     * the dependency does not exist.
     *
     * Therefore there may be no actual runtime node
     * to inspect.
     */

    const dependentEntity =
        runtime.graph.findNode(
            attention.entityId
        );


    if (!dependentEntity)
        return null;


    return {

        entityType:
            attention.entityType,

        entityId:
            attention.entityId,


        rootCauseAnalysis: {

            summary:
                "A required dependency is missing from the operational model.",

            cause:
                `The dependency ${attention.summary ?? "required by this entity"} could not be resolved in the current runtime graph.`,

            confidence:
                "HIGH"
        },


        affectedEntities: [
            {
                entityType:
                    attention.entityType,

                entityId:
                    attention.entityId,

                reason:
                    "The entity cannot proceed because a required dependency is missing."
            }
        ],


        mitigationStrategy: {

            summary:
                "Identify and establish the missing dependency before continuing the dependent operation.",

            updates: [],

            manualActions: [

                {
                    type:
                        "RESOLVE_MISSING_DEPENDENCY",

                    entityType:
                        attention.entityType,

                    entityId:
                        attention.entityId,

                    description:
                        "Identify the missing dependency, create or associate the required operational entity, and verify that the dependency is available."
                }

            ]
        }
    };
}


/*
===========================================================
FAILED DEPENDENCY
===========================================================
*/

function inspectFailedDependency(
    attention,
    runtime
) {

    const dependentEntity =
        runtime.graph.findNode(
            attention.entityId
        );

    if (!dependentEntity)
        return null;


    /*
     * Find the dependency represented by the
     * attention item.
     *
     * The attention engine's summary/title is used
     * only for explanation; the graph is used to
     * determine the actual connected entities.
     */

    const failedDependency =
        findFailedDependency(
            attention,
            runtime
        );


    const affectedEntities =
        findAffectedEntities(
            attention.entityId,
            runtime
        );


    const manualActions = [];


    if (failedDependency) {

        manualActions.push({

            type:
                "RESOLVE_FAILED_DEPENDENCY",

            entityType:
                failedDependency.entityType,

            entityId:
                failedDependency.entityId,

            description:
                `Resolve the failed ${failedDependency.entityType.toLowerCase()} before continuing ${attention.entityType.toLowerCase()} ${attention.entityId}.`
        });
    }


    return {

        entityType:
            attention.entityType,

        entityId:
            attention.entityId,


        rootCauseAnalysis: {

            summary:
                "The dependent entity cannot proceed because one of its dependencies has failed.",

            cause:
                failedDependency
                    ? `${failedDependency.entityType} ${failedDependency.entityId} is in a failed state.`
                    : "A connected dependency is in a failed state.",

            confidence:
                "HIGH"
        },


        affectedEntities,


        mitigationStrategy: {

            summary:
                "Resolve or replace the failed dependency before resuming the dependent operation.",

            updates: [],

            manualActions
        }
    };
}


/*
===========================================================
FIND FAILED DEPENDENCY
===========================================================
*/

function findFailedDependency(
    attention,
    runtime
) {

    const dependencyTypes =
        getDependencyTypes(
            attention.entityType
        );


    const dependencies =
        [];


    for (const type of dependencyTypes) {

        dependencies.push(
            ...findReachableEntities(
                attention.entityId,
                type,
                runtime,
                1
            )
        );
    }


    for (const dependency of dependencies) {

        const state =
            runtime.state.get(
                dependency.entityId
            );


        const status =
            state?.schedule?.status ??
            state?.status;


        if (status === "FAILED") {

            return dependency;
        }
    }


    return null;
}


/*
===========================================================
DEPENDENCY TYPES
===========================================================
*/

function getDependencyTypes(
    entityType
) {

    /*
     * These are intentionally conservative.
     *
     * The graph itself remains the source of truth.
     * These merely determine which directly connected
     * entities should be considered dependencies.
     */

    switch (entityType) {

        case "PROJECT":
            return [
                "MILESTONE",
                "BOM",
                "SUPPLIER",
                "WORK_ORDER"
            ];

        case "BOM":
            return [
                "MATERIAL",
                "SUPPLIER"
            ];

        case "PROCUREMENT":
            return [
                "SUPPLIER",
                "MATERIAL",
                "PURCHASE_ORDER"
            ];

        case "PURCHASE_ORDER":
            return [
                "PROCUREMENT",
                "SUPPLIER",
                "MATERIAL",
                "SHIPMENT"
            ];

        case "SHIPMENT":
            return [
                "PURCHASE_ORDER",
                "SUPPLIER"
            ];

        case "QUALITY_INSPECTION":
            return [
                "SHIPMENT"
            ];

        case "WORK_ORDER":
            return [
                "PROJECT",
                "MATERIAL",
                "INVENTORY"
            ];

        case "INVENTORY":
            return [
                "MATERIAL",
                "WAREHOUSE"
            ];

        default:
            return [];
    }
}


/*
===========================================================
BUILD BLOCKED DEPENDENCY CAUSE
===========================================================
*/

function buildBlockedDependencyCause(
    attention,
    runtime
) {

    /*
     * If the dependency discriminator exists,
     * include it in the explanation.
     */

    if (attention.discriminator) {

        return `The ${attention.entityType.toLowerCase()} is blocked because its ${attention.discriminator.toLowerCase()} dependency has not been resolved.`;
    }


    /*
     * Otherwise inspect directly connected entities.
     */

    const edges =
        runtime.graph.getAllEdges();


    const edge =
        edges.find(
            edge =>
                edge.from === attention.entityId
        );


    if (edge) {

        return `${attention.entityType} ${attention.entityId} is waiting for ${edge.to}.`;
    }


    return "A required dependency has not been resolved.";
}


/*
===========================================================
AFFECTED ENTITIES
===========================================================
*/

function findAffectedEntities(
    entityId,
    runtime
) {

    const entityTypes = [
        "PROJECT",
        "MILESTONE",
        "BOM",
        "PROCUREMENT",
        "PURCHASE_ORDER",
        "SHIPMENT",
        "QUALITY_INSPECTION",
        "WORK_ORDER",
        "INVENTORY",
        "SUPPLIER",
        "MATERIAL"
    ];


    const affectedEntities = [];


    for (const entityType of entityTypes) {

        const entities =
            findReachableEntities(
                entityId,
                entityType,
                runtime,
                2
            );


        for (const entity of entities) {

            affectedEntities.push({

                entityType:
                    entity.entityType,

                entityId:
                    entity.entityId,

                reason:
                    `${entity.entityType} is operationally connected to ${entityId} and may be affected by the dependency issue.`
            });
        }
    }


    return affectedEntities;
}