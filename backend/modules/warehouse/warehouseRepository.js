import pool from "../../config/db.js";

class WarehouseRepository{
    async getAll(){
        const result = await pool.query(`
            SELECT *
            FROM warehouses
            ORDER BY id
        `);
        return result.rows;
    }

    async getActive(){
        const result = await pool.query(`
            SELECT *
            FROM warehouses
            ORDER BY id
        `);
        return result.rows;
    }

    async findById(id){
        const result = await pool.query(`
            SELECT *
            FROM warehouses
            WHERE id = $1
        `,[id]);
        return result.rows[0];
    }

    async save(data){
        const result = await pool.query(`
            INSERT INTO warehouses(
                name,
                location,
                capacity
            )
            VALUES($1,$2,$3)
            RETURNING *
        `,[
            data.name,
            data.location,data.capacity
        ]);
        return result.rows[0];
    }

    async update(id,data){
        const result = await pool.query(`
            UPDATE warehouses
            SET
                name = $1,
                location = $2,
                capacity =$3,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $4
            RETURNING *
        `,[
            data.name,
            data.location,data.capacity,
            id
        ]);
        return result.rows[0];
    }

    async delete(id){
        await pool.query(`
            DELETE FROM warehouses
            WHERE id = $1
        `,[id]);
    }
}

export default new WarehouseRepository();