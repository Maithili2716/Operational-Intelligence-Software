export default class Graph{
     constructor(){
          this.nodes=new Map();
          this.adjacencyList=new Map();
     }
     addNode(node){
     if(this.nodes.has(node.id))
          throw new Error("Node already exists.");
     this.nodes.set(node.id,node);
     this.adjacencyList.set(node.id,[]);  
     }
     addEdge(edge){
     if(!this.nodes.has(edge.from))
        throw new Error("Source node not found.");
     if(!this.nodes.has(edge.to))
        throw new Error("Target node not found.");
          
     this.adjacencyList.get(edge.from).push(edge);
     }
     findNode(id){
          return this.nodes.get(id);
     }
     findNeighbours(id){
          if(!this.nodes.has(id)){
               throw new Error("cannot find the nodes");
     };
          return this.adjacencyList.get(id);
     }
     getAllNodes(){
          return [...this.nodes.values()];
     }
     getAllEdges(){
     const edges=[];
     for(const list of this.adjacencyList.values()){
        edges.push(...list);
    }
    return edges;
}
}
