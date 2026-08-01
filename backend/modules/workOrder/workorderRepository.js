import pool from "../../config/db.js";

class WorkOrderRepository{
    async getAll(){
        const result = await pool.query(`
            SELECT *
            FROM work_orders
            ORDER BY id
        `);
        return result.rows;
    }

    async getActive(){
        const result = await pool.query(`
            SELECT *
            FROM work_orders
            WHERE status IN (
            'PENDING',
            'ONGOING',
            'ON HOLD',
            'FAILED'
        )
        ORDER BY id;
        `);
        return result.rows;
    }

    async findById(id){
        const result = await pool.query(`
            SELECT *
            FROM work_orders
            WHERE id = $1
        `,[id]);
        return result.rows[0];
    }

    async save(data){
        const result = await pool.query(`
            INSERT INTO work_orders(
                project_id,
                progress,
                status,
                due_date,
                estimated_completion_date
            )
            VALUES($1,$2,$3,$4,$5)
            RETURNING *
        `,[ data.projectId,
            data.progress,
            data.status,data.dueDate,data.estimatedCompletionDate
        ]);
        return result.rows[0];
    }

    async update(id,data){
        const result = await pool.query(`
            UPDATE work_orders
            SET
                progress=$1,
                status=$2,
                due_date=$3,
                estimated_completion_date=$4,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $5
            RETURNING *
        `,[
            data.progress,
            data.status,data.dueDate,data.estimatedCompletionDate,
            id
        ]);
        return result.rows[0];
    }

    async delete(id){
        await pool.query(`
            DELETE FROM work_orders
            WHERE id = $1
        `,[id]);
    }
}

export default new WorkOrderRepository();