import pool from "../../config/db.js";

class BOMRepository{
    async getAll(){
        const result = await pool.query(`
            SELECT *
            FROM bom
            ORDER BY id
        `);
        return result.rows;
    }

    async getActive(){
        const result = await pool.query(`
        SELECT b.*,
        ARRAY_REMOVE(
        ARRAY_AGG(DISTINCT bm.material_id),
        NULL
        ) AS material_ids,
        ARRAY_REMOVE(
        ARRAY_AGG(DISTINCT bs.supplier_id),
        NULL
        ) AS supplier_ids
        FROM bom b
        LEFT JOIN bom_materials bm
        ON bm.bom_id = b.id
        LEFT JOIN bom_suppliers bs
        ON bs.bom_id = b.id
        WHERE b.status IN (
            'PENDING',
            'ONGOING',
            'ON HOLD',
            'FAILED'
        )
        ORDER BY b.id;
        GROUP BY b.id
        
        `);
        return result.rows;
    }

    async findById(id){
        const result = await pool.query(`
            SELECT *
            FROM bom
            WHERE id = $1
        `,[id]);
        return result.rows[0];
    }

    async save(data){
        const result = await pool.query(`
            INSERT INTO bom(
                project_id,
                revision_no,
                revision_flag,
                owner,
                approved_by,
                approval_status,
                mandatory_fields_complete,
                status,
                due_date,
                estimated_completion_date
            )
            VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
            RETURNING *
        `,[ data.projectId,
            data.revisionNo,
            data.revisionFlag,
            data.owner,
            data.approvedBy,
            data.approvalStatus,
            data.mandatoryFieldsComplete,
            data.status,
            data.dueDate,
            data.estimatedCompletionDate
        ]);
        return result.rows[0];
    }

    async update(id,data){
        const result = await pool.query(`
            UPDATE bom
            SET
                revision_no = $1,
                revision_flag = $2,
                owner =$3,
                approved_by=$4,
                approval_status=$5,
                mandatory_fields_complete=$6,
                status=$7,
                due_date=$8,
                estimated_completion_date=$9,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $10
            RETURNING *
        `,[
            data.revisionNo,
            data.revisionFlag,
            data.owner,
            data.approvedBy,
            data.approvalStatus,
            data.mandatoryFieldsComplete,
            data.status,
            data.dueDate,
            data.estimatedCompletionDate,
            id
        ]);
        return result.rows[0];
    }

    async delete(id){
        await pool.query(`
            DELETE FROM bom
            WHERE id = $1
        `,[id]);
    }
}

export default new BOMRepository();