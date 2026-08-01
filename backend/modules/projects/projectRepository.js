import pool from "../../config/db.js";

class ProjectRepository{
    async getAll(){
        const result = await pool.query(`
            SELECT *
            FROM projects
            ORDER BY id
        `);
        return result.rows;
    }

    async getActive(){
        const result = await pool.query(` 
        SELECT p.*,
        ARRAY_REMOVE(
        ARRAY_AGG(DISTINCT m.id),
        NULL
        ) AS milestone_ids,

        ARRAY_REMOVE(
        ARRAY_AGG(DISTINCT b.id),
        NULL
        ) AS bom_ids,

        ARRAY_REMOVE(
        ARRAY_AGG(DISTINCT w.id),
        NULL
        ) AS work_order_ids

        FROM projects p

        LEFT JOIN milestones m
        ON m.project_id = p.id

        LEFT JOIN bom b
        ON b.project_id = p.id

        LEFT JOIN work_orders w
        ON w.project_id = p.id
        ` );
        return result.rows;
    }

    async findById(id){
        const result = await pool.query(`
            SELECT *
            FROM projects
            WHERE id = $1
        `,[id]);
        return result.rows[0];
    }

    async save(data){
        const result = await pool.query(`
            INSERT INTO projects(
                name,
                department_id,
                supplier_id,
                current_phase,
                progress,
                status,
                due_date,
                estimated_completion_date
            )
            VALUES($1,$2,$3,$4,$5,$6,$7,$8)
            RETURNING *
        `,[
            data.name,
            data.departmentId,data.supplierId,
            data.currentPhase,data.progress,
            data.status,data.dueDate,data.estimatedCompletionDate
        ]);
        return result.rows[0];
    }

    async update(id,data){
        const result = await pool.query(`
            UPDATE projects
            SET
                name = $1,
                department_id = $2,
                supplier_id =$3,
                current_phase=$4,
                progress=$5,
                status=$6,
                due_date=$7,
                estimated_completion_date=$8,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $9
            RETURNING *
        `,[
            data.name,
            data.departmentId,data.supplierId,
            data.currentPhase,data.progress,
            data.status,data.dueDate,data.estimatedCompletionDate,
            id
        ]);
        return result.rows[0];
    }

    async delete(id){
        await pool.query(`
            DELETE FROM projects
            WHERE id = $1
        `,[id]);
    }
}

export default new ProjectRepository();