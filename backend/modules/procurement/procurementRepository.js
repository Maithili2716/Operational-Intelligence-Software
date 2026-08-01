import pool from "../../config/db.js";

class ProcurementRepository{
    async getAll(){
        const result = await pool.query(`
            SELECT *
            FROM procurements
            ORDER BY id
        `);
        return result.rows;
    }

    async getActive(){
        const result = await pool.query(`
            SELECT 
            p.id ,
            p.supplier_id,
            p.status,
            p.due_date,
            p.estimated_completion_date,
            p.created_at,
            p.updated_at,
            ARRAY_REMOVE(
            ARRAY_AGG(DISTINCT pm.material_id),
            NULL
            ) AS material_ids,
            ARRAY_REMOVE(
            ARRAY_AGG(DISTINCT po.id),
            NULL
            ) AS purchase_order_ids
            FROM procurements p
        LEFT JOIN procurement_materials pm
        ON pm.procurement_id = p.id
        LEFT JOIN purchase_orders po
        ON po.procurement_id = p.id
        WHERE p.status IN (
            'PENDING',
            'ONGOING',
            'ON HOLD',
            'FAILED'
        )
        GROUP BY 
            p.id ,
            p.supplier_id,
            p.status,
            p.due_date,
            p.estimated_completion_date,
            p.created_at,
            p.updated_at
        ORDER BY p.id;
        `);
        return result.rows;
    }

    async findById(id){
        const result = await pool.query(`
            SELECT *
            FROM procurements
            WHERE id = $1
        `,[id]);
        return result.rows[0];
    }

    async save(data){
        const result = await pool.query(`
            INSERT INTO procurements(
                supplier_id,
                status,
                expected_delivery,
            )
            VALUES($1,$2,$3)
            RETURNING *
        `,[
            data.supplierId,
            data.status,
            data.expectedDelivery
           
        ]);
        return result.rows[0];
    }

    async update(id,data){
        const result = await pool.query(`
            UPDATE procurements
            SET
                status = $1,
                expected_delivery = $2,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $3
            RETURNING *
        `,[
            data.status,
            data.expectedDelivery,
            id
        ]);
        return result.rows[0];
    }

    async delete(id){
        await pool.query(`
            DELETE FROM procurements
            WHERE id = $1
        `,[id]);
    }
}

export default new ProcurementRepository();