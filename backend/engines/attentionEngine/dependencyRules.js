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
       dependencyState:runtimeModel.state.get(edge.to)
    };
}

function checkBlockedDependency(context){
     const {edge,dependencyState,dependentState}=context;
     if(!dependencyState?.schedule || !dependentState?.schedule)
          return[];
     return [AttentionItem.createAttentionItem(context,"HIGH","DEPENDENCY","BLOCKED DEPENDENCY",`${edge.from} is waiting for ${edge.to}`)];

}

function checkMissingDependency(context){
     const{edge,dependencyNode}=context;
     if(!dependencyNode)
    return [AttentionItem.createAttentionItem(context,"CRITICAL","DEPENDENCY","MISSING DEPENDENCY",`${edge.to} does not exist`)];

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
     return [AttentionItem.createAttentionItem(context,"HIGH","DEPENDENCY","FAILED DEPENDENCY",`${edge.from} is waiting because of failed ${edge.to}`)];

}