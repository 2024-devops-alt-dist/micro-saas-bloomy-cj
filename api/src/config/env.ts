import dotenv from 'dotenv';
dotenv.config();

export const config = {
    DB_USER: process.env.DB_USER || 'User',
    DB_PASSWORD: process.env.DB_PASSWORD || 'password',
    DB_NAME: process.env.DB_NAME || 'database',
    DB_HOST: process.env.DB_HOST || 'localhost',
    // JWT_ACCESS_SECRET: process.env.,
    // JWT_REFRESH_SECRET: process.env.,
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || 'dev_secret_change_me',
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'dev_refresh_secret_change_me',
    JWT_ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN || '15m',
    JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
    DB_PORT: process.env.DB_PORT || '5432',
    API_PORT: process.env.API_PORT || 3000,
    FRONT_URL: process.env.FRONT_URL || 'http://localhost:5173/',

    DATABASE_URL: process.env.DATABASE_URL || `postgresql://${process.env.DB_USER || 'user'}:${process.env.DB_PASSWORD || 'password'}@${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || '5432'}/${process.env.DB_NAME || 'database'}`,
}