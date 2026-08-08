import formatDate from "../../utils/formatDate.js";

export default class BOMAdapter{
     static adapt(state){
          return{
          status:
                state.schedule?.status ??
                state.quality?.status ??
                state.resource?.status ??
                state.status,
          revision: state.revisionNo,
          deadline: formatDate(state.schedule.dueDate) 
          };
     };
}