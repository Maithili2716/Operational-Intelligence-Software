export default class PurchaseOrderState{
    constructor(data){
        this.entityType = "PURCHASE_ORDER";
        this.procurementId = data.procurement_id;
        this.supplierId = data.supplier_id;
        this.schedule = {
            status : data.status,
            dueDate : data.due_date,
            estimatedCompletionDate :
                data.estimated_completion_date,
            createdAt : data.created_at,
            updatedAt : data.updated_at
        };
    }
}