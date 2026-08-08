import formatDate from "../../utils/formatDate.js";

export default class ShipmentAdapter{
     static adapt(state){
          return{
          status:
                state.schedule?.status ??
                state.quality?.status ??
                state.resource?.status ??
                state.status,
          trackingNo:state.trackingNumber,
          expectedArrival: formatDate( state.schedule?.dueDate)
          };
     };
}