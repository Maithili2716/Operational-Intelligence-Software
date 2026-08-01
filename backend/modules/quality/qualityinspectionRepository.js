import pool from "../../config/db.js";

class QualityInspectionRepository{
    async getAll(){
        const result = await pool.query(`
            SELECT *
            FROM quality_inspections
            ORDER BY id
        `);
        return result.rows;
    }

    async getActive(){
        const result = await pool.query(`
            SELECT *
            FROM quality_inspections
            WHERE status IN (
                'ONGOING',
                'ON HOLD','PENDING','FAILED'
            )
            OR
            (
            status='COMPLETED'
            AND inventory_update_status!='COMPLETED'
            )
            ORDER BY id
        `);
        return result.rows;
    }

    async findById(id){
        const result = await pool.query(`
            SELECT *
            FROM quality_inspections
            WHERE id = $1
        `,[id]);
        return result.rows[0];
    }

    async save(data){
        const result = await pool.query(`
            INSERT INTO quality_inspections(
                shipment_id,
                status,
                good_pieces,
                faulty_pieces,
                notification_status,
                inventory_update_status
            )
            VALUES($1,$2,$3,$4,$5,$6)
            RETURNING *
        `,[ data.shipmentId,
            data.status,
            data.goodPieces,data.faultyPieces,
            data.notificationStatus,data.inventoryUpdateStatus,
        ]);
        return result.rows[0];
    }

    async update(id,data){
        const result = await pool.query(`
            UPDATE quality_inspections
            SET
                status=$1
                good_pieces = $2,
                faulty_pieces = $3,
                notification_status =$4,
                inventory_update_status=$5,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $6
            RETURNING *
        `,[ data.status,
            data.goodPieces,
            data.faultyPieces,data.notificationStatus,
            data.inventoryUpdateStatus,
            id
        ]);
        return result.rows[0];
    }

    async delete(id){
        await pool.query(`
            DELETE FROM quality_inspections
            WHERE id = $1
        `,[id]);
    }
}

export default new QualityInspectionRepository;