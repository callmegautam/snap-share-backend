import fs from 'node:fs';
import path from 'node:path';

import { drizzle } from 'drizzle-orm/mysql2';
import { ConnectionOptions, createPool } from 'mysql2/promise';
import * as schema from '@/db/schema';
import env from '@/config/env';

const connectionOptions: ConnectionOptions = {
    host: env.DB_HOST,
    port: env.DB_PORT,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_DATABASE,
    ssl: {
        ca: fs.readFileSync(path.join(process.cwd(), './cert/DigiCertGlobalRootCA.crt.pem'), 'utf8'),
    },
};

export const connection = createPool(connectionOptions);

export const db = drizzle({ client: connection, schema, mode: 'default' });

export type db = typeof db;

export default db;
