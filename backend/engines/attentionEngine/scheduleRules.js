import AttentionItem from "./attentionEngine.js"
import formatDate from "../../utils/formatDate.js";

export function evaluate(runtimeState){
     const attention=[];
     for(const [id,state] of runtimeState){
        if(!state.schedule)
            continue;
      const context = createContext(id, state);    

          attention.push(
            ...checkExplicitDeadline(context)
        );
          attention.push(
            ...checkLongPending(context)
        );
          attention.push(
            ...checkNoProgress(context)
        );
          attention.push(
            ...checkImpossibleSchedule(context)
        );

    }

    return attention;

}

function createContext(id, state){
    return {
        id,
        schedule: state.schedule,
        entityType:state.entityType,
        entityId:id
    };
}


function checkExplicitDeadline(context){
    const { schedule } = context;
    
    const title="Deadline Missed"
    const now = new Date();
    const dueDate = formatDate(new Date(schedule.dueDate));
    const summary=`Past its deadline: ${dueDate}`;
    if(!schedule.dueDate)
        return [];
    if(dueDate > now)
        return [];
    return [
        AttentionItem.createAttentionItem(context,"CRITICAL","SCHEDULE",
        title,
        summary,)

    ];

}

function checkLongPending(context){
    const { schedule } = context;
    if(!schedule.createdAt)
        return [];
    const now = new Date();
    const createdAt = new Date(schedule.createdAt);
    const daysPending =
        (now - createdAt) / (1000 * 60 * 60 * 24);
    if(daysPending < 7)
        return [];
    return [
        AttentionItem.createAttentionItem(context,"HIGH","SCHEDULE",
            "Pending Too Long",
            ` ${context.entityId} has remained pending for ${Math.floor(daysPending)} days.`,
            
        )

    ];

}

function checkNoProgress(context){
    const { schedule } = context;
    if(!schedule.updatedAt)
        return [];
    const now = new Date();
    const updatedAt = new Date(schedule.updatedAt);
    const days =
        (now - updatedAt) / (1000 * 60 * 60 * 24);
    if(days < 14)
        return [];
    return [
        AttentionItem.createAttentionItem(context,
          "MEDIUM","SCHEDULE",
          "No Progress",
          ` ${context.entityId} has shown no activity for ${Math.floor(days)} days.`
        )

    ];

}

function checkImpossibleSchedule(context){
    const { schedule } = context;
    if(!schedule.dueDate || !schedule.estimatedCompletionDate)
        return [];
    const dueDate = new Date(schedule.dueDate);
    const estimated = new Date(schedule.estimatedCompletionDate);
    if(estimated <= dueDate)
        return [];

    return [
        AttentionItem.createAttentionItem(context,"CRITICAL","SCHEDULE","Impossible Schedule",
        `Estimated completion exceeds the planned due date.`,
        )
    ];

}