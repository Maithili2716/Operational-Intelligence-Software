import pool from "../../config/db.js";

class MilestoneRepository{
    async getAll(){
        const result = await pool.query(`
            SELECT *
            FROM milestones
            ORDER BY id
        `);
        return result.rows;
    }

    async getActive(){
        const result = await pool.query(`
            SELECT *
            FROM milestones
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
            FROM milestones
            WHERE id = $1
        `,[id]);
        return result.rows[0];
    }

    async save(data){
        const result = await pool.query(`
            INSERT INTO milestones(
                project_id,
                name,
                number,
                progress,
                status,
                due_date,
                estimated_completion_date
            )
            VALUES($1,$2,$3,$4,$5,$6,$7)
            RETURNING *
        `,[ data.projectId,
            data.name,data.number,
            data.progress,
            data.status,data.dueDate,data.estimatedCompletionDate
        ]);
        return result.rows[0];
    }

    async update(id,data){
        const result = await pool.query(`
            UPDATE milestones
            SET
                name = $1,
                progress=$2,
                status=$3,
                due_date=$4,
                estimated_completion_date=$5,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $6
            RETURNING *
        `,[
            data.name,
            data.progress,
            data.status,data.dueDate,data.estimatedCompletionDate,
            id
        ]);
        return result.rows[0];
    }

    async delete(id){
        await pool.query(`
            DELETE FROM milestones
            WHERE id = $1
        `,[id]);
    }
}

export default new MilestoneRepository();