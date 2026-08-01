import * as ScheduleEngine from "./schedule/scheduleRules.js";
import * as ResourceEngine from "./resource/resourceRules.js";
import * as QualityEngine from "./quality/qualityRules.js";
import * as DependencyEngine from "./dependency/dependencyRules.js";
import * as OperationalEngine from "./operational/operationalRules.js";
import * as ComplianceEngine from "./compliance/complianceRules.js";



class AttentionItem{
     static createAttentionItem(context,severity,category,title,summary){
          return{
               severity,
               category,
               entityType:context.entityType,
               entityId:context.entityId,
               title,
               summary,
               detectedAt:new Date()
            
          }
     }
}

export function generateAttention(runtimeModel){
     const attention= [
    ...ScheduleEngine.evaluate(runtimeModel.state),
    ...ResourceEngine.evaluate(runtimeModel.state),
    ...QualityEngine.evaluate(runtimeModel.state),
    ...DependencyEngine.evaluate(runtimeModel),
    ...OperationalEngine.evaluate(runtimeModel.state),
    ...ComplianceEngine.evaluate(runtimeModel.state)
];
     const priority={
          CRITICAL : 4,
          HIGH:3,
          MEDIUM:2,
          LOW:1
     }

     attention.sort((a,b)=>priority[b.severity]-priority[a.severity]);
     return attention;
}