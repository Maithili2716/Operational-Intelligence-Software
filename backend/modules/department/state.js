export default class DepartmentState {
    constructor(data){
        this.entityType = "DEPARTMENT";
        this.name = data.name;
        this.head = data.head;
    }
}