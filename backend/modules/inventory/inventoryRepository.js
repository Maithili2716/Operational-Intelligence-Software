import pool from "../../config/db.js";

class InventoryRepository{
    async getAll(){
        const result = await pool.query(`
            SELECT *
            FROM inventory
            ORDER BY id
        `);
        return result.rows;
    }

    async getActive(){
        const result = await pool.query(`
            SELECT *
            FROM inventory
            ORDER BY id
        `);
        return result.rows;
    }

    async findById(id){
        const result = await pool.query(`
            SELECT *
            FROM inventory
            WHERE id = $1
        `,[id]);
        return result.rows[0];
    }

    async save(data){
        const result = await pool.query(`
            INSERT INTO inventory(
                material_id,
                warehouse_id,
                available,
                reserved,
                required
            )
            VALUES($1,$2,$3,$4,$5)
            RETURNING *
        `,[ data.materialId,
            data.warehouseId,
            data.available,
            data.reserved,data.required,
        ]);
        return result.rows[0];
    }

    async update(id,data){
        const result = await pool.query(`
            UPDATE inventory
            SET
                available=$1,
                reserved=$2,
                required=$3,
                last_updated = CURRENT_TIMESTAMP
            WHERE id = $4
            RETURNING *
        `,[
            data.available,
            data.reserved,data.required,
            id
        ]);
        return result.rows[0];
    }

    async delete(id){
        await pool.query(`
            DELETE FROM inventory
            WHERE id = $1
        `,[id]);
    }
}

export default new InventoryRepository();