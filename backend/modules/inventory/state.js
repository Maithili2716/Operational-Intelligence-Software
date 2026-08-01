export default class InventoryState{
    constructor(data){
        this.entityType = "INVENTORY";
        this.materialId = data.material_id;
        this.warehouseId = data.warehouse_id;
        this.resource = {
            available : data.available,
            reserved : data.reserved,
            required : data.required,
            lastUpdated : data.last_updated
        };
    }
}