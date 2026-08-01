export default class ProcurementState{
    constructor(data){
        this.entityType="PROCUREMENT";
        this.supplierId=data.supplier_id;
        this.schedule={
            status:data.status,
            dueDate:data.due_date,
            estimatedCompletionDate:
                data.estimated_completion_date,
            createdAt:data.created_at,
            updatedAt:data.updated_at
        };
    }
}