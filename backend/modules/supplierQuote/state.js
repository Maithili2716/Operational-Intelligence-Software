export default class SupplierQuoteState{
    constructor(data){
        this.entityType = "SUPPLIER_QUOTE";
        this.supplierId = data.supplier_id;
        this.materialId = data.material_id;
        this.price = data.price;
        this.schedule = {
            status : data.status,
            dueDate : data.valid_until,
            estimatedCompletionDate : data.valid_until,
            createdAt : data.created_at,
            updatedAt : data.updated_at
        };
    }
}