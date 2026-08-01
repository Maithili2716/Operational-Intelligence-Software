export default class ShipmentState{
    constructor(data){
        this.entityType = "SHIPMENT";
        this.purchaseOrderId = data.purchase_order_id;
        this.trackingNumber = data.tracking_number;
        this.schedule = {
            status: data.status,
            dueDate: data.expected_delivery,
            estimatedCompletionDate: data.expected_delivery,
            createdAt: data.created_at,
            updatedAt: data.updated_at
        };
    }
}