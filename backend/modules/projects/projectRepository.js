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
        SELECT 
            p.id,
            p.name,
            p.department_id,
            p.supplier_id,
            p.current_phase,
            p.progress,
            p.status,
            p.due_date,
            p.estimated_completion_date,
            p.created_at,
            p.updated_at,
        ARRAY_REMOVE(
        ARRAY_AGG(DISTINCT m.id),
        NULL
        ) AS milestoneIds,

        ARRAY_REMOVE(
        ARRAY_AGG(DISTINCT b.id),
        NULL
        ) AS bomIds,

        ARRAY_REMOVE(
        ARRAY_AGG(DISTINCT w.id),
        NULL
        ) AS workOrderIds

        FROM projects p

        LEFT JOIN milestones m
        ON m.project_id = p.id

        LEFT JOIN bom b
        ON b.project_id = p.id

        LEFT JOIN work_orders w
        ON w.project_id = p.id
        WHERE p.status IN (
            'PENDING',
            'ONGOING',
            'ON HOLD',
            'FAILED'
        )
        GROUP BY
            p.id,
            p.name,
            p.department_id,
            p.supplier_id,
            p.current_phase,
            p.progress,
            p.status,
            p.due_date,
            p.estimated_completion_date,
            p.created_at,
            p.updated_at

        ORDER BY p.id;
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