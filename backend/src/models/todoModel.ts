import type { ResultSetHeader, RowDataPacket } from 'mysql2';
import pool from '../config/db.js';
export type Todo = RowDataPacket & {id:number; user_id:number; task:string; is_completed:boolean};
export const TodoModel = {
  async getByUserId(userId:number):Promise<Todo[]> { const [rows] = await pool.query<Todo[]>('SELECT id, user_id, task, is_completed FROM todos WHERE user_id = ? ORDER BY id DESC',[userId]); return rows; },
  async create(userId:number,task:string):Promise<number> { const [result] = await pool.execute<ResultSetHeader>('INSERT INTO todos (user_id, task) VALUES (?, ?)',[userId,task]); return result.insertId; },
};