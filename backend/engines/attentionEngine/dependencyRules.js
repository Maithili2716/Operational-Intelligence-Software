import AttentionItem from "./attentionEngine.js";

export function evaluate(runtimeModel){
    const attention = [];
    for(const [nodeId,edges] of runtimeModel.graph.adjacencyList){
     for(const edge of edges){
          const context = createContext(edge, runtimeModel);

          attention.push(
            ...checkBlockedDependency(context)
          );
          attention.push(
            ...checkMissingDependency(context)
          );
          attention.push(
            ...checkCircularDependency(context)
          );
          attention.push(
            ...checkFailedDependency(context)
           );
    }
}
    return attention;
}

function createContext(edge, runtimeModel){
    return {
       edge,
       dependentNode:runtimeModel.graph.findNode(edge.from),
       dependencyNode:runtimeModel.graph.findNode(edge.to),
       dependentState:runtimeModel.state.get(edge.from),
       dependencyState:runtimeModel.state.get(edge.to),
        entityType: runtimeModel.graph.findNode(edge.from)?.type,
        entityId: edge.from
    };
    
}

function checkBlockedDependency(context){
     const {edge,dependencyState,dependentState}=context;
     if(!dependencyState?.schedule || !dependentState?.schedule)
          return[];
     return [AttentionItem.createAttentionItem(context,"HIGH","DEPENDENCY","Blocked Dependency",`${edge.from} is waiting for ${edge.to}`,`${edge.from}:${edge.to}`)];

}

function checkMissingDependency(context){
     const{edge,dependencyNode}=context;
     if(!dependencyNode)
    return [AttentionItem.createAttentionItem(context,"CRITICAL","DEPENDENCY","Missing Dependency",`${edge.to} does not exist`,`${edge.from}:${edge.to}`)];
     return[];

}

function checkCircularDependency(context){

    return [];
}

function checkFailedDependency(context){
     const {edge,dependencyState,dependentState}=context;
     if(!dependencyState?.schedule || !dependentState?.schedule)
          return[];
     if(dependencyState.schedule.status !=="FAILED")
          return[];
     return [AttentionItem.createAttentionItem(context,"HIGH","DEPENDENCY","Failed Dependency",`${edge.from} is waiting because of failed ${edge.to}`,`${edge.from}:${edge.to}`)];

}