export default class QualityInspectionState{
    constructor(data){
        this.entityType = "QUALITY_INSPECTION";
        this.shipmentId = data.shipment_id;
        this.quality = {
            status:data.status,
            goodPieces:data.good_pieces,
            faultyPieces:data.faulty_pieces,
            notificationStatus:
                data.notification_status,
            inventoryUpdateStatus:
                data.inventory_update_status,
            createdAt:data.created_at,
            updatedAt:data.updated_at
        };
    }
}