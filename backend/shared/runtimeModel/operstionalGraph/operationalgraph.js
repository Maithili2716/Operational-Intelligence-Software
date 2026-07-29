class Graph{
     constructor(){
          this.nodes=new Map();
          this.adjacencyList=new Map();
     }
     addNode(node){
          this.nodes.set(node.id,node);
          this.adjacencyList.set(node.id,[]);  
     }
     addEdge(edge){
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
}
