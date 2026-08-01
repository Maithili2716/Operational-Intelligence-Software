class ProjectState{
     constructor(data){
          this.entityType="Project"
          this.owner= data.department_id;
          this.currentPhase= data.current_phase
          this.schedule={
               status:data.status,
               dueDate:data.due_date,
               estimatedCompletionDate:data.estimated_completion_date,
               progress:data.progress,
               updatedAt:data.updated_at,
               createdAt:data.created_at
          }        
     }
}
