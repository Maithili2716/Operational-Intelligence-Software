import AttentionItem from "./attentionEngine.js";

export function evaluate(runtimeState){
    const attention = [];
    for(const [id,state] of runtimeState){
        if(!state.compliance)
            continue;
        const context = createContext(id,state);

        attention.push(
            ...checkMissingApproval(context)
        );
        attention.push(
            ...checkMissingOwner(context)
        );
       /* attention.push(
            ...checkMandatoryFields(context)
        );*/
    }
    return attention;
}

function createContext(id,state){
    return{
        id,
        compliance:state.compliance,
        entityType:state.entityType,
        entityId:id
    };
}

function checkMissingApproval(context){
     const {compliance}=context;
     if(compliance.approvalStatus === "APPROVED")
          return[]
     return [AttentionItem.createAttentionItem(context,"HIGH","COMPLIANCE","Missing Approval",` ${context.entityId} is missing approval`)];

}

function checkMissingOwner(context){
     const {compliance}=context;
     if(compliance.owner)
          return[];     
     return [AttentionItem.createAttentionItem(context,"HIGH","COMPLIANCE","Missing Owner",` ${context.entityId} is missing owner`)];

}

/*function checkMandatoryFields(context){
     const {compliance}=context;
     if(compliance.mandatoryFieldsComplete)
          return[];     
     return [AttentionItem.createAttentionItem(context,"HIGH","COMPLIANCE","Mandatory Fields Missing",` ${context.entityId} is missing the mandatory fields`)];

}*/