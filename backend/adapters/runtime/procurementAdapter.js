import formatDate from "../../utils/formatDate.js";

export default class ProcurementAdapter{
     static adapt(state){
          return{
          status:
                state.schedule?.status ??
                state.quality?.status ??
                state.resource?.status ??
                state.status,
          deadline:formatDate(state.schedule.dueDate),
          estimatedCompletion:formatDate(state.schedule.estimatedCompletionDate)
          };
     };
}