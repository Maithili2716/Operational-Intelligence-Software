class ShipmentState{
     constructor(data){
          this.currentStatus=data.currentStatus;
          this.EstimatedarrivalDate=data.arrival;
          this.currentTransporter=data.transporter;
          this.currentRoute=data.currentRoute;
          this.lastLocation=data.location
          
     }
}