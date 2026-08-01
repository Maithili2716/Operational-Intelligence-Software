import pool from "../../config/db.js";

class SupplierQuoteRepository{
    async getAll(){
        const result = await pool.query(`
            SELECT *
            FROM supplier_quotes
            ORDER BY id
        `);
        return result.rows;
    }

    async getActive(){
        const result = await pool.query(`
            SELECT *
            FROM supplier_quotes
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
            FROM supplier_quotes
            WHERE id = $1
        `,[id]);
        return result.rows[0];
    }

    async save(data){
        const result = await pool.query(`
            INSERT INTO supplier_quotes(
                supplier_id,
                material_id,
                price,
                valid_until,
                status
            )
            VALUES($1,$2,$3,$4,$5)
            RETURNING *
        `,[ data.supplierId,
            data.materialId,
            data.price,
            data.validUntil,data.status,
        ]);
        return result.rows[0];
    }

    async update(id,data){
        const result = await pool.query(`
            UPDATE supplier_quotes
            SET
                price = $1,
                valid_until = $2,
                status =$3,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $4
            RETURNING *
        `,[
            data.price,
            data.validUntil,data.status,
            id
        ]);
        return result.rows[0];
    }

    async delete(id){
        await pool.query(`
            DELETE FROM supplier_quotes
            WHERE id = $1
        `,[id]);
    }
}

export default new SupplierQuoteRepository();