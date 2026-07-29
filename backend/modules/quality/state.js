class QualityInspectionState{
     constructor(data){
          this.faultyPieces=data.faultyPieces;
          this.goodPieces=data.goodPieces;
          this.supplier=data.supplier;
          this.logistics=data.transporter;
          this.notificationStatus=data.notifyStatus;
          this.inventoryUpdateStatus=data.inventoryUpdateStatus

          
     }

}