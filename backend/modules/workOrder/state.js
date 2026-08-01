export default class WorkOrderState{
    constructor(data){
        this.entityType = "WORK_ORDER";
        this.projectId = data.project_id;
        this.schedule = {
            progress: data.progress,
            status: data.status,
            dueDate: data.due_date,
            estimatedCompletionDate:
                data.estimated_completion_date,
            createdAt: data.created_at,
            updatedAt: data.updated_at
        };
    }
}