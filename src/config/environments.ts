import dotenv from 'dotenv';

dotenv.config({ path: `${__dirname}/../../.env.${process.env.NODE_ENV}` });

export default {
    port: process.env.PORT,
    database: {
        port: process.env.DB_PORT,
        password: process.env.DB_PASSWORD,
        user: process.env.DB_USER,
        name: process.env.DB_NAME,
        host: process.env.DB_HOST
    }
};