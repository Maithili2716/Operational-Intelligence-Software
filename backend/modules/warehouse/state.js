export default class WarehouseState{
    constructor(data){
        this.entityType = "WAREHOUSE";
        this.name = data.name;
        this.location = data.location;
        this.capacity = data.capacity;
    }
}