import pool from "../../config/db.js";

class MaterialRepository{
    async getAll(){
        const result = await pool.query(`
            SELECT *
            FROM materials
            ORDER BY id
        `);
        return result.rows;
    }

    async getActive(){
        const result = await pool.query(`
            SELECT *
            FROM materials
            ORDER BY id
        `);
        return result.rows;
    }

    async findById(id){
        const result = await pool.query(`
            SELECT *
            FROM materials
            WHERE id = $1
        `,[id]);
        return result.rows[0];
    }

    async save(data){
        const result = await pool.query(`
            INSERT INTO materials(
                material_code,
                name,
                description,
                unit
            )
            VALUES($1,$2,$3,$4)
            RETURNING *
        `,[ data.materialCode,
            data.name,
            data.description,data.unit
        ]);
        return result.rows[0];
    }

    async update(id,data){
        const result = await pool.query(`
            UPDATE materials
            SET
                material_code=$1,
                name = $2,
                description = $3,
                unit =$4,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $5
            RETURNING *
        `,[ data.materialCode,
            data.name,
            data.description,data.unit,
            id
        ]);
        return result.rows[0];
    }

    async delete(id){
        await pool.query(`
            DELETE FROM materials
            WHERE id = $1
        `,[id]);
    }
}

export default new MaterialRepository();