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

export function generateAttention(runtimeModel){
     return [
    ...ScheduleEngine.evaluate(runtimeModel.state),
    ...ResourceEngine.evaluate(runtimeModel.state),
    ...QualityEngine.evaluate(runtimeModel.state),
    ...DependencyEngine.evaluate(runtimeModel),
    ...OperationalEngine.evaluate(runtimeModel.state),
    ...ComplianceEngine.evaluate(runtimeModel.state)
];

}