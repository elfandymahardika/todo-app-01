import type { ResultSetHeader } from 'mysql2';
import pool from '../config/db.js';

export const TodoModel = {
    getByUserId: async (userId: number, limit: number, offset: number) => {
        const [rows] = await pool.query(
            'SELECT * FROM todos WHERE user_id = ? ORDER BY id DESC LIMIT ? OFFSET ?',
            [userId, limit, offset]
        );
        return rows;
    },

    countByUserId: async (userId: number) => {
        const [rows]: any = await pool.query(
            'SELECT COUNT(*) AS total FROM todos WHERE user_id = ?',
            [userId]
        );
        return rows[0].total as number;
    },

    getById: async (id: number, userId: number) => {
        const [rows]: any = await pool.query(
            'SELECT * FROM todos WHERE id = ? AND user_id = ?',
            [id, userId]
        );
        return rows[0];
    },

    create: async (userId: number, task: string): Promise<number> => {
        const [result] = await pool.execute<ResultSetHeader>(
            'INSERT INTO todos (user_id, task) VALUES (?, ?)',
            [userId, task]
        );
        return result.insertId;
    },

    update: async (id: number, task?: string, isCompleted?: boolean, userId?: number): Promise<number> => {
        const updates: string[] = [];
        const values: (string | number | boolean)[] = [];
        if (task !== undefined) {
            updates.push('task = ?');
            values.push(task);
        }
        if (isCompleted !== undefined) {
            updates.push('is_completed = ?');
            values.push(isCompleted);
        }
        if (updates.length === 0) return 0;
        values.push(id, userId!);
        const [result] = await pool.execute<ResultSetHeader>(
            `UPDATE todos SET ${updates.join(', ')} WHERE id = ? AND user_id = ?`,
            values
        );
        return result.affectedRows;
    },

    delete: async (id: number, userId: number): Promise<number> => {
        const [result] = await pool.execute<ResultSetHeader>(
            'DELETE FROM todos WHERE id = ? AND user_id = ?',
            [id, userId]
        );
        return result.affectedRows;
    }
};