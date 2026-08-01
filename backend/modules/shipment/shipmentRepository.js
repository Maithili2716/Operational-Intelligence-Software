import pool from "../../config/db.js";

class ShipmentRepository{
    async getAll(){
        const result = await pool.query(`
            SELECT *
            FROM shipments
            ORDER BY id
        `);
        return result.rows;
    }

    async getActive(){
        const result = await pool.query(`
            SELECT *
            FROM shipments
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
            FROM shipments
            WHERE id = $1
        `,[id]);
        return result.rows[0];
    }

    async save(data){
        const result = await pool.query(`
            INSERT INTO shipments(
                purchase_order_id,
                tracking_number,
                expected_delivery,
                status
            )
            VALUES($1,$2,$3,$4)
            RETURNING *
        `,[ data.purchaseOrderId,
            data.trackingNumber,
            data.expectedDelivery,data.status,
        ]);
        return result.rows[0];
    }

    async update(id,data){
        const result = await pool.query(`
            UPDATE shipments
            SET
                tracking_number = $1,
                expected_delivery = $2,
                status =$3,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $4
            RETURNING *
        `,[
            data.trackingNumber,
            data.expectedDelivery,data.status,
            id
        ]);
        return result.rows[0];
    }

    async delete(id){
        await pool.query(`
            DELETE FROM shipments
            WHERE id = $1
        `,[id]);
    }
}

export default new ShipmentRepository();