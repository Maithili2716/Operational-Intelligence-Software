import formatDate from "../../utils/formatDate.js";

export default class SupplierQuoteAdapter{

     static adapt(state){
          return{
          status:
                state.schedule?.status ??
                state.quality?.status ??
                state.resource?.status ??
                state.status,
          Deadline:formatDate(state.schedule.dueDate),
          expectedCompletion: formatDate(state.schedule.estimatedCompletionDate),
          Price:state.price
          };
     };
}