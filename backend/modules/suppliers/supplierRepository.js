import pool from "../../config/db.js";

class SupplierRepository{
    async getAll(){
        const result = await pool.query(`
            SELECT *
            FROM suppliers
            ORDER BY id
        `);
        return result.rows;
    }

    async getActive(){
        const result = await pool.query(`
            SELECT *
            FROM suppliers
            ORDER BY id
        `);
        return result.rows;
    }

    async findById(id){
        const result = await pool.query(`
            SELECT *
            FROM suppliers
            WHERE id = $1
        `,[id]);
        return result.rows[0];
    }

    async save(data){
        const result = await pool.query(`
            INSERT INTO suppliers(
                name,
                email,
                phone,
                address,
                status
            )
            VALUES($1,$2,$3,$4,$5)
            RETURNING *
        `,[
            data.name,
            data.email,data.phone,data.address,data.status
        ]);
        return result.rows[0];
    }

    async update(id,data){
        const result = await pool.query(`
            UPDATE suppliers
            SET
                name = $1,
                email = $2,
                phone =$3,
                address = $4,
                status=$5,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $6
            RETURNING *
        `,[
            data.name,
            data.email,data.phone,data.address,data.status,
            id
        ]);
        return result.rows[0];
    }

    async delete(id){
        await pool.query(`
            DELETE FROM suppliers
            WHERE id = $1
        `,[id]);
    }
}

export default new SupplierRepository();