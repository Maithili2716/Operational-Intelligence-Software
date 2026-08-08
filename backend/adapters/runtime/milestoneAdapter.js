import formatDate from "../../utils/formatDate.js";

export default class MilestoneAdapter{
     static adapt(state){
          return{
          status:
                state.schedule?.status ??
                state.quality?.status ??
                state.resource?.status ??
                state.status,
          completion: formatDate(state.schedule?.progress),
          plannedDate: formatDate(state.schedule?.dueDate)
          
          };
     };
}