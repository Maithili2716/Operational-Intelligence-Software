import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

async function testConnection() {
  try {
    const result = await pool.query("SELECT NOW()");
    console.log("Database connected!");
    console.log(result.rows[0]);
  } catch (err) {
    console.error("Connection failed:", err);
  }
}

testConnection();


export default pool;