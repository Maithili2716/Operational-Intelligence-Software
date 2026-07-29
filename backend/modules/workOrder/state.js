class WorkOrderState{
     constructor(data){
          this.successor=data.successor;
          this.status=data.status;
          this.predecessor=data.predecessor;
          this.level=data.level;
          this.completionPercent=data.percentLevel
          
     }
}