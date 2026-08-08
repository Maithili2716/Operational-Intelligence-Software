import AttentionItem from "./attentionEngine.js"

export function evaluate(runtimeState){
    const attention = [];
    for(const [id, state] of runtimeState){
        if(!state.resource)
            continue;
        const context = createContext(id, state);
        attention.push(
            ...checkInsufficientInventory(context)
        );
        attention.push(
            ...checkOutOfStock(context)
        );
        attention.push(
            ...checkIdleResource(context)
        );
        attention.push(
            ...checkResourceMismatch(context)
        );
    }
    return attention;

}

function createContext(id, state){
    return {
        id,
        resource: state.resource,
        entityType:state.entityType,
        entityId:id
    };
}

function checkInsufficientInventory(context){
    const { resource } = context;
    if(resource.available >= resource.required)
        return [];
    return [
        AttentionItem.createAttentionItem(
          context,"HIGH","RESOURCE", "Insufficient Inventory",
          `Available quantity (${resource.available}) is below required quantity (${resource.required}).`,
     )

    ];

}

function checkOutOfStock(context){
    const { resource } = context;
    if(resource.available !== 0)
        return [];
    return [
        AttentionItem.createAttentionItem(
          context,"CRITICAL","RESOURCE", "Out Of Stock",
          `Inventory Item (${context.id}) is out of stock.`,
     )

    ];

}

function checkIdleResource(context){
    const { resource } = context;
    if(!resource.lastUpdated)
    return [];
     const now = new Date();
    const lastUpdated = new Date(resource.lastUpdated);
    const days =
        (now - lastUpdated) / (1000 * 60 * 60 * 24);
    if(days < 14)
        return [];
    return [
        AttentionItem.createAttentionItem(
          context,"MEDIUM","RESOURCE", "Inventory not updated for too long",
          `Inventory has not been updated for ${Math.floor(days)} days.`,
     )

    ];

}

function checkResourceMismatch(context){
    const { resource } = context;
    const requiredExceeded = resource.required > resource.reserved;
    const reservedExceeded = resource.reserved > resource.available;

     if(!requiredExceeded && !reservedExceeded)
          return [];
     return [
        AttentionItem.createAttentionItem(
          context,"HIGH","RESOURCE", "Resource Mismatch",
          `Required Inventory Items from (${context.id}) are mismatched, resource required is greater than reserved.`,
     )

    ];

}