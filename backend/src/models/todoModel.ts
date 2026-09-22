import type { ResultSetHeader, RowDataPacket } from 'mysql2';
import pool from '../config/db.js';
export type Todo = RowDataPacket & {id:number; user_id:number; task:string; is_completed:boolean};
export const TodoModel = {
  async getByUserId(userId:number):Promise<Todo[]> { const [rows] = await pool.query<Todo[]>('SELECT id, user_id, task, is_completed FROM todos WHERE user_id = ? ORDER BY id DESC',[userId]); return rows; },
  async getById(id:number,userId:number):Promise<Todo|undefined> { const [rows] = await pool.query<Todo[]>('SELECT id, user_id, task, is_completed FROM todos WHERE id = ? AND user_id = ?',[id,userId]); return rows[0]; },
  async create(userId:number,task:string):Promise<number> { const [result] = await pool.execute<ResultSetHeader>('INSERT INTO todos (user_id, task) VALUES (?, ?)',[userId,task]); return result.insertId; },
  async update(id:number,userId:number,task?:string,isCompleted?:boolean):Promise<boolean> {
    const updates:string[]=[];
    const values:(string|number|boolean)[]=[];
    if(task!==undefined){updates.push('task = ?');values.push(task);}
    if(isCompleted!==undefined){updates.push('is_completed = ?');values.push(isCompleted);}
    if(updates.length===0)return false;
    values.push(id,userId);
    const [result] = await pool.execute<ResultSetHeader>(`UPDATE todos SET ${updates.join(', ')} WHERE id = ? AND user_id = ?`,values);
    return result.affectedRows > 0;
  },
  async delete(id:number,userId:number):Promise<boolean> { const [result] = await pool.execute<ResultSetHeader>('DELETE FROM todos WHERE id = ? AND user_id = ?',[id,userId]); return result.affectedRows > 0; },
};