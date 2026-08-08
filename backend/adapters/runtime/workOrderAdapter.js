import formatDate from "../../utils/formatDate.js";

export default class WorkOrderAdapter{
     static adapt(state){
          return{
          progress:state.schedule.progress,
          deadLine:formatDate(state.schedule.dueDate),
          status:
                state.schedule?.status ??
                state.quality?.status ??
                state.resource?.status ??
                state.status,
          
          };
     };
}