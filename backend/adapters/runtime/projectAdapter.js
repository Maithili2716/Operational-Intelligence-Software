import formatDate from "../../utils/formatDate.js";

export default class ProjectAdapter{
     static adapt(state){
          return{
          status:
                state.schedule?.status ??
                state.quality?.status ??
                state.resource?.status ??
                state.status,
          progress: state.schedule?.progress,
          owner: state.owner,
          deadline:formatDate(state.schedule.dueDate)
          
          
          };
     };
}