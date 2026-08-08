
export default class BOMState{
    constructor(data){
        this.entityType = "BOM";
        this.projectId = data.project_id;
        this.revisionNo = data.revision_no;
        this.name=data.name;
        this.revisionFlag = data.revision_flag;
        this.schedule = {
            status : data.status,
            dueDate :data.due_date,
            estimatedCompletionDate :
                data.estimated_completion_date,
            createdAt : data.created_at,
            updatedAt : data.updated_at

        };
        this.compliance = {
            owner : data.owner,
            approvalStatus :
                data.approval_status,
            mandatoryFieldsComplete :
                data.mandatory_fields_complete
        };
    }
}