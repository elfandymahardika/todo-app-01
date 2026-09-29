import type { ResultSetHeader, RowDataPacket } from 'mysql2';
import pool from '../config/db.js';

export type User = RowDataPacket & {
    id: number;
    username: string;
    email: string;
    password: string;
};

export const UserModel = {
    async findByUsername(username: string): Promise<User | undefined> {
        const [rows] = await pool.query<User[]>(
            'SELECT id, username, email, password FROM users WHERE username = ? OR email = ? LIMIT 1',
            [username, username]
        );
        return rows[0];
    },

    async findByUsernameOrEmail(identifier: string): Promise<User | undefined> {
        const [rows] = await pool.query<User[]>(
            'SELECT id, username, email, password FROM users WHERE username = ? OR email = ? LIMIT 1',
            [identifier, identifier]
        );
        return rows[0];
    },

    async create(username: string, email: string, hashedPassword: string): Promise<number> {
        const [result] = await pool.execute<ResultSetHeader>(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
            [username, email, hashedPassword]
        );
        return result.insertId;
    }
};