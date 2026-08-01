export default class MilestoneState{
    constructor(data){
        this.entityType = "MILESTONE";
        this.number = data.number;
        this.projectId = data.project_id;
        this.schedule = {
            progress : data.progress,
            status : data.status,
            dueDate : data.due_date,
            estimatedCompletionDate :
                data.estimated_completion_date,
            createdAt : data.created_at,
            updatedAt : data.updated_at
        };

    }

}