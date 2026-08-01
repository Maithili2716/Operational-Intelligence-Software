import pool from "../../config/db.js";

class PurchaseOrderRepository{
    async getAll(){
        const result = await pool.query(`
            SELECT *
            FROM purchase_orders
            ORDER BY id
        `);
        return result.rows;
    }

    async getActive(){
        const result = await pool.query(`
           SELECT 
           po.id,
           po.procurement_id,
           po.supplier_id,
           po.status,
           po.due_date,
           po.estimated_completion_date,
           po.created_at,
           po.updated_at,
           ARRAY_REMOVE(
           ARRAY_AGG(DISTINCT poi.material_id),
           NULL
            ) AS material_ids,
            ARRAY_REMOVE(
            ARRAY_AGG(DISTINCT s.id),
            NULL
            ) AS shipment_ids
        FROM purchase_orders po
        LEFT JOIN purchase_order_items poi
        ON poi.purchase_order_id = po.id
        LEFT JOIN shipments s
        ON s.purchase_order_id = po.id
            WHERE po.status IN (
                'PENDING',
                'ONGOING',
                'ON HOLD',
                'FAILED'
            )
        GROUP BY 
           po.id,
           po.procurement_id,
           po.supplier_id,
           po.status,
           po.due_date,
           po.estimated_completion_date,
           po.created_at,
           po.updated_at
        
        ORDER BY po.id;
        `);
        return result.rows;
    }

    async findById(id){
        const result = await pool.query(`
            SELECT *
            FROM purchase_orders
            WHERE id = $1
        `,[id]);
        return result.rows[0];
    }

    async save(data){
        const result = await pool.query(`
            INSERT INTO purchase_orders(
                procurement_id,
                supplier_id,
                status,
                due_date,
                estimated_completion_date
            )
            VALUES($1,$2,$3,$4,$5)
            RETURNING *
        `,[ data.procurementId,data.supplierId,
            data.status,data.dueDate,
            data.estimatedCompletionDate
        ]);
        return result.rows[0];
    }

    async update(id,data){
        const result = await pool.query(`
            UPDATE purchase_orders
            SET
                status=$1,
                due_date=$2,
                estimated_completion_date=$3,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $4
            RETURNING *
        `,[
            data.status,data.dueDate,data.estimatedCompletionDate,
            id
        ]);
        return result.rows[0];
    }

    async delete(id){
        await pool.query(`
            DELETE FROM purchase_orders
            WHERE id = $1
        `,[id]);
    }
}

export default new PurchaseOrderRepository();