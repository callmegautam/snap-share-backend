import fs from 'node:fs';
import path from 'node:path';
import { defineConfig } from 'drizzle-kit';
import env from '@/config/env';

export default defineConfig({
    schema: './src/db/schema.ts',
    out: './src/db/migrations',
    dialect: 'mysql',

    dbCredentials: {
        host: env.DB_HOST!,
        port: env.DB_PORT!,
        user: env.DB_USER!,
        password: env.DB_PASSWORD!,
        database: env.DB_DATABASE!,
        ssl: {
            ca: fs.readFileSync(path.join(process.cwd(), './cert/DigiCertGlobalRootCA.crt.pem'), 'utf8'),
        },
    },

    migrations: {
        table: '__migrations',
    },
});
