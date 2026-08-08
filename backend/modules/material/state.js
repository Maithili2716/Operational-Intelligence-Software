export default class MaterialState{
    constructor(data){
        this.entityType = "MATERIAL";
        this.materialCodeVersion = data.material_code;
        this.name = data.name;
        this.description = data.description;
        this.unit = data.unit;
        
    }
}