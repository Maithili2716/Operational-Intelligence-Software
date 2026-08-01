import pool from "../../config/db.js";

class DepartmentRepository{
    async getAll(){
        const result = await pool.query(`
            SELECT *
            FROM departments
            ORDER BY id
        `);
        return result.rows;
    }

    async getActive(){
        return this.getAll();
    }

    async findById(id){
        const result = await pool.query(`
            SELECT *
            FROM departments
            WHERE id = $1
        `,[id]);
        return result.rows[0];
    }

    async save(data){
        const result = await pool.query(`
            INSERT INTO departments(
                name,
                head
            )
            VALUES($1,$2)
            RETURNING *
        `,[
            data.name,
            data.head
        ]);
        return result.rows[0];
    }

    async update(id,data){
        const result = await pool.query(`
            UPDATE departments
            SET
                name = $1,
                head = $2,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $3
            RETURNING *
        `,[
            data.name,
            data.head,
            id
        ]);
        return result.rows[0];
    }

    async delete(id){
        await pool.query(`
            DELETE FROM departments
            WHERE id = $1
        `,[id]);
    }
}

export default new DepartmentRepository();