import * as ScheduleEngine from "./scheduleRules.js";
import * as ResourceEngine from "./resourceRules.js";
import * as QualityEngine from "./qualityRules.js";
import * as DependencyEngine from "./dependencyRules.js";
import * as OperationalEngine from "./operationalAnomalyRules.js";
import * as ComplianceEngine from "./complianceRules.js";



export default class AttentionItem{
     static createAttentionItem(context,severity,category,title,summary,discriminator=null){
          return{
               severity,
               category,
               entityType:context.entityType,
               entityId:context.entityId,
               title,
               summary,
               discriminator,
               detectedAt:new Date()
            
          }
     }
}

export function generateAttention(runtimeModel) {

    const engineResults = [

        ScheduleEngine.evaluate(
            runtimeModel.state
        ),

        ResourceEngine.evaluate(
            runtimeModel.state
        ),

        QualityEngine.evaluate(
            runtimeModel.state
        ),

        DependencyEngine.evaluate(
            runtimeModel
        ),
        OperationalEngine.evaluate(
            runtimeModel.state
        ),
        ComplianceEngine.evaluate(
            runtimeModel.state
        )
    ];
    return interleaveAttention(
        engineResults
    );
}


/*
===========================================================
ROUND-ROBIN ATTENTION ORDER
===========================================================

Engine order:

    Schedule
    Resource
    Quality
    Dependency
    Operational
    Compliance

Output:

    Schedule[0]
    Resource[0]
    Quality[0]
    Dependency[0]
    Operational[0]
    Compliance[0]

    Schedule[1]
    Resource[1]
    ...

Empty engine positions are skipped.
===========================================================
*/

function interleaveAttention(
    engineResults
) {
    const result = [];
    const maxLength =
        Math.max(
            ...engineResults.map(
                items => items.length
            )
        );
    for (
        let index = 0;
        index < maxLength;
        index++
    ) {

        for (
            const items of engineResults
        ) {

            if (
                index >= items.length
            ) {
                continue;
            }
            result.push(
                items[index]
            );
        }
    }
    return result;
}