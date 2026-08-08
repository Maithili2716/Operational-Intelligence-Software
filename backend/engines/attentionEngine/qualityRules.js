import AttentionItem from "./attentionEngine.js";

export function evaluate(runtimeState){
    const attention = [];
    for(const [id, state] of runtimeState){
        if(!state.quality)
            continue;
        const context = createContext(id, state);

        attention.push(
            ...checkInspectionFailure(context)
        );
        attention.push(
            ...checkHighDefectRate(context)
        );
        attention.push(
            ...checkInspectionPending(context)
        );
        attention.push(
            ...checkInventoryNotUpdated(context)
        );
        attention.push(
            ...checkSupplierNotNotified(context)
        );

    }

    return attention;

}

function createContext(id, state){
    return {
        id,
        quality: state.quality,
        entityType: state.entityType,
        entityId: id
    };

}
function checkHighDefectRate(context){
    const { quality } = context;
    const faultyPieces=quality.faultyPieces;
    const goodPieces=quality.goodPieces; 
    const totalPieces = faultyPieces + goodPieces;          
     if(totalPieces === 0)
          return [];
     const defectRate = (faultyPieces / totalPieces) * 100;
    if( defectRate < 5)
     return[];
    return [AttentionItem.createAttentionItem(context,"HIGH","QUALITY","High Defect Rate",`Inspection ${context.id} has a defect rate of ${defectRate.toFixed(2)}%`)];

}

function checkInspectionPending(context){
    const { quality } = context;
    if(quality.status=="FAILED")
     return[];
    if(!quality.updatedAt)
     return[];
    const now=new Date();
    const updatedAt=new Date(quality.updatedAt);
     const days =
        (now - updatedAt) / (1000 * 60 * 60 * 24);
    if(days <= 7)
        return [];
    return [AttentionItem.createAttentionItem(context,"MEDIUM","QUALITY","Inspection Pending",`Inspection ${context.id} has been pending for ${Math.floor(days)} days`)];

}

function checkInspectionFailure(context){
    const { quality } = context;
    if(quality.status !=="FAILED")
     return[];
    return [AttentionItem.createAttentionItem(context,"CRITICAL","QUALITY","Inspection Failure",`Inspection ${context.id} has failed`)];

}

function checkInventoryNotUpdated(context){
    const { quality } = context;
    if(quality.status!== "COMPLETED" )
     return[];
    if(quality.inventoryUpdatedStatus ==="COMPLETED")
     return[]
    return [AttentionItem.createAttentionItem(context,"HIGH","QUALITY","Inventory Not Updated",`Inspection ${context.id} is completed but inventory not updated yet`)];

}

function checkSupplierNotNotified(context){
    const { quality } = context;
    if(quality.status !== "FAILED")
     return[];
    if(quality.notificationStatus ==="SENT")
     return[]
    return [AttentionItem.createAttentionItem(context,"LOW","QUALITY","Supplier Not Notified",`Inspection ${context.id} failed but supplier not updated yet`)];

}