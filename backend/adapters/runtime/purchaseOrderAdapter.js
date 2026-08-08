import formatDate from "../../utils/formatDate.js";

export default class PurchaseOrderAdapter{
     static adapt(state){
          return{
          status:
                state.schedule?.status ??
                state.quality?.status ??
                state.resource?.status ??
                state.status,
          supplier: state.supplierId,
          expectedDelivery: formatDate(state.schedule.dueDate),
          estimatedDelivery:formatDate(state.schedule.estimatedCompletionDate)  
          };
     };
}